import amountIcon from "../assets/icons/dashboard-amount.svg";
import jobsIcon from "../assets/icons/dashboard-jobs.svg";
import teamsIcon from "../assets/icons/dashboard-teams.svg";
import usersIcon from "../assets/icons/dashboard-users.svg";

export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

export const FILE_SIZE = 10000000;
export const MIN_FILE_SIZE = 5000000;

export const USER_TITLES = {
  foreman: "Foreman",
  finisher: "Finisher",
  labour: "Labour",
  operator: "Operator",
};

export const ROLES = {
  admin: "admin",
  accountant: "accountant",
  supervisor: "supervisor",
  team_lead: "TEAM_LEAD",
  worker: "WORKER",
};

export const USER_TITLES_ENUM = [
  USER_TITLES.finisher,
  USER_TITLES.foreman,
  USER_TITLES.labour,
  USER_TITLES.operator,
];

export const ROLES_ENUM = [
  ROLES.admin,
  ROLES.accountant,
  ROLES.supervisor,
  ROLES.team_lead,
  ROLES.worker,
];
export const PAGE_ENTRIES = [5, 10, 15, 20];

export const JOB_STATUS = {
  completed: "completed",
  in_progress: "in progress",
  upcoming: "upcoming",
  closed: "closed",
};
export const CERTIFICATE_STATUS = {
  running: "running",
  expired: "expired",
};
export const JOB_STATUS_ENUM = [
  JOB_STATUS.completed,
  JOB_STATUS.in_progress,
  JOB_STATUS.upcoming,
  JOB_STATUS.closed,
];

export const DAILY_LOG_STATUS = {
  approved: "Approved",
  pending: "Pending",
};

export const DAILY_LOG_STATUS_ENUM = [DAILY_LOG_STATUS.approved, DAILY_LOG_STATUS.pending];

export const STATUS_COLOR = {
  completed: "#ecfdf5",
  "in progress": "#fdf7ec",
  upcoming: "#3b98d1",
  closed: "#fef2f2",
};

const JOB_STATUS_COLORS = [
  { value: "completed", label: "completed", backgroundColor: "#ecfdf5" },
  { value: "in progress", label: "in progress", backgroundColor: "#fdf7ec" },
  { value: "upcoming", label: "upcoming", backgroundColor: "#3b98d1" },
  { value: "closed", label: "closed", backgroundColor: "#fef2f2" },
  // Add more options with different background colors
];

export const CERTIFICATE_STATUS_ENUM = [CERTIFICATE_STATUS.running, CERTIFICATE_STATUS.expired];

export const DASHBOARD_CARDS = [
  { title: "Total Jobs", count: "$53,000", icon: { component: <img src={jobsIcon} alt="jobs" /> } },
  {
    title: "Total Teams",
    count: "$53,000",
    icon: { component: <img src={teamsIcon} alt="teams" /> },
  },
  {
    title: "Total Users",
    count: "$53,000",
    icon: { component: <img src={usersIcon} alt="users" /> },
  },
  {
    title: "Total Due Amount",
    count: "$53,000",
    icon: { component: <img src={amountIcon} alt="amount" /> },
  },
];

export const UPDATE_ENTRY = {
  description: "DESCRIPTION",
  colckIn: "CLOCK_IN",
  clockout: "CLOCK_OUT",
  job: "JOB",
};

export const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const addVehicleSteps = [
  {
    label: "Basic Info",
  },
  {
    label: "Ownership & Registeration",
  },
  {
    label: "Usage Tracking",
  },
  {
    label: "Maintenance Rules",
  },

  {
    label: "Service History",
  },
  {
    label: "Safety Inspection",
  },
  {
    label: "Additional Document",
  },
];

export const iconStyles = {
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

export const vehicleClass = [
  "Mini or Compact Class",
  "Midi Class",
  "Standard or Full-Size Class",
  "Heavy or Large Class",
  "Specialty Class",
  "Paving Class",
  "Compaction Class",
];

export const fuelTypes = ["Diesel", "Gasoline ", "Propane", "Natural Gas", "Electric", "Hybrid"];

export const serviceTypes = [
  "Routine Maintenance",
  "Repairs Inspections",
  "Parts Replacement",
  "Engine Overhauls",
  "Hydraulic System Service",
  "Fleet Management",
];

export const FORM_STATUS = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
};

export const FORM_STATUS_ENUM = [FORM_STATUS.pending, FORM_STATUS.approved, FORM_STATUS.rejected];

export const rules = [
  { oil_change: "Oil Change" },
  { tire_rotation: "Tire Rotation" },
  { brake_inspection: "Brake Inspection" },
  { fluid_level: "Fluid Level" },
  { air_filter: "Air Filter" },
  { battery_inspection: "Battery Inspection" },
  { fuel_filter: "Fuel Filter" },
  { wheel_bearing_lubrication: "Wheel Bearing Lubrication" },
  { coolant_system: "Coolant System" },
  { tire_pressure: "Tire Pressure" },
  { lighting_electrical_system: "Lighting Electrical System" },
  { hydraulic_fluid_and_filter_change: "Hydraulic Fluid and Filter Change" },
  { blade_inspection_and_sharpening: "Blade Inspection and Sharpening" },
  { grease_point_lubrication: "Grease Point Lubrication" },
];

export const vehicleSteps = {
  BASIC_INFO: 0,
  OWNERSHIP: 1,
  USAGE_TRACKING: 2,
  MAINTENENCE_RULE: 3,
  SERVICE_HISTORY: 4,
  SAFETY_INSPECTION: 5,
  ADDITIONAL_DOCUMENTS: 6,
};
