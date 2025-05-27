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

import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import "./index.css";

function Breadcrumbs({ icon, light }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const limitedPathnames = pathnames.slice(0, 3);

  return (
    <ArgonBox>
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        separator={<span style={{ color: light ? "white" : "grey" }}> / </span>}
      >
        {limitedPathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          if (index === limitedPathnames.length - 1) {
            return (
              <ArgonTypography
                key={to}
                fontWeight="bold"
                textTransform="capitalize"
                variant="h6"
                color={light ? "white" : "dark"}
                noWrap
              >
                {value.replace(/-/g, " ")}
              </ArgonTypography>
            );
          }

          return (
            <Link key={to} to={to} className="route-link">
              <ArgonTypography
                fontWeight="bold"
                textTransform="capitalize"
                variant="h6"
                color={light ? "white" : "dark"}
                noWrap
              >
                {value.replace(/-/g, " ")}
              </ArgonTypography>
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </ArgonBox>
  );
}

Breadcrumbs.propTypes = {
  icon: PropTypes.node,
  light: PropTypes.bool,
};

Breadcrumbs.defaultProps = {
  light: false,
};

export default Breadcrumbs;
