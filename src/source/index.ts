import {IBotphusRuleOpt} from './interfaces/common';
import {TaskRuleTypeItem} from './interfaces/task';

// Import after espower-loader to enable espower assert style
import {validTaskRules} from './lib/valid';

/**
 * Botphus Rule
 */
class BotphusRule {
    private option: IBotphusRuleOpt;
    constructor(option: IBotphusRuleOpt = {}) {
        this.option = option;
    }
    public validRule(taskRuleList: TaskRuleTypeItem[]): Promise<void> {
        return validTaskRules(taskRuleList, this.option);
    }
}

export default BotphusRule;
// export types
export * from './types/task';
// export interfaces
export * from './interfaces/common';
export * from './interfaces/task';
