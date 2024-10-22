import { toast } from "react-toastify";
import { colorsType } from "../config/constants.ts";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const inputStyles = (colors: colorsType) => ({
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
});

export const gridColumnStyles = (colors: colorsType, columns: number = 2, compinedStyles: SxProps<Theme> = {}) => ({
  ...inputStyles(colors),
  gridColumn: `span ${columns}`,
  ...compinedStyles,
});

// TODO: Add severity level (error, warning, info, ...)
export const handleError = (err, defaultMessage: string = "Operation failed.", notFoundMessage: string = "Entities Not Found.") => {
  if (err?.name === 'AbortError') return;

  // check if error status is 404 then show a not found message
  
  if (err.response?.data?.ErrorMessage) {
    toast.error(err.response.data.ErrorMessage);
  } else {
    toast.error(defaultMessage);
  }
};