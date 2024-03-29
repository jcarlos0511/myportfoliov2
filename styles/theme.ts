import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  borderRadius: {
    card: '8px',
    default: '4px',
  },
  fontSizes: {
    '2xs': '0.625rem',
    xs: '0.75rem',
    sm: '0.875rem',
    base: '16px',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.375rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
  lineHeights: {
    '2xs': '0.75rem',
    xs: '1rem',
    sm: '1.25rem',
    base: '1.5rem',
    lg: '1.75rem',
    xl: '1.875rem',
    '2xl': '2rem',
    '3xl': '2.25rem',
    '4xl': '2.5rem',
    '5xl': '1',
    '6xl': '1',
    '7xl': '1',
  },
  shadows: {
    header: ` 0px 2px 2px rgba(0, 0, 0, 0.05), 
              0px 6px 6px rgba(0, 0, 0, 0.1), 
              0px 8px 8px rgba(0, 0, 0, 0.05), 
              0px 10px 15px rgba(0, 0, 0, 0.03)`,
  },
  transition: 'all 700ms cubic-bezier(0.15, 1, 0.20, 1)',
}

export default theme
