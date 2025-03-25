import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const inboxCabangServices = {
    getInboxCabang: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=1&limit=10&keyword=&status=Open`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data Inbox Cabang:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching inbox cabang:', error.response?.data || error.message);
            throw error;
        }
    },

    approveProposalCabang: async (id_proposal) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/master/approve-proposal?id_proposal=${id_proposal}`, {}, {
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

    cancelProposalCabang: async (id_proposal) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(`${BASE_URL}/master/cancel-proposal?id_proposal=${id_proposal}`, {}, {
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
    } 
};

export default inboxCabangServices;
