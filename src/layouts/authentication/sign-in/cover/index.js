import { useState, useEffect } from "react";
import "./style.css";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import { Alert } from "@mui/material";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

import { login, verifyLogin } from "../../../../services/authService";
import { PASSWORD_REGEX } from "constants";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { ToastContainer, toast } from "react-toastify";

// Images
const bgColor = "#246C98";

function Cover() {
  const [rememberMe, setRememberMe] = useState(() => {
    // Check if remember me was previously set
    return localStorage.getItem('rememberMe') === 'true';
  });

  const handleSetRememberMe = () => {
    const newValue = !rememberMe;
    setRememberMe(newValue);
    localStorage.setItem('rememberMe', newValue);
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    // Check if user is already logged in by checking for tokens
    const accessToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const user = localStorage.getItem('user');
    
    console.log('Login Check:', {
      accessToken: !!accessToken,
      refreshToken: !!refreshToken,
      user: !!user
    });
    
    if (accessToken && refreshToken && user) {
      console.log('User is logged in, redirecting to user management');
      navigate("/admin/user-management");
    } else {
      console.log('User is not logged in, staying on login page');
    }
  }, [navigate]);

  const signIn = () => {
    if (!email || !password) {
      toast.error("Email and Password required.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password Must be 8 characters long.");
      return;
    }
    if (!password.match(PASSWORD_REGEX)) {  
      toast.error("Password must contain atleast 8 characters and must contain numbers, symbols and alphabets.");
      return;
    }

    login(email, password)
      .then((data) => {
        console.log('Login successful, storing data:', data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("refresh_token", data?.refresh_token);
        
        // Store access token based on remember me preference
        if (rememberMe) {
          localStorage.setItem('access_token', data?.access_token);
        } else {
          sessionStorage.setItem('access_token', data?.access_token);
        }
        
        console.log('Stored tokens:', {
          accessToken: !!localStorage.getItem('access_token'),
          refreshToken: !!localStorage.getItem('refresh_token'),
          user: !!localStorage.getItem('user')
        });
        navigate("/admin/user-management");
      })
      .catch((error) => {
        console.log(error);
        // Show error message from backend response
        const errorMessage = error?.response?.data?.message || error?.response?.data?.error || "Something went wrong";
        toast.error(errorMessage);
      });
  };

  return (
    <>
    <CoverLayout
      // title="Welcome!"
      // description="Use these awesome forms to login or create new account in your project for free."
      image={bgColor}
    >
      <Card>
        <ArgonBox pt={3} px={3}>
          <ArgonTypography variant="h3" color="dark" fontWeight="bold" mb={1}>
            Welcome back
          </ArgonTypography>
          <ArgonTypography variant="body2" color="text">
            Enter your email and password to sign in
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox p={3}>
          <ArgonBox component="form" role="form">
            <ArgonBox mb={3}>
              <ArgonTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                color="dark"
                sx={{ ml: 0.5, mb: 1 }}
              >
                Email
              </ArgonTypography>
              <ArgonInput
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </ArgonBox>
            <ArgonBox mb={3}>
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
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mt={4}>
              <ArgonButton color="primary" fullWidth onClick={signIn}>
                Sign In
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
        <ArgonBox pb={4} px={1} textAlign="center">
          <ArgonTypography variant="button" fontWeight="regular" color="text">
            Can&apos;t remember the password?{" "}
            <ArgonTypography
              component={Link}
              to="/user/reset-password"
              variant="button"
              fontWeight="regular"
              color="primary"
            >
              Reset Here
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </Card>
    </CoverLayout>
    </>
  );
}

export default Cover;
