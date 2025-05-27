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
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import { useEffect, useState, useCallback } from "react";
import { getPatients } from "services/adminService";
import UserNameCell from "./components/UserNameCell";
import ProgressBar from "components/ProgressBar/ProgressBar";
import ActionCell from "./ActionCell";
import trashIcon from "../../../assets/icons/trash.svg";
import ActionModal from "components/Modals/ActionModal";
import { deletePatient } from "services/adminService";
import { toast } from "react-toastify";
import UserFilterModal from "components/Modals/UserFilterModal";
import { get, debounce } from "lodash";

function UsersList() {
  const navigate = useNavigate();

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [users, setUsers] = useState([{ union_id: 123, userName: "Ameer", title: "Test" }]);
  const [pageNo, setPageNo] = useState(1);
  const [totalEntries, setTotalEntries] = useState();
  const [totalPages, setTotalPages] = useState();
  const [spinner, setSpinner] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();
  const [filters, setFilters] = useState();
  const [filterModal, setFilterModal] = useState();

  // Debounced search handler
  const debouncedSearchHandler = useCallback(
    debounce((value) => {
      setDebouncedSearch(value);
      setPageNo(1); // Reset to first page when searching
    }, 500),
    []
  );

  // Update search value and trigger debounced search
  const handleSearchChange = (value) => {
    setSearch(value);
    setPageNo(1); // Reset to first page immediately when search changes
    debouncedSearchHandler(value);
  };

  const handleEdit = (id) => {
    //   navigate(`/admin/user-management/edit-user/${id}`);
  };

  const handleDetail = (id) => {
    //   navigate(`/admin/user-management/user-detail/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteUserId(id);
    setDeleteModal(true);
  };

  const confirmUserDelete = () => {
    setSpinner(true);
    deletePatient(deleteUserId)
      .then((data) => {
        toast.success("Patient deleted successfully");
        setDeleteModal(false);
        getPatientsListing();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message || "Failed to delete patient");
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  const getPatientsListing = () => {
    setSpinner(true);
    getPatients({
      size: entriesPerPage,
      pageNo: pageNo,
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(filters && {
        title: filters,
      }),
    })
      .then((data) => {
        if (data?.data) {
          setUsers(data.data);
          setTotalEntries(data?.meta?.total_count);
          setTotalPages(data?.meta?.total_pages);
        }
        setSpinner(false);
      })
      .catch((error) => {
        setSpinner(false);
        console.log(error);
        toast.error(error?.message || "Failed to fetch patients");
      });
  };

  useEffect(() => {
    getPatientsListing();
  }, [debouncedSearch, entriesPerPage, pageNo, deleteModal, filters]);

  const transformedData = users.map((user) => ({
    ...user,
    action: (
      <ActionCell
        handleDelete={() => handleDelete(user._id)}
        handleEdit={() => handleEdit(user._id)}
        handleDetail={() => handleDetail(user._id)}
        type="User"
      />
    ),
    userName: <UserNameCell img={user?.image} name={user?.name} />,
    submitted: user?.createdAt?.slice(0, 10),
    gender: user?.gender,
    id: user?.patientId,
  }));

  const dataTableData = {
    columns: [
      // { Header: "", accessor: "checkbox" },
      { Header: "Patient ID", accessor: "id" },
      { Header: "Name", accessor: "userName" },
      { Header: "Submitted", accessor: "submitted" },
      { Header: " Gender", accessor: "gender" },
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
                List of Patients
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              <Link to="/admin/user-management/create-patient">
                <ArgonButton
                  color="primary"
                  variant="contained"
                  size="medium"
                  style={{ fontWeight: "600" }}
                >
                  <span style={{ fontSize: "20px" }}>+</span>&nbsp; Add new Patient
                </ArgonButton>
              </Link>
            </Stack>
          </ArgonBox>
          {spinner && <ProgressBar />}
          <DataTable
            spinner={spinner}
            table={dataTableData}
            entriesPerPage={entriesPerPage}
            canSearch
            search={search}
            setSearch={handleSearchChange}
            totalPages={totalPages}
            setEntriesPerPage={setEntriesPerPage}
            pageNo={pageNo}
            setPageNo={setPageNo}
            totalEntries={totalEntries}
            alignItems={"left"}
            canFilter
            showFilter={() => setFilterModal(true)}
          />
        </Card>
      </ArgonBox>
      {/*
      <UserFilterModal
        open={filterModal}
        handleClose={() => setFilterModal(false)}
        setFilter={setFilters}
      /> */}
      <ActionModal
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        title="Delete Patient"
        icon={trashIcon}
        detail="Are you sure you want to delete this patient?"
        handleYes={confirmUserDelete}
        handleNo={() => setDeleteModal(false)}
      />
    </DashboardLayout>
  );
}

export default UsersList;
