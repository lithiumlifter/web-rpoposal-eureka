// // pages/PrintReportCabang.jsx
// import { useLocation } from "react-router-dom";

// const PrintReportCabang = () => {
//     const location = useLocation();
//     const data = location.state?.data || [];

//     return (
//         <div>
//             <h2>Print Report to Cabang</h2>
//             <table border="1" cellPadding="5">
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>Tanggal</th>
//                         <th>ID</th>
//                         <th>Title</th>
//                         <th>Status</th>
//                         {/* Tambahkan kolom sesuai kebutuhan */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((item, idx) => (
//                         <tr key={idx}>
//                             <td>{idx + 1}</td>
//                             <td>{item.date?.receive_cabang || "-"}</td>
//                             <td>{item.kode_proposal || "-"}</td>
//                             <td>{item.title || "-"}</td>
//                             <td>{item.status || "-"}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <button onClick={() => window.print()}>Print</button>
//         </div>
//     );
// };

// export default PrintReportCabang;

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const PrintReportCabang = () => {
  const location = useLocation();
  const data = location.state?.data || [];

  const fromDate = data[0]?.date?.receive_cabang || "-";
  const toDate = data[data.length - 1]?.date?.receive_cabang || "-";

  useEffect(() => {
    setTimeout(() => window.print(), 500);
  }, []);

  return (
    <div>
      {/* Styling langsung di dalam komponen */}
      <style>{`
        @media print {
          @page {
            margin: 1.5cm;
            size: A4 portrait;
          }
        }

        body, html {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }

        .print-wrapper {
          padding: 20px;
          color: #000;
        }

        .header {
          text-align: center;
          margin-bottom: 20px;
        }

        .header-info {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .header h1 {
          margin: 5px 0;
          font-size: 20px;
        }

        .periode {
          font-size: 14px;
          margin-bottom: 10px;
        }

        .rekap-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }

        .rekap-table th,
        .rekap-table td {
          border: 1px solid #aaa;
          padding: 4px 6px;
          text-align: left;
          vertical-align: top;
        }

        .rekap-table th {
          background-color: #f0f0f0;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          margin-top: 40px;
          border-top: 1px solid #ddd;
          padding-top: 5px;
        }
      `}</style>

      <div className="print-wrapper">
        <div className="header">
          <div className="header-info">
            <span>{new Date().toLocaleString()}</span>
            <span>Proposal Mail Web</span>
          </div>
          <h1>REKAP PERSETUJUAN PUSAT</h1>
          <p className="periode">Periode {fromDate} s/d {toDate}</p>
        </div>

        <table className="rekap-table">
          <thead>
            <tr>
              <th>NO</th>
              <th>TGL</th>
              <th>ID</th>
              <th>TITLE</th>
              <th>MGR PST</th>
              <th>AKT PST</th>
              <th>FIN</th>
              <th>AMD</th>
              <th>DIR MKT</th>
              <th>DIR UTM</th>
              <th>NO ARSIP</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.date?.receive_cabang || "-"}</td>
                <td>{item.kode_proposal || "-"}</td>
                <td>{item.title || "-"}</td>
                <td>{item.approve?.oto_mgr || "-"}</td>
                <td>{item.approve?.oto_akt || "-"}</td>
                <td>{item.approve?.oto_fin || "-"}</td>
                <td>{item.approve?.oto_amd || "-"}</td>
                <td>{item.approve?.oto_mkt || "-"}</td>
                <td>{item.approve?.oto_ut || "-"}</td>
                <td>{item.no_arsip || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="footer">
          <span>https://private.erlangga.co.id/proposaleureka/mainproposal.php?id=report_pst</span>
          <span className="page-number">1/{Math.ceil(data.length / 10)}</span>
        </div>
      </div>
    </div>
  );
};

export default PrintReportCabang;

