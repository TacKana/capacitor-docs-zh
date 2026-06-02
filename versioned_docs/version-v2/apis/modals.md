---
title: 模态框
description: 模态框 API
contributors:
  - mlynch
  - jcesarmobile
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Modals API 提供了触发原生模态窗口的方法，用于警告、确认和输入提示，以及操作列表。

- [`alert(...)`](#alert)
- [`prompt(...)`](#prompt)
- [`confirm(...)`](#confirm)
- [`showActions(...)`](#showactions)
- [接口](#接口)
- [枚举](#枚举)

## 示例

```typescript
import { Plugins, ActionSheetOptionStyle } from '@capacitor/core';

const { Modals } = Plugins;

async showAlert() {
  let alertRet = await Modals.alert({
    title: '停止',
    message: '这是一个错误'
  });
}

async showConfirm() {
  let confirmRet = await Modals.confirm({
    title: '确认',
    message: '您确定要按下红色按钮吗？'
  });
  console.log('确认返回', confirmRet);
}

async showPrompt() {
  let promptRet = await Modals.prompt({
    title: '你好',
    message: '你叫什么名字？'
  });
  console.log('提示返回', promptRet);
}

async showActions() {
  let promptRet = await Modals.showActions({
    title: '照片选项',
    message: '选择一个操作来执行',
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
  console.log('你选择了', promptRet);
}
```

## API

### alert(...)

```typescript
alert(options: AlertOptions) => Promise<void>
```

显示警告模态框

| 参数 | 类型 |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#alertoptions">AlertOptions</a></code> |

---

### prompt(...)

```typescript
prompt(options: PromptOptions) => Promise<PromptResult>
```

显示提示模态框

| 参数 | 类型 |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#promptoptions">PromptOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#promptresult">PromptResult</a>&gt;</code>

---

### confirm(...)

```typescript
confirm(options: ConfirmOptions) => Promise<ConfirmResult>
```

显示确认模态框

| 参数 | 类型 |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#confirmoptions">ConfirmOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#confirmresult">ConfirmResult</a>&gt;</code>

---

### showActions(...)

```typescript
showActions(options: ActionSheetOptions) => Promise<ActionSheetResult>
```

显示操作列表样式的模态框，为用户提供多种选项进行选择。

| 参数 | 类型 |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#actionsheetoptions">ActionSheetOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#actionsheetresult">ActionSheetResult</a>&gt;</code>

---

### 接口

#### AlertOptions

| 属性 | 类型 |
| ----------------- | ------------------- |
| **`title`**       | <code>string</code> |
| **`message`**     | <code>string</code> |
| **`buttonTitle`** | <code>string</code> |

#### PromptResult

| 属性 | 类型 |
| --------------- | -------------------- |
| **`value`**     | <code>string</code>  |
| **`cancelled`** | <code>boolean</code> |

#### PromptOptions

| 属性 | 类型 |
| ----------------------- | ------------------- |
| **`title`**             | <code>string</code> |
| **`message`**           | <code>string</code> |
| **`okButtonTitle`**     | <code>string</code> |
| **`cancelButtonTitle`** | <code>string</code> |
| **`inputPlaceholder`**  | <code>string</code> |
| **`inputText`**         | <code>string</code> |

#### ConfirmResult

| 属性 | 类型 |
| ----------- | -------------------- |
| **`value`** | <code>boolean</code> |

#### ConfirmOptions

| 属性 | 类型 |
| ----------------------- | ------------------- |
| **`title`**             | <code>string</code> |
| **`message`**           | <code>string</code> |
| **`okButtonTitle`**     | <code>string</code> |
| **`cancelButtonTitle`** | <code>string</code> |

#### ActionSheetResult

| 属性 | 类型 |
| ----------- | ------------------- |
| **`index`** | <code>number</code> |

#### ActionSheetOptions

| 属性 | 类型 | 描述 |
| ----------- | -------------------------------- | ----------- |
| **`title`**   | <code>string</code>              |             |
| **`message`** | <code>string</code>              | 仅 iOS |
| **`options`** | <code>ActionSheetOption[]</code> |             |

#### ActionSheetOption

| 属性 | 类型 | 描述 |
| ----------- | ------------------------------------------------------------------------- | ---------------------------------------- |
| **`title`** | <code>string</code>                                                       | |
| **`style`** | <code><a href="#actionsheetoptionstyle">ActionSheetOptionStyle</a></code> | |
| **`icon`**  | <code>string</code>                                                       | Web 图标（ionicon 命名约定） |

### 枚举

#### ActionSheetOptionStyle

| 成员 | 值 |
| ----------------- | -------------------------- |
| **`Default`**     | <code>"DEFAULT"</code>     |
| **`Destructive`** | <code>"DESTRUCTIVE"</code> |
| **`Cancel`**      | <code>"CANCEL"</code>      |
