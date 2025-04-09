import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom"; 
import inboxCabangServices from "../../services/admin/inboxCabangServices";
import ConfirmationModal from "../../components/ConfirmationModal";
import CustomTable from "../../components/table/customTable";

const InboxCabang = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedBU, setSelectedBU] = useState("");
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await inboxCabangServices.getInboxCabang();
                setData(response.data.data);
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
            const response = await inboxCabangServices.approveProposalCabang(selectedItem.id);
            alert(`Proposal ${selectedItem.id} berhasil di-approve!`);
            console.log("Approve success:", response);

            setData(prevData => prevData.filter(item => item.id !== selectedItem.id));
        } catch (error) {
            alert(`Gagal approve proposal ${selectedItem.id}: ${error.response?.data?.message || error.message}`);
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
            const response = await inboxCabangServices.cancelProposalCabang(selectedItem.id);
            alert(`Proposal ${selectedItem.id} berhasil dihapus!`);
            console.log("Delete success:", response);

            setData(prevData => prevData.filter(item => item.id !== selectedItem.id));
        } catch (error) {
            alert(`Gagal menghapus proposal ${selectedItem.id}: ${error.response?.data?.message || error.message}`);
        } finally {
            setProcessingId(null);
            setSelectedItem(null);
        }
    };

    const filteredData = data.filter(item =>
        (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
        (searchText === "" ||
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.type.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, maxWidth: "80px" },
        { name: "BU", selector: row => row.bisnis_unit, sortable: true, maxWidth: "80px" },
        { name: "PRO DATE", selector: row => row.tgl_pengajuan, sortable: true, maxWidth: "120px" },
        {
            name: "TITLE",
            selector: row => row.title,
            sortable: true,
            wrap: true, // agar teks bisa turun ke baris bawah kalau kepanjangan
            grow: 3,    // kasih proporsi lebar lebih besar dari kolom lain
            style: {
                whiteSpace: 'normal' // ini biar teks tidak jadi '...'
            }
        },
        { name: "TYPE", selector: row => row.type, sortable: true, maxWidth: "100px" },
        {
            name: "PROCESS",
            cell: row => (
                <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleOpenModal(row)}
                    disabled={processingId === row.id}
                >
                    {processingId === row.id ? (
                        <i className="fas fa-spinner fa-spin" />
                    ) : (
                        <i className="fas fa-arrow-right" />
                    )}
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
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleOpenDeleteModal(row)}
                    disabled={processingId === row.id}
                >
                    {processingId === row.id ? (
                        <i className="fas fa-spinner fa-spin" />
                    ) : (
                        <i className="fas fa-trash-alt" />
                    )}
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
                        navigate(`/admin/inboxcabang/${row.id}`);
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
                        placeholder="Cari Title / Type..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

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
                message={`Apakah Anda yakin ingin menyetujui proposal dengan ID ${selectedItem?.id}?`}
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

export default InboxCabang;