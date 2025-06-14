import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ApprovalHistoryServices = {
    getApprovalHistory: async (emplid) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/master/data-proposal?keyword=&emplid=${emplid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Data approval history:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching approval history:', error.response?.data || error.message);
        throw error;
      }
    }
  };
  
export default ApprovalHistoryServices;
