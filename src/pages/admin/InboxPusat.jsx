import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import inboxPusatServices from "../../services/admin/inboxPusatServices";
import ConfirmationModal from "../../components/ConfirmationModal";
import CustomTable from "../../components/table/customTable";
import TableFilterBar from "../../components/table/tableFilterBar";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import CategoryService from "../../services/admin/categoryServices";

const InboxPusat = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedBU, setSelectedBU] = useState("");
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [buOptions, setBuOptions] = useState([]);
    const [buMasterList, setBuMasterList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const inboxRes = await inboxPusatServices.getInboxPusat();
                setData(inboxRes.data.data);
    
                const categoryRes = await CategoryService.getCategories();
                const allBU = [];
    
                categoryRes.data.bisnisUnit.forEach(unit => {
                    allBU.push({ value: unit.value, label: unit.name });
                    unit.branch.forEach(branch => {
                        allBU.push({ value: branch.value, label: branch.name });
                    });
                });
    
                setBuMasterList(allBU);
    
                // Ambil value unik dari inbox
                const uniqueBUValues = [...new Set(inboxRes.data.data.map(item => item.bisnis_unit))];
    
                // Mapping value ke name
                const buOptions = uniqueBUValues.map(value => {
                    const match = allBU.find(bu => bu.value === value);
                    return {
                        value,
                        label: match ? match.label : `BU ${value}`,
                    };
                });
    
                setBuOptions(buOptions);
            } catch (error) {
                console.error("Error fetching data:", error);
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

    const handleOpenDeleteModal = (item) => {
        setSelectedItem(item);
        setIsDeleteModalOpen(true);
    };

    const handleApprove = async () => {
        if (!selectedItem) return;

        setProcessingId(selectedItem.id);
        setIsModalOpen(false);
        try {
            await inboxPusatServices.approveProposalPusat(selectedItem.id);
            // alert(`Proposal ${selectedItem.id} berhasil di-approve!`);
            showSuccessToast(`Proposal ${selectedItem.id} berhasil diproses!`);
            setData(prevData => prevData.filter(item => item.id !== selectedItem.id));
        } catch (error) {
            // alert(`Gagal approve proposal ${selectedItem.id}: ${error.response?.data?.message || error.message}`);
            showErrorToast(`Gagal proses proposal ${selectedItem.id}: ${error.response?.data?.message || error.message}`);
        } finally {
            setProcessingId(null);
            setSelectedItem(null);
        }
    };

    const handleDelete = async () => {
        if (!selectedItem) return;

        setProcessingId(selectedItem.id);
        setIsDeleteModalOpen(false);
        try {
            await inboxPusatServices.cancelProposalPusat(selectedItem.id);
            // alert(`Proposal ${selectedItem.id} berhasil dihapus!`);
            showSuccessToast(`Proposal ${selectedItem.id} berhasil dihapus!`);
            setData(prevData => prevData.filter(item => item.id !== selectedItem.id));
        } catch (error) {
            // alert(`Gagal menghapus proposal ${selectedItem.id}: ${error.response?.data?.message || error.message}`);
            showErrorToast(`Gagal menghapus proposal ${selectedItem.id}: ${error.response?.data?.message || error.message}`);
        } finally {
            setProcessingId(null);
            setSelectedItem(null);
        }
    };

    const filteredData = data.filter(item =>
        (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
        (searchText === "" || item.title.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, maxWidth: "80px" },
        {
            name: "BU",
            selector: row => {
              const match = buMasterList.find(bu => bu.value === row.bisnis_unit);
              return match ? match.label : `BU ${row.bisnis_unit}`;
            },
            sortable: true,
            maxWidth: "200px"
          },  
        { name: "PRO DATE", selector: row => row.tgl_pengajuan, sortable: true, maxWidth: "120px" },
        {
            name: "TITLE",
            selector: row => row.title,
            sortable: true,
            wrap: true,
            grow: 3,
            style: {
                whiteSpace: 'normal'
            }
        },
        { name: "TYPE", selector: row => row.type, sortable: true, maxWidth: "100px" },
        {
            name: "PROCESS",
            cell: row => (
                <button className="btn btn-success btn-sm" onClick={() => handleOpenModal(row)} disabled={processingId === row.id}>
                    {processingId === row.id ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-arrow-right" />}
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            maxWidth: "90px"
        },
        {
            name: "DELETE",
            cell: row => (
                <button className="btn btn-danger btn-sm" onClick={() => handleOpenDeleteModal(row)} disabled={processingId === row.id}>
                    {processingId === row.id ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-trash-alt" />}
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            maxWidth: "90px"
        },
        {
            name: "VIEW",
            cell: (row) => (
                <button
                    className="btn btn-info btn-sm"
                    onClick={() => {
                        console.log("ID yang dikirim ke detail:", row.id);
                        navigate(`/admin/inboxpusat/${row.id}`);
                    }}
                >
                    <i className="fas fa-eye" />
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
                onConfirm={handleApprove}
                title="Konfirmasi Kirim"
                message={`Apakah Anda yakin ingin memproses proposal dengan ID ${selectedItem?.id}?`}
                confirmText="Ya, Proses"
                cancelText="Batal"
                theme="success"
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Konfirmasi Hapus"
                message={`Apakah Anda yakin ingin menghapus proposal dengan ID ${selectedItem?.id}?`}
                confirmText="Ya, Hapus"
                cancelText="Batal"
                theme="danger"
            />
        </div>
    );
};

export default InboxPusat;
