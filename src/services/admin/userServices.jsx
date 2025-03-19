import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const userServices = {
    getUser: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-user?page=1&limit=10&username=&name=&bisnis_unit=`, {
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
    }
};

export default userServices;
