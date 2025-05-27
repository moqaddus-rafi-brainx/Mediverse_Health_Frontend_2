/* eslint-disable react/prop-types */
// react-router-dom components
import { useNavigate } from "react-router-dom";
import "./UserCard.css";
// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import PaymentModal from "components/Modals/PaymentModal";
// Data
import { useEffect, useState } from "react";
import { getUser } from "services/AdminService";
import ArgonButton from "components/ArgonButton";
import editIcon from "../../../../../assets/icons/edit-user.svg";
import { updatePaymentRule } from "services/AdminService";
import { ToastContainer, toast } from "react-toastify";
import { isDatePassed } from "services/utilities";
import userImage from "../../../../../assets/images/user-profile.png";
import ProgressBar from "components/ProgressBar/ProgressBar";

function UserCard({ userId }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [updated, setUpdated] = useState(false);
  const signedUser = JSON.parse(localStorage.getItem("user"));
  const [spinner, setSpinner] = useState(false);

  const [user, setUser] = useState({
    union_id: "",
    union_name: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    paymet_rule_effective_from: "",
  });

  const [paymentRule, setPaymentRule] = useState({
    hourly_rate: "",
    overtime_rate: "",
    weekly_hour_limit: "",
    vacation_0rate: "",
  });

  const [nextPaymentRule, setNextPaymentRule] = useState({
    hourly_rate: "",
    overtime_rate: "",
    weekly_hour_limit: "",
    vacation_rate: "",
  });

  const handleUpdate = () => {
    if (
      !paymentRule?.overtime_rate ||
      !paymentRule?.hourly_rate ||
      !paymentRule?.weekly_hour_limit ||
      !paymentRule?.vacation_rate
    ) {
      toast.error("Required All Mandatory feilds");
      return;
    }
    setSpinner(true);
    setShowModal(false);

    updatePaymentRule(userId, paymentRule)
      .then((data) => {
        setUpdated(!updated);
        toast.success(data?.message);
        setSpinner(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
        setSpinner(false);
      });
  };

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then((data) => {
          setUser(data?.user);
          setPaymentRule(data?.paymentRule);
          setNextPaymentRule(data?.user?.next_payment_rule);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [updated, userId]);

  const handleClose = () => {
    setShowModal(false);
    setUpdated(!updated);
  };

  return (
    <>
      <ArgonBox my={1}>
        <ToastContainer />
        {spinner && <ProgressBar />}
        <Card sx={{ overflow: "visible" }}>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox>
              <ArgonTypography className={"text-heading"}>Union Id</ArgonTypography>
              <ArgonTypography className={"text-title"}>{user?.union_id || "N/A"}</ArgonTypography>
            </ArgonBox>
            <ArgonBox>
              <ArgonTypography className={"text-heading"}>Union Name</ArgonTypography>
              <ArgonTypography className={"text-title"}>
                {user?.union_name || "N/A"}
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox>
              <ArgonTypography className={"text-heading"}>Name</ArgonTypography>
              <ArgonBox display="flex" alignItems="center" justifyContent="space-between">
                <img src={user?.image || userImage} alt="profile" className="profile-avatar me-1" />
                <ArgonTypography className={"text-title"}>{user?.name || "N/A"}</ArgonTypography>
              </ArgonBox>
            </ArgonBox>{" "}
            <ArgonBox>
              <ArgonTypography className={"text-heading"}>Title</ArgonTypography>
              <ArgonTypography className={"text-title"}>{user?.title || "N/A"}</ArgonTypography>
            </ArgonBox>{" "}
            <ArgonBox>
              <ArgonTypography className={"text-heading"}>Email</ArgonTypography>
              <ArgonTypography className={"text-title"}>{user?.email || "N/A"}</ArgonTypography>
            </ArgonBox>{" "}
            <ArgonBox>
              <ArgonTypography className={"text-heading"}>Phone</ArgonTypography>
              <ArgonTypography className={"text-title"}>
                {user?.phone ? "+" + user?.phone : "N/A"}
              </ArgonTypography>
            </ArgonBox>{" "}
            <ArgonBox>
              <ArgonTypography className={"text-heading"}>Team</ArgonTypography>
              <ArgonTypography className={"text-title"}>
                {user?.team ? user?.team?.name : "N/A"}
              </ArgonTypography>
            </ArgonBox>{" "}
            <ArgonBox>
              {signedUser?.role !== "supervisor" && (
                <ArgonButton
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={() => setShowModal(true)}
                  className="configure-button"
                >
                  Configure Payment Rule
                </ArgonButton>
              )}
              <ArgonButton
                className={"edit-btn"}
                onClick={() =>
                  navigate(`/admin/user-management/edit-user/${userId}`, { state: { userId } })
                }
              >
                <img src={editIcon} alt="" /> &nbsp; Edit
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </Card>
      </ArgonBox>
      <PaymentModal
        userId={userId}
        open={showModal}
        handleClose={handleClose}
        setPaymentRule={setPaymentRule}
        handleUpdate={handleUpdate}
        payment={
          // nextPaymentRule && isDatePassed(user?.paymet_rule_effective_from)
          //   ? nextPaymentRule
          //   :
          paymentRule
        }
        nextPaymentRule={nextPaymentRule?.hourly_rate !== "" ? nextPaymentRule : null}
      />
    </>
  );
}

export default UserCard;
