# Interfaces Técnicas e Contratos de Integração — XP Forge RPG LAB

Este documento define os contratos de dados e convenções de assets para integração entre os ecossistemas de **Game Design & Implementação**, **Arte** e **Narrativa**.

---

## 1. Contrato Narrativo: Diálogos (`dialogues.json`)

O arquivo JSON de diálogos deve seguir a tipagem abaixo:

```typescript
export interface DialogueNode {
  id: string;                    // Identificador único do nó (ex: "elder_intro")
  speaker: string;               // Nome visível do interlocutor
  text: string;                  // Texto exibido na caixa de diálogo
  choices?: DialogueChoice[];    // Opções de resposta do jogador
  next?: string;                 // Próximo nó automático (se não houver escolhas)
  trigger?: DialogueTrigger;     // Gatilho de evento ou avanço de quest
}

export interface DialogueChoice {
  text: string;                  // Rótulo do botão de escolha
  nextNodeId: string;            // ID do próximo nó
  requiredQuestState?: {         // Condição opcional para exibir escolha
    questId: string;
    state: 'NOT_STARTED' | 'ACTIVE' | 'COMPLETED';
  };
}

export interface DialogueTrigger {
  type: 'START_QUEST' | 'PROGRESS_OBJECTIVE' | 'COMPLETE_QUEST' | 'GIVE_ITEM';
  payload: {
    questId?: string;
    objectiveId?: string;
    itemId?: string;
    quantity?: number;
  };
}

export interface DialogueDatabase {
  dialogues: Record<string, DialogueNode>; // Mapeamento node_id -> DialogueNode
}
```

---

## 2. Contrato Narrativo: Missões (`quests.json`)

O arquivo JSON de missões define o fluxo de progressão e objetivos:

```typescript
export type ObjectiveType = 
  | 'TALK_TO_NPC' 
  | 'GATHER_RESOURCE' 
  | 'CRAFT_ITEM' 
  | 'DEFEAT_ENEMY';

export interface QuestObjective {
  id: string;                    // Identificador do objetivo (ex: "obj_gather_wood")
  description: string;           // Descrição exibida no Quest Log (HUD)
  type: ObjectiveType;
  targetId: string;              // ID do NPC, ID do item/recurso ou ID do monstro
  requiredAmount: number;        // Quantidade requerida (ex: 3)
  currentAmount: number;         // Progresso atual (inicia em 0)
  completed: boolean;
}

export interface QuestDefinition {
  id: string;                    // ID único da quest (ex: "quest_valley_initiation")
  title: string;                 // Título da missão
  description: string;           // Resumo narrativo
  giverNpcId: string;            // NPC que entrega a missão
  turnInNpcId: string;           // NPC a quem entregar a missão completa
  objectives: QuestObjective[];  // Lista sequencial ou concorrente de objetivos
  reward: {
    experience: number;
    items?: Array<{ itemId: string; quantity: number }>;
  };
}

export interface QuestDatabase {
  quests: QuestDefinition[];
}
```

---

## 3. Contrato de Itens e Crafting (`items.json` e `recipes.json`)

```typescript
export type ItemType = 'MATERIAL' | 'CONSUMABLE' | 'EQUIPMENT';

export interface ItemDefinition {
  id: string;                    // Ex: "wood", "herb", "ore", "health_potion", "iron_sword"
  name: string;                  // Nome visível (ex: "Madeira da Floresta")
  description: string;           // Texto explicativo
  type: ItemType;
  stackable: boolean;
  maxStack?: number;
  effectValue?: number;          // Cura HP (consumível) ou Dano adicional (equipamento)
  spriteKey: string;             // Chave do sprite no catálogo de arte
}

export interface CraftingIngredient {
  itemId: string;
  quantity: number;
}

export interface CraftingRecipe {
  id: string;                    // Ex: "recipe_health_potion"
  name: string;                  // Ex: "Poção Revigorante"
  description: string;
  ingredients: CraftingIngredient[];
  resultItemId: string;
  resultQuantity: number;
}
```

---

## 4. Contrato para o Departamento de Arte (`ASSET_MANIFEST.md`)

Para garantir compatibilidade com PixiJS 8:

1. **Resolução Base:** 16x16 ou 32x32 pixels por tile/sprite (pixel-perfect).
2. **Texturas / Formato:** PNG-32 com transparência alpha, paleta sRGB sem compressão destrutiva.
3. **Animações de Personagem e Inimigos:**
   - 4 direções: `down`, `up`, `left`, `right`.
   - Estados: `idle` (1-2 frames), `walk` (2-4 frames), `attack` (2-3 frames).
4. **Nomes de Arquivos Esperados (Convenção Canônica):**
   - `assets/characters/player.png` / `player.json` (Spritesheet Atlas PixiJS)
   - `assets/characters/npc_elder.png`
   - `assets/characters/npc_blacksmith.png`
   - `assets/characters/npc_guard.png`
   - `assets/enemies/forest_slime.png`
   - `assets/tiles/world_tileset.png`
   - `assets/items/icons.png`
