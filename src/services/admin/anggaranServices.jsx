import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AnggaranServices = {
    getAnggaran: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/data-anggaran?page=1&limit=10&keyword=`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data Anggaran:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching anggaran:', error.response?.data || error.message);
            throw error;
        }
    },

    getDetailAnggaran: async (id_proposal) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/master/detail-anggaran?id_proposal=${id_proposal}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Data Detail Anggaran:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching detail anggaran:', error.response?.data || error.message);
            throw error;
        }
    },

    submitAnggaran: async (anggaranData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/master/create-anggaran`, anggaranData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Anggaran submitted successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error submitting anggaran:", error.response?.data || error.message);
            throw error;
        }
    },

    editAnggaran: async (anggaranData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/master/edit-anggaran`, anggaranData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Edit Anggaran submitted successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error submitting edit anggaran:", error.response?.data || error.message);
            throw error;
        }
    },
};

export default AnggaranServices;
