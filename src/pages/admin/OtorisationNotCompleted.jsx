import { useState, useEffect } from "react";
import OtorisasiServices from "../../services/admin/otorisasiServices";
import CustomTable from "../../components/table/customTable";

const OtorisationNotCompleted = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBU, setSelectedBU] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await OtorisasiServices.getOtorisasiNotCompleted();
        if (response?.success) {
          setData(response.data.data || []);
        }
      } catch (error) {
        console.error("Gagal ambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    (selectedBU === "" || item.bu === selectedBU) &&
    (selectedLevel === "" || item.id_level === selectedLevel) &&
    (searchTitle === "" || item.title?.toLowerCase().includes(searchTitle.toLowerCase())) &&
    (fromDate === "" || new Date(item.otorisasi_date) >= new Date(fromDate)) &&
    (toDate === "" || new Date(item.otorisasi_date) <= new Date(toDate))
  );

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_otorisasi,
      sortable: true,
      width: "100px",
    },
    {
      name: "TITLE",
      selector: (row) => row.title || "-",
      wrap: true,
      sortable: true, 
    },
    {
      name: "LEVEL",
      selector: (row) => row.id_level || "-",
      width: "120px",
      sortable: true, 
    },
    {
      name: "KETERANGAN",
      selector: (row) => row.keterangan || "-",
      wrap: true,
      sortable: true, 
    },
    {
      name: "TANGGAL",
      selector: (row) => row.otorisasi_date || "-",
      width: "150px",
      sortable: true, 
    },
    {
      name: "STATUS",
      selector: (row) => row.status || "-",
      width: "120px",
      sortable: true, 
    },
  ];

  return (
    <div className="card">
      <div className="card-body p-0">
        <div className="d-flex gap-2 mb-3 align-items-center flex-wrap">
          <input
            type="text"
            className="form-control w-auto"
            placeholder="Cari Title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <select
            className="form-control w-auto"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="">Semua Level</option>
            <option value="50001">Level 50001</option>
            <option value="50005">Level 50005</option>
          </select>
          <span>From</span>
          <input
            type="date"
            className="form-control w-auto"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <span>To</span>
          <input
            type="date"
            className="form-control w-auto"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <CustomTable columns={columns} data={filteredData} loading={loading} />
      </div>
    </div>
  );
};

export default OtorisationNotCompleted;
