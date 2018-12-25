"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const task_1 = require("../../source/types/task");
// value
exports.SEARCH_SELECTOR_VALUE = 'Botphus value';
exports.EVENT_TIMEOUT = 3000;
exports.SLEEP_TIME = 100;
exports.DIALOG_VALUE = 'botphus dialog';
exports.CONSOLE_VALUE = 'botphus console';
exports.COOKIE_NAME = 'botphus';
exports.COOKIE_VALUE = 'botphus cookie value';
exports.COOKIE_URL = 'https://github.com/';
exports.COOKIE_DOMAIN = 'github.com';
// Normal page
exports.NORMAL_PAGE_PATH = 'file://' + path.join(__dirname, '../../../test/src/normal_test_page.html');
exports.NORMAL_PAGE_SEARCH_SELECTOR = 'form:nth-child(3) > div:nth-child(1) > #search';
exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR = 'form:nth-child(3) > div:nth-child(1)';
exports.NORMAL_PAGE_FILE_SELECTOR = 'form:nth-child(3) > div:nth-child(2) > #file';
exports.NORMAL_PAGE_FILE_MULTI_SELECTOR = 'form:nth-child(3) > div:nth-child(3) > #file-multi';
exports.NORMAL_PAGE_DIALOG_SELECTOR = 'div:nth-child(2) > #dialog';
exports.NORMAL_PAGE_CONSOLE_SELECTOR = 'div:nth-child(2) > #console';
exports.NORMAL_PAGE_CONSOLE_COVER_SELECTOR = '#console-cover';
exports.NORMAL_PAGE_REQUEST_SELECTOR = 'div:nth-child(2) > #request';
exports.NORMAL_PAGE_REQUEST_JSONP_SELECTOR = 'div:nth-child(2) > #request-jsonp';
exports.NORMAL_PAGE_SEARCH_SELECTOR_FIELD = 'value';
exports.NORMAL_PAGE_FILE_SELECTOR_FIELD = 'files';
exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR_HTML = '<label for="search">搜索名称</label><input type="text" name="search" id="search">';
exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR_TEXT = '搜索名称';
// React Page
exports.REACT_PAGE_PATH = 'file://' + path.join(__dirname, '../../../test/src/react_test_page.html');
exports.REACT_PAGE_FORM_SELECTOR = '#container > form:nth-child(1)';
exports.REACT_PAGE_FORM_ITEM_SELECTOR = '.ant-form-item-control-wrapper:nth-child(2) .ant-form-item-children';
exports.REACT_PAGE_FORM_SELECT1_SELECTOR = `${exports.REACT_PAGE_FORM_SELECTOR} > .ant-form-item:nth-child(2) > ${exports.REACT_PAGE_FORM_ITEM_SELECTOR}`;
exports.REACT_PAGE_FORM_SELECT2_SELECTOR = `${exports.REACT_PAGE_FORM_SELECTOR} > .ant-form-item:nth-child(3) > ${exports.REACT_PAGE_FORM_ITEM_SELECTOR}`;
exports.REACT_PAGE_FORM_BUTTON_SELECTOR = `${exports.REACT_PAGE_FORM_SELECTOR} > .ant-form-item:nth-child(12) .ant-form-item-children`;
exports.REACT_PAGE_FORM_BUTTON_SUBMIT_SELECTOR = `${exports.REACT_PAGE_FORM_BUTTON_SELECTOR} > button:nth-child(1)`;
exports.REACT_PAGE_OUTSIDE_SELECT_DROPDOWN_ITEM_SELECTOR = 'div > .ant-select-dropdown > div > .ant-select-dropdown-menu > .ant-select-dropdown-menu-item:nth-child(1)';
exports.REACT_PAGE_OUTSIDE_SELECT1_DROPDOWN_SELECTOR = `div:nth-child(3) > ${exports.REACT_PAGE_OUTSIDE_SELECT_DROPDOWN_ITEM_SELECTOR}`;
exports.REACT_PAGE_OUTSIDE_SELECT2_DROPDOWN_SELECTOR = `div:nth-child(4) > ${exports.REACT_PAGE_OUTSIDE_SELECT_DROPDOWN_ITEM_SELECTOR}`;
exports.REACT_PAGE_FORM_FILE_SELECTOR = `${exports.REACT_PAGE_FORM_SELECTOR} > .ant-form-item:nth-child(10) .ant-form-item-children .ant-upload input`;
exports.REACT_PAGE_CONSOLE_FORM_MESSAGE = 'Received values of form: ';
exports.REACT_PAGE_CONSOLE_FORM_MESSAGE_UPLOAD = 'Upload event:';
exports.REACT_PAGE_UPLOAD_PATH = 'upload.do';
// Resource
exports.RESOURCE_IMAGE_PATH = path.join(__dirname, '../../../test/src/test-image.png');
exports.RESOURCE_PDF_PATH = path.join(__dirname, '../../../test/src/phocapdf-demo2.pdf');
exports.RESOURCE_FILE_NAME_REG = /^\S+[\\/]([^\\/]+\.[^\\/]+)$/;
exports.RESOURCE_FILE_NAME = 'test-image.png';
// Data
// Mysql
exports.MYSQL_TABLE_NAME = 'bp_user';
exports.MYSQL_FIELD_NAME = 'user_name';
exports.MYSQL_FIELD_VALUE = 'Hans Zimmer';
exports.MYSQL_CREATE_TABLE = `
    CREATE TABLE ${exports.MYSQL_TABLE_NAME} (
        id int(11) auto_increment NOT NULL,
        ${exports.MYSQL_FIELD_NAME} varchar(128) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;
exports.MYSQL_INSERT_DATA = `INSERT INTO ${exports.MYSQL_TABLE_NAME} (${exports.MYSQL_FIELD_NAME}) VALUES ("${exports.MYSQL_FIELD_VALUE}")`;
exports.MYSQL_SELECT_DATA = `SELECT * FROM ${exports.MYSQL_TABLE_NAME} WHERE ${exports.MYSQL_FIELD_NAME} = "${exports.MYSQL_FIELD_VALUE}"`;
exports.MYSQL_DROP_TABLE = `DROP TABLE IF EXISTS ${exports.MYSQL_TABLE_NAME}`;
/// redis
exports.REDIS_KEY_NAME = 'botphus:test';
exports.REDIS_KEY_VALUE = 'Morgan Freeman';
// Task
exports.TASK_FULL_NAME = 'Full task';
exports.TASK_FULL_LIST = [
    /**
     * Data
     */
    // Mysql
    /// Create Table
    {
        arguments: [exports.MYSQL_CREATE_TABLE],
        assertion: ['data'],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: task_1.TaskType.TYPE_DATA
    },
    /// Inset Table
    {
        arguments: [exports.MYSQL_INSERT_DATA],
        assertion: ['data'],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: task_1.TaskType.TYPE_DATA
    },
    /// Select Table
    {
        arguments: [exports.MYSQL_SELECT_DATA],
        assertion: ['data.length === 1', 'data[0].id === 1', `data[0].${exports.MYSQL_FIELD_NAME} === "${exports.MYSQL_FIELD_VALUE}"`],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: task_1.TaskType.TYPE_DATA
    },
    /// Drop Table
    {
        arguments: [exports.MYSQL_DROP_TABLE],
        assertion: ['data'],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_MYSQL,
        type: task_1.TaskType.TYPE_DATA
    },
    // Redis
    /// set
    {
        arguments: [[['set', exports.REDIS_KEY_NAME, exports.REDIS_KEY_VALUE]]],
        assertion: ['data'],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_REDIS,
        type: task_1.TaskType.TYPE_DATA
    },
    /// get
    {
        arguments: [[['get', exports.REDIS_KEY_NAME]]],
        assertion: ['data.length === 1', `data[0][1] === "${exports.REDIS_KEY_VALUE}"`],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_REDIS,
        type: task_1.TaskType.TYPE_DATA
    },
    /// del
    {
        arguments: [[['del', exports.REDIS_KEY_NAME]]],
        assertion: ['data'],
        subType: task_1.TaskTypeDataSubType.SUB_TYPE_REDIS,
        type: task_1.TaskType.TYPE_DATA
    },
    // goto
    {
        arguments: [exports.NORMAL_PAGE_PATH.replace(/\\/g, '\\\\')],
        subType: task_1.TaskTypePageSubType.SUB_TYPE_GOTO,
        type: task_1.TaskType.TYPE_PAGE
    },
    /**
     * Dom
     */
    // click
    {
        arguments: [exports.NORMAL_PAGE_SEARCH_SELECTOR],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
        type: task_1.TaskType.TYPE_DOM
    },
    // keyboard
    {
        arguments: [exports.NORMAL_PAGE_SEARCH_SELECTOR, exports.SEARCH_SELECTOR_VALUE],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_KEYBOARD,
        type: task_1.TaskType.TYPE_DOM
    },
    // getAttr
    {
        arguments: [exports.NORMAL_PAGE_SEARCH_SELECTOR, exports.NORMAL_PAGE_SEARCH_SELECTOR_FIELD],
        assertion: [`data === "${exports.SEARCH_SELECTOR_VALUE}"`],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
        type: task_1.TaskType.TYPE_DOM
    },
    // setAttr
    {
        arguments: [exports.NORMAL_PAGE_SEARCH_SELECTOR, exports.NORMAL_PAGE_SEARCH_SELECTOR_FIELD, exports.SEARCH_SELECTOR_VALUE],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_SET_ATTR,
        type: task_1.TaskType.TYPE_DOM
    },
    // getHtml
    {
        arguments: [exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === '${exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR_HTML}'`],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_HTML,
        type: task_1.TaskType.TYPE_DOM
    },
    // getText
    {
        arguments: [exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === "${exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR_TEXT}"`],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
        type: task_1.TaskType.TYPE_DOM
    },
    // setInputFiles
    {
        arguments: [exports.NORMAL_PAGE_FILE_SELECTOR, [exports.RESOURCE_IMAGE_PATH]],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
        type: task_1.TaskType.TYPE_DOM
    },
    // getAttr
    {
        arguments: [exports.NORMAL_PAGE_FILE_SELECTOR, exports.NORMAL_PAGE_FILE_SELECTOR_FIELD],
        assertion: ['typeof data === "object"', 'Object.keys(data).length === 1'],
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
        type: task_1.TaskType.TYPE_DOM
    },
    /**
     * Event
     */
    // dialog
    {
        arguments: [exports.EVENT_TIMEOUT],
        assertion: [`dialog.message() === "${exports.DIALOG_VALUE}"`, 'dialog.type() === "alert"'],
        assertionVarName: 'dialog',
        children: [
            {
                arguments: [exports.NORMAL_PAGE_DIALOG_SELECTOR],
                subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                type: task_1.TaskType.TYPE_DOM
            }
        ],
        promptText: 'Botphus',
        subType: task_1.TaskTypeEventSubType.SUB_TYPE_DIALOG,
        type: task_1.TaskType.TYPE_EVENT
    },
    // console
    {
        arguments: [exports.EVENT_TIMEOUT],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 1', `consoleMessage.text() === "${exports.CONSOLE_VALUE}"`],
        assertionVarName: 'consoleMessage',
        children: [
            {
                arguments: [exports.NORMAL_PAGE_CONSOLE_SELECTOR],
                subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                type: task_1.TaskType.TYPE_DOM
            }
        ],
        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: task_1.TaskType.TYPE_EVENT
    },
    // console cover log
    {
        arguments: [exports.EVENT_TIMEOUT],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 1', `consoleMessage.text() === "${exports.CONSOLE_VALUE}"`],
        assertionVarName: 'consoleMessage',
        children: [
            {
                arguments: [exports.NORMAL_PAGE_CONSOLE_COVER_SELECTOR, false],
                subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                type: task_1.TaskType.TYPE_DOM
            }
        ],
        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: task_1.TaskType.TYPE_EVENT
    },
    // request & response
    {
        arguments: [exports.EVENT_TIMEOUT, (request) => {
                return request.url() === 'https://api.github.com/';
            }],
        assertion: [`request.method() === "GET"`],
        assertionVarName: 'request',
        children: [
            {
                arguments: [exports.EVENT_TIMEOUT, (response) => {
                        return response.url() === 'https://api.github.com/';
                    }],
                assertion: ['resData'],
                assertionVarName: 'resData',
                children: [
                    {
                        arguments: [exports.NORMAL_PAGE_REQUEST_SELECTOR],
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                        type: task_1.TaskType.TYPE_DOM
                    }
                ],
                subType: task_1.TaskTypeEventSubType.SUB_TYPE_RESPONSE,
                type: task_1.TaskType.TYPE_EVENT
            }
        ],
        subType: task_1.TaskTypeEventSubType.SUB_TYPE_REQUEST,
        type: task_1.TaskType.TYPE_EVENT
    },
    // jsonp response
    {
        arguments: [exports.EVENT_TIMEOUT, (response) => {
                return response.url().indexOf('https://api.github.com/') >= 0;
            }],
        assertion: ['resData'],
        assertionVarName: 'resData',
        children: [
            {
                arguments: [exports.NORMAL_PAGE_REQUEST_JSONP_SELECTOR],
                subType: task_1.TaskTypeDomSubType.SUB_TYPE_CLICK,
                type: task_1.TaskType.TYPE_DOM
            }
        ],
        subType: task_1.TaskTypeEventSubType.SUB_TYPE_RESPONSE,
        type: task_1.TaskType.TYPE_EVENT
    },
    /**
     * Time
     */
    {
        arguments: [exports.SLEEP_TIME],
        subType: task_1.TaskTypeTimeSubType.SUB_TYPE_SET_SLEEP,
        type: task_1.TaskType.TYPE_TIME
    },
    /**
     * Page
     */
    // setCookie
    {
        arguments: [[
                {
                    name: exports.COOKIE_NAME,
                    url: exports.COOKIE_URL,
                    value: exports.COOKIE_VALUE
                }
            ]],
        subType: task_1.TaskTypePageSubType.SUB_TYPE_SET_COOKIE,
        type: task_1.TaskType.TYPE_PAGE
    },
    // reload
    {
        arguments: [{
                waitUntil: 'networkidle2'
            }],
        subType: task_1.TaskTypePageSubType.SUB_TYPE_RELOAD,
        type: task_1.TaskType.TYPE_PAGE
    },
    {
        subType: task_1.TaskTypePageSubType.SUB_TYPE_RELOAD,
        type: task_1.TaskType.TYPE_PAGE
    },
    // getCookie
    {
        assertion: ['cookies.length === 1', `cookies[0].domain === "${exports.COOKIE_DOMAIN}"`, `cookies[0].name === "${exports.COOKIE_NAME}"`, `cookies[0].value === "${exports.COOKIE_VALUE}"`],
        assertionVarName: 'cookies',
        subType: task_1.TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
        type: task_1.TaskType.TYPE_PAGE
    },
    // deleteCookie
    {
        arguments: [[
                {
                    name: exports.COOKIE_NAME,
                    url: exports.COOKIE_URL
                }
            ]],
        subType: task_1.TaskTypePageSubType.SUB_TYPE_DELETE_COOKIE,
        type: task_1.TaskType.TYPE_PAGE
    },
    // getCookie
    {
        arguments: [[exports.COOKIE_URL]],
        assertion: ['cookies.length === 0'],
        assertionVarName: 'cookies',
        subType: task_1.TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
        type: task_1.TaskType.TYPE_PAGE
    },
    // goto
    {
        arguments: [exports.NORMAL_PAGE_PATH.replace(/\\/g, '\\\\'), {
                waitUntil: 'networkidle2'
            }],
        subType: task_1.TaskTypePageSubType.SUB_TYPE_GOTO,
        type: task_1.TaskType.TYPE_PAGE
    },
    // screenShot
    {
        assertion: ['value instanceof Buffer'],
        assertionVarName: 'value',
        subType: task_1.TaskTypePageSubType.SUB_TYPE_SCREENSHOT,
        type: task_1.TaskType.TYPE_PAGE
    },
];
exports.TASK_REACT_NAME = 'React task';
exports.TASK_REACT_LIST = [
    // console
    {
        arguments: [exports.EVENT_TIMEOUT, (consoleMessage) => {
                return consoleMessage.type() === 'log';
            }],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 2', 'consoleMessage.text().indexOf("Upload event:") >= 0'],
        assertionVarName: 'consoleMessage',
        children: [
            {
                arguments: [exports.EVENT_TIMEOUT, (request) => {
                        return request.url().indexOf('upload.do') >= 0;
                    }],
                children: [
                    {
                        arguments: [exports.REACT_PAGE_FORM_FILE_SELECTOR, [exports.RESOURCE_IMAGE_PATH]],
                        index: '3',
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
                        type: task_1.TaskType.TYPE_DOM
                    }
                ],
                index: '2',
                subType: task_1.TaskTypeEventSubType.SUB_TYPE_REQUEST,
                type: task_1.TaskType.TYPE_EVENT
            }
        ],
        index: '1',
        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: task_1.TaskType.TYPE_EVENT
    }
];
exports.TASK_UNION_BLOCK_LIST_CHILDREN = [
    // console
    {
        arguments: [exports.EVENT_TIMEOUT, (consoleMessage) => {
                return consoleMessage.type() === 'log';
            }],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 2', 'consoleMessage.text().indexOf("Upload event:") >= 0'],
        assertionVarName: 'consoleMessage',
        children: [
            {
                arguments: [exports.EVENT_TIMEOUT, (request) => {
                        return request.url().indexOf('upload.do') >= 0;
                    }],
                children: [
                    {
                        arguments: [exports.REACT_PAGE_FORM_FILE_SELECTOR, [exports.RESOURCE_IMAGE_PATH]],
                        index: '3',
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
                        type: task_1.TaskType.TYPE_DOM
                    }
                ],
                index: '2',
                subType: task_1.TaskTypeEventSubType.SUB_TYPE_REQUEST,
                type: task_1.TaskType.TYPE_EVENT
            }
        ],
        index: '1',
        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: task_1.TaskType.TYPE_EVENT
    },
    {
        arguments: [exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === "Wrong text"`],
        index: 'union-error',
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
        type: task_1.TaskType.TYPE_DOM
    }
];
exports.TASK_UNION_NON_BLOCK_LIST_CHILDREN = [
    // console
    {
        arguments: [exports.EVENT_TIMEOUT, (consoleMessage) => {
                return consoleMessage.type() === 'log';
            }],
        assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 2', 'consoleMessage.text().indexOf("Upload event:") >= 0'],
        assertionVarName: 'consoleMessage',
        children: [
            {
                arguments: [exports.EVENT_TIMEOUT, (request) => {
                        return request.url().indexOf('upload.do') >= 0;
                    }],
                children: [
                    {
                        arguments: [exports.REACT_PAGE_FORM_FILE_SELECTOR, [exports.RESOURCE_IMAGE_PATH]],
                        index: '3',
                        subType: task_1.TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
                        type: task_1.TaskType.TYPE_DOM
                    }
                ],
                index: '2',
                subType: task_1.TaskTypeEventSubType.SUB_TYPE_REQUEST,
                type: task_1.TaskType.TYPE_EVENT
            }
        ],
        index: '1',
        subType: task_1.TaskTypeEventSubType.SUB_TYPE_CONSOLE,
        type: task_1.TaskType.TYPE_EVENT
    },
    {
        arguments: [exports.NORMAL_PAGE_PARENT_SEARCH_SELECTOR],
        assertion: [`data === "Wrong text"`],
        index: 'union-error',
        subType: task_1.TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
        type: task_1.TaskType.TYPE_DOM
    }
];
exports.TASK_UNION_BLOCK_NAME = 'Union block task';
exports.TASK_UNION_BLOCK_LIST = [
    {
        children: exports.TASK_UNION_BLOCK_LIST_CHILDREN,
        subType: task_1.TaskTypeUnionSubType.SUB_TYPE_BLOCK,
        type: task_1.TaskType.TYPE_UNION
    }
];
exports.TASK_UNION_NON_BLOCK_NAME = 'Union non-block task';
exports.TASK_UNION_NON_BLOCK_LIST = [
    {
        children: exports.TASK_UNION_NON_BLOCK_LIST_CHILDREN,
        subType: task_1.TaskTypeUnionSubType.SUB_TYPE_NON_BLOCK,
        type: task_1.TaskType.TYPE_UNION
    }
];
