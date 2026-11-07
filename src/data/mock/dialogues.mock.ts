import { DialogueDatabase } from '../../types/dialogue';

/**
 * Diálogos de teste temporários [MOCK / TEST DATA].
 * Vinculados aos três NPCs obrigatórios:
 * 1. Ancião Eldrin (npc_elder)
 * 2. Ferreiro Torin (npc_blacksmith)
 * 3. Guarda Brom (npc_guard)
 */
export const MOCK_DIALOGUES: DialogueDatabase = {
  dialogues: {
    // ----------------- ANCIÃO ELDRIN -----------------
    elder_initial: {
      id: 'elder_initial',
      speaker: 'Ancião Eldrin',
      text: 'Saudações, forasteiro. Nosso vale outrora pacífico está sob ameaça de gosmas agressivas que tomaram a clareira!',
      choices: [
        {
          text: 'Como posso ajudar o vilarejo?',
          nextNodeId: 'elder_give_quest'
        },
        {
          text: 'Só estou de passagem.',
          nextNodeId: 'elder_farewell'
        }
      ]
    },
    elder_give_quest: {
      id: 'elder_give_quest',
      speaker: 'Ancião Eldrin',
      text: 'Procure o Ferreiro Torin ao norte. Ele ensinará como coletar materiais e forjar suprimentos essenciais para enfrentar as criaturas.',
      next: 'elder_quest_accepted',
      trigger: {
        type: 'START_QUEST',
        payload: { questId: 'quest_valley_initiation' }
      }
    },
    elder_quest_accepted: {
      id: 'elder_quest_accepted',
      speaker: 'Ancião Eldrin',
      text: 'A missão foi iniciada! Fale com Torin, colete os recursos do vale, fabrique seu equipamento e fale com o Guarda Brom na fronteira.'
    },
    elder_remind: {
      id: 'elder_remind',
      speaker: 'Ancião Eldrin',
      text: 'Lembre-se: fale com o Ferreiro Torin, colha madeira, ervas e minério, fabrique seu item e enfrente as criaturas antes de reportar ao Guarda Brom.'
    },
    elder_completed: {
      id: 'elder_completed',
      speaker: 'Ancião Eldrin',
      text: 'Obrigado por salvar nosso vale! Você é um verdadeiro herói da XP Forge!'
    },
    elder_farewell: {
      id: 'elder_farewell',
      speaker: 'Ancião Eldrin',
      text: 'Que os ventos guiem seus passos. Estarei aqui se mudar de ideia.'
    },

    // ----------------- FERREIRO TORIN -----------------
    blacksmith_idle: {
      id: 'blacksmith_idle',
      speaker: 'Ferreiro Torin',
      text: 'O fogo da forja nunca apaga! O que você procura por aqui, viajante?'
    },
    blacksmith_quest_meet: {
      id: 'blacksmith_quest_meet',
      speaker: 'Ferreiro Torin',
      text: 'O Ancião o enviou? Muito bem! Para enfrentar a floresta, você precisará coletar Madeira, Ervas e Minério. Pressione [C] ou [I] para abrir o menu de criação quando tiver os ingredientes!',
      trigger: {
        type: 'PROGRESS_OBJECTIVE',
        payload: {
          questId: 'quest_valley_initiation',
          objectiveId: 'obj_talk_blacksmith'
        }
      }
    },
    blacksmith_crafting_hint: {
      id: 'blacksmith_crafting_hint',
      speaker: 'Ferreiro Torin',
      text: 'Você pode forjar uma Poção Revigorante com 2 Ervas e 1 Madeira, ou uma Espada Reforçada com 2 Madeiras e 1 Minério. Ambas lhe darão grande vantagem!'
    },

    // ----------------- GUARDA BROM -----------------
    guard_locked: {
      id: 'guard_locked',
      speaker: 'Guarda Brom',
      text: 'Alto lá! A passagem além da clareira está bloqueada até que as gosmas sejam eliminadas e você tenha equipamento fabricado para sobreviver!'
    },
    guard_turn_in: {
      id: 'guard_turn_in',
      speaker: 'Guarda Brom',
      text: 'Você derrotou os monstros e forjou os equipamentos necessários! Relatório recebido com louvor! O vale está seguro!',
      trigger: {
        type: 'COMPLETE_QUEST',
        payload: {
          questId: 'quest_valley_initiation'
        }
      }
    },
    guard_victory: {
      id: 'guard_victory',
      speaker: 'Guarda Brom',
      text: 'A fronteira está livre de perigo graças a você, guerreiro!'
    }
  }
};
