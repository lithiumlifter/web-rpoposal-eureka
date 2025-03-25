import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const DetailProposal = {
  getDetailProposal: async (id_proposal) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/master/detail-proposal?id_proposal=${id_proposal}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data detail proposal:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching detail proposal:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default DetailProposal;
