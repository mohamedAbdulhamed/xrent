import React from "react";
import { Alert, Slide, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type MessageProps = {
  msg: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  severity: "error" | "warning" | "info" | "success";
};

export function Notification({ msg, setMessage, severity }: MessageProps) {
  return (
    <Slide in={!!msg} direction="down" unmountOnExit>
      <Alert
        severity={severity}
        sx={{
          position: "fixed",
          left: "25%",
          width: "50%",
          zIndex: 1300,
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setMessage(null)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        onClose={() => setMessage(null)}
      >
        {msg}
      </Alert>
    </Slide>
  );
}
