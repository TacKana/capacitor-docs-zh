---
title: Privacy Screen Capacitor Plugin API
description: 隐私屏幕插件提供防止敏感信息在应用切换器和离开应用时可见的功能。
custom_edit_url: https://github.com/ionic-team/capacitor-privacy-screen/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-privacy-screen/blob/main/src/definitions.ts
sidebar_label: 隐私屏幕
---

# @capacitor/privacy-screen

隐私屏幕（Privacy Screen）插件提供防止敏感信息在应用切换器和离开应用时可见的功能。

> **注意：** 此插件仅支持 Android 和 iOS 平台，不适用于 Web 平台。

## 安装

```bash
npm install @capacitor/privacy-screen
npx cap sync
```

### 平台说明

#### Android

##### FLAG_SECURE 行为
当隐私屏幕启用时，插件会自动将 Android 的 [`FLAG_SECURE`](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_SECURE) 标志应用到窗口。这提供了全面的内容保护：

- **截图防护**：防止用户对您的应用进行截图或屏幕录制
- **应用切换器/最近应用**：当应用出现在最近应用视图中时，FLAG_SECURE 会导致系统显示黑屏或在应用 FLAG_SECURE 之前捕获的最后一帧（通常为空白）
- **非安全显示保护**：防止窗口内容出现在非安全显示器上，例如电视、投影仪或屏幕镜像到不受信任的设备
- **实时视图保护**：在 FLAG_SECURE 无法完全保护内容的情况下（例如手势导航或可以持续数分钟的实时视图片段），插件会显示一个临时的隐私屏幕覆盖层。此覆盖层可以通过 `dimBackground` 配置（显示暗淡覆盖层）或默认显示启动画面。

##### 导航方式差异
隐私屏幕的行为根据用户离开应用的方式而有所不同：
- **最近应用按钮/手势**：查看应用切换器时，隐私对话框会按配置显示
- **主页按钮**：FLAG_SECURE 确保应用切换器快照中的内容保护
- **Activity 后台事件**：通过 `privacyModeOnActivityHidden` 单独控制，适用于生物识别提示等场景

## 使用方法

### 基本用法

```typescript
import { PrivacyScreen } from '@capacitor/privacy-screen';

// 使用默认设置启用隐私屏幕
await PrivacyScreen.enable();

// 使用平台特定配置启用
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

您可以在特定屏幕上通过进入屏幕时调用 `enable()` 和离开屏幕时调用 `disable()` 来启用和禁用隐私屏幕。注意：确保在屏幕之间导航时（包括使用返回导航时）调用适当的方法。

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

- [`enable(...)`](#enable)
- [`disable()`](#disable)
- [`isEnabled()`](#isenabled)
- [接口](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### enable(...)

```typescript
enable(config?: PrivacyScreenConfig | undefined) => Promise<{ success: boolean; }>
```

启用隐私屏幕保护功能

| 参数         | 类型                                                                | 描述                       |
| ------------ | ------------------------------------------------------------------- | -------------------------- |
| **`config`** | <code><a href="#privacyscreenconfig">PrivacyScreenConfig</a></code> | 可选配置，用于平台特定行为 |

**返回值：** <code>Promise&lt;{ success: boolean; }&gt;</code>

---

### disable()

```typescript
disable() => Promise<{ success: boolean; }>
```

禁用隐私屏幕保护功能

**返回值：** <code>Promise&lt;{ success: boolean; }&gt;</code>

---

### isEnabled()

```typescript
isEnabled() => Promise<{ enabled: boolean; }>
```

检查隐私屏幕当前是否已启用

**返回值：** <code>Promise&lt;{ enabled: boolean; }&gt;</code>

---

### Interfaces

#### PrivacyScreenConfig

| 属性          | 类型                                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`android`** | <code>{ dimBackground?: boolean; preventScreenshots?: boolean; privacyModeOnActivityHidden?: 'none' \| 'dim' \| 'splash'; }</code> |
| **`ios`**     | <code>{ blurEffect?: 'none' \| 'light' \| 'dark'; }</code>                                                                         |

</docgen-api>
