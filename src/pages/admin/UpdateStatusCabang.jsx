// const UpdateStatusCabang = () => {
//     return(
//         <>
//            <div className="card">
//                 <div className="card-body">
//                     <div className="table-responsive">
//                     <table className="table table-striped table-bordered first">
//                         <thead>
//                         <tr>
//                             <th>RL</th>
//                             <th>REG 1</th>
//                             <th>REG 2</th>
//                             <th>ID</th>
//                             <th>BU</th>
//                             <th>DATE</th>
//                             <th>TITLE</th>
//                             <th>TYPE</th>
//                             <th>ACTION</th>
//                             <th>CANCEL</th>
//                             <th>CLOSE</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         <tr>
//                             <td>PST</td>
//                             <td>RB-8078</td>
//                             <td>RB-8083</td>
//                             <td>GT/2025020066/PIV</td>
//                             <td>50</td>
//                             <td>2025-03-10 11:21:12</td>
//                             <td>Permohonan Biaya Pembayaran Vendor PT.PLATINDO KARYA PRIMA No. Invoice:IVS250200076</td>
//                             <td>99.LAIN-LAIN</td>
//                             <td>
//                             <div className="d-flex justify-content-between">
//                                 <button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button>
//                                 <button className="btn btn-warning" type="submit"><i className="fas fa-map-marker-alt" /></button>
//                             </div>
//                             </td>
//                             <td>
//                             <button className="btn btn-danger" type="submit"><i className="fas fa-expand-arrows-alt" /></button>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>PST</td>
//                             <td>RB-8078</td>
//                             <td>RB-8083</td>
//                             <td>GT/2025020066/PIV</td>
//                             <td>50</td>
//                             <td>2025-03-10 11:21:12</td>
//                             <td>Permohonan Biaya Pembayaran Vendor PT.PLATINDO KARYA PRIMA No. Invoice:IVS250200076</td>
//                             <td>99.LAIN-LAIN</td>
//                             <td>
//                             <div className="d-flex justify-content-around">
//                                 <button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button>
//                                 <button className="btn btn-warning" type="submit"><i className="fas fa-map-marker-alt" /></button>
//                             </div>
//                             </td>
//                             <td>
//                             <button className="btn btn-danger" type="submit"><i className="fas fa-expand-arrows-alt" /></button>
//                             </td>
//                         </tr>
//                         </tbody>
//                     </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default UpdateStatusCabang;

// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import updateStatusCabangServices from "../../services/admin/updateStatusCabangServices";

// const UpdateStatusCabang = () => {
//     const [dataCabang, setDataCabang] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await updateStatusCabangServices.getUpdateStatusCabangServices();
//                 if (response?.data?.data) {
//                     setDataCabang(response.data.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching data: ", error);
//             }
//         };

//         fetchData();
//     }, []);

//     const columns = [
//         { name: "RL", selector: row => row.ruang_lingkup, sortable: true },
//         { name: "REG 1", selector: row => row.reg || "-", sortable: true },
//         { name: "REG 2", selector: row => row.reg_branch || "-", sortable: true },
//         { name: "ID", selector: row => row.kode_proposal, sortable: true },
//         { name: "BU", selector: row => row.bisnis_unit, sortable: true },
//         { name: "DATE", selector: row => row.tgl_pengajuan, sortable: true },
//         { name: "TITLE", selector: row => row.title, sortable: true },
//         { name: "TYPE", selector: row => row.type, sortable: true },
//         {
//             name: "ACTION",
//             cell: row => (
//                 <div className="flex space-x-2">
//                     <button className="btn btn-primary">
//                         <i className="fas fa-edit" />
//                     </button>
//                     <button className="btn btn-warning">
//                         <i className="fas fa-map-marker-alt" />
//                     </button>
//                 </div>
//             )
//         },
//         {
//             name: "CANCEL",
//             cell: row => (
//                 <button className="btn btn-danger">
//                     <i className="fas fa-times" />
//                 </button>
//             )
//         },
//         {
//             name: "PROSES",
//             cell: row => (
//                 <button className="btn btn-primary">
//                     <i className="fas fa-arrow-right" />
//                 </button>
//             )
//         }
//     ];

//     return (
//         <div className="card">
//             <div className="card-body">
//                 <DataTable
//                     columns={columns}
//                     data={dataCabang}
//                     pagination
//                     highlightOnHover
//                     striped
//                     responsive
//                     persistTableHead
//                 />
//             </div>
//         </div>
//     );
// };

// export default UpdateStatusCabang;

// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import updateStatusCabangServices from "../../services/admin/updateStatusCabangServices";
// import ConfirmationModal from "../../components/ConfirmationModal";

// const UpdateStatusCabang = () => {
//     const [dataCabang, setDataCabang] = useState([]);
//     const [selectedBU, setSelectedBU] = useState("");
//     const [searchText, setSearchText] = useState("");
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedItem, setSelectedItem] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await updateStatusCabangServices.getUpdateStatusCabangServices();
//                 if (response?.data?.data) {
//                     setDataCabang(response.data.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching data: ", error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleOpenModal = (item) => {
//         setSelectedItem(item);
//         setIsModalOpen(true);
//     };

//     const handleConfirm = () => {
//         alert(`Mengonfirmasi item dengan ID: ${selectedItem?.kode_proposal}`);
//         setIsModalOpen(false);
//         setSelectedItem(null);
//     };

//     const filteredData = dataCabang.filter(item =>
//         (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
//         (searchText === "" ||
//             item.title.toLowerCase().includes(searchText.toLowerCase()) ||
//             item.type.toLowerCase().includes(searchText.toLowerCase()))
//     );

//     const columns = [
//         { name: "RL", selector: row => row.ruang_lingkup, sortable: true },
//         { name: "REG 1", selector: row => row.reg || "-", sortable: true },
//         { name: "REG 2", selector: row => row.reg_branch || "-", sortable: true },
//         { name: "ID", selector: row => row.kode_proposal, sortable: true },
//         { name: "BU", selector: row => row.bisnis_unit, sortable: true },
//         { name: "DATE", selector: row => row.tgl_pengajuan, sortable: true },
//         { name: "TITLE", selector: row => row.title, sortable: true },
//         { name: "TYPE", selector: row => row.type, sortable: true },
//         {
//             name: "ACTION",
//             cell: row => (
//                 <div className="flex space-x-2">
//                     <button className="btn btn-primary">
//                         <i className="fas fa-edit" />
//                     </button>
//                     <button className="btn btn-warning">
//                         <i className="fas fa-map-marker-alt" />
//                     </button>
//                 </div>
//             )
//         },
//         {
//             name: "CONFIRM",
//             cell: row => (
//                 <button className="btn btn-success" onClick={() => handleOpenModal(row)}>
//                     <i className="fas fa-check" />
//                 </button>
//             )
//         }
//     ];

//     return (
//         <div className="card">
//             <div className="card-body">
//                 <div className="d-flex gap-2 mb-3 align-items-center">
//                     <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
//                         <option value="">Semua BU</option>
//                         <option value="50">BU 50</option>
//                         <option value="51">BU 51</option>
//                     </select>
//                     <input
//                         type="text"
//                         className="form-control w-auto"
//                         placeholder="Cari Title / Type..."
//                         value={searchText}
//                         onChange={(e) => setSearchText(e.target.value)}
//                     />
//                 </div>

//                 <DataTable
//                     title="Update Status Cabang"
//                     columns={columns}
//                     data={filteredData}
//                     pagination
//                     highlightOnHover
//                     striped
//                     responsive
//                     persistTableHead
//                 />
//             </div>

//             <ConfirmationModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onConfirm={handleConfirm}
//                 title="Konfirmasi Aksi"
//                 message={`Apakah Anda yakin ingin mengonfirmasi item dengan ID ${selectedItem?.kode_proposal}?`}
//                 confirmText="Ya, Konfirmasi"
//                 cancelText="Batal"
//                 theme="success"
//             />
//         </div>
//     );
// };

// export default UpdateStatusCabang;


// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import updateStatusCabangServices from "../../services/admin/updateStatusCabangServices";
// import ConfirmationModal from "../../components/ConfirmationModal";

// const UpdateStatusCabang = () => {
//     const [dataCabang, setDataCabang] = useState([]);
//     const [selectedBU, setSelectedBU] = useState("");
//     const [searchText, setSearchText] = useState("");
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
//     const [selectedItem, setSelectedItem] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await updateStatusCabangServices.getUpdateStatusCabangServices();
//                 if (response?.data?.data) {
//                     setDataCabang(response.data.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching data: ", error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleOpenModal = (item) => {
//         setSelectedItem(item);
//         setIsModalOpen(true);
//     };

//     const handleConfirm = () => {
//         alert(`Mengonfirmasi item dengan ID: ${selectedItem?.kode_proposal}`);
//         setIsModalOpen(false);
//         setSelectedItem(null);
//     };

//     const handleCloseModal = (item) => {
//         setSelectedItem(item);
//         setIsCloseModalOpen(true);
//     };

//     const handleCloseConfirm = () => {
//         alert(`Menutup item dengan ID: ${selectedItem?.kode_proposal}`);
//         setIsCloseModalOpen(false);
//         setSelectedItem(null);
//     };

//     const filteredData = dataCabang.filter(item =>
//         (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
//         (searchText === "" ||
//             item.title.toLowerCase().includes(searchText.toLowerCase()) ||
//             item.type.toLowerCase().includes(searchText.toLowerCase()))
//     );

//     const columns = [
//         { name: "RL", selector: row => row.ruang_lingkup, sortable: true },
//         { name: "REG 1", selector: row => row.reg || "-", sortable: true },
//         { name: "REG 2", selector: row => row.reg_branch || "-", sortable: true },
//         { name: "ID", selector: row => row.kode_proposal, sortable: true },
//         { name: "BU", selector: row => row.bisnis_unit, sortable: true },
//         { name: "DATE", selector: row => row.tgl_pengajuan, sortable: true },
//         { name: "TITLE", selector: row => row.title, sortable: true },
//         { name: "TYPE", selector: row => row.type, sortable: true },
//         {
//             name: "ACTION",
//             cell: row => (
//                 <div className="flex space-x-2">
//                     <button className="btn btn-primary">
//                         <i className="fas fa-edit" />
//                     </button>
//                     <button className="btn btn-warning">
//                         <i className="fas fa-map-marker-alt" />
//                     </button>
//                 </div>
//             )
//         },
//         {
//             name: "CONFIRM",
//             cell: row => (
//                 <button className="btn btn-success" onClick={() => handleOpenModal(row)}>
//                     <i className="fas fa-check" />
//                 </button>
//             )
//         },
//         {
//             name: "CLOSE",
//             cell: row => (
//                 <button className="btn btn-danger" onClick={() => handleCloseModal(row)}>
//                     <i className="fas fa-times" />
//                 </button>
//             )
//         }
//     ];

//     return (
//         <div className="card">
//             <div className="card-body">
//                 <div className="d-flex gap-2 mb-3 align-items-center">
//                     <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
//                         <option value="">Semua BU</option>
//                         <option value="50">BU 50</option>
//                         <option value="51">BU 51</option>
//                     </select>
//                     <input
//                         type="text"
//                         className="form-control w-auto"
//                         placeholder="Cari Title / Type..."
//                         value={searchText}
//                         onChange={(e) => setSearchText(e.target.value)}
//                     />
//                 </div>

//                 <DataTable
//                     columns={columns}
//                     data={filteredData}
//                     pagination
//                     highlightOnHover
//                     striped
//                     responsive
//                     persistTableHead
//                 />
//             </div>

//             <ConfirmationModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onConfirm={handleConfirm}
//                 title="Konfirmasi Aksi"
//                 message={`Apakah Anda yakin ingin mengonfirmasi item dengan ID ${selectedItem?.kode_proposal}?`}
//                 confirmText="Ya, Konfirmasi"
//                 cancelText="Batal"
//                 theme="success"
//             />

//             <ConfirmationModal
//                 isOpen={isCloseModalOpen}
//                 onClose={() => setIsCloseModalOpen(false)}
//                 onConfirm={handleCloseConfirm}
//                 title="Konfirmasi Tutup"
//                 message={`Apakah Anda yakin ingin menutup item dengan ID ${selectedItem?.kode_proposal}?`}
//                 confirmText="Ya, Tutup"
//                 cancelText="Batal"
//                 theme="danger"
//             />
//         </div>
//     );
// };

// export default UpdateStatusCabang;

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom"; 
import updateStatusCabangServices from "../../services/admin/updateStatusCabangServices";
import ConfirmationModal from "../../components/ConfirmationModal";
import CustomTable from "../../components/table/customTable";

const UpdateStatusCabang = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dataCabang, setDataCabang] = useState([]);
    const [selectedBU, setSelectedBU] = useState("");
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await updateStatusCabangServices.getUpdateStatusCabangServices();
                if (response?.data?.data) {
                    setDataCabang(response.data.data);
                }
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
            await updateStatusCabangServices.closeProposalCabang(selectedItem?.id);
            alert(`Proposal dengan ID ${selectedItem?.id} berhasil di-approve.`);
            setDataCabang(prev => prev.filter(item => item.id !== selectedItem?.id));
        } catch (error) {
            alert(`Gagal approve proposal: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsModalOpen(false);
            setSelectedItem(null);
        }
    };

    const handleCloseModal = (item) => {
        setSelectedItem(item);
        setIsCloseModalOpen(true);
    };

    const handleCloseConfirm = async () => {
        try {
            await updateStatusCabangServices.cancelProposalCabang(selectedItem?.id);
            alert(`Proposal dengan ID ${selectedItem?.id} berhasil di-cancel.`);
            setDataCabang(prev => prev.filter(item => item.id !== selectedItem?.id));
        } catch (error) {
            alert(`Gagal cancel proposal: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsCloseModalOpen(false);
            setSelectedItem(null);
        }
    };

    const filteredData = dataCabang.filter(item =>
        (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
        (searchText === "" ||
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.type.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns = [
        {
          name: "RL",
          selector: row => row.ruang_lingkup,
          sortable: true,
          wrap: true,
          width: "60px",
          style: {
            whiteSpace: "normal",
            overflow: "visible",
            textOverflow: "clip",
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "REG 1",
          selector: row => row.reg || "-",
          sortable: true,
          wrap: true,
          width: "70px",
          style: {
            whiteSpace: "normal",
            overflow: "visible",
            textOverflow: "clip",
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "REG 2",
          selector: row => row.reg_branch || "-",
          sortable: true,
          wrap: true,
          width: "70px",
          style: {
            whiteSpace: "normal",
            overflow: "visible",
            textOverflow: "clip",
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "ID",
          selector: row => row.kode_proposal,
          sortable: true,
          style: {
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "BU",
          selector: row => row.bisnis_unit,
          sortable: true,
          wrap: true,
          width: "50px",
          style: {
            whiteSpace: "normal",
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "DATE",
          selector: row => row.tgl_pengajuan,
          sortable: true,
          wrap: true,
          width: "80px",
          style: {
            whiteSpace: "normal",
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "TITLE",
          selector: row => row.title,
          sortable: true,
          style: {
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "TYPE",
          selector: row => row.type,
          sortable: true,
          wrap: true,
          width: "100px",
          style: {
            whiteSpace: "normal",
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "EDIT / VIEW",
          cell: row => (
            <button
              className="btn btn-warning btn-sm"
              onClick={() => navigate(`/admin/updatestatuscabang/${row.id}`)}
            >
              <i className="fas fa-edit" />
            </button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          width: "90px"
        },
        {
          name: "CANCEL",
          cell: row => (
            <button className="btn btn-danger btn-sm" onClick={() => handleCloseModal(row)}>
              <i className="fas fa-times" />
            </button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          width: "80px"
        },
        {
          name: "To PST",
          cell: row => (
            <button className="btn btn-success btn-sm" onClick={() => handleOpenModal(row)}>
              To PST
            </button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          width: "80px"
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
                onConfirm={handleConfirm}
                title="Konfirmasi Aksi"
                message={`Apakah Anda yakin ingin mengonfirmasi item dengan ID ${selectedItem?.id}?`}
                confirmText="Ya, Kirim"
                cancelText="Batal"
                theme="success"
            />

            <ConfirmationModal
                isOpen={isCloseModalOpen}
                onClose={() => setIsCloseModalOpen(false)}
                onConfirm={handleCloseConfirm}
                title="Konfirmasi Cancel"
                message={`Apakah Anda yakin ingin cancel item dengan ID ${selectedItem?.id}?`}
                confirmText="Ya, Cancel"
                cancelText="Batal"
                theme="danger"
            />
        </div>
    );
};

export default UpdateStatusCabang;