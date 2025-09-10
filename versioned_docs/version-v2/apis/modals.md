---
title: Modals
description: 模态框 API
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

模态框 API 提供了调用原生模态窗口的方法，可用于显示警告提示、确认对话框、输入框以及操作表（Action Sheets）。

- [`alert(...)`](#alert) - 警告提示
- [`prompt(...)`](#prompt) - 输入提示
- [`confirm(...)`](#confirm) - 确认对话框
- [`showActions(...)`](#showactions) - 操作表
- [接口定义](#interfaces)
- [枚举类型](#enums)

## 示例

```typescript
import { Plugins, ActionSheetOptionStyle } from '@capacitor/core';

const { Modals } = Plugins;

async showAlert() {
  let alertRet = await Modals.alert({
    title: '停止',
    message: '这是一个错误提示'
  });
}

async showConfirm() {
  let confirmRet = await Modals.confirm({
    title: '确认',
    message: '确定要按下红色按钮吗？'
  });
  console.log('确认结果', confirmRet);
}

async showPrompt() {
  let promptRet = await Modals.prompt({
    title: '你好',
    message: '请问你叫什么名字？'
  });
  console.log('输入结果', promptRet);
}

async showActions() {
  let promptRet = await Modals.showActions({
    title: '图片操作',
    message: '请选择要执行的操作',
    options: [
      {
        title: '上传'
      },
      {
        title: '分享'
      },
      {
        title: '删除',
        style: ActionSheetOptionStyle.Destructive
      }
    ]
  })
  console.log('您的选择是', promptRet);
}
```

## API

### alert(...)

```typescript
alert(options: AlertOptions) => Promise<void>
```

显示警告提示框

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#alertoptions">AlertOptions</a></code> |

---

### prompt(...)

```typescript
prompt(options: PromptOptions) => Promise<PromptResult>
```

显示输入提示框

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#promptoptions">PromptOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#promptresult">PromptResult</a>&gt;</code>

---

### confirm(...)

```typescript
confirm(options: ConfirmOptions) => Promise<ConfirmResult>
```

显示确认对话框

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#confirmoptions">ConfirmOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#confirmresult">ConfirmResult</a>&gt;</code>

---

### showActions(...)

```typescript
showActions(options: ActionSheetOptions) => Promise<ActionSheetResult>
```

显示操作表（Action Sheet）模态框，提供多个选项供用户选择。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#actionsheetoptions">ActionSheetOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#actionsheetresult">ActionSheetResult</a>&gt;</code>

---

### 接口定义

#### AlertOptions

| 属性              | 类型                |
| ----------------- | ------------------- |
| **`title`**       | <code>string</code> |
| **`message`**     | <code>string</code> |
| **`buttonTitle`** | <code>string</code> |

#### PromptResult

| 属性            | 类型                 |
| --------------- | -------------------- |
| **`value`**     | <code>string</code>  |
| **`cancelled`** | <code>boolean</code> |

#### PromptOptions

| 属性                    | 类型                |
| ----------------------- | ------------------- |
| **`title`**             | <code>string</code> |
| **`message`**           | <code>string</code> |
| **`okButtonTitle`**     | <code>string</code> |
| **`cancelButtonTitle`** | <code>string</code> |
| **`inputPlaceholder`**  | <code>string</code> |
| **`inputText`**         | <code>string</code> |

#### ConfirmResult

| 属性        | 类型                 |
| ----------- | -------------------- |
| **`value`** | <code>boolean</code> |

#### ConfirmOptions

| 属性                    | 类型                |
| ----------------------- | ------------------- |
| **`title`**             | <code>string</code> |
| **`message`**           | <code>string</code> |
| **`okButtonTitle`**     | <code>string</code> |
| **`cancelButtonTitle`** | <code>string</code> |

#### ActionSheetResult

| 属性        | 类型                |
| ----------- | ------------------- |
| **`index`** | <code>number</code> |

#### ActionSheetOptions

| 属性          | 类型                             | 描述       |
| ------------- | -------------------------------- | ---------- |
| **`title`**   | <code>string</code>              |            |
| **`message`** | <code>string</code>              | 仅限 iOS   |
| **`options`** | <code>ActionSheetOption[]</code> | 操作选项列表 |

#### ActionSheetOption

| 属性        | 类型                                                                      | 描述                                |
| ----------- | ------------------------------------------------------------------------- | ----------------------------------- |
| **`title`** | <code>string</code>                                                       | 选项标题                            |
| **`style`** | <code><a href="#actionsheetoptionstyle">ActionSheetOptionStyle</a></code> | 样式类型                            |
| **`icon`**  | <code>string</code>                                                       | Web 图标（使用 ionicon 命名规范）   |

### 枚举类型

#### ActionSheetOptionStyle

| 枚举值           | 值                          |
| ----------------- | -------------------------- |
| **`Default`**     | <code>"DEFAULT"</code>     |
| **`Destructive`** | <code>"DESTRUCTIVE"</code> |
| **`Cancel`**      | <code>"CANCEL"</code>      |