import React from "react";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});
import calander from "../../assets/icons/circum_calendar.svg";
import dropDown from "../../assets/icons/drop-down.svg";

function DatePickerValue({
  initialValue,
  handleChange,
  minDate,
  disabled,
  showIcon = true,
  customize = false,
  customIcon,
  weekNo,
  maxDate
}) {
  const [open, setOpen] = React.useState(false);

  const iconStyle = {
    "& .MuiOutlinedInput-root": customize && {
      border: "none !important",
      color: "#3b98d1 !important",
      fontSize: "18px !important",
      width: "220px !important",
      paddingLeft: "25px",
    },
    "& .MuiSvgIcon-root": {
      fill: "#3B98D1",
      display: !showIcon && "none",
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {customIcon && (
        <img
          src={calander}
          alt="calander"
          style={{
            marginRight: "-20px",
            zIndex: "1",
            pointerEvents: "none",
          }}
        />
      )}
      <DatePicker
        sx={iconStyle}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        className={`w-100 date-picker-no-border`}
        value={initialValue}
        onChange={(newValue) => {
          handleChange(newValue?.$d);
        }}
        minDate={minDate}
        maxDate={maxDate}
        displayWeekNumber={weekNo}
        disabled={disabled}
        slotProps={{
          textField: {
            onClick: () => setOpen(true),
          },
        }}
      />
      {customIcon && (
        <img
          src={dropDown}
          alt="drop"
          className="drop-icon"
          style={{ marginLeft: "-40px", pointerEvents: "none" }}
        />
      )}
    </LocalizationProvider>
  );
}

DatePickerValue.propTypes = {
  initialValue: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  minDate: PropTypes.object,
  disabled: PropTypes.bool,
  showIcon: PropTypes.bool,
  customize: PropTypes.bool,
  customIcon: PropTypes.bool,
  weekNo: PropTypes.bool,
  maxDate: PropTypes.object,
};

export default DatePickerValue;
