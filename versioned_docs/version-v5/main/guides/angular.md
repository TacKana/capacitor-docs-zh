---
title: Angular
description: 在 Capacitor 中使用 Angular
slug: /guides/angular
---

# 在 Capacitor 中使用 Angular

## NgZone

Capacitor 插件的事件监听器在 Angular 的 `NgZone` 执行上下文之外运行。请在 `NgZone.run` 代码块内封装处理逻辑，以确保触发 Angular 的变更检测：

```typescript
constructor(private ngZone: NgZone) { }

async ngOnInit() {
  Network.addListener("networkStatusChange", (status) => {
    this.ngZone.run(() => {
      // 此代码将在 Angular 的执行上下文中运行
      this.networkStatus = status.connected ? "在线" : "离线";
    });
  });
}
```