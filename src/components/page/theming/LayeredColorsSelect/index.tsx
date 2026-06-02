import CodeColor from '@components/page/theming/CodeColor';
import React, { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';
import ColorDot from '../ColorDot';

import InputWrapper from '../InputWrapper';

import useThemeContext from '@theme/hooks/useThemeContext';
import clsx from 'clsx';

export default function LayeredColorsSelect({ ...props }) {
  const { isDarkTheme } = useThemeContext();

  const [color, setColor] = useState('primary');
  const el = useRef<HTMLDivElement>(null);

  const [variations, setVariations] = useState([]);

  useEffect(() => {
    setVariations([
      {
        property: `--ion-color-${color}`,
        name: '基础色',
        description: '所有变体所衍生自的主色',
        value: getComputedStyle(el.current).getPropertyValue(`--ion-color-${color}`),
      },
      {
        property: `--ion-color-${color}-rgb`,
        name: '基础色 (RGB)',
        rgb: true,
        description: '以红、绿、蓝格式表示的基础色',
        value: getComputedStyle(el.current).getPropertyValue(`--ion-color-${color}-rgb`),
      },
      {
        property: `--ion-color-${color}-contrast`,
        name: '对比色',
        description: '基础色的对比色，应在基础色上清晰可见',
        value: getComputedStyle(el.current).getPropertyValue(`--ion-color-${color}-contrast`),
      },
      {
        property: `--ion-color-${color}-contrast-rgb`,
        name: '对比色 (RGB)',
        rgb: true,
        description: '以红、绿、蓝格式表示的对比色',
        value: getComputedStyle(el.current).getPropertyValue(`--ion-color-${color}-contrast-rgb`),
      },
      {
        property: `--ion-color-${color}-shade`,
        name: '阴影色',
        description: '比基础色略深的版本',
        value: getComputedStyle(el.current).getPropertyValue(`--ion-color-${color}-shade`),
      },
      {
        property: `--ion-color-${color}-tint`,
        name: '浅色调',
        description: '比基础色略浅的版本',
        value: getComputedStyle(el.current).getPropertyValue(`--ion-color-${color}-tint`),
      },
    ]);
  }, [color]);

  return (
    <div
      {...props}
      ref={el}
      className={clsx(styles.layeredColorsSelect, styles[`layeredColorsSelect${isDarkTheme ? 'Dark' : 'Light'}`])}
    >
      <div className={styles.selectRow}>
        <ColorDot color={`var(--ion-color-${color})`} />
        <InputWrapper>
          <select value={color} onChange={(ev) => setColor((ev.target as HTMLSelectElement).value)}>
            <option value="primary">主要</option>
            <option value="secondary">次要</option>
            <option value="tertiary">第三</option>
            <option value="success">成功</option>
            <option value="warning">警告</option>
            <option value="danger">危险</option>
            <option value="dark">深色</option>
            <option value="medium">中等</option>
            <option value="light">浅色</option>
          </select>
        </InputWrapper>
      </div>
      <table>
        <tr>
          <th>名称</th>
          <th>属性</th>
          <th>默认值</th>
          <th>描述</th>
        </tr>
        {variations.map((variation) => {
          const codeColor = variation.rgb ? `rgb(${variation.value})` : `${variation.value}`;

          return (
            <tr>
              <td className={styles.colorName}>{variation.name}</td>
              <td className={styles.colorProperty}>
                <code>{variation.property}</code>
              </td>
              <td className={styles.colorValue}>
                <CodeColor color={codeColor}>{variation.value}</CodeColor>
              </td>
              <td className={styles.colorDescription}>{variation.description}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
