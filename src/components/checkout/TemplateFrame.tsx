import * as React from 'react';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import getCheckoutTheme from './theme/getCheckoutTheme';
import { PaletteMode } from '@mui/material';


interface TemplateFrameProps {
  showCustomTheme: boolean;
  toggleCustomTheme: (theme: boolean) => void;
  mode: PaletteMode;
  toggleColorMode: () => void;
  children: React.ReactNode;
}

export default function TemplateFrame({
  mode,
  children,
}: TemplateFrameProps) {

  const checkoutTheme = createTheme(getCheckoutTheme(mode));

  return (
    <ThemeProvider theme={checkoutTheme}>
      <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>

        <Box sx={{ flex: '1 1', overflow: 'auto' }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}
