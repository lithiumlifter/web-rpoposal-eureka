import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AllReportServices = {
    getReportKPI: async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/master/data-report-kpi?page=&limit=10&keyword=&type=transdate&fromDate=2025-01-31&toDate=2025-03-31&level=&status=`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Data report KPI:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching report KPI:', error.response?.data || error.message);
        throw error;
      }
    },

    getProposalReport: async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${BASE_URL}/master/data-report?page=&limit=10&keyword=&type=transdate&fromDate=2025-01-31&toDate=2025-03-31&bisnis_unit=&ruang_lingkup=&status=`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('Data report proposal:', response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching report proposal:', error.response?.data || error.message);
          throw error;
        }
      },
      
      getReportCabang: async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${BASE_URL}/master/data-report-cabang?page=&limit=10&keyword=&type=transdate&fromDate=2025-01-31&toDate=2025-03-31&bisnis_unit=&ruang_lingkup=&status=`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('Data report proposal:', response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching report proposal:', error.response?.data || error.message);
          throw error;
        }
      }
  };
  
export default AllReportServices;
