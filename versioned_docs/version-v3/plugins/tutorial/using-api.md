---
title: 构建Capacitor插件
description: 构建Capacitor插件 - 使用插件API
contributors:
  - eric-horodyski
sidebar_label: 使用插件API
slug: /plugins/tutorial/using-the-plugin-api
---

# 使用插件API

在实现屏幕方向功能之前，先构建一个调用插件API的用户界面是合理的。本质上，我们需要搭建一个测试框架，以便快速验证各平台的功能一致性。

本教程重点在于如何构建Capacitor插件，而非Ionic Framework应用开发，因此您可以直接使用以下文件的最终版本，将其内容复制到您的项目中：

- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.tsx" target="_blank">src/pages/Home.tsx</a>
- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.css" target="_blank">src/pages/Home.css</a>

复制完成后，使用`ionic serve`命令启动Capacitor应用。打开浏览器开发者工具，您会看到以下错误：

```bash
Uncaught (in promise) ScreenOrientation does not have web implementation.
```

这个错误符合预期，因为我们尚未为任何平台实现代码。保持浏览器打开状态，我们将首先实现Web平台功能。在此之前，让我们先回顾`Home.tsx`中的相关代码。

## 插件如何使用？

**跟踪屏幕方向：**

```typescript
const [orientation, setOrientation] = useState<string>('');
```

`orientation`状态变量用于存储屏幕方向值，可通过调用`setOrientation`更新。由于代码初始执行时无法确定当前屏幕方向，故默认设为空字符串。使用字符串类型是为了便于UI确定显示哪种设计。

当`screenOrientationChange`事件触发时，已建立的事件监听器会更新`orientation`值：

```typescript
ScreenOrientation.addListener('screenOrientationChange', res =>
  setOrientation(res.type),
);
```

UI加载时会获取当前屏幕方向，当UI从DOM移除时会清除所有监听器：

```typescript
useEffect(() => {
  ScreenOrientation.orientation().then(res => setOrientation(res.type));

  return () => {
    ScreenOrientation.removeAllListeners();
  };
}, []);
```

不必深究`useEffect`和返回函数，这些是React特定的语法规则。

**显示正确布局：**

`OrientationType`为竖屏方向提供两个值：`portrait-primary`和`portrait-secondary`，横屏方向同理。我们的UI不关心它们之间的差异，只关注是横屏还是竖屏。

```jsx
{
  orientation.includes('portrait') &&
    {
      /* 提供按钮以旋转并锁定屏幕方向为横屏模式 */
    };
}
{
  orientation.includes('landscape') &&
    {
      /* 通过确认按钮让用户"签署"并解锁屏幕方向 */
    };
}
```

**锁定与解锁屏幕方向：**

竖屏布局包含一个按钮，点击后将改变屏幕方向并锁定：

```typescript
onClick={() => ScreenOrientation.lock({ orientation: "landscape-primary" })}
```

相应地，横屏布局包含一个按钮，点击后将解锁屏幕方向：

```typescript
onClick={() => ScreenOrientation.unlock()}
```

`Home.tsx`和`Home.css`中的其余代码纯属样式设计，无需深入分析。运行`npm run build`以确保新UI在iOS或Android应用运行时生效。

现在我们已经有了调用插件API的用户界面，接下来可以开始实现功能了！下一步我们将首先针对Web平台：实现Web端的插件功能。