---
title: Modals
description: 模态窗 API
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Modals API 提供了触发原生模态窗口的方法，可用于显示警告、确认和输入提示对话框，以及操作菜单（Action Sheets）。

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
    title: 'Stop',
    message: 'this is an error'
  });
}

async showConfirm() {
  let confirmRet = await Modals.confirm({
    title: 'Confirm',
    message: 'Are you sure you\'d like to press the red button?'
  });
  console.log('Confirm ret', confirmRet);
}

async showPrompt() {
  let promptRet = await Modals.prompt({
    title: 'Hello',
    message: 'What\'s your name?'
  });
  console.log('Prompt ret', promptRet);
}

async showActions() {
  let promptRet = await Modals.showActions({
    title: 'Photo Options',
    message: 'Select an option to perform',
    options: [
      {
        title: 'Upload'
      },
      {
        title: 'Share'
      },
      {
        title: 'Remove',
        style: ActionSheetOptionStyle.Destructive
      }
    ]
  })
  console.log('You selected', promptRet);
}
```

## API

### alert(...)

```typescript
alert(options: AlertOptions) => Promise<void>
```

显示一个警告模态窗

| 参数            | 类型                                                  |
| --------------- | ----------------------------------------------------- |
| **`options`**   | <code><a href="#alertoptions">AlertOptions</a></code> |

---

### prompt(...)

```typescript
prompt(options: PromptOptions) => Promise<PromptResult>
```

显示一个提示输入模态窗

| 参数            | 类型                                                    |
| --------------- | ------------------------------------------------------- |
| **`options`**   | <code><a href="#promptoptions">PromptOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#promptresult">PromptResult</a>&gt;</code>

---

### confirm(...)

```typescript
confirm(options: ConfirmOptions) => Promise<ConfirmResult>
```

显示一个确认模态窗

| 参数            | 类型                                                      |
| --------------- | --------------------------------------------------------- |
| **`options`**   | <code><a href="#confirmoptions">ConfirmOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#confirmresult">ConfirmResult</a>&gt;</code>

---

### showActions(...)

```typescript
showActions(options: ActionSheetOptions) => Promise<ActionSheetResult>
```

显示一个操作菜单（Action Sheet）样式的模态窗，为用户提供多个选项进行选择。

| 参数            | 类型                                                              |
| --------------- | ----------------------------------------------------------------- |
| **`options`**   | <code><a href="#actionsheetoptions">ActionSheetOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#actionsheetresult">ActionSheetResult</a>&gt;</code>

---

### 接口

#### AlertOptions

| 属性                | 类型                |
| ------------------- | ------------------- |
| **`title`**         | <code>string</code> |
| **`message`**       | <code>string</code> |
| **`buttonTitle`**   | <code>string</code> |

#### PromptResult

| 属性              | 类型                 |
| ----------------- | -------------------- |
| **`value`**       | <code>string</code>  |
| **`cancelled`**   | <code>boolean</code> |

#### PromptOptions

| 属性                      | 类型                |
| ------------------------- | ------------------- |
| **`title`**               | <code>string</code> |
| **`message`**             | <code>string</code> |
| **`okButtonTitle`**       | <code>string</code> |
| **`cancelButtonTitle`**   | <code>string</code> |
| **`inputPlaceholder`**    | <code>string</code> |
| **`inputText`**           | <code>string</code> |

#### ConfirmResult

| 属性            | 类型                 |
| --------------- | -------------------- |
| **`value`**     | <code>boolean</code> |

#### ConfirmOptions

| 属性                      | 类型                |
| ------------------------- | ------------------- |
| **`title`**               | <code>string</code> |
| **`message`**             | <code>string</code> |
| **`okButtonTitle`**       | <code>string</code> |
| **`cancelButtonTitle`**   | <code>string</code> |

#### ActionSheetResult

| 属性            | 类型                |
| --------------- | ------------------- |
| **`index`**     | <code>number</code> |

#### ActionSheetOptions

| 属性            | 类型                             | 描述         |
| --------------- | -------------------------------- | ------------ |
| **`title`**     | <code>string</code>              |              |
| **`message`**   | <code>string</code>              | 仅限 iOS     |
| **`options`**   | <code>ActionSheetOption[]</code> |              |

#### ActionSheetOption

| 属性            | 类型                                                                      | 描述                                     |
| --------------- | ------------------------------------------------------------------------- | ---------------------------------------- |
| **`title`**     | <code>string</code>                                                       |                                          |
| **`style`**     | <code><a href="#actionsheetoptionstyle">ActionSheetOptionStyle</a></code> |                                          |
| **`icon`**      | <code>string</code>                                                       | Web 端图标（遵循 ionicon 命名规范） |

### 枚举

#### ActionSheetOptionStyle

| 成员               | 值                          |
| ------------------ | -------------------------- |
| **`Default`**      | <code>"DEFAULT"</code>     |
| **`Destructive`**  | <code>"DESTRUCTIVE"</code> |
| **`Cancel`**       | <code>"CANCEL"</code>      |