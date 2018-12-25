"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Import after espower-loader to enable espower assert style
const valid_1 = require("./lib/valid");
/**
 * Botphus Rule
 */
class BotphusRule {
    constructor(option = {}) {
        this.option = option;
    }
    validRule(taskRuleList) {
        return valid_1.validTaskRules(taskRuleList, this.option);
    }
}
exports.default = BotphusRule;
// export types
__export(require("./types/task"));
