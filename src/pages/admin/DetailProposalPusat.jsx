import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import DetailProposal from "../../services/admin/detailProposalServices";
import CategoryService from "../../services/admin/categoryServices";
import { useNavigate } from "react-router-dom";
import allDataProposal from "../../services/admin/allDataProposal";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomTable from "../../components/table/customTable";
import ImagePreviewModal from "../../components/ImagePreviewModal";
import Select from "react-select";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const DetailProposalPusat = () => {
  
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState(null);
  const [editedBiayaLain, setEditedBiayaLain] = useState(null);
  const [addedOtorisasi, setAddedOtorisasi] = useState([]);
  const [selectedOtorisasi, setSelectedOtorisasi] = useState("");
  const [catatan, setCatatan] = useState('');
  const [selectedBUName, setSelectedBUName] = useState(null);
  const [selectedBUWilayah, setSelectedBUWilayah] = useState(null);
  const [removedOtorisasi, setRemovedOtorisasi] = useState([]);
  const [categories, setCategories] = useState({
    bisnisUnit: [],
    ruangLingkup: [],
    dataKategori: [],
    dataTipe: [],
    dataOtorisasi: [],
  });

  // const buNames = useMemo(() => {
  //   return categories.bisnisUnit.length
  //     ? [...new Set(categories.bisnisUnit.map(item => item.name))] 
  //     : [];
  // }, [categories.bisnisUnit]);

  const optionsBUName = useMemo(() => {
    return categories.bisnisUnit.map(item => ({
      value: item.value,
      label: item.name,
    }));
  }, [categories.bisnisUnit]);
  

  const optionsBUWilayah = useMemo(() => {
    if (!categories.bisnisUnit.length || !selectedBUName) return [];
  
    const selectedBU = categories.bisnisUnit.find(bu => bu.value === selectedBUName);
    if (!selectedBU || !selectedBU.branch) return [];
  
    return selectedBU.branch.map(branchItem => ({
      value: branchItem.value,
      label: branchItem.name || branchItem.wilayah 
    }));
  }, [categories.bisnisUnit, selectedBUName]);
  
  
  const customStyles = {
    control: (base) => ({
      ...base,
      textAlign: "left",
    }),
    singleValue: (base) => ({
      ...base,
      textAlign: "left",
    }),
    menu: (base) => ({
      ...base,
      textAlign: "left",
    }),
    option: (base) => ({
      ...base,
      textAlign: "left",
    }),
    placeholder: (base) => ({
      ...base,
      textAlign: "left",
      color: "#aaa", // Warna placeholder bisa diubah
    }),
  };
  console.log('selectedBUWilayah:', selectedBUWilayah);
  console.log('optionsBUWilayah:', optionsBUWilayah);
  
  //OPENMODAL IMAGE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const { id_proposal } = useParams();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (formData.description !== undefined) {
      setCatatan(formData.description);
    }
  }, [formData.description]);

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
    if (proposal) {
      const selectedBU = categories.bisnisUnit.find(
        (bu) => bu.value === proposal.bisnis_unit
      );
      if (selectedBU) {
        setSelectedBUName(selectedBU.name);
        setSelectedBUWilayah(selectedBU.wilayah);
      }
    }
  }, [proposal, categories.bisnisUnit]);
  

  useEffect(() => {
    if (!id_proposal) return;
  
    const fetchDetailProposal = async () => {
      if (!id_proposal || categories.dataOtorisasi.length === 0) return;
      try {
        setLoading(true);
        const data = await DetailProposal.getDetailProposal(id_proposal);
        console.log("DATA DETAIL PROPOSAL:", data);
        setProposal(data.data);
  
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDetailProposal();
  }, [id_proposal, categories.dataOtorisasi]);

  useEffect(() => {
    if (proposal && categories.bisnisUnit.length > 0) {
      const selectedBU = categories.bisnisUnit.find(
        bu => bu.value === proposal.bisnis_unit
      );
  
      if (selectedBU) {
        setSelectedBUName(selectedBU.value); // ✅ Ganti dari selectedBU.name
  
        const selectedBranch = selectedBU.branch.find(
          branch => branch.value === proposal.bisnis_unit_branch
        );
  
        if (selectedBranch) {
          setSelectedBUWilayah(selectedBranch.value); // ✅ Ganti dari selectedBU.wilayah
        }
      }
  
      setFormData({
        ...proposal,
        bu_name: selectedBU?.name ?? "",
        bu_wilayah: selectedBU?.wilayah ?? "",
      });
  
      setCatatan(proposal.description ?? "");
    }
  }, [proposal, categories.bisnisUnit]);
  
  const handleAddOtorisasi = () => {
    console.log("Selected Otorisasi (value):", selectedOtorisasi);
  
    const selectedItem = categories.dataOtorisasi.find(
      (item) => String(item.value) === String(selectedOtorisasi)
    );
  
    if (selectedItem) {
      const idLevel = selectedItem.idLevel;
  
  
      if (!addedOtorisasi.some((item) => item.idlevel === idLevel)) {
        console.log("Data yang ditambahkan:", idLevel);
        setAddedOtorisasi([
          ...addedOtorisasi,
          idLevel,
        ]);
      }
      
      setSelectedOtorisasi("");
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!proposal) return <p>Data tidak ditemukan</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "bisnis_unit") {
      const selectedBU = categories.bisnisUnit.find((bu) => bu.value === value);
      setFormData({
        ...formData,
        bisnis_unit: value,
        bu_name: selectedBU ? selectedBU.name : "",
        bu_wilayah: selectedBU ? selectedBU.wilayah : "",
      });
      setSelectedBUName(selectedBU ? selectedBU.name : "");
      setSelectedBUWilayah(selectedBU ? selectedBU.wilayah : "");
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const toggleEdit = () => {
    if (isEditing) {
      setProposal(formData);
    } else {
      setEditedBiayaLain(formData.biaya_lain ?? "");
    }
    setIsEditing(!isEditing);
  };
  
  const handleSubmitForm = async () => {
    try {
      // Ambil id_level otorisasi awal
    const existingOtorisasi = proposal.otoritas?.map(item => item.idlevel) || [];

    // Buat array otorisasi akhir: gabungan yang sudah ada dan ditambahkan, dikurangi yang dihapus
    const finalOtorisasi = [...new Set([...existingOtorisasi, ...addedOtorisasi])]
      .filter(id => !removedOtorisasi.includes(id));


    const initialOtorisasi = proposal.otoritas?.map((item) => item.idlevel) || [];
    const newlyAdded = addedOtorisasi.filter(x => !initialOtorisasi.includes(x));
    const removed = initialOtorisasi.filter(x => !addedOtorisasi.includes(x));

    console.log("Otorisasi ditambahkan:", newlyAdded);
    console.log("Otorisasi dihapus:", removed);
      setFormData({ ...formData, biaya_lain: editedBiayaLain });
      const payload = {
        id_proposal: proposal.id_proposal,
        bisnis_unit: selectedBUName,
        bisnis_unit_branch: selectedBUWilayah,
        title: formData.title,
        biayalainlain: formData.biaya_lain ?? 0,
        description: catatan ?? "",
        email1: "",
        email2: "",
        email3: "",
        otorisasi: finalOtorisasi,
      };
  
      await allDataProposal.editProposal(payload);
  
      showSuccessToast("Data proposal berhasil diubah");
      setProposal({ ...proposal, ...payload });
      setAddedOtorisasi([]);
      setRemovedOtorisasi([]);
      setIsEditing(false);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      showErrorToast("Data proposal gagal diubah")
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
    <div className="mb-3 text-end">
    </div>
    <form id="validationform" data-parsley-validate noValidate>
      <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>Detail Proposal</div>
              <div className="d-flex justify-content-center gap-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => navigate(-1)}
              >
                Tutup Jendela
              </button>

              {isEditing ? (
                <>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSubmitForm}
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setFormData(originalData);
                      setIsEditing(false);
                    }}
                  >
                    Batal
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setOriginalData(formData);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
              )}
            </div>
            </div>
            <div className="card-body">
                {/* Tanggal Proposal */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Tanggal Proposal:</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="text"
                      name="tgl_proposal"
                      className="form-control"
                      value={formData.tgl_proposal}
                      readOnly
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
                      readOnly
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* BU Name */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">
                    BU Name:
                  </label>
                  <div className="col-12 col-sm-8 col-lg-8">
                  <Select
                    options={optionsBUName}
                    placeholder="Pilih Nama BU"
                    className="basic-single"
                    classNamePrefix="select"
                    styles={customStyles}
                    value={selectedBUName ? optionsBUName.find(opt => opt.value === selectedBUName) : null}
                    onChange={(selectedOption) => {
                      console.log("Yang dipilih:", selectedOption);
                      if (isEditing) {
                        const selectedBU = categories.bisnisUnit.find(bu => bu.name === selectedOption?.value);

                        setSelectedBUName(selectedOption ? selectedOption.value : null);
                        
                        // Saat ganti BU Name, reset Wilayah
                        setSelectedBUWilayah(null);
                        
                        // Optional: kalau mau set FormData bisnis_unit kosong, biar nanti user harus pilih ulang wilayah
                        setFormData(prev => ({
                          ...prev,
                          bisnis_unit: "",
                        }));
                      }
                    }}
                    isDisabled={!isEditing}
                  />

                  </div>
                </div>

                {/* BU Wilayah */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">
                    BU Wilayah:
                  </label>
                  <div className="col-12 col-sm-8 col-lg-8">
                  <Select
                    options={optionsBUWilayah}
                    placeholder="Pilih Wilayah BU"
                    className="basic-single"
                    classNamePrefix="select"
                    styles={customStyles}
                    value={selectedBUWilayah 
                      ? optionsBUWilayah.find(option => option.value === selectedBUWilayah) 
                      : null}
                    onChange={(selectedOption) => {
                      console.log("Yang dipilih WILAYAH:", selectedOption);
                      if (isEditing) {
                        setSelectedBUWilayah(selectedOption ? selectedOption.value : null);
                        setFormData(prev => ({
                          ...prev,
                          bisnis_unit: selectedOption ? selectedOption.value : "",
                        }));
                      }
                    }}
                    isDisabled={!selectedBUName || !isEditing}
                  />
                  </div>
                </div>

                  {/* Ruang Lingkup */}
                  <div className="form-group row">
                    <label className="col-12 col-sm-3 col-form-label text-left">Ruang Lingkup:</label>
                    <div className="col-12 col-sm-8 col-lg-8">
                      <select
                        className="form-control"
                        name="ruang_lingkup"
                        value={formData.ruang_lingkup || ""}
                        onChange={handleChange}
                        disabled
                      >
                        <option value="">Pilih Ruang Lingkup</option>
                        {categories.ruangLingkup.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Kategori */}
                  <div className="form-group row">
                    <label className="col-12 col-sm-3 col-form-label text-left">Kategori:</label>
                    <div className="col-12 col-sm-8 col-lg-8">
                      <select
                        className="form-control"
                        name="kategori"
                        value={formData.kategori || ""}
                        onChange={handleChange}
                        disabled
                      >
                        <option value="">Pilih Kategori</option>
                        {categories.dataKategori.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </select>
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
                      readOnly
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Otorisasi */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Otorisasi:</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                  <>
                    <div className="input-group mb-2">
                      <select
                        className="form-control"
                        value={selectedOtorisasi}
                        onChange={(e) => setSelectedOtorisasi(e.target.value)}
                        disabled={!isEditing}
                      >
                        <option value="">Pilih Otorisasi</option>
                        {categories.dataOtorisasi.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {isEditing && (
                        <button type="button" className="btn btn-primary" onClick={handleAddOtorisasi}>
                          Add
                        </button>
                      )}
                    </div>
                    {/* LIST OTORITAS YG ADA */}
                    <div className="list-group">
                      {[...(proposal?.otoritas || []), ...addedOtorisasi].map((item, index) => {
                        const isNew = typeof item === 'string' || typeof item === 'number';

                        const label = isNew
                          ? (() => {
                              const found = categories.dataOtorisasi.find((cat) => String(cat.value) === String(item));
                              return found ? `${found.name}` : item;
                            })()
                          : `${item.idlevel} : ${item.name || item.jabatan || 'Tanpa Nama'}`;


                        return (
                          <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>{label}</div>
                            {isEditing && (
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                    if (isNew) {
                                      setAddedOtorisasi(addedOtorisasi.filter((_, i) => i !== index - (proposal?.otoritas?.length || 0)));
                                    } else {
                                      const otorisasiToRemove = item.idlevel;
                                      const updated = [...proposal.otoritas];
                                      updated.splice(index, 1);
                                      setProposal({ ...proposal, otoritas: updated });
                                      setRemovedOtorisasi((prev) => [...prev, otorisasiToRemove]);
                                    }
                                }}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                  </div>
                </div>
            </div>
          </div>
          {/* BIAYA LAIN-LAIN */}
          <div className="card mt-3">
            <div className="card-header text-start">H. BIAYA LAIN-LAIN</div>
            <div className="card-body">
              <div className="form-group row align-items-center">
                <label className="col-12 col-sm-3 col-form-label text-left">
                  Biaya lain-lain (Rp):
                </label>
                <div className="col-12 col-sm-6 col-lg-6">
                <input
                  type="number"
                  name="biaya_lain"
                  className="form-control"
                  value={formData.biaya_lain ?? ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header text-start">F. CATATAN</div>
            <div className="card-body">
              <div className="form-group row">
                <div className="col-12">
                  {isEditing ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={catatan}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setCatatan(data);
                      }}
                    />
                  ) : (
                    <div
                      className="p-3 ck-content"
                      style={{
                        borderRadius: '6px',
                        minHeight: '150px',
                        textAlign: 'left'
                      }}
                      dangerouslySetInnerHTML={{ __html: formData.description }}
                    />
                  )}
                </div>
              </div>
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
      </form>
    </>
  );
};

export default DetailProposalPusat;