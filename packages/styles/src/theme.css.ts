import { createGlobalTheme } from '@vanilla-extract/css';

export const theme = createGlobalTheme(':root', {
  colors: {
    primary: {
      '1': '#ECEEFF',
      '2': '#9AA4FF',
      '3': '#4354F0',
      '4': '#2735BD',
      '5': '#121E8A',
      '6': '#050D57',
    },
    secondary: {
      '1': '#F9FBFD',
      '2': '#D3E2F6',
      '3': '#A9B9CD',
      '4': '#8291A5',
      '5': '#5E6B7C',
      '6': '#3C4653',
    },
    indicatorBlue: {
      '1': '#EFF6FF',
      '2': '#BEDDFF',
      '3': '#8DC4FF',
      '4': '#5DAAFF',
      '5': '#5E6B7C',
      '6': '#003977',
    },
    indicatorRed: {
      '1': '#FFECEB',
      '2': '#FF9993',
      '3': '#FF453A',
      '4': '#CC281F',
      '5': '#99130B',
      '6': '#660600',
    },
    indicatorGreen: {
      '1': '#E9FFF7',
      '2': '#A9FFE1',
      '3': '#68FFCC',
      '4': '#23E2A1',
      '5': '#069E6A',
      '6': '#005A3B',
    },
    gray: {
      '1': '#F7F8F9',
      '2': '#E9EBEE',
      '3': '#C5C8CE',
      '4': '#646F7C',
      '5': '#374553',
      '6': '#28323C',
    },
    background: {
      normal: 'white',
      secondary: '#F7F8F9',
      light: '#D5D5DC',
    },
  },

  shadows: {
    sm: '0px 3px 8px -1px rgba(50, 50, 71, 0.05), 0px 0px 1px 0px rgba(12, 26, 75, 0.24)',
    base: '0px 4px 20px -2px rgba(50, 50, 71, 0.08), 0px 0px 1px 0px rgba(12, 26, 75, 0.10)',
    md: '0px 10px 16px 0px rgba(20, 37, 63, 0.06), 0px 0px 1px 0px rgba(12, 26, 75, 0.10)',
    lg: '0px 20px 24px 0px rgba(20, 37, 63, 0.06), 0px 0px 1px 0px rgba(12, 26, 75, 0.10)',
    xl: 'drop-shadow(0px 30px 40px rgba(20, 37, 63, 0.08)) drop-shadow(0px 0px 1px rgba(12, 26, 75, 0.10))',
  },

  fonts: {
    body: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`,
  },

  textVariants: {
    heading1: {
      fontSize: '40px',
      fontWeight: '800',
      lineHeight: 'normal',
    },
    heading2: {
      fontSize: '32px',
      fontWeight: '800',
      lineHeight: 'normal',
    },
    heading3: {
      fontSize: '24px',
      fontWeight: '800',
      lineHeight: 'normal',
    },
    lg: {
      fontSize: '20px',
      fontWeight: '800',
      lineHeight: 'normal',
    },
    default: {
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: 'normal',
    },
    sm: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: 'normal',
    },
    xs: {
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: 'normal',
    },
    '2xs': {
      fontSize: '10px',
      fontWeight: '400',
      lineHeight: 'normal',
    },
  },
});
