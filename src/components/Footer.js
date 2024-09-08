import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from "../theme";
import Copyright from './Copyright';
import { FOOTER_HEIGHT } from "../config/constants";

function Footer() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box sx={{ bgcolor: colors.grey[900], p: 6, mt: 'auto', height:`${FOOTER_HEIGHT}px` }} component="footer">
      <Typography variant="h6" align="center" gutterBottom sx={{ color: colors.grey[100] }}>
        XRent
      </Typography>
      <Typography variant="subtitle1" align="center" color={colors.grey[500]} component="p">
        Buy, sell or rent the dress you like.
      </Typography>
      <Copyright sx={{ color: colors.grey[100] }} owner="XRent" url="https://xrent.com/" />
    </Box>
  );
}

export default Footer;