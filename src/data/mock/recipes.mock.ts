import { CraftingRecipe } from '../../types/item';

/**
 * Duas receitas obrigatórias de crafting [MOCK / TEST DATA].
 * 1. Poção Revigorante (Consumível de cura)
 * 2. Espada Reforçada (Equipamento de combate)
 */
export const MOCK_RECIPES: CraftingRecipe[] = [
  {
    id: 'recipe_health_potion',
    name: 'Poção Revigorante',
    description: 'Combina ervas medicinais com casca de madeira para sintetizar um tônico curativo.',
    ingredients: [
      { itemId: 'herb', quantity: 2 },
      { itemId: 'wood', quantity: 1 }
    ],
    resultItemId: 'health_potion',
    resultQuantity: 1
  },
  {
    id: 'recipe_iron_sword',
    name: 'Espada Reforçada',
    description: 'Forja uma lâmina metálica robusta com cabo de madeira tratada para combate.',
    ingredients: [
      { itemId: 'wood', quantity: 2 },
      { itemId: 'ore', quantity: 1 }
    ],
    resultItemId: 'iron_sword',
    resultQuantity: 1
  }
];
