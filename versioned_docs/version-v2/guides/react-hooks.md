---
title: React Hooks for Capacitor
description: 使用这些 React Hooks 简化 Capacitor 原生移动 API 的访问
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/react-hooks
---

# React Hooks for Capacitor

在 Capacitor 应用中使用 React 的开发者，可以利用一系列由社区维护的实用 React Hooks，在 React 函数组件中轻松访问 Capacitor API。

安装 Hooks：

```shell
npm install @capacitor-community/react-hooks
```

使用 Hooks 时，在函数组件中导入并使用：

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

## 更多阅读

查看 [@capacitor-community/react-hooks](https://github.com/capacitor-community/react-hooks) 仓库，了解所有可用 Hooks 的文档。