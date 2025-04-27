import React, { useEffect, useState } from "react";
import allDataProposal from "../../services/admin/allDataProposal";
import CustomTable from "../../components/table/customTable";
import { useNavigate } from "react-router-dom"; 

const OtorisasiPusat = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataProposal = async () => {
      const response = await allDataProposal.getAllDataProposalPST();
      if (response && response.success) {
        setData(response.data.data);
      }
      setLoading(false);
    };

    fetchDataProposal();
  }, []);

  const columns = [
    {
      name: "OTO",
      selector: (row) => row.kode_proposal,
      cell: (row) => (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
                    console.log("ID yang dikirim ke detail:", row.id);
                    navigate(`/admin/detailotorisasipusat/${row.id}`);
                  }}
        >
          <i className="fas fa-edit"></i>
        </button>
      ),
      width: "70px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "REG",
      selector: (row) => row.reg_branch ?? "-",
      width: "100px",
    },
    {
      name: "ID",
      selector: (row) => row.kode_proposal,
      wrap: true,
      style: { textAlign: "left", whiteSpace: "normal" }
    },
    {
      name: "BU",
      selector: (row) => row.bisnis_unit,
      width: "100px", // pas-pasan untuk BU
    },
    {
      name: "DATE INPUT",
      selector: (row) => row.tgl_pengajuan,
    },
    {
      name: "TITLE",
      selector: (row) => row.title,
      wrap: true,
      grow: 3, // biar lebar dan gak kena ellipsis
      style: { textAlign: "left", whiteSpace: "normal" }
    },
    {
      name: "TYPE",
      selector: (row) => row.type,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
    },
  ];
  
  

  return (
    <div className="card">
      <div className="card-body">
        <CustomTable columns={columns} data={data} loading={loading} />
      </div>
    </div>
  );
};

export default OtorisasiPusat;
