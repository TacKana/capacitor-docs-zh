---
title: Action Sheet Capacitor 插件 API
description: Action Sheet API 提供了访问原生操作表的功能，操作表从屏幕底部弹出，显示用户可执行的操作选项。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/action-sheet/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/action-sheet/src/definitions.ts
sidebar_label: Action Sheet
---

# @capacitor/action-sheet

Action Sheet API 提供了访问原生操作表的功能，这种交互组件从屏幕底部弹出，展示用户可选择的多个操作选项。

## 安装

```bash
npm install @capacitor/action-sheet
npx cap sync
```

### 变量配置

本插件会使用以下项目变量（需在应用的 `variables.gradle` 文件中定义）：

- `androidxMaterialVersion`: `com.google.android.material:material` 的版本号（默认值：`1.10.0`）

## PWA 注意事项

Action Sheet 插件需要配合 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 使用。

## 使用示例

```typescript
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';

const showActions = async () => {
  const result = await ActionSheet.showActions({
    title: '图片操作',
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

  console.log('操作表返回结果:', result);
};
```

## API 文档

<docgen-index>

- [`showActions(...)`](#showactions)
- [接口定义](#interfaces)
- [枚举类型](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### showActions(...)

```typescript
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

显示一个操作表模态框，提供多个选项供用户选择。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#showactionsoptions">ShowActionsOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#showactionsresult">ShowActionsResult</a>&gt;</code>

**版本:** 1.0.0

---

### Interfaces

#### ShowActionsResult

| 属性        | 类型                | 描述                            | 版本  |
| ----------- | ------------------- | ------------------------------- | ----- |
| **`index`** | <code>number</code> | 被点击选项的索引（从0开始计数） | 1.0.0 |

#### ShowActionsOptions

| 属性          | 类型                             | 描述                                    | 版本  |
| ------------- | -------------------------------- | --------------------------------------- | ----- |
| **`title`**   | <code>string</code>              | 操作表的标题                            | 1.0.0 |
| **`message`** | <code>string</code>              | 标题下方显示的提示信息（仅iOS平台支持） | 1.0.0 |
| **`options`** | <code>ActionSheetButton[]</code> | 用户可选的按钮列表                      | 1.0.0 |

#### ActionSheetButton

| 属性        | 类型                                                                      | 描述                                           | 版本  |
| ----------- | ------------------------------------------------------------------------- | ---------------------------------------------- | ----- |
| **`title`** | <code>string</code>                                                       | 按钮显示的文本                                 | 1.0.0 |
| **`style`** | <code><a href="#actionsheetbuttonstyle">ActionSheetButtonStyle</a></code> | 按钮的样式（仅iOS平台支持）                    | 1.0.0 |
| **`icon`**  | <code>string</code>                                                       | 按钮图标（使用ionicon命名规范，仅Web平台支持） | 1.0.0 |

### Enums类型

#### ActionSheetButtonStyle

| 枚举值            | 值                         | 描述                                                         | 版本  |
| ----------------- | -------------------------- | ------------------------------------------------------------ | ----- |
| **`Default`**     | <code>'DEFAULT'</code>     | 默认按钮样式                                                 | 1.0.0 |
| **`Destructive`** | <code>'DESTRUCTIVE'</code> | 表示破坏性操作的按钮样式（通常显示为红色）                   | 1.0.0 |
| **`Cancel`**      | <code>'CANCEL'</code>      | 表示取消操作的按钮样式。使用时应当放在选项列表的最底部位置。 | 1.0.0 |

</docgen-api>
