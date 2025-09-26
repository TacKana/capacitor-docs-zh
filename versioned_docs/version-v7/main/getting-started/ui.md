---
title: 构建应用界面
description: 为打造出色的Capacitor移动应用提供的热门UI解决方案
slug: /getting-started/ui
---

# 构建应用界面

Capacitor应用本质上是Web应用。但要打造媲美原生体验的移动应用，仅靠简单封装网站是远远不够的。

如今，开发团队有多种应用UI方案可选。让我们探讨几种最流行的选择。

## Ionic框架

[Ionic Framework](https://ionicframework.com/) 是一套面向移动端的UI工具集，能让使用Capacitor的Web开发者获得遵循各平台设计规范的原生级应用体验。该框架由Capacitor的同一开发团队打造，专门为Capacitor量身定制。

目前，Ionic框架是我们推荐的Capacitor UI框架，因为它能帮助团队实现最高质量的原生应用体验。但请注意，在Capacitor应用中_并非必须_使用它。

Ionic框架为[Angular](https://ionicframework.com/docs/angular/navigation)、[React](https://ionicframework.com/docs/react/navigation)和[Vue](https://ionicframework.com/docs/vue/navigation)提供原生级过渡动画和路由方案，并与各主流框架的路由解决方案深度集成。此外还包含强大组件如[模态框](https://ionicframework.com/docs/api/modal)、[菜单](https://ionicframework.com/docs/api/menu)、[列表](https://ionicframework.com/docs/api/list)，以及特色功能如[滑动项](https://ionicframework.com/docs/api/item-sliding)、[表单输入](https://ionicframework.com/docs/api/input)、[日期时间选择器](https://ionicframework.com/docs/api/datetime)、[卡片](https://ionicframework.com/docs/api/card)、[标签页](https://ionicframework.com/docs/api/tabs)、[iOS风格紧凑标题栏](https://ionicframework.com/docs/api/header#condensed-header)等[丰富组件](https://ionicframework.com/docs/components)。

Ionic框架需要配合Angular、React或Vue使用，因此仅适合采用这些技术的团队。

入门指南请参阅[在Ionic中使用Capacitor](./with-ionic)文档。

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) 是热门的CSS框架，配有配套UI模板库，许多Capacitor开发者用它构建优质应用体验。我们喜爱的案例包括[Reflect](https://reflect.app/)和[LogSnag](https://twitter.com/ImSh4yy/status/1615080429417103366?s=20&t=bmVrAb9PNFY6AQPNXwMFYA)。

还有一些专注于移动端的Tailwind UI框架，例如[Konsta UI](https://konstaui.com/)。

使用Tailwind时需注意，它不提供移动端风格的导航和路由基础组件，团队需要自行构建符合平台规范的UX。一个解决方案是将Tailwind与Ionic框架混合使用，如这个[Next.js + Tailwind + Ionic + Capacitor模板](https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter)所示。另一种方案是设计不使用传统前进/后退导航，转而采用标签页或模态框的UX。当然，团队也可以完全自定义导航路由体验。

## Framework7

[Framework7](https://framework7.io/) 是由知名移动端触摸滑动库[Swiper](https://swiperjs.com/)开发者打造的移动端UI库。

## Quasar

[Quasar](https://quasar.dev/) 是Vue.js框架，提供移动端组件并[官方支持Capacitor](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/introduction#introduction)。

## Material UI

[Material UI](https://mui.com/) 是流行的React组件库，实现Material Design设计规范。

## 自定义方案

如果已有现成UI套件或希望自建方案，建议参考Ionic框架等现有方案获取灵感。Capacitor提供自由创作空间，但选择自定义UI意味着需要自行打造符合用户期待的体验。这对多数团队颇具挑战，通常仅建议经验丰富的团队或已做好移动优化的Web应用采用。