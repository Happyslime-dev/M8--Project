import { keyframes } from 'styled-components'

export const theme = {
  colors: {
    lightGrey: '#BDBDBD',
    lighterGrey: '#e0e0e0',
    teal: '#009688',
    darkTeal: '#4D516D',
    fbBlue: '#466ab5',
    fbDarkBlue: '#3b5998',
    googleRed: '#FF5252',
    googleDarkRed: '#D32F2F',
  },
  fontColors: {
    primary: '#34282C',
    secondary: '#757575',
    tertiary:'#C0C0C0',
    hover: '#009688',
  },
  backgroundColors: {
    main: '#0C090A',
  },
  radius: '4px',
  size: {
    sm: '(max-width: 600px)',
    md: '(max-width: 960px)',
    lg: '(max-width: 1025px)',
    xl: '(min-width: 1026px)',
  },
  width: '1000px',
  transition: '0.35s',
}

export const appear = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`
