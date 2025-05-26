import React, { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const Profile = () => {
  const [userName, setUserName] = useState();
  const [image, setImage] = useState();
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar username={userName} updatedImage={image} />
        <ProfileCard setUserName={setUserName} setImage={setImage} />
      </DashboardLayout>
    </>
  );
};

export default Profile;
