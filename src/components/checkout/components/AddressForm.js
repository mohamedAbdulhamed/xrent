import * as React from "react";

import FormLabel from "@mui/material/FormLabel";
import { Grid } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import { TRANSLAITIONS } from "../../../config/constants";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

// send inital values
export default function AddressForm() {
  const { t } = useTranslation();

  return (
    <Grid
      container
      sx={{
        display: "grid",
        gap: "30px",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      }}
    >
      <FormGrid  sx={{ gridColumn: "span 2" }}>
        <FormLabel htmlFor="first-name" required>
          {t(TRANSLAITIONS.firstNameLabel)}
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          autoComplete="first name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid sx={{ gridColumn: "span 2" }}>
        <FormLabel htmlFor="last-name" required>
        {t(TRANSLAITIONS.lastNameLabel)}
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="last-name"
          type="last-name"
          autoComplete="last name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid sx={{ gridColumn: "span 4" }}>
        <FormLabel htmlFor="address" required>
          {t(TRANSLAITIONS.addressLabel)}
        </FormLabel>
        <OutlinedInput
          id="address"
          name="address"
          type="address"
          placeholder={t(TRANSLAITIONS.addressLabelPlaceholder)}
          autoComplete="shipping address-line1"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid sx={{ gridColumn: "span 2" }}>
        <FormLabel htmlFor="city" required>
          {t(TRANSLAITIONS.cityLabel)}
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder={t(TRANSLAITIONS.cityLabelPlaceholder)}
          autoComplete="City"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid sx={{ gridColumn: "span 2" }}>
        <FormLabel htmlFor="zip">{t(TRANSLAITIONS.zipLabel)}</FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="12345"
          autoComplete="shipping postal-code"
          size="small"
        />
      </FormGrid>
    </Grid>
  );
}
