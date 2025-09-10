---
title: Mocking Plugins
description: 如何为 Capacitor 插件创建模拟对象
contributors:
  - kensodemann
slug: /guides/mocking-plugins
---

# 模拟 Capacitor 插件

在应用程序中编写单元测试时，最佳实践是为被测单元的所有外部依赖创建模拟对象。这包括组件或服务正在使用的 Capacitor 插件。

大多数模拟库通过将对象包装在 JavaScript 代理中来创建模拟，这样可以检查对该对象方法的调用并控制方法的返回值。然而，Capacitor 插件在 JavaScript 层本身就是作为代理实现的。不支持（也无法）为代理再创建代理。此时可以使用手动模拟来规避这个问题。

## 手动模拟

手动模拟允许用户轻松地存根整个 JavaScript 模块的功能。因此，当测试代码执行 `import { Storage } from '@capacitor/storage'` 时，加载的将不是真正的 `Storage` JavaScript 代理对象，而是类似这样的模拟对象：

```TypeScript
export const Storage = {
  async get(data: { key: string }): Promise<{ value: string | undefined }> {
    return { value: undefined };
  },

  async set(data: { key: string; value: string }): Promise<void> {},
  async clear(): Promise<void> {},
};
```

由于这是一个普通的 JavaScript 对象而非代理对象，很容易进行监视。同时，作为模拟对象它不会尝试进行任何原生调用。这使得手动模拟成为测试使用 Capacitor 插件代码的理想选择。

### Jest

Jest 测试框架内置了<a href="https://jestjs.io/docs/manual-mocks" _target="blank">手动模拟</a>功能。在项目根目录创建 `__mocks__/@capacitor` 文件夹，Jest 会自动从此处而非 `node_modules` 加载文件。

例如，假设有以下目录结构：

```
.
|
+- __mocks__
| |
| +- @capacitor
|   |
|   +- storage.ts
|   +- toast.ts
...
+- src
```

测试将使用 `storage.ts` 和 `toast.ts` 中定义的存根，而非 `node_modules` 中真实的 `@capacitor/storage` 和 `@capacitor/toast` 插件。

### Jasmine

Jasmine 测试框架没有内置"手动模拟"概念，但我们可以通过 TypeScript 路径映射轻松模拟这一功能。

首先，像 Jest 示例一样在项目根层级创建相同的目录结构。

Angular 项目（使用 Jasmine 作为测试框架的最常见场景）在运行单元测试时会使用继承自 `tsconfig.json` 基础配置的 `tsconfig.spec.json` 文件。修改此文件以扩展基础层级的任何 `paths` 映射。

例如，如果 `tsconfig.json` 文件包含以下 `paths` 映射：

```JSON
    "paths": {
      "@app/*": ["src/app/*"],
      "@env/*": ["src/environments/*"]
    },
```

则更新 `tsconfig.spec.json` 文件包含这些路径以及单元测试所需的其他路径：

```JSON
    "paths": {
      "@app/*": ["src/app/*"],
      "@env/*": ["src/environments/*"],
      "@test/*": ["test/*"],
      "@capacitor/*": ["__mocks__/@capacitor/*"]
    }
```

现在当单元测试编译时，`import { Storage } from '@capacitor/storage';` 语句将使用 `__mocks__/@capacitor` 下的存根文件而非 `node_modules` 中的真实文件。

**注意**：`paths` 对象会被完全替换而非合并，因此若 `tsconfig.json` 中定义了任何路径，它们必须也包含在 `tsconfig.spec.json` 中。

## 模拟存根

有了手动模拟后，现在可以按常规方式编写测试来模拟和监视方法调用。

### Jest

```TypeScript
  it("获取名和姓", async () => {
    Storage.get = jest.fn().mockImplementation(
      async (data: { key: string }): Promise<{ value: string }> => {
        return data.key === "firstName"
          ? { value: "Jimmy" }
          : data.key === "lastName"
          ? { value: "Simms" }
          : { value: "unknown" };
      }
    );
    const w = mount(Home);
    await flushPromises();
    expect(w.vm.firstName).toEqual("Jimmy");
    expect(w.vm.lastName).toEqual("Simms");
  });

  it("清除存储", () => {
    const button = wrapper.findComponent('[data-testid="clear"]');
    Storage.clear = jest.fn().mockResolvedValue(undefined);
    button.trigger("click");
    expect(Storage.clear).toHaveBeenCalledTimes(1);
  });
```

### Jasmine

```TypeScript
  it("获取名和姓", async () => {
    spyOn(Storage, 'get');
    (Storage.get as any)
      .withArgs({ key: 'firstName' })
      .and.returnValue(Promise.resolve({ value: 'Jason' }));
    (Storage.get as any)
      .withArgs({ key: 'lastName' })
      .and.returnValue(Promise.resolve({ value: 'Jones' }));

    fixture.detectChanges();
    await fixture.whenRenderingDone();

    expect(component.firstName).toEqual('Jason');
    expect(component.lastName).toEqual('Jones');
  });

  it('清除存储', () => {
    spyOn(Storage, 'clear');
    click(clear.nativeElement);
    fixture.detectChanges();
    expect(Storage.clear).toHaveBeenCalledTimes(1);
  });
```

## 示例

- [在 Jasmine 中模拟 Capacitor 插件](https://github.com/ionic-team/cap-plugin-mock-jasmine)
- [在 Jest 中模拟 Capacitor 插件](https://github.com/ionic-team/cap-plugin-mock-jest)