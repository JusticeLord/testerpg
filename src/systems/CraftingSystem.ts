import { GameState } from '../core/GameState';
import { DataManager } from '../data/DataManager';
import { InventorySystem } from './InventorySystem';
import { CraftingRecipe } from '../types/item';

export class CraftingSystem {
  private state: GameState;
  private data: DataManager;
  private inventory: InventorySystem;

  constructor(state: GameState, data: DataManager, inventory: InventorySystem) {
    this.state = state;
    this.data = data;
    this.inventory = inventory;
  }

  public canCraft(recipe: CraftingRecipe): boolean {
    for (const ing of recipe.ingredients) {
      if (this.inventory.getItemCount(ing.itemId) < ing.quantity) {
        return false;
      }
    }
    return true;
  }

  public craft(recipeId: string): boolean {
    const recipe = this.data.getRecipe(recipeId);
    if (!recipe) return false;

    if (!this.canCraft(recipe)) {
      this.state.addFloatingText(
        this.state.player.x,
        this.state.player.y - 20,
        'Materiais insuficientes!',
        '#ff4444'
      );
      return false;
    }

    // Consome ingredientes
    for (const ing of recipe.ingredients) {
      this.inventory.removeItem(ing.itemId, ing.quantity);
    }

    // Entrega o item resultante
    const resultItem = this.data.getItem(recipe.resultItemId);
    if (resultItem) {
      this.inventory.addItem(resultItem, recipe.resultQuantity);
    }

    this.state.addFloatingText(
      this.state.player.x,
      this.state.player.y - 20,
      `Criado: ${recipe.name}!`,
      '#ffff44'
    );

    this.state.events.emit('item_crafted', {
      recipeId: recipe.id,
      resultItemId: recipe.resultItemId,
      quantity: recipe.resultQuantity
    });

    return true;
  }
}
