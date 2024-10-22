import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Container,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  MenuItem,
  useTheme,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.ts";
import { tokens } from "../../../theme.ts";
import dayjs from "dayjs";
import { fetchCategories } from "../../../api/categories/index.ts";
import { fetchProduct } from "../../../api/products/index.ts";
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
  APPBAR_HEIGHT,
  TRANSLAITIONS,
  Category,
  Availability,
  Product,
} from "../../../config/constants.ts";
import { useTranslation } from "react-i18next";
import Header from "../../../components/Header.tsx";
import Loading from "../../../components/Loading.tsx";
import AvailabilityCalendar from "../../../components/AvailabilityCalendar.tsx";
import DragDropFileUpload from "../../../components/DragDropFileUpload.tsx";

const egyptianCities = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Shubra El-Kheima",
  "Port Said",
  "Suez",
  "El Mahalla El Kubra",
  "Luxor",
  "Mansoura",
  "Tanta",
  "Asyut",
  "Ismailia",
  "Faiyum",
  "Zagazig",
  "Aswan",
  "Damietta",
  "Damanhur",
  "Minya",
  "Beni Suef",
  "Hurghada",
  "Qena",
  "Sohag",
  "Shibin El Kom",
  "Banha",
  "Arish",
  "Mallawi",
  "10th of Ramadan City",
  "Bilbais",
  "Marsa Matruh",
  "Idfu",
  "Mit Ghamr",
  "Al-Hamidiyah",
  "Desouk",
  "Qalyub",
  "Abu Kabir",
  "Kafr el-Sheikh",
  "Girga",
  "Akhmim",
  "Matareya",
  "Manfalut",
  "Beni Mazar",
  "Tala",
  "Ashmoun",
];

const conditionOptions = ["New", "Like New", "Good", "Acceptable"];
const sizeOptions = ["S", "M", "L", "XL"];

const COLORS_FOLDER = "../../assets/colors/";
const colorOptions = [
  { name: "Beige", svg_url: COLORS_FOLDER + "beige.svg" },
  { name: "Black", svg_url: COLORS_FOLDER + "black.svg" },
  { name: "Blue", svg_url: COLORS_FOLDER + "blue.svg" },
  { name: "Brown", svg_url: COLORS_FOLDER + "brown.svg" },
  { name: "Clear", svg_url: COLORS_FOLDER + "clear.svg" },
  { name: "Gold", svg_url: COLORS_FOLDER + "gold.svg" },
  { name: "Green", svg_url: COLORS_FOLDER + "green.svg" },
  { name: "Multicolour", svg_url: COLORS_FOLDER + "multicolour.svg" },
  { name: "Orange", svg_url: COLORS_FOLDER + "orange.svg" },
  { name: "Pink", svg_url: COLORS_FOLDER + "pink.svg" },
  { name: "Purple", svg_url: COLORS_FOLDER + "purple.svg" },
  { name: "Red", svg_url: COLORS_FOLDER + "red.svg" },
  { name: "Silver", svg_url: COLORS_FOLDER + "silver.svg" },
  { name: "White", svg_url: COLORS_FOLDER + "white.svg" },
  { name: "Yellow", svg_url: COLORS_FOLDER + "yellow.svg" },
];

const ViewList = () => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [initialValues, setInitialValues] = useState<Product | null>({
    id: id || "1",
    title: "",
    description: "",
    isForSale: false,
    price: 0.0,
    rating: 0.0,
    condition: "",
    size: "",
    colors: [],
    city: "",
    category: null,
    images: null,
    isForRent: false,
    depositAmount: 0.0,
    availability: [],
  });
  const [availabilities, setAvailabilities] = useState<Availability[]>([
    {
      id: "66db0e06-56c8-800a-92d6-617f95957af2",
      startDate: new Date("2024-08-01"),
      endDate: new Date("2024-08-03"),
      price: 250,
      status: "Available",
      productId: "1",
    },
    {
      id: "66db0e06-56c8-800a-92d6-617f95957af3",
      startDate: new Date("2024-09-02"),
      endDate: new Date("2024-09-04"),
      price: 150,
      status: "Unavailable",
      productId: "1",
    },
  ]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); //change later

  React.useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetchProduct(axiosPrivate, `/Product/${id}`);

        setInitialValues(response.data || null);
        // setSelectedFiles()
      } catch (error) {
        setError("Failed to fetch product");
      }
    };

    fetchList();
  }, [id]);

  React.useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchCategories(axiosPrivate);

        response.data && setCategories(response.data);
      } catch (error) {
        setError("Failed to fetch categories");
      }
    };

    fetchCategoriesData();
  }, []);

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const handleError = (err) => {
    setError(
      err.response?.data?.ErrorMessage ||
        "Operation Failed, Please Try Again Later!"
    );
  };

  const inputStyles = {
    "& .MuiInputLabel-root": { color: "black" },
    "& .MuiInputBase-root": { color: "black" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: colors.secondry,
      },
      "&:hover fieldset": {
        borderColor: colors.secondry,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.black,
      },
    },
    "& .MuiFormLabel-root": {
      color: colors.black,
    },
    "& .MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-popupIndicator.css-10sixfi-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator":
      {
        color: colors.black,
      },
    "& .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-clearIndicator.css-1cleyyo-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator":
      {
        color: colors.black,
      },
  };

  const combinedStyles = {
    ...inputStyles,
    gridColumn: "span 2",
  };

  const customCombinedStyles = {
    ...inputStyles,
    gridColumn: "span 2",
    "& .MuiButtonBase-root.MuiAutocomplete-tag": {
      color: "black !important",
      backgroundColor: colors.secondry,
    },
    "& .css-1naoyw1-MuiButtonBase-root-MuiChip-root .MuiChip-deleteIcon": {
      color: "#2b2222 !important",
      backgroundColor: colors.secondry,
    },
  };

  const checkoutSchema = yup.object().shape({
    title: yup
      .string()
      .min(4, t(TRANSLAITIONS.minTitleError))
      .max(30, t(TRANSLAITIONS.maxTitleError))
      .required(t(TRANSLAITIONS.requiredTitleError)),
    description: yup
      .string()
      .min(4, t(TRANSLAITIONS.minDescriptionError))
      .max(500, t(TRANSLAITIONS.maxDescriptionError))
      .required(t(TRANSLAITIONS.requiredDescriptionError)),
    isForRent: yup.boolean(),
    depositAmount: yup
      .number()
      .test(
        "isForRent-required",
        t(TRANSLAITIONS.requiredDepositError),
        function (value) {
          return this.parent.isForRent ? value !== undefined : true;
        }
      )
      .test(
        "isForRent-positive",
        t(TRANSLAITIONS.positiveDepositError),
        function (value) {
          if (!value) {
            return this.parent.isForRent ? false : true;
          }
          return this.parent.isForRent ? value > 0 : true;
        }
      ),
    isForSale: yup.boolean(),
    price: yup
      .number()
      .test(
        "isForSale-required",
        t(TRANSLAITIONS.requiredSalePriceError),
        function (value) {
          return this.parent.isForSale ? value !== undefined : true;
        }
      )
      .test(
        "isForSale-positive",
        t(TRANSLAITIONS.positivePriceError),
        function (value) {
          if (!value) {
            return this.parent.isForSale ? false : true;
          }
          return this.parent.isForSale ? value > 0 : true;
        }
      ),
    condition: yup.string().required(t(TRANSLAITIONS.requiredConditionError)),
    size: yup
      .string()
      .test(
        "isCategory-Clothes",
        t(TRANSLAITIONS.requiredSizeError),
        function (value) {
          const { category } = this.parent;
          if (category && ["Dress", "Clothes"].includes(category)) {
            return !!value; // Return true if value is present, false if it's missing
          }
          return true; // If category is not Dress or Clothes, size is not required
        }
      ),
    colors: yup
      .array()
      .of(yup.string().required(t(TRANSLAITIONS.requiredColorEachError)))
      .min(1, t(TRANSLAITIONS.minColorError))
      .max(4, "Max 4 colors")
      .required(t(TRANSLAITIONS.requiredColorError)),
    city: yup.string().required(t(TRANSLAITIONS.requiredCityError)),
    category: yup
      .object()
      .required(t(TRANSLAITIONS.requiredCategoryError))
      .test(
        "isCategoryProvided",
        t(TRANSLAITIONS.requiredCategoryError),
        function (value) {
          return !!value;
        }
      ),
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
        margin: "50px auto",
      }}
    >
      <Header
        title={t(TRANSLAITIONS.list_headerTitle)}
        subtitle={t(TRANSLAITIONS.list_headerSubtitle)}
      />

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
          dirty,
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
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                  background: colors.white,
                },
              }}
            >
                            
              {/* Title */}
              <TextField
                fullWidth
                variant="outlined"
                label={t(TRANSLAITIONS.list_productTitleLabel)}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={
                  touched.title && typeof errors.title === "string"
                    ? errors.title
                    : undefined
                }
                sx={inputStyles}
                required
              />
              
              {/* Description */}
              <TextField
                fullWidth
                multiline
                variant="outlined"
                label={t(TRANSLAITIONS.list_descriptionLabel)}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={
                  touched.description && typeof errors.description === "string"
                    ? errors.description
                    : undefined
                }
                sx={combinedStyles}
                required
              />
              
              {/* Condition */}
              <TextField
                fullWidth
                select
                variant="outlined"
                label={t(TRANSLAITIONS.list_conditionLabel)}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.condition}
                name="condition"
                error={!!touched.condition && !!errors.condition}
                helperText={
                  touched.condition && typeof errors.condition === "string"
                    ? errors.condition
                    : undefined
                }
                sx={inputStyles}
                required
              >
                {conditionOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              {/* Size */}
              <TextField
                fullWidth
                select
                variant="outlined"
                label={t(TRANSLAITIONS.list_sizeLabel)}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.size}
                name="size"
                error={!!touched.size && !!errors.size}
                helperText={
                  touched.size && typeof errors.size === "string"
                    ? errors.size
                    : undefined
                }
                sx={inputStyles}
              >
                {sizeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              {/* Colors */}
              <Autocomplete
                fullWidth
                multiple
                options={colorOptions}
                onChange={(event, newValue) =>
                  setFieldValue(
                    "colors",
                    newValue.map((item) => item?.name || "")
                  )
                }
                value={values?.colors?.map((name: string) =>
                  colorOptions.find((option) => option.name === name)
                )}
                getOptionLabel={(option) => option?.name || ""}
                isOptionEqualToValue={(option, value) =>
                  option?.name === value?.name
                }
                renderOption={(props, option) => {
                  const { key, ...rest } = props;
                  return (
                    <li key={key} {...rest}>
                      <img
                        src={option?.svg_url}
                        alt={option?.name}
                        style={{ marginRight: 8, verticalAlign: "middle" }}
                        width={20}
                        height={20}
                      />
                      {""}
                      {option?.name}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={t(TRANSLAITIONS.list_colourLabel)}
                    sx={customCombinedStyles}
                  />
                )}
              />

              {/* City */}
              <Autocomplete
                fullWidth
                options={egyptianCities}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={t(TRANSLAITIONS.cityLabel)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.city}
                    name="city"
                    error={!!touched.city && !!errors.city}
                    helperText={
                      touched.city && typeof errors.city === "string"
                        ? errors.city
                        : undefined
                    }
                    sx={inputStyles}
                    required
                  />
                )}
                onChange={(event, value) => setFieldValue("city", value)}
                value={values.city}
              />

              {/* Category */}
              <Autocomplete
                fullWidth
                options={categories}
                getOptionLabel={(option) => option.title || ""}
                isOptionEqualToValue={(option, value) => option.id === value?.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={t(TRANSLAITIONS.categoryLabel)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category ? values.category.title : ""}
                    name="category"
                    error={!!touched.category && !!errors.category}
                    sx={inputStyles}
                    required
                  />
                )}
                onChange={(event, value) => setFieldValue("category", value || null)}
                value={values.category || null}
              />

              {/* IsForRent */}
              <FormControlLabel
                sx={{
                  color: colors.greenAccent[500],
                  "& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-havevq-MuiSvgIcon-root":
                    {
                      color: colors.greenAccent[500],
                    },
                }}
                control={
                  <Checkbox
                    checked={values.isForRent}
                    onChange={handleChange}
                    name="isForRent"
                    sx={{
                      color: colors.greenAccent[500],
                    }}
                  />
                }
                label={t(TRANSLAITIONS.list_isForRentLabel)}
              />
              {values.isForRent && (
                <>
                  {/* Deposit Amount */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={t(TRANSLAITIONS.list_depositAmountLabel)}
                    type="number"
                    inputMode="numeric"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.depositAmount}
                    name="depositAmount"
                    error={!!touched.depositAmount && !!errors.depositAmount}
                    helperText={
                      touched.depositAmount &&
                      typeof errors.depositAmount === "string"
                        ? errors.depositAmount
                        : undefined
                    }
                    sx={inputStyles}
                    required
                  />

                  {/* AvailabilityCalendar */}
                  <AvailabilityCalendar
                    availabilities={availabilities}
                    setAvailabilities={setAvailabilities}
                  />
                </>
              )}

              {/* IsForSale */}
              <FormControlLabel
                sx={{
                  color: colors.greenAccent[500],
                  "& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-havevq-MuiSvgIcon-root":
                    {
                      color: colors.greenAccent[500],
                    },
                }}
                control={
                  <Checkbox
                    sx={{
                      color: colors.greenAccent[500],
                    }}
                    checked={values.isForSale}
                    onChange={handleChange}
                    name="isForSale"
                  />
                }
                label={t(TRANSLAITIONS.list_isForSaleLabel)}
              />

              {values.isForSale && (

                // Sale Price
                <TextField
                  fullWidth
                  variant="outlined"
                  label={t(TRANSLAITIONS.list_salePriceLabel)}
                  type="number"
                  inputMode="numeric"
                  value={values.price}
                  onChange={handleChange}
                  name="price"
                  onBlur={handleBlur}
                  error={!!touched.price && !!errors.price}
                  helperText={
                    touched.price && typeof errors.price === "string"
                      ? errors.price
                      : undefined
                  }
                  sx={inputStyles}
                  required
                />
              )}

              {/* File input for selecting multiple images */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  border: `2px solid ${colors.secondry}`,
                  alignItems: "center",
                  padding: "15px",
                  gridColumn: "span 4",
                  gridRow: "span 4",
                }}
              >
                {/* <DragDropFileUpload /> */}
              </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={!dirty}
              >
                {t(TRANSLAITIONS.updateButton)}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default ViewList;
