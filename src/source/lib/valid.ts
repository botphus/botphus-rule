import * as assert from 'assert';

import {IBotphusRuleOpt} from '../interfaces/common';
import {ITaskDataRuleItem, ITaskDomRuleItem, ITaskEventRuleItem, ITaskPageRuleItem, ITaskTimeRuleItem, ITaskUnionRuleItem, TaskRuleTypeItem} from '../interfaces/task';
import {TaskType, TaskTypeDataSubType, TaskTypeDomSubType, TaskTypePageSubType, TaskTypeTimeSubType} from '../types/task';

/**
 * Valid task rules
 * @param  {TaskRuleTypeItem[]} taskRules Task Rule List
 * @return {Promise<void>}                Promise with nothing
 */
/**
 * Valid task rules
 * @param  {TaskRuleTypeItem[]} taskRules Task Rule List
 * @param  {IBotphusRuleOpt}    opt       Current option
 * @return {Promise<void>}                Promise with nothing
 */
export function validTaskRules(taskRules: TaskRuleTypeItem[], opt: IBotphusRuleOpt): Promise<void> {
    return Promise.resolve()
        .then(() => {
            assert(taskRules.length > 0, 'Task rule list is empty');
            loopRules(taskRules, opt);
        });
}

/**
 * Loop through rules & check every rule & rebuild rule
 * @param {TaskRuleTypeItem[]} taskRules   Task Rule List
 * @param {IBotphusRuleOpt}    opt         Current option
 * @param {string}             parentIndex Parent rule index
 */
function loopRules(taskRules: TaskRuleTypeItem[], opt: IBotphusRuleOpt, parentIndex?: string): void {
    taskRules.forEach((taskRule: TaskRuleTypeItem, index: number) => {
        assignTaskRule(taskRule, opt);
        // Set rule index, if not send
        if (!taskRule.index) {
            taskRule.index = parentIndex ? `${parentIndex}-${index}` : `${index}`;
        }
        // if rule's type is event, check children
        if (taskRule.type === TaskType.TYPE_EVENT || taskRule.type === TaskType.TYPE_UNION) {
            loopRules(taskRule.children, opt, `${taskRule.index}`);
        }
    });
}

/**
 * Assign task rule to type check function
 * @param {TaskRuleTypeItem} taskRule Task Rule
 * @param {IBotphusRuleOpt}  opt      Current option
 */
function assignTaskRule(taskRule: TaskRuleTypeItem, opt: IBotphusRuleOpt): void {
    // Check common fields
    if (taskRule.assertion) {
        assert(taskRule.assertion.length > 0,
            'Assertion list can\'t be empty array');
        assert(taskRule.assertion.some((assertionStr) => {
            return typeof assertionStr === 'string';
        }),
            'Assertion list item\'s content must be string');
    }
    // Check block type
    if (opt.blockType) {
        assert(opt.blockType.has(taskRule.type), `The current runner can't use type: ${taskRule.type}`);
    }
    // Check block sub-type
    if (opt.blockSubType) {
        assert(opt.blockSubType.has(taskRule.subType), `The current runner can't use sub-type: ${taskRule.subType}`);
    }
    switch (taskRule.type) {
        case TaskType.TYPE_DATA:
            dataTypeCheckAndRebuild(taskRule);
            break;
        case TaskType.TYPE_DOM:
            domTypeCheckAndRebuild(taskRule);
            break;
        case TaskType.TYPE_EVENT:
            eventTypeCheckAndRebuild(taskRule);
            break;
        case TaskType.TYPE_PAGE:
            pageTypeCheckAndRebuild(taskRule);
            break;
        case TaskType.TYPE_TIME:
            timeTypeCheckAndRebuild(taskRule);
            break;
        case TaskType.TYPE_UNION:
            unionTypeCheckAndRebuild(taskRule);
            break;
    }
}

/**
 * Data type check & rebuild
 * @param  {ITaskDataRuleItem} taskRule Data Rule
 */
function dataTypeCheckAndRebuild(taskRule: ITaskDataRuleItem): void {
    // Valid common fields
    assert(taskRule.assertion, 'Data type rule must have assertion field');
    switch (taskRule.subType) {
        case TaskTypeDataSubType.SUB_TYPE_MYSQL:
            assert(taskRule.arguments && taskRule.arguments.length === 1,
                'SUB_TYPE_MYSQL must have sqlQuery');
            assert(typeof taskRule.arguments[0] === 'string',
                'SUB_TYPE_MYSQL\'s sqlQuery must be string');
            break;
        case TaskTypeDataSubType.SUB_TYPE_REDIS:
            assert(taskRule.arguments && taskRule.arguments.length === 1,
                'SUB_TYPE_REDIS must have commands');
            assert(Array.isArray(taskRule.arguments[0]),
                'SUB_TYPE_REDIS\'s commands must be string[][]');
            break;
    }
}

/**
 * Dom type check & rebuild
 * @param  {ITaskDomRuleItem} taskRule Dom Rule
 */
function domTypeCheckAndRebuild(taskRule: ITaskDomRuleItem): void {
    switch (taskRule.subType) {
        case TaskTypeDomSubType.SUB_TYPE_CLICK:
            assert(taskRule.arguments && (taskRule.arguments.length === 1 || taskRule.arguments.length === 2),
                'SUB_TYPE_CLICK must have selector');
            assert(typeof taskRule.arguments[0] === 'string',
                'SUB_TYPE_CLICK\'s selector must be string');
            if (taskRule.arguments.length === 2) {
                assert(typeof taskRule.arguments[1] === 'boolean',
                    'if SUB_TYPE_CLICK have humanClick, humanClick must be boolean');
            } else {
                taskRule.arguments[1] = true;
            }
            break;
        case TaskTypeDomSubType.SUB_TYPE_GET_HTML:
        case TaskTypeDomSubType.SUB_TYPE_GET_TEXT:
            assert(taskRule.arguments && taskRule.arguments.length === 1,
                'SUB_TYPE_GET_HTML/SUB_TYPE_GET_TEXT must have selector');
            assert(typeof taskRule.arguments[0] === 'string',
                'SUB_TYPE_GET_HTML/SUB_TYPE_GET_TEXT\'s selector must be string');
            break;
        case TaskTypeDomSubType.SUB_TYPE_KEYBOARD:
            assert(taskRule.arguments && taskRule.arguments.length === 2,
                'SUB_TYPE_KEYBOARD must have selector, text');
            assert(typeof taskRule.arguments[0] === 'string' && typeof taskRule.arguments[1] === 'string',
                'SUB_TYPE_KEYBOARD\'s selector, text must be string');
            break;
        case TaskTypeDomSubType.SUB_TYPE_GET_ATTR:
            assert(taskRule.arguments && taskRule.arguments.length === 2,
                'SUB_TYPE_GET_ATTR must have selector, attrName');
            assert(typeof taskRule.arguments[0] === 'string' && typeof taskRule.arguments[1] === 'string',
                'SUB_TYPE_GET_ATTR\'s selector, attrName must be string');
            break;
        case TaskTypeDomSubType.SUB_TYPE_SET_ATTR:
            assert(taskRule.arguments && taskRule.arguments.length === 3,
                'SUB_TYPE_SET_ATTR must have selector, attrName, attrValue');
            assert(typeof taskRule.arguments[0] === 'string' && typeof taskRule.arguments[1] === 'string' && typeof taskRule.arguments[2] === 'string',
                'SUB_TYPE_SET_ATTR\'s selector, attrName, attrValue must be string');
            break;
        case TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES:
            assert(taskRule.arguments && taskRule.arguments.length === 2,
                'SUB_TYPE_SET_INPUT_FILES must have selector, filesPath');
            assert(typeof taskRule.arguments[0] === 'string' && Array.isArray(taskRule.arguments[1]),
                'SUB_TYPE_SET_INPUT_FILES\'s selector must be string & filesPath must be string[]');
            break;
    }
}

/**
 * Event type check & rebuild
 * @param  {ITaskEventRuleItem} taskRule Event Rule
 */
function eventTypeCheckAndRebuild(taskRule: ITaskEventRuleItem): void {
    // Valid common fields
    assert(taskRule.children && Array.isArray(taskRule.children) && taskRule.children.length > 0,
        'Event type rule must have children field');
    assert(taskRule.arguments && (taskRule.arguments.length === 1 || taskRule.arguments.length === 2),
        'TYPE_EVENT must have timeout');
    assert(typeof taskRule.arguments[0] === 'number',
        'TYPE_EVENT\'s timeout must be millisecond number');
    if (taskRule.arguments.length === 2) {
        assert(typeof taskRule.arguments[1] === 'function',
            'if TYPE_EVENT have checkFunc, checkFunc must be function');
    }
    // Change arguments checkFunc to string
    if (taskRule.arguments.length === 1) {
        taskRule.arguments[1] = 'null';
    } else {
        taskRule.arguments[1] = taskRule.arguments[1].toString();
    }
}

/**
 * Page type check & rebuild
 * @param  {ITaskPageRuleItem} taskRule Page Rule
 */
function pageTypeCheckAndRebuild(taskRule: ITaskPageRuleItem): void {
    switch (taskRule.subType) {
        case TaskTypePageSubType.SUB_TYPE_SET_COOKIE:
        case TaskTypePageSubType.SUB_TYPE_DELETE_COOKIE:
            assert(taskRule.arguments && taskRule.arguments.length === 1,
                'SUB_TYPE_SET_COOKIE/SUB_TYPE_DELETE_COOKIE must have cookies');
            assert(Array.isArray(taskRule.arguments[0]),
                'SUB_TYPE_SET_COOKIE/SUB_TYPE_DELETE_COOKIE\'s cookies must be array');
        case TaskTypePageSubType.SUB_TYPE_GET_COOKIE:
            if (taskRule.arguments) {
                assert(taskRule.arguments.length === 1 && Array.isArray(taskRule.arguments[0]),
                'If SUB_TYPE_GET_COOKIE have urls, urls must be array');
            }
            break;
        case TaskTypePageSubType.SUB_TYPE_GOTO:
            assert(taskRule.arguments && (taskRule.arguments.length === 1 || taskRule.arguments.length === 2),
                'SUB_TYPE_GOTO must have url');
            assert(typeof taskRule.arguments[0] === 'string',
                'SUB_TYPE_GOTO\'s url must be string');
            if (taskRule.arguments.length === 2) {
                assert(typeof taskRule.arguments[1] === 'object',
                    'If SUB_TYPE_GOTO have option, option must be object');
            }
            break;
        case TaskTypePageSubType.SUB_TYPE_RELOAD:
            if (taskRule.arguments) {
                assert(taskRule.arguments.length === 1 && typeof taskRule.arguments[0] === 'object',
                    'If SUB_TYPE_RELOAD have option, option must be object');
            }
            break;
        case TaskTypePageSubType.SUB_TYPE_SCREENSHOT:
            if (taskRule.arguments) {
                assert(typeof taskRule.arguments[0] === 'object',
                    'If SUB_TYPE_SCREENSHOT have option, option must be object');
            } else {
                taskRule.arguments = [{}];
            }
            break;
    }
}

/**
 * Time type check & rebuild
 * @param  {ITaskTimeRuleItem} taskRule Time Rule
 */
function timeTypeCheckAndRebuild(taskRule: ITaskTimeRuleItem): void {
    switch (taskRule.subType) {
        case TaskTypeTimeSubType.SUB_TYPE_SET_SLEEP:
            assert(taskRule.arguments && taskRule.arguments.length === 1,
                'SUB_TYPE_SET_SLEEP must have sleepTime');
            assert(typeof taskRule.arguments[0] === 'number' && taskRule.arguments[0] > 0,
                'SUB_TYPE_SET_SLEEP\'s sleepTime must be millisecond number');
            break;
    }
}

/**
 * Union type check & rebuild
 * @param  {ITaskUnionRuleItem} taskRule Union Rule
 */
function unionTypeCheckAndRebuild(taskRule: ITaskUnionRuleItem): void {
    assert(taskRule.children && Array.isArray(taskRule.children) && taskRule.children.length > 0,
        'Union type rule must have children field');
}
