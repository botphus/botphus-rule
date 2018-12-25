"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const task_1 = require("../../source/types/task");
const source_1 = require("../../source/");
const CONST = require("../common/const");
const tool_1 = require("../common/tool");
const defaultRule = new source_1.default();
const blockTypeRule = new source_1.default({
    blockType: new Set().add(task_1.TaskType.TYPE_DATA).add(task_1.TaskType.TYPE_DOM)
});
const blockSubTypeRule = new source_1.default({
    blockSubType: new Set().add(task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL)
});
function default_1() {
    describe('Valid#validRule', () => {
        describe('validRule', () => {
            it('validRule with default rule', () => {
                return defaultRule.validRule([
                    {
                        arguments: ['div'],
                        assertion: ['data.type === `123`', 'data.name === \'123\''],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                        type: task_1.TaskType.TYPE_DOM
                    }
                ]);
            });
            it('validRule with children', () => {
                return defaultRule.validRule([
                    {
                        arguments: [100, (info) => {
                                return info.args;
                            }],
                        children: [
                            {
                                arguments: ['div'],
                                subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                                type: task_1.TaskType.TYPE_DOM,
                            }
                        ],
                        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: task_1.TaskType.TYPE_EVENT,
                    }
                ]);
            });
            it('validRule with full rules', () => {
                return defaultRule.validRule(CONST.TASK_FULL_LIST);
            });
            it('validRule with react rules', () => {
                return defaultRule.validRule(CONST.TASK_REACT_LIST);
            });
            it('validRule with union block rules', () => {
                return defaultRule.validRule(CONST.TASK_UNION_BLOCK_LIST);
            });
            it('validRule with union non-block rules', () => {
                return defaultRule.validRule(CONST.TASK_UNION_NON_BLOCK_LIST);
            });
        });
        describe('Error', () => {
            it('validRule with empty rules', () => {
                return tool_1.validPromiseError(defaultRule.validRule([]), (err) => {
                    assert(err.message.indexOf('Task rule list is empty') >= 0);
                });
            });
            it('blockType', () => {
                return tool_1.validPromiseError(blockTypeRule.validRule(CONST.TASK_FULL_LIST), (err) => {
                    assert(err.message.indexOf('The current runner can\'t use type') >= 0);
                });
            });
            it('blockSubType', () => {
                return tool_1.validPromiseError(blockSubTypeRule.validRule(CONST.TASK_FULL_LIST), (err) => {
                    assert(err.message.indexOf('The current runner can\'t use sub-type') >= 0);
                });
            });
            it('validRule with empty data rule assertion', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        assertion: [],
                        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('Assertion list can\'t be empty array') >= 0);
                });
            });
            it('validRule with wrong data rule assertion', () => {
                // @ts-ignore
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        // @ts-ignore
                        assertion: [{}],
                        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('Assertion list item\'s content must be string') >= 0);
                });
            });
            it('validRule without data rule assertion', () => {
                // @ts-ignore
                return tool_1.validPromiseError(defaultRule.validRule([
                    // @ts-ignore
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('Data type rule must have assertion field') >= 0);
                });
            });
            it('validRule with wrong data mysql rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        assertion: ['data === "test"'],
                        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_MYSQL must have sqlQuery') >= 0);
                });
            });
            it('validRule with wrong data mysql rule arguments sqlQuery', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [0],
                        assertion: ['data === "test"'],
                        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: task_1.TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_MYSQL\'s sqlQuery must be string') >= 0);
                });
            });
            it('validRule with wrong data redis rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        assertion: ['data === "test"'],
                        subType: task_1.TaskTypeDataSubType.SUB_TYPE_REDIS,
                        type: task_1.TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_REDIS must have commands') >= 0);
                });
            });
            it('validRule with wrong data redis rule arguments commands', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [1],
                        assertion: ['data === "test"'],
                        subType: task_1.TaskTypeDataSubType.SUB_TYPE_REDIS,
                        type: task_1.TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_REDIS\'s commands must be string[][]') >= 0);
                });
            });
            it('validRule with wrong dom click rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                        type: task_1.TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_CLICK must have selector') >= 0);
                });
            });
            it('validRule with wrong dom click rule humanClick', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: ['div', '123'],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                        type: task_1.TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('if SUB_TYPE_CLICK have humanClick, humanClick must be boolean') >= 0);
                });
            });
            it('validRule with wrong dom getHtml rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_HTML,
                        type: task_1.TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_GET_HTML/SUB_TYPE_GET_TEXT must have selector') >= 0);
                });
            });
            it('validRule with wrong dom keyboard rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_KEYBOARD,
                        type: task_1.TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_KEYBOARD must have selector, text') >= 0);
                });
            });
            it('validRule with wrong dom getAttr rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
                        type: task_1.TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_GET_ATTR must have selector, attrName') >= 0);
                });
            });
            it('validRule with wrong dom setAttr rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_SET_ATTR,
                        type: task_1.TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_SET_ATTR must have selector, attrName, attrValue') >= 0);
                });
            });
            it('validRule with wrong dom setInputfiles rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
                        type: task_1.TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_SET_INPUT_FILES must have selector, filesPath') >= 0);
                });
            });
            it('validRule with wrong event rule', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        children: [],
                        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: task_1.TaskType.TYPE_EVENT,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('Event type rule must have children field') >= 0);
                });
            });
            it('validRule with wrong event rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        children: [
                            {
                                arguments: ['div'],
                                assertion: ['data.type === `123`', 'data.name === \'123\''],
                                subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                                type: task_1.TaskType.TYPE_DOM
                            }
                        ],
                        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: task_1.TaskType.TYPE_EVENT,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('TYPE_EVENT must have timeout') >= 0);
                });
            });
            it('validRule with wrong event rule arguments checkFunc', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [100, 'test'],
                        children: [
                            {
                                arguments: ['div'],
                                assertion: ['data.type === `123`', 'data.name === \'123\''],
                                subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                                type: task_1.TaskType.TYPE_DOM
                            }
                        ],
                        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: task_1.TaskType.TYPE_EVENT,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('if TYPE_EVENT have checkFunc, checkFunc must be function') >= 0);
                });
            });
            it('validRule with wrong page setCookie rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: task_1.TaskTypePageSubType.SUB_TYPE_SET_COOKIE,
                        type: task_1.TaskType.TYPE_PAGE,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_SET_COOKIE/SUB_TYPE_DELETE_COOKIE must have cookies') >= 0);
                });
            });
            it('validRule with wrong page getCookie rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: task_1.TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
                        type: task_1.TaskType.TYPE_PAGE,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('If SUB_TYPE_GET_COOKIE have urls, urls must be array') >= 0);
                });
            });
            it('validRule with wrong page goto rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: task_1.TaskTypePageSubType.SUB_TYPE_GOTO,
                        type: task_1.TaskType.TYPE_PAGE,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_GOTO must have url') >= 0);
                });
            });
            it('validRule with wrong page goto rule option argment', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: ['https://bing.com', ''],
                        subType: task_1.TaskTypePageSubType.SUB_TYPE_GOTO,
                        type: task_1.TaskType.TYPE_PAGE,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('If SUB_TYPE_GOTO have option, option must be object') >= 0);
                });
            });
            it('validRule with wrong page reload rule option argment', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [''],
                        subType: task_1.TaskTypePageSubType.SUB_TYPE_RELOAD,
                        type: task_1.TaskType.TYPE_PAGE,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('If SUB_TYPE_RELOAD have option, option must be object') >= 0);
                });
            });
            it('validRule with wrong page screenshot rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: ['test'],
                        subType: task_1.TaskTypePageSubType.SUB_TYPE_SCREENSHOT,
                        type: task_1.TaskType.TYPE_PAGE,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('If SUB_TYPE_SCREENSHOT have option, option must be object') >= 0);
                });
            });
            it('validRule with wrong time sleep rule arguments', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: task_1.TaskTypeTimeSubType.SUB_TYPE_SET_SLEEP,
                        type: task_1.TaskType.TYPE_TIME,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_SET_SLEEP must have sleepTime') >= 0);
                });
            });
            it('validRule with wrong union rule', () => {
                return tool_1.validPromiseError(defaultRule.validRule([
                    {
                        children: [],
                        subType: task_1.TaskTypeUnionSubType.SUB_TYPE_BLOCK,
                        type: task_1.TaskType.TYPE_UNION,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('Union type rule must have children field') >= 0);
                });
            });
        });
    });
}
exports.default = default_1;
