import { GameState } from '../core/GameState';
import { DataManager } from '../data/DataManager';
import { QuestSystem } from './QuestSystem';
import { DialogueNode } from '../types/dialogue';

export class DialogueSystem {
  private state: GameState;
  private data: DataManager;
  private quests: QuestSystem;

  constructor(state: GameState, data: DataManager, quests: QuestSystem) {
    this.state = state;
    this.data = data;
    this.quests = quests;
  }

  public openDialogue(nodeId: string, npcId?: string): boolean {
    const node = this.data.getDialogue(nodeId);
    if (!node) return false;

    this.state.activeDialogue = {
      node,
      npcId: npcId ?? null
    };

    this.executeTrigger(node);
    this.state.events.emit('dialogue_started', node);
    return true;
  }

  public selectChoice(choiceIndex: number): void {
    const current = this.state.activeDialogue.node;
    if (!current || !current.choices || !current.choices[choiceIndex]) return;

    const choice = current.choices[choiceIndex];
    this.advanceTo(choice.nextNodeId);
  }

  public advance(): void {
    const current = this.state.activeDialogue.node;
    if (!current) return;

    if (current.next) {
      this.advanceTo(current.next);
    } else if (!current.choices || current.choices.length === 0) {
      this.close();
    }
  }

  public advanceTo(nodeId: string): void {
    const nextNode = this.data.getDialogue(nodeId);
    if (!nextNode) {
      this.close();
      return;
    }

    this.state.activeDialogue.node = nextNode;
    this.executeTrigger(nextNode);
    this.state.events.emit('dialogue_advanced', nextNode);
  }

  public close(): void {
    this.state.activeDialogue = {
      node: null,
      npcId: null
    };
    this.state.events.emit('dialogue_closed');
  }

  private executeTrigger(node: DialogueNode): void {
    if (!node.trigger) return;

    const { type, payload } = node.trigger;

    switch (type) {
      case 'START_QUEST':
        if (payload.questId) {
          this.quests.startQuest(payload.questId);
        }
        break;

      case 'PROGRESS_OBJECTIVE':
        if (payload.objectiveId) {
          this.quests.progressObjective('TALK_TO_NPC', this.state.activeDialogue.npcId || '', 1);
        }
        break;

      case 'COMPLETE_QUEST':
        if (payload.questId) {
          this.quests.completeQuest(payload.questId);
        }
        break;
    }
  }
}
