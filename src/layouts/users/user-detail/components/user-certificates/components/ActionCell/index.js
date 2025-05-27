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
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import trashIcon from "../../../../../../../assets/icons/trash.svg";
import editIcon from "../../../../../../../assets/icons/edit.svg";
import viewIcon from "../../../../../../../assets/icons/views.svg";
import downloadIcon from "../../../../../../../assets/icons/download-icon-green.svg";
import notificationIcon from "../../../../../../../assets/icons/notification-icon-orange.svg";

function ActionCell({ handleDownload, handleNotified, handleEdit, handleDelete, type, isExpired }) {
  return (
    <ArgonBox display="flex" alignItems="center">
      <ArgonTypography
        variant="body1"
        color="secondary"
        sx={{ cursor: "pointer", lineHeight: 0 }}
        onClick={handleDownload}
      >
        <Tooltip title={`Download ${type}`} placement="top">
          <img src={downloadIcon} alt="download" />
        </Tooltip>
      </ArgonTypography>
      {isExpired ? (
        <ArgonBox mx={2} disabled={true}>
          <ArgonTypography
            variant="body1"
            color="secondary"
            sx={{ cursor: "pointer", lineHeight: 0 }}
            onClick={handleNotified}
          >
            <Tooltip title={`Notify ${type}`} placement="top">
              <img src={notificationIcon} alt="edit" />
            </Tooltip>
          </ArgonTypography>
        </ArgonBox>
      ) : (
        // Here to change the disabled icon
        <ArgonBox mx={2}>
          <ArgonTypography variant="body1" color="secondary">
            <img src={notificationIcon} alt="edit" />
          </ArgonTypography>
        </ArgonBox>
      )}
      <ArgonBox mr={2}>
        <ArgonTypography
          variant="body1"
          color="secondary"
          sx={{ cursor: "pointer", lineHeight: 0 }}
          onClick={handleEdit}
        >
          <Tooltip title={`Edit ${type}`} placement="top">
            <img src={editIcon} alt="edit" />
          </Tooltip>
        </ArgonTypography>
      </ArgonBox>
      <ArgonTypography
        variant="body1"
        color="secondary"
        sx={{ cursor: "pointer", lineHeight: 0 }}
        onClick={handleDelete}
      >
        <Tooltip title={`Delete ${type}`} placement="top">
          <img src={trashIcon} alt="delete" />
        </Tooltip>
      </ArgonTypography>
    </ArgonBox>
  );
}

export default ActionCell;
