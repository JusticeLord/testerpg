export type ObjectiveType =
  | 'TALK_TO_NPC'
  | 'GATHER_RESOURCE'
  | 'CRAFT_ITEM'
  | 'DEFEAT_ENEMY';

export type QuestState = 'NOT_STARTED' | 'ACTIVE' | 'COMPLETED' | 'FAILED';

export interface QuestObjective {
  id: string;
  description: string;
  type: ObjectiveType;
  targetId: string;
  requiredAmount: number;
  currentAmount: number;
  completed: boolean;
}

export interface QuestDefinition {
  id: string;
  title: string;
  description: string;
  giverNpcId: string;
  turnInNpcId: string;
  objectives: QuestObjective[];
  reward: {
    experience: number;
    items?: Array<{ itemId: string; quantity: number }>;
  };
}

export interface QuestInstance {
  definition: QuestDefinition;
  state: QuestState;
  objectives: QuestObjective[];
}
