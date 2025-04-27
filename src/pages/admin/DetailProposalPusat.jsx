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

const DetailProposalPusat = () => {
  
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState(null);
  // const [isEditingBiayaLain, setIsEditingBiayaLain] = useState(false);
  const [editedBiayaLain, setEditedBiayaLain] = useState(null);
  const [addedOtorisasi, setAddedOtorisasi] = useState([]);
  const [selectedOtorisasi, setSelectedOtorisasi] = useState("");
  const [catatan, setCatatan] = useState('');
  const [selectedBUName, setSelectedBUName] = useState(null);
  const [selectedBUWilayah, setSelectedBUWilayah] = useState(null);
  const [categories, setCategories] = useState({
    bisnisUnit: [],
    ruangLingkup: [],
    dataKategori: [],
    dataTipe: [],
    dataOtorisasi: [],
  });


  // Process BU names (Unique Names)
  const buNames = useMemo(() => {
    return categories.bisnisUnit.length
      ? [...new Set(categories.bisnisUnit.map(item => item.name))] 
      : [];
  }, [categories.bisnisUnit]);

  const optionsBUName = useMemo(() => {
    return buNames.map(name => ({
      value: name,
      label: name,
    }));
  }, [buNames]);

  const optionsBUWilayah = useMemo(() => {
    return categories.bisnisUnit.length
      ? categories.bisnisUnit
          .filter(item => item.name === selectedBUName)
          .map(item => ({
            value: item.value,
            label: item.wilayah,
          }))
      : [];
  }, [categories.bisnisUnit, selectedBUName]);
  
  
  

    // custom style select search
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
        setSelectedBUName(selectedBU.name); // Set BU Name
        setSelectedBUWilayah(selectedBU.wilayah); // Set BU Wilayah
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
        
        // Set bisnis_unit data (if available) based on the fetched proposal
        const selectedBU = categories.bisnisUnit.find((bu) => bu.value === data.data.bisnis_unit);
        setFormData({
          ...data.data,
          bu_name: selectedBU ? selectedBU.name : "",
          bu_wilayah: selectedBU ? selectedBU.wilayah : "",
        });
  
        // Update selected BU Name and Wilayah based on proposal data
        setSelectedBUName(selectedBU ? selectedBU.name : "");
        setSelectedBUWilayah(selectedBU ? selectedBU.wilayah : "");
  
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDetailProposal();
  }, [id_proposal, categories.dataOtorisasi]);

  const handleAddOtorisasi = () => {
    if (selectedOtorisasi && !addedOtorisasi.includes(selectedOtorisasi)) {
      setAddedOtorisasi([...addedOtorisasi, selectedOtorisasi]);
      setSelectedOtorisasi("");
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!proposal) return <p>Data tidak ditemukan</p>;

  // Handler untuk mengubah nilai input saat mode edit
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
  
  
  

  // Handler untuk tombol Edit/Simpan
  const toggleEdit = () => {
    if (isEditing) {
      // Jika sedang dalam mode edit dan klik Simpan, update data ke state utama
      setProposal(formData);
    } else {
      // saat masuk mode edit, set nilai awal biaya lain-lain
      setEditedBiayaLain(formData.biaya_lain ?? "");
    }
    setIsEditing(!isEditing); // Toggle mode edit
  };
  

  const handleSubmitForm = async () => {
    try {
      const updatedFormData = {
        ...formData,
        bu_name: selectedBUName,
        bu_wilayah: selectedBUWilayah,
      };
      // Persiapan data otorisasi awal (dari proposal sebelumnya)
    const initialOtorisasi = proposal.otoritas?.map((item) => {
      const match = categories.dataOtorisasi.find((otor) =>
        otor.name.startsWith(item.id_level + " :")
      );
      return match?.value ?? null;
    }).filter(Boolean) || [];

    // Cari yang ditambahkan (ada di addedOtorisasi tapi tidak di initial)
    const newlyAdded = addedOtorisasi.filter(x => !initialOtorisasi.includes(x));

    // Cari yang dihapus (ada di initial tapi tidak di addedOtorisasi)
    const removed = initialOtorisasi.filter(x => !addedOtorisasi.includes(x));

    // Tampilkan log perubahan (bisa juga dikirim ke backend kalau perlu)
    console.log("Otorisasi ditambahkan:", newlyAdded);
    console.log("Otorisasi dihapus:", removed);
      setFormData({ ...formData, biaya_lain: editedBiayaLain });
      const payload = {
        id_proposal: proposal.id_proposal,
        bisnis_unit: updatedFormData.bisnis_unit,
        title: formData.title,
        biayalainlain: formData.biaya_lain ?? 0,
        description: catatan ?? "",
        email1: "",
        email2: "",
        email3: "",
        otorisasi: addedOtorisasi,
      };
  
      await allDataProposal.editProposal(payload);
  
      alert("Data berhasil disimpan!");
      setProposal({ ...proposal, ...payload });
      setIsEditing(false);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Gagal menyimpan data.");
    }
  };

    // DataTable columns untuk History
    const historyColumns = [
      { name: "Date", selector: (row) => row.transdate, sortable: true },
      { name: "Position", selector: (row) => row.status_position, sortable: true },
      { name: "Description", selector: (row) => row.description, sortable: true },
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
  value={optionsBUName.find(opt => opt.value === selectedBUName) || null}
  onChange={(selectedOption) => {
    if (isEditing) {
      setSelectedBUName(selectedOption ? selectedOption.value : null);
      setSelectedBUWilayah(null); // Reset wilayah after selecting new BU
    }
  }}
  isDisabled={!isEditing} // Disable if not in edit mode
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
    ? optionsBUWilayah.find(option => option.label === selectedBUWilayah) 
    : null}
  onChange={(selectedOption) => {
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
                        // Cek apakah item ini dari 'addedOtorisasi' (biasanya berupa string value)
                        const isNew = typeof item === 'string' || typeof item === 'number';

                        const label = isNew
                          ? categories.dataOtorisasi.find((cat) => String(cat.value) === String(item))?.name || item
                          : item.name || item.jabatan || 'Tanpa Nama';

                        return (
                          <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>{label}</div>
                            {isEditing && (
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  if (isNew) {
                                    // Hapus dari addedOtorisasi
                                    setAddedOtorisasi(addedOtorisasi.filter((_, i) => i !== index - (proposal?.otoritas?.length || 0)));
                                  } else {
                                    // Hapus dari proposal.otoritas
                                    const updated = [...proposal.otoritas];
                                    updated.splice(index, 1);
                                    setProposal({ ...proposal, otoritas: updated });
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