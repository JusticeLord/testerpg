import { ItemDefinition } from '../../types/item';

/**
 * Dados de teste temporários [MOCK / TEST DATA].
 * Aguardando entrega formal do manifesto de assets e design narrativo.
 */
export const MOCK_ITEMS: Record<string, ItemDefinition> = {
  wood: {
    id: 'wood',
    name: 'Madeira da Floresta',
    description: 'Tronco resistente colhido das árvores do vale.',
    type: 'MATERIAL',
    stackable: true,
    maxStack: 99,
    spriteKey: 'item_wood'
  },
  herb: {
    id: 'herb',
    name: 'Erva Medicinal',
    description: 'Planta aromática com propriedades curativas restauradoras.',
    type: 'MATERIAL',
    stackable: true,
    maxStack: 99,
    spriteKey: 'item_herb'
  },
  ore: {
    id: 'ore',
    name: 'Minério de Ferro',
    description: 'Nódulo de minério denso extraído de depósitos rochosos.',
    type: 'MATERIAL',
    stackable: true,
    maxStack: 99,
    spriteKey: 'item_ore'
  },
  health_potion: {
    id: 'health_potion',
    name: 'Poção Revigorante',
    description: 'Restaura 40 pontos de vida instantaneamente ao ser consumida.',
    type: 'CONSUMABLE',
    stackable: true,
    maxStack: 10,
    effectValue: 40,
    spriteKey: 'item_health_potion'
  },
  iron_sword: {
    id: 'iron_sword',
    name: 'Espada Reforçada',
    description: 'Arma afiada forjada com madeira e ferro. Aumenta o dano de ataque para 25.',
    type: 'EQUIPMENT',
    stackable: false,
    effectValue: 15, // +15 bonus attack power (10 -> 25)
    spriteKey: 'item_iron_sword'
  }
};
