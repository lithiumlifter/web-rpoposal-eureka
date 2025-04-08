import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const allDataProposal = {
    getAllDataProposal: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=1&limit=10&keyword=&status=Open`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data Proposal:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching Proposal:', error.response?.data || error.message);
            throw error;
        }
    },
};

export default allDataProposal;
