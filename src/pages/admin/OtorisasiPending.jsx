// import { useState } from "react";

// const OtorisasiPending = () => {
//     const [selectedBU, setSelectedBU] = useState("");
//     const [selectedLevel, setSelectedLevel] = useState("");
//     const [searchTitle, setSearchTitle] = useState("");
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");

//     const data = [
//         { noReg: "001", id: "OTR-001", bu: "50", date: "2025-03-12", title: "Approval Budget", type: "Finance", status: "Pending", view: "View", recPst: "Yes", aktPst: "No" },
//         { noReg: "002", id: "OTR-002", bu: "51", date: "2025-03-13", title: "Marketing Proposal", type: "Marketing", status: "Approved", view: "View", recPst: "No", aktPst: "Yes" }
//     ];

//     const filteredData = data.filter(item =>
//         (selectedBU === "" || item.bu === selectedBU) &&
//         (selectedLevel === "" || item.type === selectedLevel) &&
//         (searchTitle === "" || item.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
//         (startDate === "" || new Date(item.date) >= new Date(startDate)) &&
//         (endDate === "" || new Date(item.date) <= new Date(endDate))
//     );

//     return (
//         <>
//             <div className="card">
//                 <div className="card-body">
//                     <div className="d-flex gap-2 mb-3 align-items-center">
//                         <input type="text" className="form-control w-auto" placeholder="Cari Title..." value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
//                         <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
//                             <option value="">Semua BU</option>
//                             <option value="50">BU 50</option>
//                             <option value="51">BU 51</option>
//                         </select>
//                         <select className="form-control w-auto" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
//                             <option value="">Semua Level</option>
//                             <option value="Finance">Finance</option>
//                             <option value="Marketing">Marketing</option>
//                         </select>
//                         From <input
//                             type="date"
//                             className="form-control w-auto"
//                             value={startDate}
//                             onChange={(e) => setStartDate(e.target.value)}
//                             onFocus={(e) => e.target.showPicker && e.target.showPicker()}
//                         />
//                         to <input
//                             type="date"
//                             className="form-control w-auto"
//                             value={endDate}
//                             onChange={(e) => setEndDate(e.target.value)}
//                             onFocus={(e) => e.target.showPicker && e.target.showPicker()}
//                         />
//                         <button className="btn btn-primary">Tampilkan</button>
//                     </div>
//                     <div className="table-responsive">
//                         <table className="table table-striped table-bordered first">
//                             <thead>
//                                 <tr>
//                                     <th>REG</th>
//                                     <th>ID</th>
//                                     <th>BU</th>
//                                     <th>DATE</th>
//                                     <th>TITLE</th>
//                                     <th>KOMENTAR</th>
//                                     <th>STATUS</th>
//                                     <th>PROCESS</th>
//                                     <th>HARI</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
                                
//                                 <tr>
//                                      <td colSpan="10" className="text-center">TIDAK ADA DATA</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default OtorisasiPending;

import { useEffect, useState } from "react";
import CustomTable from "../../components/table/customTable";
import OtorisasiServices from "../../services/admin/otorisasiServices";

const OtorisasiPending = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await OtorisasiServices.getOtorisasiPending();
          setData(response?.data?.data || []);
        } catch (err) {
          console.error("Gagal mengambil data:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const filteredData = data.filter(item =>
      (searchText === "" ||
        item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.keterangan?.toLowerCase().includes(searchText.toLowerCase())) &&
      (fromDate === "" || new Date(item.otorisasi_date) >= new Date(fromDate)) &&
      (toDate === "" || new Date(item.otorisasi_date) <= new Date(toDate))
    );
  
    const columns = [
      { name: "ID", selector: row => row.id_otorisasi, sortable: true, width: "100px" },
      { name: "TITLE", selector: row => row.title || "-", sortable: true },
      { name: "LEVEL ID", selector: row => row.id_level || "-" },
      { name: "KOMENTAR", selector: row => row.keterangan || "-" },
      { name: "TANGGAL", selector: row => row.otorisasi_date || "-", sortable: true },
      {
        name: "STATUS",
        selector: row => row.status,
        cell: row => (
          <span className={`badge ${row.status === "Cancel" ? "bg-danger" : "bg-success"}`}>
            {row.status}
          </span>
        ),
        sortable: true,
      },
    ];
  
    return (
      <div className="card">
        <div className="card-body p-0">
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
          </div>
  
          <CustomTable
            columns={columns}
            data={filteredData}
            loading={loading}
          />
        </div>
      </div>
    );
  };
  
  export default OtorisasiPending;
  
