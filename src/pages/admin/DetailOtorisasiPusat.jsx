import React, { useEffect, useState,  useRef } from "react";
import { useParams } from "react-router-dom";
import DetailProposal from "../../services/admin/detailProposalServices";
import CategoryService from "../../services/admin/categoryServices";
import OtorisasiServices from "../../services/admin/otorisasiServices";
import { useNavigate } from "react-router-dom";
import allDataProposal from "../../services/admin/allDataProposal";
import CustomTable from "../../components/table/customTable";
import ImagePreviewModal from "../../components/ImagePreviewModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import { showDevelopmentToast, showErrorToast, showSuccessToast } from "../../utils/toast";

const DetailOtorisasiPusat = () => {
  const navigate = useNavigate();
  const [proposalList, setProposalList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const printRef = useRef();
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
  const [keterangan, setKeterangan] = useState('');
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [statusToSubmit, setStatusToSubmit] = useState('');


const handleConfirmClose = () => {
  navigate('/admin/otorisasi-pusat');
};

  useEffect(() => {
    const fetchDataProposal = async () => {
      const response = await allDataProposal.getAllDataProposalPST();
      if (response && response.success) {
        const ids = response.data.data.map(item => item.id);
        console.log("ID proposal PST:", ids);
        setProposalList(ids);
      }
      setLoading(false);
    };
  
    fetchDataProposal();
  }, []);  

  // fungsi navigasi proposal
  const goToPrevNextProposal = (direction) => {
    const currentIndex = proposalList.indexOf(Number(id_proposal));
    if (currentIndex === -1) return;
  
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
  
    if (newIndex >= 0 && newIndex < proposalList.length) {
      const nextId = proposalList[newIndex];
      navigate(`/admin/detailotorisasipusat/${nextId}`);
    }
  };
  
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

  const getBuName = (value) => {
    const found = categories.bisnisUnit.find((unit) => unit.value === value);
    return found ? found.name : `BU ${value}`;
  };

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
//  MODAL PREVIEW IMAGE
  const openModal = (index) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // handle otorisasi
  const handleSubmit = async (statusValue) => {
    setStatusToSubmit(statusValue);
    setShowConfirmationModal(true);
};

const handleConfirmSubmit = async () => {
  const role = localStorage.getItem("role");
  console.log("Role Pengguna:", role);

  if (role === "admin") {
    const idOtorisasiList = proposal.otoritas.map(item => item.id_otorisasi);
    console.log("ID Otorisasi untuk Admin:", idOtorisasiList);

    let hasError = false;

    for (const idOtorisasi of idOtorisasiList) {
      const bodyRequest = {
        id_proposal: proposal.id_proposal,
        id_otorisasi: idOtorisasi,
        keterangan: keterangan,
        status: statusToSubmit,
      };

      try {
        const result = await OtorisasiServices.otorisasiProposal(bodyRequest);
        console.log(`Sukses kirim untuk ID Otorisasi ${idOtorisasi}:`, result);
      } catch (error) {
        hasError = true;
        console.error(`Gagal kirim untuk ID Otorisasi ${idOtorisasi}:`, error);
      }
    }

    if (hasError) {
      showErrorToast("Sebagian proses gagal dikirim 😢");
    } else {
      showSuccessToast("Semua proses berhasil dikirim! 🎉");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
    
    setShowConfirmationModal(false);
  } else {
    const bodyRequest = {
      id_proposal: proposal.id_proposal,
      keterangan: keterangan,
      status: statusToSubmit,
    };

    try {
      const result = await OtorisasiServices.otorisasiProposal(bodyRequest);
      console.log('Sukses:', result);
      showSuccessToast("Proses berhasil dikirim! 🎉");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      setShowConfirmationModal(false);
    } catch (error) {
      console.error('Gagal:', error);
      showErrorToast("Gagal mengirim proses 😢");
      setShowConfirmationModal(false);
    }
  }
};

  const historyColumns = [
    { name: "Date", selector: (row) => row.transdate, sortable: true },
    { name: "Position", selector: (row) => row.status_position, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    { name: "BY", selector: (row) => row.name, sortable: true },
  ];

  const otoritasColumns = [
    { name: "Urutan No. Level", selector: (row) => row.urutan, sortable: true },
    { name: "EMPLID", selector: (row) => `${row.emplid} ${row.name}`, sortable: true },
    { name: "Otorisasi", selector: (row) => row.status, sortable: true },
  ];
  return (
    <>
    <div className="py-4 font-sans">
    <h2
        className="h5 fw-semibold mb-4"
        style={{
          textTransform: 'uppercase',
          fontSize: '32px', 
        }}
      >
        {proposal.title}
    </h2>
    <div className="d-flex justify-content-between mb-4">
      <button
        className="btn btn-primary"
        onClick={() => showDevelopmentToast('Sedang dalam pengembangan')}
      >
        Info ARC
      </button>
        {/* Bisnis Unit di tengah */}
        <div className="text-center">
          Bisnis unit:{" "}
          {proposal.bisnis_unit && (
            <span className="badge bg-info">
              {getBuName(proposal.bisnis_unit)}
            </span>
          )}
        </div>
          <div className="btn-group">
            <button 
              className="btn btn-warning" 
              onClick={() => goToPrevNextProposal('prev')}
              disabled={proposalList.indexOf(Number(id_proposal)) <= 0}
            >
              « Sebelumnya ID: {proposalList[proposalList.indexOf(Number(id_proposal)) - 1] || "-"}
            </button>
            <button
                className="btn btn-danger"
                onClick={() => setShowCloseModal(true)}
              >
                Tutup jendela ini
              </button>
            <button 
              className="btn btn-warning" 
              onClick={() => goToPrevNextProposal('next')}
              disabled={proposalList.indexOf(Number(id_proposal)) >= proposalList.length - 1}
            >
              Selanjutnya ID: {proposalList[proposalList.indexOf(Number(id_proposal)) + 1] || "-"} »
            </button>
          </div>
      </div>

    <h6 className="mb-1">Penanggung Jawab Pelanggan</h6>
    <table className="table table-bordered table-sm mb-4">
        <thead className="table-danger text-center">
        <tr>
            <th>JABATAN</th>
            <th>PIC</th>
            <th>JABATAN</th>
            <th>PIC</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>Nama Pelanggan:</td>
            <td>{proposal.pemohon.name}</td>
            <td>GL:</td>
            <td></td>
        </tr>
        <tr>
            <td>BE:</td>
            <td></td>
            <td>ASM:</td>
            <td></td>
        </tr>
        <tr>
            <td>Salesman:</td>
            <td></td>
            <td>Manager:</td>
            <td></td>
        </tr>
        </tbody>
    </table>
    <div className="row g-3">
        <div className="col-md-6">
          <textarea
            className="form-control"
            rows={7}
            placeholder="Isi Rekomendasi Anda Disini."
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <h5 className="fw-semibold mb-2">Nomor Reg : {proposal.id_proposal}</h5>
          <div className="table-responsive">
            <table className="table table-sm">
              <thead className="table-success text-white bg-success">
                <tr>
                  <th>Date</th>
                  <th>Position</th>
                  <th>Description</th>
                  <th>BY</th>
                </tr>
              </thead>
              <tbody>
                {proposal.history?.map((item) => (
                  <tr key={item.id_history}>
                    <td>{item.transdate}</td>
                    <td>{item.status_position}</td>
                    <td>{item.description}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 d-flex gap-2 flex-wrap">
        <button className="btn btn-success text-white" onClick={() => handleSubmit('Approve')}>
          <i className="fas fa-check-circle"></i> Setuju
        </button>

        <button className="btn btn-warning text-white" onClick={() => handleSubmit('Pending')}>
          <i className="fas fa-exclamation-circle"></i> Pending
        </button>

        <button className="btn btn-danger text-white" onClick={() => handleSubmit('Cancel')}>
          <i className="fas fa-times-circle"></i> Tidak Setuju
        </button>
      </div>
    <div className="row row-cols-2 row-cols-md-6 g-2 mt-4">
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

      {/* Modal Slideshow */}
      <ImagePreviewModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        images={proposal.images}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />

    </div>
    </div>
    {/* <button className="btn btn-warning mt-3 text-white">📽 Slideshow</button> */}
    </div>

    <div className="mt-4">
        <div className="card">
            <div className="card-header fw-bold">I. PENANGGUNG JAWAB PELANGGAN</div>
            <div className="card-body">
            <div className="row">
                {/* Kolom Kiri */}
                <div className="col-md-6">
                <table className="table table-bordered table-sm">
                    <thead className="text-white" style={{backgroundColor: 'green'}}>
                    <tr className="text-center">
                        <th colSpan={2}>Penanggung Jawab Pelanggan</th>
                    </tr>
                    <tr className="text-center">
                        <th>JABATAN</th>
                        <th>PIC</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Nama Pelanggan:</td>
                        <td>{proposal.pemohon.name}</td>
                    </tr>
                    <tr>
                        <td>BE:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Salesman:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>GL:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>ASM:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Manager:</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                </div>
                {/* Kolom Kanan */}
                <div className="col-md-6">
                <table className="table table-bordered table-sm">
                    <thead className="text-white" style={{backgroundColor: 'green'}}>
                    <tr className="text-center">
                        <th colSpan={4}><em>History Level 8357</em></th>
                    </tr>
                    <tr className="text-center">
                        <th>URUTAN</th>
                        <th>LEVEL</th>
                        <th>EMPLID</th>
                        <th>OTORISASI</th>
                    </tr>
                    </thead>
                    <tbody>
                    {proposal.otoritas.map((item) => (
                        <tr className="table-success text-center">
                            <td>{item.urutan}</td>
                            <td>{item.jabatan}</td>
                            <td>{item.emplid + " - " + item.name}</td>
                            <td>
                                <span className={`fw-semibold ${item.status === null ? 'text-danger' : ''}`}>
                                    {item.status === null ? 'Belum Otorisasi' : item.status}
                                </span>
                            </td>
                        </tr>   
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
    </div>
      <div ref={printRef}>
      <div className="card">
            <div className="card-header text-start">Detail Proposal</div>
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

        <div className="d-flex justify-content-center mb-4">
            <div className="btn-group">
              <button 
                className="btn btn-warning" 
                onClick={() => goToPrevNextProposal('prev')}
                disabled={proposalList.indexOf(Number(id_proposal)) <= 0}
              >
                « Sebelumnya ID: {proposalList[proposalList.indexOf(Number(id_proposal)) - 1] || "-"}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowCloseModal(true)}
              >
                Tutup jendela ini
              </button>
              <button 
                className="btn btn-warning" 
                onClick={() => goToPrevNextProposal('next')}
                disabled={proposalList.indexOf(Number(id_proposal)) >= proposalList.length - 1}
              >
                Selanjutnya ID: {proposalList[proposalList.indexOf(Number(id_proposal)) + 1] || "-"} »
              </button>
            </div>
          </div>
      </div>
      <ConfirmationModal
          isOpen={showCloseModal}
          onClose={() => setShowCloseModal(false)}
          onConfirm={handleConfirmClose}
          title="Konfirmasi Penutupan"
          message="Apakah Anda yakin ingin menutup jendela ini?"
          confirmText="Ya, Tutup"
          cancelText="Batal"
          theme="danger"
      />

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmSubmit}
        title="Konfirmasi Proses"
        message={`Apakah kamu yakin ingin mengirim status: "${statusToSubmit}"?`}
        confirmText="Ya, Kirim"
        cancelText="Batal"
        theme="danger"
      />


    </>
  );
};

export default DetailOtorisasiPusat;

