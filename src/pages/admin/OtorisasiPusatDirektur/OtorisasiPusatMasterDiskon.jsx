import React, { useEffect, useState } from "react";
import allDataProposal from "../../../services/admin/allDataProposal";
import CustomTable from "../../../components/table/customTable";
import { useNavigate } from "react-router-dom";
import TableFilterBar from "../../../components/table/tableFilterBar";
import CategoryService from "../../../services/admin/categoryServices";

const OtorisasiPusatDirektur = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBU, setSelectedBU] = useState("");
  const [searchText, setSearchText] = useState("");

  const [buMasterList, setBuMasterList] = useState([]);
  const [buOptions, setBuOptions] = useState([]);

  useEffect(() => {
    const fetchDataProposal = async () => {
      const response = await allDataProposal.getAllDataProposalPSTDirekturMasterDiskon();
      const categoryRes = await CategoryService.getCategories();

      if (response && response.success && categoryRes?.data?.bisnisUnit) {
        const proposals = response.data.data;
        setData(proposals);
        setFilteredData(proposals);

        // Buat buMasterList dari category
        const allBU = [];
        categoryRes.data.bisnisUnit.forEach(unit => {
          allBU.push({ value: unit.value, label: unit.name });
          unit.branch.forEach(branch => {
            allBU.push({ value: branch.value, label: branch.name });
          });
        });
        setBuMasterList(allBU);

        // Buat buOptions hanya dari BU yang digunakan
        const uniqueBU = [...new Set(proposals.map(item => item.bisnis_unit))];
        const mappedOptions = uniqueBU.map(value => {
          const match = allBU.find(bu => bu.value === value);
          return {
            value,
            label: match ? match.label : `BU ${value}`
          };
        });
        setBuOptions(mappedOptions);
      }

      setLoading(false);
    };

    fetchDataProposal();
  }, []);

  useEffect(() => {
    let updatedData = [...data];

    if (selectedBU !== "") {
      updatedData = updatedData.filter(item => item.bisnis_unit === parseInt(selectedBU));
    }

    if (searchText.trim() !== "") {
      updatedData = updatedData.filter(item =>
        (item.title && item.title.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.kode_proposal && item.kode_proposal.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.reg_branch && item.reg_branch.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    setFilteredData(updatedData);
  }, [selectedBU, searchText, data]);

  const getBuLabel = (value) => {
    const found = buMasterList.find(bu => bu.value === value);
    return found ? found.label : `BU ${value}`;
  };

  const columns = [
    {
      name: "OTO",
      selector: (row) => row.kode_proposal,
      cell: (row) => (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => navigate(`/admin/detailotorisasipusat-direktur/${row.id}`)}
        >
          <i className="fas fa-edit"></i>
        </button>
      ),
      width: "70px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      sortable: true, 
    },
    { name: "REG", selector: (row) => row.reg_branch ?? "-", width: "100px", sortable: true,  },
    { name: "ID", selector: (row) => row.kode_proposal, wrap: true, style: { textAlign: "left", whiteSpace: "normal" }, sortable: true, },
    { name: "BU", selector: (row) => getBuLabel(row.bisnis_unit), width: "200px", sortable: true,  },
    { name: "DATE INPUT", selector: (row) => row.tgl_pengajuan, sortable: true,  },
    { name: "TITLE", selector: (row) => row.title, wrap: true, grow: 3, style: { textAlign: "left", whiteSpace: "normal" }, sortable: true, },
    { name: "TYPE", selector: (row) => row.type, sortable: true,  },
    { name: "STATUS", selector: (row) => row.status, sortable: true,  },
  ];

  return (
    <div className="card">
      <div className="card-body p-0">
        {/* FILTER BAR */}
        <TableFilterBar
          selectedBU={selectedBU}
          setSelectedBU={setSelectedBU}
          buOptions={buOptions}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <CustomTable columns={columns} data={filteredData} loading={loading} />
      </div>
    </div>
  );
};

export default OtorisasiPusatDirektur;
