---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 使用插件 API
contributors:
  - eric-horodyski
sidebar_label: 使用插件 API
slug: /plugins/tutorial/using-the-plugin-api
---

# 使用插件 API

在实现屏幕方向功能之前，先构建一个调用插件 API 的用户界面是合理的做法。本质上，我们需要搭建一个测试框架，以便快速验证各平台的功能一致性。

本教程重点在于如何构建 Capacitor 插件，而非 Ionic 框架应用开发，因此您可以直接获取以下文件的完整版本并复制到项目中：

- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.tsx" target="_blank">src/pages/Home.tsx</a>
- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.css" target="_blank">src/pages/Home.css</a>

复制完成后，使用 `ionic serve` 命令启动 Capacitor 应用。打开浏览器的开发者工具，您会看到以下错误：

```bash
Uncaught (in promise) ScreenOrientation does not have web implementation.
```

这个错误符合预期，因为我们尚未为任何平台实现代码。保持浏览器打开状态，我们将首先实现 Web 平台功能。在此之前，让我们先分析 `Home.tsx` 中的关键代码。

## 插件如何被调用？

**追踪屏幕方向：**

```typescript
const [orientation, setOrientation] = useState<string>('');
```

`orientation` 状态变量用于存储屏幕方向值，可通过调用 `setOrientation` 更新。由于初始状态未知，默认设为空字符串。使用字符串类型便于 UI 选择对应设计方案。

当触发 `screenOrientationChange` 事件时，已注册的监听器会更新 `orientation` 值：

```typescript
ScreenOrientation.addListener('screenOrientationChange', res =>
  setOrientation(res.type),
);
```

UI 加载时获取当前屏幕方向，并在 DOM 移除时清除所有监听器：

```typescript
useEffect(() => {
  ScreenOrientation.orientation().then(res => setOrientation(res.type));

  return () => {
    ScreenOrientation.removeAllListeners();
  };
}, []);
```

请注意不必深究 `useEffect` 和返回函数，这些是 React 特定的语法规则。

**显示正确布局：**

`OrientationType` 为竖屏方向提供两个值：`portrait-primary` 和 `portrait-secondary`，横屏方向同理。我们的 UI 只关心横竖方向，不区分具体子类型：

```jsx
{
  orientation.includes('portrait') &&
    {
      /* 显示可将屏幕旋转并锁定为横屏模式的按钮 */
    };
}
{
  orientation.includes('landscape') &&
    {
      /* 显示允许用户"签署"并通过确认按钮解锁屏幕方向的界面 */
    };
}
**锁定与解锁屏幕方向：**

竖屏布局中的按钮点击后会切换并锁定屏幕方向：

```typescript
onClick={() => ScreenOrientation.lock({ orientation: "landscape-primary" })}
```

相应地，横屏布局中的按钮点击后会解除方向锁定：

```typescript
onClick={() => ScreenOrientation.unlock()}
```

`Home.tsx` 和 `Home.css` 中其余代码仅为样式设计，无需深入分析。执行 `npm run build` 确保新 UI 能在 iOS 或 Android 应用中使用。

现在我们已经构建好调用插件 API 的用户界面，接下来开始实现功能！下一步我们将首先针对 Web 平台：实现 Web 端功能。