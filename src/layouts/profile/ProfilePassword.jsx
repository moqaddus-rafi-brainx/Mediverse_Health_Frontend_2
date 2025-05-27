import React, { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import { Card } from "reactstrap";
// import { getUserDetail } from "services/AdminService";
import "./Profile.css";
import ArgonInput from "components/ArgonInput";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { PASSWORD_REGEX } from "constants";
// import { updateAdminPAssword } from "services/AdminService";

const ProfilePassword = () => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [user, setUser] = useState();
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // useEffect(() => {
  //   setSpinner(true);
  //   getUserDetail()
  //     .then((data) => {
  //       setSpinner(false);
  //       setUser(data);
  //     })
  //     .catch((error) => {
  //       setSpinner(false);
  //       toast.error("Something Went Wrong");
  //       console.log(error);
  //     });
  // }, []);

  const handleUpdate = () => {
    if (!data.oldPassword || !data.newPassword || !data.confirmNewPassword) {
      toast.error("Required All Feilds");
      return;
    }
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Password and Confirm Password must be same");
      return;
    }

    if (!data.newPassword.match(PASSWORD_REGEX)) {
      toast.error("Password must be 8 characters and of alphabets, and symbol and number");
      return;
    }

    // setSpinner(true);
    // updateAdminPAssword(data)
    //   .then((data) => {
    //     setSpinner(false);
    //     toast.success("Password Updated");
    //     navigate("/admin/profile");
    //   })
    //   .catch((error) => {
    //     setSpinner(false);
    //     toast.error("Something Went Wrong");
    //     console.log(error);
    //   });
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <ProfileCard />
        {spinner && <ProgressBar />}
        <ArgonBox className="main-card">
          <Card sx={{ overflow: "visible" }} className="password-card">
            <h1 className="profile-heading">Change Password</h1>

            <ArgonBox my={2}>
              <h1 className="profile-text">Current Password</h1>
              <ArgonInput
                type="password"
                placeholder="Enter old password"
                onChange={(e) => setData({ ...data, oldPassword: e.target.value })}
              />
            </ArgonBox>
            <ArgonBox my={2}>
              <h1 className="profile-text">New Password</h1>
              <ArgonInput
                placeholder="Enter New password"
                type="password"
                onChange={(e) => setData({ ...data, newPassword: e.target.value })}
              />
            </ArgonBox>

            <ArgonBox my={2}>
              <h1 className="profile-text">Confirm Password</h1>
              <ArgonInput
                type="password"
                placeholder="Re Enter New password"
                onChange={(e) => setData({ ...data, confirmNewPassword: e.target.value })}
              />
            </ArgonBox>

            <div className="bottom-section">
              <div className="actions-bottom">
                <button className="btn  btn-cancel" onClick={() => navigate("/admin/profile")}>
                  Cancel
                </button>
                <button className="btn btn-primary btn-change" onClick={handleUpdate}>
                  Update
                </button>
              </div>{" "}
            </div>
          </Card>
        </ArgonBox>
      </DashboardLayout>
    </>
  );
};

export default ProfilePassword;
