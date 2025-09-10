---
title: Updating Your Capacitor Android Project
description: 更新 Capacitor Android 项目
contributors:
  - mlynch
  - jcesarmobile
---

# 更新 Capacitor Android 项目

在开发过程中，您可能需要为 Android 应用进行 Capacitor 更新，包括升级项目中使用的 Capacitor 版本，或在 Android 代码库中采用新的 Capacitor 交互方式。

## 更新 Capacitor Android 库

要更新项目中使用的 @capacitor/android 版本，只需运行以下命令安装最新版本：

```bash
npm install @capacitor/android@2
```

然后在 Android Studio 中点击 "Sync Project with Gradle Files" 按钮同步项目。

## 更新 Android 项目结构

如需更新 Android 项目的基础结构，请查看 Capacitor 代码库中的 [android-template](https://github.com/ionic-team/capacitor/tree/2.x/android-template) 项目，选择与最新稳定版 Capacitor 对应的标签。核心项目特意保持简洁：您可以快速比对核心项目与您项目的差异。

### 从 1.0.0 升级到 1.1.0

建议变更：

- 按照 [此提交](https://github.com/ionic-team/capacitor/commit/e27586780baed231c09f2737bb94a9338aab5a03#diff-15c65f143d85c95277307da1bdd0528e) 更新 `android` 文件夹内的 `.gitignore` 文件

### 从 ≤1.3.0 升级到 1.4.0

建议变更：

- 按照 [此变更](https://github.com/ionic-team/capacitor/commit/ed6647b35a8da08d26a7ff13cc9f4fd918b923a0#diff-15c65f143d85c95277307da1bdd0528e) 更新 `android/app/src/main/res/values/` 文件夹内的 `strings.xml` 文件

### 从 ≤1.5.1 升级到 2.0.0

必须变更：

- 使用 Android X

  Capacitor 2.0 遵循 Google 建议，使用 Android X 作为 Android 支持库依赖，因此原生项目也需要更新至 Android X。

  在 Android Studio 中选择 `Refactor -> Migrate to AndroidX`，点击 `Migrate` 按钮，最后点击 `Do Refactor` 完成迁移。

  如果项目中使用尚未支持 Android X 的 Cordova 或 Capacitor 插件，可以使用 [jetifier](https://www.npmjs.com/package/jetifier) 工具进行适配：

```bash
npm install -D jetifier
npx jetifier
```

如需在每次安装依赖包后自动运行 jetifier，可在 `package.json` 文件的 "scripts" 部分添加 `"postinstall": "jetifier"`。

建议变更：

- 创建公共变量

  创建 `android/variables.gradle` 文件并添加以下内容：

  ```
  ext {
    minSdkVersion = 21
    compileSdkVersion = 29
    targetSdkVersion = 29
    androidxAppCompatVersion = '1.1.0'
    androidxCoreVersion =  '1.2.0'
    androidxMaterialVersion =  '1.1.0-rc02'
    androidxBrowserVersion =  '1.2.0'
    androidxLocalbroadcastmanagerVersion =  '1.0.0'
    firebaseMessagingVersion =  '20.1.2'
    playServicesLocationVersion =  '17.0.0'
    junitVersion =  '4.12'
    androidxJunitVersion =  '1.1.1'
    androidxEspressoCoreVersion =  '3.2.0'
    cordovaAndroidVersion =  '7.0.0'
  }
  ```

  在 `android/build.gradle` 文件中添加 `apply from: "variables.gradle"`，如 [此处示例](https://github.com/ionic-team/capacitor/blob/2.x/android-template/build.gradle#L18)。

- 使用公共变量

  如果已创建 `variables.gradle` 文件，请按以下方式更新项目配置。在 `android/app/build.gradle` 文件中修改：

  - `compileSdkVersion 28` 改为 `compileSdkVersion rootProject.ext.compileSdkVersion`
  - `minSdkVersion 21` 改为 `minSdkVersion rootProject.ext.minSdkVersion`
  - `targetSdkVersion 28` 改为 `targetSdkVersion rootProject.ext.targetSdkVersion`
  - `implementation 'androidx.appcompat:appcompat:1.0.0'` 改为 `implementation "androidx.appcompat:appcompat:$androidxAppCompatVersion"`
  - `testImplementation 'junit:junit:4.12'` 改为 `testImplementation "junit:junit:$junitVersion"`
  - `androidTestImplementation 'androidx.test.ext:junit:1.1.1'` 改为 `androidTestImplementation "androidx.test.ext:junit:$androidxJunitVersion"`
  - `androidTestImplementation 'androidx.test.espresso:espresso-core:3.1.0'` 改为 `androidTestImplementation "androidx.test.espresso:espresso-core:$androidxEspressoCoreVersion"`

  注意现在需要使用双引号而非单引号，这是变量替换的必要条件。

- 推荐更新 Android Studio 插件

  在 Android Studio 中打开项目时，会出现 `Plugin Update Recommended` 提示。点击 `update`，系统会提示更新 Gradle 插件和 Gradle。点击 `Update` 按钮即可。

  您也可以手动更新 Gradle 插件和 Gradle：

  - 手动更新 Gradle 插件：编辑 `android/build.gradle` 文件，将 `classpath 'com.android.tools.build:gradle:3.3.2'` 改为 `classpath 'com.android.tools.build:gradle:3.6.1'`
  - 手动更新 Gradle：编辑 `android/gradle/wrapper/gradle-wrapper.properties`，将 `gradle-4.10.1-all.zip` 改为 `gradle-5.6.4-all.zip`

- 更新 Google Services 插件

  在 `android/build.gradle` 文件中，将 `classpath 'com.google.gms:google-services:4.2.0'` 改为 `classpath 'com.google.gms:google-services:4.3.3'`

- 修改 configChanges 避免应用重启

  在 `android/app/src/main/AndroidManifest.xml` 文件中，为 activity 的 `android:configChanges` 属性添加 `|smallestScreenSize|screenLayout|uiMode`

- 添加缓存目录到 FileProvider 文件路径

  为避免编辑相册图片时的权限错误，在 `android/app/src/main/res/xml/file_paths.xml` 中添加 `<cache-path name="my_cache_images" path="." />`

更多 API 变更详情，请查看 [发布说明](https://github.com/ionic-team/capacitor/releases/tag/2.0.0)。