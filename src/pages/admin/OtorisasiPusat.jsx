import React, { useEffect, useState } from "react";
import allDataProposal from "../../services/admin/allDataProposal";
import CustomTable from "../../components/table/customTable";
import { useNavigate } from "react-router-dom";

const OtorisasiPusat = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBU, setSelectedBU] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchDataProposal = async () => {
      const response = await allDataProposal.getAllDataProposalPST();
      if (response && response.success) {
        setData(response.data.data);
        setFilteredData(response.data.data);
      }
      setLoading(false);
    };

    fetchDataProposal();
  }, []);

  useEffect(() => {
    let updatedData = [...data];

    // Filter by BU
    if (selectedBU !== "") {
      updatedData = updatedData.filter(item => item.bisnis_unit === selectedBU);
    }

    // Search by Title, ID, REG
    if (searchText.trim() !== "") {
      updatedData = updatedData.filter(item =>
        (item.title && item.title.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.kode_proposal && item.kode_proposal.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.reg_branch && item.reg_branch.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    setFilteredData(updatedData);
  }, [selectedBU, searchText, data]);

  const columns = [
    {
      name: "OTO",
      selector: (row) => row.kode_proposal,
      cell: (row) => (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => navigate(`/admin/detailotorisasipusat/${row.id}`)}
        >
          <i className="fas fa-edit"></i>
        </button>
      ),
      width: "70px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    { name: "REG", selector: (row) => row.reg_branch ?? "-", width: "100px" },
    { name: "ID", selector: (row) => row.kode_proposal, wrap: true, style: { textAlign: "left", whiteSpace: "normal" }},
    { name: "BU", selector: (row) => row.bisnis_unit, width: "100px" },
    { name: "DATE INPUT", selector: (row) => row.tgl_pengajuan },
    { name: "TITLE", selector: (row) => row.title, wrap: true, grow: 3, style: { textAlign: "left", whiteSpace: "normal" }},
    { name: "TYPE", selector: (row) => row.type },
    { name: "STATUS", selector: (row) => row.status },
  ];

  return (
    <div className="card">
      <div className="card-body p-0">
        {/* FILTER SECTION */}
        <div className="d-flex gap-2 mb-3 align-items-center">
          <select
            className="form-control w-auto"
            value={selectedBU}
            onChange={(e) => setSelectedBU(e.target.value)}
          >
            <option value="">Semua BU</option>
            {[...new Set(data.map(item => item.bisnis_unit))].map((bu, index) => (
              <option key={index} value={bu}>{bu}</option>
            ))}
          </select>
          <input
            type="text"
            className="form-control w-auto"
            placeholder="Cari Title, ID, Reg..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <CustomTable columns={columns} data={filteredData} loading={loading} />
      </div>
    </div>
  );
};

export default OtorisasiPusat;
