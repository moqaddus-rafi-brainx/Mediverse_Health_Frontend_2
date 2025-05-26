import { Icon, MenuItem, Select } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import { JOB_STATUS } from "constants";
import { JOB_STATUS_ENUM } from "constants";
import PropTypes from "prop-types";

function InputCell({ status, id }) {
  const getSelectStyle = (val) => {
    const commonStyles = {
      border: "none !important",
      padding: "0.5rem !important",
    };
    switch (val) {
      case JOB_STATUS.upcoming:
        return {
          backgroundColor: "#f2f8fe !important",
          color: "#418fea !important",
          ...commonStyles,
        };

      case JOB_STATUS.in_progress:
        return {
          backgroundColor: "#FDF7EC !important",
          color: "#F59A31 !important",
          ...commonStyles,
        };

      case JOB_STATUS.completed:
        return {
          backgroundColor: "#ECFDF5 !important",
          color: "#519330 !important",
          ...commonStyles,
        };

      case JOB_STATUS.closed:
        return {
          backgroundColor: "#FEF2F2 !important",
          color: "#F32626 !important",
          ...commonStyles,
        };

      default:
        return {
          backgroundColor: "#FEF2F2 !important",
          color: "#F32626 !important",
          ...commonStyles,
        };
    }
  };

  return (
    <ArgonBox alignItems="center">
      <Select sx={() => getSelectStyle(status)} value={status}>
        <MenuItem value={status} disabled sx={{ display: "none" }}>
          <div className="d-flex align-items-center">
            <small className="me-3 text-uppercase fw-semibold">{status}</small>
          </div>
        </MenuItem>
      </Select>
    </ArgonBox>
  );
}

InputCell.propTypes = {
  handleStatus: PropTypes.func,
  status: PropTypes.string,
  id: PropTypes.string,
};

export default InputCell;
