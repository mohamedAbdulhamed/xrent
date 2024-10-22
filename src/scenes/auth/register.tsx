import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Container,
  useTheme,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { tokens } from "../../theme.ts";
import Header from "../../components/Header.tsx";

import { useNavigate, Link } from "react-router-dom";

import axios from "../../api/axios.ts";
import useAuth from "../../hooks/useAuth.ts";
import { useTranslation } from "react-i18next";

import { Notification } from "../../components/Notification.tsx";
import Loading from "../../components/Loading.tsx";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
  APPBAR_HEIGHT,
  TRANSLAITIONS,
  SEVERITY,
} from "../../config/constants.ts";
import { toast } from "react-toastify";


const RegisterForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth, setAuth, persist, setPersist } = useAuth();
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [showPassword, setShowPassword] = useState(false);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
    password: "",
    birthDay: null,
    gender: "Male",
  });

  const handleFormSubmit = async (values) => {
    console.log(values);
    setLoading(true);

    try {
      const response = await axios.post("/Account/register", values);

      if (response?.data?.Success && response?.data?.StatusCode === 200) {
        navigate("/");
      } else {
        toast.error(
          `Operation Failed: ${response?.data?.ErrorMessage || "Unknown error"}`
        );
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err) => {
    if (err?.name === "AbortError") return;
    setSeverity(SEVERITY.error);

    if (err.response?.data?.ErrorMessage) {
      toast.error(err.response.data.ErrorMessage);
    } else {
      toast.error("Operation Failed, Please Try Again Later!");
    }
  };

  const inputStyles = {
    "& .MuiInputLabel-root": { color: "black" },
    "& .MuiInputBase-root": { color: "black" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: colors.secondry, // Default border color
      },
      "&:hover fieldset": {
        borderColor: colors.secondry, // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.black, // Border color when focused
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

  const datePickerStyles = {
    ...inputStyles,
    "& .css-1y8qrae-MuiButtonBase-root-MuiIconButton-root": {
      color: colors.black,
    },
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required(t(TRANSLAITIONS.requiredFirstNameError)),
    lastName: yup.string().required(t(TRANSLAITIONS.requiredLastNameError)),
    address: yup.string().required(t(TRANSLAITIONS.requiredAddressError)),
    email: yup
      .string()
      .email(t(TRANSLAITIONS.invalidEmailError))
      .required(t(TRANSLAITIONS.requiredEmailError)),
    phoneNumber: yup
      .string()
      .required(t(TRANSLAITIONS.requiredPhoneNumberError))
      .matches(/^[0-9]+$/, t(TRANSLAITIONS.matchesPhoneNumberError)),
    password: yup
      .string()
      .required(t(TRANSLAITIONS.requiredPasswordError))
      .min(8, t(TRANSLAITIONS.minPasswordError)),
    birthDay: yup
      .date()
      .required(t(TRANSLAITIONS.requiredBirthdayError))
      .nullable(),
    gender: yup.string().required(t(TRANSLAITIONS.requiredGenderError)),
  });

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
        marginTop: "5vh",
        marginBottom: "5vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexDirection: isNonMobile ? "row" : "column",
        }}
      >
        <Header
          title={t(TRANSLAITIONS.register_headerTitle)}
          subtitle={t(TRANSLAITIONS.register_headerSubtitle)}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <WarningAmberIcon sx={{ color: "orangered" }} />
          <Typography color="orangered" variant="body2" sx={{ marginTop: "5px" }}>
             (Email, Phone Number and Birthday) values can not be changed later.
          </Typography>
        </Box>
      </Box>

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
          setFieldValue,
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
                autoComplete="new-password"
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label={t(TRANSLAITIONS.firstNameLabel)}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={combinedStyles}
                required
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label={t(TRANSLAITIONS.lastNameLabel)}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={combinedStyles}
                required
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label={t(TRANSLAITIONS.addressLabel)}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={combinedStyles}
                required
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label={t(TRANSLAITIONS.phoneNumberLabel)}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={combinedStyles}
                required
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={t(TRANSLAITIONS.birthDayLabel)}
                  value={values.birthDay}
                  onChange={(value) => setFieldValue("birthDay", value)}
                  sx={datePickerStyles}
                  // renderInput={(params) => (
                  //   <TextField
                  //     {...params}
                  //     fullWidth
                  //     variant="outlined"
                  //     sx={inputStyles}
                  //     error={!!touched.birthDay && !!errors.birthDay}
                  //     helperText={touched.birthDay && errors.birthDay}
                  //     required
                  //   />
                  // )}
                />
              </LocalizationProvider>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel id="gender-label">
                  {t(TRANSLAITIONS.genderLabel)}
                </InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={values.gender}
                  label={t(TRANSLAITIONS.genderLabel)}
                  onChange={handleChange}
                  name="gender"
                  error={!!touched.gender && !!errors.gender}
                  // helperText={touched.gender && errors.gender}
                >
                  <MenuItem value="Male" sx={{ "& svg": { color: "#098ddd" } }}>
                    {t(TRANSLAITIONS.genderMale)} <ManIcon />
                  </MenuItem>
                  <MenuItem
                    value="Female"
                    sx={{ "& svg": { color: "#dd09c1" } }}
                  >
                    {t(TRANSLAITIONS.genderFemale)} <WomanIcon />
                  </MenuItem>
                </Select>
                {touched.gender && errors.gender && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ marginTop: "5px" }}
                  >
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Box display="flex" alignItems="center">
                <Typography
                  variant="h5"
                  color={colors.secondry}
                  sx={{ marginRight: "10px", textDecoration: "underline" }}
                >
                  {t(TRANSLAITIONS.register_headToLoginTitle)}
                </Typography>
                {i18n.language === "ar" ? (
                  <ArrowBackIcon sx={{ color: colors.black }} />
                ) : (
                  <ArrowForwardIcon sx={{ color: colors.black }} />
                )}
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
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
                  {t(TRANSLAITIONS.register_headToLoginButton)}
                </Button>
              </Box>
              <Box>
                <Button type="submit" color="secondary" variant="contained">
                  {t(TRANSLAITIONS.register_registerButton)}
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterForm;
