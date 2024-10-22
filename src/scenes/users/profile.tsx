import React from "react";
import {
  Box,
  Button,
  TextField,
  Container,
  useTheme,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { tokens } from "../../theme.ts";
import Header from "../../components/Header.tsx";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";
import useAuth from "../../hooks/useAuth.ts";

import Alert from "@mui/material/Alert";
import Loading from "../../components/Loading.tsx";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
  APPBAR_HEIGHT,
  TRANSLAITIONS,
  ALERT_TIMEOUT,
} from "../../config/constants.ts";
import { useTranslation } from "react-i18next";

type UserDetails = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  address: string | null;
  birthDay: Date | null;
  gender: string | null;
};

const Profile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [initialValues] = React.useState<UserDetails>({
    email: auth?.user?.email || "",
    firstName: auth?.user?.firstName || "",
    lastName: auth?.user?.lastName || "",
    phoneNumber: auth?.user?.phoneNumber || "",
    address: auth?.user?.address || "",
    birthDay: auth?.user?.birthDay || null,
    gender: auth?.user?.gender || "Male",
  });

  const handleFormSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosPrivate.post("/Account/update", values);

      if (response?.data?.Success && response?.data?.StatusCode === 200) {
        navigate("/");
      } else {
        let message = response?.data?.ErrorMessage || "Unknown error";
        throw new Error(`Operation Failed: ${message}`);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, ALERT_TIMEOUT);
    }
  };

  const handleError = (err) => {
    if (err?.name === "AbortError") return;

    if (err.response?.data?.ErrorMessage) {
      setError(err.response.data.ErrorMessage);
    } else {
      setError(t(TRANSLAITIONS.operationFailedError));
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

  const readOnlyStyles = {
    ...inputStyles,
    "& .MuiInputBase-input": {
      cursor: "not-allowed !important",
    },
  };

  const readOnlyDatePickerStyles = {
    ...inputStyles,
    "& .css-1h9uykw-MuiInputBase-input-MuiOutlinedInput-input": {
      color: colors.black,
    },
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Header title={t(TRANSLAITIONS.profile_headerTitle)} subtitle="" />

        <Box
          sx={{
            display: "flex",
            gap: "5px",
          }}
        >
          <Tooltip
            title={t(TRANSLAITIONS.profile_roleTooltip)}
            placement="top"
            arrow
          >
            <>
              <Chip
                label={t(TRANSLAITIONS.ownerRole)}
                sx={{ backgroundColor: colors.redAccent[300] }}
              />
              <Chip
                label={t(TRANSLAITIONS.tenantRole)}
                sx={{ backgroundColor: colors.greenAccent[300] }}
              />
            </>
          </Tooltip>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginBottom: "50px" }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ marginBottom: "50px" }}>
          {success}
        </Alert>
      )}

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          dirty,
          isValid,
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
                sx={readOnlyStyles}
                InputProps={{
                  readOnly: true,
                }}
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
                sx={inputStyles}
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
                sx={inputStyles}
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
                sx={readOnlyStyles}
                InputProps={{
                  readOnly: true,
                }}
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

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={t(TRANSLAITIONS.birthDayLabel)}
                  value={dayjs(values.birthDay)}
                  sx={readOnlyDatePickerStyles}
                  readOnly
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
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={!dirty || !isValid}
              >
                {t(TRANSLAITIONS.profile_updateButton)}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  address: yup.string().required("Address is required"),
  gender: yup.string().required("Gender is required"),
});

export default Profile;
