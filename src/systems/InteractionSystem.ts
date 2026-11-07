import { GameState } from '../core/GameState';
import { DialogueSystem } from './DialogueSystem';
import { GatheringSystem } from './GatheringSystem';
import { QuestSystem } from './QuestSystem';
import { NPCData } from '../map/GameMap';

export interface InteractionTarget {
  type: 'NPC' | 'RESOURCE';
  label: string;
  target: any;
}

export class InteractionSystem {
  private state: GameState;
  private dialogues: DialogueSystem;
  private gathering: GatheringSystem;
  private quests: QuestSystem;

  constructor(
    state: GameState,
    dialogues: DialogueSystem,
    gathering: GatheringSystem,
    quests: QuestSystem
  ) {
    this.state = state;
    this.dialogues = dialogues;
    this.gathering = gathering;
    this.quests = quests;
  }

  public getAvailableInteraction(): InteractionTarget | null {
    // 1. Prioriza NPCs próximos
    const npc = this.getNearbyNpc();
    if (npc) {
      return {
        type: 'NPC',
        label: `[E] Conversar com ${npc.name}`,
        target: npc
      };
    }

    // 2. Recursos colhíveis
    const resource = this.gathering.getNearbyResourceNode();
    if (resource) {
      const typeNames = {
        wood: 'Madeira',
        herb: 'Erva Medicinal',
        ore: 'Minério de Ferro'
      };
      return {
        type: 'RESOURCE',
        label: `[E] Coletar ${typeNames[resource.type]}`,
        target: resource
      };
    }

    return null;
  }

  public interact(): boolean {
    // Se diálogo já está aberto, avançar
    if (this.state.activeDialogue.node) {
      this.dialogues.advance();
      return true;
    }

    const target = this.getAvailableInteraction();
    if (!target) return false;

    if (target.type === 'NPC') {
      const npc: NPCData = target.target;
      this.triggerNpcDialogue(npc);
      return true;
    } else if (target.type === 'RESOURCE') {
      return this.gathering.harvest(target.target);
    }

    return false;
  }

  private triggerNpcDialogue(npc: NPCData): void {
    let dialogueId = npc.defaultDialogueId;
    const questActive = this.state.activeQuests.has('quest_valley_initiation');
    const questCompleted = this.state.completedQuestIds.has('quest_valley_initiation');

    if (npc.id === 'npc_elder') {
      if (questCompleted) {
        dialogueId = 'elder_completed';
      } else if (questActive) {
        dialogueId = 'elder_remind';
      } else {
        dialogueId = 'elder_initial';
      }
    } else if (npc.id === 'npc_blacksmith') {
      const quest = this.state.activeQuests.get('quest_valley_initiation');
      const objTalk = quest?.objectives.find((o) => o.id === 'obj_talk_blacksmith');

      if (questActive && objTalk && !objTalk.completed) {
        dialogueId = 'blacksmith_quest_meet';
      } else {
        dialogueId = 'blacksmith_crafting_hint';
      }
    } else if (npc.id === 'npc_guard') {
      if (questCompleted) {
        dialogueId = 'guard_victory';
      } else if (questActive && this.quests.isQuestReadyForTurnIn('quest_valley_initiation')) {
        dialogueId = 'guard_turn_in';
      } else {
        dialogueId = 'guard_locked';
      }
    }

    this.dialogues.openDialogue(dialogueId, npc.id);
  }

  private getNearbyNpc(range = 48): NPCData | null {
    const px = this.state.player.x;
    const py = this.state.player.y;

    for (const npc of this.state.map.npcs) {
      const dist = Math.hypot(npc.x - px, npc.y - py);
      if (dist <= range) {
        return npc;
      }
    }
    return null;
  }
}
