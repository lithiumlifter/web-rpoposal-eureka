import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const allDataProposal = {
    getAllDataProposal: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=&limit=10&keyword=&status=Open`, {
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
    getAllDataProposalPST: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=&limit=10&keyword=&status=PST&bisnis_unit=`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data Proposal PST:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching Proposal:', error.response?.data || error.message);
            throw error;
        }
    },
    editProposal: async (payload) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/master/edit-proposal`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log('Proposal updated:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating Proposal:', error.response?.data || error.message);
            throw error;
        }
    },
};

export default allDataProposal;
