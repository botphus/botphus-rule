import { IBotphusRuleOpt } from './interfaces/common';
import { TaskRuleTypeItem } from './interfaces/task';
/**
 * Botphus Rule
 */
declare class BotphusRule {
    private option;
    constructor(option?: IBotphusRuleOpt);
    public validRule(taskRuleList: TaskRuleTypeItem[]): Promise<void>;
}
export default BotphusRule;
export * from './types/task';
export * from './interfaces/common';
export * from './interfaces/task';
