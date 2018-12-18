import * as path from 'path';

import {TaskRuleTypeItem} from '../../source/interfaces/task';
import {TaskType,
    TaskTypeDataSubType, TaskTypeDomSubType, TaskTypeEventSubType, TaskTypePageSubType, TaskTypeTimeSubType, TaskTypeUnionSubType
} from '../../source/types/task';

// value
export const SEARCH_SELECTOR_VALUE = 'Botphus value';
export const EVENT_TIMEOUT = 3000;
export const SLEEP_TIME = 100;
export const DIALOG_VALUE = 'botphus dialog';
export const CONSOLE_VALUE = 'botphus console';
export const COOKIE_NAME = 'botphus';
export const COOKIE_VALUE = 'botphus cookie value';
export const COOKIE_URL = 'https://github.com/';
export const COOKIE_DOMAIN = 'github.com';

// Normal page
export const NORMAL_PAGE_PATH = 'file://' + path.join(__dirname, '../../../test/src/normal_test_page.html');
export const NORMAL_PAGE_SEARCH_SELECTOR = 'form:nth-child(3) > div:nth-child(1) > #search';
export const NORMAL_PAGE_PARENT_SEARCH_SELECTOR = 'form:nth-child(3) > div:nth-child(1)';
export const NORMAL_PAGE_FILE_SELECTOR = 'form:nth-child(3) > div:nth-child(2) > #file';
export const NORMAL_PAGE_FILE_MULTI_SELECTOR = 'form:nth-child(3) > div:nth-child(3) > #file-multi';
export const NORMAL_PAGE_DIALOG_SELECTOR = 'div:nth-child(2) > #dialog';
export const NORMAL_PAGE_CONSOLE_SELECTOR = 'div:nth-child(2) > #console';
export const NORMAL_PAGE_CONSOLE_COVER_SELECTOR = '#console-cover';
export const NORMAL_PAGE_REQUEST_SELECTOR = 'div:nth-child(2) > #request';
export const NORMAL_PAGE_REQUEST_JSONP_SELECTOR = 'div:nth-child(2) > #request-jsonp';
export const NORMAL_PAGE_SEARCH_SELECTOR_FIELD = 'value';
export const NORMAL_PAGE_FILE_SELECTOR_FIELD = 'files';
export const NORMAL_PAGE_PARENT_SEARCH_SELECTOR_HTML = '<label for="search">搜索名称</label><input type="text" name="search" id="search">';
export const NORMAL_PAGE_PARENT_SEARCH_SELECTOR_TEXT = '搜索名称';

// React Page
export const REACT_PAGE_PATH = 'file://' + path.join(__dirname, '../../../test/src/react_test_page.html');
export const REACT_PAGE_FORM_SELECTOR = '#container > form:nth-child(1)';
export const REACT_PAGE_FORM_ITEM_SELECTOR = '.ant-form-item-control-wrapper:nth-child(2) .ant-form-item-children';
export const REACT_PAGE_FORM_SELECT1_SELECTOR = `${REACT_PAGE_FORM_SELECTOR} > .ant-form-item:nth-child(2) > ${REACT_PAGE_FORM_ITEM_SELECTOR}`;
export const REACT_PAGE_FORM_SELECT2_SELECTOR = `${REACT_PAGE_FORM_SELECTOR} > .ant-form-item:nth-child(3) > ${REACT_PAGE_FORM_ITEM_SELECTOR}`;
export const REACT_PAGE_FORM_BUTTON_SELECTOR = `${REACT_PAGE_FORM_SELECTOR} > .ant-form-item:nth-child(12) .ant-form-item-children`;
export const REACT_PAGE_FORM_BUTTON_SUBMIT_SELECTOR = `${REACT_PAGE_FORM_BUTTON_SELECTOR} > button:nth-child(1)`;
export const REACT_PAGE_OUTSIDE_SELECT_DROPDOWN_ITEM_SELECTOR = 'div > .ant-select-dropdown > div > .ant-select-dropdown-menu > .ant-select-dropdown-menu-item:nth-child(1)';
export const REACT_PAGE_OUTSIDE_SELECT1_DROPDOWN_SELECTOR = `div:nth-child(3) > ${REACT_PAGE_OUTSIDE_SELECT_DROPDOWN_ITEM_SELECTOR}`;
export const REACT_PAGE_OUTSIDE_SELECT2_DROPDOWN_SELECTOR = `div:nth-child(4) > ${REACT_PAGE_OUTSIDE_SELECT_DROPDOWN_ITEM_SELECTOR}`;
export const REACT_PAGE_FORM_FILE_SELECTOR = `${REACT_PAGE_FORM_SELECTOR} > .ant-form-item:nth-child(10) .ant-form-item-children .ant-upload input`;

export const REACT_PAGE_CONSOLE_FORM_MESSAGE = 'Received values of form: ';
export const REACT_PAGE_CONSOLE_FORM_MESSAGE_UPLOAD = 'Upload event:';
export const REACT_PAGE_UPLOAD_PATH = 'upload.do';

// Resource
export const RESOURCE_IMAGE_PATH = path.join(__dirname, '../../../test/src/test-image.png');
export const RESOURCE_PDF_PATH = path.join(__dirname, '../../../test/src/phocapdf-demo2.pdf');
export const RESOURCE_FILE_NAME_REG = /^\S+[\\/]([^\\/]+\.[^\\/]+)$/;
export const RESOURCE_FILE_NAME = 'test-image.png';

// Data
// Mysql
export const MYSQL_TABLE_NAME = 'bp_user';
export const MYSQL_FIELD_NAME = 'user_name';
export const MYSQL_FIELD_VALUE = 'Hans Zimmer';
export const MYSQL_CREATE_TABLE = `
    CREATE TABLE ${MYSQL_TABLE_NAME} (
        id int(11) auto_increment NOT NULL,
        ${MYSQL_FIELD_NAME} varchar(128) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;
export const MYSQL_INSERT_DATA = `INSERT INTO ${MYSQL_TABLE_NAME} (${MYSQL_FIELD_NAME}) VALUES ("${MYSQL_FIELD_VALUE}")`;
export const MYSQL_SELECT_DATA = `SELECT * FROM ${MYSQL_TABLE_NAME} WHERE ${MYSQL_FIELD_NAME} = "${MYSQL_FIELD_VALUE}"`;
export const MYSQL_DROP_TABLE = `DROP TABLE IF EXISTS ${MYSQL_TABLE_NAME}`;

/// redis
export const REDIS_KEY_NAME = 'botphus:test';
export const REDIS_KEY_VALUE = 'Morgan Freeman';

// Task
export const TASK_FULL_NAME = 'Full task';
export const TASK_FULL_LIST: TaskRuleTypeItem[] = [
    /**
     * Data
     */
    // Mysql
    /// Create Table
    {
        arguments: [MYSQL_CREATE_TABLE],
        assertion: ['data'],
        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: TaskType.TYPE_DATA
    },
    /// Inset Table
    {
        arguments: [MYSQL_INSERT_DATA],
        assertion: ['data'],
        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: TaskType.TYPE_DATA
    },
    /// Select Table
    {
        arguments: [MYSQL_SELECT_DATA],
        assertion: ['data.length === 1', 'data[0].id === 1', `data[0].${MYSQL_FIELD_NAME} === "${MYSQL_FIELD_VALUE}"`],
        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: TaskType.TYPE_DATA
    },
    /// Drop Table
    {
        arguments: [MYSQL_DROP_TABLE],
        assertion: ['data'],
        subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: TaskType.TYPE_DATA
    },
    // Redis
    /// set
    {
        arguments: [[['set', REDIS_KEY_NAME, REDIS_KEY_VALUE]]],
        assertion: ['data'],
        subType: TaskTypeDataSubType.SUB_TYPE_REDIS,
        type: TaskType.TYPE_DATA
    },
    /// get
    {
        arguments: [[['get', REDIS_KEY_NAME]]],
        assertion: ['data.length === 1', `data[0][1] === "${REDIS_KEY_VALUE}"`],
        subType: TaskTypeDataSubType.SUB_TYPE_REDIS,
        type: TaskType.TYPE_DATA
    },
    /// del
    {
        arguments: [[['del', REDIS_KEY_NAME]]],
        assertion: ['data'],
        subType: TaskTypeDataSubType.SUB_TYPE_REDIS,
        type: TaskType.TYPE_DATA
    },
    // goto
    {
        arguments: [NORMAL_PAGE_PATH.replace(/\\/g, '\\\\')],
        subType: TaskTypePageSubType.SUB_TYPE_GOTO,
        type: TaskType.TYPE_PAGE
    },
    /**
     * Dom
     */
    // click
    {
        arguments: [NORMAL_PAGE_SEARCH_SELECTOR],
        subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
        type: TaskType.TYPE_DOM
    },
    // keyboard
    {
        arguments: [NORMAL_PAGE_SEARCH_SELECTOR, SEARCH_SELECTOR_VALUE],
        subType: TaskTypeDomSubType.SUB_TYPE_KEYBOARD,
        type: TaskType.TYPE_DOM
    },
    // getAttr
    {
        arguments: [NORMAL_PAGE_SEARCH_SELECTOR, NORMAL_PAGE_SEARCH_SELECTOR_FIELD],
        assertion: [`data === "${SEARCH_SELECTOR_VALUE}"`],
        subType: TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
        type: TaskType.TYPE_DOM
    },
    // setAttr
    {
        arguments: [NORMAL_PAGE_SEARCH_SELECTOR, NORMAL_PAGE_SEARCH_SELECTOR_FIELD, SEARCH_SELECTOR_VALUE],
        subType: TaskTypeDomSubType.SUB_TYPE_SET_ATTR,
        type: TaskType.TYPE_DOM
    },
    // getHtml
    {
        arguments: [NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === '${NORMAL_PAGE_PARENT_SEARCH_SELECTOR_HTML}'`],
        subType: TaskTypeDomSubType.SUB_TYPE_GET_HTML,
        type: TaskType.TYPE_DOM
    },
    // getText
    {
        arguments: [NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === "${NORMAL_PAGE_PARENT_SEARCH_SELECTOR_TEXT}"`],
        subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
        type: TaskType.TYPE_DOM
    },
    // setInputFiles
    {
        arguments: [NORMAL_PAGE_FILE_SELECTOR, [RESOURCE_IMAGE_PATH]],
        subType: TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
        type: TaskType.TYPE_DOM
    },
    // getAttr
    {
        arguments: [NORMAL_PAGE_FILE_SELECTOR, NORMAL_PAGE_FILE_SELECTOR_FIELD],
        assertion: ['typeof data === "object"', 'Object.keys(data).length === 1'],
        subType: TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
        type: TaskType.TYPE_DOM
    },
    /**
     * Event
     */
    // dialog
    {
        arguments: [EVENT_TIMEOUT],
        assertion: [`dialog.message() === "${DIALOG_VALUE}"`, 'dialog.type() === "alert"'],
        assertionVarName: 'dialog',
        children: [
            {
                arguments: [NORMAL_PAGE_DIALOG_SELECTOR],
                subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                type: TaskType.TYPE_DOM
            }
        ],
        promptText: 'Botphus',
        subType: TaskTypeEventSubType.SUB_TYPE_DIALOG,
        type: TaskType.TYPE_EVENT
    },
    // console
    {
        arguments: [EVENT_TIMEOUT],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 1', `consoleMessage.text() === "${CONSOLE_VALUE}"`],
        assertionVarName: 'consoleMessage',
        children: [
            {
                arguments: [NORMAL_PAGE_CONSOLE_SELECTOR],
                subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                type: TaskType.TYPE_DOM
            }
        ],
        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: TaskType.TYPE_EVENT
    },
    // console cover log
    {
        arguments: [EVENT_TIMEOUT],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 1', `consoleMessage.text() === "${CONSOLE_VALUE}"`],
        assertionVarName: 'consoleMessage',
        children: [
            {
                arguments: [NORMAL_PAGE_CONSOLE_COVER_SELECTOR, false],
                subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                type: TaskType.TYPE_DOM
            }
        ],
        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: TaskType.TYPE_EVENT
    },
    // request & response
    {
        arguments: [EVENT_TIMEOUT, (request: any) => {
            return request.url() === 'https://api.github.com/';
        }],
        assertion: [`request.method() === "GET"`],
        assertionVarName: 'request',
        children: [
            {
                arguments: [EVENT_TIMEOUT, (response: any) => {
                    return response.url() === 'https://api.github.com/';
                }],
                assertion: ['resData'],
                assertionVarName: 'resData',
                children: [
                    {
                        arguments: [NORMAL_PAGE_REQUEST_SELECTOR],
                        subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                        type: TaskType.TYPE_DOM
                    }
                ],
                subType: TaskTypeEventSubType.SUB_TYPE_RESPONSE,
                type: TaskType.TYPE_EVENT
            }
        ],
        subType: TaskTypeEventSubType.SUB_TYPE_REQUEST,
        type: TaskType.TYPE_EVENT
    },
    // jsonp response
    {
        arguments: [EVENT_TIMEOUT, (response: any) => {
            return response.url().indexOf('https://api.github.com/') >= 0;
        }],
        assertion: ['resData'],
        assertionVarName: 'resData',
        children: [
            {
                arguments: [NORMAL_PAGE_REQUEST_JSONP_SELECTOR],
                subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
                type: TaskType.TYPE_DOM
            }
        ],
        subType: TaskTypeEventSubType.SUB_TYPE_RESPONSE,
        type: TaskType.TYPE_EVENT
    },
    /**
     * Time
     */
    {
        arguments: [SLEEP_TIME],
        subType: TaskTypeTimeSubType.SUB_TYPE_SET_SLEEP,
        type: TaskType.TYPE_TIME
    },
    /**
     * Page
     */
    // setCookie
    {
        arguments: [[
            {
                name: COOKIE_NAME,
                url: COOKIE_URL,
                value: COOKIE_VALUE
            }
        ]],
        subType: TaskTypePageSubType.SUB_TYPE_SET_COOKIE,
        type: TaskType.TYPE_PAGE
    },
    // reload
    {
        arguments: [{
            waitUntil: 'networkidle2'
        }],
        subType: TaskTypePageSubType.SUB_TYPE_RELOAD,
        type: TaskType.TYPE_PAGE
    },
    {
        subType: TaskTypePageSubType.SUB_TYPE_RELOAD,
        type: TaskType.TYPE_PAGE
    },
    // getCookie
    {
        assertion: ['cookies.length === 1', `cookies[0].domain === "${COOKIE_DOMAIN}"`, `cookies[0].name === "${COOKIE_NAME}"`, `cookies[0].value === "${COOKIE_VALUE}"`],
        assertionVarName: 'cookies',
        subType: TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
        type: TaskType.TYPE_PAGE
    },
    // deleteCookie
    {
        arguments: [[
            {
                name: COOKIE_NAME,
                url: COOKIE_URL
            }
        ]],
        subType: TaskTypePageSubType.SUB_TYPE_DELETE_COOKIE,
        type: TaskType.TYPE_PAGE
    },
    // getCookie
    {
        arguments: [[COOKIE_URL]],
        assertion: ['cookies.length === 0'],
        assertionVarName: 'cookies',
        subType: TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
        type: TaskType.TYPE_PAGE
    },
    // goto
    {
        arguments: [NORMAL_PAGE_PATH.replace(/\\/g, '\\\\'), {
            waitUntil: 'networkidle2'
        }],
        subType: TaskTypePageSubType.SUB_TYPE_GOTO,
        type: TaskType.TYPE_PAGE
    },
    // screenShot
    {
        assertion: ['value instanceof Buffer'],
        assertionVarName: 'value',
        subType: TaskTypePageSubType.SUB_TYPE_SCREENSHOT,
        type: TaskType.TYPE_PAGE
    },
];

export const TASK_REACT_NAME = 'React task';
export const TASK_REACT_LIST: TaskRuleTypeItem[] = [
    // console
    {
        arguments: [EVENT_TIMEOUT, (consoleMessage: any) => {
            return consoleMessage.type() === 'log';
        }],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 2', 'consoleMessage.text().indexOf("Upload event:") >= 0'],
        assertionVarName: 'consoleMessage',
        children: [
            {
                arguments: [EVENT_TIMEOUT, (request: any) => {
                    return request.url().indexOf('upload.do') >= 0;
                }],
                children: [
                    {
                        arguments: [REACT_PAGE_FORM_FILE_SELECTOR, [RESOURCE_IMAGE_PATH]],
                        index: '3',
                        subType: TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
                        type: TaskType.TYPE_DOM
                    }
                ],
                index: '2',
                subType: TaskTypeEventSubType.SUB_TYPE_REQUEST,
                type: TaskType.TYPE_EVENT
            }
        ],
        index: '1',
        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: TaskType.TYPE_EVENT
    }
];

export const TASK_UNION_BLOCK_LIST_CHILDREN: TaskRuleTypeItem[] = [
    // console
    {
        arguments: [EVENT_TIMEOUT, (consoleMessage: any) => {
            return consoleMessage.type() === 'log';
        }],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 2', 'consoleMessage.text().indexOf("Upload event:") >= 0'],
        assertionVarName: 'consoleMessage',
        children: [
            {
                arguments: [EVENT_TIMEOUT, (request: any) => {
                    return request.url().indexOf('upload.do') >= 0;
                }],
                children: [
                    {
                        arguments: [REACT_PAGE_FORM_FILE_SELECTOR, [RESOURCE_IMAGE_PATH]],
                        index: '3',
                        subType: TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
                        type: TaskType.TYPE_DOM
                    }
                ],
                index: '2',
                subType: TaskTypeEventSubType.SUB_TYPE_REQUEST,
                type: TaskType.TYPE_EVENT
            }
        ],
        index: '1',
        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: TaskType.TYPE_EVENT
    },
    { // getText error
        arguments: [NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === "Wrong text"`],
        index: 'union-error',
        subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
        type: TaskType.TYPE_DOM
    }
];
export const TASK_UNION_NON_BLOCK_LIST_CHILDREN: TaskRuleTypeItem[] = [
    // console
    {
        arguments: [EVENT_TIMEOUT, (consoleMessage: any) => {
            return consoleMessage.type() === 'log';
        }],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 2', 'consoleMessage.text().indexOf("Upload event:") >= 0'],
        assertionVarName: 'consoleMessage',
        children: [
            {
                arguments: [EVENT_TIMEOUT, (request: any) => {
                    return request.url().indexOf('upload.do') >= 0;
                }],
                children: [
                    {
                        arguments: [REACT_PAGE_FORM_FILE_SELECTOR, [RESOURCE_IMAGE_PATH]],
                        index: '3',
                        subType: TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
                        type: TaskType.TYPE_DOM
                    }
                ],
                index: '2',
                subType: TaskTypeEventSubType.SUB_TYPE_REQUEST,
                type: TaskType.TYPE_EVENT
            }
        ],
        index: '1',
        subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: TaskType.TYPE_EVENT
    },
    { // getText error
        arguments: [NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === "Wrong text"`],
        index: 'union-error',
        subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
        type: TaskType.TYPE_DOM
    }
];
export const TASK_UNION_BLOCK_NAME = 'Union block task';
export const TASK_UNION_BLOCK_LIST: TaskRuleTypeItem[] = [
    {
        children: TASK_UNION_BLOCK_LIST_CHILDREN,
        subType: TaskTypeUnionSubType.SUB_TYPE_BLOCK,
        type: TaskType.TYPE_UNION
    }
];
export const TASK_UNION_NON_BLOCK_NAME = 'Union non-block task';
export const TASK_UNION_NON_BLOCK_LIST: TaskRuleTypeItem[] = [
    {
        children: TASK_UNION_NON_BLOCK_LIST_CHILDREN,
        subType: TaskTypeUnionSubType.SUB_TYPE_NON_BLOCK,
        type: TaskType.TYPE_UNION
    }
];
