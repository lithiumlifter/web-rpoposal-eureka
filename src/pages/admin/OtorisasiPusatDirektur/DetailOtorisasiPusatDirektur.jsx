import React, { useEffect, useState,  useRef } from "react";
import { useParams } from "react-router-dom";
import DetailProposal from "../../../services/admin/detailProposalServices";
import CategoryService from "../../../services/admin/categoryServices";
import OtorisasiServices from "../../../services/admin/otorisasiServices";
import { useNavigate } from "react-router-dom";
import allDataProposal from "../../../services/admin/allDataProposal";
import CustomTable from "../../../components/table/customTable";
import ImagePreviewModal from "../../../components/ImagePreviewModal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { showDevelopmentToast, showErrorToast, showSuccessToast } from "../../../utils/toast";
import KaryawanServices from "../../../services/admin/dataKaryawan";

const DetailOtorisasiPusat = () => {
  const navigate = useNavigate();
  const [proposalList, setProposalList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const printRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [karyawanDetail, setKaryawanDetail] = useState(null);
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
  navigate('/admin/otorisasipusat-direktur-all');
};

  useEffect(() => {
    const fetchDataProposal = async () => {
      const response = await allDataProposal.getAllDataProposalPSTDirektur();
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
      navigate(`/admin/detailotorisasipusat-direktur/${nextId}`);
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

  // useEffect(() => {
  //   if (!id_proposal) return;

  //   const fetchDetailProposal = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await DetailProposal.getDetailProposal(id_proposal);
  //       setProposal(data.data);
  //       setFormData(data.data); 
  //     } catch (err) {
  //       setError(err.response?.data || err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDetailProposal();
  // }, [id_proposal]);

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

useEffect(() => {
  if (!id_proposal) return;
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

// const handleDetail = async (pemohon) => {
//   try {
//     const allKaryawan = await KaryawanServices.getKaryawan();
//     const detail = allKaryawan.find(k => k.username === pemohon.username);
//     if (detail) {
//       setKaryawanDetail(detail);
//       setModalOpen(true);
//     } else {
//       alert('Data karyawan tidak ditemukan');
//     }
//   } catch (error) {
//     alert('Gagal mengambil data karyawan', error);
//   }
// };

const handleDetail = async (username) => {
  setModalOpen(true);
  setKaryawanDetail(null);

  try {
    const detail = await KaryawanServices.getKaryawan(username);
    // const detail = allKaryawan.find(k => k.username === pemohon.username);

    if (detail) {
      setKaryawanDetail(detail);
    } else {
      setKaryawanDetail(false);
    }
  } catch (error) {
    setKaryawanDetail(false);
    console.error('Gagal ambil data karyawan', error);
  }
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
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
      await fetchDetailProposal();
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
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
      await fetchDetailProposal();
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
  style: {
    textAlign: "left"
  }
},  
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
          <div className="text-center fs-5 fw-semibold">
            {proposal.bisnis_unit && (
              <span className="badge bg-info fs-5 px-3 py-2">
                {getBuName(proposal.bisnis_unit)}
              </span>
            )}
          </div>
          <div className="text-center fs-5 fw-semibold">
              <span className="badge bg-dark fs-5 px-3 py-2">
                 Nomor Reg : {proposal.id_proposal}
              </span>
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

    <div className="row g-3">
        <div className="col-md-6">
          <textarea
            className="form-control"
            rows={7}
            placeholder="Isi Rekomendasi Anda Disini."
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />

            <div className="mt-4">
              {/* Baris 1 */}
              <div className="d-flex gap-2 flex-wrap mb-2">
                <button
                  className="btn btn-success text-white"
                  onClick={() => handleSubmit('Approve')}
                >
                  <i className="fas fa-check-circle me-1"></i> Setuju
                </button>

                <button
                  className="btn btn-warning text-white"
                  onClick={() => handleSubmit('Pending')}
                >
                  <i className="fas fa-exclamation-circle me-1"></i> Pending
                </button>

                <button
                  className="btn btn-danger text-white"
                  onClick={() => handleSubmit('Cancel')}
                >
                  <i className="fas fa-times-circle me-1"></i> Tidak Setuju
                </button>
              </div>

              {/* Baris 2 */}
              <div className="d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-success text-white"
                  onClick={() => goToPrevNextProposal('prev')}
                  disabled={proposalList.indexOf(Number(id_proposal)) <= 0}
                >
                  « Sebelumnya
                </button>

                <button
                  className="btn btn-info text-white"
                  onClick={() => setShowCloseModal(true)}
                >
                  Tutup
                </button>

                <button
                  className="btn btn-warning text-white"
                  onClick={() => goToPrevNextProposal('next')}
                  disabled={proposalList.indexOf(Number(id_proposal)) >= proposalList.length - 1}
                >
                  Selanjutnya »
                </button>
              </div>
          </div>
        </div>
        <div className="col-md-6">
          {/* <h6 className="mb-1">Penanggung Jawab Pelanggan</h6> */}
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
                  <td>
                    {proposal.pemohon.name}
                    <button
                      onClick={() => handleDetail(proposal.pemohon.username)}
                      style={{
                        marginLeft: '10px',
                        padding: '2px 6px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Detail
                    </button>
                  </td>
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
          <div className="table-responsive">
            <table className="table table-sm">
              <thead className="table-success text-white bg-success">
                <tr>
                    <th style={{ width: "25%" }}>Date</th>
                    <th style={{ width: "20%" }}>Position</th>
                    <th style={{ width: "40%" }}>Description</th>
                    <th style={{ width: "15%" }}>BY</th>
                </tr>
              </thead>
              <tbody>
                {proposal.history?.map((item) => {
                  const matchingOtoritas = proposal.otoritas?.find(
                    (o) => o.emplid === item.username && o.status === item.status
                  );

                  const comment = matchingOtoritas?.keterangan;

                  let labelColor = "black";
                  let labelText = `[${item.status}]`;

                  if (item.status === "Approve") {
                    labelColor = "green";
                    labelText = "[Saya Setuju]";
                  } else if (item.status === "Pending") {
                    labelColor = "orange";
                    labelText = "[Pending]";
                  } else if (item.status === "Close") {
                    labelColor = "red";
                    labelText = "[Close]";
                  }

                  return (
                    <tr key={item.id_history}>
                      <td>{item.transdate}</td>
                      <td>{item.status_position}</td>
                      <td>
                        {(comment || item.status) ? (
                          <div>
                            <span style={{ color: labelColor }}>{labelText}</span>
                            {comment && (
                              <span style={{ marginLeft: "8px", fontWeight: "bold", color: "#444" }}>
                                - {comment}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span>{item.description ? item.description.toUpperCase() : "-"}</span>
                        )}
                      </td>
                      <td>{item.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
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
                        <td>
                          {proposal.pemohon.name}
                          <button
                            onClick={() => handleDetail(proposal.pemohon.username)}
                            style={{
                              marginLeft: '10px',
                              padding: '2px 6px',
                              fontSize: '12px',
                              cursor: 'pointer',
                            }}
                          >
                            Detail
                          </button>
                        </td>
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
        // message={`Apakah kamu yakin ingin mengirim status: "${statusToSubmit}"?`}
         message={
          <>
            Apakah Anda yakin ingin mengubah status otorisasi menjadi
            <strong> {statusToSubmit}</strong>?
          </>
        }
        confirmText="Iya"
        cancelText="Batal"
        theme="danger"
      />

      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px 30px',
            width: '95%',
            maxWidth: '1100px',
            borderRadius: '10px',
            maxHeight: '95vh',
            overflowY: 'auto',
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '14px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Employee Identity</h2>

            {karyawanDetail === null ? (
              // SKELETON LOADER
              <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                <div style={{ width: '120px', height: '160px', backgroundColor: '#ddd', borderRadius: '6px' }} />
                <div style={{ flex: 1 }}>
                  {[...Array(7)].map((_, i) => (
                    <div key={i} style={{ height: '16px', backgroundColor: '#eee', marginBottom: '10px', borderRadius: '4px', width: i % 2 === 0 ? '80%' : '60%' }} />
                  ))}
                </div>
                <div style={{ flex: 1 }}>
                  {[...Array(7)].map((_, i) => (
                    <div key={i} style={{ height: '16px', backgroundColor: '#eee', marginBottom: '10px', borderRadius: '4px', width: i % 2 === 0 ? '85%' : '55%' }} />
                  ))}
                </div>
              </div>
            ) : karyawanDetail === false ? (
              // JIKA TIDAK DITEMUKAN
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#777', fontSize: '16px' }}>
                Data karyawan tidak tersedia.
              </div>
            ) : (
              // JIKA DATA ADA
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                    {/* Kolom 1: Foto */}
                    <div style={{ flex: '0 0 150px', textAlign: 'center' }}>
                      {karyawanDetail.photo ? (
                        <img
                          src={`https://api.dashboard.eurekagroup.id/employee/view/${karyawanDetail.photo}`}
                          crossOrigin="anonymous"
                          alt="Employee"
                          style={{ width: '120px', height: '160px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                      ) : (
                        <div style={{ width: '120px', height: '160px', backgroundColor: '#ccc', borderRadius: '6px' }} />
                      )}
                    </div>

                    {/* Kolom 2 */}
                    <div style={{ flex: 1 }}>
                      <table style={{ width: '100%', borderSpacing: '0 6px' }}>
                        <tbody>
                          <tr><td>Full Name</td><td>:</td><td>{karyawanDetail.full_name}</td></tr>
                          <tr><td>NIK</td><td>:</td><td>{karyawanDetail.emp_id}</td></tr>
                          <tr>
                            <td>Date of Birth</td><td>:</td>
                            <td>{new Date(karyawanDetail.birth_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                          </tr>
                          <tr><td>Religion</td><td>:</td><td>{karyawanDetail.religion}</td></tr>
                          <tr><td>Education</td><td>:</td><td>{karyawanDetail.education}</td></tr>
                          <tr><td>Collage</td><td>:</td><td>{karyawanDetail.collage}</td></tr>
                          <tr><td>BPJS TK</td><td>:</td><td>{karyawanDetail.bpjs_tk?.low || '-'}</td></tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Kolom 3 */}
                    <div style={{ flex: 1 }}>
                      <table style={{ width: '100%', borderSpacing: '0 6px', marginLeft: '80px' }}>
                        <tbody>
                          <tr><td>Email</td><td>:</td><td>{karyawanDetail.email || '-'}</td></tr>
                          <tr><td>Marital Status</td><td>:</td><td>{karyawanDetail.marital_status}</td></tr>
                          <tr><td>Phone</td><td>:</td><td>{karyawanDetail.no_telp}</td></tr>
                          <tr><td>Address</td><td>:</td><td>{karyawanDetail.address || '-'}</td></tr>
                          <tr><td>Major</td><td>:</td><td>{karyawanDetail.education_major}</td></tr>
                          <tr><td>Tax Category</td><td>:</td><td>{karyawanDetail.tax_category}</td></tr>
                          <tr><td>BPJS Kesehatan</td><td>:</td><td>{karyawanDetail.bpjs_kes?.low || '-'}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <h2 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: 600 }}>Employee</h2>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td>Department</td><td>:</td><td>{karyawanDetail.id_department?.department_name || '-'}</td>
                      <td>Hire Date</td><td>:</td>
                      <td>{new Date(karyawanDetail.hire_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                    </tr>
                    <tr>
                      <td>Business Unit</td><td>:</td><td>{karyawanDetail.id_bu?.bu_name || '-'}</td>
                      <td>Employee Status</td><td>:</td><td>{karyawanDetail.employee_status}</td>
                    </tr>
                    <tr>
                      <td>Grade</td><td>:</td><td>{karyawanDetail.grade || '-'}</td>
                      <td>Active/Inactive</td><td>:</td><td>{karyawanDetail.is_active}</td>
                    </tr>
                    <tr>
                      <td>Points</td><td>:</td><td>{karyawanDetail.points}</td>
                      <td>PPH21</td><td>:</td><td>{karyawanDetail.pph21}</td>
                    </tr>
                    <tr>
                      <td>Date Added</td><td>:</td>
                      <td>{new Date(karyawanDetail.date_added).toLocaleDateString('id-ID')}</td>
                      <td>Date Modified</td><td>:</td>
                      <td>{new Date(karyawanDetail.date_modified).toLocaleDateString('id-ID')}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}

            <div style={{ textAlign: 'right', marginTop: '30px' }}>
              <button onClick={() => setModalOpen(false)} style={{
                padding: '8px 16px',
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailOtorisasiPusat;

