import { DialogueDatabase, DialogueNode } from '../types/dialogue';
import { QuestDefinition } from '../types/quest';
import { ItemDefinition, CraftingRecipe } from '../types/item';
import { MOCK_DIALOGUES } from './mock/dialogues.mock';
import { MOCK_QUESTS } from './mock/quests.mock';
import { MOCK_ITEMS } from './mock/items.mock';
import { MOCK_RECIPES } from './mock/recipes.mock';

export class DataManager {
  private dialogues: Record<string, DialogueNode>;
  private quests: Map<string, QuestDefinition>;
  private items: Map<string, ItemDefinition>;
  private recipes: CraftingRecipe[];

  constructor() {
    this.dialogues = { ...MOCK_DIALOGUES.dialogues };
    this.quests = new Map(MOCK_QUESTS.map((q) => [q.id, JSON.parse(JSON.stringify(q))]));
    this.items = new Map(Object.entries(MOCK_ITEMS));
    this.recipes = [...MOCK_RECIPES];
  }

  public getDialogue(nodeId: string): DialogueNode | undefined {
    return this.dialogues[nodeId];
  }

  public getQuest(questId: string): QuestDefinition | undefined {
    const q = this.quests.get(questId);
    return q ? JSON.parse(JSON.stringify(q)) : undefined;
  }

  public getAllQuests(): QuestDefinition[] {
    return Array.from(this.quests.values()).map((q) => JSON.parse(JSON.stringify(q)));
  }

  public getItem(itemId: string): ItemDefinition | undefined {
    return this.items.get(itemId);
  }

  public getAllRecipes(): CraftingRecipe[] {
    return [...this.recipes];
  }

  public getRecipe(recipeId: string): CraftingRecipe | undefined {
    return this.recipes.find((r) => r.id === recipeId);
  }

  /**
   * Ponto de injeção para quando os departamentos externos entregarem arquivos JSON canônicos.
   */
  public loadExternalDialogues(database: DialogueDatabase): void {
    this.dialogues = { ...this.dialogues, ...database.dialogues };
  }

  public loadExternalQuests(quests: QuestDefinition[]): void {
    for (const q of quests) {
      this.quests.set(q.id, q);
    }
  }
}
