import { GameState } from '../core/GameState';
import { DataManager } from '../data/DataManager';
import { QuestInstance, ObjectiveType } from '../types/quest';

export class QuestSystem {
  private state: GameState;
  private data: DataManager;

  constructor(state: GameState, data: DataManager) {
    this.state = state;
    this.data = data;
    this.setupListeners();
  }

  private setupListeners(): void {
    // Escuta coleta de recursos
    this.state.events.on('resource_gathered', (payload: { resourceType: string; itemId: string }) => {
      this.progressObjective('GATHER_RESOURCE', payload.itemId, 1);
    });

    // Escuta fabricação de itens
    this.state.events.on('item_crafted', (payload: { resultItemId: string }) => {
      this.progressObjective('CRAFT_ITEM', payload.resultItemId, 1);
      this.progressObjective('CRAFT_ITEM', 'any_craft', 1);
    });

    // Escuta derrota de monstros
    this.state.events.on('enemy_defeated', (payload: { typeId: string }) => {
      this.progressObjective('DEFEAT_ENEMY', payload.typeId, 1);
    });
  }

  public startQuest(questId: string): boolean {
    if (this.state.activeQuests.has(questId) || this.state.completedQuestIds.has(questId)) {
      return false;
    }

    const def = this.data.getQuest(questId);
    if (!def) return false;

    const instance: QuestInstance = {
      definition: def,
      state: 'ACTIVE',
      objectives: def.objectives.map((obj) => ({ ...obj }))
    };

    this.state.activeQuests.set(questId, instance);

    this.state.addFloatingText(
      this.state.player.x,
      this.state.player.y - 30,
      `Nova Missão: ${def.title}!`,
      '#ffff00',
      1.5
    );

    this.state.events.emit('quest_started', instance);
    return true;
  }

  public progressObjective(type: ObjectiveType, targetId: string, amount = 1): void {
    for (const [, quest] of this.state.activeQuests) {
      if (quest.state !== 'ACTIVE') continue;

      let changed = false;
      for (const obj of quest.objectives) {
        if (!obj.completed && obj.type === type && (obj.targetId === targetId || obj.targetId === 'any_craft')) {
          obj.currentAmount = Math.min(obj.requiredAmount, obj.currentAmount + amount);
          if (obj.currentAmount >= obj.requiredAmount) {
            obj.completed = true;
            this.state.addFloatingText(
              this.state.player.x,
              this.state.player.y - 20,
              `Objetivo Concluído: ${obj.description}!`,
              '#88ff88',
              1.2
            );
          }
          changed = true;
        }
      }

      if (changed) {
        this.state.events.emit('quest_updated', quest);
      }
    }
  }

  public isQuestReadyForTurnIn(questId: string): boolean {
    const quest = this.state.activeQuests.get(questId);
    if (!quest) return false;

    // Todos os objetivos preliminares devem estar completos (exceto o próprio de falar com o guarda, se houver)
    const preliminaryObjectives = quest.objectives.filter(
      (obj) => !(obj.type === 'TALK_TO_NPC' && obj.targetId === quest.definition.turnInNpcId)
    );

    return preliminaryObjectives.every((obj) => obj.completed);
  }

  public completeQuest(questId: string): boolean {
    const quest = this.state.activeQuests.get(questId);
    if (!quest || quest.state !== 'ACTIVE') return false;

    // Marca o objetivo final de entrega como concluído
    for (const obj of quest.objectives) {
      obj.completed = true;
      obj.currentAmount = obj.requiredAmount;
    }

    quest.state = 'COMPLETED';
    this.state.activeQuests.delete(questId);
    this.state.completedQuestIds.add(questId);

    // Concede recompensas
    if (quest.definition.reward.items) {
      for (const reward of quest.definition.reward.items) {
        const itemDef = this.data.getItem(reward.itemId);
        if (itemDef) {
          // Recompensa adicionada via inventário no GameState se disponível
          this.state.events.emit('give_item_reward', { item: itemDef, quantity: reward.quantity });
        }
      }
    }

    this.state.isVictory = true;
    this.state.addFloatingText(
      this.state.player.x,
      this.state.player.y - 40,
      `MISSÃO CONCLUÍDA: ${quest.definition.title}!`,
      '#00ffea',
      2.5
    );

    this.state.events.emit('quest_completed', quest);
    return true;
  }
}
