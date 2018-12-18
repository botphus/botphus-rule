# 程序API

## Class
- [BotphusRule](#BotphusRule)

<a name="BotphusRule"></a>
### BotphusRule

- [new BotphusRule(customConfig?: IBotphusConfig)](#new_BotphusRule)
- instance
    - [validRule(taskRuleList: TaskRuleTypeItem[])](#valid_rule): `Promise<void>`

<a name="new_BotphusRule"></a>
#### new BotphusRule(option: IBotphusRuleOpt)

创建一个`BotphusRule`实例

参数 | 类型 | 默认值 | 描述 
--- | --- | --- | ---
[blockType] | `Set<TaskType>` | `null` | 设置屏蔽的类型,详见[测试单元配置](unit.md)
[blockSubType] | `Set<TaskSubType>` | `null` | 设置屏蔽的子类型,详见[测试单元配置](unit.md)

**示例**
```javascript
import BotphusRule, {TaskType} from '@botphus/rule';
import * as path from 'path';
const botphusCore = new BotphusRule({
    blockType: new Set<TaskType>().add(TaskType.TYPE_DATA).add(TaskType.TYPE_DOM)
});
```

<a name="valid_rule"></a>
#### validRule(taskRuleList: TaskRuleTypeItem[]): `Promise<void>`

验证任务规则

参数 | 类型 | 默认值 | 描述 
--- | --- | --- | ---
taskRuleList | `TaskRuleTypeItem[]` | null | 任务测试单元规则数据,详见[测试单元配置](unit.md)
