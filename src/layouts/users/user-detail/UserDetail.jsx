import React, { useEffect, useLayoutEffect, useState } from "react";
import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams } from "react-router-dom";
import UserCard from "./components/user-card/UserCard";
import UserJobs from "./components/user-jobs/UserJobs";
import UserCertificates from "./components/user-certificates/UserCertificates";
import { Button, Card } from "@mui/material";
import ArgonTypography from "components/ArgonTypography";
import "./UserDetail.css";

const UserDetail = () => {
  const { id, btnId } = useParams();

  const [buttonId, setButtonId] = useState(btnId ? Number(btnId) : 1);

  const handleJobs = () => {
    setButtonId(1);
  };

  const handleCertification = () => {
    setButtonId(2);
  };

  useEffect(() => {
    if (btnId) {
      setButtonId(Number(btnId));
    }
  }, [id, btnId]);

  return (
    <>
      {" "}
      <DashboardLayout>
        <DashboardNavbar />
        <ArgonBox py={0}>
          <UserCard userId={id} />
          <ArgonBox my={2}>
            <Card sx={{ overflow: "visible", width: "fit-content" }}>
              <ArgonBox
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                p={0.5}
              >
                <ArgonBox display="flex" justifyContent="space-between">
                  <Button
                    className={`${buttonId === 1 ? "active-btn" : "passive-btn"}`}
                    onClick={handleJobs}
                  >
                    Jobs
                  </Button>
                  <Button
                    className={`${buttonId === 2 ? "active-btn" : "passive-btn"}`}
                    onClick={handleCertification}
                  >
                    Certifications
                  </Button>
                </ArgonBox>
              </ArgonBox>
            </Card>
          </ArgonBox>
          {buttonId === 1 && <UserJobs userId={id} />}
          {buttonId === 2 && <UserCertificates userId={id} />}
        </ArgonBox>
      </DashboardLayout>
    </>
  );
};

export default UserDetail;
