---
title: Action Sheet Capacitor 插件 API
description: Action Sheet API 提供了对原生操作表的访问，这些操作表从屏幕底部弹出，显示用户可以执行的操作。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/mainaction-sheet/src/definitions.ts
sidebar_label: Action Sheet
---

# @capacitor/action-sheet

Action Sheet API 提供了对原生操作表的访问，这些操作表从屏幕底部弹出，显示用户可以执行的操作。

## 安装

```bash
npm install @capacitor/action-sheet
npx cap sync
```

### 变量配置

本插件会使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `$androidxMaterialVersion`: `com.google.android.material:material` 的版本号（默认值：`1.3.0`）

## PWA 注意事项

Action Sheet 插件需要 [PWA Elements](https://capacitorjs.com/docs/v3/web/pwa-elements) 才能正常工作。

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

## API

<docgen-index>

- [`showActions(...)`](#showactions)
- [接口](#interfaces)
- [枚举](#enums)

</docgen-index>

<docgen-api>

### showActions(...)

```typescript
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

显示一个 Action Sheet 风格的模态框，包含用户可以选择的多种选项。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#showactionsoptions">ShowActionsOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#showactionsresult">ShowActionsResult</a>&gt;</code>

**自版本:** 1.0.0

---

### Interfaces

#### ShowActionsResult

| 属性        | 类型                | 描述                         | 版本  |
| ----------- | ------------------- | ---------------------------- | ----- |
| **`index`** | <code>number</code> | 被点击选项的索引（从零开始） | 1.0.0 |

#### ShowActionsOptions

| 属性          | 类型                             | 描述                                      | 版本  |
| ------------- | -------------------------------- | ----------------------------------------- | ----- |
| **`title`**   | <code>string</code>              | 操作表的标题                              | 1.0.0 |
| **`message`** | <code>string</code>              | 标题下方显示的提示信息（仅 iOS 平台支持） | 1.0.0 |
| **`options`** | <code>ActionSheetButton[]</code> | 用户可选择的选项列表                      | 1.0.0 |

#### ActionSheetButton

| 属性        | 类型                                                                      | 描述                                                 | 版本  |
| ----------- | ------------------------------------------------------------------------- | ---------------------------------------------------- | ----- |
| **`title`** | <code>string</code>                                                       | 选项的标题                                           | 1.0.0 |
| **`style`** | <code><a href="#actionsheetbuttonstyle">ActionSheetButtonStyle</a></code> | 选项的样式（仅 iOS 平台支持）                        | 1.0.0 |
| **`icon`**  | <code>string</code>                                                       | 选项的图标（使用 ionicon 命名规范，仅 Web 平台支持） | 1.0.0 |

### Enums

#### ActionSheetButtonStyle

| 成员              | 值                         | 描述                                                             | 版本  |
| ----------------- | -------------------------- | ---------------------------------------------------------------- | ----- |
| **`Default`**     | <code>'DEFAULT'</code>     | 默认选项样式                                                     | 1.0.0 |
| **`Destructive`** | <code>'DESTRUCTIVE'</code> | 用于破坏性操作的样式                                             | 1.0.0 |
| **`Cancel`**      | <code>'CANCEL'</code>      | 用于取消操作表的样式。如果使用此样式，应该放在最后一个可选项上。 | 1.0.0 |

</docgen-api>
