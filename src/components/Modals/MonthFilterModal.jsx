/* eslint-disable react/prop-types */
import * as React from "react";
import { useState, useEffect } from "react";
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
import ArgonSelect from "components/ArgonSelect";
import { DAILY_LOG_STATUS_ENUM } from "constants";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function MonthFilterModal({ setFilters, open, handleClose }) {
  const [filter, setFilter] = useState({
    year: moment().year().toString(),
    month: moment().format("MMMM"),
    date: "",
    status: [],
  });

  const [date, setDate] = useState();

  const monthsArray = Array.from({ length: 12 }, (_, index) => {
    const monthDate = moment().month(index);
    return monthDate.format("MMMM");
  });

  const handleMonthDate = () => {
    if (filter.month && filter.year) {
      const selectedMonth = moment().month(filter.month);
      const selectedDate = moment(`${filter.year}-${selectedMonth.format("MM")}-01`).startOf(
        "month"
      );

      setDate(selectedDate.toISOString());
    }
  };

  useEffect(() => {
    handleMonthDate();
  }, [filter.month, filter.year]);

  const handleFilters = () => {
    setFilters(filter);
    handleClose();
  };

  const clearFilters = () => {
    setFilter({
      year: moment().year().toString(),
      month: moment().format("MMMM"),
      date: "",
      status: [],
    });
    setFilters({
      year: moment().year().toString(),
      month: moment().format("MMMM"),
      date: "",
      status: [],
    });
    setDate("");
    handleClose();
  };

  const handleChange = (value) => {
    const updatedStatus = [...filter.status];

    if (updatedStatus.includes(value)) {
      updatedStatus.splice(updatedStatus.indexOf(value), 1);
    } else {
      updatedStatus.push(value);
    }

    setFilter({ ...filter, status: updatedStatus });
  };

  const handleDateChange = (value) => {
    setFilter({ ...filter, date: value });
    setDate(value)
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
          <Typography>Timeline</Typography>
          <ArgonBox display="flex" justifyContent="space-between" mt={1} mb={2}>
            <ArgonBox>
              <FormLabel sx={{ fontSize: "14px" }}>Year</FormLabel>
              <ArgonSelect
                defaultValue={{ value: filter.year, label: filter.year }}
                options={Array.from({ length: moment().year() - 2021 }, (_, index) => {
                  const year = 2022 + index;
                  return { value: year.toString(), label: year.toString() };
                })}
                onChange={({ value }) => {
                  setFilter((prev) => {
                    return { ...prev, year: value };
                  });
                }}
                size="medium"
              />
            </ArgonBox>
            <ArgonBox>
              <FormLabel sx={{ fontSize: "14px" }}>Month</FormLabel>
              <ArgonSelect
                defaultValue={{ value: filter.month, label: filter.month }}
                options={monthsArray.map((month) => ({ value: month, label: month }))}
                onChange={({ value }) => {
                  setFilter((prev) => {
                    return { ...filter, month: value };
                  });
                }}
                size="medium"
              />
            </ArgonBox>
          </ArgonBox>
          <ArgonBox mt={2} mb={3}>
            <FormLabel sx={{ fontSize: "14px" }}>Week</FormLabel>
            <DatePicker initialValue={date ? dayjs(date) : ""} value={date ? dayjs(date) : ""} handleChange={handleDateChange} />
          </ArgonBox>{" "}
          <Typography>Status</Typography>
          {DAILY_LOG_STATUS_ENUM.map((status) => (
            <ArgonBox display="flex" alignItems="center" key={status} sx={{ marginLeft: "2%" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={status}
                    checked={filter.status.includes(status)}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                }
              />
              <Typography fontSize={14}>{status}</Typography>
            </ArgonBox>
          ))}
          <FormGroup sx={{ marginLeft: "10px" }}></FormGroup>
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
