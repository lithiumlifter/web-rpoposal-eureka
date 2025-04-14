import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const userServices = {
    getUser: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-user?page=&limit=10&username=&name=&bisnis_unit=`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data user:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error.response?.data || error.message);
            throw error;
        }
    },
    getDetailUser: async (id_user) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-user-detail?id_user=${id_user}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data detail user:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching detail user:', error.response?.data || error.message);
            throw error;
        }
    },
    updateUser: async (userData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/master/update-user`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Update user response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default userServices;
