// const UpdateStatusPst = () => {
//     return (
//          <>
//               <div className="card">
//                     {/* <h5 className="card-header">Update Anggaran</h5> */}
//                     <div className="card-body">
//                         <div className="table-responsive">
//                         <table className="table table-striped table-bordered first">
//                             <thead>
//                             <tr>
//                                 <th>RL</th>
//                                 <th>CAB</th>
//                                 <th>PST</th>
//                                 <th>ID</th>
//                                 <th>BU</th>
//                                 <th>DATE</th>
//                                 <th>TITLE</th>
//                                 <th>TYPE</th>
//                                 <th>OTO</th>
//                                 <th>PROSESS</th>
//                                 <th>CANCEL</th>
//                                 <th>CLOSE</th>
//                                 <th></th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             <tr>
//                                     <td>PST</td>
//                                     <td>RB-8078</td>
//                                     <td>R-8078</td>
//                                     <td>GT/2025020066/PIV</td>
//                                     <td>50</td>
//                                     <td>2025-03-11</td>
//                                     <td>Permohonan Biaya Pembayaran Vendor PT. PLATINDO KARYA PRIMA No. Invoice: IVS250200078</td>
//                                     <td>99. LAIN-LAIN</td>
//                                     <td></td>
//                                     <td>
//                                         <div className="d-flex justify-content-between">
//                                             <button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button>
//                                             <button className="btn btn-warning" type="submit"><i className="fas fa-map-marker-alt" /></button>
//                                         </div>
//                                     </td>
//                                     <td>
//                                     <button className="btn btn-danger" type="submit"><i className="fas fa-expand-arrows-alt" /></button>
//                                     </td>
//                                     <td>
//                                     <button className="btn btn-success" type="submit">Close</button>
//                                     </td>
//                                     <td>
//                                     <button className="btn btn-primary" type="submit"><i className=" fas fa-arrow-right" /></button>
//                                     </td>
//                             </tr>
//                             </tbody>
//                         </table>
//                         </div>
//                     </div>
//                     </div>

//         </>
//     );
// }

// export default UpdateStatusPst;

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom"; 
import updateStatusPusatServices from "../../services/admin/updateStatusPusatServices";
import ConfirmationModal from "../../components/ConfirmationModal";

const UpdateStatusPst = () => {
    const navigate = useNavigate();
    const [dataPusat, setDataPusat] = useState([]);
    const [selectedBU, setSelectedBU] = useState("");
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await updateStatusPusatServices.getUpdateStatusPusatServices();
                if (response?.data?.data) {
                    setDataPusat(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
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
            await updateStatusPusatServices.approveProposalPusat(selectedItem?.id);
            alert(`Proposal dengan ID ${selectedItem?.id} berhasil di-approve.`);
            setDataPusat(prev => prev.filter(item => item.id !== selectedItem?.id));
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
            await updateStatusPusatServices.cancelProposalPusat(selectedItem?.id);
            alert(`Proposal dengan ID ${selectedItem?.id} berhasil di-cancel.`);
            setDataPusat(prev => prev.filter(item => item.id !== selectedItem?.id));
        } catch (error) {
            alert(`Gagal cancel proposal: ${error.response?.data?.message || error.message}`);
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

    const columns = [
        { name: "RL", selector: row => row.ruang_lingkup, sortable: true },
        { name: "CAB", selector: row => row.reg_branch || "-", sortable: true },
        { name: "PST", selector: row => row.reg || "-", sortable: true },
        { name: "ID", selector: row => row.kode_proposal, sortable: true },
        { name: "BU", selector: row => row.bisnis_unit, sortable: true },
        { name: "DATE", selector: row => row.tgl_pengajuan, sortable: true },
        { name: "TITLE", selector: row => row.title, sortable: true },
        { name: "TYPE", selector: row => row.type, sortable: true },
        {
            name: "EDIT/VIEW",
            cell: row => (
                <div className="flex space-x-2">
                    {/* <button className="btn btn-primary">
                        <i className="fas fa-edit" />
                    </button> */}
                    <button className="btn btn-warning" onClick={() => {
                        console.log("ID yang dikirim ke detail:", row.id);
                        navigate(`/admin/updatestatuspusat/${row.id}`);
                    }}>
                        <i className="fas fa-edit" />
                    </button>
                </div>
            )
        },
        {
            name: "CLOSE",
            cell: row => (
                <button className="btn btn-danger" onClick={() => handleCloseModal(row)}>
                    <i className="fas fa-times" />
                </button>
            )
        },
        {
            name: "CONFIRM",
            cell: row => (
                <button className="btn btn-success" onClick={() => handleOpenModal(row)}>
                    <i className="fas fa-check" />
                </button>
            )
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
                onConfirm={handleConfirm}
                title="Konfirmasi Aksi"
                message={`Apakah Anda yakin ingin mengonfirmasi item dengan ID ${selectedItem?.id}?`}
                confirmText="Ya, Konfirmasi"
                cancelText="Batal"
                theme="success"
            />

            <ConfirmationModal
                isOpen={isCloseModalOpen}
                onClose={() => setIsCloseModalOpen(false)}
                onConfirm={handleCloseConfirm}
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
