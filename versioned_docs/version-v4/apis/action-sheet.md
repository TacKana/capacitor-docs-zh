---
title: Action Sheet Capacitor 插件 API
description: Action Sheet API 提供对原生操作表的访问，这些操作表从屏幕底部弹出，显示用户可执行的操作选项。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/src/definitions.ts
sidebar_label: Action Sheet
---

# @capacitor/action-sheet

Action Sheet API 提供对原生操作表的访问，这些操作表从屏幕底部弹出，显示用户可执行的操作选项。

## 安装

```bash
npm install @capacitor/action-sheet
npx cap sync
```

### 变量配置

本插件会使用以下项目变量（需在应用的 `variables.gradle` 文件中定义）：

- `$androidxMaterialVersion`: `com.google.android.material:material` 的版本号（默认值：`1.6.1`）

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

  console.log('操作表选择结果:', result);
};
```

## API

<docgen-index>

* [`showActions(...)`](#showactions)
* [接口](#interfaces)
* [枚举](#enums)

</docgen-index>

<docgen-api>


### showActions(...)

```typescript
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

显示一个操作表样式模态框，包含用户可选择的各种选项。

| 参数          | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#showactionsoptions">ShowActionsOptions</a></code>     |

**返回值:** <code>Promise&lt;<a href="#showactionsresult">ShowActionsResult</a>&gt;</code>

**始于版本:** 1.0.0

--------------------


### 接口


#### ShowActionsResult

| 属性          | 类型                | 描述                                      | 始于版本 |
| ------------- | ------------------- | ----------------------------------------- | -------- |
| **`index`**   | <code>number</code> | 被点击选项的索引（从0开始）               | 1.0.0    |


#### ShowActionsOptions

| 属性            | 类型                             | 描述                                                                  | 始于版本 |
| --------------- | -------------------------------- | --------------------------------------------------------------------- | -------- |
| **`title`**     | <code>string</code>              | 操作表的标题                                                          | 1.0.0    |
| **`message`**   | <code>string</code>              | 标题下方显示的描述信息（仅iOS支持）                                   | 1.0.0    |
| **`options`**   | <code>ActionSheetButton[]</code> | 用户可选择的操作选项列表                                              | 1.0.0    |


#### ActionSheetButton

| 属性          | 类型                                                                      | 描述                                                                                   | 始于版本 |
| ------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------- |
| **`title`**   | <code>string</code>                                                       | 选项标题                                                                               | 1.0.0    |
| **`style`**   | <code><a href="#actionsheetbuttonstyle">ActionSheetButtonStyle</a></code> | 选项样式（仅iOS支持）                                                                  | 1.0.0    |
| **`icon`**    | <code>string</code>                                                       | 选项图标（使用ionicon命名规范，仅Web端支持）                                           | 1.0.0    |


### 枚举


#### ActionSheetButtonStyle

| 枚举值             | 值                        | 描述                                                                                   | 始于版本 |
| ------------------ | ------------------------- | -------------------------------------------------------------------------------------- | -------- |
| **`Default`**      | <code>'DEFAULT'</code>    | 默认选项样式                                                                           | 1.0.0    |
| **`Destructive`**  | <code>'DESTRUCTIVE'</code>| 用于破坏性操作的特殊样式                                                               | 1.0.0    |
| **`Cancel`**       | <code>'CANCEL'</code>     | 用于取消操作的样式（若使用，应作为最后一个选项）                                       | 1.0.0    |

</docgen-api>