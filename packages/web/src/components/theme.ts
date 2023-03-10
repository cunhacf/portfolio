import { css, DefaultTheme, FlattenSimpleInterpolation } from 'styled-components';

export const colors = {
  main: '#FFFFFF',
  mainDark: '#1D1D1F',
  secondary: '#FC6859',
  secondaryAlt: '#F9F9F9',
  bg: '#FFFFFF',
  youtube: '#CC0000'
};

export const colorsDark = {
  ...colors,
  main: '#000',
  mainDark: '#FFFFFF',
  secondaryAlt: '#333',
  bg: '#1D1D1F',
};

export const helpers = {
  toRem: (size: number): string => {
    const remSize = size / 16;

    return `${remSize}rem`;
  },

  toVw: (size: number, base = 1920): string => {
    const vwContext = (base * 0.01) * 1;

    return `calc(${size / vwContext} * 1vw)`;
  },

  fontSize: (size: number): FlattenSimpleInterpolation => {
    return css`font-size: ${helpers.toRem(size)};`;
  },

  hexToRgb: (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return `${parseInt(result?.[1] || '0', 16)}, ${parseInt(result?.[2] || '0', 16)}, ${parseInt(result?.[3] || '0', 16)}`;
  },

  font: (fontFamily: string, fontFilename: string, fontWeight = 400, fontStyle = 'normal', fontStretch = 'normal'): FlattenSimpleInterpolation => {
    return css`
      @font-face {
          font-family: ${fontFamily};
          src: url('/fonts/${fontFamily}/${fontFilename}.woff') format('woff'),
                url('/fonts/${fontFamily}/${fontFilename}.woff2') format('woff2');
          font-weight: ${fontWeight};
          font-style: ${fontStyle};
          font-stretch: ${fontStretch};
      }
    `;
  }
}

export interface Theme extends DefaultTheme {
  colors: { [color in keyof typeof colors]: typeof colors[color] };
  helpers: { [helper in keyof typeof helpers]: typeof helpers[helper] };
  isDark?: boolean;
}

export const lightTheme: Theme = {
  colors,
  helpers,
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: colorsDark,
  isDark: true
};

export default lightTheme;
