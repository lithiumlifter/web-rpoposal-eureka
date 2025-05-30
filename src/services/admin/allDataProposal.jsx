import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const allDataProposal = {
     getImageHome: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-banner`, {
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
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=&limit=10&keyword=&status=RecievedPusat&bisnis_unit=&direktur=false`, {
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
    getAllDataProposalPSTDirektur: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=&limit=10&keyword=&status=RecievedPusat&bisnis_unit=&direktur=true`, {
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
    getAllDataProposalPSTDirekturEurekaLogistic: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=&limit=10&keyword=&status=RecievedPusat&bisnis_unit=11&direktur=true`, {
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
    getAllDataProposalPSTDirekturRajaCepat: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=&limit=10&keyword=&status=RecievedPusat&bisnis_unit=21&direktur=true`, {
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
    getAllDataProposalPSTDirekturEurekaBookhouse: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=&limit=10&keyword=&status=RecievedPusat&bisnis_unit=31&direktur=true`, {
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
    getAllDataProposalPSTDirekturMasterDiskon: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=&limit=10&keyword=&status=RecievedPusat&bisnis_unit=41&direktur=true`, {
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
    getAllDataProposalPSTDirekturKataRasa: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=&limit=10&keyword=&status=RecievedPusat&bisnis_unit=51&direktur=true`, {
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
    getAllDataProposalPSTDirekturJajaUsahaLaku: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=&limit=10&keyword=&status=RecievedPusat&bisnis_unit=61&direktur=true`, {
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
