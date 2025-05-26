/* eslint-disable react/prop-types */
/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import trashIcon from "../../../../assets/icons/trash.svg";

function ActionCell({ handleDelete, type }) {
  return (
    <ArgonBox display="flex" alignItems="center">
      <ArgonTypography
        variant="body1"
        color="secondary"
        sx={{ cursor: "pointer", lineHeight: 0 }}
        onClick={handleDelete}
        mx={2}
      >
        <Tooltip title={`Delete ${type}`} placement="top">
          <img src={trashIcon} alt="delete" />
        </Tooltip>
      </ArgonTypography>
    </ArgonBox>
  );
}

export default ActionCell;
