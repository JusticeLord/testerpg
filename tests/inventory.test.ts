import { describe, it, expect, beforeEach } from 'vitest';
import { GameState } from '../src/core/GameState';
import { EventEmitter } from '../src/core/EventEmitter';
import { GameMap } from '../src/map/GameMap';
import { InventorySystem } from '../src/systems/InventorySystem';
import { MOCK_ITEMS } from '../src/data/mock/items.mock';

describe('InventorySystem', () => {
  let state: GameState;
  let inventory: InventorySystem;

  beforeEach(() => {
    const events = new EventEmitter();
    const map = new GameMap();
    state = new GameState(events, map);
    inventory = new InventorySystem(state);
  });

  it('deve adicionar itens empilháveis corretamente', () => {
    const wood = MOCK_ITEMS.wood;
    inventory.addItem(wood, 3);

    expect(inventory.getItemCount('wood')).toBe(3);
    expect(state.inventory.length).toBe(1);
    expect(state.inventory[0].quantity).toBe(3);

    // Adiciona mais madeira ao mesmo slot
    inventory.addItem(wood, 2);
    expect(inventory.getItemCount('wood')).toBe(5);
    expect(state.inventory.length).toBe(1);
  });

  it('deve remover itens com precisão', () => {
    const herb = MOCK_ITEMS.herb;
    inventory.addItem(herb, 5);

    const removed = inventory.removeItem('herb', 2);
    expect(removed).toBe(true);
    expect(inventory.getItemCount('herb')).toBe(3);

    // Tentativa de remover mais do que o disponível falha
    const overRemoved = inventory.removeItem('herb', 10);
    expect(overRemoved).toBe(false);
    expect(inventory.getItemCount('herb')).toBe(3);
  });

  it('deve consumir poção revigorante e curar o jogador', () => {
    state.player.stats.hp = 50;
    const potion = MOCK_ITEMS.health_potion;
    inventory.addItem(potion, 1);

    const used = inventory.useItem('health_potion');
    expect(used).toBe(true);
    expect(state.player.stats.hp).toBe(90); // 50 + 40
    expect(inventory.getItemCount('health_potion')).toBe(0);
  });

  it('não deve consumir poção se o jogador já estiver com vida máxima', () => {
    state.player.stats.hp = 100;
    const potion = MOCK_ITEMS.health_potion;
    inventory.addItem(potion, 1);

    const used = inventory.useItem('health_potion');
    expect(used).toBe(false);
    expect(state.player.stats.hp).toBe(100);
    expect(inventory.getItemCount('health_potion')).toBe(1);
  });
});
