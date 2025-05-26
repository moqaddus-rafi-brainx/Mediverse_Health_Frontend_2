import React from "react";
import { CircularProgress, Box } from "@mui/material";

const ProgressBar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999, // Set a high z-index to make sure it appears above other elements
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default ProgressBar;
