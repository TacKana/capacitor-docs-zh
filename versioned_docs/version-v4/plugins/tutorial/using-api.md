---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 使用插件 API
contributors:
  - eric-horodyski
sidebar_label: 使用插件 API
slug: /plugins/tutorial/using-the-plugin-api
---

# 使用插件 API

在实现屏幕方向功能之前，先构建一个调用插件API的用户界面是合理的。本质上，我们需要搭建一个测试框架，以便快速验证各平台的功能一致性。

本教程重点在于如何构建 Capacitor 插件，而非 Ionic 框架应用开发，因此您可以直接复制以下文件的最终版本到项目中：

- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.tsx" target="_blank">src/pages/Home.tsx</a>
- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.css" target="_blank">src/pages/Home.css</a>

复制完成后，使用 `ionic serve` 命令启动 Capacitor 应用。打开浏览器开发者工具，您会看到如下错误：

```bash
未捕获错误（promise中）：ScreenOrientation未实现Web平台支持
```

这个错误在意料之中，因为我们尚未实现任何平台的代码。保持浏览器开启状态，我们将首先实现Web平台支持。在此之前，让我们先分析 `Home.tsx` 中的关键代码。

## 插件是如何被调用的？

**追踪屏幕方向：**

```typescript
const [orientation, setOrientation] = useState<string>('');
```

`orientation` 状态变量用于存储屏幕方向值，可通过 `setOrientation` 更新。初始值设为空字符串，因为代码执行时无法立即获取当前屏幕方向。使用字符串类型是为了方便UI选择对应的设计方案。

当 `screenOrientationChange` 事件触发时，以下监听器会更新 `orientation` 值：

```typescript
ScreenOrientation.addListener('screenOrientationChange', res =>
  setOrientation(res.type),
);
```

UI加载时会获取当前屏幕方向，并在DOM移除时清除所有监听器：

```typescript
useEffect(() => {
  ScreenOrientation.orientation().then(res => setOrientation(res.type));

  return () => {
    ScreenOrientation.removeAllListeners();
  };
}, []);
```

不必深究 `useEffect` 和返回函数，这些是React特定的语法规则。

**显示正确布局：**

`OrientationType` 为竖屏方向定义了 `portrait-primary` 和 `portrait-secondary` 两个值，横屏方向同理。我们的UI不关心具体子类型，只需区分横竖屏状态：

```jsx
{
  orientation.includes('portrait') &&
    {
      /* 提供按钮：旋转并锁定屏幕为横屏模式 */
    };
}
{
  orientation.includes('landscape') &&
    {
      /* 提供确认按钮：允许用户"签名"后解锁屏幕方向 */
    };
}
**锁定与解锁屏幕方向：**

竖屏布局中的按钮会切换并锁定屏幕方向：

```typescript
onClick={() => ScreenOrientation.lock({ orientation: "landscape-primary" })}
```

而横屏布局中的按钮则用于解除方向锁定：

```typescript
onClick={() => ScreenOrientation.unlock()}
```

`Home.tsx` 和 `Home.css` 中的其余代码均为样式相关，无需深入分析。运行 `npm run build` 确保新UI能在iOS或Android应用中使用。

现在我们已经搭建好调用插件API的用户界面，接下来开始实现具体功能！在下一步中，我们将首先针对Web平台实现功能支持。