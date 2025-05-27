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
import ArgonDatePicker from "components/ArgonDatePicker";
import { CheckBox } from "@mui/icons-material";
import { JOB_STATUS_ENUM } from "constants";
import ArgonButton from "components/ArgonButton";
import DatePicker from "components/DatePicker/DatePicker";
import dayjs from "dayjs";
import { CERTIFICATE_STATUS_ENUM } from "constants";

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

export default function FilterModal({ setFilters, open, handleClose, certificateType }) {
  const [filter, setFilter] = useState({ start_date: "", end_date: "", status: [] });

  const handleFilters = () => {
    setFilters(filter);
    handleClose();
  };

  const clearFilters = () => {
    setFilter({ start_date: "", end_date: "", status: [] });
    setFilters(filter);
  };

  const handleChange = (value) => {
    const updatedStatus = [...filter.status];

    if (updatedStatus.includes(value)) {
      // Value is already in the array, so remove it
      updatedStatus.splice(updatedStatus.indexOf(value), 1);
    } else {
      // Value is not in the array, so add it
      updatedStatus.push(value);
    }

    setFilter({ ...filter, status: updatedStatus });
  };
  const handleStartDateChange = (value) => {
    setFilter({ ...filter, start_date: value });
  };

  const handleEndDateChange = (value) => {
    setFilter({ ...filter, end_date: value });
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
          <ArgonBox
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></ArgonBox>
          <Typography>Date</Typography>
          <ArgonBox sx={{ display: "flex", margin: "1% 0% 8% 0%" }}>
            <ArgonBox>
              <FormLabel sx={{ fontSize: "14px" }}>
                {" "}
                {certificateType ? "Issue Date" : "Job Starting Date"}
              </FormLabel>
              <DatePicker
                initialValue={filter.start_date ? dayjs(filter.start_date) : ""}
                handleChange={handleStartDateChange}
              // minDate={dayjs()}
              />
            </ArgonBox>
            <ArgonBox sx={{ marginLeft: "8%" }}>
              <FormLabel sx={{ fontSize: "14px" }}>
                {" "}
                {certificateType ? "Valid Till Date" : "Job Ending Date"}
              </FormLabel>
              <DatePicker
                initialValue={filter.end_date ? dayjs(filter.end_date) : ""}
                handleChange={handleEndDateChange}
              // minDate={dayjs()}
              />
            </ArgonBox>{" "}
          </ArgonBox>
          <Typography>Status</Typography>
          <FormGroup sx={{ marginLeft: "10px" }}>
            <ArgonBox display="flex" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    value={certificateType ? CERTIFICATE_STATUS_ENUM[0] : JOB_STATUS_ENUM[0]}
                    checked={filter.status.includes(
                      certificateType ? CERTIFICATE_STATUS_ENUM[0] : JOB_STATUS_ENUM[0]
                    )}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                }
              />
              <Typography fontSize={14}>{certificateType ? "Running" : "Completed"}</Typography>
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    value={certificateType ? CERTIFICATE_STATUS_ENUM[1] : JOB_STATUS_ENUM[1]}
                    checked={filter.status.includes(
                      certificateType ? CERTIFICATE_STATUS_ENUM[1] : JOB_STATUS_ENUM[1]
                    )}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                }
              />
              <Typography fontSize={14}>{certificateType ? "Expired" : "In Progress"}</Typography>
            </ArgonBox>{" "}
            {!certificateType && (
              <ArgonBox display="flex" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      value={JOB_STATUS_ENUM[2]}
                      checked={filter.status.includes(JOB_STATUS_ENUM[2])}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  }
                />
                <Typography fontSize={14}>Upcoming</Typography>
              </ArgonBox>
            )}
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
