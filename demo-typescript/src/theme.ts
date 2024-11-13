// src/theme.ts
import { createTheme } from '@mui/material/styles';
import { purple, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500], // You can choose any primary color
    },
    secondary: {
      main: blue[700], // You can set a secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: 16,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase transformation on buttons
        },
      },
    },
  },
});

export default theme;
