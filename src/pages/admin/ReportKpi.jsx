// const OtorisationNotCompleted = () => {
//     return(
//         <>
//            <div className="card">
//                 <div className="card-body">
//                     <div className="table-responsive">
//                     <table className="table table-striped table-bordered first">
//                         <thead>
//                         <tr>
//                             <th>NO.REG</th>
//                             <th>ID</th>
//                             <th>BU</th>
//                             <th>DATE</th>
//                             <th>TITLE</th>
//                             <th>TYPE</th>
//                             <th>STATUS</th>
//                             <th>VIEW</th>
//                             <th>RECIEV PST</th>
//                             <th>AKT PST</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         <tr>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td>
//                             </td>
//                             <td>
//                             </td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td>
//                             </td>
//                             <td>
//                             </td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td>
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

// export default OtorisationNotCompleted;

// import { useState } from "react";

// const ReportKpi = () => {
//     const [selectedLevel, setSelectedLevel] = useState("");
//     const [selectedDate, setSelectedDate] = useState("");
//     const [fromDate, setFromDate] = useState("");
//     const [toDate, setToDate] = useState("");

//     const data = [
//         { noReg: "001", id: "OTR-001", bu: "50", date: "2025-03-12", title: "Approval Budget", type: "Finance", status: "Pending", view: "View", recPst: "Yes", aktPst: "No" },
//         { noReg: "002", id: "OTR-002", bu: "51", date: "2025-03-13", title: "Marketing Proposal", type: "Marketing", status: "Approved", view: "View", recPst: "No", aktPst: "Yes" }
//     ];

//     const filteredData = data.filter(item =>
//         (selectedLevel === "" || item.type === selectedLevel) &&
//         (selectedDate === "" || item.date === selectedDate) &&
//         ((fromDate === "" && toDate === "") || (item.date >= fromDate && item.date <= toDate))
//     );

//     return (
//         <>
//             <div className="card">
//                 <div className="card-body">
//                     <div className="d-flex gap-2 mb-3 align-items-center flex-wrap">
//                          By Date<input type="date" className="form-control w-auto" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} onClick={(e) => e.target.showPicker()} />
//                         <select className="form-control w-auto" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
//                             <option value="">Semua Level</option>
//                             <option value="Finance">Finance</option>
//                             <option value="Marketing">Marketing</option>
//                         </select>
//                         From <input type="date" className="form-control w-auto" value={fromDate} onChange={(e) => setFromDate(e.target.value)} onClick={(e) => e.target.showPicker()} />
//                         to <input type="date" className="form-control w-auto" value={toDate} onChange={(e) => setToDate(e.target.value)} onClick={(e) => e.target.showPicker()} />
//                         <button className="btn btn-primary">Tampilkan</button>
//                     </div>
//                     <div className="table-responsive">
//                         <table className="table table-striped table-bordered first">
//                             <thead>
//                                 <tr>
//                                     <th>NO</th>
//                                     <th>REG</th>
//                                     <th>ID</th>
//                                     <th>TITLE</th>
//                                     <th>TGGL RECIEVED</th>
//                                     <th>TGGL OTORISASI</th>
//                                     <th>JAM</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredData.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>{index + 1}</td>
//                                         <td>{item.noReg}</td>
//                                         <td>{item.id}</td>
//                                         <td>{item.title}</td>
//                                         <td>{item.date}</td>
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

// export default ReportKpi;

// import { useState, useEffect } from "react";
// import AllReportServices from "../../services/admin/allReportServices";
// import DataTable from "react-data-table-component";

// const ReportKpi = () => {
//     const [selectedLevel, setSelectedLevel] = useState("");
//     const [selectedDate, setSelectedDate] = useState("");
//     const [fromDate, setFromDate] = useState("");
//     const [toDate, setToDate] = useState("");
//     const [data, setData] = useState([]);

//     const fetchData = async (filters = {}) => {
//         try {
//             const result = await AllReportServices.getReportKPI(filters);
//             setData(result.data.data || []);
//         } catch (error) {
//             console.error("Error fetching data: ", error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleFilter = () => {
//         const filters = {
//             level: selectedLevel || undefined,
//             fromDate: fromDate || undefined,
//             toDate: toDate || undefined,
//             transdate: selectedDate || undefined,
//         };
//         fetchData(filters);
//     };

//     const columns = [
//         { name: "NO", selector: (row, index) => index + 1, width: "60px" },
//         { name: "REG", selector: (row) => row.reg || "-", sortable: true },
//         { name: "REG BRANCH", selector: (row) => row.reg_branch || "-", sortable: true },
//         { name: "KODE PROPOSAL", selector: (row) => row.kode_proposal || "-", sortable: true },
//         { name: "TITLE", selector: (row) => row.title || "-", sortable: true },
//         { name: "TGL RECEIVED", selector: (row) => row.tgl_receive || "-", sortable: true },
//         { name: "TGL OTORISASI", selector: (row) => row.tgl_otorisasi || "-", sortable: true },
//         { name: "JAM", selector: (row) => row.jam || "-", sortable: true },
//     ];

//     return (
//         <div className="card">
//             <div className="card-body">
//                 <div className="d-flex gap-2 mb-3 align-items-center flex-wrap">
//                     <span>By Date</span>
//                     <input type="date" className="form-control w-auto" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                    
//                     <select className="form-control w-auto" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
//                         <option value="">Semua Level</option>
//                         <option value="Finance">Finance</option>
//                         <option value="Marketing">Marketing</option>
//                     </select>

//                     <span>From</span>
//                     <input type="date" className="form-control w-auto" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    
//                     <span>to</span>
//                     <input type="date" className="form-control w-auto" value={toDate} onChange={(e) => setToDate(e.target.value)} />

//                     <button className="btn btn-primary" onClick={handleFilter}>Tampilkan</button>
//                 </div>
//                 <DataTable
//                     columns={columns}
//                     data={data}
//                     pagination
//                     highlightOnHover
//                     pointerOnHover
//                     responsive
//                 />
//             </div>
//         </div>
//     );
// };

// export default ReportKpi;

import { useState, useEffect } from "react";
import AllReportServices from "../../services/admin/allReportServices";
import DataTable from "react-data-table-component";
import CustomTable from "../../components/table/customTable";

const ReportKpi = () => {
    const [searchText, setSearchText] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await AllReportServices.getReportKPI();
                setData(result.data.data || []);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredData = data.filter(item =>
        (searchText === "" ||
            item.reg?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.reg_branch?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.kode_proposal?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.title?.toLowerCase().includes(searchText.toLowerCase())
        ) &&
        (fromDate === "" || new Date(item.tgl_receive) >= new Date(fromDate)) &&
        (toDate === "" || new Date(item.tgl_receive) <= new Date(toDate))
    );

    const columns = [
        { name: "NO", selector: (row, index) => index + 1, width: "60px" },
        { name: "REG", selector: (row) => row.reg || "-", sortable: true },
        { name: "REG BRANCH", selector: (row) => row.reg_branch || "-", sortable: true },
        { name: "KODE PROPOSAL", selector: (row) => row.kode_proposal || "-", sortable: true },
        { name: "TITLE", selector: (row) => row.title || "-", sortable: true },
        { name: "TGL RECEIVED", selector: (row) => row.tgl_receive || "-", sortable: true },
        { name: "TGL OTORISASI", selector: (row) => row.tgl_otorisasi || "-", sortable: true },
        { name: "JAM", selector: (row) => row.jam || "-", sortable: true },
    ];

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex gap-2 mb-3 align-items-center flex-wrap">
                    <input
                        type="text"
                        className="form-control w-auto"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <span>From</span>
                    <input
                        type="date"
                        className="form-control w-auto"
                        value={fromDate}
                        onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                        onChange={(e) => setFromDate(e.target.value)}
                    />

                    <span>To</span>
                    <input
                        type="date"
                        className="form-control w-auto"
                        value={toDate}
                        onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                        onChange={(e) => setToDate(e.target.value)}
                    />

                    {/* <button className="btn btn-primary" onClick={() => setLoading(true)}>
                        Tampilkan
                    </button> */}
                </div>
                {/* <DataTable
                    columns={columns}
                    data={filteredData}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    responsive
                /> */}
                <CustomTable
                    columns={columns}
                    data={filteredData}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default ReportKpi;
