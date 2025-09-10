---
title: React Hooks
description: 使用这些 React Hooks 简化 Capacitor 原生移动 API 的访问
contributors:
  - mlynch
slug: /guides/react-hooks
---

# Capacitor 专属 React Hooks

在 Capacitor 应用中使用 React 的开发者可以获取一系列由社区维护的实用 React Hooks，以便在函数组件中便捷地调用 Capacitor API。

安装这些 hooks：

```shell
npm install @capacitor-community/react-hooks
```

使用方法：在函数组件中导入并调用 hooks：

```typescript
import { useFilesystem, base64FromPath, availableFeatures } from '@capacitor-community/react-hooks/filesystem';

const MyComponent = () => (
  const { readFile } = useFilesystem();

  useEffect(() => {
    const readMyFile = async () => {
      const file = await readFile({
        path: filepath,
        directory: FilesystemDirectory.Data
      });
      // ...
    }

    readMyFile();
  }, [ readFile ]);
```

## 延伸阅读

查看 [@capacitor-community/react-hooks](https://github.com/capacitor-community/react-hooks) 仓库获取所有可用 hooks 的完整文档。