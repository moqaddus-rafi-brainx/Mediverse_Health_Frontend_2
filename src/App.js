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

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Argon Dashboard 2 PRO MUI example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Argon Dashboard 2 PRO MUI themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Argon Dashboard 2 PRO MUI routes
import { sidebarRoutes, supervisorRoutes, routes } from "routes";

// Argon Dashboard 2 PRO MUI contexts
import { useArgonController, setMiniSidenav, setOpenConfigurator } from "context";

// Icon Fonts
import "assets/css/nucleo-icons.css";
import "assets/css/nucleo-svg.css";
import "./assets/css/globalStyle.css";
import construction_pro_logo from "./assets/icons/construction_pro_logo.svg";
import { ROLES } from "constants";
import Cover from "layouts/authentication/sign-in/cover";

export default function App() {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor, darkSidenav, darkMode } =
    controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  // const user = JSON.parse(localStorage.getItem("user"));
  const user = {
    role: "admin",
  };

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      // if (!user && route?.key !== "reset-password" && route?.key !== "change-password") {
      //   return <Route exact path={"*"} element={<Cover />} key={route.key} />;
      // }
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            {/* {user && ( */}
            <Sidenav
              color={sidenavColor}
              brand={construction_pro_logo}
              brandName="CORE"
              routes={sidebarRoutes}
              // routes={user?.role === "supervisor" ? supervisorRoutes : sidebarRoutes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            {/* )} */}
            <Configurator />
          </>
        )}
        {layout === "user" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/user/login" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          {/* {user && ( */}
          <Sidenav
            color={sidenavColor}
            brand={construction_pro_logo}
            brandName="CORE"
            routes={user?.role === "supervisor" ? supervisorRoutes : sidebarRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* )} */}
          <Configurator />
        </>
      )}
      {layout === "user" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        {getRoutes(user?.role === "supervisor" ? supervisorRoutes : sidebarRoutes)}
        <Route
          path="*"
          element={
            <Navigate
              to={
                user
                  ? user?.role === "supervisor"
                    ? "/admin/user-management"
                    : "/admin/user-management"
                  : "/user/login"
              }
            />
          }
        />
      </Routes>
    </ThemeProvider>
  );
}
