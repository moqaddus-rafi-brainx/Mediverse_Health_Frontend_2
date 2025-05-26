/* eslint-disable react/prop-types */
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormGroup, FormControlLabel, Checkbox, FormLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon
import ArgonBox from "components/ArgonBox";
import { USER_TITLES_ENUM } from "constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function UserFilterModal({ setFilter, open, handleClose }) {
  const [filters, setFilters] = useState([]);

  const handleFilters = () => {
    setFilter(filters);
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const handleChange = (value) => {
    const updatedFilters = [...filters];

    if (updatedFilters.includes(value)) {
      updatedFilters.splice(updatedFilters.indexOf(value), 1);
    } else {
      updatedFilters.push(value);
    }

    setFilters(updatedFilters);
  };

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
          <ArgonBox display="flex" alignItems="center">
            <Typography variant="h3">Filters</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: "6% 2%",
              }}
            >
              <CloseIcon />
            </IconButton>
          </ArgonBox>
          <hr style={{ margin: "5% 0%" }}></hr>
          {/* Modal content */}
          <Typography>Select Title</Typography>
          <FormGroup sx={{ marginLeft: "10px" }}>
            {USER_TITLES_ENUM.map((title, index) => (
              <ArgonBox key={index} display="flex" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      value={title}
                      checked={filters.includes(title)}
                      onChange={() => handleChange(title)}
                    />
                  }
                />
                <Typography fontSize={14}>{title}</Typography>
              </ArgonBox>
            ))}
          </FormGroup>
          <hr style={{ margin: "8% 0%" }}></hr>
          <ArgonBox display="flex" alignItems="center" justifyContent="space-between">
            <Button
              variant="outlined"
              color="secondary"
              size="medium"
              sx={{ color: "primary.main", border: "none" }}
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={handleFilters}
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                "&:hover": {
                  backgroundColor: "primary.main",
                },
              }}
            >
              Set Filters
            </Button>
          </ArgonBox>{" "}
        </Box>
      </Modal>
    </div>
  );
}
