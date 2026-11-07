export type ItemType = 'MATERIAL' | 'CONSUMABLE' | 'EQUIPMENT';

export interface ItemDefinition {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  stackable: boolean;
  maxStack?: number;
  effectValue?: number; // HP to heal or bonus attack damage
  spriteKey: string;
}

export interface InventorySlot {
  item: ItemDefinition;
  quantity: number;
}

export interface CraftingIngredient {
  itemId: string;
  quantity: number;
}

export interface CraftingRecipe {
  id: string;
  name: string;
  description: string;
  ingredients: CraftingIngredient[];
  resultItemId: string;
  resultQuantity: number;
}

export type ResourceType = 'wood' | 'herb' | 'ore';

export interface ResourceNode {
  id: string;
  type: ResourceType;
  x: number;
  y: number;
  yieldItemId: string;
  yieldQuantity: number;
  available: boolean;
  respawnTimeSeconds: number;
  timer: number;
}
