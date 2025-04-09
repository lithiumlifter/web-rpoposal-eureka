import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import CategoryService from "../../services/admin/categoryServices";
import "../../assets/styles/UploadFile.css";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputProposalServices from "../../services/admin/inputProposalServices";
import "../../assets/styles/LoadingOverlay.css"

const InputProposal = () => {
  const [tanggal_pengajuan, setTanggalPengajuan] = useState(new Date().toISOString().split("T")[0]);
  const [proposaldate, setProposalDate] = useState(new Date().toISOString().split("T")[0]);
  const [proposalid, setProposalId] = useState("");
  const [title, setTitle] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [email3, setEmail3] = useState("");
  const [selectedBisnisUnit, setSelectedBisnisUnit] = useState(null);
  const [selectedRuangLingkup, setSelectedRuangLingkup] = useState(null);
  const [selectedKategori, setSelectedKategori] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });



  const [categories, setCategories] = useState({
    bisnisUnit: [],
    roleUser: [],
    dataWil: [],
    ruangLingkup: [],
    dataKategori: [],
    dataTipe: [],
    dataOtorisasi: [],
  });

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

  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // OTORISASI
  const [selectedOtorisasi, setSelectedOtorisasi] = useState("");
  const [addedOtorisasi, setAddedOtorisasi] = useState([]);

  const handleAddOtorisasi = () => {
    if (selectedOtorisasi && !addedOtorisasi.includes(selectedOtorisasi)) {
      setAddedOtorisasi([...addedOtorisasi, selectedOtorisasi]);
    }
  };

  // custom number
  const [customNumber, setCustomNumber] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // catatan
  const [catatan, setCatatan] = useState("");
  
  // fetch category
  const optionBisnisunit = categories.bisnisUnit.map((item) => ({
    value: item.value,
    label: `${item.name} - ${item.wilayah}`,
  }));

  const optionsRuangLingkup = categories.ruangLingkup.map((item) => ({
    value: item.value,
    label: item.name,
  }));

  const optionsKategori = categories.dataKategori.map((item) => ({
    value: item.value,
    label: item.name,
  }));

  const optionsOtorisasi = categories.dataOtorisasi.map((item) => ({
    value: item.idLevel,
    label: item.name,
  }));

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("tanggal_pengajuan", tanggal_pengajuan);
    formData.append("bisnis_unit", selectedBisnisUnit);
    formData.append("proposalid", proposalid);
    formData.append("ruanglingkup", selectedRuangLingkup);
    formData.append("kategori", selectedKategori);
    formData.append("proposaldate", proposaldate);
    formData.append("title", title);
    formData.append("biayalainlain", selectedType === "9" ? customNumber : 0);
    formData.append("description", catatan);
    formData.append("email1", email1);
    formData.append("email2", email2);
    formData.append("email3", email3);
    formData.append("otorisasi", JSON.stringify(addedOtorisasi.map(Number)));
    // Append file gambar ke FormData
    files.forEach((file) => {
      formData.append("images", file);
    });
  
    for (let pair of formData.entries()) {
      console.log("ISI:", pair[0] + ": " + pair[1]);
    }
  
    try {
      const response = await InputProposalServices.submitProposal(formData);
      console.log("ISI FORM DATA:", [...formData.entries()]);
      // alert("Proposal berhasil dikirim!");

    // Delay biar alert sempat tampil
    setTimeout(() => {
      window.location.reload(); // refresh halaman
    }, 1000);

      // Tampilkan alert success
      setAlert({ show: true, type: "success", message: "Proposal berhasil dikirim!" });
      console.log(response);
    } catch (error) {
      setAlert({
        show: true,
        type: "danger",
        message: `Gagal mengirim proposal: ${error.response?.data?.message || error.message}`,
      });
      console.error("Error submitting proposal:", error.response?.data || error.message);
      console.log("Full error object:", error);
      // alert(`Gagal mengirim proposal: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
    
  };
  
  return (
    <>
    {alert.show && (
      <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        {alert.message}
        <button type="button" className="btn-close" onClick={() => setAlert({ show: false, type: '', message: '' })}></button>
      </div>
    )}

     <form onSubmit={handleSubmit}>
        {/* MASTER */}
        <div className="card">
          <div className="card-header text-start">Master</div>
          <div className="card-body">
            {/* Tanggal */}
            <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-left">
                  Tanggal:
                </label>
                <div className="col-12 col-sm-8 col-lg-8">
                <input
                    type="date"
                    required
                    className="form-control"
                    onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                    value={tanggal_pengajuan} 
                    onChange={(e) => setTanggalPengajuan(e.target.value)}
                />

                </div>
              </div>

              {/* Proposal ID */}
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-left">
                  Proposal ID:
                </label>
                <div className="col-12 col-sm-8 col-lg-8">
                  <input
                    type="text"
                    required
                    placeholder="Nomor Surat Proposal cabang/Pusat"
                    className="form-control"
                    value={proposalid}
                    onChange={(e) => setProposalId(e.target.value)}
                  />
                </div>
              </div>

              {/* BU */}
            <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-left">
                  BU:
                </label>
                <div className="col-12 col-sm-8 col-lg-8">
                <Select
                  options={optionBisnisunit}
                  placeholder="Pilih BU"
                  className="basic-single"
                  classNamePrefix="select"
                  styles={customStyles}
                  value={optionBisnisunit.find(opt => opt.value === selectedBisnisUnit) || null}
                  onChange={(selectedOption) => setSelectedBisnisUnit(selectedOption ? selectedOption.value : null)}
                />
                </div>
              </div>

              {/* Ruang Lingkup */}
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-left">
                  Ruang Lingkup:
                </label>
                <div className="col-12 col-sm-8 col-lg-8">
                <Select
                    options={optionsRuangLingkup}
                    placeholder="Pilih Ruang Lingkup"
                    className="basic-single"
                    classNamePrefix="select"
                    styles={customStyles}
                    value={optionsRuangLingkup.find(opt => opt.value === selectedRuangLingkup) || null}
                    onChange={(selectedOption) => setSelectedRuangLingkup(selectedOption ? selectedOption.value : null)}
                  />
                </div>
              </div>

              {/* Kategori */}
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-left">
                  Kategori:
                </label>
                <div className="col-12 col-sm-8 col-lg-8">
                <Select
                  options={optionsKategori}
                  placeholder="Pilih Kategori"
                  className="basic-single"
                  classNamePrefix="select"
                  styles={customStyles}
                  value={optionsKategori.find(opt => opt.value === selectedKategori) || null}
                  onChange={(selectedOption) => setSelectedKategori(selectedOption ? selectedOption.value : null)}
                />
                </div>
              </div>

              {/* Tanggal Proposal */}
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-left">
                  Tanggal Proposal:
                </label>
                <div className="col-12 col-sm-8 col-lg-8">
                <input
                    type="date"
                    required
                    className="form-control"
                    onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                    value={proposaldate}
                    onChange={(e) => setProposalDate(e.target.value)}
                />  
                </div>
              </div>

              {/* Judul Proposal */}
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-left">
                  Judul Proposal:
                </label>
                <div className="col-12 col-sm-8 col-lg-8">
                  <input type="text" 
                      required 
                      className="form-control" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}/>
                </div>
              </div>

              {/* Pemohon */}
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-left">
                  Pemohon:
                </label>
                <div className="col-12 col-sm-8 col-lg-8">
                  <input type="text" className="form-control" value="P1362" readOnly />
                </div>
              </div>

            {/* Type */}
            <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-left">
                  Type:
                </label>
                <div className="col-12 col-sm-8 col-lg-8">
                <select className="form-control" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    {categories.dataTipe.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Otorisasi */}
              <div className="form-group row align-items-center">
                <label className="col-12 col-sm-3 col-form-label text-left">Otorisasi:</label>
                <div className="col-12 col-sm-6 col-lg-8">
                  <div className="input-group">
                  <Select
                    options={optionsOtorisasi}
                    placeholder="Pilih Otorisasi"
                    className="basic-single flex-grow-1"
                    classNamePrefix="select"
                    styles={customStyles}
                    // value={optionsOtorisasi.find((opt) => opt.label === selectedOtorisasi) || null}
                    value={optionsOtorisasi.find((opt) => opt.value === selectedOtorisasi) || null}
                    onChange={(selectedOption) => setSelectedOtorisasi(selectedOption ? selectedOption.value : "")}
                  />
                    <button type="button" className="btn btn-primary" onClick={handleAddOtorisasi}>
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* List Otorisasi yang ditambahkan */}
              {addedOtorisasi.length > 0 && (
                <div className="form-group row mt-1 align-items-center">
                  <div className="col-12 col-sm-6 col-lg-8 offset-sm-3">
                    <ul className="list-group">
                      {addedOtorisasi.map((item, index) => {
                        const label = optionsOtorisasi.find((opt) => opt.value === item)?.label || item;
                        return (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {label}
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => setAddedOtorisasi(addedOtorisasi.filter((_, i) => i !== index))}
                            >
                              Remove
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
          </div>
        </div>
        
        {/* Inputan Angka jika Type = 99.Lain-lain */}
        {selectedType === "9" && (
                <>
                <div className="card mt-3">
                  <div className="card-header text-start">H. LAIN-LAIN</div>
                  <div className="card-body">
                    <div className="form-group row">
                      <label className="col-12 col-sm-3 col-form-label text-left">Biaya lain-lain:</label>
                      <div className="col-12 col-sm-8 col-lg-8">
                        <input
                          type="number"
                          className="form-control"
                          value={customNumber}
                          onChange={(e) => setCustomNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mt-3">
                  <div className="card-header text-start">F. CATATAN</div>
                  <div className="card-body">
                    <div className="form-group row">
                      <label className="col-12 col-sm-3 col-form-label text-left">Masukkan Catatan:</label>
                      <div className="col-12 col-sm-8 col-lg-8">
                        <ReactQuill value={catatan} onChange={setCatatan} />
                      </div>
                    </div>
                  </div>
                </div>
                </>
          )}

          {/* LAMPIRAN */}
        <div className="card">
          <div className="card-header text-start">G. Lampiran</div>
          <div className="card-body">
                {/* Email 1 */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Cc Email to</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="email"
                      required
                      placeholder="Email 1"
                      className="form-control"
                      value={email1}
                      onChange={(e) => setEmail1(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email 2 */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Cc Email to</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="email"
                      required
                      placeholder="Email 2"
                      className="form-control"
                      value={email2}
                      onChange={(e) => setEmail2(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email 3 */}
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Cc Email to</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="email"
                      required
                      placeholder="Email 3"
                      className="form-control"
                      value={email3}
                      onChange={(e) => setEmail3(e.target.value)}
                    />
                  </div>
                </div>

              {/* Drag and Drop File Upload */}
              <div className="form-group row">
                <label className="col-12 col-sm-3 col-form-label text-left">Upload Lampiran:</label>
                <div className="col-12 col-sm-8 col-lg-8">
                  <motion.div
                    className="drop-zone"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <p>Drag & Drop file here or click to select files</p>
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      className="d-none"
                      onChange={handleFileChange}
                    />
                  </motion.div>
                  <ul className="file-list">
                    {files.map((file, index) => (
                      <motion.li key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {file.name}
                        <button type="button" className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveFile(index)}>
                          Remove
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-group row">
                <div className="col-12 col-sm-8 col-lg-8 offset-sm-3">
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Simpan</button>
                </div>
              </div>
          </div>
        </div>
     </form>
     {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default InputProposal;