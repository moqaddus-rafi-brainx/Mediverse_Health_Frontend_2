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
import userImage from "../../../../../assets/images/user-profile.png";

function UserNameCell({ img, name, role }) {
  return (
    <ArgonBox display="flex" alignItems="center" justifyContent="center">
      <ArgonBox mr={2}>
        <img src={img || userImage} alt="user" className="profile-avatar" />
      </ArgonBox>
      <ArgonTypography variant="h6" style={{ fontWeight: "normal" }}>
        {name}
      </ArgonTypography>
      <ArgonTypography variant="h6" style={{ fontWeight: "normal" }}>
        {role ? "/" + role : ""}
      </ArgonTypography>
    </ArgonBox>
  );
}

export default UserNameCell;
