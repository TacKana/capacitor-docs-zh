---
title: Action Sheet Capacitor 插件 API
description: Action Sheet API 提供对原生操作表的访问，这些操作表从屏幕底部弹出，显示用户可以执行的操作。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/action-sheet/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/action-sheet/src/definitions.ts
sidebar_label: Action Sheet
---

# @capacitor/action-sheet

Action Sheet API 提供对原生操作表的访问，这些操作表从屏幕底部弹出，显示用户可以执行的操作。

## 安装

```bash
npm install @capacitor/action-sheet
npx cap sync
```

### 变量配置

本插件会使用以下项目变量（在应用的 `variables.gradle` 文件中定义）：

- `androidxMaterialVersion`：`com.google.android.material:material` 的版本号（默认值：`1.8.0`）

## PWA 注意事项

Action Sheet 插件需要配合 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 使用。

## 示例

```typescript
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';

const showActions = async () => {
  const result = await ActionSheet.showActions({
    title: '照片选项',
    message: '请选择要执行的操作',
    options: [
      {
        title: '上传',
      },
      {
        title: '分享',
      },
      {
        title: '删除',
        style: ActionSheetButtonStyle.Destructive,
      },
    ],
  });

  console.log('操作表结果:', result);
};
```

## API 文档

<docgen-index>

- [`showActions(...)`](#showactions)
- [接口](#interfaces)
- [枚举](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### showActions(...)

```typescript
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

显示一个操作表风格的模态框，提供多个选项供用户选择。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#showactionsoptions">ShowActionsOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#showactionsresult">ShowActionsResult</a>&gt;</code>

**自版本：** 1.0.0

---

### Interfaces

#### ShowActionsResult

| 属性        | 类型                | 描述                         | 版本  |
| ----------- | ------------------- | ---------------------------- | ----- |
| **`index`** | <code>number</code> | 被点击选项的索引（从零开始） | 1.0.0 |

#### ShowActionsOptions

| 属性          | 类型                             | 描述                                | 版本  |
| ------------- | -------------------------------- | ----------------------------------- | ----- |
| **`title`**   | <code>string</code>              | 操作表的标题。                      | 1.0.0 |
| **`message`** | <code>string</code>              | 显示在标题下方的消息（仅iOS支持）。 | 1.0.0 |
| **`options`** | <code>ActionSheetButton[]</code> | 用户可选的操作选项。                | 1.0.0 |

#### ActionSheetButton

| 属性        | 类型                                                                      | 描述                                           | 版本  |
| ----------- | ------------------------------------------------------------------------- | ---------------------------------------------- | ----- |
| **`title`** | <code>string</code>                                                       | 选项标题                                       | 1.0.0 |
| **`style`** | <code><a href="#actionsheetbuttonstyle">ActionSheetButtonStyle</a></code> | 选项样式（仅iOS支持）。                        | 1.0.0 |
| **`icon`**  | <code>string</code>                                                       | 选项图标（使用ionicon命名规范，仅Web端支持）。 | 1.0.0 |

### Enums

#### ActionSheetButtonStyle

| 枚举值            | 值                         | 描述                                               | 版本  |
| ----------------- | -------------------------- | -------------------------------------------------- | ----- |
| **`Default`**     | <code>'DEFAULT'</code>     | 默认选项样式。                                     | 1.0.0 |
| **`Destructive`** | <code>'DESTRUCTIVE'</code> | 用于破坏性操作的样式。                             | 1.0.0 |
| **`Cancel`**      | <code>'CANCEL'</code>      | 用于取消操作的样式（应作为最后一个可用选项使用）。 | 1.0.0 |

</docgen-api>
