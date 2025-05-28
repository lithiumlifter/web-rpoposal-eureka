import axios from 'axios';
const KaryawanServices = {
    getKaryawan: async (emp_id) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://api.dashboard.eurekagroup.id/employee/get/${emp_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Data karyawan:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching karyawan:', error.response?.data || error.message);
        throw error;
      }
    }
  };
  
export default KaryawanServices;
