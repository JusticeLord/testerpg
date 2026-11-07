import { describe, it, expect, beforeEach } from 'vitest';
import { GameState } from '../src/core/GameState';
import { EventEmitter } from '../src/core/EventEmitter';
import { GameMap } from '../src/map/GameMap';
import { DataManager } from '../src/data/DataManager';
import { QuestSystem } from '../src/systems/QuestSystem';

describe('QuestSystem', () => {
  let state: GameState;
  let data: DataManager;
  let quests: QuestSystem;

  beforeEach(() => {
    const events = new EventEmitter();
    const map = new GameMap();
    state = new GameState(events, map);
    data = new DataManager();
    quests = new QuestSystem(state, data);
  });

  it('deve iniciar uma nova missão corretamente', () => {
    const started = quests.startQuest('quest_valley_initiation');
    expect(started).toBe(true);

    const active = state.activeQuests.get('quest_valley_initiation');
    expect(active).toBeDefined();
    expect(active?.state).toBe('ACTIVE');
    expect(active?.objectives.length).toBe(7);
  });

  it('deve progredir objetivos de coleta, criação e combate', () => {
    quests.startQuest('quest_valley_initiation');

    // Progresso de coleta de madeira (requer 3)
    state.events.emit('resource_gathered', { resourceType: 'wood', itemId: 'wood' });
    state.events.emit('resource_gathered', { resourceType: 'wood', itemId: 'wood' });
    state.events.emit('resource_gathered', { resourceType: 'wood', itemId: 'wood' });

    const quest = state.activeQuests.get('quest_valley_initiation')!;
    const objWood = quest.objectives.find((o) => o.id === 'obj_gather_wood')!;
    expect(objWood.currentAmount).toBe(3);
    expect(objWood.completed).toBe(true);

    // Progresso de combate (derrota de 2 gosmas)
    state.events.emit('enemy_defeated', { typeId: 'forest_slime' });
    state.events.emit('enemy_defeated', { typeId: 'forest_slime' });

    const objSlime = quest.objectives.find((o) => o.id === 'obj_defeat_slime')!;
    expect(objSlime.currentAmount).toBe(2);
    expect(objSlime.completed).toBe(true);

    // Progresso de crafting
    state.events.emit('item_crafted', { resultItemId: 'health_potion' });
    const objCraft = quest.objectives.find((o) => o.id === 'obj_craft_item')!;
    expect(objCraft.completed).toBe(true);
  });

  it('deve concluir a missão e acionar o estado de vitória', () => {
    quests.startQuest('quest_valley_initiation');

    const completed = quests.completeQuest('quest_valley_initiation');
    expect(completed).toBe(true);
    expect(state.completedQuestIds.has('quest_valley_initiation')).toBe(true);
    expect(state.isVictory).toBe(true);
  });
});
