import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import Box from '@mui/material/Box';
import getCheckoutTheme from './theme/getCheckoutTheme';


function TemplateFrame({
  mode,
  children,
}) {

  const checkoutTheme = createTheme(getCheckoutTheme(mode));

  return (
    <ThemeProvider theme={checkoutTheme}>
      <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: '1 1', overflow: 'auto' }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  showCustomTheme: PropTypes.bool.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default TemplateFrame;
