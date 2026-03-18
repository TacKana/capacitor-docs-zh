---
title: Google Maps Capacitor Plugin API
description: 在 Capacitor 中使用 Google 地图
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/src/definitions.ts
sidebar_label: Google Maps
---

# @capacitor/google-maps

在 Capacitor 中使用 Google 地图

## 安装

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API 密钥

要在任何平台上使用 Google Maps SDK，都需要关联到**已启用计费功能**的账户的 API 密钥。您可以从 [Google Cloud Console](https://console.cloud.google.com) 获取这些密钥。这对于所有三个平台（Android、iOS 和 Javascript）都是必需的。有关获取这些 API 密钥的更多信息，可以在每个平台的 [Google Maps 文档](https://developers.google.com/maps/documentation/android-sdk/overview) 中找到。

## iOS

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户的当前位置。要使用此功能，Apple 要求在 `Info.plist` 中指定隐私描述：

- `NSLocationAlwaysUsageDescription` (`隐私 - 始终使用位置说明`)
- `NSLocationWhenInUseUsageDescription` (`隐私 - 使用期间使用位置说明`)

有关在 Xcode 中设置 iOS 权限的更多信息，请阅读 [iOS 指南](https://capacitorjs.com/docs/v3/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/v3/ios/configuration#configuring-infoplist)。

> 目前，Google Maps SDK 不支持在使用新款基于 M1 的 Macbook 的模拟器上运行。这是一个 [已知且已确认的问题](https://developers.google.com/maps/faq#arm-based-macs)，需要 Google 方面进行修复。如果您是在 M1 Macbook 上进行开发，仍然支持在物理设备上构建和运行，这也是推荐的方法。

## Android

适用于 Android 的 Google Maps SDK 要求您将 API 密钥添加到项目中的 AndroidManifest.xml 文件。

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

要使用某些定位功能，SDK 还要求将以下权限添加到您的 AndroidManifest.xml：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

## 使用说明

Google Maps Capacitor 插件附带了一个 Web 组件，必须在您的应用程序中使用它来渲染地图，因为它使我们能够在 iOS 上更有效地嵌入原生视图。该插件将自动注册此 Web 组件以供您的应用程序使用。

> 对于 Angular 用户，您会收到一个错误警告，提示 Angular 编译器不认识此 Web 组件。这可以通过修改声明组件的模块以允许自定义 Web 组件来解决。
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

在您的 HTML 中包含此组件，并为其分配一个 ID，以便稍后可以轻松查询该元素引用。

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> 在 Android 上，地图渲染在整个 WebView 的下方，并使用此组件在滚动事件期间管理其定位。这意味着作为开发者，您**必须**确保 WebView 从上到下所有层都是透明的。在典型的 Ionic 应用程序中，这意味着在诸如 IonContent 和根 HTML 标签等元素上设置透明度，以确保可以看到地图。如果您在 Android 上看不到地图，这应该是您检查的第一件事。
>
> 在 iOS 上，我们直接将地图渲染到 WebView 中，因此不需要相同的透明效果。我们仍在研究 Android 的替代方法，并希望在未来更新中更好地解决此问题。

Google 地图元素本身没有样式，因此您应该为其设置样式以适合页面的布局结构。因为我们正在向这个插槽渲染一个视图，所以元素本身没有宽度或高度，因此请务必显式设置这些值。

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

接下来，我们应该创建地图引用。这是通过从 Capacitor 插件导入 GoogleMap 类并调用 create 方法，并传入所需的参数来完成的。

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // 此地图实例的唯一标识符
  element: mapRef, // 对 capacitor-google-map 元素的引用
  apiKey: apiKey, // 您的 Google Maps API 密钥
  config: {
    center: {
      // 地图渲染的初始位置
      lat: 33.6,
      lng: -117.9,
    },
    zoom: 8, // 地图渲染的初始缩放级别
  },
});
```

至此，您的地图应该已在您的应用程序中创建。使用返回的地图引用，您可以以多种方式轻松地与地图交互，这里展示了其中的一些。

```typescript
const newMap = await GoogleMap.create({...});

// 向地图添加标记
const markerId = await newMap.addMarker({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// 以编程方式移动地图
await newMap.setCamera({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// 启用标记聚类
await newMap.enableClustering();

// 处理标记点击事件
await newMap.setOnMarkerClickListener((event) => {...});

// 清理地图引用
await newMap.destroy();
```

## 完整示例

### Angular

```typescript
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  template: `
    <capacitor-google-maps #map></capacitor-google-maps>
    <button (click)="createMap()">创建地图</button>
  `,
  styles: [
    `
      capacitor-google-maps {
        display: inline-block;
        width: 275px;
        height: 400px;
      }
    `,
  ],
})
export class MyMap {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }
}
```

### React

```jsx
import { GoogleMap } from '@capacitor/google-maps';
import { useRef } from 'react';

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  let newMap: GoogleMap;

  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef.current,
      apiKey: process.env.REACT_APP_YOUR_API_KEY_HERE,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 8
      }
    })
  }

  return (
    <div className="component-wrapper">
      <capacitor-google-map ref={mapRef} style={{
        display: 'inline-block',
        width: 275,
        height: 400
      }}></capacitor-google-map>

      <button onClick={createMap}>创建地图</button>
    </div>
  )
}

export default MyMap;
```### JavaScript

```html
<capacitor-google-map id="map"></capacitor-google-map>
<button onclick="createMap()">创建地图</button>

<style>
  capacitor-google-map {
    display: inline-block;
    width: 275px;
    height: 400px;
  }
</style>

<script>
  import { GoogleMap } from '@capacitor/google-maps';

  const createMap = async () => {
    const mapRef = document.getElementById('map');

    const newMap = await GoogleMap.create({
      id: 'my-map', // 此地图实例的唯一标识符
      element: mapRef, // 对 capacitor-google-map 元素的引用
      apiKey: 'YOUR_API_KEY_HERE', // 你的 Google Maps API 密钥
      config: {
        center: {
          // 地图初始渲染的中心位置
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // 地图初始渲染的缩放级别
      },
    });
  };
</script>
```

## API

<docgen-index>

* [`create(...)`](#create)
* [`enableClustering()`](#enableclustering)
* [`disableClustering()`](#disableclustering)
* [`addMarker(...)`](#addmarker)
* [`addMarkers(...)`](#addmarkers)
* [`removeMarker(...)`](#removemarker)
* [`removeMarkers(...)`](#removemarkers)
* [`destroy()`](#destroy)
* [`setCamera(...)`](#setcamera)
* [`setMapType(...)`](#setmaptype)
* [`enableIndoorMaps(...)`](#enableindoormaps)
* [`enableTrafficLayer(...)`](#enabletrafficlayer)
* [`enableAccessibilityElements(...)`](#enableaccessibilityelements)
* [`enableCurrentLocation(...)`](#enablecurrentlocation)
* [`setPadding(...)`](#setpadding)
* [`setOnBoundsChangedListener(...)`](#setonboundschangedlistener)
* [`setOnCameraIdleListener(...)`](#setoncameraidlelistener)
* [`setOnCameraMoveStartedListener(...)`](#setoncameramovestartedlistener)
* [`setOnClusterClickListener(...)`](#setonclusterclicklistener)
* [`setOnClusterInfoWindowClickListener(...)`](#setonclusterinfowindowclicklistener)
* [`setOnInfoWindowClickListener(...)`](#setoninfowindowclicklistener)
* [`setOnMapClickListener(...)`](#setonmapclicklistener)
* [`setOnMarkerClickListener(...)`](#setonmarkerclicklistener)
* [`setOnMyLocationButtonClickListener(...)`](#setonmylocationbuttonclicklistener)
* [`setOnMyLocationClickListener(...)`](#setonmylocationclicklistener)
* [接口](#interfaces)
* [类型别名](#type-aliases)
* [枚举](#enums)

</docgen-index>

<docgen-api>


### create(...)

```typescript
create(options: CreateMapArgs, callback?: MapListenerCallback<MapReadyCallbackData> | undefined) => Promise<GoogleMap>
```

| 参数           | 类型                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#createmapargs">CreateMapArgs</a></code>                                                                             |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapreadycallbackdata">MapReadyCallbackData</a>&gt;</code> |

**返回值:** <code>Promise&lt;GoogleMap&gt;</code>

--------------------


### enableClustering()

```typescript
enableClustering() => Promise<void>
```

--------------------


### disableClustering()

```typescript
disableClustering() => Promise<void>
```

--------------------


### addMarker(...)

```typescript
addMarker(marker: Marker) => Promise<string>
```

| 参数          | 类型                                      |
| ------------ | ----------------------------------------- |
| **`marker`** | <code><a href="#marker">Marker</a></code> |

**返回值:** <code>Promise&lt;string&gt;</code>

--------------------


### addMarkers(...)

```typescript
addMarkers(markers: Marker[]) => Promise<string[]>
```

| 参数           | 类型                  |
| ------------- | --------------------- |
| **`markers`** | <code>Marker[]</code> |

**返回值:** <code>Promise&lt;string[]&gt;</code>

--------------------


### removeMarker(...)

```typescript
removeMarker(id: string) => Promise<void>
```

| 参数     | 类型                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

--------------------


### removeMarkers(...)

```typescript
removeMarkers(ids: string[]) => Promise<void>
```

| 参数      | 类型                  |
| --------- | --------------------- |
| **`ids`** | <code>string[]</code> |

--------------------


### destroy()

```typescript
destroy() => Promise<void>
```

--------------------


### setCamera(...)

```typescript
setCamera(config: CameraConfig) => Promise<void>
```

| 参数          | 类型                                                  |
| ------------ | ----------------------------------------------------- |
| **`config`** | <code><a href="#cameraconfig">CameraConfig</a></code> |

--------------------


### setMapType(...)

```typescript
setMapType(mapType: MapType) => Promise<void>
```

| 参数           | 类型                                        |
| ------------- | ------------------------------------------- |
| **`mapType`** | <code><a href="#maptype">MapType</a></code> |

--------------------


### enableIndoorMaps(...)

```typescript
enableIndoorMaps(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### enableTrafficLayer(...)

```typescript
enableTrafficLayer(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### enableAccessibilityElements(...)

```typescript
enableAccessibilityElements(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### enableCurrentLocation(...)

```typescript
enableCurrentLocation(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| ------------- | -------------------- |
| **`enabled`** | <code>boolean</code> |

--------------------


### setPadding(...)

```typescript
setPadding(padding: MapPadding) => Promise<void>
```

| 参数           | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`padding`** | <code><a href="#mappadding">MapPadding</a></code> |

--------------------


### setOnBoundsChangedListener(...)

```typescript
setOnBoundsChangedListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数           | 类型                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------### setOnCameraIdleListener(...)

```typescript
setOnCameraIdleListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraMoveStartedListener(...)

```typescript
setOnCameraMoveStartedListener(callback?: MapListenerCallback<CameraMoveStartedCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameramovestartedcallbackdata">CameraMoveStartedCallbackData</a>&gt;</code> |

--------------------


### setOnClusterClickListener(...)

```typescript
setOnClusterClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnClusterInfoWindowClickListener(...)

```typescript
setOnClusterInfoWindowClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnInfoWindowClickListener(...)

```typescript
setOnInfoWindowClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMapClickListener(...)

```typescript
setOnMapClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerClickListener(...)

```typescript
setOnMarkerClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationButtonClickListener(...)

```typescript
setOnMyLocationButtonClickListener(callback?: MapListenerCallback<MyLocationButtonClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mylocationbuttonclickcallbackdata">MyLocationButtonClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationClickListener(...)

```typescript
setOnMyLocationClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数             | 类型                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**   | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### 接口#### CreateMapArgs

用于创建地图时包含选项的接口。

| 属性               | 类型                                                        | 描述                                                                                         | 默认值               |
| ------------------ | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------- |
| **`id`**           | <code>string</code>                                         | 地图实例的唯一标识符。                                                                       |                      |
| **`apiKey`**       | <code>string</code>                                         | Google Maps SDK API 密钥。                                                                   |                      |
| **`config`**       | <code><a href="#googlemapconfig">GoogleMapConfig</a></code> | 地图的初始配置设置。                                                                         |                      |
| **`element`**      | <code>HTMLElement</code>                                    | Google Map 视图将挂载的 DOM 元素，用于确定其尺寸和位置。                                      |                      |
| **`forceCreate`**  | <code>boolean</code>                                        | 如果已存在使用所提供 id 的地图实例，则销毁并重新创建该实例。                                 | <code>false</code>   |


#### GoogleMapConfig

| 属性                   | 类型                                      | 描述                                                     | 默认值               |
| ---------------------- | ----------------------------------------- | -------------------------------------------------------- | -------------------- |
| **`width`**            | <code>number</code>                       | 覆盖原生地图的宽度。                                     |                      |
| **`height`**           | <code>number</code>                       | 覆盖原生地图的高度。                                     |                      |
| **`x`**                | <code>number</code>                       | 覆盖原生地图的绝对 x 坐标位置。                          |                      |
| **`y`**                | <code>number</code>                       | 覆盖原生地图的绝对 y 坐标位置。                          |                      |
| **`center`**           | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球上的默认位置。                             |                      |
| **`zoom`**             | <code>number</code>                       | 设置地图的缩放级别。                                     |                      |
| **`androidLiteMode`**  | <code>boolean</code>                      | 在 Android 上启用基于图像的轻量模式。                    | <code>false</code>   |
| **`devicePixelRatio`** | <code>number</code>                       | 覆盖原生地图的像素比率。                                 |                      |


#### LatLng

表示一对纬度和经度坐标的接口。

| 属性       | 类型                | 描述                                                               |
| ---------- | ------------------- | ------------------------------------------------------------------ |
| **`lat`**  | <code>number</code> | 坐标纬度，以度为单位。该值在范围 [-90, 90] 内。                    |
| **`lng`**  | <code>number</code> | 坐标经度，以度为单位。该值在范围 [-180, 180] 内。                  |


#### MapReadyCallbackData

| 属性         | 类型                |
| ------------ | ------------------- |
| **`mapId`**  | <code>string</code> |


#### Marker

标记是放置在地图表面特定点处的图标。

| 属性               | 类型                                      | 描述                                                                                                             | 默认值               |
| ------------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------- |
| **`coordinate`**   | <code><a href="#latlng">LatLng</a></code> | <a href="#marker">Marker</a> 位置                                                                                |                      |
| **`opacity`**      | <code>number</code>                       | 设置标记的不透明度，介于 0（完全透明）和 1 之间（包含）。                                                         | <code>1</code>       |
| **`title`**        | <code>string</code>                       | 标题，即覆盖层的简短描述。                                                                                       |                      |
| **`snippet`**      | <code>string</code>                       | 摘要文本，当选中时显示在信息窗口中的标题下方。                                                                   |                      |
| **`isFlat`**       | <code>boolean</code>                      | 控制此标记是否应平贴于地球表面，或者作为面向相机的广告牌。                                                         | <code>false</code>   |
| **`iconUrl`**      | <code>string</code>                       | 要渲染的 <a href="#marker">Marker</a> 图标。                                                                     |                      |
| **`draggable`**    | <code>boolean</code>                      | 控制此标记是否可以通过交互方式拖动。                                                                              | <code>false</code>   |


#### CameraConfig

Google 地图相机的配置属性。

| 属性                    | 类型                                      | 描述                                                                                                            | 默认值               |
| ----------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------- |
| **`coordinate`**        | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球上的位置。                                                                                        |                      |
| **`zoom`**              | <code>number</code>                       | 设置地图的缩放级别。                                                                                            |                      |
| **`bearing`**           | <code>number</code>                       | 相机的方位角，以度为单位，从正北方向顺时针测量。                                                                | <code>0</code>       |
| **`angle`**             | <code>number</code>                       | 相机与天底（直接面向地球）的角度，以度为单位。唯一允许的值是 0 和 45。                                           | <code>0</code>       |
| **`animate`**           | <code>boolean</code>                      | 是否以动画方式过渡到新的相机属性。                                                                              | <code>false</code>   |
| **`animationDuration`** | <code>number</code>                       | 动画持续时间（毫秒）。                                                                                          |                      |#### MapPadding

控制视图"可见"区域的内边距设置。

| 属性            | 类型                     |
| --------------- | ------------------------ |
| **`top`**       | <code>number</code>      |
| **`left`**      | <code>number</code>      |
| **`right`**     | <code>number</code>      |
| **`bottom`**    | <code>number</code>      |


#### CameraIdleCallbackData

| 属性              | 类型                                                 |
| ----------------- | ---------------------------------------------------- |
| **`mapId`**       | <code>string</code>                                  |
| **`bounds`**      | <code><a href="#latlngbounds">LatLngBounds</a></code> |
| **`bearing`**     | <code>number</code>                                  |
| **`latitude`**    | <code>number</code>                                  |
| **`longitude`**   | <code>number</code>                                  |
| **`tilt`**        | <code>number</code>                                  |
| **`zoom`**        | <code>number</code>                                  |


#### LatLngBounds

表示视口经纬度边界的接口。

| 属性              | 类型                                     |
| ----------------- | ---------------------------------------- |
| **`southwest`**   | <code><a href="#latlng">LatLng</a></code> |
| **`center`**      | <code><a href="#latlng">LatLng</a></code> |
| **`northeast`**   | <code><a href="#latlng">LatLng</a></code> |


#### CameraMoveStartedCallbackData

| 属性              | 类型                  |
| ----------------- | --------------------- |
| **`mapId`**       | <code>string</code>   |
| **`isGesture`**   | <code>boolean</code>  |


#### ClusterClickCallbackData

| 属性              | 类型                              |
| ----------------- | --------------------------------- |
| **`mapId`**       | <code>string</code>               |
| **`latitude`**    | <code>number</code>               |
| **`longitude`**   | <code>number</code>               |
| **`size`**        | <code>number</code>               |
| **`items`**       | <code>MarkerCallbackData[]</code> |


#### MarkerCallbackData

| 属性              | 类型                  |
| ----------------- | --------------------- |
| **`markerId`**    | <code>string</code>   |
| **`latitude`**    | <code>number</code>   |
| **`longitude`**   | <code>number</code>   |
| **`title`**       | <code>string</code>   |
| **`snippet`**     | <code>string</code>   |


#### MarkerClickCallbackData

| 属性          | 类型                  |
| ------------- | --------------------- |
| **`mapId`**   | <code>string</code>   |


#### MapClickCallbackData

| 属性              | 类型                  |
| ----------------- | --------------------- |
| **`mapId`**       | <code>string</code>   |
| **`latitude`**    | <code>number</code>   |
| **`longitude`**   | <code>number</code>   |


#### MyLocationButtonClickCallbackData

| 属性          | 类型                  |
| ------------- | --------------------- |
| **`mapId`**   | <code>string</code>   |


### 类型别名


#### MapListenerCallback

地图事件触发时调用的回调函数。

<code>(data: T): void</code>


### 枚举


#### MapType

| 成员              | 值                         | 描述                           |
| ----------------- | -------------------------- | ------------------------------ |
| **`Normal`**      | <code>'Normal'</code>      | 基础地图。                     |
| **`Hybrid`**      | <code>'Hybrid'</code>      | 带有道路和标签的卫星影像。     |
| **`Satellite`**   | <code>'Satellite'</code>   | 无标签的卫星影像。             |
| **`Terrain`**     | <code>'Terrain'</code>     | 地形数据。                     |
| **`None`**        | <code>'None'</code>        | 无底图瓦片。                   |

</docgen-api>