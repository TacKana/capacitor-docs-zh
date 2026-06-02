---
title: Angular
description: 在 Capacitor 中使用 Angular
slug: /guides/angular
---

# 在 Capacitor 中使用 Angular

## NgZone

Capacitor 插件的事件监听器在 Angular 的 `NgZone` 执行上下文之外运行。请将处理逻辑包含在 `NgZone.run` 块中，以确保 Angular 的变更检测被触发：

```typescript
constructor(private ngZone: NgZone) { }

async ngOnInit() {
  Network.addListener("networkStatusChange", (status) => {
    this.ngZone.run(() => {
      // 此代码将在 Angular 的执行上下文中运行
      this.networkStatus = status.connected ? "Online" : "Offline";
    });
  });
}
```
