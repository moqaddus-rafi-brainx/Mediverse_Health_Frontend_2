import Default from "layouts/dashboards/default";
import Users from "layouts/users/user-list";
import Cover from "layouts/authentication/sign-in/cover";
import ResetPassword from "layouts/authentication/reset-password/cover";
import ChangePassword from "layouts/authentication/change-password/cover";
import ProtectedRoute from "components/ProtectedRoute";
import NewUser from "layouts/users/new-user/NewUser";
import PatientForm from "layouts/users/create-patient/PatientForm";
import userIcon from "./assets/icons/user.svg";
import userIconActive from "./assets/icons/user-white.svg";
// import homeIcon from "./assets/icons/home.svg";
// import homeIconActive from "./assets/icons/home-white.svg";
// import UserDetail from "layouts/users/user-detail/UserDetail";
// import SubUsersListing from "layouts/admin-sub-users/admin-user-list/index";
// import SubUserDetail from "layouts/admin-sub-users/admin-user-detail/UserDetail";
// import AdminNewUser from "layouts/admin-sub-users/add-new-admin-user/NewUser";
import Profile from "layouts/profile/Profile";
import EditProfile from "layouts/profile/EditProfile";
import ProfilePassword from "layouts/profile/ProfilePassword";
import Notifications from "layouts/notifications";

export const routes = [
  {
    type: "collapse",
    noCollapse: true,
    name: "Login",
    key: "login",
    layout: "user",
    route: "/",
    component: <Cover />,
  },
  {
    type: "collapse",
    noCollapse: true,
    name: "Login",
    key: "login",
    layout: "user",
    route: "/user/login",
    component: <Cover />,
  },
  {
    type: "collapse",
    noCollapse: true,
    name: "Reset Password",
    key: "reset-password",
    layout: "user",
    route: "/user/reset-password",
    component: <ResetPassword />,
  },
  {
    type: "collapse",
    noCollapse: true,
    name: "Change Password",
    key: "change-password",
    layout: "user",
    route: "/user/update-password",
    component: <ChangePassword />,
  },
];

export const sidebarRoutes = [
  // {
  //   type: "collapse",
  //   noCollapse: true,
  //   name: "Dashboard",
  //   key: "dashboard",
  //   layout: "dashboard",
  //   icon: <img src={homeIcon} alt="Home" />,
  //   iconActive: <img src={homeIconActive} alt="Home" />,
  //   route: "/admin/dashboard",
  //   component: <Default />,
  // },
  {
    type: "collapse",
    noCollapse: true,
    name: "Patients",
    key: "user-management",
    layout: "dashboard",
    icon: <img src={userIcon} alt="User" />,
    iconActive: <img src={userIconActive} alt="User" />,
    route: "/admin/user-management",
    component: <ProtectedRoute><Users /></ProtectedRoute>,
  },
  {
    layout: "user",
    route: "/admin/user-management/create-patient",
    component: <ProtectedRoute><PatientForm /></ProtectedRoute>,
  },
  // {
  //   layout: "dashboard",
  //   route: "/admin/user-management/edit-user/:id",
  //   component: <NewUser />,
  // },
  // {
  //   layout: "dashboard",
  //   route: "/admin/user-management/user-detail-certificate/:id/:btnId",
  //   component: <UserDetail />,
  // },
  // {
  //   layout: "dashboard",
  //   route: "/admin/user-management/user-detail/:id",
  //   component: <UserDetail />,
  // },

  {
    layout: "dashboard",
    route: "admin/profile",
    component: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    layout: "dashboard",
    route: "admin/edit-profile",
    component: <ProtectedRoute><EditProfile /></ProtectedRoute>,
  },
  {
    layout: "dashboard",
    route: "admin/change-password",
    component: <ProtectedRoute><ProfilePassword /></ProtectedRoute>,
  },
  {
    layout: "dashboard",
    route: "admin/notifications",
    component: <ProtectedRoute><Notifications /></ProtectedRoute>,
  },
];

export const supervisorRoutes = [
  {
    type: "collapse",
    noCollapse: true,
    name: "Patients",
    key: "user-management",
    layout: "dashboard",
    icon: <img src={userIcon} alt="User" />,
    iconActive: <img src={userIconActive} alt="User" />,
    route: "/admin/user-management",
    component: <ProtectedRoute><Users /></ProtectedRoute>,
  },
  // {
  //   layout: "dashboard",
  //   route: "/admin/user-management/new-user",
  //   component: <NewUser />,
  // },
  // {
  //   layout: "dashboard",
  //   route: "/admin/user-management/edit-user/:id",
  //   component: <NewUser />,
  // },
  // {
  //   layout: "dashboard",
  //   route: "/admin/user-management/user-detail-certificate/:id/:btnId",
  //   component: <UserDetail />,
  // },
  // {
  //   layout: "dashboard",
  //   route: "/admin/user-management/user-detail/:id",
  //   component: <UserDetail />,
  // },

  {
    layout: "dashboard",
    route: "admin/profile",
    component: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    layout: "dashboard",
    route: "admin/edit-profile",
    component: <ProtectedRoute><EditProfile /></ProtectedRoute>,
  },
  {
    layout: "dashboard",
    route: "admin/change-password",
    component: <ProtectedRoute><ProfilePassword /></ProtectedRoute>,
  },
  {
    layout: "dashboard",
    route: "admin/notifications",
    component: <ProtectedRoute><Notifications /></ProtectedRoute>,
  },
];
