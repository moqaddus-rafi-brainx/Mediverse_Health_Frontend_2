/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import { useEffect, useState } from "react";
import ProgressBar from "components/ProgressBar/ProgressBar";
import ActionCell from "./components/ActionCell";
import trashIcon from "../../assets/icons/trash.svg";
import ActionModal from "components/Modals/ActionModal";
// import { deleteUser } from "services/AdminService";
import { toast } from "react-toastify";
// import { getAdminNotifications } from "services/AdminService";
import moment from "moment";
import "./index.css";
// import { deleteNotification } from "services/AdminService";
// import { deleteNotificationAll } from "services/AdminService";
// import { markNotificationRead } from "services/AdminService";
// import { markNotificationReadAll } from "services/AdminService";

function Notifications() {
  const navigate = useNavigate();

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [search, setSearch] = useState();
  const [users, setUsers] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalEntries, setTotalEntries] = useState();
  const [totalPages, setTotalPages] = useState();
  const [spinner, setSpinner] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteAllModal, setDeleteAllModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();

  const handleDetail = (id) => {
    navigate(`/admin/user-management/user-detail/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteUserId(id);
    setDeleteModal(true);
  };

  const confirmDelete = () => {};

  const confirmDeleteAll = () => {};

  const markReadAll = () => {};

  const handleNotificationClick = (notificatioId, userId) => {};

  const getNotificationText = (user) => {
    return (
      <>
        <div
          role="button"
          onClick={() => handleNotificationClick(user?._id, user?.userId)}
          className={`notification-div ${!user?.is_seen_by_admin && "notification-div-unseen"}`}
        >
          <span className="notification-text"> {user?.certificateName}</span> Assigned to{" "}
          {user?.userName} has Expired on {moment(user?.createdAt).format("DD-MM-YYYY")}.
        </div>
      </>
    );
  };

  useEffect(() => {
    // getUsersListing();
  }, [search, entriesPerPage, pageNo, deleteModal]);

  const transformedData = users.map((user) => ({
    ...user,
    notificationText: getNotificationText(user),
    action: <ActionCell handleDelete={() => handleDelete(user._id)} type="Notification" />,
  }));

  const dataTableData = {
    columns: [
      { Header: "Notifications", accessor: "notificationText" },
      { Header: "Action", accessor: "action" },
    ],

    rows: transformedData,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox my={3}>
        <Card sx={{ overflow: "visible" }}>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                Notifications Of Expired Certificates
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start">
              <ArgonBox>
                <button className="btn-mark" onClick={markReadAll}>
                  Mark All Read
                </button>
              </ArgonBox>
              <ArgonBox>
                <button className="btn-delete" onClick={() => setDeleteAllModal(true)}>
                  Delete All
                </button>
              </ArgonBox>
            </ArgonBox>
          </ArgonBox>

          {spinner && <ProgressBar />}
          <DataTable
            spinner={spinner}
            table={dataTableData}
            entriesPerPage={entriesPerPage}
            search={search}
            setSearch={setSearch}
            totalPages={totalPages}
            setEntriesPerPage={setEntriesPerPage}
            pageNo={pageNo}
            setPageNo={setPageNo}
            totalEntries={totalEntries}
            alignItems={"left"}
          />
        </Card>
      </ArgonBox>
      <ActionModal
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        title="Delete Notification"
        icon={trashIcon}
        detail="Are you sure to delete Notification?"
        handleYes={confirmDelete}
        handleNo={() => setDeleteModal(false)}
      />
      <ActionModal
        open={deleteAllModal}
        handleClose={() => setDeleteModal(false)}
        title="Delete All Notifications"
        icon={trashIcon}
        detail="Are you sure to delete All Notifications?"
        handleYes={confirmDeleteAll}
        handleNo={() => setDeleteAllModal(false)}
      />
    </DashboardLayout>
  );
}

export default Notifications;
