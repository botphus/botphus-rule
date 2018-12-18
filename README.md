# @botphus/rule
> `@botphus/rule`是`botphus`的核心测试规则程序,提供web测试单元任务验证.

[![build status][travis-image]][travis-url]
[![codecov.io][codecov-image]][codecov-url]
[![node version][node-image]][node-url]

[travis-image]: https://img.shields.io/travis/botphus/botphus-rule/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/botphus/botphus-rule
[codecov-image]: https://img.shields.io/codecov/c/github/botphus/botphus-rule/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/botphus/botphus-rule?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_6-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

## 索引
- [API文档](docs/API.md)
- [测试单元配置](docs/unit.md)

## 快速使用

### 安装
```shell
npm install @botphus/rule --save
```

### 构建
```shell
npm run build
```

### 使用
```javascript
import BotphusRule, {TaskType, TaskTypeDomSubType} from '@botphus/rule';
const botphusRule = new BotphusRule();
botphusRule.validRule([
    {
        argments: ['div'],
        assertion: ['data === "wrong assertion rule"'],
        subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
        type: TaskType.TYPE_DOM
    }
])
    .catch((err) => {
        console.log(err);
    });
```