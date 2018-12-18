// Set espower-loader
import * as loader from 'espower-loader';
import * as path from 'path';

import {IBotphusRuleOpt} from './interfaces/common';
import {TaskRuleTypeItem} from './interfaces/task';

loader({
    cwd: path.join(__dirname, './lib'),
    espowerOptions: {
        patterns: [
            'assert(value, [message])',
            'assert.ok(value, [message])',
            'assert.equal(actual, expected, [message])',
            'assert.notEqual(actual, expected, [message])',
            'assert.strictEqual(actual, expected, [message])',
            'assert.notStrictEqual(actual, expected, [message])',
            'assert.deepEqual(actual, expected, [message])',
            'assert.notDeepEqual(actual, expected, [message])',
            'assert.deepStrictEqual(actual, expected, [message])',
            'assert.notDeepStrictEqual(actual, expected, [message])'
        ]
    },
    pattern: 'valid.js',
});

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
