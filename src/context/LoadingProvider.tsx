import React from "react";
import Loading from "../components/Loading.tsx";
import { Box } from "@mui/material";

type LoadingContextType = {
  mainLoading: boolean;
  setMainLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingContext = React.createContext<LoadingContextType>({
  mainLoading: false,
  setMainLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [mainLoading, setMainLoading] = React.useState(false);

  return (
    <LoadingContext.Provider value={{ mainLoading, setMainLoading }}>
      {mainLoading && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#00000078",
            zIndex: "9999",
          }}
        >
          <Loading />
        </Box>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
