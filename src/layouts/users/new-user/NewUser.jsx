import { useEffect } from "react";
import {
  Card,
  TextField,
  Typography,
  FormLabel,
  Button,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { AttachMoney, AccessTime } from "@mui/icons-material";
import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { createPatient } from "services/adminService";
import { USER_TITLES_ENUM } from "constants";
import ArgonSelect from "components/ArgonSelect";
import SimpleModal from "components/Modals/SimpleModal";
import SuccessIcon from "../../../assets/icons/successIcon.svg";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPatientById } from "services/adminService";
import { updatePatientVitals } from "services/adminService";
import "./NewUser.css";
const { ROLES } = require("../../../constants");

const NewUser = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const signedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({
    unionId: "",
    unionName: "",
    name: "",
    email: "",
    title: "",
    hourlyRate: "",
    overtimeRate: "",
    weeklyHourLimit: "",
    phone: "",
  });
  const [nextPaymentRule, setNextPaymentRule] = useState({
    nextHourlyRate: 0,
    nextWeeklyHourLimit: 0,
    nextOvertimeRate: 0,
  });
  const [originalUser, setOriginalUser] = useState({});

  const [spinner, setSpinner] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [prevEmail, setPrevEmail] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const getDefaultValue = () => {
    if (!user.title) {
      return { value: null, label: "Please Select" };
    }
    return { value: user.title, label: user.title };
  };

  useEffect(() => {
    if (id) {
      getPatientById(id)
        .then((data) => {
          setUser({
            unionId: data?.user?.union_id,
            unionName: data?.user?.union_name,
            name: data?.user?.name,
            phone: data?.user?.phone,
            email: data?.user?.email,
            title: data?.user?.title,
            hourlyRate: data?.user?.payment_rule?.hourly_rate,
            weeklyHourLimit: data?.user?.payment_rule?.weekly_hour_limit,
            overtimeRate: data?.user?.payment_rule?.overtime_rate,
          });
          setPrevEmail(data?.user?.email);
          setOriginalUser(data?.user);
          setNextPaymentRule({
            nextHourlyRate: data?.user?.next_payment_rule?.hourly_rate,
            nextWeeklyHourLimit: data?.user?.next_payment_rule?.weekly_hour_limit,
            nextOvertimeRate: data?.user?.next_payment_rule?.overtime_rate,
          });
          setSpinner(false);
        })
        .catch((error) => {
          setSpinner(false);
          console.log(error);
        });
    } else {
      setSpinner(false);
    }
  }, [id]);

  const handleSubmit = () => {
    if (
      !user.unionId ||
      !user.email ||
      !user.name ||
      !user.title ||
      !user.phone ||
      !user.unionName
    ) {
      toast.error("Required All Mandatory feilds");
      return;
    }
    setSpinner(true);
    if (id) {
      updatePatientVitals(id, {
        unionId: user?.unionId,
        unionName: user?.unionName,
        name: user?.name,
        phone: user?.phone,
        email: user?.email,
        title: user?.title,
        hourlyRate:
          user?.hourlyRate !== originalUser?.payment_rule?.hourly_rate ||
          user?.weeklyHourLimit !== originalUser?.payment_rule?.weekly_hour_limit ||
          user?.overtimeRate !== originalUser?.payment_rule?.overtime_rate
            ? Number(user?.hourlyRate)
            : null,
        weeklyHourLimit:
          user?.hourlyRate !== originalUser?.payment_rule?.hourly_rate ||
          user?.weeklyHourLimit !== originalUser?.payment_rule?.weekly_hour_limit ||
          user?.overtimeRate !== originalUser?.payment_rule?.overtime_rate
            ? Number(user?.weeklyHourLimit)
            : null,
        overtimeRate:
          user?.hourlyRate !== originalUser?.payment_rule?.hourly_rate ||
          user?.weeklyHourLimit !== originalUser?.payment_rule?.weekly_hour_limit ||
          user?.overtimeRate !== originalUser?.payment_rule?.overtime_rate
            ? Number(user?.overtimeRate)
            : null,
        prevEmail: prevEmail,
      })
        .then((data) => {
          console.log("in then block");
          console.log("response", data);
          if (!data?.titleCanChange) {
            toast.warn(
              "Unable to modify the User title, as he/she is the sole team leader in his/her respective team."
            );
          }
          setSpinner(false);
          setShowModal(true);
          navigate(
            state?.userId
              ? `/admin/user-management/user-detail/${state?.userId}`
              : "/admin/user-management"
          );
        })
        .catch((error) => {
          console.log("in error");
          setSpinner(false);
          toast.error(error.response.data.error);
          console.log(error);
        });
    } else {
      createPatient(user)
        .then(() => {
          setSpinner(false);
          setShowModal(true);
        })
        .catch((error) => {
          setSpinner(false);
          toast.error(error.response.data.error);
        });
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/admin/user-management");
  };

  const iconStyles = {
    width: "2.5rem",
    height: "2.5rem",
    backgroundColor: "primary.main",
    color: "primary.contrastText",
    borderRadius: "4px",
    marginLeft: "-12px",
    "&:hover": {
      backgroundColor: "primary.main",
    },
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <ToastContainer />
        <ArgonBox py={6}>
          <Card sx={{ width: "60%", margin: "auto auto", overflow: "visible" }}>
            {spinner ? (
              <ProgressBar />
            ) : (
              <ArgonBox sx={{ padding: "2%" }}>
                <Typography variant="h4" my={1}>
                  {id ? "Edit User" : "Add New User"}
                </Typography>
                <Typography variant="h6" fontWeight={"normal"}>
                  Please fill the following fields.
                </Typography>
                <ArgonBox sx={{ display: "flex", margin: "3% 0" }}>
                  <ArgonBox sx={{ width: "45%" }}>
                    <FormLabel sx={{ fontSize: "14px" }}>
                      Union ID <span className="required-color">*</span>
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Enter ID"
                      name="unionId"
                      value={user.unionId}
                      onChange={handleChange}
                    />
                  </ArgonBox>

                  <ArgonBox sx={{ width: "45%", margin: "0 0 0 8%" }}>
                    <FormLabel sx={{ fontSize: "14px" }}>
                      Union Name <span className="required-color">*</span>
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Enter Union Name"
                      name="unionName"
                      value={user.unionName}
                      onChange={handleChange}
                    />
                  </ArgonBox>
                </ArgonBox>

                <ArgonBox sx={{ display: "flex", margin: "3% 0" }}>
                  <ArgonBox sx={{ width: "45%" }}>
                    <FormLabel sx={{ fontSize: "14px" }}>
                      User Name <span className="required-color">*</span>
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Enter name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </ArgonBox>

                  <ArgonBox sx={{ width: "45%", margin: "0 0 0 8%" }}>
                    <FormLabel sx={{ fontSize: "14px" }}>
                      Email <span className="required-color">*</span>
                    </FormLabel>
                    <TextField
                      fullWidth
                      placeholder="Enter Email"
                      name="email"
                      type="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </ArgonBox>
                </ArgonBox>

                <ArgonBox sx={{ display: "flex", margin: "3% 0" }}>
                  <ArgonBox sx={{ width: "45%" }}>
                    <FormLabel sx={{ fontSize: "14px" }}>
                      Phone Number <span className="required-color">*</span>
                    </FormLabel>
                    <PhoneInput
                      containerClass="phoneContainer"
                      inputStyle={{ width: "100%" }}
                      placeholder="123-456-789"
                      country={"us"}
                      prefix="+"
                      value={user.phone}
                      onChange={(value) =>
                        setUser((prev) => {
                          return { ...prev, phone: value };
                        })
                      }
                    />
                  </ArgonBox>

                  <ArgonBox sx={{ width: "45%", margin: "0 0 0 8%" }}>
                    <FormLabel sx={{ fontSize: "14px" }}>
                      Title <span className="required-color">*</span>
                    </FormLabel>
                    <ArgonSelect
                      defaultValue={getDefaultValue()}
                      options={USER_TITLES_ENUM.map((entry) => ({ value: entry, label: entry }))}
                      onChange={({ value }) => {
                        setUser((prev) => {
                          return { ...prev, title: value };
                        });
                      }}
                      name="title"
                      size="medium"
                    />
                  </ArgonBox>
                </ArgonBox>

                {signedUser?.role !== ROLES.supervisor && (
                  <>
                    <ArgonBox sx={{ display: "flex", margin: "3% 0" }}>
                      <ArgonBox sx={{ width: "45%" }}>
                        <FormLabel sx={{ fontSize: "14px" }}>Hourly Rate</FormLabel>
                        <div>
                          {id && nextPaymentRule?.nextHourlyRate ? (
                            <Tooltip
                              title={`The hourly rate was updated to $${nextPaymentRule?.nextHourlyRate} by the admin. This change will be effective from coming Monday.`}
                              placement="top"
                            >
                              <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Enter hourly rate"
                                name="hourlyRate"
                                type="number"
                                value={user.hourlyRate}
                                onChange={handleChange}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <IconButton sx={iconStyles}>
                                        <AttachMoney />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Tooltip>
                          ) : (
                            <TextField
                              variant="outlined"
                              fullWidth
                              placeholder="Enter hourly rate"
                              name="hourlyRate"
                              type="number"
                              value={user.hourlyRate}
                              onChange={handleChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <IconButton sx={iconStyles}>
                                      <AttachMoney />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        </div>
                      </ArgonBox>
                      <ArgonBox sx={{ width: "45%", marginLeft: "8%" }}>
                        <FormLabel sx={{ fontSize: "14px" }}>Overtime Rate</FormLabel>
                        <div>
                          {id && nextPaymentRule?.nextHourlyRate ? (
                            <Tooltip
                              title={`The overtime rate was updated to $${nextPaymentRule?.nextOvertimeRate} by the admin. This change will be effective from coming Monday.`}
                              placement="top"
                            >
                              <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Enter overtime rate"
                                type="number"
                                inputMode="numeric"
                                name="overtimeRate"
                                value={user.overtimeRate}
                                onChange={handleChange}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <IconButton sx={iconStyles}>
                                        <AttachMoney />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Tooltip>
                          ) : (
                            <TextField
                              variant="outlined"
                              fullWidth
                              placeholder="Enter overtime rate"
                              type="number"
                              inputMode="numeric"
                              name="overtimeRate"
                              value={user.overtimeRate}
                              onChange={handleChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <IconButton sx={iconStyles}>
                                      <AttachMoney />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        </div>
                      </ArgonBox>
                    </ArgonBox>

                    <ArgonBox sx={{ display: "flex", margin: "3% 0" }}>
                      <ArgonBox sx={{ width: "45%" }}>
                        <FormLabel sx={{ fontSize: "14px" }}>Weekly Hourly Limit</FormLabel>
                        <div>
                          {id && nextPaymentRule?.nextWeeklyHourLimit ? (
                            <Tooltip
                              title={`The weekly hour limit was updated to ${nextPaymentRule?.nextWeeklyHourLimit} hours per week by the admin. This change will be effective from coming Monday.`}
                              placement="top"
                            >
                              <TextField
                                variant="outlined"
                                placeholder="Enter weekly hourly limit"
                                fullWidth
                                type="number"
                                name="weeklyHourLimit"
                                value={user.weeklyHourLimit}
                                onChange={handleChange}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <IconButton sx={iconStyles}>
                                        <AccessTime />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Tooltip>
                          ) : (
                            <TextField
                              variant="outlined"
                              placeholder="Enter weekly hourly limit"
                              fullWidth
                              type="number"
                              name="weeklyHourLimit"
                              value={user.weeklyHourLimit}
                              onChange={handleChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <IconButton sx={iconStyles}>
                                      <AccessTime />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        </div>
                      </ArgonBox>
                    </ArgonBox>
                  </>
                )}

                <ArgonBox sx={{ display: "flex", margin: "4% 0", float: "right" }}>
                  <ArgonBox sx={{ width: "100%" }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="medium"
                      sx={{
                        fontWeight: 500,
                        borderRadius: 1,
                        color: "#373D3F",
                      }}
                      onClick={() =>
                        navigate(
                          state?.userId
                            ? `/admin/user-management/user-detail/${state?.userId}`
                            : "/admin/user-management"
                        )
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={handleSubmit}
                      sx={{
                        fontWeight: 500,
                        borderRadius: 1,
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        marginLeft: "5px",
                        "&:hover": {
                          backgroundColor: "primary.main",
                        },
                      }}
                    >
                      {id ? "Save Changes" : "Add User"}
                    </Button>
                  </ArgonBox>
                </ArgonBox>
              </ArgonBox>
            )}
          </Card>
        </ArgonBox>
      </DashboardLayout>
      <SimpleModal
        open={showModal}
        handleClose={handleClose}
        title={id ? "User Updated" : "User Added"}
        icon={SuccessIcon}
        detail={`User has successfully been ${id ? "Updated." : "Added."}`}
      />
    </>
  );
};

export default NewUser;
