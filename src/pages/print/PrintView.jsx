import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Barcode from 'react-barcode';

const PrintView = () => {
  const { state } = useLocation();
  const { proposal, formData } = state || {};
  const userRole = localStorage.getItem("name");

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
          body, .print-container {
            visibility: visible;
            background-color: #fff !important; /* Pastikan background putih */
          }
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
            background-color: #fff; /* Pastikan putih */
          }
          .print-container .ck-content {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            text-align: left !important;
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

          /* Styling tabel */
          .print-container .ck-content table,
          .print-container .ck-content table * {
            border: 1px solid black !important;
            border-collapse: collapse !important;
          }

          .print-container .ck-content td,
          .print-container .ck-content th {
            padding: 6px 8px !important;
            text-align: left !important;
          }

          .print-container .ck-content th {
            background-color: #b2d8c4 !important;
          }

          .print-container .ck-content tr:nth-child(even) {
            background-color: #e6f4ea !important;
          }
        }
      `}</style>

      {/* === Mulai tampilan cetak mirip screenshot pertama === */}
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ minWidth: '150px' }}>
    {proposal.history?.findLast((item) => item.reg_branch) ? (
      <Barcode
        value={proposal.history.findLast((item) => item.reg_branch)?.reg_branch || 'N/A'}
        height={40}
        width={1.5}
        fontSize={12}
        displayValue={false} // kalau mau HILANGIN teks di bawah barcode
      />
    ) : (
      <p style={{ fontSize: '10px' }}>Barcode tidak tersedia</p>
    )}
  </div>
          <div style={{ fontWeight: 'bold', textAlign: 'center', flexGrow: 1 }}>
            PROPOSAL : {proposal.tipe} ------ Print by : {userRole}
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
              <td>
                    {
                      proposal.history?.findLast((item) => item.reg && item.reg_branch) ? (
                        <>
                          {proposal.history.findLast((item) => item.reg && item.reg_branch).reg_branch}/
                          {proposal.history.findLast((item) => item.reg && item.reg_branch).reg}
                        </>
                      ) : (
                        'Belum tersedia'
                      )
                    } - Tgl : {formData.tgl_proposal}
              </td>
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
      <div className="card mb-4 p-0">
        <div className="card-body p-0">
        <h5 className="card-header mb-3 text-start" style={{backgroundColor: 'white'}}>Biaya: {formData.biaya_lain}</h5>
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
      <div className="card mt-3 p-0">
        <div className="card-body p-0">
        <h1 className="card-header mb-2 text-start"  style={{backgroundColor: 'white',}}>
            Nomor Reg.:{' '}
          {
            proposal.history?.findLast((item) => item.reg && item.reg_branch) ? (
              <>
                {proposal.history.findLast((item) => item.reg && item.reg_branch).reg_branch}/
                {proposal.history.findLast((item) => item.reg && item.reg).reg}
              </>
            ) : (
              'Belum tersedia'
            )
          }
        </h1>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Position</th>
                <th>Description</th>
                <th>By</th>
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
