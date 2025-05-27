// @mui material components
import Card from "@mui/material/Card";
import 'react-toastify/dist/ReactToastify.css';

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { useState } from "react";
import { resetPassword } from "../../../../services/authService";
import { ToastContainer, toast } from "react-toastify";


// Images
const bgColor = "#246C98";

function Cover() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  const handleReset = () => {
    if (!email) {
      toast.error("Email required");
      return;
    }

    resetPassword(email)
      .then((data) => {
        toast.success(data?.message);
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.response?.data?.error || "Something went wrong";
        toast.error(errorMessage);
      });
  };

  return (
    <>
      {/* <ArgonBox
        position="fixed"
        top={10}
        left={0}
        width="100vw"
        zIndex={1300}
        bgcolor="#246C98"
        py={1}
        px={3}
        display="flex"
        alignItems="center"
        style={{ minHeight: 56 }}
      >
        <ArgonTypography variant="h4" fontWeight="bold" color="white">
          Mediverse
        </ArgonTypography>
      </ArgonBox> */}
      <CoverLayout
       
        // image={bgImage}
        // imgPosition="top"
        // button={{ color: "info" }}
        image={bgColor}
      >
        <Card mt={-4}>
          <ArgonBox display="flex" flexDirection="column" alignItems="center" mt={2} mb={1}>
            <ArgonTypography variant="h3" fontWeight="bold" color="primary">
              Mediverse
            </ArgonTypography>
          </ArgonBox>
          <ArgonBox p={3}>
            <ArgonBox display="flex" alignItems="center">
              <ArgonBox
                width="3rem"
                height="3rem"
                bgColor="primary"
                shadow="md"
                display="grid"
                alignItems="center"
                justifyContent="center"
                borderRadius="md"
              >
                <ArgonBox
                  component="i"
                  color="white"
                  fontSize="1.25rem"
                  className="ni ni-circle-08"
                />
              </ArgonBox>
              <ArgonBox ml={2} lineHeight={1}>
                <ArgonTypography variant="h5" color="dark">
                  Can&apos;t log in?
                </ArgonTypography>
                <ArgonTypography variant="button" fontWeight="regular">
                  Restore access to your account
                </ArgonTypography>
              </ArgonBox>
            </ArgonBox>
          </ArgonBox>
          <ArgonBox p={3}>
            <ArgonBox component="form" role="form">
              <ArgonBox mb={2}>
                <ArgonTypography
                  display="block"
                  variant="caption"
                  fontWeight="bold"
                  color="dark"
                  sx={{ ml: 0.5, mb: 1 }}
                >
                  We will send a recovery link to
                </ArgonTypography>
                <ArgonInput
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </ArgonBox>
              <ArgonBox mt={3} mb={1} textAlign="center">
                <ArgonButton color="primary" fullWidth onClick={handleReset}>
                  Reset Password
                </ArgonButton>
                <ArgonTypography
                  display="block"
                  variant="button"
                  color="text"
                  fontWeight="regular"
                  mt={3}
                  sx={{ cursor: "pointer" }}
                >
                  Did&apos;t receive the link?{" "}
                  <span
                    style={{ color: "#3b98d1", fontWeight: "bold" }}
                    role="button"
                    onClick={handleReset}
                  >
                    Resend
                  </span>
                </ArgonTypography>
              </ArgonBox>
            </ArgonBox>
          </ArgonBox>
        </Card>
      </CoverLayout>
    </>
  );
}

export default Cover;
