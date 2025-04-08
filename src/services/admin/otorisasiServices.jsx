import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const OtorisasiServices = {
    getOtorisasi: async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(`${BASE_URL}/master/data-otorisasi?page=1&limit=10&keyword=`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Data otorisasi successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error get data otorisasi:", error.response?.data || error.message);
            throw error;
        }
    },
    submitKonfigursiOtorisasi: async (otorisasiData) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${BASE_URL}/master/add-otorisasi`, otorisasiData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Data konfigurasi otorisasi successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error post data konfigurasi otorisasi:", error.response?.data || error.message);
            throw error;
        }
    },
        getDetailOtorisasi: async (id_otorisasi) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(`${BASE_URL}/master/detail-otorisasi?id_otorisasi=${id_otorisasi}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Data detail otorisasi successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error post data detail otorisasi:", error.response?.data || error.message);
            throw error;
        }
    },
    editKonfigurasiOtorisasi: async (otorisasiData) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${BASE_URL}/master/edit-otorisasi`, otorisasiData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Data edit konfigurasi otorisasi successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error post edit data konfigurasi otorisasi:", error.response?.data || error.message);
            throw error;
        }
    },
    deleteKonfigurasiOtorisasi: async (id_otorisasi) => {
        try {
            const token = localStorage.getItem("token");
    
            const response = await axios.post(
                `${BASE_URL}/master/delete-otorisasi?id_otorisasi=${id_otorisasi}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            
            console.log("Delete konfigurasi otorisasi successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error deleting data konfigurasi otorisasi:", error.response?.data || error.message);
            throw error;
        }
    },
    otorisasiProposal: async (body) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${BASE_URL}/master/otorisasi-proposal`,body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Data otorisasi proposal successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error post data otorisasi proposal:", error.response?.data || error.message);
            throw error;
        }
    },

    
};

export default OtorisasiServices;
