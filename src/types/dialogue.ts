export interface DialogueChoice {
  text: string;
  nextNodeId: string;
  requiredQuestState?: {
    questId: string;
    state: 'NOT_STARTED' | 'ACTIVE' | 'COMPLETED';
  };
}

export type DialogueTriggerType =
  | 'START_QUEST'
  | 'PROGRESS_OBJECTIVE'
  | 'COMPLETE_QUEST'
  | 'GIVE_ITEM';

export interface DialogueTrigger {
  type: DialogueTriggerType;
  payload: {
    questId?: string;
    objectiveId?: string;
    itemId?: string;
    quantity?: number;
  };
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  choices?: DialogueChoice[];
  next?: string;
  trigger?: DialogueTrigger;
}

export interface DialogueDatabase {
  dialogues: Record<string, DialogueNode>;
}
