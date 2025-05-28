import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailProposal from "../../services/admin/detailProposalServices";
import CategoryService from "../../services/admin/categoryServices";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/table/customTable";
import ImagePreviewModal from "../../components/ImagePreviewModal";

const DetailProposalReport = () => {
const navigate = useNavigate();
const handlePrint = () => {
  const printWindow = window.open('/printview', '_blank');
  if (printWindow) {
    localStorage.setItem('printData', JSON.stringify({ proposal, formData }));
  }
};

  const [categories, setCategories] = useState({
    bisnisUnit: [],
    ruangLingkup: [],
    dataKategori: [],
    dataTipe: [],
    dataOtorisasi: [],
  });

  const { id_proposal } = useParams();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

const openModal = (index) => {
  setActiveIndex(index);
  setIsModalOpen(true);
};
const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!id_proposal) return;

    const fetchDetailProposal = async () => {
      try {
        setLoading(true);
        const data = await DetailProposal.getDetailProposal(id_proposal);
        setProposal(data.data);
        setFormData(data.data);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailProposal();
  }, [id_proposal]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!proposal) return <p>Data tidak ditemukan</p>;

  // Handler untuk mengubah nilai input saat mode edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // DataTable columns untuk History
  const historyColumns = [
    { name: "Date", selector: (row) => row.transdate, sortable: true },
    { name: "Position", selector: (row) => row.status_position, sortable: true },
    // {
    //   name: "Description",
    //   cell: (row) => {
    //     const isDirut = row.status_position === "Dirut";
    
    //     const matchingOtoritas = proposal?.otoritas?.find(
    //       (o) => o.emplid === row.username && o.status === row.status
    //     );
    
    //     const comment = matchingOtoritas?.keterangan;
    
    //     if (isDirut) {
    //       let labelColor = "black";
    //       let labelText = `[${row.status}]`;
    
    //       if (row.status === "Approve") {
    //         labelColor = "green";
    //         labelText = "[Saya Setuju]";
    //       } else if (row.status === "Pending") {
    //         labelColor = "orange";
    //         labelText = "[Pending]";
    //       } else if (row.status === "Close") {
    //         labelColor = "red";
    //         labelText = "[Close]";
    //       }
    
    //       return (
    //         <div>
    //           <span style={{ color: labelColor }}>{labelText}</span>
    //           {comment && (
    //             <span style={{ marginLeft: "8px", fontWeight: "bold", color: "#444" }}>
    //               - {comment}
    //             </span>
    //           )}
    //         </div>
    //       );
    //     }
    
    //     return (
    //       <span style={{ fontWeight: "" }}>
    //         {row.description ? row.description.toUpperCase() : "-"}
    //       </span>
    //     );
    //   },
    //   sortable: false,
    // },  
    {
  name: "Description",
  cell: (row) => {
    const matchingOtoritas = proposal?.otoritas?.find(
      (o) => o.emplid === row.username && o.status === row.status
    );

    const comment = matchingOtoritas?.keterangan;

    let labelColor = "black";
    let labelText = `[${row.status}]`;

    if (row.status === "Approve") {
      labelColor = "green";
      labelText = "[Saya Setuju]";
    } else if (row.status === "Pending") {
      labelColor = "orange";
      labelText = "[Pending]";
    } else if (row.status === "Close") {
      labelColor = "red";
      labelText = "[Close]";
    }

    if (row.status || comment) {
      return (
        <div>
          <span style={{ color: labelColor }}>{labelText}</span>
          {comment && (
            <span style={{ marginLeft: "8px", fontWeight: "bold", color: "#444" }}>
              - {comment}
            </span>
          )}
        </div>
      );
    }

    // fallback jika tidak ada status atau komentar
    return (
      <span style={{ fontWeight: "" }}>
        {row.description ? row.description.toUpperCase() : "-"}
      </span>
    );
  },
  sortable: false,
},  
    { name: "BY", selector: (row) => row.name, sortable: true },
  ];
  
  // DataTable columns untuk Otoritor
  const otoritasColumns = [
    { name: "Urutan No. Level", selector: (row) => row.urutan, sortable: true },
    { name: "EMPLID", selector: (row) => `${row.emplid} ${row.name}`, sortable: true },
    { name: "Otorisasi", selector: (row) => row.status, sortable: true },
  ];

  return (
    <>
    <div className="mb-3 text-end">
    </div>
      <div id="print-section">
      <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>Detail Proposal</div>
              <div>
                <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={() => navigate(-1)}
                >
                  Tutup Jendela
                </button>
                <button onClick={handlePrint} className="btn btn-warning">
                   <i className="fas fa-print"></i> Print
                </button>
              </div>
            </div>
            <div className="card-body">
              <form id="validationform" data-parsley-validate noValidate>
                {/* Tanggal Proposal */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Tanggal Proposal:</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="text"
                      name="tgl_proposal"
                      className="form-control"
                      value={formData.tgl_proposal}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Proposal ID */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Proposal ID:</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="text"
                      name="kode_proposal"
                      className="form-control"
                      value={formData.kode_proposal}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Ruang Lingkup */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Ruang Lingkup:</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="text"
                      name="ruang_lingkup"
                      className="form-control"
                      value={formData.ruang_lingkup}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                    <label className="col-12 col-sm-3 col-form-label text-left">BU Name:</label>
                    <div className="col-12 col-sm-8 col-lg-8">
                      <select
                        className="form-control"
                        value={formData.bisnis_unit}
                        disabled
                      >
                        {categories.bisnisUnit.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-12 col-sm-3 col-form-label text-left">BU Wilayah:</label>
                    <div className="col-12 col-sm-8 col-lg-8">
                      <select
                        className="form-control"
                        value={formData.bisnis_unit_branch}
                        disabled
                      >
                        {categories.bisnisUnit
                          .find((item) => item.value === formData.bisnis_unit)
                          ?.branch.map((branch) => (
                            <option key={branch.value} value={branch.value}>
                              {branch.wilayah}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-12 col-sm-3 col-form-label text-left">Ruang Lingkup:</label>
                    <div className="col-12 col-sm-8 col-lg-8">
                      <select className="form-control" disabled={!isEditing}>
                        {categories.ruangLingkup.map((item) => (
                          <option key={item.value} value={item.value}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-12 col-sm-3 col-form-label text-left">Kategori:</label>
                    <div className="col-12 col-sm-8 col-lg-8">
                      <select className="form-control" disabled={!isEditing}>
                        {categories.dataKategori.map((item) => (
                          <option key={item.value} value={item.value}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                {/* Kategori */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Kategori:</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="text"
                      name="kategori"
                      className="form-control"
                      value={formData.kategori}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Bisnis Unit */}
                {/* <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Bisnis Unit:</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="text"
                      name="bisnis_unit"
                      className="form-control"
                      value={formData.bisnis_unit}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div> */}

                {/* Judul Proposal */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Judul Proposal:</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Status:</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="text"
                      name="status"
                      className="form-control"
                      value={formData.status}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Pemohon */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Pemohon:</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="text"
                      name="pemohon"
                      className="form-control"
                      value={formData.pemohon?.name}
                      readOnly
                    />
                  </div>
                </div>

                {/* Tanggal Pengajuan */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Tanggal Pengajuan:</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="text"
                      name="tgl_pengajuan"
                      className="form-control"
                      value={formData.tgl_pengajuan}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Tombol Edit / Simpan */}
                <div className="form-group row mt-3">
                  <div className="col-12 text-center">
                    {/* <button type="button" className="btn btn-primary" onClick={toggleEdit}>
                      {isEditing ? "Simpan" : "Edit"}
                    </button> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card mt-3">
                    <div className="card-header text-start">H. BIAYA LAIN-LAIN</div>
                    <div className="card-body">
                      <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">Biaya lain-lain(rp):</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                          <input
                            type="number"
                            className="form-control"
                            value={formData.biaya_lain}
                            readOnly
                            // onChange={(e) => setCustomNumber(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
          </div>

      {/* F. CATATAN */}
      <div className="card mt-3">
        <div className="card-header text-start">F. CATATAN</div>
        <div className="card-body">
        <div
                className="p-3 ck-content"
                style={{
                  borderRadius: '6px',
                  minHeight: '150px',
                  textAlign: 'left'
                }}
                dangerouslySetInnerHTML={{ __html: formData.description }}
              />
        </div>
      </div>

      {/* G. LAMPIRAN */}
     <div className="card mt-3">
        <div className="card-header text-start">G. LAMPIRAN</div>
        <div className="card-body">
           {proposal.images && proposal.images.length > 0 ? (
              <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem' }}>
                {proposal.images.map((image, index) => {
                  const fileName = image.link.split("/").pop();
                  return (
                    <div key={image.id_image} style={{ minWidth: '200px', flex: '0 0 auto' }}>
                      <img
                        src={image.link}
                        alt={fileName}
                        onClick={() => openModal(index)}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'contain',
                          border: '1px solid #ccc',
                          borderRadius: '8px',
                          padding: '5px',
                          backgroundColor: '#f9f9f9',
                          cursor: 'pointer',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Tidak ada lampiran.</p>
            )}

            <ImagePreviewModal
              isOpen={isModalOpen}
              onClose={closeModal}
              images={proposal.images}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>
        </div>

      {/* B. HISTORY */}
      <div className="card mt-3">
        <div className="card-header text-start">B. HISTORY</div>
        <div className="card-body">
        <CustomTable
          columns={historyColumns}
          data={proposal.history || []}
          loading={loading}
          noHeader
          pagination={false}
        />
        </div>
      </div>

      {/* C. OTORITOR */}
      <div className="card mt-3">
        <div className="card-header text-start">C. OTORITOR</div>
        <div className="card-body">
        <CustomTable
          columns={otoritasColumns}
          data={proposal.otoritas || []}
          loading={loading}
          noHeader
          pagination={false}
        />
        </div>
      </div>
      </div>
    </>
  );
};

export default DetailProposalReport;