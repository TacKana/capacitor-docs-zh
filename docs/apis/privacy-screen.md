---
title: Privacy Screen - Capacitor 插件 API
description: Privacy Screen 插件提供防止敏感信息在应用切换器和离开应用时可见的功能。
custom_edit_url: https://github.com/ionic-team/capacitor-privacy-screen/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-privacy-screen/blob/main/src/definitions.ts
sidebar_label: 隐私屏幕
translated: true
source_hash: 69c89ed7
---

# @capacitor/privacy-screen

Privacy Screen 插件提供防止敏感信息在应用切换器和离开应用时可见的功能。

> **注意：** 此插件仅支持 Android 和 iOS 平台，不适用于 Web 平台。

## 安装

```bash
npm install @capacitor/privacy-screen
npx cap sync
```

### 平台说明

#### Android

##### FLAG_SECURE 行为
当启用 privacy screen 时，插件会自动将 Android 的 [`FLAG_SECURE`](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_SECURE) 标志应用到窗口。这提供了全面的内容保护：

- **截图防护**：阻止用户截取或录制您的应用的屏幕内容
- **应用切换器/最近应用**：当应用出现在最近应用视图中时，FLAG_SECURE 会使系统显示黑屏或在应用 FLAG_SECURE 之前捕获的最后一帧（通常为空白）
- **非安全显示保护**：防止窗口内容出现在非安全显示器上，如电视、投影仪或投屏到不受信任的设备
- **实时视图保护**：在 FLAG_SECURE 无法完全保护内容的情况下（例如手势导航或可持续数分钟的实时视图片段），插件会显示一个临时的隐私屏幕覆盖层。此覆盖层可通过 `dimBackground` 配置（显示变暗覆盖层），或默认显示启动画面。

##### 导航方式差异
隐私屏幕的行为因用户离开应用的方式而异：
- **最近应用按钮/手势**：查看应用切换器时，按配置显示隐私对话框
- **主页按钮**：FLAG_SECURE 确保应用切换器快照中的内容受到保护
- **Activity 后台事件**：通过 `privacyModeOnActivityHidden` 单独控制，适用于生物识别提示等场景

## 使用

### 基本用法

```typescript
import { PrivacyScreen } from '@capacitor/privacy-screen';

// 使用默认设置启用隐私屏幕
await PrivacyScreen.enable();

// 使用特定平台配置启用
await PrivacyScreen.enable({
  android: {
    dimBackground: true,
    privacyModeOnActivityHidden: 'splash'
  },
  ios: {
    blurEffect: 'dark'
  }
});

// 禁用隐私屏幕
await PrivacyScreen.disable();

// 检查隐私屏幕是否已启用
const { enabled } = await PrivacyScreen.isEnabled();
```

### 按屏幕保护

您可以通过在进入某个屏幕时调用 `enable()` 并在离开时调用 `disable()` 来在特定屏幕上启用和禁用隐私屏幕。注意：在屏幕之间导航时，包括使用返回导航时，请确保调用适当的方法。

```typescript
import { PrivacyScreen } from '@capacitor/privacy-screen';

// 导航到安全屏幕时启用隐私屏幕
async function navigateToSecureScreen() {
  await PrivacyScreen.enable({
    android: { dimBackground: true },
    ios: { blurEffect: 'dark' }
  });
  // 导航到您的安全屏幕
}

// 导航到非安全屏幕时禁用
async function navigateToPublicScreen() {
  await PrivacyScreen.disable();
  // 导航到您的公共屏幕
}
```

## API

<docgen-index>

* [`enable(...)`](#enable)
* [`disable()`](#disable)
* [`isEnabled()`](#isenabled)
* [接口](#接口)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### enable(...)

```typescript
enable(config?: PrivacyScreenConfig | undefined) => Promise<{ success: boolean; }>
```

启用隐私屏幕保护

| 参数        | 类型                                                                | 描述                                           |
| ------------ | ------------------------------------------------------------------- | ----------------------------------------------------- |
| **`config`** | <code><a href="#privacyscreenconfig">PrivacyScreenConfig</a></code> | 可选的平台特定行为配置 |

**返回：** <code>Promise&lt;{ success: boolean; }&gt;</code>

--------------------


### disable()

```typescript
disable() => Promise<{ success: boolean; }>
```

禁用隐私屏幕保护

**返回：** <code>Promise&lt;{ success: boolean; }&gt;</code>

--------------------


### isEnabled()

```typescript
isEnabled() => Promise<{ enabled: boolean; }>
```

检查隐私屏幕当前是否已启用

**返回：** <code>Promise&lt;{ enabled: boolean; }&gt;</code>

--------------------


### 接口


#### PrivacyScreenConfig

| 属性          | 类型                                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`android`** | <code>{ dimBackground?: boolean; preventScreenshots?: boolean; privacyModeOnActivityHidden?: 'none' \| 'dim' \| 'splash'; }</code> |
| **`ios`**     | <code>{ blurEffect?: 'none' \| 'light' \| 'dark'; }</code>                                                                         |

</docgen-api>
