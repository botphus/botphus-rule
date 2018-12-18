import * as assert from 'assert';

import {
    TaskSubType, TaskType,
    TaskTypeDataSubType, TaskTypeDomSubType, TaskTypeEventSubType, TaskTypePageSubType, TaskTypeTimeSubType, TaskTypeUnionSubType} from '../../source/types/task';

import BotphusRule from '../../source/';
import * as CONST from '../common/const';
import {validPromiseError} from '../common/tool';

const defaultRule = new BotphusRule();

const blockTypeRule = new BotphusRule({
    blockType: new Set<TaskType>().add(TaskType.TYPE_DATA).add(TaskType.TYPE_DOM)
});

const blockSubTypeRule = new BotphusRule({
    blockSubType: new Set<TaskSubType>().add(TaskTypeDataSubType.SUB_TYPE_MYSQL)
});

export default function() {
    describe('Valid#validRule', () => {
        describe('validRule', () => {
            it('validRule with default rule', () => {
                return defaultRule.validRule([
                    {
                        arguments: ['div'],
                        assertion: ['data.type === `123`', 'data.name === \'123\''],
                        subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                        type: TaskType.TYPE_DOM
                    }
                ]);
            });
            it('validRule with children', () => {
                return defaultRule.validRule([
                    {
                        arguments: [100, (info: any) => {
                            return info.args;
                        }],
                        children: [
                            {
                                arguments: ['div'],
                                subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                                type: TaskType.TYPE_DOM,
                            }
                        ],
                        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: TaskType.TYPE_EVENT,
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
                return validPromiseError(defaultRule.validRule([]), (err) => {
                    assert(err.message.indexOf('Task rule list is empty') >= 0);
                });
            });
            it('blockType', () => {
                return validPromiseError(blockTypeRule.validRule(CONST.TASK_FULL_LIST), (err) => {
                    assert(err.message.indexOf('The current runner can\'t use type') >= 0);
                });
            });
            it('blockSubType', () => {
                return validPromiseError(blockSubTypeRule.validRule(CONST.TASK_FULL_LIST), (err) => {
                    assert(err.message.indexOf('The current runner can\'t use sub-type') >= 0);
                });
            });
            it('validRule with empty data rule assertion', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        assertion: [],
                        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('Assertion list can\'t be empty array') >= 0);
                });
            });
            it('validRule with wrong data rule assertion', () => {
                // @ts-ignore
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        // @ts-ignore
                        assertion: [{}],
                        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('Assertion list item\'s content must be string') >= 0);
                });
            });
            it('validRule without data rule assertion', () => {
                // @ts-ignore
                return validPromiseError(defaultRule.validRule([
                    // @ts-ignore
                    {
                        arguments: [],
                        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('Data type rule must have assertion field') >= 0);
                });
            });
            it('validRule with wrong data mysql rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        assertion: ['data === "test"'],
                        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_MYSQL must have sqlQuery') >= 0);
                });
            });
            it('validRule with wrong data mysql rule arguments sqlQuery', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [0],
                        assertion: ['data === "test"'],
                        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
                        type: TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_MYSQL\'s sqlQuery must be string') >= 0);
                });
            });
            it('validRule with wrong data redis rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        assertion: ['data === "test"'],
                        subType: TaskTypeDataSubType.SUB_TYPE_REDIS,
                        type: TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_REDIS must have commands') >= 0);
                });
            });
            it('validRule with wrong data redis rule arguments commands', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [1],
                        assertion: ['data === "test"'],
                        subType: TaskTypeDataSubType.SUB_TYPE_REDIS,
                        type: TaskType.TYPE_DATA,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_REDIS\'s commands must be string[][]') >= 0);
                });
            });
            it('validRule with wrong dom click rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                        type: TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_CLICK must have selector') >= 0);
                });
            });
            it('validRule with wrong dom click rule humanClick', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: ['div', '123'],
                        subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                        type: TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('if SUB_TYPE_CLICK have humanClick, humanClick must be boolean') >= 0);
                });
            });
            it('validRule with wrong dom getHtml rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: TaskTypeDomSubType.SUB_TYPE_GET_HTML,
                        type: TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_GET_HTML/SUB_TYPE_GET_TEXT must have selector') >= 0);
                });
            });
            it('validRule with wrong dom keyboard rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: TaskTypeDomSubType.SUB_TYPE_KEYBOARD,
                        type: TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_KEYBOARD must have selector, text') >= 0);
                });
            });
            it('validRule with wrong dom getAttr rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
                        type: TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_GET_ATTR must have selector, attrName') >= 0);
                });
            });
            it('validRule with wrong dom setAttr rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: TaskTypeDomSubType.SUB_TYPE_SET_ATTR,
                        type: TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_SET_ATTR must have selector, attrName, attrValue') >= 0);
                });
            });
            it('validRule with wrong dom setInputfiles rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
                        type: TaskType.TYPE_DOM,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_SET_INPUT_FILES must have selector, filesPath') >= 0);
                });
            });
            it('validRule with wrong event rule', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        children: [],
                        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: TaskType.TYPE_EVENT,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('Event type rule must have children field') >= 0);
                });
            });
            it('validRule with wrong event rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        children: [
                            {
                                arguments: ['div'],
                                assertion: ['data.type === `123`', 'data.name === \'123\''],
                                subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                                type: TaskType.TYPE_DOM
                            }
                        ],
                        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: TaskType.TYPE_EVENT,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('TYPE_EVENT must have timeout') >= 0);
                });
            });
            it('validRule with wrong event rule arguments checkFunc', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [100, 'test'],
                        children: [
                            {
                                arguments: ['div'],
                                assertion: ['data.type === `123`', 'data.name === \'123\''],
                                subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
                                type: TaskType.TYPE_DOM
                            }
                        ],
                        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
                        type: TaskType.TYPE_EVENT,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('if TYPE_EVENT have checkFunc, checkFunc must be function') >= 0);
                });
            });
            it('validRule with wrong page setCookie rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: TaskTypePageSubType.SUB_TYPE_SET_COOKIE,
                        type: TaskType.TYPE_PAGE,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_SET_COOKIE/SUB_TYPE_DELETE_COOKIE must have cookies') >= 0);
                });
            });
            it('validRule with wrong page getCookie rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
                        type: TaskType.TYPE_PAGE,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('If SUB_TYPE_GET_COOKIE have urls, urls must be array') >= 0);
                });
            });
            it('validRule with wrong page goto rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: TaskTypePageSubType.SUB_TYPE_GOTO,
                        type: TaskType.TYPE_PAGE,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_GOTO must have url') >= 0);
                });
            });
            it('validRule with wrong page goto rule option argment', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: ['https://bing.com', ''],
                        subType: TaskTypePageSubType.SUB_TYPE_GOTO,
                        type: TaskType.TYPE_PAGE,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('If SUB_TYPE_GOTO have option, option must be object') >= 0);
                });
            });
            it('validRule with wrong page reload rule option argment', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [''],
                        subType: TaskTypePageSubType.SUB_TYPE_RELOAD,
                        type: TaskType.TYPE_PAGE,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('If SUB_TYPE_RELOAD have option, option must be object') >= 0);
                });
            });
            it('validRule with wrong page screenshot rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: ['test'],
                        subType: TaskTypePageSubType.SUB_TYPE_SCREENSHOT,
                        type: TaskType.TYPE_PAGE,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('If SUB_TYPE_SCREENSHOT have option, option must be object') >= 0);
                });
            });
            it('validRule with wrong time sleep rule arguments', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        arguments: [],
                        subType: TaskTypeTimeSubType.SUB_TYPE_SET_SLEEP,
                        type: TaskType.TYPE_TIME,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('SUB_TYPE_SET_SLEEP must have sleepTime') >= 0);
                });
            });
            it('validRule with wrong union rule', () => {
                return validPromiseError(defaultRule.validRule([
                    {
                        children: [],
                        subType: TaskTypeUnionSubType.SUB_TYPE_BLOCK,
                        type: TaskType.TYPE_UNION,
                    }
                ]), (err) => {
                    assert(err.message.indexOf('Union type rule must have children field') >= 0);
                });
            });
        });
    });
}
