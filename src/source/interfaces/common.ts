import {TaskSubType, TaskType} from '../types/task';

/**
 * Botphus rule option
 */
export interface IBotphusRuleOpt {
    /**
     * Current environment block type
     * @type {Set<TaskType>}
     */
    blockType?: Set<TaskType>;
    /**
     * Current environment block sub-type
     * @type {Set<TaskSubType>}
     */
    blockSubType?: Set<TaskSubType>;
}
