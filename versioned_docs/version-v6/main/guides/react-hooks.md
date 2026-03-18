---
title: React Hooks
description: 使用这些 React hooks 来简化 Capacitor 原生移动 API 的访问
contributors:
  - mlynch
slug: /guides/react-hooks
---

# Capacitor 的 React Hooks

在 Capacitor 应用中使用 React 的开发者，可以利用一套由社区维护的实用 React Hooks，来在其 React 函数组件中访问 Capacitor API。

安装这些 hooks：

```shell
npm install @capacitor-community/react-hooks
```

要使用这些 hooks，请在函数组件中导入并使用：

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

## 扩展阅读

查看 [@capacitor-community/react-hooks](https://github.com/capacitor-community/react-hooks) 仓库，获取所有可用 hooks 的文档。