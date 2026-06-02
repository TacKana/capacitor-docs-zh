---
title: Google Maps - Capacitor 插件 API
description: Capacitor 上的 Google 地图
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/src/definitions.ts
sidebar_label: Google Maps
---

# @capacitor/google-maps

Capacitor 上的 Google 地图。

## 安装

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API 密钥

要在任何平台上使用 Google Maps SDK，需要与一个 _已启用计费_ 的账户关联的 API 密钥。这些可以从 [Google Cloud Console](https://console.cloud.google.com) 获取。Android、iOS 和 JavaScript 三个平台都需要此密钥。有关获取这些 API 密钥的更多信息，可以在每个平台的 [Google Maps 文档](https://developers.google.com/maps/documentation/android-sdk/overview) 中找到。

## iOS

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户的当前位置。要使用此功能，Apple 需要在 `Info.plist` 中指定隐私描述：

- `NSLocationAlwaysUsageDescription`（`Privacy - Location Always Usage Description`）
- `NSLocationWhenInUseUsageDescription`（`Privacy - Location When In Use Usage Description`）

阅读 [iOS 指南](https://capacitorjs.com/docs/v3/ios/configuration#configuring-infoplist) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/v3/ios/configuration#configuring-infoplist) 以获取有关在 Xcode 中设置 iOS 权限的更多信息。

> Google Maps SDK 目前不支持在基于新 M1 的 Macbook 上使用模拟器运行。这是一个[已知且已确认的问题](https://developers.google.com/maps/faq#arm-based-macs)，需要 Google 提供修复。如果您在 M1 Macbook 上进行开发，仍然支持在实际设备上构建和运行，这是推荐的方法。

## Android

Android 的 Google Maps SDK 要求您将 API 密钥添加到项目的 AndroidManifest.xml 文件中。

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

要使用某些位置功能，SDK 还需要在 AndroidManifest.xml 中添加以下权限：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

## 用法

Google Maps Capacitor 插件附带一个 Web 组件，必须在应用中用于渲染地图，因为它使我们能够更有效地在 iOS 上嵌入原生视图。插件会自动注册此 Web 组件供您的应用使用。

> 对于 Angular 用户，您会收到一个错误警告，提示 Angular 编译器不认识此 Web 组件。这可以通过修改声明组件的模块以允许自定义 Web 组件来解决。
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

将此组件包含在 HTML 中并为其分配一个 ID，以便您可以稍后轻松查询该元素引用。

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> 在 Android 上，地图渲染在整个 WebView 下方，并使用此组件在滚动事件期间管理其定位。这意味着作为开发者，您 _必须_ 确保 WebView 一直到底层都是完全透明的。在典型的 Ionic 应用程序中，这意味着在 IonContent 和根 HTML 标签等元素上设置透明度，以确保地图可见。如果您在 Android 上看不到地图，这是您应该首先检查的地方。
>
> 在 iOS 上，我们直接将地图渲染到 WebView 中，因此不需要相同的透明效果。我们仍在研究 Android 的替代方法，并希望在未来的更新中更好地解决这个问题。

Google Map 元素本身没有样式，因此您应该对其进行样式设置以适应页面的布局结构。因为我们要将视图渲染到此插槽中，元素本身没有宽度或高度，所以请确保显式设置它们。

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

接下来，我们应该创建地图引用。这通过从 Capacitor 插件导入 GoogleMap 类并调用 create 方法，传入所需的参数来完成。

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // 此地图实例的唯一标识符
  element: mapRef, // capacitor-google-map 元素的引用
  apiKey: apiKey, // 您的 Google Maps API 密钥
  config: {
    center: {
      // 地图要渲染的初始位置
      lat: 33.6,
      lng: -117.9,
    },
    zoom: 8, // 地图要渲染的初始缩放级别
  },
});
```

此时，您的应用程序中应该已经创建了地图。通过返回的地图引用，您可以以多种方式轻松与地图交互，如下所示。

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

// 处理标记点击
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
```

### JavaScript

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
      element: mapRef, // capacitor-google-map 元素的引用
      apiKey: 'YOUR_API_KEY_HERE', // 您的 Google Maps API 密钥
      config: {
        center: {
          // 地图要渲染的初始位置
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // 地图要渲染的初始缩放级别
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

| 参数            | 类型                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#createmapargs">CreateMapArgs</a></code>                                                                             |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapreadycallbackdata">MapReadyCallbackData</a>&gt;</code> |

**返回：** <code>Promise&lt;GoogleMap&gt;</code>

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
| ------------- | ----------------------------------------- |
| **`marker`**  | <code><a href="#marker">Marker</a></code> |

**返回：** <code>Promise&lt;string&gt;</code>

--------------------


### addMarkers(...)

```typescript
addMarkers(markers: Marker[]) => Promise<string[]>
```

| 参数           | 类型                  |
| -------------- | --------------------- |
| **`markers`**  | <code>Marker[]</code> |

**返回：** <code>Promise&lt;string[]&gt;</code>

--------------------


### removeMarker(...)

```typescript
removeMarker(id: string) => Promise<void>
```

| 参数      | 类型                |
| --------- | ------------------- |
| **`id`**  | <code>string</code> |

--------------------


### removeMarkers(...)

```typescript
removeMarkers(ids: string[]) => Promise<void>
```

| 参数       | 类型                  |
| ---------- | --------------------- |
| **`ids`**  | <code>string[]</code> |

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
| ------------- | ----------------------------------------------------- |
| **`config`**  | <code><a href="#cameraconfig">CameraConfig</a></code> |

--------------------


### setMapType(...)

```typescript
setMapType(mapType: MapType) => Promise<void>
```

| 参数           | 类型                                        |
| -------------- | ------------------------------------------- |
| **`mapType`**  | <code><a href="#maptype">MapType</a></code> |

--------------------


### enableIndoorMaps(...)

```typescript
enableIndoorMaps(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| -------------- | -------------------- |
| **`enabled`**  | <code>boolean</code> |

--------------------


### enableTrafficLayer(...)

```typescript
enableTrafficLayer(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| -------------- | -------------------- |
| **`enabled`**  | <code>boolean</code> |

--------------------


### enableAccessibilityElements(...)

```typescript
enableAccessibilityElements(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| -------------- | -------------------- |
| **`enabled`**  | <code>boolean</code> |

--------------------


### enableCurrentLocation(...)

```typescript
enableCurrentLocation(enabled: boolean) => Promise<void>
```

| 参数           | 类型                 |
| -------------- | -------------------- |
| **`enabled`**  | <code>boolean</code> |

--------------------


### setPadding(...)

```typescript
setPadding(padding: MapPadding) => Promise<void>
```

| 参数           | 类型                                              |
| -------------- | ------------------------------------------------- |
| **`padding`**  | <code><a href="#mappadding">MapPadding</a></code> |

--------------------


### setOnBoundsChangedListener(...)

```typescript
setOnBoundsChangedListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraIdleListener(...)

```typescript
setOnCameraIdleListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;</code> |

--------------------


### setOnCameraMoveStartedListener(...)

```typescript
setOnCameraMoveStartedListener(callback?: MapListenerCallback<CameraMoveStartedCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameramovestartedcallbackdata">CameraMoveStartedCallbackData</a>&gt;</code> |

--------------------


### setOnClusterClickListener(...)

```typescript
setOnClusterClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnClusterInfoWindowClickListener(...)

```typescript
setOnClusterInfoWindowClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;</code> |

--------------------


### setOnInfoWindowClickListener(...)

```typescript
setOnInfoWindowClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMapClickListener(...)

```typescript
setOnMapClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### setOnMarkerClickListener(...)

```typescript
setOnMarkerClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationButtonClickListener(...)

```typescript
setOnMyLocationButtonClickListener(callback?: MapListenerCallback<MyLocationButtonClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mylocationbuttonclickcallbackdata">MyLocationButtonClickCallbackData</a>&gt;</code> |

--------------------


### setOnMyLocationClickListener(...)

```typescript
setOnMyLocationClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| 参数            | 类型                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`**  | <code><a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;</code> |

--------------------


### 接口


#### CreateMapArgs

包含创建地图时使用的选项的接口。

| 属性                | 类型                                                        | 描述                                                                                          | 默认值              |
| ------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------ |
| **`id`**            | <code>string</code>                                         | 地图实例的唯一标识符。                                                                         |                    |
| **`apiKey`**        | <code>string</code>                                         | Google Maps SDK API 密钥。                                                                     |                    |
| **`config`**        | <code><a href="#googlemapconfig">GoogleMapConfig</a></code> | 地图的初始配置设置。                                                                           |                    |
| **`element`**       | <code>HTMLElement</code>                                    | 将挂载 Google Map View 的 DOM 元素，决定大小和位置。                                           |                    |
| **`forceCreate`**   | <code>boolean</code>                                        | 如果具有提供的 id 的地图已存在，则销毁并重新创建地图实例。                                    | <code>false</code> |


#### GoogleMapConfig

| 属性                     | 类型                                      | 描述                                                      | 默认值              |
| ------------------------ | ----------------------------------------- | --------------------------------------------------------- | ------------------ |
| **`width`**              | <code>number</code>                       | 覆盖原生地图的宽度。                                       |                    |
| **`height`**             | <code>number</code>                       | 覆盖原生地图的高度。                                       |                    |
| **`x`**                  | <code>number</code>                       | 覆盖原生地图的绝对 x 坐标位置。                            |                    |
| **`y`**                  | <code>number</code>                       | 覆盖原生地图的绝对 y 坐标位置。                            |                    |
| **`center`**             | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球上的默认位置。                               |                    |
| **`zoom`**               | <code>number</code>                       | 设置地图的缩放级别。                                       |                    |
| **`androidLiteMode**    | <code>boolean</code>                      | 在 Android 上启用基于图像的精简模式。                      | <code>false</code> |
| **`devicePixelRatio`**   | <code>number</code>                       | 覆盖原生地图的像素比。                                     |                    |


#### LatLng

表示纬度和经度坐标对的接口。

| 属性            | 类型                | 描述                                                                 |
| --------------- | ------------------- | -------------------------------------------------------------------- |
| **`lat`**       | <code>number</code> | 坐标纬度，以度为单位。范围为 [-90, 90]。                              |
| **`lng`**       | <code>number</code> | 坐标经度，以度为单位。范围为 [-180, 180]。                            |


#### MapReadyCallbackData

| 属性          | 类型                |
| ------------- | ------------------- |
| **`mapId`**   | <code>string</code> |


#### Marker

标记是放置在地图表面特定点的图标。

| 属性               | 类型                                      | 描述                                                                                                 | 默认值              |
| ------------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------ |
| **`coordinate`**   | <code><a href="#latlng">LatLng</a></code> | <a href="#marker">Marker</a> 位置。                                                                   |                    |
| **`opacity`**      | <code>number</code>                       | 设置标记的不透明度，范围 0（完全透明）到 1（包含）。                                                  | <code>1</code>     |
| **`title`**        | <code>string</code>                       | 标题，叠加层的简短描述。                                                                              |                    |
| **`snippet`**      | <code>string</code>                       | 摘要文本，选中时在信息窗口的标题下方显示。                                                             |                    |
| **`isFlat`**       | <code>boolean</code>                      | 控制此标记是平贴在地球表面还是作为面向相机的广告牌。                                                  | <code>false</code> |
| **`iconUrl`**      | <code>string</code>                       | 要渲染的 <a href="#marker">Marker</a> 图标。                                                          |                    |
| **`draggable`**    | <code>boolean</code>                      | 控制此标记是否可以交互式拖动。                                                                        | <code>false</code> |


#### CameraConfig

Google Map 相机的配置属性。

| 属性                      | 类型                                      | 描述                                                                                                              | 默认值              |
| ------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`coordinate`**          | <code><a href="#latlng">LatLng</a></code> | 相机指向的地球上的位置。                                                                                          |                    |
| **`zoom`**                | <code>number</code>                       | 设置地图的缩放级别。                                                                                              |                    |
| **`bearing`**             | <code>number</code>                       | 相机的方位角，从正北方向顺时针旋转的度数。                                                                        | <code>0</code>     |
| **`angle`**               | <code>number</code>                       | 相机从天底（直接面向地球）的角度，以度为单位。唯一允许的值是 0 和 45。                                            | <code>0</code>     |
| **`animate`**             | <code>boolean</code>                      | 是否以动画方式过渡到新的相机属性。                                                                                | <code>false</code> |
| **`animationDuration`**   | <code>number</code>                       | 动画持续时间。                                                                                                    |                    |


#### MapPadding

控制设置视图"可见"区域的内边距。

| 属性           | 类型                |
| -------------- | ------------------- |
| **`top`**      | <code>number</code> |
| **`left`**     | <code>number</code> |
| **`right`**    | <code>number</code> |
| **`bottom`**   | <code>number</code> |


#### CameraIdleCallbackData

| 属性              | 类型                                                  |
| ----------------- | ----------------------------------------------------- |
| **`mapId`**       | <code>string</code>                                   |
| **`bounds`**      | <code><a href="#latlngbounds">LatLngBounds</a></code> |
| **`bearing`**     | <code>number</code>                                   |
| **`latitude`**    | <code>number</code>                                   |
| **`longitude`**   | <code>number</code>                                   |
| **`tilt`**        | <code>number</code>                                   |
| **`zoom`**        | <code>number</code>                                   |


#### LatLngBounds

表示视口纬度和经度边界的接口。

| 属性              | 类型                                      |
| ----------------- | ----------------------------------------- |
| **`southwest`**   | <code><a href="#latlng">LatLng</a></code> |
| **`center`**      | <code><a href="#latlng">LatLng</a></code> |
| **`northeast`**   | <code><a href="#latlng">LatLng</a></code> |


#### CameraMoveStartedCallbackData

| 属性              | 类型                 |
| ----------------- | -------------------- |
| **`mapId`**       | <code>string</code>  |
| **`isGesture`**   | <code>boolean</code> |


#### ClusterClickCallbackData

| 属性              | 类型                              |
| ----------------- | --------------------------------- |
| **`mapId`**       | <code>string</code>               |
| **`latitude`**    | <code>number</code>               |
| **`longitude`**   | <code>number</code>               |
| **`size`**        | <code>number</code>               |
| **`items`**       | <code>MarkerCallbackData[]</code> |


#### MarkerCallbackData

| 属性              | 类型                |
| ----------------- | ------------------- |
| **`markerId`**    | <code>string</code> |
| **`latitude`**    | <code>number</code> |
| **`longitude`**   | <code>number</code> |
| **`title`**       | <code>string</code> |
| **`snippet`**     | <code>string</code> |


#### MarkerClickCallbackData

| 属性          | 类型                |
| ------------- | ------------------- |
| **`mapId`**   | <code>string</code> |


#### MapClickCallbackData

| 属性              | 类型                |
| ----------------- | ------------------- |
| **`mapId`**       | <code>string</code> |
| **`latitude`**    | <code>number</code> |
| **`longitude`**   | <code>number</code> |


#### MyLocationButtonClickCallbackData

| 属性          | 类型                |
| ------------- | ------------------- |
| **`mapId`**   | <code>string</code> |


### 类型别名


#### MapListenerCallback

当地图事件触发时调用的回调函数。

<code>(data: T): void</code>


### 枚举


#### MapType

| 成员             | 值                      | 描述                                |
| ---------------- | ----------------------- | ----------------------------------- |
| **`Normal`**     | <code>'Normal'</code>   | 基本地图。                          |
| **`Hybrid`**     | <code>'Hybrid'</code>   | 带有道路和标签的卫星图像。           |
| **`Satellite`**  | <code>'Satellite'</code>| 不带标签的卫星图像。                 |
| **`Terrain`**    | <code>'Terrain'</code>  | 地形数据。                          |
| **`None`**       | <code>'None'</code>     | 无基础地图瓦片。                     |

</docgen-api>
