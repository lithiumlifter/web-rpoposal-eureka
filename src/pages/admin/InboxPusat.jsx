// const InboxPusat = () => {
//     return (
//          <>
//               <div className="card">
//                     {/* <h5 className="card-header">Update Anggaran</h5> */}
//                     <div className="card-body">
//                         <div className="table-responsive">
//                         <table className="table table-striped table-bordered first">
//                             <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>BU</th>
//                                 <th>PRO DATE</th>
//                                 <th>TITLE</th>
//                                 <th>TYPE</th>
//                                 <th></th>
//                                 <th></th>
//                                 <th></th>
//                                 <th></th>
//                                 <th></th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             <tr>
//                                     <td>
                                        
//                                     </td>
//                                     <td></td>
//                                     <td></td>
//                                     <td></td>
//                                     <td></td>
//                                     <td></td>
//                                     <td></td>
//                                     <td></td>
//                                     <td></td>
//                                     <td></td>
//                                     <td></td>
//                             </tr>
//                             </tbody>
//                         </table>
//                         </div>
//                     </div>
//                     </div>

//         </>
//     );
// }

// export default InboxPusat;

// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import inboxPusatServices from "../../services/admin/inboxPusatServices";

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const InboxPusat = () => {
//     const [data, setData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [selectedBU, setSelectedBU] = useState("");
//     const [searchTitle, setSearchTitle] = useState("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await inboxPusatServices.getInboxPusat();
//                 setData(response.data.data);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         const filterData = data.filter(item =>
//             (selectedBU === "" || item.bisnis_unit === selectedBU) &&
//             (searchTitle === "" || item.title.toLowerCase().includes(searchTitle.toLowerCase()))
//         );
//         setFilteredData(filterData);
//     }, [selectedBU, searchTitle, data]);

//     const columns = [
//         { name: "ID", selector: row => row.id, sortable: true },
//         { name: "BU", selector: row => row.bisnis_unit, sortable: true },
//         { name: "PRO DATE", selector: row => row.tgl_pengajuan, sortable: true },
//         { name: "TITLE", selector: row => row.title, sortable: true },
//         { name: "TYPE", selector: row => row.type, sortable: true }
//     ];

//     return (
//         <div className="card">
//             <div className="card-body">
//                 <div className="d-flex gap-2 mb-3 align-items-center">
//                     <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
//                         <option value="">Semua BU</option>
//                         {[...new Set(data.map(item => item.bisnis_unit))].map((bu, index) => (
//                             <option key={index} value={bu}>{bu}</option>
//                         ))}
//                     </select>
//                     <input
//                         type="text"
//                         className="form-control w-auto"
//                         placeholder="Cari Title..."
//                         value={searchTitle}
//                         onChange={(e) => setSearchTitle(e.target.value)}
//                     />
//                     {/* <button className="btn btn-primary" onClick={() => setFilteredData(data)}>Tampilkan</button> */}
//                 </div>
//                 <DataTable
//                     columns={columns}
//                     data={filteredData}
//                     progressPending={loading}
//                     pagination
//                     highlightOnHover
//                     striped
//                 />
//             </div>
//         </div>
//     );
// };

// export default InboxPusat;

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom"; 
import inboxPusatServices from "../../services/admin/inboxPusatServices";
import ConfirmationModal from "../../components/ConfirmationModal";
import CustomTable from "../../components/table/customTable";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await inboxPusatServices.getInboxPusat();
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
            await inboxPusatServices.approveProposalPusat(selectedItem.id);
            alert(`Proposal ${selectedItem.id} berhasil di-approve!`);
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
            await inboxPusatServices.cancelProposalPusat(selectedItem.id);
            alert(`Proposal ${selectedItem.id} berhasil dihapus!`);
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
        (searchText === "" || item.title.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, maxWidth: "80px" },
        { name: "BU", selector: row => row.bisnis_unit, sortable: true, maxWidth: "80px" },
        { name: "PRO DATE", selector: row => row.tgl_pengajuan, sortable: true, maxWidth: "120px" },
        {
            name: "TITLE",
            selector: row => row.title,
            sortable: true,
            wrap: true, // biar teks panjang bisa turun ke bawah
            grow: 3,    // proporsi lebih besar biar lebar
            style: {
                whiteSpace: 'normal' // hilangkan ellipsis (...)
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
                    <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
                        <option value="">Semua BU</option>
                        {[...new Set(data.map(item => item.bisnis_unit))].map((bu, index) => (
                            <option key={index} value={bu}>{bu}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="form-control w-auto"
                        placeholder="Cari Title..."
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
                confirmText="Ya, Kirim"
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
