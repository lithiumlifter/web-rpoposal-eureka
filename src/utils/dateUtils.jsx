const formatDate = (dateString) => {
    if (!dateString) return ""; // Jika kosong, kembalikan string kosong

    const months = {
        Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
        Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    };

    const parts = dateString.split(" ");
    if (parts.length < 3) return ""; // Jika format tidak sesuai, kembalikan string kosong

    const day = parts[0].padStart(2, "0");
    const month = months[parts[1]];
    const year = parts[2];

    return `${year}-${month}-${day}`; // Format YYYY-MM-DD
};

export default formatDate;