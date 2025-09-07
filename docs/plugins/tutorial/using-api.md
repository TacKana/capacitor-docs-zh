---
title: 构建 Capacitor 插件
description: Capacitor 插件开发指南 - 使用插件 API
contributors:
  - eric-horodyski
sidebar_label: 使用插件 API
slug: /plugins/tutorial/using-the-plugin-api
---

# 使用插件 API

在实现屏幕方向功能之前，先构建一个调用插件 API 的用户界面是明智之举。本质上，我们需要搭建一个测试框架，以便快速验证各平台的功能一致性。

本教程重点在于如何构建 Capacitor 插件，而非 Ionic Framework 应用开发。因此，您可以直接使用以下文件的完成版本，将其内容复制到您的项目中：

- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.tsx" target="_blank">src/pages/Home.tsx</a>
- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.css" target="_blank">src/pages/Home.css</a>

复制完成后，使用 `ionic serve` 命令启动 Capacitor 应用。打开浏览器的开发者工具，您会看到如下错误：

```bash
Uncaught (in promise) ScreenOrientation does not have web implementation.
```

这个错误符合预期，因为我们尚未为任何平台实现代码。保持浏览器打开状态，我们将首先实现 Web 平台的支持。在此之前，让我们先回顾一下 `Home.tsx` 中的相关代码。

## 插件是如何被使用的？

**跟踪屏幕方向：**

```typescript
const [orientation, setOrientation] = useState<string>('');
```

`orientation` 状态变量用于存储屏幕方向值，可通过调用 `setOrientation` 更新。由于代码初始执行时无法确定当前屏幕方向，故默认设为空字符串。使用字符串类型便于 UI 决定显示哪种设计。

当 `screenOrientationChange` 事件触发时，已建立的事件监听器会更新 `orientation`：

```typescript
ScreenOrientation.addListener('screenOrientationChange', res =>
  setOrientation(res.type),
);
```

UI 加载时会获取当前屏幕方向，当 UI 从 DOM 中移除时会清除所有监听器：

```typescript
useEffect(() => {
  ScreenOrientation.orientation().then(res => setOrientation(res.type));

  return () => {
    ScreenOrientation.removeAllListeners();
  };
}, []);
```

不必深究 `useEffect` 和返回函数，这些是 React 特有的语法规则。

**显示正确的界面设计：**

`OrientationType` 为竖屏方向提供了两个值：`portrait-primary` 和 `portrait-secondary`，横屏方向同理。我们的 UI 不关心它们之间的区别，只区分横屏或竖屏。

```jsx
{
  orientation.includes('portrait') &&
    {
      /* 提供旋转按钮，将屏幕方向锁定为横屏模式 */
    };
}
{
  orientation.includes('landscape') &&
    {
      /* 允许用户通过确认按钮"签名"并解锁屏幕方向 */
    };
}
**锁定与解锁屏幕方向：**

竖屏界面包含一个按钮，点击后将改变屏幕方向并锁定：

```typescript
onClick={() => ScreenOrientation.lock({ orientation: "landscape-primary" })}
```

相应地，横屏界面包含一个解锁屏幕方向的按钮：

```typescript
onClick={() => ScreenOrientation.unlock()}
```

`Home.tsx` 和 `Home.css` 中其余代码仅为样式设计，无需深入探讨。运行 `npm run build` 确保新 UI 在 iOS 或 Android 应用中使用。

现在我们已具备调用插件 API 的用户界面，接下来将开始实现功能！在下一步中，我们将首先针对 Web 平台：实现 Web 端的支持。