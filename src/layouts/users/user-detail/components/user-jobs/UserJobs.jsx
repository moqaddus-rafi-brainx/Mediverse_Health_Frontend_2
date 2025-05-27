/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "./UserJobs.css";
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
import { useEffect, useState } from "react";
import ActionCell from "./components/ActionCell";
import FilterModal from "../../../../../components/Modals/FilterModal";
import InputCell from "./components/InputCell/index";
import ActionModal from "../../../../../components/Modals/ActionModal";
import { ToastContainer, toast } from "react-toastify";
import Trash from "../../../../../assets/icons/trash.svg";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { Checkbox, FormControlLabel } from "@mui/material";
import { getUserJobsDetails } from "services/AdminService";
import button from "assets/theme/components/button";
import { deleteTimeTrack } from "services/AdminService";
import { deleteTimeTracks } from "services/AdminService";

function UserJobs({ userId }) {
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [search, setSearch] = useState();
  const [jobs, setJobs] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalEntries, setTotalEntries] = useState();
  const [totalPages, setTotalPages] = useState();
  const [filterModal, setFilterModal] = useState(false);
  const [filters, setFilters] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteAllModal, setDeleteAllModal] = useState(false);
  const [jobDeleteId, setJobDeleteId] = useState({ user_id: "", job_id: "" });
  const [spinner, setSpinner] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleEdit = (id) => {
    navigate(`/admin/jobs/edit-job/${id}`);
  };

  const handleDelete = (id) => {
    setJobDeleteId({ user_id: userId, job_id: id });
    setDeleteModal(true);
  };

  const handleClose = () => {
    setFilterModal(false);
  };

  const handleCloseDelete = () => {
    setDeleteModal(false);
    setDeleteAllModal(false);
  };

  const confirmDelete = () => {
    deleteTimeTrack(jobDeleteId)
      .then((data) => {
        toast.success(data?.message);
        fetchJobs();
        setDeleteModal(false);
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  };

  const cancelDelete = () => {
    setDeleteModal(false);
    setDeleteAllModal(false);
    navigate(`/admin/user-management/user-detail/${userId}`);
  };

  const fetchJobs = () => {
    setSpinner(true);
    getUserJobsDetails(userId, {
      size: entriesPerPage,
      pageNo: pageNo,
      ...(search && { search: search }),
      ...(filters.start_date && {
        start_date: moment(filters.start_date).format("YYYY-MM-DD"),
      }),
      ...(filters.end_date && {
        end_date: moment(filters.end_date).format("YYYY-MM-DD"),
      }),
      ...(filters.status && {
        status: filters.status,
      }),
    })
      .then((data) => {
        setJobs(data?.data);
        setTotalEntries(data?.meta?.total_count);
        setTotalPages(data?.meta?.total_pages);
        setSpinner(false);
      })
      .catch((error) => {
        setSpinner(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, [search, entriesPerPage, pageNo, filters]);

  const selectAllItems = () => {
    if (selectedItems.length === jobs.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(jobs.map((job) => job.job_id));
    }
  };

  // Function to toggle the selection of an individual item
  const toggleSelectItem = (jobId) => {
    if (selectedItems.includes(jobId)) {
      setSelectedItems(selectedItems.filter((id) => id !== jobId));
    } else {
      setSelectedItems([...selectedItems, jobId]);
    }
  };

  const deleteAll = () => {
    const restructuredArray = selectedItems.map((item) => {
      return {
        user_id: userId,
        job_id: item,
      };
    });

    deleteTimeTracks(restructuredArray)
      .then((data) => {
        fetchJobs();
        setDeleteAllModal(false);
        toast.success(data?.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showFilters = () => {
    setFilterModal(true);
  };

  function SelectAll() {
    return (
      <>
        <ArgonBox display="flex" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox checked={selectedItems.length === jobs.length} onChange={selectAllItems} />
            }
          />
        </ArgonBox>
      </>
    );
  }

  function selectOne(jobId) {
    return (
      <>
        <ArgonBox display="flex" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedItems.includes(jobId)}
                onChange={() => toggleSelectItem(jobId)}
                key={jobId}
              />
            }
          />
        </ArgonBox>
      </>
    );
  }

  const jobName = (value, jobId) => {
    return (
      <>
        <ArgonTypography
          className={"job-name"}
          role={"button"}
          onClick={() => {
            navigate(`/admin/dashboard/${jobId}`);
          }}
        >
          {value}
        </ArgonTypography>
      </>
    );
  };

  const transformedData = jobs.map((job) => ({
    ...job,
    name: jobName(job?.name, job?._id),
    select_all: selectOne(job?.job_id),
    assigned_date: moment(job?.first_tracked_date).utc().format("MMM DD, YYYY"),
    last_tracked: moment(job?.last_tracked_date).utc().format("MMM DD, YYYY"),
    action: (
      <ActionCell
        handleDelete={() => handleDelete(job?.job_id)}
        handleEdit={() => handleEdit(job?.job_id)}
        type="Job"
      />
    ),
    status: <InputCell status={job?.status} id={job?._id} />,
  }));

  const dataTableData = {
    columns: [
      { Header: SelectAll(), accessor: "select_all" },
      { Header: "JOB ID", accessor: "union_id" },
      { Header: "JOB NAME", accessor: "name" },
      { Header: "TIME TRACKED", accessor: "total_time_tracked" },
      { Header: "ASSINGED DATE", accessor: "assigned_date" },
      { Header: "LAST TRACKED TIME", accessor: "last_tracked" },
      { Header: "JOB STATUS", accessor: "status" },
      { Header: "Action", accessor: "action", successor: "aa" },
    ],

    rows: transformedData,
  };

  return (
    <>
      <ToastContainer />
      <ArgonBox>
        <Card sx={{ overflow: "visible" }}>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                List of Jobs
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              <ArgonButton
                className={"delete-btn"}
                disabled={selectedItems.length === 0}
                onClick={() => setDeleteAllModal(true)}
              >
                Delete
              </ArgonButton>
            </Stack>
          </ArgonBox>
          {spinner && <ProgressBar />}
          <DataTable
            spinner={spinner}
            table={dataTableData}
            entriesPerPage={entriesPerPage}
            canSearch
            search={search}
            setSearch={setSearch}
            totalPages={totalPages}
            setEntriesPerPage={setEntriesPerPage}
            pageNo={pageNo}
            setPageNo={setPageNo}
            totalEntries={totalEntries}
            canFilter
            showFilter={showFilters}
          />
        </Card>
      </ArgonBox>
      <FilterModal open={filterModal} handleClose={handleClose} setFilters={setFilters} />
      <ActionModal
        open={deleteModal}
        handleClose={handleCloseDelete}
        title="Delete Time Track"
        icon={Trash}
        detail="Are you sure to delete Job Time Track?"
        handleYes={confirmDelete}
        handleNo={cancelDelete}
      />
      <ActionModal
        open={deleteAllModal}
        handleClose={handleCloseDelete}
        title="Delete Selected Time Tracks"
        icon={Trash}
        detail="Are you sure to delete Selected Time Tracks?"
        handleYes={deleteAll}
        handleNo={cancelDelete}
      />
    </>
  );
}

export default UserJobs;
