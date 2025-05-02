import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import updateStatusPusatServices from "../../services/admin/updateStatusPusatServices";
import ConfirmationModal from "../../components/ConfirmationModal";
import CustomTable from "../../components/table/customTable";
import CategoryService from "../../services/admin/categoryServices";
import TableFilterBar from "../../components/table/tableFilterBar";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const UpdateStatusPst = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dataPusat, setDataPusat] = useState([]);
    const [selectedBU, setSelectedBU] = useState("");
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [buMasterList, setBuMasterList] = useState([]);
    const [buOptions, setBuOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await updateStatusPusatServices.getUpdateStatusPusatServices();
            const fetchedData = response?.data?.data || [];
            setDataPusat(fetchedData);
      
            // Ambil master list dari CategoryService
            const categoryRes = await CategoryService.getCategories();
            const allBU = [];
      
            categoryRes.data.bisnisUnit.forEach(unit => {
              allBU.push({ value: unit.value, label: unit.name });
              unit.branch.forEach(branch => {
                allBU.push({ value: branch.value, label: branch.name });
              });
            });
      
            setBuMasterList(allBU);
      
            const uniqueBU = [...new Set(fetchedData.map(item => item.bisnis_unit))];
            const buOptionsMapped = uniqueBU.map(value => {
              const match = allBU.find(bu => bu.value === value);
              return {
                value,
                label: match ? match.label : `BU ${value}`,
              };
            });
      
            setBuOptions(buOptionsMapped);
          } catch (error) {
            console.error("Error fetching data: ", error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, []);
      
    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        try {
            await updateStatusPusatServices.closeProposalPusat(selectedItem?.id);
            // alert(`Proposal dengan ID ${selectedItem?.id} berhasil di-approve.`);
             showSuccessToast(`Proposal dengan ID ${selectedItem?.id} berhasil diclose.`);
            setDataPusat(prev => prev.filter(item => item.id !== selectedItem?.id));
        } catch (error) {
            // alert(`Gagal approve proposal: ${error.response?.data?.message || error.message}`);
            showErrorToast(`Gagal close proposal: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsModalOpen(false);
            setSelectedItem(null);
        }
    };

    const handleCancelModal = (item) => {
        setSelectedItem(item);
        setIsCloseModalOpen(true);
    };

    const handleCancelConfirm = async () => {
        try {
            await updateStatusPusatServices.cancelProposalPusat(selectedItem?.id);
            // alert(`Proposal dengan ID ${selectedItem?.id} berhasil di-cancel.`);
            showSuccessToast(`Proposal dengan ID ${selectedItem?.id} berhasil di-cancel.`)
            setDataPusat(prev => prev.filter(item => item.id !== selectedItem?.id));
        } catch (error) {
            // alert(`Gagal cancel proposal: ${error.response?.data?.message || error.message}`);
            showErrorToast(`Gagal cancel proposal: ${error.response?.data?.message || error.message}`)
        } finally {
            setIsCloseModalOpen(false);
            setSelectedItem(null);
        }
    };

    const filteredData = dataPusat.filter(item =>
        (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
        (searchText === "" ||
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.type.toLowerCase().includes(searchText.toLowerCase()))
    );

    // const columns = [
    //     { name: "RL", selector: row => row.ruang_lingkup, sortable: true, maxWidth: "80px" },
    //     { name: "CAB", selector: row => row.reg_branch || "-", sortable: true, maxWidth: "80px" },
    //     { name: "PST", selector: row => row.reg || "-", sortable: true, maxWidth: "80px" },
    //     { name: "ID", selector: row => row.kode_proposal, sortable: true, maxWidth: "100px" },
    //     { name: "BU", selector: row => row.bisnis_unit, sortable: true, maxWidth: "70px" },
    //     { name: "DATE", selector: row => row.tgl_pengajuan, sortable: true, maxWidth: "120px" },
    //     { name: "TITLE", selector: row => row.title, sortable: true, grow: 2 },
    //     { name: "TYPE", selector: row => row.type, sortable: true, maxWidth: "100px" },
    //     {
    //         name: "EDIT/VIEW",
    //         cell: row => (
    //             <button className="btn btn-warning btn-sm" onClick={() => navigate(`/admin/updatestatuspusat/${row.id}`)}>
    //                 <i className="fas fa-edit" />
    //             </button>
    //         ),
    //         ignoreRowClick: true,
    //         allowOverflow: true,
    //         button: true,
    //         maxWidth: "80px"
    //     },
    //     {
    //         name: "CANCEL",
    //         cell: row => (
    //             <button className="btn btn-danger btn-sm" onClick={() => handleCancelModal(row)}>
    //                 <i className="fas fa-times" />
    //             </button>
    //         ),
    //         ignoreRowClick: true,
    //         allowOverflow: true,
    //         button: true,
    //         maxWidth: "90px"
    //     },
    //     {
    //         name: "CLOSE",
    //         cell: row => (
    //             <button className="btn btn-success btn-sm" onClick={() => handleOpenModal(row)}>
    //                 Close
    //             </button>
    //         ),
    //         ignoreRowClick: true,
    //         allowOverflow: true,
    //         button: true,
    //         maxWidth: "90px"
    //     },
    // ];
    
    const columns = [
        { name: "RL", selector: row => row.ruang_lingkup, sortable: true, maxWidth: "80px" },
        { name: "CAB", selector: row => row.reg_branch || "-", sortable: true, maxWidth: "80px" },
        { name: "PST", selector: row => row.reg || "-", sortable: true, maxWidth: "80px" },
        { 
            name: "ID", 
            selector: row => row.kode_proposal, 
            sortable: true, 
            maxWidth: "100px", 
            wrap: true,
            style: { textAlign: "left", whiteSpace: "normal" } 
        },
        {
            name: "BU",
            selector: row => {
              const match = buMasterList.find(bu => bu.value === row.bisnis_unit);
              return match ? match.label : `BU ${row.bisnis_unit}`;
            },
            sortable: true,
            wrap: true,
            // width: "50px",
            maxWidth: "200px",
            style: {
              whiteSpace: "normal",
              fontSize: "12px",
              padding: "4px",
            }
          },
        { name: "DATE", selector: row => row.tgl_pengajuan, sortable: true, maxWidth: "120px" },
        { 
            name: "TITLE", 
            selector: row => row.title, 
            sortable: true, 
            grow: 2, 
            wrap: true,
            style: { textAlign: "left", whiteSpace: "normal" } 
        },
        { name: "TYPE", selector: row => row.type, sortable: true, maxWidth: "100px" },
        {
            name: "EDIT/VIEW",
            cell: row => (
                <button className="btn btn-warning btn-sm" onClick={() => navigate(`/admin/updatestatuspusat/${row.id}`)}>
                    <i className="fas fa-edit" />
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            maxWidth: "80px"
        },
        {
            name: "CANCEL",
            cell: row => (
                <button className="btn btn-danger btn-sm" onClick={() => handleCancelModal(row)}>
                    <i className="fas fa-times" />
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            maxWidth: "90px"
        },
        {
            name: "CLOSE",
            cell: row => (
                <button className="btn btn-success btn-sm" onClick={() => handleOpenModal(row)}>
                    Close
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            maxWidth: "90px"
        },
    ];
    
    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="d-flex gap-2 mb-3 align-items-center">
                    <TableFilterBar
                        selectedBU={selectedBU}
                        setSelectedBU={setSelectedBU}
                        buOptions={buOptions}
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />
                </div>
                <CustomTable
                    columns={columns}
                    data={filteredData}
                    loading={loading}
                />
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                title="Konfirmasi Aksi"
                message={`Apakah Anda yakin ingin close item dengan ID ${selectedItem?.id}?`}
                confirmText="Ya, Close"
                cancelText="Batal"
                theme="success"
            />

            <ConfirmationModal
                isOpen={isCloseModalOpen}
                onClose={() => setIsCloseModalOpen(false)}
                onConfirm={handleCancelConfirm}
                title="Konfirmasi Tutup"
                message={`Apakah Anda yakin ingin cancel proposal dengan ID ${selectedItem?.id}?`}
                confirmText="Ya, Cancel"
                cancelText="Batal"
                theme="danger"
            />
        </div>
    );
};

export default UpdateStatusPst;
