---
title: 模拟插件
description: 如何为 Capacitor 插件创建模拟对象
contributors:
  - kensodemann
slug: /guides/mocking-plugins
---

# 模拟 Capacitor 插件

在应用中创建单元测试时，最佳实践是为被测单元的任何外部依赖项创建模拟。这包括您的组件或服务正在使用的 Capacitor 插件。

大多数模拟库通过获取一个对象并将其包装在 JavaScript 代理中来创建模拟，以便可以检查对该对象方法的调用并控制方法的返回值。然而，Capacitor 插件在 JavaScript 层中被实现为代理。创建代理的代理不受支持且会失败。手动模拟可以用来规避此问题。

## 手动模拟

手动模拟允许用户轻松地存根整个 JavaScript 模块的功能。因此，当测试执行 `import { Storage } from '@capacitor/storage'` 时，测试将加载类似下面的内容，而不是加载真正的 `Storage` JavaScript 代理对象：

```TypeScript
export const Storage = {
  async get(data: { key: string }): Promise<{ value: string | undefined }> {
    return { value: undefined };
  },

  async set(data: { key: string; value: string }): Promise<void> {},
  async clear(): Promise<void> {},
};
```

由于这是一个普通的 JavaScript 对象而不是代理对象，因此非常容易进行 spy 操作。同时，由于它是模拟对象，它不会尝试进行任何原生调用。这使得手动模拟成为测试使用 Capacitor 插件的代码时的理想选择。

### Jest

Jest 测试框架内置了<a href="https://jestjs.io/docs/manual-mocks" _target="blank">手动模拟</a>功能。在项目根目录创建一个 `__mocks__/`@capacitor` 文件夹，Jest 将自动从此处加载文件，而不是从 `node_modules` 加载。

例如，假设您有以下目录结构：

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

您的测试将使用 `storage.ts` 和 `toast.ts` 中定义的存根，而不是 `node_modules` 中真正的 `@capacitor/storage` 和 `@capacitor/toast` 插件。

### Jasmine

Jasmine 测试框架不包含"手动模拟"的概念，但我们可以通过使用 TypeScript 路径映射来轻松模拟这一点。

首先，在项目根目录创建与 Jest 示例相同的目录结构。

Angular 项目（使用 Jasmine 作为测试框架的最常见场景）包含一个 `tsconfig.spec.json` 文件，该文件在执行单元测试时扩展了 `tsconfig.json` 基础配置。修改此文件以扩展基础级别中可能存在的任何 `paths` 映射。

例如，如果您的 `tsconfig.json` 文件包含以下 `paths` 映射：

```JSON
    "paths": {
      "@app/*": ["src/app/*"],
      "@env/*": ["src/environments/*"]
    },
```

然后更新您的 `tsconfig.spec.json` 文件以包含这些路径以及您想用于单元测试的任何路径：

```JSON
    "paths": {
      "@app/*": ["src/app/*"],
      "@env/*": ["src/environments/*"],
      "@test/*": ["test/*"],
      "@capacitor/*": ["__mocks__/@capacitor/*"]
    }
```

现在，当编译单元测试时，`import { Storage } from '@capacitor/storage';` 将使用 `__mocks__/@capacitor` 下的存根文件，而不是 `node_modules` 中的真实文件。

**注意：** `paths` 对象是整体替换而不是合并，因此如果您在 `tsconfig.json` 中定义了任何路径，它们_必须_也包含在 `tsconfig.spec.json` 中。

## 模拟存根

有了手动模拟，现在可以编写测试，以所有常见的方式模拟和 spy 方法调用。

### Jest

```TypeScript
  it("获取名字和姓氏", async () => {
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
  it("获取名字和姓氏", async () => {
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
