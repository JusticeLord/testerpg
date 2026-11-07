import { QuestDefinition } from '../../types/quest';

/**
 * Missão obrigatória da vertical slice [MOCK / TEST DATA].
 * Envolve:
 * - Conversa com NPCs (Ancião, Ferreiro, Guarda)
 * - Coleta dos 3 recursos (Madeira, Erva, Minério)
 * - Fabricação de ao menos 1 receita
 * - Combate e derrota de inimigos (Gosmas)
 * - Turn-in e conclusão da missão
 */
export const MOCK_QUESTS: QuestDefinition[] = [
  {
    id: 'quest_valley_initiation',
    title: 'O Despertar do Vale',
    description: 'Aprenda os segredos da sobrevivência: consulte o Ferreiro, colete matéria-prima, fabrique itens de apoio e elimine as ameaças selvagens.',
    giverNpcId: 'npc_elder',
    turnInNpcId: 'npc_guard',
    reward: {
      experience: 250,
      items: [
        { itemId: 'health_potion', quantity: 2 }
      ]
    },
    objectives: [
      {
        id: 'obj_talk_blacksmith',
        description: 'Fale com o Ferreiro Torin sobre forja e criação',
        type: 'TALK_TO_NPC',
        targetId: 'npc_blacksmith',
        requiredAmount: 1,
        currentAmount: 0,
        completed: false
      },
      {
        id: 'obj_gather_wood',
        description: 'Colete Madeira da Floresta cortando árvores',
        type: 'GATHER_RESOURCE',
        targetId: 'wood',
        requiredAmount: 3,
        currentAmount: 0,
        completed: false
      },
      {
        id: 'obj_gather_herb',
        description: 'Colete Ervas Medicinais nos arbustos floridos',
        type: 'GATHER_RESOURCE',
        targetId: 'herb',
        requiredAmount: 2,
        currentAmount: 0,
        completed: false
      },
      {
        id: 'obj_gather_ore',
        description: 'Colete Minério de Ferro nos depósitos de rocha',
        type: 'GATHER_RESOURCE',
        targetId: 'ore',
        requiredAmount: 1,
        currentAmount: 0,
        completed: false
      },
      {
        id: 'obj_craft_item',
        description: 'Fabrique um item útil (Poção ou Espada) no menu de criação [C]',
        type: 'CRAFT_ITEM',
        targetId: 'any_craft',
        requiredAmount: 1,
        currentAmount: 0,
        completed: false
      },
      {
        id: 'obj_defeat_slime',
        description: 'Derrote as Gosmas Hostis na clareira sul',
        type: 'DEFEAT_ENEMY',
        targetId: 'forest_slime',
        requiredAmount: 2,
        currentAmount: 0,
        completed: false
      },
      {
        id: 'obj_report_guard',
        description: 'Apresente-se ao Guarda Brom na saída da fronteira',
        type: 'TALK_TO_NPC',
        targetId: 'npc_guard',
        requiredAmount: 1,
        currentAmount: 0,
        completed: false
      }
    ]
  }
];
