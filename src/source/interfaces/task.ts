import {TaskType,
    TaskTypeDataSubType, TaskTypeDomSubType, TaskTypeEventSubType, TaskTypePageSubType, TaskTypeTimeSubType, TaskTypeUnionSubType
} from '../types/task';

export type TaskRuleTypeItem = ITaskDataRuleItem | ITaskDomRuleItem | ITaskEventDialogRuleItem | ITaskEventRuleItem | ITaskTimeRuleItem | ITaskPageRuleItem | ITaskUnionRuleItem;

/**
 * Basic rule
 */
interface ITaskRuleItem {
    index?: string; // Index number, auto create
    type: TaskType; // Type
    arguments?: any[]; // Rule arguments
    assertion?: string[]; // Assertion list
    assertionVarName?: string; // Assertion variable name
    // children: TaskRuleTypeItem[] for some type
}

/**
 * Data Rule
 */
export interface ITaskDataRuleItem extends ITaskRuleItem {
    type: TaskType.TYPE_DATA;
    subType: TaskTypeDataSubType;
    assertion: string[];
    arguments: any[];
}

/**
 * Dom Rule
 */
export interface ITaskDomRuleItem extends ITaskRuleItem {
    type: TaskType.TYPE_DOM;
    subType: TaskTypeDomSubType;
    arguments: any[];
}

/**
 * Event Rule
 */
export interface ITaskEventRuleItem extends ITaskRuleItem {
    type: TaskType.TYPE_EVENT;
    subType: TaskTypeEventSubType;
    children: TaskRuleTypeItem[];
}

// Event dialog rule
export interface ITaskEventDialogRuleItem extends ITaskEventRuleItem {
    subType: TaskTypeEventSubType.SUB_TYPE_DIALOG;
    promptText?: string; // A text to enter in prompt. Does not cause any effects if the dialog's type is not prompt. default is "confirm"
}

/**
 * Union Rule
 */
export interface ITaskUnionRuleItem extends ITaskRuleItem {
    type: TaskType.TYPE_UNION;
    subType: TaskTypeUnionSubType;
    children: TaskRuleTypeItem[];
}

/**
 * Time Rule
 */
export interface ITaskTimeRuleItem extends ITaskRuleItem {
    type: TaskType.TYPE_TIME;
    subType: TaskTypeTimeSubType;
}

/**
 * Page Rule
 */
export interface ITaskPageRuleItem extends ITaskRuleItem {
    type: TaskType.TYPE_PAGE;
    subType: TaskTypePageSubType;
}
