import React, { useEffect, useState } from 'react';
import Barcode from 'react-barcode';

const PrintView = () => {
  const [proposal, setProposal] = useState(null);
  const [formData, setFormData] = useState(null);
  const userRole = localStorage.getItem("name");
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('printData'));
    if (storedData) {
      setProposal(storedData.proposal);
      setFormData(storedData.formData);
  
      const formatTanggal = (isoDate) => {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        return date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      };
  
      const tanggal = formatTanggal(storedData.formData?.tgl_proposal);
      const historyItem = storedData.proposal?.history?.findLast(item => item.reg_branch);
      const regBranch = historyItem?.reg_branch || '';
  
      document.title = `${tanggal} - ${regBranch}`;
    }
  
    setTimeout(() => window.print(), 500);
  }, []);

  if (!proposal || !formData) return <p>Data tidak tersedia.</p>;

  return (
    <div className="print-container">
      <style>{`
        @media print {
          body, .print-container {
            visibility: visible;
            background-color: #fff !important;
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
            background-color: #fff;
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

      {/* === print === */}
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ minWidth: '150px' }}>
              {proposal.history?.findLast((item) => item.reg_branch) ? (
                <Barcode
                  value={proposal.history.findLast((item) => item.reg_branch)?.reg_branch || 'N/A'}
                  height={70}
                  width={2.5}
                  fontSize={12}
                  displayValue={false}
                />
              ) : (
                <p style={{ fontSize: '10px' }}>Barcode tidak tersedia</p>
              )}
          </div>
          <div style={{ fontWeight: 'bold', textAlign: 'center', flexGrow: 1 }}>
            PROPOSAL : {proposal.tipe} ------ Print by : {userRole}
          </div>
        </div>
        <table style={{ width: '100%', marginTop: '10px', fontSize: '13px', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ width: '15%', verticalAlign: 'top' }}><strong>Perihal:</strong></td>
              <td style={{ width: '60%', whiteSpace: 'normal', wordBreak: 'break-word' }}>{formData.title}</td>
              <td style={{ width: '10%', verticalAlign: 'top' }}></td>
              <td style={{ width: '15%' }}></td>
            </tr>
            <tr>
              <td><strong>Nomor:</strong></td>
              <td>{formData.kode_proposal}</td>
              <td><strong>BU</strong></td>
              {/* <td>{formData.bisnis_unit}</td> */}
              <td>50</td>
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
              <td><strong>BU Name</strong></td>
              <td>Raja Cepat Nusantara</td>
            </tr>
            <tr>
              <td><strong>Lembaga:</strong></td>
              <td>{formData.lembaga}</td>
              <td><strong>BU Wilayah:</strong></td>
              <td>Jakarta</td>
            </tr>
            <tr>
              <td><strong>Kode:</strong></td>
              <td>{formData.kode_mitra}</td>
            </tr>
            <tr>
              <td><strong>Alamat:</strong></td>
              <td>{formData.alamat}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Konten Surat */}
      <div className="card mb-4 p-0">
        <div className="card-body p-0">
        <h5 className="card-header mb-3 text-start" style={{backgroundColor: 'white'}}>
          Biaya: Rp {Number(formData.biaya_lain).toLocaleString('id-ID')}
        </h5>
        <div
            className="p-3 ck-content"
            style={{
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
        <h1 className="card-header mb-2 text-start" style={{ backgroundColor: 'white' }}>
          Nomor Reg.:{' '}
          {
            proposal.history?.findLast((item) => item.reg && item.reg_branch) ? (
              <>
                {
                  proposal.history.findLast((item) => item.reg && item.reg)
                    .reg.replace(/^R-/, '')
                }
              </>
            ) : (
              'Belum tersedia'
            )
          }
        </h1>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>DATE</th>
                <th>POSITION</th>
                <th>DESCRIPTION</th>
                <th>BY</th>
              </tr>
            </thead>
            <tbody>
              {proposal.history && proposal.history.length > 0 ? (
                proposal.history.map((item) => (
                  <tr key={item.id_history}>
                    <td>{item.transdate}</td>
                    <td>{item.status_position}</td>
                    <td>
                      {item.status_position === "Dirut" ? (
                        <>
                          <span
                            style={{
                              color:
                                item.status === "Approve"
                                  ? "green"
                                  : item.status === "Pending"
                                  ? "warning"
                                  : item.status === "Close"
                                  ? "red"
                                  : "black",
                            }}
                          >
                            [{item.status === "Approve"
                              ? "Saya Setuju"
                              : item.status === "Pending"
                              ? "Pending"
                              : item.status === "Close"
                              ? "Close"
                              : item.status}]
                          </span>
                          {proposal?.otoritas?.find(
                            (o) => o.emplid === item.username && o.status === item.status
                          )?.keterangan && (
                            <span style={{ marginLeft: "8px", fontWeight: "bold", color: "#444" }}>
                              - {
                                proposal.otoritas.find(
                                  (o) => o.emplid === item.username && o.status === item.status
                                ).keterangan
                              }
                            </span>
                          )}
                        </>
                      ) : (
                        <span style={{ fontWeight: "" }}>
                          {item.description ? item.description.toUpperCase() : "-"}
                        </span>
                      )}
                    </td>
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
