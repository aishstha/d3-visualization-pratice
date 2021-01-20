export default {
  fetching: true,
  error: null,
  projects: [],
  filters: {
    search: "",
    page: "1",
    "budget-range": "",
    road: "",
    status: "",
    sort_by: "",
    order_by: ""
  },
  stats: {
    bidders: 0,
    budget: {
      formatted: "",
      value: 0
    },
    expenditure: {
      formatted: "",
      value: 0
    },
    status_wise: {}
  }
};
