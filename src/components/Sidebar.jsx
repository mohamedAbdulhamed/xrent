import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Slider,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import { tokens } from "../theme";
import { useTranslation } from 'react-i18next';
import "react-pro-sidebar/dist/css/styles.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { TRANSLAITIONS } from "../config/constants";

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

const Sidebar = ({
  minPriceRange,
  maxPriceRange,
  priceRange,
  onPriceChange,
  ratingRange,
  onRatingChange,
  categories,
  selectedCategory,
  onCategoryChange,
  selectedColors,
  onColorChange,
  handleApplyFilter
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const inputStyles = {
    "& .MuiInputLabel-root": { color: colors.black },
    "& .MuiInputBase-root": { color: colors.black },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: colors.secondary,
      },
      "&:hover fieldset": {
        borderColor: colors.secondary,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.black,
      },
    },
    "& .MuiFormLabel-root": {
      color: colors.black,
    },
    "& .MuiIconButton-root": {
      color: colors.black,
    },
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.main} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <FilterAltIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.black}>
                  {t(TRANSLAITIONS.sidebar_header)}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <FilterAltIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box padding="0 10%">
              {/* Price Filter */}
              <Box marginBottom="2rem">
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="h6"
                    color={colors.grey[700]}
                    sx={{ marginLeft: "15px", marginRight: "15px" }}
                  >
                    {t(TRANSLAITIONS.sidebar_byPrice)}
                  </Typography>
                  <PriceChangeIcon
                    sx={{ color: colors.white + " !important" }}
                  />
                </Box>
                <Slider
                  value={priceRange}
                  onChange={onPriceChange}
                  valueLabelDisplay="auto"
                  min={minPriceRange}
                  max={maxPriceRange}
                  sx={{ marginTop: "2rem", color: colors.white }}
                />
                <Typography variant="body2" color={colors.black}>
                  {t(TRANSLAITIONS.sidebar_priceRange)}: EGP {priceRange[0]} - EGP {priceRange[1]}
                </Typography>
              </Box>

              {/* Rating Filter */}
              <Box marginBottom="2rem">
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="h6"
                    color={colors.grey[700]}
                    sx={{ marginLeft: "15px", marginRight: "15px" }}
                  >
                    {t(TRANSLAITIONS.sidebar_byRating)}
                  </Typography>
                  <StarHalfIcon sx={{ color: colors.white + " !important" }} />
                </Box>
                <Slider
                  value={ratingRange}
                  onChange={onRatingChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                  step={0.1}
                  sx={{ marginTop: "2rem", color: colors.white }}
                />
                <Typography variant="body2" color={colors.black}>
                  {t(TRANSLAITIONS.sidebar_ratingRange)}: {ratingRange[0]} - {ratingRange[1]}
                </Typography>
              </Box>

              {/* Category Filter */}
              <Box marginBottom="2rem">
                <Box display="flex" alignItems="center" marginBottom="15px">
                  <Typography
                    variant="h6"
                    color={colors.grey[700]}
                    sx={{ marginLeft: "15px", marginRight: "15px" }}
                  >
                    {t(TRANSLAITIONS.sidebar_byCategory)}
                  </Typography>
                  <CategoryIcon sx={{ color: colors.white + " !important" }} />
                </Box>
                <Autocomplete
                  fullWidth
                  options={[...categories, ""]}
                  value={selectedCategory}
                  onChange={(event, value) => onCategoryChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={t(TRANSLAITIONS.sidebar_categoryAutocompleteLabel)}
                      sx={inputStyles}
                    />
                  )}
                />
              </Box>

              {/* Color Filter */}
              <Box>
                <Box display="flex" alignItems="center" marginBottom="15px">
                  <Typography
                    variant="h6"
                    color={colors.grey[700]}
                    sx={{ marginLeft: "15px", marginRight: "15px" }}
                  >
                    {t(TRANSLAITIONS.sidebar_byColour)}
                  </Typography>
                  <ColorLensIcon sx={{ color: colors.white }} />
                </Box>
                <Autocomplete
                  fullWidth
                  multiple
                  options={colorOptions}
                  value={selectedColors}
                  onChange={(event, value) => onColorChange(value)}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  renderOption={(props, option) => (
                    <li {...props}>
                      <img
                        src={option.svg_url}
                        alt={option.name}
                        style={{ marginRight: 8, marginLeft: 8, verticalAlign: "middle" }}
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
                      label={t(TRANSLAITIONS.sidebar_colourAutocompleteLabel)}
                      sx={inputStyles}
                    />
                  )}
                />
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="2rem"
              >
                <Button variant="contained" color="secondary" onClick={handleApplyFilter}>
                  {t(TRANSLAITIONS.sidebar_applyButton)}
                </Button>
              </Box>
            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
