import { GameState } from '../core/GameState';
import { ItemDefinition } from '../types/item';

export class InventorySystem {
  private state: GameState;

  constructor(state: GameState) {
    this.state = state;
  }

  public addItem(item: ItemDefinition, quantity = 1): boolean {
    if (quantity <= 0) return false;

    // Se o item for empilhável, tenta preencher slots existentes
    if (item.stackable) {
      const maxStack = item.maxStack ?? 99;
      for (const slot of this.state.inventory) {
        if (slot.item.id === item.id && slot.quantity < maxStack) {
          const space = maxStack - slot.quantity;
          const toAdd = Math.min(space, quantity);
          slot.quantity += toAdd;
          quantity -= toAdd;
          if (quantity === 0) {
            this.state.events.emit('inventory_changed', this.state.inventory);
            return true;
          }
        }
      }
    }

    // Cria novos slots para o restante
    while (quantity > 0) {
      const maxStack = item.stackable ? (item.maxStack ?? 99) : 1;
      const toAdd = Math.min(maxStack, quantity);
      this.state.inventory.push({
        item,
        quantity: toAdd
      });
      quantity -= toAdd;
    }

    this.state.events.emit('inventory_changed', this.state.inventory);
    this.state.events.emit('item_added', { item, quantity });
    return true;
  }

  public removeItem(itemId: string, quantity = 1): boolean {
    if (this.getItemCount(itemId) < quantity) {
      return false;
    }

    let remaining = quantity;
    for (let i = this.state.inventory.length - 1; i >= 0; i--) {
      const slot = this.state.inventory[i];
      if (slot.item.id === itemId) {
        if (slot.quantity > remaining) {
          slot.quantity -= remaining;
          remaining = 0;
          break;
        } else {
          remaining -= slot.quantity;
          this.state.inventory.splice(i, 1);
          if (remaining === 0) break;
        }
      }
    }

    this.state.events.emit('inventory_changed', this.state.inventory);
    return true;
  }

  public getItemCount(itemId: string): number {
    return this.state.inventory
      .filter((slot) => slot.item.id === itemId)
      .reduce((sum, slot) => sum + slot.quantity, 0);
  }

  public useItem(itemId: string): boolean {
    const slot = this.state.inventory.find((s) => s.item.id === itemId);
    if (!slot) return false;

    const item = slot.item;

    if (item.type === 'CONSUMABLE' && item.effectValue) {
      const currentHp = this.state.player.stats.hp;
      const maxHp = this.state.player.stats.maxHp;

      if (currentHp >= maxHp) {
        this.state.addFloatingText(this.state.player.x, this.state.player.y - 20, 'Vida cheia!', '#88ff88');
        return false;
      }

      const healedHp = Math.min(maxHp, currentHp + item.effectValue);
      const actualHeal = healedHp - currentHp;
      this.state.player.stats.hp = healedHp;

      this.state.addFloatingText(
        this.state.player.x,
        this.state.player.y - 20,
        `+${actualHeal} HP`,
        '#00ff66'
      );

      this.removeItem(itemId, 1);
      this.state.events.emit('item_used', item);
      return true;
    }

    if (item.type === 'EQUIPMENT' && item.effectValue) {
      // Equipa a espada reforçada aumentando o ataque
      this.state.player.stats.attackPower = 10 + item.effectValue;
      this.state.addFloatingText(
        this.state.player.x,
        this.state.player.y - 20,
        `Ataque aumentado para ${this.state.player.stats.attackPower}!`,
        '#ffaa00'
      );
      this.state.events.emit('item_used', item);
      return true;
    }

    return false;
  }
}
