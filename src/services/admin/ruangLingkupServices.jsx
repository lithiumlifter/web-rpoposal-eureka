import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RuangLingkupServices = {
    getRuangLingkup: async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/master/data-ruang-lingkup?page=1&limit=10&keyword=`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Data ruang lingkup:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching ruang lingkup:', error.response?.data || error.message);
        throw error;
      }
    },

    submitRubahRuangLingkup: async (payload) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/master/edit-ruang-lingkup`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Ubah data ruang lingkup:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching ubah data ruang lingkup:', error.response?.data || error.message);
            throw error;
        }
    }
    
  };
  
export default RuangLingkupServices;
