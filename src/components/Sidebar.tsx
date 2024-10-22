import React, { useState } from "react";
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
import { tokens } from "../theme.ts";
import { useTranslation } from "react-i18next";
import "react-pro-sidebar/dist/css/styles.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from '@mui/icons-material/Close';
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import CategoryIcon from "@mui/icons-material/Category";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Category, TRANSLAITIONS } from "../config/constants.ts";
import { DateRange } from "@mui/x-date-pickers-pro/models";

const COLORS_FOLDER = "../../assets/colors/";
const colorOptions = [
  "Beige",
  "Black",
  "Blue",
  "Brown",
  "Clear",
  "Gold",
  "Green",
  "Multicolour",
  "Orange",
  "Pink",
  "Purple",
  "Red",
  "Silver",
  "White",
  "Yellow",
];

type SidebarProps = {
  loading: boolean;
  priceRange: number[];
  onPriceChange: (event: Event, value: number | number[], activeThumb: number) => void;
  ratingRange: number[];
  onRatingChange: (event: Event, value: number | number[], activeThumb: number) => void;
  categories: Category[];
  selectedCategory: Category | null;
  onCategoryChange: (newValue: Category | null) => void;
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
  selectedDateRange: DateRange<Dayjs>;
  onDateRangeChange: (newValue: DateRange<dayjs.Dayjs>) => void;
  onClearFilters: () => void;
  onApplyFilter: () => void;
}

const Sidebar = ({
  loading,
  priceRange,
  onPriceChange,
  ratingRange,
  onRatingChange,
  categories,
  selectedCategory,
  onCategoryChange,
  selectedColors,
  onColorChange,
  selectedDateRange,
  onDateRangeChange,
  onClearFilters,
  onApplyFilter,
}: SidebarProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(!isNonMobile);

  const inputStyles = {
    "& .MuiInputLabel-root": { color: colors.black },
    "& .MuiInputBase-root": { color: colors.black },
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
    "& .MuiIconButton-root": {
      color: colors.black,
    },
  };

  const shortcutsItems = [
    {
      label: "This Week",
      getValue: () => {
        const today = dayjs();
        return [today.startOf("week"), today.endOf("week")];
      },
    },
    {
      label: "Last Week",
      getValue: () => {
        const today = dayjs();
        const prevWeek = today.subtract(7, "day");
        return [prevWeek.startOf("week"), prevWeek.endOf("week")];
      },
    },
    {
      label: "Last 7 Days",
      getValue: () => {
        const today = dayjs();
        return [today.subtract(7, "day"), today];
      },
    },
    {
      label: "Current Month",
      getValue: () => {
        const today = dayjs();
        return [today.startOf("month"), today.endOf("month")];
      },
    },
    {
      label: "Next Month",
      getValue: () => {
        const today = dayjs();
        const startOfNextMonth = today.endOf("month").add(1, "day");
        return [startOfNextMonth, startOfNextMonth.endOf("month")];
      },
    },
    { label: "Reset", getValue: () => [null, null] },
  ];

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
        width: isNonMobile ? undefined : (isCollapsed ? "0" : "100%"),
        height: isNonMobile ? undefined : "100%",
        zIndex: "992",
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: isNonMobile ? undefined : "fixed",
          height: isNonMobile ? undefined : isCollapsed ? "0px" : "100%",
          top: isNonMobile ? undefined : "0",
        }}
      >
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
                  {isCollapsed ? <FilterAltIcon /> : <CloseIcon />}
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
                    sx={{ color: colors.white }}
                  />
                </Box>
                <Slider
                  value={priceRange}
                  onChange={onPriceChange}
                  valueLabelDisplay="auto"
                  min={priceRange[0]}
                  max={priceRange[1]}
                  disableSwap={loading}
                  disabled={loading}
                  sx={{ marginTop: "2rem", color: colors.white }}
                />
                <Typography variant="body2" color={colors.black}>
                  {t(TRANSLAITIONS.sidebar_priceRange)}: EGP {`${priceRange[0]}`} - EGP {`${priceRange[1]}`}
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
                  <StarHalfIcon sx={{ color: colors.white }} />
                </Box>
                <Slider
                  value={ratingRange}
                  onChange={onRatingChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                  step={0.1}
                  disableSwap={loading}
                  disabled={loading}
                  sx={{ marginTop: "2rem", color: colors.white }}
                />
                <Typography variant="body2" color={colors.black}>
                  {t(TRANSLAITIONS.sidebar_ratingRange)}: {`${ratingRange[0]}`} - {" "}
                  {`${ratingRange[1]}`}
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
                  sx={{ direction: "ltr" }}
                  fullWidth
                  options={categories}
                  value={selectedCategory}
                  onChange={(event, value) => onCategoryChange(value)}
                  getOptionLabel={(option) => option.title}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.title}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={t(TRANSLAITIONS.categoryLabel)}
                      sx={inputStyles}
                    />
                  )}
                  disabled={loading}
                />
              </Box>

              {/* Color Filter */}
              <Box marginBottom="2rem">
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
                  sx={{ direction: "ltr" }}
                  fullWidth
                  multiple
                  options={colorOptions}
                  value={selectedColors}
                  onChange={(event, value) => onColorChange(value)}
                  renderOption={(props, option) => (
                    <li {...props} key={props.key}>
                      <img
                        src={`${COLORS_FOLDER}${option.toLowerCase()}.svg`}
                        alt={option}
                        style={{
                          marginRight: 8,
                          marginLeft: 8,
                          verticalAlign: "middle",
                        }}
                        width={20}
                        height={20}
                      />
                      {""}
                      {option}
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

              {/* Availability Filter */}
              <Box marginBottom="2rem">
                <Box display="flex" alignItems="center" marginBottom="15px">
                  <Typography
                    variant="h6"
                    color={colors.grey[700]}
                    sx={{ marginLeft: "15px", marginRight: "15px" }}
                  >
                    {t(TRANSLAITIONS.sidebar_byAvailability)}
                  </Typography>
                  <CalendarTodayIcon sx={{ color: colors.white }} />
                </Box>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {isNonMobile ? (
                    <DateRangePicker
                      localeText={{
                        start: t(TRANSLAITIONS.from),
                        end: t(TRANSLAITIONS.to),
                      }}
                      value={selectedDateRange}
                      onChange={(newValue) => onDateRangeChange(newValue)}
                      sx={{ color: colors.black }}
                      slotProps={{
                        shortcuts: {
                          items: shortcutsItems,
                        },
                        actionBar: { actions: [] },
                      }}
                      calendars={2}
                    />
                  ) : (
                    <MobileDateRangePicker />
                  )}
                </LocalizationProvider>
              </Box>

              {/* Buttons */}
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                marginTop="2rem"
              >
                <Button
                  variant="contained"
                  color="info"
                  onClick={onClearFilters}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={onApplyFilter}
                >
                  {t(TRANSLAITIONS.sidebar_applyButton)}
                </Button>
              </Box>
            </Box>
          )}
        </Menu>
      </ProSidebar>

      {!isNonMobile && (
        <Box
          sx={{
            position: "absolute",
            top: "90vh",
            left: "5vw",
            borderRadius: "10px",
            background: colors.secondry,
            zIndex: "999",
            display: isCollapsed ? "block" : "none",
          }}
        >
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <FilterAltIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
