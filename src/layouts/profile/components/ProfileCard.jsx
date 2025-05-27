/* eslint-disable react/prop-types */
import ArgonBox from "components/ArgonBox";
import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import "../Profile.css";
import editIcon from "../../../assets/icons/edit-user.svg";
import userImage from "../../../assets/images/user-profile.png";
import { useNavigate } from "react-router-dom";
// import { getUserDetail } from "services/AdminService";
import { ToastContainer } from "react-toastify";
import ProgressBar from "components/ProgressBar/ProgressBar";

const ProfileCard = ({ custom, setUserName, setImage }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [spinner, setSpinner] = useState(true);

  const handleEdit = () => {
    navigate("/admin/edit-profile");
  };

  // useEffect(() => {
  //   setSpinner(true);
  //   getUserDetail()
  //     .then((data) => {
  //       setUser(data?.user);
  //       localStorage.setItem("user", JSON.stringify(data));
  //       setUserName(data?.user?.name);
  //       setImage(data?.user?.image);
  //       setSpinner(false);
  //     })
  //     .catch((error) => {
  //       setSpinner(false);
  //       console.log(error);
  //     });
  // }, []);

  return (
    <>
      <ToastContainer />
      <ArgonBox mt={20} mb={2}>
        {spinner && <ProgressBar />}

        <Card sx={{ overflow: "visible" }}>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <ArgonBox display="flex" alignItems="center" gap={2}>
              <ArgonBox>
                <img className="profile-image" src={user?.image || userImage} alt="profile" />
              </ArgonBox>
              <ArgonBox>
                <div className="profile-name">{user?.name}</div>
                <div className="profile-email">{user?.email}</div>
              </ArgonBox>
            </ArgonBox>
            {!custom && (
              <ArgonBox className="profile-edit-button" onClick={handleEdit}>
                <img src={editIcon} alt="" />
                <div className="profile-edit">Edit Profile</div>
              </ArgonBox>
            )}
          </ArgonBox>
        </Card>
      </ArgonBox>
    </>
  );
};

export default ProfileCard;
