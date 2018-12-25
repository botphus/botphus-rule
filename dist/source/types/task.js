"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Task Type
 */
var TaskType;
(function (TaskType) {
    TaskType[TaskType["TYPE_DATA"] = 1] = "TYPE_DATA";
    TaskType[TaskType["TYPE_DOM"] = 2] = "TYPE_DOM";
    TaskType[TaskType["TYPE_EVENT"] = 3] = "TYPE_EVENT";
    TaskType[TaskType["TYPE_TIME"] = 4] = "TYPE_TIME";
    TaskType[TaskType["TYPE_PAGE"] = 5] = "TYPE_PAGE";
    TaskType[TaskType["TYPE_UNION"] = 6] = "TYPE_UNION";
})(TaskType = exports.TaskType || (exports.TaskType = {}));
/**
 * Sub type: Data
 */
var TaskTypeDataSubType;
(function (TaskTypeDataSubType) {
    TaskTypeDataSubType[TaskTypeDataSubType["SUB_TYPE_MYSQL"] = 100] = "SUB_TYPE_MYSQL";
    TaskTypeDataSubType[TaskTypeDataSubType["SUB_TYPE_REDIS"] = 101] = "SUB_TYPE_REDIS";
})(TaskTypeDataSubType = exports.TaskTypeDataSubType || (exports.TaskTypeDataSubType = {}));
/**
 * Sub type: Dom
 */
var TaskTypeDomSubType;
(function (TaskTypeDomSubType) {
    TaskTypeDomSubType[TaskTypeDomSubType["SUB_TYPE_KEYBOARD"] = 200] = "SUB_TYPE_KEYBOARD";
    TaskTypeDomSubType[TaskTypeDomSubType["SUB_TYPE_SET_ATTR"] = 201] = "SUB_TYPE_SET_ATTR";
    TaskTypeDomSubType[TaskTypeDomSubType["SUB_TYPE_GET_ATTR"] = 202] = "SUB_TYPE_GET_ATTR";
    TaskTypeDomSubType[TaskTypeDomSubType["SUB_TYPE_GET_HTML"] = 203] = "SUB_TYPE_GET_HTML";
    TaskTypeDomSubType[TaskTypeDomSubType["SUB_TYPE_GET_TEXT"] = 204] = "SUB_TYPE_GET_TEXT";
    TaskTypeDomSubType[TaskTypeDomSubType["SUB_TYPE_CLICK"] = 205] = "SUB_TYPE_CLICK";
    TaskTypeDomSubType[TaskTypeDomSubType["SUB_TYPE_SET_INPUT_FILES"] = 206] = "SUB_TYPE_SET_INPUT_FILES";
})(TaskTypeDomSubType = exports.TaskTypeDomSubType || (exports.TaskTypeDomSubType = {}));
/**
 * Sub type: Event
 */
var TaskTypeEventSubType;
(function (TaskTypeEventSubType) {
    TaskTypeEventSubType[TaskTypeEventSubType["SUB_TYPE_REQUEST"] = 300] = "SUB_TYPE_REQUEST";
    TaskTypeEventSubType[TaskTypeEventSubType["SUB_TYPE_RESPONSE"] = 301] = "SUB_TYPE_RESPONSE";
    TaskTypeEventSubType[TaskTypeEventSubType["SUB_TYPE_CONSOLE"] = 302] = "SUB_TYPE_CONSOLE";
    TaskTypeEventSubType[TaskTypeEventSubType["SUB_TYPE_DIALOG"] = 303] = "SUB_TYPE_DIALOG";
})(TaskTypeEventSubType = exports.TaskTypeEventSubType || (exports.TaskTypeEventSubType = {}));
/**
 * Sub type: Time
 */
var TaskTypeTimeSubType;
(function (TaskTypeTimeSubType) {
    TaskTypeTimeSubType[TaskTypeTimeSubType["SUB_TYPE_SET_SLEEP"] = 400] = "SUB_TYPE_SET_SLEEP";
})(TaskTypeTimeSubType = exports.TaskTypeTimeSubType || (exports.TaskTypeTimeSubType = {}));
/**
 * Sub type: Page
 */
var TaskTypePageSubType;
(function (TaskTypePageSubType) {
    TaskTypePageSubType[TaskTypePageSubType["SUB_TYPE_RELOAD"] = 500] = "SUB_TYPE_RELOAD";
    TaskTypePageSubType[TaskTypePageSubType["SUB_TYPE_SET_COOKIE"] = 501] = "SUB_TYPE_SET_COOKIE";
    TaskTypePageSubType[TaskTypePageSubType["SUB_TYPE_GET_COOKIE"] = 502] = "SUB_TYPE_GET_COOKIE";
    TaskTypePageSubType[TaskTypePageSubType["SUB_TYPE_DELETE_COOKIE"] = 503] = "SUB_TYPE_DELETE_COOKIE";
    TaskTypePageSubType[TaskTypePageSubType["SUB_TYPE_GOTO"] = 504] = "SUB_TYPE_GOTO";
    TaskTypePageSubType[TaskTypePageSubType["SUB_TYPE_SCREENSHOT"] = 505] = "SUB_TYPE_SCREENSHOT";
})(TaskTypePageSubType = exports.TaskTypePageSubType || (exports.TaskTypePageSubType = {}));
/**
 * Sub type: union
 */
var TaskTypeUnionSubType;
(function (TaskTypeUnionSubType) {
    TaskTypeUnionSubType[TaskTypeUnionSubType["SUB_TYPE_BLOCK"] = 600] = "SUB_TYPE_BLOCK";
    TaskTypeUnionSubType[TaskTypeUnionSubType["SUB_TYPE_NON_BLOCK"] = 601] = "SUB_TYPE_NON_BLOCK";
})(TaskTypeUnionSubType = exports.TaskTypeUnionSubType || (exports.TaskTypeUnionSubType = {}));
