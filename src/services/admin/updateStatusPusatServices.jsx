import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const updateStatusPusatServices = {
    getUpdateStatusPusatServices: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=&limit=10&keyword=&status=RecievedPusat`, {
                headers: {  
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data update Pusat:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching update Pusat:', error.response?.data || error.message);
            throw error;
        }
    },

    approveProposalPusat: async (id_proposal) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/master/approve-proposal-pusat?id_proposal=${id_proposal}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(`Proposal dengan ID ${id_proposal} berhasil di-approve`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Gagal approve proposal ID ${id_proposal}:`, error.response?.data || error.message);
            throw error;
        }
    },

    cancelProposalPusat: async (id_proposal) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(`${BASE_URL}/master/cancel-proposal-pusat?id_proposal=${id_proposal}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(`Proposal dengan ID ${id_proposal} berhasil di-cancel`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Gagal cancel proposal ID ${id_proposal}:`, error.response?.data || error.message);
            throw error;
        }
    },
    closeProposalPusat: async (id_proposal) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(`${BASE_URL}/master/update-status-pusat?id_proposal=${id_proposal}&status=Approve`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(`Proposal dengan ID ${id_proposal} berhasil di-close`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Gagal close proposal ID ${id_proposal}:`, error.response?.data || error.message);
            throw error;
        }
    }  
};

export default updateStatusPusatServices;
