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

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const InboxPusat = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedBU, setSelectedBU] = useState("");
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${BASE_URL}/master/data-proposal-pusat?page=1&limit=10&keyword=`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(response.data.data.data);
                setFilteredData(response.data.data.data);
            } catch (error) {
                console.error("Error fetching inbox pusat:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filterData = data.filter(item =>
            (selectedBU === "" || item.bisnis_unit === selectedBU) &&
            (searchTitle === "" || item.title.toLowerCase().includes(searchTitle.toLowerCase()))
        );
        setFilteredData(filterData);
    }, [selectedBU, searchTitle, data]);

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true },
        { name: "BU", selector: row => row.bisnis_unit, sortable: true },
        { name: "PRO DATE", selector: row => row.tgl_pengajuan, sortable: true },
        { name: "TITLE", selector: row => row.title, sortable: true },
        { name: "TYPE", selector: row => row.type, sortable: true }
    ];

    return (
        <div className="card">
            <div className="card-body">
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
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    {/* <button className="btn btn-primary" onClick={() => setFilteredData(data)}>Tampilkan</button> */}
                </div>
                <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    highlightOnHover
                    striped
                />
            </div>
        </div>
    );
};

export default InboxPusat;