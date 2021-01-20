import { getMunData } from "utils";
const data = getMunData();

const commonEnglish = {
  header: "D3 visualization pratice",
  headerDistrict: `${data.contact_en.region} ${data.municipality_en}`,
  total_projects: "TOTAL PROJECTS",
  worth_of_projects: "WORTH OF PROJECTS",
  running: "Running",
  not_started: "Not Started",
  incomplete: "Incomplete",
  tendered: "Tendered",
  pipeline: "Pipeline",
  implementation: "Implemented",
  implemented: "Implemented",
  cancelled: "Cancelled",
  completed: "Completed",
  completion: "Completed",
  dataNotAvailable: "Sorry we could not find any data!",
  roads: "Roads",
  status: "STATUS",
  progressBarTitle: "BUDGET VS. EXPENDITURE",
  budget: "Budget",
  expenditure: "Expenditure",
  circularProgressBarTitle: "OVERALL PROJECT PROGRESS",
  physical: "Physical",
  financial: "Financial",
  physicalProgress: "Physical Progress",
  financialProgress: "Financial Progress",
  progress: "Progress",
  stats: "stats",
  dollor: "$",
  indollor: "in $",
  projects: "projects",
  fiscalyear: "Fiscal Year"
};

export { commonEnglish };
