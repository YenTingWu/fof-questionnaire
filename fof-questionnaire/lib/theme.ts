import { extendTheme } from '@chakra-ui/react';

const styles = {
  global: {
    body: {
      color: 'black',
      fontFamily: 'Noto Sans TC, "sans-serif"',
    },
  },
};

const colors = {
  black: '#333333',
  fof: {
    black: '#333333',
    dark_gray: '#555555',
    light_gray: '#888888',
    main: '#2D3748',
    secondary: '#A0AEC0',
    blue: '#4299E1',
    light_red: '#FFD6D6',
  },
};

export default extendTheme({ colors, styles });
