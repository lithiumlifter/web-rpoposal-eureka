// const InboxCabang = () => {
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
//                                 <th>PROCESS</th>
//                                 <th>DELETE</th>
//                                 <th>VIEW</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             <tr>
//                                KOSONG
//                             </tr>
//                             </tbody>
//                         </table>
//                         </div>
//                     </div>
//                     </div>

//         </>
//     );
// }

// export default InboxCabang;

// import { useState } from "react";

// const InboxCabang = () => {
//     const [selectedBU, setSelectedBU] = useState("");
//     const [searchTitle, setSearchTitle] = useState("");

//     const data = [];

//     const filteredData = data.filter(item =>
//         (selectedBU === "" || item.bu === selectedBU) &&
//         (searchTitle === "" || item.title.toLowerCase().includes(searchTitle.toLowerCase()))
//     );

//     return (
//         <>
//             <div className="card">
//                 <div className="card-body">
//                     <div className="d-flex gap-2 mb-3 align-items-center">
//                         <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
//                             <option value="">Semua BU</option>
//                             <option value="50">BU 50</option>
//                             <option value="51">BU 51</option>
//                         </select>
//                         <input type="text" className="form-control w-auto" placeholder="Cari Title..." value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
//                         <button className="btn btn-primary">Tampilkan</button>
//                     </div>
//                     <div className="table-responsive">
//                         <table className="table table-striped table-bordered first">
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>BU</th>
//                                     <th>PRO DATE</th>
//                                     <th>TITLE</th>
//                                     <th>TYPE</th>
//                                     <th>PROCESS</th>
//                                     <th>DELETE</th>
//                                     <th>VIEW</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.length > 0 ? (
//                                     filteredData.map((item, index) => (
//                                         <tr key={index}>
//                                             <td>{item.id}</td>
//                                             <td>{item.bu}</td>
//                                             <td>{item.proDate}</td>
//                                             <td>{item.title}</td>
//                                             <td>{item.type}</td>
//                                             <td><button className="btn btn-success">Process</button></td>
//                                             <td><button className="btn btn-danger">Delete</button></td>
//                                             <td><button className="btn btn-info">View</button></td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="8" className="text-center">KOSONG</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default InboxCabang;


// import { useState, useEffect } from "react";
// import inboxCabangServices from "../../services/admin/inboxCabangServices";

// const InboxCabang = () => {
//     const [data, setData] = useState([]);
//     const [selectedBU, setSelectedBU] = useState("");
//     const [searchTitle, setSearchTitle] = useState("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await inboxCabangServices.getInboxCabang();
//                 setData(response.data.data); // Menyesuaikan dengan struktur JSON
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     // Filter data berdasarkan Business Unit dan Title
//     const filteredData = data.filter(item =>
//         (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
//         (searchTitle === "" || item.title.toLowerCase().includes(searchTitle.toLowerCase()))
//     );

//     return (
//         <>
//             <div className="card">
//                 <div className="card-body">
//                     <div className="d-flex gap-2 mb-3 align-items-center">
//                         <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
//                             <option value="">Semua BU</option>
//                             <option value="50">BU 50</option>
//                             <option value="51">BU 51</option>
//                         </select>
//                         <input
//                             type="text"
//                             className="form-control w-auto"
//                             placeholder="Cari Title..."
//                             value={searchTitle}
//                             onChange={(e) => setSearchTitle(e.target.value)}
//                         />
//                     </div>

//                     <div className="table-responsive">
//                         <table className="table table-striped table-bordered first">
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>BU</th>
//                                     <th>PRO DATE</th>
//                                     <th>TITLE</th>
//                                     <th>TYPE</th>
//                                     <th>PROCESS</th>
//                                     <th>DELETE</th>
//                                     <th>VIEW</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {loading ? (
//                                     <tr>
//                                         <td colSpan="8" className="text-center">Loading...</td>
//                                     </tr>
//                                 ) : filteredData.length > 0 ? (
//                                     filteredData.map((item) => (
//                                         <tr key={item.id}>
//                                             <td>{item.id}</td>
//                                             <td>{item.bisnis_unit}</td>
//                                             <td>{item.tgl_pengajuan}</td>
//                                             <td>{item.title}</td>
//                                             <td>{item.type}</td>
//                                             <td>
//                                                 <button className="btn btn-success">Process</button>
//                                             </td>
//                                             <td>
//                                                 <button className="btn btn-danger">Delete</button>
//                                             </td>
//                                             <td>
//                                                 <button className="btn btn-info">View</button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="8" className="text-center">KOSONG</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default InboxCabang;

// import { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import inboxCabangServices from "../../services/admin/inboxCabangServices";

// const InboxCabang = () => {
//     const [data, setData] = useState([]);
//     const [selectedBU, setSelectedBU] = useState("");
//     const [searchText, setSearchText] = useState("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await inboxCabangServices.getInboxCabang();
//                 setData(response.data.data); // Sesuaikan dengan struktur JSON dari API
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     // Filter data berdasarkan Business Unit dan pencarian global
//     const filteredData = data.filter(item =>
//         (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
//         (searchText === "" ||
//             item.title.toLowerCase().includes(searchText.toLowerCase()) ||
//             item.type.toLowerCase().includes(searchText.toLowerCase()))
//     );

//     // Definisi kolom untuk DataTable
//     const columns = [
//         { name: "ID", selector: row => row.id, sortable: true },
//         { name: "BU", selector: row => row.bisnis_unit, sortable: true },
//         { name: "PRO DATE", selector: row => row.tgl_pengajuan, sortable: true },
//         { name: "TITLE", selector: row => row.title, sortable: true },
//         { name: "TYPE", selector: row => row.type, sortable: true },
//         {
//             name: "PROCESS",
//             cell: () => <button className="btn btn-success"><i className=" fas fa-arrow-right" /></button>,
//             ignoreRowClick: true,
//             allowOverflow: true,
//             button: true
//         },
//         {
//             name: "DELETE",
//             cell: () => <button className="btn btn-danger"><i className="fas fa-trash-alt" /></button>,
//             ignoreRowClick: true,
//             allowOverflow: true,
//             button: true
//         },
//         {
//             name: "VIEW",
//             cell: () => <button className="btn btn-info"><i className="fas fa-eye" /></button>, 
//             ignoreRowClick: true,
//             allowOverflow: true,
//             button: true
//         }
//     ];
    

//     return (
//         <>
//             <div className="card">
//                 <div className="card-body">
//                     <div className="d-flex gap-2 mb-3 align-items-center">
//                         <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
//                             <option value="">Semua BU</option>
//                             <option value="50">BU 50</option>
//                             <option value="51">BU 51</option>
//                         </select>
//                         <input
//                             type="text"
//                             className="form-control w-auto"
//                             placeholder="Cari Title / Type..."
//                             value={searchText}
//                             onChange={(e) => setSearchText(e.target.value)}
//                         />
//                     </div>

//                     {/* DataTable dari react-data-table-component */}
//                     <DataTable
//                         columns={columns}
//                         data={filteredData}
//                         progressPending={loading}
//                         pagination
//                         highlightOnHover
//                         striped
//                         responsive
//                         persistTableHead
//                     />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default InboxCabang;

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom"; 
import inboxCabangServices from "../../services/admin/inboxCabangServices";
import ConfirmationModal from "../../components/ConfirmationModal";

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
        { name: "ID", selector: row => row.id, sortable: true },
        { name: "BU", selector: row => row.bisnis_unit, sortable: true },
        { name: "PRO DATE", selector: row => row.tgl_pengajuan, sortable: true },
        { name: "TITLE", selector: row => row.title, sortable: true },
        { name: "TYPE", selector: row => row.type, sortable: true },
        {
            name: "PROCESS",
            cell: row => (
                <button
                    className="btn btn-success"
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
            button: true
        },
        {
            name: "DELETE",
            cell: row => (
                <button
                    className="btn btn-danger"
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
            button: true
        },
        {
            name: "VIEW",
            cell: (row) => {
              return (
                <button
                  className="btn btn-info"
                  onClick={() => {
                    console.log("ID yang dikirim ke detail:", row.id);
                    navigate(`/admin/inboxcabang/${row.id}`);
                  }}
                >
                  <i className="fas fa-eye" />
                </button>
              );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
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

                <DataTable
                    columns={columns}
                    data={filteredData}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                    persistTableHead
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

export default InboxCabang;