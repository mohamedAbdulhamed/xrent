import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "./components/AddressForm";
import getCheckoutTheme from "./theme/getCheckoutTheme";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/Review";
import SitemarkIcon from "./components/SitemarkIcon";
import TemplateFrame from "./TemplateFrame";
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
  APPBAR_HEIGHT,
  TRANSLAITIONS,
} from "../../config/constants.ts";
import { useTranslation, Trans } from "react-i18next";
import { useShoppingCart } from "../../context/ShoppingCartProvider.tsx";

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);
  const nextButton = React.useRef();
  const { t, i18n } = useTranslation();

  const { getTotalPrice } = useShoppingCart();

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = "dark"; // localStorage.getItem('themeMode')

    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }

    // scoll to nextButton
    if (nextButton.current) {
      nextButton.current.scrollIntoView({
        behavior: "smooth",
        block: "end",     // ensures the button appears at the end of the viewport
      });
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
  };
  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = [
    t(TRANSLAITIONS.checkout_step1),
    t(TRANSLAITIONS.checkout_step2),
    t(TRANSLAITIONS.checkout_step3),
  ];

  const FEES = 9.99;

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <Grid
          container
          sx={{
            height: { xs: "100%", sm: "100dvh" },
            flexWrap: "nowrap",
            minHeight: `calc(100vh - (${HEADER_HEIGHT}px + ${FOOTER_HEIGHT}px + ${APPBAR_HEIGHT}px))`,
          }}
        >
          {/* Left side */}
          <Grid
            size={{ xs: 12, sm: 8, lg: 6 }}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              backgroundColor: "background.paper",
              borderRight: { sm: "none", md: "1px solid" },
              borderColor: { sm: "none", md: "divider" },
              alignItems: "start",
              pt: 16,
              px: 6,
              gap: 4,
              width: "35vw",
            }}
          >
            <SitemarkIcon />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Info
                title={t(TRANSLAITIONS.checkout_infoTitlte)}
                totalPrice={activeStep >= 2 ? String("EGP " + (getTotalPrice() + FEES)) : String("EGP " + getTotalPrice())}
                direction={i18n.dir(i18n.language)}
              />
            </Box>
          </Grid>

          {/* Right side */}
          <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "100%",
              backgroundColor: { xs: "transparent", sm: "background.default" },
              alignItems: "start",
              pt: { xs: 1, sm: 10 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 1, md: 1 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexGrow: 1,
                }}
              >
                <Stepper
                  id="desktop-stepper"
                  activeStep={activeStep}
                  sx={{ width: "100%", height: 40, direction: "ltr" }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ":first-of-type": { pl: 0 },
                        ":last-child": { pr: 0 },
                      }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>

            {/* Mobile support */}
            <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected products
                  </Typography>
                  <Typography variant="body1">
                    {activeStep >= 2 ? String("EGP " + (getTotalPrice() + FEES)) : String("EGP " + getTotalPrice())}
                  </Typography>
                </div>
                {/* Add fees and other added taxes */}
                <InfoMobile
                  title={t(TRANSLAITIONS.checkout_infoTitlte)}
                  totalPrice={activeStep >= 2 ? String("EGP " + (getTotalPrice() + FEES)) : String("EGP " + getTotalPrice())}
                  direction={i18n.dir(i18n.language)}
                />
              </CardContent>
            </Card>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
                maxHeight: "720px",
                gap: { xs: 5, md: "none" },
              }}
            >
              <Stepper
                id="mobile-stepper"
                activeStep={activeStep}
                alternativeLabel
                sx={{ display: { sm: "flex", md: "none" } }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-of-type": { pl: 0 },
                      ":last-child": { pr: 0 },
                      "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                    }}
                    key={label}
                  >
                    <StepLabel
                      sx={{
                        ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {activeStep === steps.length ? (
                <Stack spacing={2} useFlexGap>
                  <Typography variant="h1">📦</Typography>
                  <Typography variant="h5">
                    {t(TRANSLAITIONS.checkout_orderConfirmationTitle)}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    <Trans
                      i18nKey={TRANSLAITIONS.checkout_orderConfirmationDesc}
                      values={{ orderNumber: "198464" }}
                      components={{ strong: <strong /> }}
                    />
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      alignSelf: "start",
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    {t(TRANSLAITIONS.checkout_toOrdersButton)}
                  </Button>
                </Stack>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box
                    sx={[
                      {
                        direction: "ltr",
                        display: "flex",
                        flexDirection: { xs: "column-reverse", sm: "row" },
                        alignItems: "end",
                        flexGrow: 1,
                        gap: 1,
                        pb: { xs: 12, sm: 0 },
                        mt: { xs: 2, sm: 0 },
                        mb: "60px",
                      },
                      activeStep !== 0
                        ? { justifyContent: "space-between" }
                        : { justifyContent: "flex-end" },
                    ]}
                  >
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="text"
                        sx={{ display: { xs: "none", sm: "flex" } }}
                      >
                        Previous
                      </Button>
                    )}

                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        sx={{ display: { xs: "flex", sm: "none" } }}
                      >
                        {t(TRANSLAITIONS.checkout_prevButton)}
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                      onClick={handleNext}
                      sx={{ width: { xs: "100%", sm: "fit-content" } }}
                      ref={nextButton}
                    >
                      {activeStep === steps.length - 1
                        ? t(TRANSLAITIONS.checkout_placeOrderButton)
                        : t(TRANSLAITIONS.checkout_nextButton)}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </TemplateFrame>
  );
}
