# 测试单元配置

所有的测试任务均由测试单元组成,默认的一个测试单元由以下参数组成:

[执行结果]: process_message.md
[querySelector#selectors]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector#Parameters

参数 | 类型 | 默认值 | 描述 
--- | --- | --- | ---
index | `string` | null | 索引值,默认不填时会自动生成,否则使用索引值,请勿重复,否则会影响消息通知
type | `enum` | null | 单元类型,见[单元类型](#task_type)
subType | `enum` | null | 单元子类型,见[单元类型](#task_type)对应类型的说明
[arguments]<sup>[注1](#task_params_tip)<sup> | `any[]` | null | 测试参数,根据类型不同传值不同
[assertion]<sup>[注2](#task_params_tip)<sup> | `string[]` | null | 断言内容,一个javascript断言语句,如:'data.length === 1'
[assertionVarName] | `string` | null | 断言内容的变量名称,和`assertion`配合使用,默认为'data'.
children<sup>[注3](#task_params_tip)</sup> | `string` | null | 子测试单元
[promptText]<sup>[注4](#task_params_tip)</sup> | `string` | 'confirm' | 弹窗确认时输入的默认文字,详见[dialog.accept](https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-dialogacceptprompttext)

<a name="task_params_tip"></a>
* 注1:`type`为`TYPE_DATA`,`TYPE_DOM`为必传
* 注2:`type`为`TYPE_DATA`时为必传
* 注3:`type`为`TYPE_EVENT`时必传,其他类型时不传.执行时,会优先注册监听任务,然后执行`children`任务
* 注4:`subType`为`SUB_TYPE_DIALOG`时可传

<a name="task_type"></a>
## 单元类型
- TaskType
    - [TYPE_DATA](#type_data): 数据类,mysql/redis测试单元.([代码](../src/source/lib/unit/data.ts)|[测试用例](../src/test/unit/data.ts))
    - [TYPE_DOM](#type_dom): DOM类,页面点击/输入等测试单元.([代码](../src/source/lib/unit/dom.ts)|[测试用例](../src/test/unit/dom.ts))
        - React页面([React页面源码](https://codesandbox.io/s/2vrorqw12r)|[React测试用例](../src/test/unit/react_dom.ts))
    - [TYPE_EVENT](#type_event): 事件类,页面请求/控制台等测试单元.([代码](../src/source/lib/unit/event.ts)|[测试用例](../src/test/unit/event.ts))
    - [TYPE_TIME](#type_time): 时间类,休眠等测试单元.([代码](../src/source/lib/unit/time.ts)|[测试用例](../src/test/unit/time.ts))
    - [TYPE_PAGE](#type_page): 页面类,加载/跳转/cookie等测试单元.([代码](../src/source/lib/unit/page.ts)|[测试用例](../src/test/unit/page.ts))
    - [TYPE_UNION](#type_union): 联合类,处理多任务集合相关的类型.(该类型没有单独测试用例,请查看[创建任务](../src/test/task/create.ts)及[执行任务](../src/test/task/start.ts))

<a name="type_data"></a>
### TYPE_DATA

- TaskTypeDataSubType
    - [SUB_TYPE_MYSQL](#sub_type_mysql): 执行mysql查询命令
    - [SUB_TYPE_REDIS](#sub_type_redis): 执行redis查询命令

<a name="sub_type_mysql"></a>
#### SUB_TYPE_MYSQL

**参数**

- 参数类型: [sqlQuery:string]
- 参数说明:
    - sqlQuery: 查询语句
- 返回数据
    - [执行结果]: sql执行返回数据

**配置示例**
```
{
    arguments: [`SELECT * FROM bp_user WHERE user_name = "your name"`],
    assertion: ['data.length === 1', 'data[0].id === 1', `data[0].user_name === "your name"`],
    subType: TaskTypeDataSubType.SUB_TYPE_MYSQL,
    type: TaskType.TYPE_DATA
}
```

<a name="sub_type_redis"></a>
#### SUB_TYPE_REDIS

**入参**

- 参数类型: [commands: string[][]]
- 参数说明:
    - commands: 命令列表,详见[redis.multi](https://github.com/luin/ioredis#transaction)
- 返回数据
    - [执行结果]: redis执行返回数据

**配置示例**
```
{
    arguments: [[['set', 'botphus:test', 'your value']]],
    assertion: ['data'],
    subType: TaskTypeDataSubType.SUB_TYPE_REDIS,
    type: TaskType.TYPE_DATA
}
```

<a name="type_dom"></a>
### TYPE_DOM

- TaskTypeDomSubType
    - [SUB_TYPE_KEYBOARD](#sub_type_keyboard): 向选择输入框输入内容
    - [SUB_TYPE_SET_ATTR](#sub_type_setAttr): 设置指定元素的属性值
    - [SUB_TYPE_GET_ATTR](#sub_type_getAttr): 获取指定元素的属性值
    - [SUB_TYPE_GET_HTML](#sub_type_getHtml): 获取指定元素的HTML内容
    - [SUB_TYPE_GET_TEXT](#sub_type_getText): 获取指定元素的文本内容
    - [SUB_TYPE_CLICK](#sub_type_click): 触发点击动作
    - [SUB_TYPE_SET_INPUT_FILES](#sub_type_setInputFiles): 设置上传文件框文件内容

<a name="sub_type_keyboard"></a>
#### SUB_TYPE_KEYBOARD

**入参**

- 参数类型: [selector: string, text: string]
- 参数说明:
    - selector: [querySelector#selectors]
    - text: 输入内容
- 返回数据
    - 无

**配置示例**
```
{
    arguments: ['form:nth-child(3) > div:nth-child(1) > #search', 'Botphus value'],
    subType: TaskTypeDomSubType.SUB_TYPE_KEYBOARD,
    type: TaskType.TYPE_DOM
}
```

<a name="sub_type_setAttr"></a>
#### SUB_TYPE_SET_ATTR

**入参**

- 参数类型: [selector: string, attrName: string, attrValue: string]
- 参数说明:
    - selector: [querySelector#selectors]
    - attrName: 属性名称
    - attrValue: 属性值
- 返回数据
    - 无

**配置示例**
```
{
    arguments: ['form:nth-child(3) > div:nth-child(1) > #search', 'value', 'Botphus value'],
    subType: TaskTypeDomSubType.SUB_TYPE_SET_ATTR,
    type: TaskType.TYPE_DOM
}
```

<a name="sub_type_getAttr"></a>
#### SUB_TYPE_GET_ATTR

**入参**

- 参数类型: [selector: string, attrName: string]
- 参数说明:
    - selector: [querySelector#selectors]
    - attrName: 属性名称
- 返回数据
    - [执行结果]: 属性内容字符串

**配置示例**
```
{
    arguments: ['form:nth-child(3) > div:nth-child(1) > #search', 'value'],
    assertion: [`data === "Botphus value"`],
    subType: TaskTypeDomSubType.SUB_TYPE_GET_ATTR,
    type: TaskType.TYPE_DOM
}
```

<a name="sub_type_getHtml"></a>
#### SUB_TYPE_GET_HTML

**入参**

- 参数类型: [selector: string]
- 参数说明:
    - selector: [querySelector#selectors]
- 返回数据
    - [执行结果]: HTML字符串

**配置示例**
```
{
    arguments: ['form:nth-child(3) > div:nth-child(1)'],
    assertion: [`data === '<label for="search">搜索名称</label><input type="text" name="search" id="search">'`],
    subType: TaskTypeDomSubType.SUB_TYPE_GET_HTML,
    type: TaskType.TYPE_DOM
}
```

<a name="sub_type_getText"></a>
#### SUB_TYPE_GET_TEXT

**入参**

- 参数类型: [selector: string]
- 参数说明:
    - selector: [querySelector#selectors]
- 返回数据
    - [执行结果]: 文本字符串

**配置示例**
```
{
    arguments: ['form:nth-child(3) > div:nth-child(1)'],
    assertion: [`data === "搜索名称"`],
    subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
    type: TaskType.TYPE_DOM
}
```

<a name="sub_type_click"></a>
#### SUB_TYPE_CLICK

**入参**

- 参数类型: [selector: string, humanClick: boolean = true]
- 参数说明:
    - selector: [querySelector#selectors]
    - humanClick: 指示是否模拟自然人点击,如果是`true`时,有可能会触发绝对定位上层DOM元素的点击而不能正确点击的预期元素.
- 返回数据
    - 无

**配置示例**
```
{
    arguments: ['form:nth-child(3) > div:nth-child(1) > #search'],
    subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
    type: TaskType.TYPE_DOM
}
```

<a name="sub_type_setInputFiles"></a>
#### SUB_TYPE_SET_INPUT_FILES

**入参**

- 参数类型: [selector: string, filesPath: string[]]
- 参数说明:
    - selector: [querySelector#selectors]
    - filesPath: 地址列表,建议使用绝对地址
- 返回数据
    - 无

**配置示例**
```
{
    arguments: ['form:nth-child(3) > div:nth-child(2) > #file', ['/botphus-core/test/src/test-image.png']],
    subType: TaskTypeDomSubType.SUB_TYPE_SET_INPUT_FILES,
    type: TaskType.TYPE_DOM
}
```

<a name="type_event"></a>
### TYPE_EVENT

- TaskTypeEventSubType
    - [SUB_TYPE_REQUEST](#sub_type_request): 监听页面请求发送事件
    - [SUB_TYPE_RESPONSE](#sub_type_response): 监听页面请求返回事件
    - [SUB_TYPE_CONSOLE](#sub_type_console): 监听页面控制台信息
    - [SUB_TYPE_DIALOG](#sub_type_dialog): 监听页面弹窗信息

<a name="sub_type_request"></a>
#### SUB_TYPE_REQUEST

**入参**

- 参数类型: [timeout: number, checkFunc?: (request: any) => boolean]
- 参数说明:
    - timeout: 超时时间,毫秒
    - checkFunc: 校验是否符合监听规则
- 返回数据
    - [request](https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-class-request)

**配置示例**
```
{
    arguments: [3000, (request: puppeteer.Request) => {
        return request.url() === 'https://api.github.com/';
    }],
    assertion: [`request.method() === "GET"`],
    assertionVarName: 'request',
    children: [
        {
            arguments: ['div:nth-child(2) > #request'],
            subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
            type: TaskType.TYPE_DOM
        }
    ],
    subType: TaskTypeEventSubType.SUB_TYPE_REQUEST,
    type: TaskType.TYPE_EVENT
}
```

<a name="sub_type_response"></a>
#### SUB_TYPE_RESPONSE

**入参**

- 参数类型: [timeout: number, checkFunc?: (request: any) => boolean]
- 参数说明:
    - timeout: 超时时间,毫秒
    - checkFunc: 校验是否符合监听规则
- 返回数据
    - [执行结果]: JSON化内容.注意,**非JSON请求会导致报错**

**配置示例**
```
{
    arguments: [3000, (response: puppeteer.Response) => {
        return response.url() === 'https://api.github.com/';
    }],
    assertion: ['resData'],
    assertionVarName: 'resData',
    children: [
        {
            arguments: ['div:nth-child(2) > #request'],
            subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
            type: TaskType.TYPE_DOM
        }
    ],
    subType: TaskTypeEventSubType.SUB_TYPE_RESPONSE,
    type: TaskType.TYPE_EVENT
}
```

<a name="sub_type_console"></a>
#### SUB_TYPE_CONSOLE

**入参**

- 参数类型: [timeout: number, checkFunc?: (request: any) => boolean]
- 参数说明:
    - timeout: 超时时间,毫秒
    - checkFunc: 校验是否符合监听规则
- 返回数据
    - [consoleMessage](https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-class-consolemessage)

**配置示例**
```
{
    arguments: [3000],
    assertion: [`consoleMessage.type() === "log"`, 'consoleMessage.args().length === 1', `consoleMessage.text() === "${CONSOLE_VALUE}"`],
    assertionVarName: 'consoleMessage',
    children: [
        {
            arguments: ['div:nth-child(2) > #console'],
            subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
            type: TaskType.TYPE_DOM
        }
    ],
    subType: TaskTypeEventSubType.SUB_TYPE_CONSOLE,
    type: TaskType.TYPE_EVENT
}
```

<a name="sub_type_dialog"></a>
#### SUB_TYPE_DIALOG

**入参**

- 参数类型: [timeout: number, checkFunc?: (request: any) => boolean]
- 参数说明:
    - timeout: 超时时间,毫秒
    - checkFunc: 校验是否符合监听规则
- 返回数据
    - [dialog](https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-class-dialog)

**配置示例**
```
{
    arguments: [3000],
    assertion: [`dialog.message() === "botphus dialog"`, 'dialog.type() === "alert"'],
    assertionVarName: 'dialog',
    children: [
        {
            arguments: ['div:nth-child(2) > #dialog'],
            subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
            type: TaskType.TYPE_DOM
        }
    ],
    promptText: 'Botphus',
    subType: TaskTypeEventSubType.SUB_TYPE_DIALOG,
    type: TaskType.TYPE_EVENT
}
```

<a name="type_time"></a>
### TYPE_TIME

- TaskTypeTimeSubType
    - [SUB_TYPE_SET_SLEEP](#sub_type_setSleep): 休眠指定时间

<a name="sub_type_setSleep"></a>
#### SUB_TYPE_SET_SLEEP

**入参**

- 参数类型: [sleepTime: number]
- 参数说明:
    - sleepTime: 休眠时间,毫秒
- 返回数据
    - 无

**配置示例**
```
{
    arguments: [100],
    subType: TaskTypeTimeSubType.SUB_TYPE_SET_SLEEP,
    type: TaskType.TYPE_TIME
}
```

<a name="type_page"></a>
### TYPE_PAGE

- TaskTypePageSubType
    - [SUB_TYPE_RELOAD](#sub_type_reload): 刷新页面
    - [SUB_TYPE_SET_COOKIE](#sub_type_setCookie): 设置cookie
    - [SUB_TYPE_GET_COOKIE](#sub_type_getCookie): 获取cookie
    - [SUB_TYPE_DELETE_COOKIE](#sub_type_deleteCookie): 删除cookie
    - [SUB_TYPE_GOTO](#sub_type_goto): 跳转到指定页面
    - [SUB_TYPE_SCREENSHOT](#sub_type_screenshot): 屏幕截取

<a name="sub_type_reload"></a>
#### SUB_TYPE_RELOAD

**入参**

- 参数类型: 无
- 返回数据
    - 无

**配置示例**
```
{
    subType: TaskTypePageSubType.SUB_TYPE_RELOAD,
    type: TaskType.TYPE_PAGE
}
```

<a name="sub_type_setCookie"></a>
#### SUB_TYPE_SET_COOKIE

**入参**

- 参数类型: [cookies: puppeteer.SetCookie[]]
- 参数说明:
    - cookies: 设置cookie列表,详见[page.setCookie](https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagesetcookiecookies)
- 返回数据
    - 无

**配置示例**
```
{
    arguments: [[
        {
            name: 'botphus',
            url: 'https://github.com/',
            value: 'botphus cookie value'
        }
    ]],
    subType: TaskTypePageSubType.SUB_TYPE_SET_COOKIE,
    type: TaskType.TYPE_PAGE
}
```

<a name="sub_type_getCookie"></a>
#### SUB_TYPE_GET_COOKIE

**入参**

- 参数类型: [urls?: string[]]
- 参数说明:
    - urls: 获取cookie的url列表,不传则为当前地址
- 返回数据
    - [执行结果]: [cookie列表](https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagecookiesurls)

**配置示例**
```
{
    arguments: [['https://github.com/']],
    assertion: ['cookies.length === 1', `cookies[0].domain === "github.com"`, `cookies[0].name === "botphus"`, `cookies[0].value === "botphus cookie value"`],
    assertionVarName: 'cookies',
    subType: TaskTypePageSubType.SUB_TYPE_GET_COOKIE,
    type: TaskType.TYPE_PAGE
}
```

<a name="sub_type_deleteCookie"></a>
#### SUB_TYPE_DELETE_COOKIE

**入参**

- 参数类型: [cookies: puppeteer.DeleteCookie[]]
- 参数说明:
    - cookies: 删除的cookie列表,详见[page.deleteCookie](https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagedeletecookiecookies)
- 返回数据
    - 无

**配置示例**
```
{
    arguments: [[
        {
            name: 'botphus',
            url: 'https://github.com/'
        }
    ]],
    subType: TaskTypePageSubType.SUB_TYPE_DELETE_COOKIE,
    type: TaskType.TYPE_PAGE
}
```

<a name="sub_type_goto"></a>
#### SUB_TYPE_GOTO

**入参**

- 参数类型: [url: string, option: puppeteer.NavigationOptions = {
    waitUntil: 'domcontentloaded'
}]
- 参数说明:
    - url: 跳转地址
    - puppeteer.NavigationOptions: 跳转配置,详见[page.goto](https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagegotourl-options)
- 返回数据
    - 无

**配置示例**
```
{
    arguments: ['https://github.com'],
    subType: TaskTypePageSubType.SUB_TYPE_GOTO,
    type: TaskType.TYPE_PAGE
}
```

<a name="sub_type_screenshot"></a>
#### SUB_TYPE_SCREENSHOT

**入参**

- 参数类型: [option?: puppeteer.ScreenshotOptions]
- 参数说明:
    - option: 截图配置,详见[page.screenshot](https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagescreenshotoptions)
- 返回数据
    - 无

**配置示例**
```
{
    assertion: ['value instanceof Buffer'],
    assertionVarName: 'value',
    subType: TaskTypePageSubType.SUB_TYPE_SCREENSHOT,
    type: TaskType.TYPE_PAGE
}
```

<a name="type_union"></a>
### TYPE_UNION

- TaskTypeUnionSubType
    - [SUB_TYPE_BLOCK](#sub_type_block): 阻塞式集合,在下级任务执行错误时.跟常规一致,会直接停止整个任务
    - [SUB_TYPE_NON_BLOCK](#sub_type_nonBlock): 非阻塞式集合,在下级任务执行错误时,不会阻塞,但会发送一个错误信息到上级

<a name="sub_type_block"></a>
#### SUB_TYPE_BLOCK

**配置示例**
```
{
    children: [
        {
            arguments: ['div:nth-child(2) > #dialog'],
            subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
            type: TaskType.TYPE_DOM
        }
    ],
    subType: TaskTypeUnionSubType.SUB_TYPE_BLOCK,
    type: TaskType.TYPE_UNION
}
```

<a name="sub_type_nonBlock"></a>
#### SUB_TYPE_NON_BLOCK

**配置示例**
```
{
    children: [
        {
            arguments: ['div:nth-child(2) > #dialog'],
            subType: TaskTypeDomSubType.SUB_TYPE_CLICK,
            type: TaskType.TYPE_DOM
        }
    ],
    subType: TaskTypeUnionSubType.SUB_TYPE_NON_BLOCK,
    type: TaskType.TYPE_UNION
}
```