import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailProposal from "../../services/admin/detailProposalServices";
import CategoryService from "../../services/admin/categoryServices";
import { useNavigate } from "react-router-dom";
import allDataProposal from "../../services/admin/allDataProposal";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomTable from "../../components/table/customTable";


const DetailProposalCabang = () => {
  
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState(null);
  // const [isEditingBiayaLain, setIsEditingBiayaLain] = useState(false);
  const [editedBiayaLain, setEditedBiayaLain] = useState(null);
  const [addedOtorisasi, setAddedOtorisasi] = useState([]);
  const [selectedOtorisasi, setSelectedOtorisasi] = useState("");
  const [catatan, setCatatan] = useState('');

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
    if (!id_proposal) return;

    const fetchDetailProposal = async () => {
      if (!id_proposal || categories.dataOtorisasi.length === 0) return;
      try {
        setLoading(true);
        const data = await DetailProposal.getDetailProposal(id_proposal);
        console.log("DATA DETAIL PROPOSAL:", data);
        setProposal(data.data);
        if (categories.dataOtorisasi.length > 0) {
          setAddedOtorisasi(
            data.data.otoritas?.map((item) => {
              const match = categories.dataOtorisasi.find((otor) =>
                otor.name.startsWith(item.id_level + " :")
              );
              return match?.value ?? null;
            }).filter(Boolean) || []
          );
        }
        
        setFormData(data.data); // Set nilai awal form
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailProposal();
  }, [id_proposal,categories.dataOtorisasi]);

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
    setFormData({ ...formData, [name]: value });
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
        bisnis_unit: formData.bisnis_unit,
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
  <button
    type="button"
    className="btn btn-danger"
    onClick={() => navigate(-1)}
  >
    Tutup Jendela
  </button>
</div>

    <div className="mb-3 text-end">
    </div>
    <form id="validationform" data-parsley-validate noValidate>
      <div className="card">
            <div className="card-header text-start">Detail Proposal</div>
            
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

                  {/* BU */}
                  <div className="form-group row">
                    <label className="col-12 col-sm-3 col-form-label text-left">BU:</label>
                    <div className="col-12 col-sm-8 col-lg-8">
                      <select
                        className="form-control"
                        name="bisnis_unit"
                        value={formData.bisnis_unit || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                      >
                        <option value="">Pilih BU</option>
                        {categories.bisnisUnit.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name} - {item.wilayah}
                          </option>
                        ))}
                      </select>
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

        {/* Tombol Edit / Simpan */}
        <div className="form-group row mt-3">
                  <div className="col-12 text-center">
                    {isEditing ? (
                      <>
                      <button
                        type="button"
                        className="btn btn-success me-2"
                        onClick={handleSubmitForm}
                      >
                        Simpan
                      </button>

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            setFormData(originalData); // Reset form
                            setIsEditing(false); // Kembali ke mode view
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
                          setOriginalData(formData); // Simpan data awal sebelum edit
                          setIsEditing(true); // Aktifkan mode edit
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>

        {/* G. LAMPIRAN */}
        <div className="card mt-3">
        <div className="card-header text-start">G. LAMPIRAN</div>
        <div className="card-body">
            {proposal.images && proposal.images.length > 0 ? (
            <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem' }}>
                {proposal.images.map((image) => {
                const fileName = image.link.split("/").pop();
                return (
                    <div key={image.id_image} style={{ minWidth: '200px', flex: '0 0 auto' }}>
                    <a href={image.link} target="_blank" rel="noopener noreferrer">
                        <img
                        src={image.link}
                        alt={fileName}
                        style={{
                            width: '100%',
                            height: '150px',
                            objectFit: 'contain',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '5px',
                            backgroundColor: '#f9f9f9'
                        }}
                        />
                    </a>
                    </div>
                );
                })}
            </div>
            ) : (
            <p>Tidak ada lampiran.</p>
            )}
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

export default DetailProposalCabang;