import React, { Dispatch, SetStateAction, useState } from "react";

import {
  Box,
  useTheme,
  Typography,
  Button,
  TextField,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../theme.ts";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { TRANSLAITIONS, Availability } from "../config/constants.ts";
import { useTranslation } from "react-i18next";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface AvailabilityCalendarProps {
  availabilities: Availability[];
  setAvailabilities: Dispatch<SetStateAction<Availability[]>>;
}

const AvailabilityCalendar = ({
  availabilities,
  setAvailabilities,
}: AvailabilityCalendarProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)"); // is 600 or more (Mobile is excluded)
  const isNonTablet = useMediaQuery("(min-width:1280px)"); // is 1280 or more (Mobile, Tablet and small Labtop are excluded)
  const { t } = useTranslation();
  const [price, setPrice] = useState<number>(0);
  const [selectedDates, setSelectedDates] = useState<DateRange<Dayjs>>([
    dayjs("2024-04-17"),
    dayjs("2024-04-21"),
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAvailability, setSelectedAvailability] =
    useState<Availability | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    availability: Availability
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedAvailability(availability);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (selectedAvailability) {
      // call backend
      setAvailabilities(
        availabilities.filter((avail) => avail.id !== selectedAvailability.id)
      );
    }
    handleClose();
  };

  const handleAddAvailablity = () => {
    if (!selectedDates[0] || !selectedDates[1]) {
      alert("Please select a valid start and end date.");
      return;
    }

    if (price <= 0) {
      alert("Please set a valid price.");
      return;
    }

    const availability: Availability = {
      id: "66db0e06-56c8-800a-92d6-617f95957af4", // remove
      startDate: selectedDates[0].toDate(),
      endDate: selectedDates[1].toDate(),
      price,
      status: "Available", // remove
      productId: "1", // remove
    };

    setAvailabilities([...availabilities, availability]);
  };

  const handleEdit = () => {
    if (selectedAvailability) {
      setPrice(selectedAvailability.price);
      setSelectedDates([
        dayjs(selectedAvailability.startDate),
        dayjs(selectedAvailability.endDate),
      ]);
      setIsEditDialogOpen(true);
    }
    handleClose();
  };

  const handleSaveEdit = () => {
    if (selectedAvailability) {
      const [startDate, endDate] = selectedDates;

      if (!startDate || !endDate) return;

      const updatedAvailability: Availability = {
        ...selectedAvailability,
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
        price,
      };

      setAvailabilities(
        availabilities.map((avail) =>
          avail.id === selectedAvailability.id ? updatedAvailability : avail
        )
      );
      setIsEditDialogOpen(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false);
  };

  const formatDate = (date: Date): string => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${dayName} ${day}-${month}-${year}`;
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

  const calenderStyles = {
    direction: "ltr",
    width: "100%",
    backgroundColor: "#1c1c1c",
    borderRadius: "8px",
    padding: "16px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isNonMobile ? "row" : "column",
        alignItems: isNonMobile ? undefined : "center",
        gridColumn: "span 4",
        "& span.focus": {
          color: colors.black,
        },
      }}
    >
      {/* Calender Input */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: isNonMobile ? "50%" : "100%",
          gap: "5vh",
        }}
      >
        <Typography variant="h2" color={colors.black}>
          {t(TRANSLAITIONS.availabilityCalendar_title)}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangeCalendar"]}>
            {isNonMobile ? (
              <DateRangeCalendar
                value={selectedDates}
                onChange={setSelectedDates}
                sx={calenderStyles}
                calendars={isNonTablet ? 2 : 1}
              />
            ) : (
              <MobileDateRangePicker sx={calenderStyles} />
            )}
          </DemoContainer>
        </LocalizationProvider>

        <Typography variant="body1" color={colors.greenAccent[500]}>
          {t(TRANSLAITIONS.from)}:{" "}
          <span className="focus">
            {selectedDates[0] ? selectedDates[0].format("YYYY-MM-DD") : "N/A"}
          </span>{" "}
          | {t(TRANSLAITIONS.to)}:{" "}
          <span className="focus">
            {selectedDates[1] ? selectedDates[1].format("YYYY-MM-DD") : "N/A"}
          </span>
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          gap="30px"
          alignItems="center"
        >
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            label={t(TRANSLAITIONS.rentPriceLabel)}
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
            name="price"
            sx={inputStyles}
            required
          />
          <Button
            onClick={handleAddAvailablity}
            color="primary"
            variant="outlined"
            sx={{
              textWrap: "nowrap",
              width: "50%",
              height: "fit-content",
              color: colors.black,
              backgroundColor: "#b665cbb5",
            }}
          >
            {t(TRANSLAITIONS.availabilityCalendar_addButton)}
          </Button>
        </Box>
      </Box>

      {/* Added Availabilities */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: isNonMobile ? "50%" : "100%",
          color: colors.black,
          overflowY: "scroll",
          maxHeight: "70vh",
        }}
      >
        <Typography variant="h2" color={colors.black}>
          {t(TRANSLAITIONS.availabilityCalendar_title2)}
        </Typography>
        {availabilities.map((availability) => (
          <Box
            key={availability.id}
            sx={{ margin: "10px", display: "flex", alignItems: "center" }}
          >
            <Typography variant="body1" color={colors.greenAccent[500]}>
              {t(TRANSLAITIONS.from)}:{" "}
              <span className="focus">
                {formatDate(availability.startDate)}
              </span>{" "}
              {t(TRANSLAITIONS.to)}:{" "}
              <span className="focus">{formatDate(availability.endDate)}</span>{" "}
              @ <span className="focus">EGP {availability.price}</span> |
              status: <span className="focus">{availability.status}</span>
            </Typography>
            <IconButton
              aria-controls="availability-menu"
              aria-haspopup="true"
              onClick={(event) => handleClick(event, availability)}
            >
              <MoreVertIcon sx={{ color: colors.black }} />
            </IconButton>
          </Box>
        ))}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>
            {t(TRANSLAITIONS.availabilityCalendar_editButton)}
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            {t(TRANSLAITIONS.availabilityCalendar_deleteButton)}
          </MenuItem>
        </Menu>
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogTitle>
          {t(TRANSLAITIONS.availabilityCalendar_editDialogTitle)}
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangeCalendar"]}>
              <DateRangeCalendar
                value={selectedDates}
                onChange={setSelectedDates}
                sx={calenderStyles}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            label={t(TRANSLAITIONS.rentPriceLabel)}
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
            name="price"
            sx={inputStyles}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancelEdit}
          >
            {t(TRANSLAITIONS.cancelButton)}
          </Button>
          <Button variant="contained" onClick={handleSaveEdit}>
            {t(TRANSLAITIONS.saveButton)}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AvailabilityCalendar;
