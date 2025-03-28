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
    editKonfigursiOtorisasi: async (otorisasiData) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${BASE_URL}/master/edit-otorisasi`, otorisasiData, {
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
    deleteKonfigursiOtorisasi: async (id) => {
        try {
            const token = localStorage.getItem("token");
    
            const response = await axios.delete(`${BASE_URL}/master/delete-otorisasi?id_otorisasi=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });            
    
            console.log("Delete konfigurasi otorisasi successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error deleting data konfigurasi otorisasi:", error.response?.data || error.message);
            throw error;
        }
    },    
};

export default OtorisasiServices;
