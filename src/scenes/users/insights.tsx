import React from "react";
import { useTheme, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// import { BarChart } from "@mui/x-charts/BarChart";
// https://mui.com/x/react-charts/getting-started/

import { tokens } from "../../theme.ts";
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
  APPBAR_HEIGHT,
  TRANSLAITIONS,
} from "../../config/constants.ts";

const Insights = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const navigate = useNavigate();

  React.useEffect(() => {}, []);

  return (
    <Container
      sx={{
        padding: "2rem",
        minHeight: `calc(100vh - (${HEADER_HEIGHT}px + ${FOOTER_HEIGHT}px + ${APPBAR_HEIGHT}px))`,
      }}
    >
      {/* <BarChart
        series={[
          { data: [35, 44, 24, 34] },
          { data: [51, 6, 49, 30] },
          { data: [15, 25, 30, 50] },
          { data: [60, 50, 15, 25] },
        ]}
        height={290}
        xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      /> */}
    </Container>
  );
};

export default Insights;
