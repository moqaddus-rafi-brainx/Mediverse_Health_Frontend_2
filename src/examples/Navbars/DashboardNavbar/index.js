import { useState, useEffect, useLayoutEffect } from "react";

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

//icons
import profileIcon from "../../../assets/icons/nav_menu_profile.svg";
import settingsIcon from "../../../assets/icons/nav_menu_settings.svg";
import subUsersIcon from "../../../assets/icons/nav_menu_sub_users.svg";
import certificatesIcon from "../../../assets/icons/nav_menu_certificates.svg";
import logOutIcon from "../../../assets/icons/nav_menu_log_out.svg";
import navBarMenuIcon from "../../../assets/icons/nav_bar_dropdown_icon.svg";
import notificationImage from "../../../assets/icons/notification-icon.svg";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Argon Dashboard 2 PRO MUI context
import { useArgonController, setTransparentNavbar, setMiniSidenav } from "context";

// Images
import notificationIcon from "assets/icons/notification.svg";
import { MenuItem } from "@mui/material";
import "./index.css";
// import { getAdminNotifications } from "services/AdminService";
import { connect } from "socket.io-client";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { formatTimeDifference } from "services/utilities";
//import { markNotificationRead } from "services/AdminService";
// import { getAdminNotificationsCount } from "services/AdminService";

function DashboardNavbar({ absolute, light, isMini, username, updatedImage }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, transparentNavbar, fixedNavbar } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState();
  const [user, setUsers] = useState(JSON.parse(localStorage.getItem("user")));
  const [socket, setSocket] = useState();
  const [spinner, setSpinner] = useState(false);
  const [notificationCount, setNotificationCount] = useState();

  const navigate = useNavigate();

  const getNotificationCount = () => {
    //   setSpinner(true);
    //   getAdminNotificationsCount()
    //     .then((data) => {
    //       setSpinner(false);
    //       setNotificationCount(data?.unseenCount);
    //     })
    //     .catch((error) => {
    //       setSpinner(false);
    //       console.log(error);
    //     });
  };

  const getNotification = () => {
    // setSpinner(true);
    // getAdminNotifications()
    //   .then((data) => {
    //     setNotifications(data?.data);
    //     setSpinner(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setSpinner(false);
    //   });
  };

  const markRead = (id) => {
    setSpinner(true);
    // //markNotificationRead(id)
    //   .then((data) => {
    //     getNotificationCount();
    //   })
    //   .catch((error) => {
    //     setSpinner(false);
    //     console.log(error);
    //   });
  };

  // useLayoutEffect(() => {
  //   const newSocket = connect(process.env.REACT_APP_BACKEND_URL.replace("/api/v1", ""));
  //   newSocket.emit("join_room", "ALLCHATS");
  //   setSocket(newSocket);
  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    if (username) {
      setUsers(username);
    }
    if (updatedImage) {
      setUsers((prev) => ({ ...prev, image: updatedImage }));
    }
    getNotification();
    getNotificationCount();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("update_notification", () => {
        getNotification();
        getNotificationCount();
      });
    }
  }, [socket]);

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }
    window.addEventListener("scroll", handleTransparentNavbar);

    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };
  const handleCloseMenu = () => setOpenMenu(false);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("rememberMe");
    sessionStorage.removeItem("access_token");
    
    // Close any open menus
    handleCloseProfileMenu();
    handleCloseMenu();
    
    // Navigate to login
    navigate("/user/login");
  };

  // const navigateToProfile = () => {
  //   navigate("/admin/profile");
  // };

  const navigateToSettings = () => {
    navigate("/admin/change-password");
  };

  const handleOpenProfileMenu = (event) => {
    setMenuOpen(!isMenuOpen);
    setOpenProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setMenuOpen(!isMenuOpen);
    setOpenProfileMenu(false);
  };

  const handleNotificationClick = (notificationId, userId) => {
    navigate(`/admin/user-management/user-detail-certificate/${userId}/2`);
    markRead(notificationId);
    handleCloseMenu();
  };

  // Render the notifications menu
  const renderMenu = () => {
    return (
      <Menu
        anchorEl={openMenu}
        anchorReference={null}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
        sx={{ mt: 2 }}
      >
        <div className="notification-text">Notifications</div>
        {notifications?.slice(0, 3).map((notification) => {
          return (
            <NotificationItem
              image={<img src={notificationImage} alt="person" className="notification-image" />}
              title={[
                `${notification?.certificateName}`,
                `assigned to ${notification?.userName} expired`,
              ]}
              date={formatTimeDifference(notification?.createdAt)}
              onClick={() => handleNotificationClick(notification?._id, notification?.userId)}
              key={notification._id}
            />
          );
        })}

        <button className="see-all-btn" onClick={() => navigate("/admin/notifications")}>
          See All
        </button>
      </Menu>
    );
  };

  const menuItem = (icon, title, onClickFn) => (
    <MenuItem onClick={onClickFn}>
      <ListItemIcon>
        <img src={icon} alt="menu_icon" />
      </ListItemIcon>
      <Typography variant="inherit">{title}</Typography>
    </MenuItem>
  );

  // Render the Profile menu
  const renderProfileMenu = () => (
    <div>
      <Menu
        anchorEl={openProfileMenu}
        anchorReference={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(openProfileMenu)}
        onClose={handleCloseProfileMenu}
        sx={{ mt: 2 }}
      >
        {/* {menuItem(profileIcon, "Profile", navigateToProfile)} */}
        {menuItem(settingsIcon, "Change Password", navigateToSettings)}
        {menuItem(logOutIcon, "Logout", handleLogout)}
      </Menu>
    </div>
  );

  const getNotificationClassName = (notificationCount) => {
    if (notificationCount > 99) {
      return "notification-number-icon-3";
    } else if (notificationCount > 9) {
      return "notification-number-icon-2";
    } else {
      return "notification-number-icon-1";
    }
  };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      {spinner && <ProgressBar />}
      <Toolbar sx={(theme) => navbarContainer(theme, { navbarType })}>
        <ArgonBox
          color={light && transparentNavbar ? "white" : "dark"}
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}>
            {miniSidenav ? "menu_open" : "menu"}
          </Icon>
          <Breadcrumbs
            icon="home"
            title={route[1]}
            route={route}
            light={transparentNavbar ? light : false}
          />
        </ArgonBox>
        {isMini ? null : (
          <ArgonBox sx={(theme) => navbarRow(theme, { isMini })}>
            <ArgonBox color={light ? "white" : "inherit"}>
              <Link to="">
                <IconButton
                  size="large"
                  color={light && transparentNavbar ? "white" : "dark"}
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleOpenMenu}
                >
                  <img src={notificationIcon} alt="notif" />
                  {notificationCount > 0 && (
                    <div className={getNotificationClassName(notificationCount)}>
                      {notificationCount > 99 ? "99+" : notificationCount}
                    </div>
                  )}
                </IconButton>

                <IconButton size="large" onClick={handleOpenProfileMenu}>
                  {!user?.image ? (
                    <Icon
                      sx={({ palette: { dark, white } }) => ({
                        color: light && transparentNavbar ? white.main : dark.main,
                        marginRight: 1,
                      })}
                      size="large"
                    >
                      account_circle
                    </Icon>
                  ) : (
                    <img src={user?.image} alt="profile" className="profile-avatar me-2" />
                  )}

                  <ArgonTypography
                    variant="button"
                    fontWeight="medium"
                    color={light && transparentNavbar ? "white" : "dark"}
                  >
                    <div className="admin_name">{username || user?.name || "Admin"}</div>
                  </ArgonTypography>
                  <img
                    src={navBarMenuIcon}
                    alt="nav_icon"
                    className={isMenuOpen ? "rotate-icon open" : "rotate-icon"}
                  />
                </IconButton>
              </Link>
              {renderMenu()}
              {renderProfileMenu()}
            </ArgonBox>
          </ArgonBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: true,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  username: PropTypes.string,
  updatedImage: PropTypes.string,
};

export default DashboardNavbar;
