// const ProposalReport = () => {
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
//                                 <th>REG1/REG2</th>
//                                 <th>NO. PROPOSAL</th>
//                                 <th>TITLE</th>
//                                 <th>BU</th>
//                                 <th>VIEW</th>
//                                 <th>TGL RECIEVED CAB</th>
//                                 <th>MGRCAB</th>
//                                 <th>KADEPT</th>
//                                 <th>AKTCAB</th>
//                                 <th>KACAB</th>
//                                 <th>MGRPST</th>
//                                 <th>AKTPST</th>
//                                 <th>FIN</th>
//                                 <th>AMD</th>
//                                 <th>DIRMKT</th>
//                                 <th>DIRUTM</th>
//                                 <th>STATUS</th>
//                                 <th>USER</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             <tr>
//                                     <td>1</td>
//                                     <td>RB-8087/R-8078</td>
//                                     <td>GT/2025020066/PIV</td>
//                                     <td>Permohonan Biaya Pembayaran Vendor PT. PLATINDO KARYA PRIMA No. Invoice: IVS25020066</td>
//                                     <td>50</td>
//                                     <td><button className="btn btn-success" type="submit"><i className="fas fa-search" /></button></td>
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
//                                     <td></td>
//                                     <td>ReceivedPusat</td>
//                                     <td>P1140</td>
//                             </tr>
//                             </tbody>
//                         </table>
//                         </div>
//                     </div>
//                     </div>

//         </>
//     );
// }

// export default ProposalReport;

// import React, { useEffect, useState } from "react";
// import AllReportServices from "../../services/admin/allReportServices";

// const ProposalReport = () => {
//   const [proposals, setProposals] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await AllReportServices.getReportCabang();
//         if (response.success) {
//           setProposals(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching proposal report:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="card">
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-striped table-bordered first">
//               <thead>
//                 <tr>
//                   <th>RL</th>
//                   <th>REG1/REG2</th>
//                   <th>NO. PROPOSAL</th>
//                   <th>TITLE</th>
//                   <th>BU</th>
//                   <th>VIEW</th>
//                   <th>TGL RECIEVED CAB</th>
//                   <th>MGRCAB</th>
//                   <th>KADEPT</th>
//                   <th>AKTCAB</th>
//                   <th>KACAB</th>
//                   <th>MGRPST</th>
//                   <th>AKTPST</th>
//                   <th>FIN</th>
//                   <th>AMD</th>
//                   <th>DIRMKT</th>
//                   <th>DIRUTM</th>
//                   <th>STATUS</th>
//                   <th>USER</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {proposals.map((proposal, index) => (
//                   <tr key={proposal.id}>
//                     <td>{index + 1}</td>
//                     <td>
//                       {proposal.reg_branch || "-"}/{proposal.reg || "-"}
//                     </td>
//                     <td>{proposal.kode_proposal}</td>
//                     <td>{proposal.title}</td>
//                     <td>50</td>
//                     <td>
//                       <button className="btn btn-success" type="button">
//                         <i className="fas fa-search" />
//                       </button>
//                     </td>
//                     <td>{proposal.date.receive_cabang || "-"}</td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td>{proposal.status}</td>
//                     <td>P1140</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProposalReport;


// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import AllReportServices from "../../services/admin/allReportServices";

// const ProposalReport = () => {
//   const [proposals, setProposals] = useState([]);
//   const [filters, setFilters] = useState({
//     keyword: "",
//     fromDate: "2025-01-31",
//     toDate: "2025-03-31",
//     bisnis_unit: "",
//     ruang_lingkup: "",
//     status: ""
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await AllReportServices.getReportCabang(filters);
//         if (response.success) {
//           setProposals(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching proposal report:", error);
//       }
//     };
//     fetchData();
//   }, [filters]);

//   const columns = [
//     { name: "RL", selector: (_, index) => index + 1, sortable: true },
//     { name: "REG1/REG2", selector: row => `${row.reg_branch || "-"}/${row.reg || "-"}`, sortable: true },
//     { name: "NO. PROPOSAL", selector: row => row.kode_proposal, sortable: true },
//     { name: "TITLE", selector: row => row.title, sortable: true },
//     { name: "BU", selector: () => "50", sortable: true },
//     { name: "VIEW", cell: () => <button className="btn btn-success"><i className="fas fa-search" /></button> },
//     { name: "TGL RECIEVED CAB", selector: row => row.date.receive_cabang || "-", sortable: true },
//     { name: "MGRCAB", selector: () => "-", sortable: true },
//     { name: "KADEPT", selector: () => "-", sortable: true },
//     { name: "AKTCAB", selector: () => "-", sortable: true },
//     { name: "KACAB", selector: () => "-", sortable: true },
//     { name: "MGRPST", selector: () => "-", sortable: true },
//     { name: "AKTPST", selector: () => "-", sortable: true },
//     { name: "FIN", selector: () => "-", sortable: true },
//     { name: "AMD", selector: () => "-", sortable: true },
//     { name: "DIRMKT", selector: () => "-", sortable: true },
//     { name: "DIRUTM", selector: () => "-", sortable: true },
//     { name: "STATUS", selector: row => row.status, sortable: true },
//     { name: "USER", selector: () => "P1140", sortable: true }
//   ];

//   return (
//     <>
//       <div className="card">
//         <div className="card-body">
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Search keyword..."
//               className="form-control"
//               onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
//             />
//           </div>
//           <DataTable
//             columns={columns}
//             data={proposals}
//             pagination
//             highlightOnHover
//             striped
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProposalReport;

// import { useState, useEffect } from "react";
// import AllReportServices from "../../services/admin/allReportServices";
// import DataTable from "react-data-table-component";

// const ProposalReport = () => {
//     const [filters, setFilters] = useState({
//         keyword: "",
//         fromDate: "",
//         toDate: "",
//     });
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const result = await AllReportServices.getReportCabang(filters);
//                 setData(result.data.data || []);
//             } catch (error) {
//                 console.error("Error fetching data: ", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [filters]);

//     const handleFilterChange = (e) => {
//         setFilters({ ...filters, [e.target.name]: e.target.value });
//     };

//     const columns = [
//         { name: "NO", selector: (_, index) => index + 1, width: "60px" },
//         { name: "REG1/REG2", selector: row => `${row.reg_branch || "-"}/${row.reg || "-"}`, sortable: true },
//         { name: "NO. PROPOSAL", selector: row => row.kode_proposal || "-", sortable: true },
//         { name: "TITLE", selector: row => row.title || "-", sortable: true },
//         { name: "BU", selector: row => row.bisnis_unit || "-", sortable: true },
//         { name: "VIEW", cell: () => <button className="btn btn-success"><i className="fas fa-search" /></button> },
//         { name: "TGL RECEIVED CAB", selector: row => row.date?.receive_cabang || "-", sortable: true },
//         { name: "MGRCAB", selector: () => "-", sortable: true },
//         { name: "KADEPT", selector: () => "-", sortable: true },
//         { name: "AKTCAB", selector: () => "-", sortable: true },
//         { name: "KACAB", selector: () => "-", sortable: true },
//         { name: "MGRPST", selector: () => "-", sortable: true },
//         { name: "AKTPST", selector: () => "-", sortable: true },
//         { name: "FIN", selector: () => "-", sortable: true },
//         { name: "AMD", selector: () => "-", sortable: true },
//         { name: "DIRMKT", selector: () => "-", sortable: true },
//         { name: "DIRUTM", selector: () => "-", sortable: true },
//         { name: "STATUS", selector: row => row.status || "-", sortable: true },
//         { name: "USER", selector: row => row.user || "-", sortable: true }
//     ];

//     return (
//         <div className="card">
//             <div className="card-body">
//                 <div className="d-flex gap-2 mb-3 align-items-center flex-wrap">
//                     <input
//                         type="text"
//                         className="form-control w-auto"
//                         name="keyword"
//                         placeholder="Search by REG, No Proposal, Title, or Status..."
//                         value={filters.keyword}
//                         onChange={handleFilterChange}
//                     />

//                     <span>From</span>
//                     <input
//                         type="date"
//                         className="form-control w-auto"
//                         name="fromDate"
//                         value={filters.fromDate}
//                         onChange={handleFilterChange}
//                     />

//                     <span>To</span>
//                     <input
//                         type="date"
//                         className="form-control w-auto"
//                         name="toDate"
//                         value={filters.toDate}
//                         onChange={handleFilterChange}
//                     />
//                 </div>
//                 <DataTable
//                     columns={columns}
//                     data={data}
//                     progressPending={loading}
//                     pagination
//                     highlightOnHover
//                     pointerOnHover
//                     responsive
//                 />
//             </div>
//         </div>
//     );
// };

// export default ProposalReport;

import { useState, useEffect } from "react";
import AllReportServices from "../../services/admin/allReportServices";
import { useNavigate } from "react-router-dom"; 
import DataTable from "react-data-table-component";
import CustomTable from "../../components/table/customTable";

const ProposalReport = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        keyword: "",
        fromDate: "",
        toDate: "",
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await AllReportServices.getReportCabang(filters);
                setData(result.data.data || []);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredData = data.filter(item =>
        (filters.keyword === "" ||
            item.reg?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            item.reg_branch?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            item.kode_proposal?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            item.title?.toLowerCase().includes(filters.keyword.toLowerCase())
        ) &&
        (filters.fromDate !== "" && filters.toDate !== "" ? 
            (new Date(item.date?.receive_cabang) >= new Date(filters.fromDate) && 
            new Date(item.date?.receive_cabang) <= new Date(filters.toDate)) 
            : true)
    );

    // const columns = [
    //     { name: "NO", selector: (_, index) => index + 1, width: "60px" },
    //     { name: "REG1/REG2", selector: row => `${row.reg_branch || "-"}/${row.reg || "-"}`, sortable: true },
    //     { name: "NO. PROPOSAL", selector: row => row.kode_proposal || "-", sortable: true },
    //     { name: "TITLE", selector: row => row.title || "-", sortable: true },
    //     { name: "BU", selector: row => row.bisnis_unit || "-", sortable: true },
    //     { name: "VIEW", cell: row => <button className="btn btn-success" onClick={() => {
    //         console.log("ID yang dikirim ke detail:", row.id);
    //         navigate(`/admin/proposalreport/${row.id}`);
    //     }}><i className="fas fa-search" /></button> },
    //     { name: "TGL RECEIVED CAB", selector: row => row.date?.receive_cabang || "-", sortable: true },
    //     { name: "MGRCAB", selector: () => "-", sortable: true },
    //     { name: "KADEPT", selector: () => "-", sortable: true },
    //     { name: "AKTCAB", selector: () => "-", sortable: true },
    //     { name: "KACAB", selector: () => "-", sortable: true },
    //     { name: "MGRPST", selector: () => "-", sortable: true },
    //     { name: "AKTPST", selector: () => "-", sortable: true },
    //     { name: "FIN", selector: () => "-", sortable: true },
    //     { name: "AMD", selector: () => "-", sortable: true },
    //     { name: "DIRMKT", selector: () => "-", sortable: true },
    //     { name: "DIRUTM", selector: () => "-", sortable: true },
    //     { name: "STATUS", selector: row => row.status || "-", sortable: true },
    //     { name: "USER", selector: row => row.user || "-", sortable: true }
    // ];

    const columns = [
        { name: "NO", selector: (_, index) => index + 1, width: "60px", wrap: true },
        { name: "REG", selector: row => `${row.reg_branch || "-"}/${row.reg || "-"}`, maxWidth: "120px", wrap: true },
        { name: "PROPOSAL", selector: row => row.kode_proposal || "-", maxWidth: "130px", wrap: true },
        { name: "TITLE", selector: row => row.title || "-", grow: 2, wrap: true },
        { name: "BU", selector: row => row.bisnis_unit || "-", maxWidth: "70px", wrap: true },
        {
          name: "VIEW",
          cell: row => (
            <button className="btn btn-success btn-sm" onClick={() => navigate(`/admin/proposalreport/${row.id}`)}>
              <i className="fas fa-search" />
            </button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          maxWidth: "70px"
        },
        { name: "RECV", selector: row => row.date?.receive_cabang || "-", maxWidth: "120px", wrap: true },
        { name: "MGRCAB", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "KADEPT", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "AKTCAB", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "KACAB", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "MGRPST", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "AKTPST", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "FIN", selector: () => "-", maxWidth: "80px", wrap: true },
        { name: "AMD", selector: () => "-", maxWidth: "80px", wrap: true },
        { name: "DIRMKT", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "DIRUTM", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "STATUS", selector: row => row.status || "-", maxWidth: "100px", wrap: true },
        { name: "USER", selector: row => row.user || "-", maxWidth: "100px", wrap: true }
      ];
      
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex gap-2 mb-3 align-items-center flex-wrap">
                    <input
                        type="text"
                        className="form-control w-auto"
                        name="keyword"
                        placeholder="Search by REG, No Proposal, Title, or Status..."
                        value={filters.keyword}
                        onChange={handleFilterChange}
                    />

                    <span>From</span>
                    <input
                        type="date"
                        className="form-control w-auto"
                        name="fromDate"
                        value={filters.fromDate}
                        onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                        onChange={handleFilterChange}
                    />

                    <span>To</span>
                    <input
                        type="date"
                        className="form-control w-auto"
                        name="toDate"
                        value={filters.toDate}
                        onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                        onChange={handleFilterChange}
                    />
                </div>
                <CustomTable
                    columns={columns}
                    data={filteredData}
                    loading={loading}
                />
                {/* <DataTable
                    columns={columns}
                    data={filteredData}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    responsive
                /> */}
            </div>
        </div>
    );
};

export default ProposalReport;
