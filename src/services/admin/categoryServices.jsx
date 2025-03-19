import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CategoryService = {
    getCategories: async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/master/data-category`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Data categories:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
        throw error;
      }
    }
  };
  
export default CategoryService;
