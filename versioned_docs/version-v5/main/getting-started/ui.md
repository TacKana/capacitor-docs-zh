---
title: 构建用户界面
description: 构建优秀 Capacitor 移动应用的流行 UI 方案
slug: /getting-started/ui
---

# 构建用户界面

Capacitor 应用本质上是 Web 应用。但要打造媲美原生体验的优质移动应用，仅仅包装一个网站是远远不够的。

如今，开发团队有多种 UI 方案可选。让我们探讨一些最受欢迎的选项。

## Ionic 框架

[Ionic Framework](https://ionicframework.com/) 是一个专注移动端的 UI 工具包，它帮助使用 Capacitor 的 Web 开发者获得遵循平台规范的类原生应用体验。Ionic Framework 由开发 Capacitor 的同一公司打造，专门为 Capacitor 量身定制。

目前，Ionic Framework 是我们推荐的 Capacitor UI 框架，因为它能帮助团队实现最高质量的类原生应用体验。但请注意，Capacitor 应用并不强制要求使用它。

Ionic Framework 为 [Angular](https://ionicframework.com/docs/angular/navigation)、[React](https://ionicframework.com/docs/react/navigation) 和 [Vue](https://ionicframework.com/docs/vue/navigation) 提供了原生级过渡动画和路由方案，深度集成了各框架中最流行的路由解决方案。此外，Ionic 还包含强大的组件如：[模态框](https://ionicframework.com/docs/api/modal)、[菜单](https://ionicframework.com/docs/api/menu)、[列表](https://ionicframework.com/docs/api/list)，以及特色功能如：[滑动项](https://ionicframework.com/docs/api/item-sliding)、[表单输入](https://ionicframework.com/docs/api/input)、[日期时间选择器](https://ionicframework.com/docs/api/datetime)、[卡片](https://ionicframework.com/docs/api/card)、[标签页](https://ionicframework.com/docs/api/tabs)、[iOS 风格紧凑标题栏](https://ionicframework.com/docs/api/header#condensed-header)和[更多组件](https://ionicframework.com/docs/components)。

Ionic Framework 需要搭配 Angular、React 或 Vue 使用，因此只适合采用这些技术的团队。

要开始使用，请查阅 [结合 Ionic 使用 Capacitor](./with-ionic) 文档了解更多。

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) 是一个流行的 CSS 框架，配套的 UI 模板库被许多 Capacitor 开发者用于构建优秀应用体验。我们喜爱的案例包括 [Reflect](https://reflect.app/) 和 [LogSnag](https://twitter.com/ImSh4yy/status/1615080429417103366?s=20&t=bmVrAb9PNFY6AQPNXwMFYA)。

还有一些专注于 Tailwind 的移动端 UI 框架，比如 [Konsta UI](https://konstaui.com/)。

使用 Tailwind 时需注意，它不提供移动端风格的导航和路由基础组件，团队需要自行构建符合平台规范的 UX。一种解决方案是将 Tailwind 与 Ionic Framework 结合使用，如这个 [Next.js + Tailwind + Ionic Framework + Capacitor 模板](https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter)所示。另一种方案是设计不使用传统前进/后退导航，而采用标签页或模态框的 UX。当然，团队也可以根据需要构建自定义导航路由体验。

## Framework7

[Framework7](https://framework7.io/) 是一个流行的移动端 UI 库，由强大的移动触摸滑动库 [Swiper](https://swiperjs.com/) 的开发者创建。

## Quasar

[Quasar](https://quasar.dev/) 是一个 Vue.js 框架，提供移动端组件并[官方支持 Capacitor](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/introduction#introduction)。

## Material UI

[Material UI](https://mui.com/) 是一个流行的 React 库，实现了 Material Design 规范。

## 自定义方案

如果已有现成的 UI 套件或希望自行实现，我们建议参考 Ionic Framework 和其他方案获取灵感。Capacitor 提供了构建梦想的白板，但如果选择自定义 UI，团队需要负责打造符合用户期望的优秀体验。这在应用开发基础上具有挑战性，因此通常只推荐给经验丰富的团队，或已经针对移动端优化的 Web 应用。