/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon
import ArgonBox from "components/ArgonBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function SimpleModal({ icon, title, detail, open, handleClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Close button */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "1% 3%",
            }}
          >
            <CloseIcon />
          </IconButton>
          {/* Modal content */}
          <ArgonBox
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={icon} style={{ margin: "10% auto" }} />
            <Typography variant="h4">{title}</Typography>
            <Typography
              variant="h6"
              style={{ margin: "3% 0%", fontWeight: "normal", textAlign: "center" }}
            >
              {detail}
            </Typography>
          </ArgonBox>
        </Box>
      </Modal>
    </div>
  );
}
