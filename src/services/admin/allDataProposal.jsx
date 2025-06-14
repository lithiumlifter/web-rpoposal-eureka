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
            const response = await axios.get(`${BASE_URL}/master/data-proposal?page=&limit=10&keyword=&status=RecievedPusat&bisnis_unit=&direktur=`, {
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
    addImageProposal: async (id_proposal, imageFiles) => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("id_proposal", id_proposal);
            imageFiles.forEach((file) => {
                formData.append("images", file);
            });

            const response = await axios.post(`${BASE_URL}/master/add-image-proposal`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Image upload success:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error uploading images:", error.response?.data || error.message);
            throw error;
        }
    },
    deleteImageProposal: async (id_image) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/master/delete-image-proposal`, { id_image }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Image deleted:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error deleting image:", error.response?.data || error.message);
            throw error;
        }
    },
};

export default allDataProposal;
