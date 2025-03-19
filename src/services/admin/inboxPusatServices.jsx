import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const inboxCabangServices = {
    getInboxCabang: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal-pusat?page=1&limit=10&keyword=`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data Inbox Pusat:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching inbox pusat:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default inboxCabangServices;
