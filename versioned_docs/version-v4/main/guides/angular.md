---
title: Angular
description: 将 Angular 与 Capacitor 一起使用
slug: /guides/angular
---

# 将 Angular 与 Capacitor 一起使用

## NgZone

Capacitor 插件事件监听器在 Angular 的 `NgZone` 执行上下文之外运行。将处理逻辑包含在 `NgZone.run` 块内，以确保触发 Angular 的变更检测：

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
