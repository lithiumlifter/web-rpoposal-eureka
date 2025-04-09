import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import RuangLingkupServices from "../../services/admin/ruangLingkupServices";
import CustomTable from "../../components/table/customTable";

const RubahRuangLingkup = () => {
    const [data, setData] = useState([]);
    const [selectedBU, setSelectedBU] = useState("");
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RuangLingkupServices.getRuangLingkup();
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // const handleRubahClick = async (id, currentRuangLingkup) => {
    //     const newRuangLingkup = currentRuangLingkup === "PST" ? "CAB" : "PST";
    //     try {
    //         const response = await RuangLingkupServices.submitRubahRuangLingkup({
    //             id_anggaran: id,
    //             ruang_lingkup: newRuangLingkup
    //         });
    //         console.log('Response:', response);
            
    //         // Update state tanpa refresh halaman
    //         setData(prevData => 
    //             prevData.map(item => 
    //                 item.id === id ? { ...item, ruang_lingkup: newRuangLingkup } : item
    //             )
    //         );
    //     } catch (error) {
    //         console.error('Error submitting perubahan ruang lingkup:', error);
    //     }
    // };
    
    const handleRubahClick = async (id, currentRuangLingkup) => {
        const newRuangLingkup = currentRuangLingkup === "PST" ? "CAB" : "PST";
    
        const confirm = window.confirm(
            `Apakah Anda yakin ingin mengubah ruang lingkup dari "${currentRuangLingkup}" menjadi "${newRuangLingkup}"?`
        );
        if (!confirm) return;
    
        try {
            const response = await RuangLingkupServices.submitRubahRuangLingkup({
                id_anggaran: id,
                ruang_lingkup: newRuangLingkup
            });
            console.log('Response:', response);
    
            setData(prevData =>
                prevData.map(item =>
                    item.id === id ? { ...item, ruang_lingkup: newRuangLingkup } : item
                )
            );
    
            // Bootstrap-style alert (bisa diubah jadi modal atau toast kalau perlu)
            alert(`Ruang lingkup berhasil diubah menjadi "${newRuangLingkup}" untuk ID ${id}`);
        } catch (error) {
            console.error('Error submitting perubahan ruang lingkup:', error);
            alert(`Gagal mengubah ruang lingkup: ${error.response?.data?.message || error.message}`);
        }
    };
    

    const filteredData = data.filter((item) =>
        (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
        (searchText === "" ||
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.type.toLowerCase().includes(searchText.toLowerCase()) ||
            item.kode_proposal.toLowerCase().includes(searchText.toLowerCase()))
    ).map((item, index) => ({ ...item, no: index + 1 }));

    const columns = [
        { name: "NO", selector: row => row.no, sortable: true, width: "60px" },
        { name: "RL", selector: row => row.ruang_lingkup, sortable: true, width: "60px" },
        { name: "REG1", selector: row => row.reg, sortable: true, width: "80px" },
        { name: "REG2", selector: row => row.reg_branch, sortable: true, width: "90px" },
        {
          name: "ID",
          selector: row => row.kode_proposal,
          sortable: true,
          width: "120px",
          wrap: true,
          style: { whiteSpace: "normal" },
        },
        { name: "BU", selector: row => row.bisnis_unit, sortable: true, width: "70px" },
        { name: "DATE", selector: row => row.tgl_pengajuan, sortable: true, width: "120px" },
        {
          name: "TITLE",
          selector: row => row.title,
          sortable: true,
          grow: 3,
          wrap: true,
          style: { whiteSpace: "normal" },
        },
        { name: "TYPE", selector: row => row.type, sortable: true, width: "90px" },
        {
          name: "RL",
          selector: row => row.ruang_lingkup,
          sortable: true,
          width: "60px",
        },
        {
          name: "RUBAH",
          cell: (row) => (
            <button
              className="btn btn-primary"
              onClick={() => handleRubahClick(row.id, row.ruang_lingkup)}
            >
              <i className="fas fa-redo" />
            </button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          width: "80px",
        },
        {
          name: "STATUS",
          selector: row => row.status,
          sortable: true,
          width: "100px",
          wrap: true,
          style: { whiteSpace: "normal" },
        },
      ];
      
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex gap-2 mb-3 align-items-center">
                    <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
                        <option value="">Semua BU</option>
                        <option value="50">BU 50</option>
                        <option value="51">BU 51</option>
                    </select>
                    <input
                        type="text"
                        className="form-control w-auto"
                        placeholder="Cari Title / Type / ID..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                
                <CustomTable
                columns={columns}
                data={filteredData}
                loading={loading}
                />

                {/* <DataTable
                    columns={columns}
                    data={filteredData}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                    persistTableHead
                /> */}
            </div>
        </div>
    );
};

export default RubahRuangLingkup;
