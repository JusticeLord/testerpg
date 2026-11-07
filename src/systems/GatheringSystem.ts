import { GameState } from '../core/GameState';
import { DataManager } from '../data/DataManager';
import { InventorySystem } from './InventorySystem';
import { ResourceNode } from '../types/item';

export class GatheringSystem {
  private state: GameState;
  private data: DataManager;
  private inventory: InventorySystem;

  constructor(state: GameState, data: DataManager, inventory: InventorySystem) {
    this.state = state;
    this.data = data;
    this.inventory = inventory;
  }

  public update(deltaSeconds: number): void {
    // Atualiza timers de respawn dos nós de recursos
    for (const node of this.state.map.resourceNodes) {
      if (!node.available) {
        node.timer += deltaSeconds;
        if (node.timer >= node.respawnTimeSeconds) {
          node.available = true;
          node.timer = 0;
        }
      }
    }
  }

  public getNearbyResourceNode(range = 45): ResourceNode | null {
    const px = this.state.player.x;
    const py = this.state.player.y;

    for (const node of this.state.map.resourceNodes) {
      if (!node.available) continue;

      const dist = Math.hypot(node.x - px, node.y - py);
      if (dist <= range) {
        return node;
      }
    }
    return null;
  }

  public harvest(node: ResourceNode): boolean {
    if (!node.available) return false;

    const item = this.data.getItem(node.yieldItemId);
    if (!item) return false;

    node.available = false;
    node.timer = 0;

    this.inventory.addItem(item, node.yieldQuantity);

    this.state.addFloatingText(
      node.x,
      node.y - 15,
      `+${node.yieldQuantity} ${item.name}`,
      '#aaff55',
      1.0
    );

    this.state.events.emit('resource_gathered', {
      resourceType: node.type,
      itemId: node.yieldItemId,
      quantity: node.yieldQuantity
    });

    return true;
  }
}
