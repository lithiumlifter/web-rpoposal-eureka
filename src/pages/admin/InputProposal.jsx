// import { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import CategoryService from "../../services/admin/categoryServices";
// import "../../assets/styles/UploadFile.css";
// import Select from "react-select";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import InputProposalServices from "../../services/admin/inputProposalServices";

// const InputProposal = () => {
//   const [tanggal_pengajuan, setTanggalPengajuan] = useState(new Date().toISOString().split("T")[0]);
//   const [proposaldate, setProposalDate] = useState(new Date().toISOString().split("T")[0]);
//   const [categories, setCategories] = useState({
//     bisnisUnit: [],
//     roleUser: [],
//     dataWil: [],
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

//   const [files, setFiles] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const droppedFiles = Array.from(event.dataTransfer.files);
//     setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
//   };

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
//   };

//   const handleRemoveFile = (index) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   // OTORISASI
//   const [selectedOtorisasi, setSelectedOtorisasi] = useState("");
//   const [addedOtorisasi, setAddedOtorisasi] = useState([]);

//   const handleAddOtorisasi = () => {
//     if (selectedOtorisasi && !addedOtorisasi.includes(selectedOtorisasi)) {
//       setAddedOtorisasi([...addedOtorisasi, selectedOtorisasi]);
//     }
//   };

//   // custom number
//   const [customNumber, setCustomNumber] = useState("");
//   const [selectedType, setSelectedType] = useState("");

//   // catatan
//   const [catatan, setCatatan] = useState("");
  
//   // fetch category
//   const optionBisnisunit = categories.bisnisUnit.map((item) => ({
//     value: item.value,
//     label: `${item.name} - ${item.wilayah}`,
//   }));

//   const optionsRuangLingkup = categories.ruangLingkup.map((item) => ({
//     value: item.value,
//     label: item.name,
//   }));

//   const optionsKategori = categories.dataKategori.map((item) => ({
//     value: item.value,
//     label: item.name,
//   }));

//   const optionsOtorisasi = categories.dataOtorisasi.map((item) => ({
//     value: item.value,
//     label: item.name,
//   }));

//   // custom style select search
//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       textAlign: "left",
//     }),
//     singleValue: (base) => ({
//       ...base,
//       textAlign: "left",
//     }),
//     menu: (base) => ({
//       ...base,
//       textAlign: "left",
//     }),
//     option: (base) => ({
//       ...base,
//       textAlign: "left",
//     }),
//     placeholder: (base) => ({
//       ...base,
//       textAlign: "left",
//       color: "#aaa", // Warna placeholder bisa diubah
//     }),
//   };

//   // SUBMIT HANDLE
//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     const proposalData = {
//       tanggal_pengajuan,
//       bisnis_unit: "", // Ambil nilai dari select BU
//       proposalid: "", // Ambil dari input Proposal ID
//       ruanglingkup: "", // Ambil dari select Ruang Lingkup
//       kategori: "", // Ambil dari select Kategori
//       proposaldate,
//       title: "", // Ambil dari input Judul Proposal
//       biayalainlain: selectedType === "9" ? customNumber : 0,
//       description: catatan,
//       email1: "", // Ambil dari input Email 1
//       email2: "", // Ambil dari input Email 2
//       email3: "", // Ambil dari input Email 3
//       otorisasi: addedOtorisasi.map(Number), // Convert ke array angka
//     };
  
//     try {
//       const response = await InputProposalServices.submitProposal(proposalData);
//       alert("Proposal berhasil dikirim!");
//       console.log(response);
//     } catch (error) {
//       alert("Gagal mengirim proposal, cek kembali data yang diisi.");
//       console.error(error);
//     }
//   };
  

//   return (
//     <>
//      <form onSubmit={handleSubmit}>
//         {/* MASTER */}
//         <div className="card">
//           <div className="card-header text-start">Master</div>
//           <div className="card-body">
//             {/* Tanggal */}
//             <div className="form-group row">
//                 <label className="col-12 col-sm-3 col-form-label text-left">
//                   Tanggal:
//                 </label>
//                 <div className="col-12 col-sm-8 col-lg-8">
//                 <input
//                     type="date"
//                     required
//                     className="form-control"
//                     onFocus={(e) => e.target.showPicker && e.target.showPicker()}
//                     value={tanggal_pengajuan} 
//                     onChange={(e) => setTanggalPengajuan(e.target.value)}
//                 />

//                 </div>
//               </div>

//               {/* Proposal ID */}
//               <div className="form-group row">
//                 <label className="col-12 col-sm-3 col-form-label text-left">
//                   Proposal ID:
//                 </label>
//                 <div className="col-12 col-sm-8 col-lg-8">
//                   <input
//                     type="text"
//                     required
//                     placeholder="Nomor Surat Proposal cabang/Pusat"
//                     className="form-control"
//                   />
//                 </div>
//               </div>

//               {/* BU */}
//             <div className="form-group row">
//                 <label className="col-12 col-sm-3 col-form-label text-left">
//                   BU:
//                 </label>
//                 <div className="col-12 col-sm-8 col-lg-8">
//                 <Select
//                   options={optionBisnisunit}
//                   placeholder="Pilih BU"
//                   className="basic-single"
//                   classNamePrefix="select"
//                   styles={customStyles}
//                 />
//                 </div>
//               </div>

//               {/* Ruang Lingkup */}
//               <div className="form-group row">
//                 <label className="col-12 col-sm-3 col-form-label text-left">
//                   Ruang Lingkup:
//                 </label>
//                 <div className="col-12 col-sm-8 col-lg-8">
//                 <Select
//                     options={optionsRuangLingkup}
//                     placeholder="Pilih Ruang Lingkup"
//                     className="basic-single"
//                     classNamePrefix="select"
//                     styles={customStyles}
//                   />
//                 </div>
//               </div>

//               {/* Kategori */}
//               <div className="form-group row">
//                 <label className="col-12 col-sm-3 col-form-label text-left">
//                   Kategori:
//                 </label>
//                 <div className="col-12 col-sm-8 col-lg-8">
//                 <Select
//                   options={optionsKategori}
//                   placeholder="Pilih Kategori"
//                   className="basic-single"
//                   classNamePrefix="select"
//                   styles={customStyles}
//                 />
//                 </div>
//               </div>

//               {/* Tanggal Proposal */}
//               <div className="form-group row">
//                 <label className="col-12 col-sm-3 col-form-label text-left">
//                   Tanggal Proposal:
//                 </label>
//                 <div className="col-12 col-sm-8 col-lg-8">
//                 <input
//                     type="date"
//                     required
//                     className="form-control"
//                     onFocus={(e) => e.target.showPicker && e.target.showPicker()}
//                     value={proposaldate}
//                     onChange={(e) => setProposalDate(e.target.value)}
//                 />  
//                 </div>
//               </div>

//               {/* Judul Proposal */}
//               <div className="form-group row">
//                 <label className="col-12 col-sm-3 col-form-label text-left">
//                   Judul Proposal:
//                 </label>
//                 <div className="col-12 col-sm-8 col-lg-8">
//                   <input type="text" required className="form-control" />
//                 </div>
//               </div>

//               {/* Pemohon */}
//               <div className="form-group row">
//                 <label className="col-12 col-sm-3 col-form-label text-left">
//                   Pemohon:
//                 </label>
//                 <div className="col-12 col-sm-8 col-lg-8">
//                   <input type="text" className="form-control" value="P1362" readOnly />
//                 </div>
//               </div>

//             {/* Type */}
//             <div className="form-group row">
//                 <label className="col-12 col-sm-3 col-form-label text-left">
//                   Type:
//                 </label>
//                 <div className="col-12 col-sm-8 col-lg-8">
//                 <select className="form-control" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
//                     {categories.dataTipe.map((item) => (
//                       <option key={item.value} value={item.value}>
//                         {item.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Otorisasi */}
//               <div className="form-group row align-items-center">
//                 <label className="col-12 col-sm-3 col-form-label text-left">Otorisasi:</label>
//                 <div className="col-12 col-sm-6 col-lg-8">
//                   <div className="input-group">
//                   <Select
//                     options={optionsOtorisasi}
//                     placeholder="Pilih Otorisasi"
//                     className="basic-single flex-grow-1"
//                     classNamePrefix="select"
//                     styles={customStyles}
//                     value={optionsOtorisasi.find((opt) => opt.value === selectedOtorisasi) || null}
//                     onChange={(selectedOption) => setSelectedOtorisasi(selectedOption ? selectedOption.value : "")}
//                   />
//                     <button type="button" className="btn btn-primary" onClick={handleAddOtorisasi}>
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* List Otorisasi yang ditambahkan */}
//               {addedOtorisasi.length > 0 && (
//                 <div className="form-group row mt-1 align-items-center">
//                   <div className="col-12 col-sm-6 col-lg-8 offset-sm-3">
//                     <ul className="list-group">
//                       {addedOtorisasi.map((item, index) => (
//                         <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                           {item}
//                           <button
//                             type="button"
//                             className="btn btn-danger btn-sm"
//                             onClick={() => setAddedOtorisasi(addedOtorisasi.filter((_, i) => i !== index))}
//                           >
//                             Remove
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               )}
//           </div>
//         </div>
        
//         {/* Inputan Angka jika Type = 99.Lain-lain */}
//         {selectedType === "9" && (
//                 <>
//                 <div className="card mt-3">
//                   <div className="card-header text-start">H. LAIN-LAIN</div>
//                   <div className="card-body">
//                     <div className="form-group row">
//                       <label className="col-12 col-sm-3 col-form-label text-left">Biaya lain-lain:</label>
//                       <div className="col-12 col-sm-8 col-lg-8">
//                         <input
//                           type="number"
//                           className="form-control"
//                           value={customNumber}
//                           onChange={(e) => setCustomNumber(e.target.value)}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="card mt-3">
//                   <div className="card-header text-start">F. CATATAN</div>
//                   <div className="card-body">
//                     <div className="form-group row">
//                       <label className="col-12 col-sm-3 col-form-label text-left">Masukkan Catatan:</label>
//                       <div className="col-12 col-sm-8 col-lg-8">
//                         <ReactQuill value={catatan} onChange={setCatatan} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 </>
//           )}

//           {/* LAMPIRAN */}
//         <div className="card">
//           <div className="card-header text-start">G. Lampiran</div>
//           <div className="card-body">
//               {/* Email Inputs */}
//               {["Email 1", "Email 2", "Email 3"].map((placeholder, index) => (
//                 <div className="form-group row" key={index}>
//                   <label className="col-12 col-sm-3 col-form-label text-left">Cc Email to</label>
//                   <div className="col-12 col-sm-8 col-lg-8">
//                     <input type="email" required placeholder={placeholder} className="form-control" />
//                   </div>
//                 </div>
//               ))}

//               {/* Drag and Drop File Upload */}
//               <div className="form-group row">
//                 <label className="col-12 col-sm-3 col-form-label text-left">Upload Lampiran:</label>
//                 <div className="col-12 col-sm-8 col-lg-8">
//                   <motion.div
//                     className="drop-zone"
//                     onDragOver={(e) => e.preventDefault()}
//                     onDrop={handleDrop}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => fileInputRef.current.click()}
//                   >
//                     <p>Drag & Drop file here or click to select files</p>
//                     <input
//                       type="file"
//                       multiple
//                       ref={fileInputRef}
//                       className="d-none"
//                       onChange={handleFileChange}
//                     />
//                   </motion.div>
//                   <ul className="file-list">
//                     {files.map((file, index) => (
//                       <motion.li key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                         {file.name}
//                         <button type="button" className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveFile(index)}>
//                           Remove
//                         </button>
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="form-group row">
//                 <div className="col-12 col-sm-8 col-lg-8 offset-sm-3">
//                   <button type="submit" className="btn btn-primary">Simpan</button>
//                 </div>
//               </div>
//           </div>
//         </div>
//      </form>
//     </>
//   );
// };

// export default InputProposal;

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





import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import CategoryService from "../../services/admin/categoryServices";
import "../../assets/styles/UploadFile.css";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputProposalServices from "../../services/admin/inputProposalServices";

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
      alert("Proposal berhasil dikirim!");
      console.log(response);
    } catch (error) {
      console.error("Error submitting proposal:", error.response?.data || error.message);
      console.log("Full error object:", error);
      alert(`Gagal mengirim proposal: ${error.response?.data?.message || error.message}`);
    }
    
  };
  

  return (
    <>
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
                    value={optionsOtorisasi.find((opt) => opt.label === selectedOtorisasi) || null}
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
    </>
  );
};

export default InputProposal;





// import React, { useState } from 'react';
// import axios from 'axios';

// const ProposalForm = () => {
//   const [formData, setFormData] = useState({
//     tanggal_pengajuan: '2025-03-28',
//     bisnis_unit: '2',
//     proposalid: '123/KKAJS/2988',
//     ruanglingkup: 'PST',
//     kategori: 'BANDING',
//     proposaldate: '2025-03-28',
//     title: 'JUDUL',
//     biayalainlain: '9998876',
//     description: '<p>INI CATATAN</p>',
//     email1: 'dio@gmail.com',
//     email2: 'dio@gmail.com',
//     email3: 'dio@gmail.com',
//     otorisasi: '[12, 1]'
//   });

//   const [images, setImages] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitResult, setSubmitResult] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleFileChange = (e) => {
//     setImages(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitResult(null);

//     try {
//       // Create a FormData object
//       const data = new FormData();
      
//       // Add all form fields to FormData
//       Object.keys(formData).forEach(key => {
//         data.append(key, formData[key]);
//       });
      
//       // Add file if exists
//       if (images) {
//         data.append('images', images);
//       }

//       // Make the API call
//       const response = await axios.post(
//         `http://34.128.72.22:2001/master/create-proposal`, 
//         data,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             // Add any other headers you need, like authorization
//           }
//         }
//       );

//       setSubmitResult({
//         success: true,
//         message: 'Proposal created successfully!',
//         data: response.data
//       });
//     } catch (error) {
//       setSubmitResult({
//         success: false,
//         message: error.response?.data?.message || 'An error occurred while submitting the proposal',
//         error: error.message
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6">Create Proposal</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1">Tanggal Pengajuan</label>
//             <input
//               type="date"
//               name="tanggal_pengajuan"
//               value={formData.tanggal_pengajuan}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block mb-1">Bisnis Unit</label>
//             <input
//               type="text"
//               name="bisnis_unit"
//               value={formData.bisnis_unit}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block mb-1">Proposal ID</label>
//             <input
//               type="text"
//               name="proposalid"
//               value={formData.proposalid}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block mb-1">Ruang Lingkup</label>
//             <input
//               type="text"
//               name="ruanglingkup"
//               value={formData.ruanglingkup}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block mb-1">Kategori</label>
//             <input
//               type="text"
//               name="kategori"
//               value={formData.kategori}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block mb-1">Proposal Date</label>
//             <input
//               type="date"
//               name="proposaldate"
//               value={formData.proposaldate}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block mb-1">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block mb-1">Biaya Lain-lain</label>
//             <input
//               type="text"
//               name="biayalainlain"
//               value={formData.biayalainlain}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
//         </div>
        
//         <div>
//           <label className="block mb-1">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2 h-24"
//           ></textarea>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block mb-1">Email 1</label>
//             <input
//               type="email"
//               name="email1"
//               value={formData.email1}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block mb-1">Email 2</label>
//             <input
//               type="email"
//               name="email2"
//               value={formData.email2}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>
          
//           <div>
//             <label className="block mb-1">Email 3</label>
//             <input
//               type="email"
//               name="email3"
//               value={formData.email3}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>
//         </div>
        
//         <div>
//           <label className="block mb-1">Otorisasi</label>
//           <input
//             type="text"
//             name="otorisasi"
//             value={formData.otorisasi}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>
        
//         <div>
//           <label className="block mb-1">Images</label>
//           <input
//             type="file"
//             name="images"
//             onChange={handleFileChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>
        
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
//           </button>
//         </div>
//       </form>
      
//       {submitResult && (
//         <div className={`mt-4 p-4 rounded ${submitResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
//           <p className="font-bold">{submitResult.success ? 'Success!' : 'Error!'}</p>
//           <p>{submitResult.message}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProposalForm;