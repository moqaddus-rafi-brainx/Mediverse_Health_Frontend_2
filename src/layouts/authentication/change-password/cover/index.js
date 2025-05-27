import Card from "@mui/material/Card";
import 'react-toastify/dist/ReactToastify.css';

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { useState } from "react";
import { PASSWORD_REGEX } from "constants";
import { changePasswordWithLink } from "../../../../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Images
const bgColor = "#246C98";

function Cover() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token');

  const handleChangePassword = () => {
    if (!password || !confirmPassword) {
      toast.error("Required All Fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must be same");
      return;
    }

    if (!password.match(PASSWORD_REGEX)) {
      toast.error("Password must be 8 characters and of alphabets, and symbol and number");
      return;
    }

    changePasswordWithLink(password, token)
      .then((data) => {
        toast.success(data);
        navigate("/user/login");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
  };
  return (
    <CoverLayout image={bgColor} imgPosition="top" button={{ color: "info" }}>
      <Card>
       
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
                Create new Password
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
                Password
              </ArgonTypography>
              <ArgonInput
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                color="dark"
                sx={{ ml: 0.5, mb: 1 }}
              >
                Confirm Password
              </ArgonTypography>
              <ArgonInput
                type="password"
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </ArgonBox>

            <ArgonBox mt={3} mb={1} textAlign="center">
              <ArgonButton color="primary" fullWidth onClick={handleChangePassword}>
                Set New Password
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
