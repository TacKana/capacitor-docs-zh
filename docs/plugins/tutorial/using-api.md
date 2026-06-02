---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 使用插件 API
contributors:
  - eric-horodyski
sidebar_label: 使用插件 API
slug: /plugins/tutorial/using-the-plugin-api
---

# 使用插件 API

在实现屏幕方向功能之前，先构建一个能调用插件 API 的用户界面是很有意义的。本质上，我们要搭建一个测试工具，让我们能够快速测试各平台之间的功能一致性。

本教程的重点是如何构建一个 Capacitor 插件，而不是如何构建 Ionic Framework 应用程序，因此你只需获取所需的文件最终版本，并将其内容复制粘贴到你的项目中即可：

- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.tsx" target="_blank">src/pages/Home.tsx</a>
- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.css" target="_blank">src/pages/Home.css</a>

复制完成后，使用 `ionic serve` 命令运行 Capacitor 应用。打开浏览器的开发者工具，你应该会看到以下错误：

```bash
Uncaught (in promise) ScreenOrientation does not have web implementation.
```

这个错误是正常的；我们还没有为任何平台实现代码。请保持浏览器打开状态。我们将首先实现 Web 平台。在此之前，让我们回顾一下 `Home.tsx` 中的相关代码。

## 插件是如何被使用的？

**追踪屏幕方向：**

```typescript
const [orientation, setOrientation] = useState<string>('');
```

`orientation` 状态变量用于保存屏幕方向的值。它可以通过调用 `setOrientation` 来更新。由于代码开始执行时我们不知道当前的屏幕方向，因此将其默认为空字符串。使用字符串类型可以更方便地告知 UI 应该显示哪种设计。

我们建立了一个事件监听器，当 `screenOrientationChange` 触发时更新 `orientation`。

```typescript
ScreenOrientation.addListener('screenOrientationChange', res =>
  setOrientation(res.type),
);
```

当前屏幕方向在 UI 加载时获取，并且创建的监听器（如上所示）会在 UI 从 DOM 中移除时被清除。

```typescript
useEffect(() => {
  ScreenOrientation.orientation().then(res => setOrientation(res.type));

  return () => {
    ScreenOrientation.removeAllListeners();
  };
}, []);
```

请不必深究 `useEffect` 和返回函数；这些是 React 特有的语法规则。

**显示正确的设计：**

`OrientationType` 对竖屏方向有两个值：`portrait-primary` 和 `portrait-secondary`。横屏方向也是如此。我们的 UI 不关心它们之间的区别，只关心是横屏还是竖屏。

```jsx
{
  orientation.includes('portrait') &&
    {
      /* 提供一个按钮，用于旋转并将屏幕方向锁定为横屏模式。 */
    };
}
{
  orientation.includes('landscape') &&
    {
      /* 让用户通过确认按钮"签名"并解锁屏幕方向。 */
    };
}
```

**锁定和解锁屏幕方向：**

竖屏设计包含一个按钮，按下后会改变屏幕方向并将其锁定。

```typescript
onClick={() => ScreenOrientation.lock({ orientation: "landscape-primary" })}
```

相反，横屏设计包含一个按钮，按下后会解锁屏幕方向。

```typescript
onClick={() => ScreenOrientation.unlock()}
```

`Home.tsx` 和 `Home.css` 中的其余代码纯粹是界面美化；我们不需要深入探讨。运行 `npm run build` 以便在 iOS 或 Android 上运行应用时使用新的 UI。

我们现在有了一个可以调用插件 API 的用户界面，那么让我们开始实现功能吧！我们将在下一步中首先针对 Web 进行实现：Web 实现。
