import Grid from "@mui/material/Grid";

import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import PieChart from "examples/Charts/PieChart/index";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";

// Argon Dashboard 2 PRO MUI base styles
import typography from "assets/theme/base/typography";

//import { getDashboardSummary, getTimeGraphData, getPayrollStatus } from "services/AdminService";

// Data
import { DASHBOARD_CARDS } from "constants";
import { useState, useEffect } from "react";

function Default() {
  const { size } = typography;
  const [spinner, setSpinner] = useState(true);
  const [isWeekly, setIsWeekly] = useState(false);
  const [payWeeklyCheck, setPayWeeklyCheck] = useState(false);
  const [cardsData, setCardsData] = useState([0, 0, 0, 0]); //[totalJobs, totalTeams, totalUsers, total_payout]
  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Hours Worked",
        color: "info",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });

  const [payrolChartData, setPayrollChartData] = useState({
    labels: ["Paid Amount", "Due Amount", "Overtime Due Amount"],
    datasets: [
      {
        label: "Payroll Status",
        data: [0, 0, 0],
        backgroundColor: [
          "rgba(251, 156, 64, 1)",
          "rgba(94, 114, 228, 1)",
          "rgba(45, 206, 188, 1)",
        ],
        borderColor: ["rgba(251, 156, 64, 1)", "rgba(94, 114, 228, 1)", "rgba(45, 206, 188, 1)"],
      },
    ],
  });

  const [totalPayout, setTotalPayout] = useState(0);

  const fetTimeGraph = () => {
    setSpinner(true);
    // getTimeGraphData({ weekly: isWeekly })
    //   .then((data) => {
    //     setChartData({
    //       labels: data?.labels,
    //       datasets: [
    //         {
    //           label: "Hours Worked",
    //           color: "info",
    //           data: data?.data,
    //         },
    //       ],
    //     });
    //     setSpinner(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const fetchPayrollStatus = () => {
    setSpinner(true);
    // getPayrollStatus({ weekly: payWeeklyCheck })
    //   .then((data) => {
    //     setTotalPayout(parseFloat(data?.total_payout));
    //     setPayrollChartData({
    //       labels: ["Paid Amount", "Due Amount", "Overtime Amount"],
    //       datasets: [
    //         {
    //           label: "Payroll Status",
    //           data: [
    //             `${parseFloat(data?.total_paid_amount)}`,
    //             `${parseFloat(data?.total_due_amount)}`,
    //             `${parseFloat(data?.total_over_time)}`,
    //           ],
    //           backgroundColor: [
    //             "rgba(251, 156, 64, 1)",
    //             "rgba(94, 114, 228, 1)",
    //             "rgba(45, 206, 188, 1)",
    //           ],
    //           borderColor: [
    //             "rgba(251, 156, 64, 1)",
    //             "rgba(94, 114, 228, 1)",
    //             "rgba(45, 206, 188, 1)",
    //           ],
    //         },
    //       ],
    //     });
    //     setSpinner(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const fetchSummary = () => {
    setSpinner(true);
    // getDashboardSummary()
    //   .then((data) => {
    //     setCardsData(() => [
    //       data?.totalJobs,
    //       data?.totalTeams,
    //       data?.totalUsers,
    //       data?.total_payout ? data?.total_payout.toFixed(2) : 0,
    //     ]);
    //     setSpinner(false);
    //   })
    //   .catch((error) => {
    //     setSpinner(false);
    //     console.log(error);
    //   });
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  useEffect(() => {
    fetTimeGraph();
  }, [isWeekly]);

  useEffect(() => {
    fetchPayrollStatus();
  }, [payWeeklyCheck]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ToastContainer />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          {DASHBOARD_CARDS.map((card, index) => (
            <Grid key={index} item xs={12} md={6} lg={3}>
              <DetailedStatisticsCard
                title={card.title}
                count={index === 3 ? "$" + cardsData[index] : cardsData[index]}
                icon={card.icon}
                percentage={null}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3} mb={3}>
          {spinner && <ProgressBar />}
          {/* total time stats graph  */}
          <Grid item xs={12} lg={7}>
            <GradientLineChart
              description={
                <ArgonBox display="flex" alignItems="center" justifyContent="space-between">
                  <ArgonTypography variant="button" color="text" fontWeight="medium">
                    Total Time Tracked
                  </ArgonTypography>

                  <ArgonBox sx={{ display: "flex", float: "right" }}>
                    <ArgonBox sx={{ width: "100%" }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="medium"
                        sx={{
                          width: "61px",
                          height: "36px !important",
                          padding: "10px",
                          borderRadius: "8px",
                          color: "#373D3F",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                        onClick={() => {
                          setIsWeekly(true);
                        }}
                      >
                        Weekly
                      </Button>
                      <Button
                        variant="contained"
                        size="medium"
                        onClick={() => {
                          setIsWeekly(false);
                        }}
                        sx={{
                          width: "61px",
                          height: "36px !important",
                          padding: "10px",
                          fontWeight: 400,
                          fontSize: "12px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(59, 152, 209, 1)",
                          color: "primary.contrastText",
                          marginLeft: "5px",
                          "&:hover": {
                            backgroundColor: "primary.main",
                          },
                        }}
                      >
                        Monthly
                      </Button>
                    </ArgonBox>
                  </ArgonBox>
                </ArgonBox>
              }
              chart={chartData}
            />
          </Grid>
          {/* amount stats chart  */}
          <Grid item xs={12} lg={5}>
            <PieChart
              description={
                <ArgonBox display="flex" alignItems="center" justifyContent="space-between">
                  <ArgonTypography variant="button" color="text" fontWeight="medium">
                    Payroll Status
                  </ArgonTypography>

                  <ArgonBox sx={{ display: "flex", float: "right" }}>
                    <ArgonBox sx={{ width: "100%" }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="medium"
                        sx={{
                          width: "61px",
                          height: "36px !important",
                          padding: "10px",
                          borderRadius: "8px",
                          color: "#373D3F",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                        onClick={() => {
                          setPayWeeklyCheck(true);
                        }}
                      >
                        Weekly
                      </Button>
                      <Button
                        variant="contained"
                        size="medium"
                        onClick={() => {
                          setPayWeeklyCheck(false);
                        }}
                        sx={{
                          width: "61px",
                          height: "36px !important",
                          padding: "10px",
                          fontWeight: 400,
                          fontSize: "12px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(59, 152, 209, 1)",
                          color: "primary.contrastText",
                          marginLeft: "5px",
                          "&:hover": {
                            backgroundColor: "primary.main",
                          },
                        }}
                      >
                        Monthly
                      </Button>
                    </ArgonBox>
                  </ArgonBox>
                </ArgonBox>
              }
              chart={payrolChartData}
              totalPayout={totalPayout}
            />
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Default;
