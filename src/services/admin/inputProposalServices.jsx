import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const InputProposalServices = {
    submitProposal: async (proposalData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/master/create-proposal`, proposalData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Proposal submitted successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error submitting proposal:", error.response?.data || error.message);
            throw error;
        }
    },
};

export default InputProposalServices;
