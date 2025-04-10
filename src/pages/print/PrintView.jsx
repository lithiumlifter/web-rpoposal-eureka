// import React, {useEffect} from 'react';
// import { useLocation } from "react-router-dom";


// const PrintView = () => {
//     const { state } = useLocation();
//     const { proposal, formData } = state || {};

//     useEffect(() => {
//         if (proposal) {
//           setTimeout(() => window.print(), 500);
//         }
//       }, [proposal]);      

//   return (
//     <div className="container mt-4 mb-5 p-4 border rounded shadow-sm bg-white text-dark">
//       {/* Header */}
//       <div className="border p-3 mb-4">
//         <div className="d-flex justify-content-between mb-2">
//           <strong>PROPOSAL : 99.LAIN-LAIN</strong>
//           <span>Print by : <strong>Angga P</strong> Tgl 10 Apr 2025</span>
//         </div>
//         <div className="small">
//           <p><strong>Perihal:</strong> Pengajuan Tabel Pembanding Dealer Toyota (Type Unit Hi Ace Commuter M/T) untuk Erlangga Cabang Medan</p>
//           <p><strong>Nomor:</strong> 174/JAJA-AUTO/IV/2025</p>
//           <p><strong>Register:</strong> RB-8386/R-8386 &nbsp; Tgl: 09 Apr 2025</p>
//           <div className="row mt-2">
//             <div className="col-md-6">
//               <p><strong>Lembaga:</strong> BU</p>
//               <p><strong>Kode:</strong></p>
//               <p><strong>Alamat:</strong></p>
//             </div>
//             <div className="col-md-6">
//               <p><strong>Jml Siswa:</strong> 0</p>
//               <p><strong>Nama Mitra:</strong></p>
//               <p><strong>No HP:</strong></p>
//               <p><strong>Sejak:</strong> 01 Jan 1990</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Biaya */}
//       <div className="mb-2">
//         <strong>Biaya: 0</strong>
//       </div>

//       {/* Tanggal */}
//       <div className="mb-2">
//         09 April 2025
//       </div>

//       {/* Info Surat */}
//       <div className="mb-4">
//         <p><strong>No DPP:</strong> 174/JAJA-AUTO/IV/2025</p>
//         <p><strong>Lamp:</strong> 1 Lembar</p>
//         <p><strong>Hal:</strong> Pengajuan Tabel Pembanding Dealer Toyota (Type Unit Hi Ace Commuter M/T) untuk Erlangga Cabang Medan</p>
//       </div>

//       {/* Tujuan */}
//       <div className="mb-3">
//         <p>Kepada Yth</p>
//         <p><strong>Bapak Raja Manahara</strong></p>
//         <p><strong>Direktur Utama PT Eureka Group</strong></p>
//         <p>Di Tempat</p>
//       </div>

//       {/* Pembuka */}
//       <div className="mb-3">
//         <p>Dengan Hormat</p>
//         <p className="mt-2">
//           Bersama ini kami mengajukan approval untuk table pembanding dealer Toyota untuk satu unit Hi Ace Commuter M/T permintaan Erlangga Cabang Medan untuk customer Yayasan Buddhis Maetriwara. Adapun detailnya sebagai berikut:
//         </p>
//       </div>

//       {/* What, Why, Who, etc. */}
//       <div className="mb-4">
//         <p><strong>What</strong>: Pengajuan approval table pembanding Unit Hi Ace Commuter M/T</p>
//         <p><strong>Why</strong>: Memenuhi SPK Deal yang telah disetujui customer — NO SPK: 20250013</p>
//         <p><strong>Who</strong>: Erlangga Cabang Medan (PIC: Bapak Rizqy Fadil Bustam – KA. Akunting Medan), Wilayah Manager SD Medan – Bapak Margiyanto, Wilayah ASM SD 1 Medan – Bapak Jonathan Gurning</p>
//         <p><strong>When</strong>: 09 April 2025</p>
//         <p><strong>Where</strong>: Dealer Toyota Rekomendasi Jaja Auto - PT Astra International Sudirman</p>
//         <p><strong>How</strong>: Tim Jaja Auto melakukan pembelian ke dealer yang sudah di-approve oleh manajemen untuk pemenuhan permintaan Erlangga Cabang Medan</p>
//       </div>

//       {/* Footer */}
//       <div className="text-end text-muted small fst-italic">
//         https://private.erlangga.co.id/proposaleureka/mainproposal.php?id=report
//       </div>
//     </div>
//   );
// };

// export default PrintView;

import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";

const PrintView = () => {
  const { state } = useLocation();
  const { proposal, formData } = state || {};

  useEffect(() => {
    document.title = `Proposal - ${formData?.title || 'Print'}`;
    setTimeout(() => window.print(), 500);
  }, []);
  

  if (!proposal || !formData) return <p>Data tidak tersedia.</p>;

  return (
    <div className="print-container">
      {/* <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 30px;
            font-family: Arial, sans-serif;
            font-size: 14px;
          }
        }
      `}</style> */}
      <style>{`
  @media print {
    body * {
      visibility: hidden;
    }
    .print-container, .print-container * {
      visibility: visible;
    }
    .print-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 30px;
      font-family: Arial, sans-serif;
      font-size: 14px;
    }
    .print-container .ck-content {
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
    }
    .print-container .ck-content h1,
    .print-container .ck-content h2,
    .print-container .ck-content h3 {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    .print-container .ck-content p {
      margin-bottom: 0.8rem;
    }
    .print-container .ck-content ul,
    .print-container .ck-content ol {
      padding-left: 1.5rem;
      margin-bottom: 1rem;
    }
    .print-container .ck-content li {
      margin-bottom: 0.3rem;
    }
    .print-container .ck-content {
    text-align: left !important;
    }

    .print-container .ck-content [readonly] {
    pointer-events: all;
    user-select: text;
    }

  }
`}</style>


      {/* === Mulai tampilan cetak mirip screenshot pertama === */}
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div><img src="/barcode-placeholder.png" alt="Barcode" height="30" /></div>
          <div style={{ fontWeight: 'bold', textAlign: 'center', flexGrow: 1 }}>
            PROPOSAL : {proposal.kategori} Print by : {formData.printed_by}
          </div>
        </div>
        <table style={{ width: '100%', marginTop: '10px', fontSize: '13px' }}>
          <tbody>
            <tr>
                <td><strong>Perihal:</strong></td>
                <td>{formData.title}</td></tr>
            <tr>
              <td><strong>Nomor:</strong></td>
              <td>{formData.kode_proposal}</td>
              <td><strong>BU</strong></td>
              <td>{formData.bisnis_unit}</td>
            </tr>
            <tr>
              <td><strong>Register:</strong></td>
              <td>Tgl : {formData.tgl_proposal}</td>
              <td><strong>Jml Siswa</strong></td>
              <td>{formData.jumlah_siswa || 0}</td>
            </tr>
            <tr>
              <td><strong>Lembaga:</strong></td>
              <td>{formData.lembaga}</td>
              <td><strong>Nama Mitra:</strong></td>
              <td>{formData.nama_mitra}</td>
            </tr>
            <tr>
              <td><strong>Kode:</strong></td>
              <td>{formData.kode_mitra}</td>
              <td><strong>No HP:</strong></td>
              <td>{formData.no_hp}</td>
            </tr>
            <tr>
              <td><strong>Alamat:</strong></td>
              <td>{formData.alamat}</td>
              <td><strong>Sejak:</strong></td>
              <td>{formData.sejak}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Konten Surat */}
      <div className="card mb-4">
        {/* <div className="card-header text-start">Isi Proposal</div> */}
        <div className="card-body">
        <div
            className="p-3 ck-content"
            style={{
                // backgroundColor: '#f8f9fa',
                // border: '1px solid #ddd',
                borderRadius: '6px',
                minHeight: '150px'
            }}
            dangerouslySetInnerHTML={{ __html: formData.description }}
        />


        </div>
      </div>

      {/* B. HISTORY */}
      <div className="card mt-3">
        {/* <div className="card-header text-start">B. HISTORY</div> */}
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Posisi</th>
                <th>Deskripsi</th>
                <th>Oleh</th>
              </tr>
            </thead>
            <tbody>
              {proposal.history && proposal.history.length > 0 ? (
                proposal.history.map((item) => (
                  <tr key={item.id_history}>
                    <td>{item.transdate}</td>
                    <td>{item.status_position}</td>
                    <td>{item.description}</td>
                    <td>{item.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Tidak ada riwayat.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Link */}
      <div style={{ textAlign: 'right', fontStyle: 'italic', fontSize: '12px', marginTop: '30px' }}>
        {formData.source_url}
      </div>
    </div>
  );
};

export default PrintView;
