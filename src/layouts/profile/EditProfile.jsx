import React, { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonBox from "components/ArgonBox";
import { Card } from "reactstrap";
import userImage from "../../assets/images/user-profile.png";
// import { getUserDetail } from "services/AdminService";
import "./Profile.css";
import ArgonInput from "components/ArgonInput";
import { getBase64 } from "services/utilities";
// import { updateUser } from "services/AdminService";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProgressBar from "components/ProgressBar/ProgressBar";
// import { removeProfile } from "services/AdminService";
import ActionModal from "components/Modals/ActionModal";
import Trash from "../../assets/icons/trash.svg";
import { FILE_SIZE } from "constants";

const EditProfile = () => {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [profile, setProfile] = useState({
    profile_key: "",
    name: "",
  });
  const [profileImage, setProfileImage] = useState();
  const [user, setUser] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleOpenFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = async (e) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile?.size >= FILE_SIZE) {
      toast.error("File Size should be less than 10MB");
      return;
    }

    const file = await getBase64(selectedFile);
    setProfileImage(file);
    setProfile((prevProfile) => ({
      ...prevProfile,
      profile_key: selectedFile,
    }));
  };

  const handleUpdate = async () => {
    // setSpinner(true);
    // let url;
    // const formData = new FormData();
    // formData.append("image", profile.profile_key);
    // formData.append("name", profile?.name);
    // updateUser(formData)
    //   .then((data) => {
    //     setSpinner(false);
    //     toast.success("Profile Updated");
    //     navigate("/admin/profile");
    //   })
    //   .catch((error) => {
    //     setSpinner(false);
    //     toast.error("Something Went Wrong");
    //     console.log("Something Went Wrong");
    //   });
  };

  const handleRemove = async () => {};

  // useEffect(() => {
  //   setSpinner(true);
  //   getUserDetail()
  //     .then((data) => {
  //       console.log("user", data);
  //       setSpinner(false);
  //       setUser(data?.user);
  //       setProfile((prev) => ({ ...prev, name: data?.user?.name }));
  //       setProfileImage(data?.user?.image);
  //     })
  //     .catch((error) => {
  //       setSpinner(false);
  //       console.log(error);
  //       toast.error("Something Went Wrong");
  //     });
  // }, []);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <ProfileCard custom={true} />
        {spinner && <ProgressBar />}
        <ToastContainer />
        <ArgonBox className="main-card">
          <Card sx={{ overflow: "visible" }} className="password-card">
            <h1 className="profile-heading">Edit Profile</h1>
            <div className="edit-detail">
              <div className="top-section-c">
                <div>
                  <img
                    src={profileImage ? profileImage : userImage}
                    alt=""
                    className="user-image-2"
                  />
                </div>
                <div>
                  <div className="actions">
                    <button className="btn btn-primary btn-change" onClick={handleOpenFileInput}>
                      Change Photo
                    </button>
                    <button
                      className="btn btn-danger btn-remove"
                      onClick={() => setDeleteModal(true)}
                    >
                      Remove Photo
                    </button>
                  </div>
                  <div className="png-size">Maximum size of 10MB. JPG, GIF, or PNG.</div>
                </div>
              </div>
              <input
                type="file"
                className="d-none"
                ref={fileInputRef}
                onChange={handleFileInputChange}
              />
              <ArgonBox my={2}>
                <h1 className="profile-heading">Name</h1>
                <ArgonInput
                  value={profile?.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
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
            </div>
          </Card>
        </ArgonBox>
      </DashboardLayout>
      <ActionModal
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        title="Remove Profile"
        icon={Trash}
        detail="Are you sure to remove profile image?"
        handleYes={handleRemove}
        handleNo={() => setDeleteModal(false)}
      />
    </>
  );
};

export default EditProfile;
