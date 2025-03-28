import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import CategoryService from "../../services/admin/categoryServices";
import "../../assets/styles/UploadFile.css";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const InputProposal = () => {
  const [tanggal, setTanggal] = useState(new Date().toISOString().split("T")[0]);
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
    value: item.value,
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

  // handle submit


  return (
    <>
    <div className="card">
      <div className="card-header text-start">Master</div>
      <div className="card-body">
        <form id="validationform" data-parsley-validate noValidate>
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
                value={tanggal} 
                onChange={(e) => setTanggal(e.target.value)}
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
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
            />  
            </div>
          </div>

          {/* Judul Proposal */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Judul Proposal:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input type="text" required className="form-control" />
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
                  {addedOtorisasi.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {item}
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => setAddedOtorisasi(addedOtorisasi.filter((_, i) => i !== index))}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tombol Simpan */}
          {/* <div className="form-group row">
            <div className="col-12 col-sm-8 col-lg-6 offset-sm-3">
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </div> */}
        </form>
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

            {/* <div className="card mt-3">
              <div className="card-header text-start">I. ANGGARAN</div>
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Masukkan Angka:</label>
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
            </div> */}
            </>
      )}

    <div className="card">
      <div className="card-header text-start">G. Lampiran</div>
      <div className="card-body">
        <form id="validationform" data-parsley-validate noValidate>
          {/* Email Inputs */}
          {["Email 1", "Email 2", "Email 3"].map((placeholder, index) => (
            <div className="form-group row" key={index}>
              <label className="col-12 col-sm-3 col-form-label text-left">Cc Email to</label>
              <div className="col-12 col-sm-8 col-lg-8">
                <input type="email" required placeholder={placeholder} className="form-control" />
              </div>
            </div>
          ))}

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
              <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default InputProposal;

// import { useEffect, useState } from "react";
// import CategoryService from "../../services/admin/categoryServices";
// import InputProposalServices from "../../services/admin/inputProposalServices";
// import "../../assets/styles/UploadFile.css";

// const InputProposal = () => {
//   const [formData, setFormData] = useState({
//     tanggal_pengajuan: new Date().toISOString().split("T")[0],
//     bisnis_unit: "",
//     proposalid: "",
//     ruanglingkup: "",
//     kategori: "",
//     proposaldate: "2025-03-25",
//     title: "",
//     tipe: "",
//     biayalainlain: 0,
//     description: "",
//     email1: "",
//     email2: "",
//     email3: "",
//     otorisasi: [50009],
//   });

//   const [categories, setCategories] = useState({
//     bisnisUnit: [],
//     ruangLingkup: [],
//     dataKategori: [],
//     dataTipe: [],
//     dataOtorisasi: [],
//   });

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await CategoryService.getCategories();
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddOtorisasi = (e) => {
//     const selectedOtorisasi = e.target.value;
//     if (selectedOtorisasi && !formData.otorisasi.includes(selectedOtorisasi)) {
//       setFormData({
//         ...formData,
//         otorisasi: [...formData.otorisasi, selectedOtorisasi],
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Data yang dikirim:", JSON.stringify(formData, null, 2));
//     try {
//       const response = await InputProposalServices.submitProposal(formData);
//       alert("Proposal berhasil disimpan");
//       console.log("Response:", response);
//     } catch (error) {
//       alert("Gagal menyimpan proposal", error);
//     }
//   };
  

//   return (
//     <div className="card">
//       <div className="card-header text-start">Master</div>
//       <div className="card-body">
//         <form onSubmit={handleSubmit}>
//           {Object.keys(formData).map((key) => (
//             key !== "otorisasi" && (
//               <div className="form-group row" key={key}>
//                 <label className="col-12 col-sm-3 col-form-label text-left">
//                   {key.replace("_", " ")}
//                 </label>
//                 <div className="col-12 col-sm-8 col-lg-8">
//                   <input
//                     type={key.includes("date") ? "date" : "text"}
//                     className="form-control"
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//             )
//           ))}
//           <div className="form-group row">
//             <label className="col-12 col-sm-3 col-form-label text-left">Otorisasi:</label>
//             <div className="col-12 col-sm-8 col-lg-8">
//               <select className="form-control" onChange={handleAddOtorisasi}>
//                 <option value="">Pilih Otorisasi</option>
//                 {categories.dataOtorisasi.map((item) => (
//                   <option key={item.value} value={item.value}>{item.name}</option>
//                 ))}
//               </select>
//               <ul className="list-group mt-2">
//                 {formData.otorisasi.map((item, index) => (
//                   <li key={index} className="list-group-item">
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//           <div className="form-group row">
//             <div className="col-12 col-sm-8 col-lg-6 offset-sm-3">
//               <button type="submit" className="btn btn-primary">Simpan</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InputProposal;
