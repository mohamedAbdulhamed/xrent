import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Container,
  useTheme,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import Header from "../../components/Header";
import Alert from "@mui/material/Alert";
import Loading from "../../components/Loading";
import CookieConsent from "../../components/CookieConsent";
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
  APPBAR_HEIGHT,
  TRANSLAITIONS,
} from "../../config/constants";
import { useTranslation } from "react-i18next";

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t, i18n } = useTranslation();

  const { auth, setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [showConsent, setShowConsent] = useState(false);
  const [consentGiven, setConsentGiven] = useState(
    localStorage.getItem("cookieConsent") === "true"
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (values) => {
    if (auth?.user) {
      setError(t(TRANSLAITIONS.login_alreadySignedError));
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // const response = await axios.post("/Account/login", values, {
      //   withCredentials: true,
      // });

      const user = {
        firstName: "Mohamed",
        lastName: "Abdulhamed",
        email: "mohamed@gmail.com",
        address: "",
        phoneNumber: "",
        birthday: new Date(),
        Gender: "Male",
      };
      const token = "";

      setAuth({ user, token });
      navigate("/");

      return;
      // if (response?.data?.Success && response?.data?.StatusCode === 200) {
      //   const token = response?.data?.Result?.token;
      //   const user = response?.data?.Result?.user;

      //   if (!token || !user) throw new Error("Something went wrong!");

      //   setAuth({ user, token });

      //   setLoading(false);

      //   navigate(from, { replace: true });
      // } else {
      //   setError(
      //     response?.data?.ErrorMessage || "An unknown error has occured!"
      //   );
      // }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);

    if (persist && !consentGiven) {
      setShowConsent(true);
    }
  }, [persist, consentGiven]);

  const handleConsent = () => {
    setConsentGiven(true);
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  const handleError = (err) => {
    if (err?.name === "AbortError") return;

    if (!err?.response) setError("No server response");

    if (err.response?.data?.ErrorMessage) {
      setError(err.response.data.ErrorMessage);
    } else {
      setError("Operation Failed, Please Try Again Later!");
    }
  };

  const inputStyles = {
    "& .MuiInputLabel-root": { color: "black" },
    "& .MuiInputBase-root": { color: "black" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: colors.secondry, // Default border color (red)
      },
      "&:hover fieldset": {
        borderColor: colors.secondry, // Red border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.black, // Black border color when focused
      },
    },
    "& .MuiFormLabel-root": {
      color: colors.black, // Label color
    },
    "& .MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-popupIndicator.css-10sixfi-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator":
      {
        color: colors.black, // Label color
      },
    "& .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-clearIndicator.css-1cleyyo-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator":
      {
        color: colors.black, // Label color
      },
  };

  const combinedStyles = {
    ...inputStyles,
    gridColumn: "span 2",
  };

  const checkoutSchema = yup.object().shape({
    email: yup
      .string()
      .email(t(TRANSLAITIONS.invalidEmailError))
      .required(t(TRANSLAITIONS.requiredEmailError)),
    password: yup
      .string()
      .required(t(TRANSLAITIONS.requiredPasswordError)),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Loading />
      </Box>
    );
  }

  return (
    <Container
      sx={{
        minHeight: `calc(100vh - (${HEADER_HEIGHT}px + ${FOOTER_HEIGHT}px + ${APPBAR_HEIGHT}px))`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Header
        title={t(TRANSLAITIONS.login_headerTitle)}
        subtitle={t(TRANSLAITIONS.login_headerSubtitle)}
      />

      {success && (
        <Alert severity="success" sx={{ marginBottom: "50px" }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ marginBottom: "50px" }}>
          {error}
        </Alert>
      )}

      {showConsent && <CookieConsent handleConsent={handleConsent} />}

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label={t(TRANSLAITIONS.emailLabel)}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={combinedStyles}
                required
              />
              <TextField
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                label={t(TRANSLAITIONS.passwordLabel)}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={combinedStyles}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        sx={{
                          color: colors.black,
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                sx={{
                  color: colors.black,
                  "& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-havevq-MuiSvgIcon-root":
                    {
                      color: colors.greenAccent[500],
                    },
                }}
                control={
                  <Checkbox
                    checked={persist}
                    onChange={togglePersist}
                    name="persist"
                    color="info"
                    sx={{
                      color: colors.greenAccent[500],
                    }}
                  />
                }
                label={t(TRANSLAITIONS.login_rememberMeLabel)}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Box display="flex" alignItems="center">
                <Typography
                  variant="h5"
                  color={colors.secondry}
                  sx={{ marginRight: "10px", textDecoration: "underline" }}
                >
                  {t(TRANSLAITIONS.login_headToRegisterTitle)}
                </Typography>
                {i18n.language === "ar" ? <ArrowBackIcon sx={{ color: colors.black }} /> : <ArrowForwardIcon sx={{ color: colors.black }}  />}
                <Button
                  component={Link}
                  to="/register"
                  variant="primary"
                  sx={{
                    color: colors.black,
                    backgroundColor: colors.secondry,
                    textTransform: "none",
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.2s ease-in-out",
                    },
                  }}
                >
                  {t(TRANSLAITIONS.login_headToRegisterButton)}
                </Button>
              </Box>
              <Box>
                <Button type="submit" color="secondary" variant="contained">
                  {t(TRANSLAITIONS.login_loginButton)}
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
