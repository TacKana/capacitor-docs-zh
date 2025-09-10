---
title: 构建用户界面
description: 构建优质Capacitor移动应用的流行UI方案
slug: /getting-started/ui
---

# 构建用户界面

Capacitor应用本质上都是Web应用。但要打造媲美原生应用的移动体验，仅仅包装一个网站是远远不够的。

如今，开发团队有多种UI方案可选。让我们来看看最受欢迎的几种选择。

## Ionic框架

[Ionic Framework](https://ionicframework.com/) 是一款专注于移动端的UI工具包，它帮助使用Capacitor的Web开发者获得遵循平台规范的原生级应用体验。Ionic Framework由Capacitor的同一家公司开发，专为Capacitor量身定制。

目前，Ionic Framework是我们推荐的Capacitor UI框架，因为它能帮助团队实现最高品质的原生应用体验。但请注意，这并不是强制要求。

Ionic Framework为[Angular](https://ionicframework.com/docs/angular/navigation)、[React](https://ionicframework.com/docs/react/navigation)和[Vue](https://ionicframework.com/docs/vue/navigation)提供了原生级过渡动画和路由方案，深度集成了各框架中最流行的路由解决方案。此外，Ionic还包含强大组件如：[模态框](https://ionicframework.com/docs/api/modal)、[菜单](https://ionicframework.com/docs/api/menu)、[列表](https://ionicframework.com/docs/api/list)，以及特色功能如：[滑动项](https://ionicframework.com/docs/api/item-sliding)、[表单输入](https://ionicframework.com/docs/api/input)、[日期选择器](https://ionicframework.com/docs/api/datetime)、[卡片](https://ionicframework.com/docs/api/card)、[标签页](https://ionicframework.com/docs/api/tabs)、[iOS风格紧凑标题栏](https://ionicframework.com/docs/api/header#condensed-header)等[丰富组件](https://ionicframework.com/docs/components)。

Ionic Framework需要配合Angular、React或Vue使用，因此仅适用于采用这些技术的团队。

要开始使用，请查看[在Ionic中使用Capacitor](./with-ionic)文档获取更多信息。

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) 是流行的CSS框架，配套的UI模板库被许多Capacitor开发者用来构建优秀应用体验。我们喜爱的案例包括[Reflect](https://reflect.app/)和[LogSnag](https://twitter.com/ImSh4yy/status/1615080429417103366?s=20&t=bmVrAb9PNFY6AQPNXwMFYA)。

还有一些专注于移动端的Tailwind UI框架，例如[Konsta UI](https://konstaui.com/)。

使用Tailwind时需注意，它不提供移动端风格的导航和路由基础组件，团队需要自行构建符合平台习惯的UX。一种解决方案是将Tailwind与Ionic Framework结合使用，如这个[Next.js + Tailwind + Ionic + Capacitor模板](https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter)所示。另一种是设计不使用传统前进/后退导航，转而采用标签页或模态框的UX方案。当然，团队也可以完全自定义导航路由体验。

## Framework7

[Framework7](https://framework7.io/) 是由[Swiper](https://swiperjs.com/)（强大的移动端触摸滑动库）开发者创建的流行移动端UI库。

## Quasar

[Quasar](https://quasar.dev/) 是Vue.js框架，提供移动端组件并[官方支持Capacitor](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/introduction#introduction)。

## Material UI

[Material UI](https://mui.com/) 是流行的React组件库，实现了Material Design设计规范。

## 自定义方案

如果您已有现成的UI工具包或希望自行实现，我们建议参考Ionic Framework和其他方案获取灵感。Capacitor提供了一张白纸来绘制梦想，但选择自定义UI意味着您需要负责构建符合用户期待的优质体验。这在应用开发基础上颇具挑战性，因此通常只建议给经验丰富的团队或已经移动优化过的Web应用使用。