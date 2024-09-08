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
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import Alert from "@mui/material/Alert";
import Loading from "../../components/Loading";
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
  APPBAR_HEIGHT,
  TRANSLAITIONS,
} from "../../config/constants";
import { useTranslation } from "react-i18next";

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

const ListProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    isForRent: false,
    priceForRent: "",
    depositAmount: "",
    isForSale: false,
    priceForSale: "",
    condition: "",
    size: "",
    color: [],
    city: "",
    availability: [null, null],
    images: [],
    category: null,
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const MAX_FILES = 4;

  const handleFileChange = (event) => {
    setError(null);
    const newFiles = Array.from(event.target.files);

    if (selectedFiles.length + newFiles.length > MAX_FILES) {
      setError(`You can only upload a maximum of ${MAX_FILES} images.`);
      return;
    }

    // Append new files to the existing ones
    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);

    // Generate previews for the newly selected files
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setUploadedFiles((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleDeleteFile = (index) => {
    // Remove file from the selectedFiles array
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    // Remove preview for the corresponding file
    const updatedPreviews = [...uploadedFiles];
    updatedPreviews.splice(index, 1);
    setUploadedFiles(updatedPreviews);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const response = await axiosPrivate.get("/Category/");
        const objectFromAxios = [
          {
            id: 1,
            name: "Dress",
          },
        ];
        setCategories(objectFromAxios);
      } catch (error) {
        setError("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleFormSubmit = async (values) => {
    // check if isForSale and isForRent are both false
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file); // 'images' should match the field expected by your API
    });
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("isForRent", values.isForRent);
    formData.append("priceForRent", values.priceForRent);
    formData.append("depositAmount", values.depositAmount);
    formData.append("isForSale", values.isForSale);
    formData.append("priceForSale", values.priceForSale);
    formData.append("condition", values.condition);
    values?.size && formData.append("color", values.color);
    formData.append("availability", values.availability);
    formData.append("priceForRent", values.priceForRent);
    formData.append("category", values.category);

    try {
      const response = await axiosPrivate.post("/Product/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.Success && response?.data?.StatusCode === 200) {
        setSuccess("Product added successfully!");
      } else {
        throw new Error(
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
    name: yup
      .string()
      .min(4, t(TRANSLAITIONS.minNameError))
      .max(30, t(TRANSLAITIONS.maxNameError))
      .required(t(TRANSLAITIONS.requiredNameError)),
    description: yup
      .string()
      .min(4, t(TRANSLAITIONS.minDescriptionError))
      .max(500, t(TRANSLAITIONS.maxDescriptionError))
      .required(t(TRANSLAITIONS.requiredDescriptionError)),
    isForRent: yup.boolean(),
    priceForRent: yup
      .number(t(TRANSLAITIONS.numberPriceError))
      .test(
        "isForRent-required",
        t(TRANSLAITIONS.requiredRentPriceError),
        function (value) {
          return this.parent.isForRent ? value !== undefined : true;
        }
      )
      .test(
        "isForRent-positive",
        t(TRANSLAITIONS.positivePriceError),
        function (value) {
          return this.parent.isForRent ? value > 0 : true;
        }
      ),
    depositAmount: yup
      .number(t(TRANSLAITIONS.numberDepositError))
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
          return this.parent.isForRent ? value > 0 : true;
        }
      ),
    isForSale: yup.boolean(),
    priceForSale: yup
      .number(t(TRANSLAITIONS.numberPriceError))
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
          if (category && ["Dress", "Clothes"].includes(category.name)) {
            return !!value; // Return true if value is present, false if it's missing
          }
          return true; // If category is not Dress or Clothes, size is not required
        }
      ),
    color: yup
      .array()
      .of(yup.string().required(t(TRANSLAITIONS.requiredColorEachError)))
      .min(1, t(TRANSLAITIONS.minColorError))
      .max(4, "Max 4 colors")
      .required(t(TRANSLAITIONS.requiredColorError)),
    city: yup.string().required(t(TRANSLAITIONS.requiredCityError)),
    availability: yup
      .array()
      .of(yup.date())
      .test(
        "availability",
        t(TRANSLAITIONS.rangeAvailabilityError),
        function (value) {
          const { isForRent } = this.parent;
          if (!isForRent) return true; // Skip validation if not for rent
          if (!Array.isArray(value) || value.length !== 2) return false; // Must be an array with two dates
          const [startDate, endDate] = value;
          return (
            startDate instanceof Date &&
            endDate instanceof Date &&
            startDate < endDate
          );
        }
      ),
    images: yup
      .array()
      .min(4, t(TRANSLAITIONS.minMaxImagesError))
      .max(MAX_FILES, t(TRANSLAITIONS.minMaxImagesError))
      .required(t(TRANSLAITIONS.requiredImagesError)),
    category: yup.object().required(t(TRANSLAITIONS.requiredCategoryError)),
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
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                  background: colors.white,
                },
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                label={t(TRANSLAITIONS.list_productNameLabel)}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={inputStyles}
                required
              />
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
                helperText={touched.description && errors.description}
                sx={combinedStyles}
                required
              />
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
                helperText={touched.condition && errors.condition}
                sx={inputStyles}
                required
              >
                {conditionOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
                helperText={touched.size && errors.size}
                sx={inputStyles}
              >
                {sizeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <Autocomplete
                fullWidth
                multiple
                options={colorOptions}
                value={values.color}
                onChange={(event, value) => setFieldValue("color", value)}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                renderOption={(props, option) => (
                  <li {...props}>
                    <img
                      src={option.svg_url}
                      alt={option.name}
                      style={{ marginRight: 8, verticalAlign: "middle" }}
                      width={20}
                      height={20}
                    />
                    {""}
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={t(TRANSLAITIONS.list_colourLabel)}
                    sx={customCombinedStyles}
                  />
                )}
              />

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
                    helperText={touched.city && errors.city}
                    sx={inputStyles}
                    required
                  />
                )}
                onChange={(event, value) => setFieldValue("city", value)}
              />

              <Autocomplete
                fullWidth
                options={categories}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={t(TRANSLAITIONS.list_categoryLabel)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category ? values.category.name : ""}
                    name="category"
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                    sx={inputStyles}
                    required
                  />
                )}
                onChange={(event, value) => setFieldValue("category", value)}
              />

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
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={t(TRANSLAITIONS.list_rentPriceLabel)}
                    type="number"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.priceForRent}
                    name="priceForRent"
                    error={!!touched.priceForRent && !!errors.priceForRent}
                    helperText={touched.priceForRent && errors.priceForRent}
                    sx={inputStyles}
                    required
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={t(TRANSLAITIONS.list_depositAmountLabel)}
                    type="number"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.depositAmount}
                    name="depositAmount"
                    error={!!touched.depositAmount && !!errors.depositAmount}
                    helperText={touched.depositAmount && errors.depositAmount}
                    sx={inputStyles}
                    required
                  />
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    label={t(TRANSLAITIONS.list_availabilityStartLabel)}
                    onBlur={handleBlur}
                    onChange={(event) =>
                      setFieldValue("availability[0]", event.target.value)
                    }
                    value={values.availability[0] || ""}
                    name="availability[0]"
                    error={
                      !!touched.availability?.[0] && !!errors.availability?.[0]
                    }
                    helperText={
                      touched.availability?.[0] && errors.availability?.[0]
                    }
                    InputLabelProps={{ shrink: true }}
                    sx={inputStyles}
                    required
                  />
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    label={t(TRANSLAITIONS.list_availabilityEndLabel)}
                    onBlur={handleBlur}
                    onChange={(event) =>
                      setFieldValue("availability[1]", event.target.value)
                    }
                    value={values.availability[1] || ""}
                    name="availability[1]"
                    error={
                      !!touched.availability?.[1] && !!errors.availability?.[1]
                    }
                    helperText={
                      touched.availability?.[1] && errors.availability?.[1]
                    }
                    InputLabelProps={{ shrink: true }}
                    sx={inputStyles}
                    required
                  />
                </>
              )}
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
                <TextField
                  fullWidth
                  variant="outlined"
                  label={t(TRANSLAITIONS.list_salePriceLabel)}
                  type="number"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.priceForSale}
                  name="priceForSale"
                  error={!!touched.priceForSale && !!errors.priceForSale}
                  helperText={touched.priceForSale && errors.priceForSale}
                  sx={inputStyles}
                  required
                />
              )}

              {/* File input for selecting multiple images */}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ marginTop: "20px" }}
              />
              <Box mt={2}>
                {uploadedFiles.length > 0 && (
                  <Box display="flex" flexWrap="wrap">
                    {uploadedFiles.map((file, index) => (
                      <Box sx={{position: 'relative', display: 'inline-block'}}>
                        <Box
                          key={index}
                          component="img"
                          src={file}
                          alt={`upload-${index}`}
                          width="100px"
                          height="100px"
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                        />
                        <button
                          onClick={() => handleDeleteFile(index)}
                          style={{ position: "absolute", top: 0, right: 0 }}
                        >
                          X
                        </button>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" variant="contained" color="secondary">
                {t(TRANSLAITIONS.list_listButton)}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default ListProduct;
