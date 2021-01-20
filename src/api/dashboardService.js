import customFiscalData from 'mocks/fiscalyear.json';

class DashboardService {

  async getProjectsStatsFiltered(filters = {}, mun = "road") {
   return this.formatData(customFiscalData, filters["fiscal-year"], mun);
  }

  formatData(response, fy, mun) {
    let data = {
      data: {
        overall: {},
        road_wise: {},
        month_wise: {}
      },
      fiscalyear: Object.keys(response.data[mun])
    };

    if (response.data[mun][fy]) {
      data.data = { ...response.data[mun][fy] };
    }
    return data;
  }
}

export default new DashboardService();
