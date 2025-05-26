/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";

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

export default function ActionModal({
  icon,
  title,
  detail,
  open,
  handleClose,
  handleYes,
  handleNo,
  color,
}) {
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
              margin: "10% 0%",
            }}
          >
            <Typography variant="h3">{title}</Typography>
            <ArgonBox
              sx={
                color && {
                  backgroundColor: color,
                  borderRadius: "50%",
                  padding: "0.8rem 1.25rem",
                }
              }
            >
              <img
                src={icon}
                style={{
                  margin: "5% auto",
                  width: "50px",
                }}
              />
            </ArgonBox>
            <Typography variant="h5" textAlign={"center"}>
              {detail}
            </Typography>
          </ArgonBox>
          <ArgonBox display="flex" justifyContent="space-evenly" alignItems="center">
            <ArgonButton variant="contained" onClick={handleNo}>
              No
            </ArgonButton>
            <ArgonButton
              variant="contained"
              {...(color ? { sx: { backgroundColor: color } } : { color: "error" })}
              onClick={handleYes}
            >
              Yes
            </ArgonButton>
          </ArgonBox>
        </Box>
      </Modal>
    </div>
  );
}
