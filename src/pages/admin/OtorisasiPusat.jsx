// const OtorisasiPusat = () => {
//     return (
//          <>
//               <div className="card">
//                     {/* <h5 className="card-header">Update Anggaran</h5> */}
//                     <div className="card-body">
//                         <div className="table-responsive">
//                         <table className="table table-striped table-bordered first">
//                             <thead>
//                             <tr>
//                                 <th>OTO</th>
//                                 <th>REG</th>
//                                 <th>ID</th>
//                                 <th>BU</th>
//                                 <th>DATE INPUT</th>
//                                 <th>TITLE</th>
//                                 <th>TYPE</th>
//                                 <th>STATUS</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             <tr>
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

// export default OtorisasiPusat;

// import React, { useEffect, useState } from "react";
// import allDataProposal from "../../services/admin/allDataProposal"; // Sesuaikan path-nya

// const OtorisasiPusat = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchDataProposal = async () => {
//       const response = await allDataProposal.getAllDataProposal();
//       if (response && response.success) {
//         setData(response.data.data); // Ambil array dari key "data"
//       }
//     };

//     fetchDataProposal();
//   }, []);

//   return (
//     <>
//       <div className="card">
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-striped table-bordered first">
//               <thead>
//                 <tr>
//                   <th>OTO</th>
//                   <th>REG</th>
//                   <th>ID</th>
//                   <th>BU</th>
//                   <th>DATE INPUT</th>
//                   <th>TITLE</th>
//                   <th>TYPE</th>
//                   <th>STATUS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.length > 0 ? (
//                   data.map((item, index) => (
//                     <tr key={index}>
//                       <td>tombol</td>
//                       <td>{item.reg_branch ?? "-"}</td>
//                       <td>{item.kode_proposal}</td>
//                       <td>{item.bisnis_unit}</td>
//                       <td>{item.tgl_pengajuan}</td>
//                       <td>{item.title}</td>
//                       <td>{item.type}</td>
//                       <td>{item.status}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="text-center">
//                       Loading or No Data Available
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OtorisasiPusat;

import React, { useEffect, useState } from "react";
import allDataProposal from "../../services/admin/allDataProposal";
import CustomTable from "../../components/table/customTable";
import { useNavigate } from "react-router-dom"; 

const OtorisasiPusat = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataProposal = async () => {
      const response = await allDataProposal.getAllDataProposal();
      if (response && response.success) {
        setData(response.data.data);
      }
      setLoading(false);
    };

    fetchDataProposal();
  }, []);

  const columns = [
    {
      name: "OTO",
      selector: (row) => row.kode_proposal,
      cell: (row) => (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
                    console.log("ID yang dikirim ke detail:", row.id);
                    navigate(`/admin/detailotorisasipusat/${row.id}`);
                  }}
        >
          <i className="fas fa-edit"></i>
        </button>
      ),
      width: "70px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "REG",
      selector: (row) => row.reg_branch ?? "-",
      width: "100px",
    },
    {
      name: "ID",
      selector: (row) => row.kode_proposal,
    },
    {
      name: "BU",
      selector: (row) => row.bisnis_unit,
      width: "100px", // pas-pasan untuk BU
    },
    {
      name: "DATE INPUT",
      selector: (row) => row.tgl_pengajuan,
    },
    {
      name: "TITLE",
      selector: (row) => row.title,
      wrap: true,
      grow: 3, // biar lebar dan gak kena ellipsis
    },
    {
      name: "TYPE",
      selector: (row) => row.type,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
    },
  ];
  
  

  return (
    <div className="card">
      <div className="card-body">
        <CustomTable columns={columns} data={data} loading={loading} />
      </div>
    </div>
  );
};

export default OtorisasiPusat;
