import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import React from 'react';

import styles from './index.module.scss';

export default function NativeEnterpriseCard(props) {
  return (
    <a className={clsx(props.className, styles.nativeEnterprise)} href="https://ionicframework.com/native">
      <div className="image-wrapper">
        <img src={useBaseUrl('/img/native/native-enterprise@2x.png')} width="476" height="228" />
      </div>

      <div className="heading-group">
        <header>Ionic Native 企业版</header>
        <p>
          面向企业级应用构建的高级、受支持的 Capacitor 和 Cordova 插件、第三方集成以及预构建的原生解决方案。
        </p>
      </div>
    </a>
  );
}
