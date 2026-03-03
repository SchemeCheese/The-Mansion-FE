import styled, { css } from 'styled-components';
import {
  border,
  color as colorStyle,
  compose,
  flexbox,
  grid,
  layout,
  position,
  space,
  typography,
} from 'styled-system';

import { Colors } from './lib/types';

const breakpoints = ['360px', '400px', '768px', '1024px', '1360px'] as string[] &
  Record<string, string>;
const [xsBreakpoint, smBreakpoint, mdBreakpoint, lgBreakpoint, xlBreakpoint] = breakpoints;

breakpoints.xs = xsBreakpoint;
breakpoints.sm = smBreakpoint;
breakpoints.md = mdBreakpoint;
breakpoints.lg = lgBreakpoint;
breakpoints.xl = xlBreakpoint;

const colors: Colors = {
  white: '#fff',
  amber: '#FFC107',
  blue: '#2196F3',
  brown: '#795548',
  cyan: '#00BCD4',
  green: '#4CAF50',
  indigo: '#3F51B5',
  lime: '#CDDC39',
  orange: '#FF9800',
  pink: '#E91E63',
  purple: '#9C27B0',
  red: '#f44336',
  teal: '#009688',
  yellow: '#FFEB3B',
  black: '#000',
  primary: '#4e4141',
  secondary: '#4B515D',
  success: '#00C851',
  warning: '#fda509',
  danger: '#ff4444',
  info: '#33b5e5',
  light: '#f4f4f4',
  dark: '#212121',
  gray03: '#f7f7f7',
  gray05: '#f4f4f4',
  gray10: '#e6e6e6',
  gray20: '#ccc',
  gray30: '#b3b3b3',
  gray40: '#999',
  gray50: '#808080',
  gray60: '#666',
  gray70: '#4d4d4d',
  gray80: '#333',
  gray90: '#1a1a1a',
};

const baseTheme = {
  alert: {
    borderRadius: 0,
    maxWidth: 450,
    padding: '10px 12px',
  },
  breakpoints,
  button: {
    borderRadius: {
      xs: 0,
      sm: 0,
      md: 0,
      lg: 0,
      xl: 0,
    },
    padding: {
      xs: [4, 8],
      sm: [6, 10],
      md: [8, 14],
      lg: [10, 18],
      xl: [12, 20],
    },
  },
  colors,
  lineHeight: 1.4,
  mediaQueries: {
    _: '',
    xs: '@media screen and (min-width: 360px)',
    sm: '@media screen and (min-width: 400px)',
    md: '@media screen and (min-width: 768px)',
    lg: '@media screen and (min-width: 1024px)',
    xl: '@media screen and (min-width: 1360px)',
  },
  space: [0, 4, 8, 16, 32, 64, 128],
};

const system = compose(space, layout, colorStyle, typography, flexbox, grid, position, border);

const unitlessProps = new Set(['font-weight', 'line-height', 'opacity', 'z-index', 'flex']);

const toKebabCase = (value: string) => value.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);

const toCssValue = (propertyName: string, value: unknown): string => {
  if (typeof value === 'number' && !unitlessProps.has(propertyName)) {
    return `${value}px`;
  }

  return String(value);
};

const toCssBlock = (styles: Record<string, unknown>) =>
  Object.entries(styles)
    .map(
      ([property, value]) =>
        `${toKebabCase(property)}: ${toCssValue(toKebabCase(property), value)};`,
    )
    .join('\n');

const getVariantColor = (theme: any, variant?: string) =>
  theme?.colors?.[variant || ''] || theme?.colors?.primary || colors.primary;

const mergeDeep = (target: Record<string, any>, source: Record<string, any>) => {
  const output = { ...target };

  Object.keys(source || {}).forEach(key => {
    const sourceValue = source[key];
    const targetValue = output[key];

    if (
      sourceValue &&
      targetValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue)
    ) {
      output[key] = mergeDeep(targetValue, sourceValue);
    } else {
      output[key] = sourceValue;
    }
  });

  return output;
};

export const getTheme = (customTheme: Record<string, any> = {}) =>
  mergeDeep(baseTheme, customTheme || {});

export const px = (value: number | string): string => {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  const numericValue = Number(value);

  if (Number.isFinite(numericValue) && value.trim() !== '') {
    return `${value}px`;
  }

  return value;
};

export const responsive =
  (breakpointStyles: Record<string, Record<string, unknown>> = {}) =>
  ({ theme }: any = {}) => {
    const currentTheme = getTheme(theme || {});
    const mediaQueries = currentTheme.mediaQueries || baseTheme.mediaQueries;

    return css`
      ${Object.entries(breakpointStyles).map(([breakpoint, styles]) => {
        if (breakpoint === '_') {
          return css`
            ${toCssBlock(styles)}
          `;
        }

        if (!mediaQueries[breakpoint]) {
          return css``;
        }

        return css`
          ${mediaQueries[breakpoint]} {
            ${toCssBlock(styles)}
          }
        `;
      })}
    `;
  };

export const Box = styled.div<any>`
  ${system}
`;

export const Container = styled(Box)<any>`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  padding-left: ${px(16)};
  padding-right: ${px(16)};

  ${({ fullScreen }) =>
    fullScreen &&
    css`
      align-items: center;
      display: flex;
      justify-content: center;
      min-height: 100vh;
      width: 100%;
    `}

  ${({ theme, ySpacing }) =>
    ySpacing &&
    css`
      padding-bottom: ${px(getTheme(theme).space[4] || 32)};
      padding-top: ${px(getTheme(theme).space[4] || 32)};
    `}

  ${({ verticalAlign }) =>
    verticalAlign &&
    css`
      align-items: ${verticalAlign};
    `}
`;

export const Text = styled.span<any>`
  ${system}
`;

export const Paragraph = styled.p<any>`
  margin: 0;
  ${system}
`;

export const Heading = styled.h2<any>`
  margin: 0;
  ${system}
`;

export const Link = styled.a<any>`
  color: inherit;
  text-decoration: none;
  ${system}
`;

export const Image = styled.img<any>`
  display: block;
  max-width: 100%;
  ${system}
`;

export const Flex = styled(Box)<any>`
  display: flex;
`;

export const Grid = styled(Box)<any>`
  display: grid;
`;

export const ButtonGroup = styled.div<any>`
  display: inline-flex;

  > * + * {
    margin-left: ${px(8)};
  }
`;

export const Button = styled.button<any>`
  ${system}
  border: 1px solid ${({ dark, theme, variant }) =>
    dark ? '#212121' : getVariantColor(theme, variant)};
  border-radius: ${({ size = 'md', theme }) => {
    const currentTheme = getTheme(theme);

    return px(currentTheme.button?.borderRadius?.[size] ?? 4);
  }};
  background-color: ${({ dark, invert, theme, variant }) => {
    if (invert) {
      return '#fff';
    }

    if (dark) {
      return '#212121';
    }

    return getVariantColor(theme, variant);
  }};
  color: ${({ dark, invert, theme, variant }) => {
    if (invert) {
      return getVariantColor(theme, variant);
    }

    return dark ? '#fff' : '#fff';
  }};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ busy, disabled }) => (busy || disabled ? 0.7 : 1)};
  padding: ${({ size = 'md', theme }) => {
    const currentTheme = getTheme(theme);
    const [vertical, horizontal] = currentTheme.button?.padding?.[size] || [8, 14];

    return `${px(vertical)} ${px(horizontal)}`;
  }};
  pointer-events: ${({ busy, disabled }) => (busy || disabled ? 'none' : 'auto')};
  transition: all 0.2s ease;
`;

export const Alert = styled(Box)<any>`
  border: 1px solid ${({ theme, variant }) => getVariantColor(theme, variant)};
  border-left-width: 4px;
  border-radius: ${({ theme }) => px(getTheme(theme).alert?.borderRadius ?? 0)};
  max-width: ${({ theme }) => px(getTheme(theme).alert?.maxWidth ?? 450)};
  width: 100%;
`;

export { type Variants } from './lib/types';
