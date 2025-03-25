// const UpdateAnggaran = () => {
//     return(
//         <>
//               <div className="card">
//                     {/* <h5 className="card-header">Update Anggaran</h5> */}
//                     <div className="card-body">
//                         <div className="table-responsive">
//                         <table className="table table-striped table-bordered first">
//                             <thead>
//                             <tr>
//                                 <th>OTO</th>
//                                 <th>REQ</th>
//                                 <th>ID</th>
//                                 <th>BU</th>
//                                 <th>TGL INPUT</th>
//                                 <th>TITLE</th>
//                                 <th>TYPE</th>
//                                 <th>STATUS</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             <tr>
//                                 <td><button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button></td>
//                                 <td>RB-8061</td>
//                                 <td>0314/MASTERDISKON/III/2025</td>
//                                 <td>50</td>
//                                 <td>2025-03-10 11:21:12</td>
//                                 <td>Surat Konfirmasi Issue Tiket Pesawat Peserta Tour Incentive West Europe</td>
//                                 <td>99.LAIN-LAIN</td>
//                                 <td>-RecievedPusat</td>
//                             </tr>
//                             <tr>
//                                 <td><button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button></td>
//                                 <td>RB-8054</td>
//                                 <td>0314/MASTERDISKON/III/2025</td>
//                                 <td>50</td>
//                                 <td>2025-03-10 11:21:12</td>
//                                 <td>Surat Konfirmasi Issue Tiket Pesawat Peserta Tour Incentive West Europe</td>
//                                 <td>99.LAIN-LAIN</td>
//                                 <td>-RecievedPusat</td>
//                             </tr>
//                             </tbody>
//                         </table>
//                         </div>
//                     </div>
//                     </div>

//         </>
//     );
// }

// export default UpdateAnggaran;

// import { useState } from "react";

// const UpdateAnggaran = () => {
//     const [selectedBU, setSelectedBU] = useState("");
//     const [searchTitle, setSearchTitle] = useState("");

//     const data = [
//         { oto: "Edit", req: "RB-8061", id: "0314/MASTERDISKON/III/2025", bu: "50", tglInput: "2025-03-10 11:21:12", title: "Surat Konfirmasi Issue Tiket Pesawat Peserta Tour Incentive West Europe", type: "99.LAIN-LAIN", status: "-RecievedPusat" },
//         { oto: "Edit", req: "RB-8054", id: "0314/MASTERDISKON/III/2025", bu: "50", tglInput: "2025-03-10 11:21:12", title: "Surat Konfirmasi Issue Tiket Pesawat Peserta Tour Incentive West Europe", type: "99.LAIN-LAIN", status: "-RecievedPusat" }
//     ];

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
//                         {/* <button className="btn btn-primary">Tampilkan</button> */}
//                     </div>
//                     <div className="table-responsive">
//                         <table className="table table-striped table-bordered first">
//                             <thead>
//                                 <tr>
//                                     <th>OTO</th>
//                                     <th>REQ</th>
//                                     <th>ID</th>
//                                     <th>BU</th>
//                                     <th>TGL INPUT</th>
//                                     <th>TITLE</th>
//                                     <th>TYPE</th>
//                                     <th>STATUS</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>
//                                             <button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button>
//                                         </td>
//                                         <td>{item.req}</td>
//                                         <td>{item.id}</td>
//                                         <td>{item.bu}</td>
//                                         <td>{item.tglInput}</td>
//                                         <td>{item.title}</td>
//                                         <td>{item.type}</td>
//                                         <td>{item.status}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default UpdateAnggaran;

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom"; 
// import inboxCabangServices from "../../services/admin/inboxCabangServices";
import AnggaranServices from "../../services/admin/anggaranServices";
// import ConfirmationModal from "../../components/ConfirmationModal";

const UpdateAnggaran = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedBU, setSelectedBU] = useState("");
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AnggaranServices.getAnggaran();
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredData = data.filter(item =>
        (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
        (searchText === "" ||
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.type.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns = [
        {
            name: "VIEW",
            cell: (row) => {
              return (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    console.log("ID yang dikirim ke detail:", row.id);
                    navigate(`/admin/updateanggaran/${row.id}`);
                  }}
                >
                  <i className="fas fa-edit" />
                </button>
              );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        { name: "ID", selector: row => row.id, sortable: true },
        { name: "BU", selector: row => row.bisnis_unit, sortable: true },
        { name: "PRO DATE", selector: row => row.tgl_pengajuan, sortable: true },
        { name: "TITLE", selector: row => row.title, sortable: true },
        { name: "TYPE", selector: row => row.type, sortable: true },
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
        </div>
    );
};

export default UpdateAnggaran;
