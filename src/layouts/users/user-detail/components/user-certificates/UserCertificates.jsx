/* eslint-disable react/prop-types */

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
import Stack from "@mui/material/Stack";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 PRO MUI example components
import DataTable from "examples/Tables/DataTable";

// Data
import { useEffect, useState } from "react";
import UserNameCell from "./components/UserNameCell";
import ProgressBar from "components/ProgressBar/ProgressBar";
import ActionCell from "./components/ActionCell";
import AddCertificateModal from "components/Modals/AddCertificateModal";
import FilterModal from "components/Modals/FilterModal";
import moment from "moment";
import { getUserCertifcates } from "services/AdminService";
import dayjs from "dayjs";
import "./UserCertificates.css";
import ActionModal from "components/Modals/ActionModal";
import trashIcon from "../../../../../assets/icons/trash.svg";
import { deleteUserCertificate } from "services/AdminService";
import { ToastContainer, toast } from "react-toastify";
import { downloadFile } from "services/utilities";
import { notifyUser } from "services/AdminService";
import pdfImage from "../../../../../assets/images/pdf-image.png";
import { isPdf } from "services/utilities";

function UserCertificates({ userId }) {
  const navigate = useNavigate();

  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState();
  const [users, setUsers] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalEntries, setTotalEntries] = useState();
  const [totalPages, setTotalPages] = useState();
  const [spinner, setSpinner] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [certificateId, setCertificateId] = useState();
  const [filters, setFilters] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [editCertificate, setEditCertificate] = useState();

  const handleEdit = (id) => {
    const foundCertificate = users.find((certificate) => {
      return certificate.user_id === userId && certificate.certificate_id === id;
    });

    if (foundCertificate) {
      setEditCertificate(foundCertificate);
      setAddModal(true);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    setSpinner(true);
    let deleteIdArray = [];
    deleteIdArray.push(deleteId);
    deleteUserCertificate(deleteIdArray)
      .then((data) => {
        toast.success(data?.message || "User Certificate deleted");
        getUserCertificateData();
        setSpinner(false);
        setDeleteModal(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went Wrong");
        setSpinner(false);
        setDeleteModal(false);
      });
  };

  const handleNotified = async (user_id, certificate_id) => {
    try {
      setSpinner(true);
      await notifyUser({ user_id, certificate_id });
      setSpinner(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async (attachment) => {
    await downloadFile(attachment);
  };

  const handleFilterStatus = (status) => {
    if (
      !status ||
      (status.includes("running") && status.includes("expired")) ||
      status.length === 0
    ) {
      return undefined;
    } else if (status.includes("running") && status.length === 1) {
      return true;
    } else if (status.includes("expired") && status.length === 1) {
      return false;
    }
  };

  const getUserCertificateData = () => {
    getUserCertifcates(userId, {
      size: entriesPerPage,
      pageNo: pageNo,
      ...(search && { search: search }),
      ...(filters.start_date && {
        issueDateStart: moment(filters.start_date).startOf("day").toDate(),
        issueDateEnd: moment(filters.start_date).endOf("day").toDate(),
      }),
      ...(filters.end_date && {
        validDateStart: moment(filters.end_date).startOf("day").toDate(),
        validDateEnd: moment(filters.end_date).endOf("day").toDate(),
      }),
      ...(filters.status && {
        is_valid: handleFilterStatus(filters.status),
        todayDate: moment(),
      }),
    })
      .then((data) => {
        setUsers(data?.data);
        setTotalEntries(data?.meta?.total_count);
        setTotalPages(data?.meta?.total_pages);
        setSpinner(false);
      })
      .catch((error) => {
        setSpinner(false);
      });
  };

  useEffect(() => {
    getUserCertificateData();
  }, [search, entriesPerPage, pageNo, filters, userId, addModal]);

  const getStatus = (validDate) => {
    const currentDate = dayjs();

    if (validDate && currentDate.isAfter(validDate)) {
      return <div className="expired-certificate">EXPIRED</div>;
    } else {
      return <div className="running-certificate">RUNNING</div>;
    }
  };

  const checkExpired = (validDate) => {
    const currentDate = dayjs();
    if (currentDate.isAfter(validDate)) {
      return true;
    } else {
      return false;
    }
  };

  const transformedData = users.map((user) => ({
    ...user,
    action: (
      <ActionCell
        handleDelete={() => handleDelete(user._id)}
        handleEdit={() => handleEdit(user?.certificate_id)}
        handleDownload={() => handleDownload(user.attachement)}
        handleNotified={() => handleNotified(user.user_id, user?.certificate_id)}
        type="Certificate"
        isExpired={checkExpired(user?.valid_till)}
      />
    ),
    certificateName: (
      <UserNameCell
        img={isPdf(user?.attachement) ? pdfImage : user?.attachement}
        name={user?.certificate?.name}
      />
    ),
    issueDate: moment(user?.issue_date).format("MMM DD, YYYY"),
    validTillDate: user?.valid_till ? moment(user.valid_till).format("MMM DD, YYYY") : "N/A",
    status: getStatus(user?.valid_till),
  }));

  const dataTableData = {
    columns: [
      { Header: "CERTIFICATE NAME", accessor: "certificateName" },
      { Header: "ISSUE DATE", accessor: "issueDate" },
      { Header: "VALID TILL DATE", accessor: "validTillDate" },
      { Header: "STATUS", accessor: "status" },
      { Header: "Action", accessor: "action" },
    ],

    rows: transformedData,
  };

  return (
    <ArgonBox my={3}>
      <ToastContainer />
      <Card sx={{ overflow: "visible" }}>
        <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
          <ArgonBox lineHeight={1}>
            <ArgonTypography variant="h5" fontWeight="medium">
              Certificates {users?.length > 0 ? `(${users?.length})` : "(0)"}
            </ArgonTypography>
          </ArgonBox>
          <Stack spacing={1} direction="row">
            <ArgonButton
              variant="outline"
              size="medium"
              style={{ fontWeight: "600", border: "1px solid #3b98d1", color: "#3b98d1" }}
              onClick={() => setAddModal(true)}
            >
              <span style={{ fontSize: "20px" }}>+</span>&nbsp; New Certificate
            </ArgonButton>
          </Stack>
        </ArgonBox>
        {spinner && <ProgressBar />}
        <DataTable
          spinner={spinner}
          table={dataTableData}
          entriesPerPage={entriesPerPage}
          canSearch
          canFilter
          search={search}
          setSearch={setSearch}
          totalPages={totalPages}
          setEntriesPerPage={setEntriesPerPage}
          pageNo={pageNo}
          setPageNo={setPageNo}
          totalEntries={totalEntries}
          alignItems={"left"}
          showFilter={() => setFilterModal(true)}
        />

        <AddCertificateModal
          open={addModal}
          user_id={userId}
          certificate_id={certificateId}
          handleClose={() => setAddModal(false)}
          userCertificate={editCertificate}
          setUserCertificate={setEditCertificate}
        />

        <FilterModal
          open={filterModal}
          handleClose={() => setFilterModal(false)}
          setFilters={setFilters}
          certificateType={true}
        />
        <ActionModal
          open={deleteModal}
          handleClose={() => setDeleteModal(false)}
          title="Delete User Certificate"
          icon={trashIcon}
          detail="Are you sure to delete User Certificate?"
          handleYes={confirmDelete}
          handleNo={() => setDeleteModal(false)}
        />
      </Card>
    </ArgonBox>
  );
}

export default UserCertificates;
