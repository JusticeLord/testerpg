import { describe, it, expect, beforeEach } from 'vitest';
import { GameState } from '../src/core/GameState';
import { EventEmitter } from '../src/core/EventEmitter';
import { GameMap } from '../src/map/GameMap';
import { DataManager } from '../src/data/DataManager';
import { InventorySystem } from '../src/systems/InventorySystem';
import { CraftingSystem } from '../src/systems/CraftingSystem';
import { MOCK_ITEMS } from '../src/data/mock/items.mock';

describe('CraftingSystem', () => {
  let state: GameState;
  let data: DataManager;
  let inventory: InventorySystem;
  let crafting: CraftingSystem;

  beforeEach(() => {
    const events = new EventEmitter();
    const map = new GameMap();
    state = new GameState(events, map);
    data = new DataManager();
    inventory = new InventorySystem(state);
    crafting = new CraftingSystem(state, data, inventory);
  });

  it('não deve permitir criação sem ingredientes suficientes', () => {
    // Tenta criar poção sem ter ervas e madeira
    const success = crafting.craft('recipe_health_potion');
    expect(success).toBe(false);
    expect(inventory.getItemCount('health_potion')).toBe(0);
  });

  it('deve fabricar Poção Revigorante (2 Ervas + 1 Madeira)', () => {
    inventory.addItem(MOCK_ITEMS.herb, 2);
    inventory.addItem(MOCK_ITEMS.wood, 1);

    const success = crafting.craft('recipe_health_potion');
    expect(success).toBe(true);

    // Ingredientes consumidos
    expect(inventory.getItemCount('herb')).toBe(0);
    expect(inventory.getItemCount('wood')).toBe(0);

    // Item resultante entregue
    expect(inventory.getItemCount('health_potion')).toBe(1);
  });

  it('deve fabricar Espada Reforçada (2 Madeiras + 1 Minério)', () => {
    inventory.addItem(MOCK_ITEMS.wood, 2);
    inventory.addItem(MOCK_ITEMS.ore, 1);

    const success = crafting.craft('recipe_iron_sword');
    expect(success).toBe(true);

    expect(inventory.getItemCount('wood')).toBe(0);
    expect(inventory.getItemCount('ore')).toBe(0);
    expect(inventory.getItemCount('iron_sword')).toBe(1);
  });
});
