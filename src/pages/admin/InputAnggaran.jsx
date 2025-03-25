// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// const InputAnggaran = () => {
//     const { id_proposal } = useParams();

//     // State untuk menyimpan daftar anggaran
//     const [anggarans, setAnggarans] = useState([
//         { 
//             wilayah_anggaran: '', 
//             anggaran: 0, 
//             realisasi: 0, 
//             dalamproses: 0, 
//             sisaanggaran: 0, 
//             keterangan: '', 
//             isReadonly: false // State per form
//         }
//     ]);

//     // Fungsi untuk menangani perubahan input dalam form anggaran
//     const handleInputChange = (index, field, value) => {
//         const newAnggarans = [...anggarans];
//         newAnggarans[index][field] = field === 'anggaran' || field === 'realisasi' || field === 'dalamproses' || field === 'sisaanggaran'
//             ? Number(value) // Pastikan angka dikonversi ke tipe number
//             : value;
//         setAnggarans(newAnggarans);
//     };

//     // Fungsi untuk menambahkan form anggaran baru
//     const handleAddForm = () => {
//         setAnggarans([...anggarans, { 
//             wilayah_anggaran: '', 
//             anggaran: 0, 
//             realisasi: 0, 
//             dalamproses: 0, 
//             sisaanggaran: 0, 
//             keterangan: '', 
//             isReadonly: false 
//         }]);
//     };

//     // Fungsi untuk menghapus form anggaran
//     const handleRemoveForm = (index) => {
//         if (anggarans.length > 1) {
//             setAnggarans(anggarans.filter((_, i) => i !== index));
//         }
//     };

//     // Fungsi untuk menyimpan data per form
//     const handleSave = (index) => {
//         const formattedData = {
//             id_proposal: Number(id_proposal),
//             wilayah_anggaran: anggarans[index].wilayah_anggaran,
//             anggaran: anggarans[index].anggaran,
//             realisasi: anggarans[index].realisasi,
//             dalamproses: anggarans[index].dalamproses,
//             sisaanggaran: anggarans[index].sisaanggaran,
//             keterangan: anggarans[index].keterangan,
//         };

//         console.log(`Data yang dikirim untuk form ${index + 1}:`, formattedData);
        
//         // Simulasi penyimpanan berhasil
//         const newAnggarans = [...anggarans];
//         newAnggarans[index].isReadonly = true;
//         setAnggarans(newAnggarans);
//     };

//     // Fungsi untuk mengedit kembali form
//     const handleEdit = (index) => {
//         const newAnggarans = [...anggarans];
//         newAnggarans[index].isReadonly = false;
//         setAnggarans(newAnggarans);
//     };

//     return (
//         <>
//             <div>
//                 {anggarans.map((anggaran, index) => (
//                     <div className="card mb-3" key={index}>
//                         <div className="card-header d-flex justify-content-between align-items-center">
//                             <span className="text-start">I. ANGGARAN {index + 1}</span>
//                             {anggarans.length > 1 && !anggaran.isReadonly && (
//                                 <button className="btn btn-danger btn-sm" onClick={() => handleRemoveForm(index)}>
//                                     Hapus
//                                 </button>
//                             )}
//                         </div>
//                         <div className="card-body">
//                             <form id={`form-${index}`}>
//                                 {/* Wilayah Anggaran */}
//                                 <div className="mb-3 row">
//                                     <label className="col-sm-3 col-form-label text-start">Wilayah:</label>
//                                     <div className="col-sm-9">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             value={anggaran.wilayah_anggaran}
//                                             onChange={(e) => handleInputChange(index, 'wilayah_anggaran', e.target.value)}
//                                             readOnly={anggaran.isReadonly}
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Anggaran */}
//                                 <div className="mb-3 row">
//                                     <label className="col-sm-3 col-form-label text-start">Anggaran (Rp):</label>
//                                     <div className="col-sm-9">
//                                         <input
//                                             type="number"
//                                             className="form-control"
//                                             value={anggaran.anggaran}
//                                             onChange={(e) => handleInputChange(index, 'anggaran', e.target.value)}
//                                             readOnly={anggaran.isReadonly}
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Realisasi */}
//                                 <div className="mb-3 row">
//                                     <label className="col-sm-3 col-form-label text-start">Realisasi (Rp):</label>
//                                     <div className="col-sm-9">
//                                         <input
//                                             type="number"
//                                             className="form-control"
//                                             value={anggaran.realisasi}
//                                             onChange={(e) => handleInputChange(index, 'realisasi', e.target.value)}
//                                             readOnly={anggaran.isReadonly}
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Dalam Proses */}
//                                 <div className="mb-3 row">
//                                     <label className="col-sm-3 col-form-label text-start">Dalam Proses (Rp):</label>
//                                     <div className="col-sm-9">
//                                         <input
//                                             type="number"
//                                             className="form-control"
//                                             value={anggaran.dalamproses}
//                                             onChange={(e) => handleInputChange(index, 'dalamproses', e.target.value)}
//                                             readOnly={anggaran.isReadonly}
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Sisa Anggaran */}
//                                 <div className="mb-3 row">
//                                     <label className="col-sm-3 col-form-label text-start">Sisa Anggaran (Rp):</label>
//                                     <div className="col-sm-9">
//                                         <input
//                                             type="number"
//                                             className="form-control"
//                                             value={anggaran.sisaanggaran}
//                                             onChange={(e) => handleInputChange(index, 'sisaanggaran', e.target.value)}
//                                             readOnly={anggaran.isReadonly}
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Keterangan */}
//                                 <div className="mb-3 row">
//                                     <label className="col-sm-3 col-form-label text-start">Keterangan:</label>
//                                     <div className="col-sm-9">
//                                         <textarea
//                                             className="form-control"
//                                             rows="3"
//                                             value={anggaran.keterangan}
//                                             onChange={(e) => handleInputChange(index, 'keterangan', e.target.value)}
//                                             readOnly={anggaran.isReadonly}
//                                         ></textarea>
//                                     </div>
//                                 </div>
//                             </form>

//                             {/* Tombol Simpan & Edit */}
//                             <div className="d-flex justify-content-end">
//                                 {!anggaran.isReadonly ? (
//                                     <button className="btn btn-success" onClick={() => handleSave(index)}>
//                                         Simpan
//                                     </button>
//                                 ) : (
//                                     <button className="btn btn-warning" onClick={() => handleEdit(index)}>
//                                         Edit
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))}

//                 {/* Tombol Tambah Form */}
//                 <div className="d-flex justify-content-center mt-3">
//                     <button className="btn btn-primary" onClick={handleAddForm}>
//                         + Tambah Form
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default InputAnggaran;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnggaranServices from "../../services/admin/anggaranServices";

const InputAnggaran = () => {
    const { id_proposal } = useParams();
    const [anggarans, setAnggarans] = useState([]);
    const [proposal, setProposal] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AnggaranServices.getDetailAnggaran(id_proposal);
                console.log("Data Detail Anggaran:", response.data);
                const anggaranData = response.data.anggaran || [];
                setProposal(response.data || {});

                if (anggaranData.length > 0) {
                    setAnggarans(anggaranData.map(item => ({
                        wilayah_anggaran: item.wilayah_anggaran || "",
                        anggaran: item.anggaran || 0,
                        realisasi: item.realisasi || 0,
                        dalamproses: item.dalamproses || 0,
                        sisaanggaran: item.sisaanggaran || 0,
                        keterangan: item.keterangan || "",
                        isReadonly: true,
                    })));
                } else {
                    setAnggarans([{ wilayah_anggaran: "", anggaran: 0, realisasi: 0, dalamproses: 0, sisaanggaran: 0, keterangan: "", isReadonly: false }]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Gagal mengambil data anggaran.");
            }
        };
        fetchData();
    }, [id_proposal]);

    const handleInputChange = (index, field, value) => {
        const newAnggarans = [...anggarans];
        newAnggarans[index][field] = ["anggaran", "realisasi", "dalamproses", "sisaanggaran"].includes(field) ? Number(value) : value;
        setAnggarans(newAnggarans);
    };

    const handleAddForm = () => {
        setAnggarans([...anggarans, { wilayah_anggaran: "", anggaran: 0, realisasi: 0, dalamproses: 0, sisaanggaran: 0, keterangan: "", isReadonly: false }]);
    };

    const handleRemoveForm = (index) => {
        if (anggarans.length > 1) {
            setAnggarans(anggarans.filter((_, i) => i !== index));
        }
    };

    const handleSave = async (index) => {
        const formattedData = { id_proposal: Number(id_proposal), ...anggarans[index] };
        try {
            await AnggaranServices.submitAnggaran(formattedData);
            const newAnggarans = [...anggarans];
            newAnggarans[index].isReadonly = true;
            setAnggarans(newAnggarans);
        } catch (error) {
            alert("Gagal menyimpan data. Silakan coba lagi.", error);
        }
    };

    const handleEdit = (index) => {
        const newAnggarans = [...anggarans];
        newAnggarans[index].isReadonly = false;
        setAnggarans(newAnggarans);
    };

    return (
        <>
            <div>
                {anggarans.map((anggaran, index) => (
                    <div className="card mb-3" key={index}>
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span className="text-start">I. ANGGARAN {index + 1}</span>
                            {anggarans.length > 1 && !anggaran.isReadonly && (
                                <button className="btn btn-danger btn-sm" onClick={() => handleRemoveForm(index)}>
                                    Hapus
                                </button>
                            )}
                        </div>
                        <div className="card-body">
                            <form>
                                {["wilayah_anggaran", "anggaran", "realisasi", "dalamproses", "sisaanggaran", "keterangan"].map((field, i) => (
                                    <div className="mb-3 row" key={i}>
                                        <label className="col-sm-3 col-form-label text-start">
                                            {field.replace("_", " ").charAt(0).toUpperCase() + field.slice(1)}:
                                        </label>
                                        <div className="col-sm-9">
                                            {field === "keterangan" ? (
                                                <textarea className="form-control" rows="3" value={anggaran[field]} onChange={(e) => handleInputChange(index, field, e.target.value)} readOnly={anggaran.isReadonly}></textarea>
                                            ) : (
                                                <input type={field === "wilayah_anggaran" ? "text" : "number"} className="form-control" value={anggaran[field]} onChange={(e) => handleInputChange(index, field, e.target.value)} readOnly={anggaran.isReadonly} />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </form>
                            <div className="d-flex justify-content-end">
                                {!anggaran.isReadonly ? (
                                    <button className="btn btn-success" onClick={() => handleSave(index)}>Simpan</button>
                                ) : (
                                    <button className="btn btn-warning" onClick={() => handleEdit(index)}>Edit</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="d-flex justify-content-center mt-3 mb-3">
                    <button className="btn btn-primary" onClick={handleAddForm}>+ Tambah Form</button>
                </div>
            </div>

            {/* DETAIL PROPOSAL */}
            <div className="card">
                <div className="card-header text-start">Master</div>
                <div className="card-body">
                    <form id="validationform" data-parsley-validate noValidate>
                        {proposal && (
                            <>
                                {/* Register */}
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label text-left">Register</label>
                                    <div className="col-12 col-sm-8 col-lg-8">
                                        <input type="text" className="form-control" value={proposal.reg || ""} readOnly />
                                    </div>
                                </div>
                                {/* Tanggal */}
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label text-left">Tanggal:</label>
                                    <div className="col-12 col-sm-8 col-lg-8">
                                    <input type="date" className="form-control" 
                                        value={proposal.tgl_proposal ? new Date(proposal.tgl_proposal).toISOString().split("T")[0] : ""} 
                                        readOnly />
                                    </div>
                                </div>
                                {/* Proposal ID */}
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label text-left">Proposal ID:</label>
                                    <div className="col-12 col-sm-8 col-lg-8">
                                        <input type="text" className="form-control" value={proposal.id_proposal || ""} readOnly />
                                    </div>
                                </div>
                                {/* BU */}
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label text-left">BU:</label>
                                    <div className="col-12 col-sm-8 col-lg-8">
                                        <input type="text" className="form-control" value={proposal.bisnis_unit || ""} readOnly />
                                    </div>
                                </div>
                                {/* Ruang Lingkup */}
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label text-left">Ruang Lingkup:</label>
                                    <div className="col-12 col-sm-8 col-lg-8">
                                        <input type="text" className="form-control" value={proposal.ruang_lingkup || ""} readOnly />
                                    </div>
                                </div>
                                {/* Kategori */}
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label text-left">Kategori:</label>
                                    <div className="col-12 col-sm-8 col-lg-8">
                                        <input type="text" className="form-control" value={proposal.kategori || ""} readOnly />
                                    </div>
                                </div>
                                {/* Tanggal Proposal */}
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label text-left">Tanggal Proposal:</label>
                                    <div className="col-12 col-sm-8 col-lg-8">
                                    <input type="date" className="form-control" 
                                        value={proposal.tgl_pengajuan ? new Date(proposal.tgl_pengajuan.split(",")[0]).toISOString().split("T")[0] : ""} 
                                        readOnly /> 
                                    </div>
                                </div>
                                {/* Judul Proposal */}
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label text-left">Judul Proposal:</label>
                                    <div className="col-12 col-sm-8 col-lg-8">
                                        <input type="text" className="form-control" value={proposal.title || ""} readOnly />
                                    </div>
                                </div>
                                {/* Pemohon */}
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label text-left">Pemohon:</label>
                                    <div className="col-12 col-sm-8 col-lg-8">
                                        <input type="text" className="form-control" value={proposal.pemohon.name || ""} readOnly />
                                    </div>
                                </div>
                                {/* Type */}
                                <div className="form-group row">
                                    <label className="col-12 col-sm-3 col-form-label text-left">Type:</label>
                                    <div className="col-12 col-sm-8 col-lg-8">
                                        <input type="text" className="form-control" value={proposal.tipe || ""} readOnly />
                                    </div>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>

            {/* LAIN-LAIN */}
            <div className="card">
                <div className="card-header text-start">H. LAIN-LAIN</div>
                <div className="card-body">
                    <form id="validationform" data-parsley-validate noValidate>
                        {proposal && (
                            <div className="form-group row">
                                <label htmlFor="lainLain" className="col-12 col-sm-3 col-form-label text-start">
                                    Biaya Lain-Lain:
                                </label>
                                <div className="col-12 col-sm-8 col-lg-8">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="lainLain"
                                        name="lainLain"
                                        defaultValue={proposal.description} // Set default value if needed
                                        placeholder="Masukkan angka"
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Catatan */}
            <div className="card">
                <div className="card-header text-start">F. CATATAN</div>
                <div className="card-body">
                    <form id="validationform" data-parsley-validate noValidate>
                        {proposal && (
                            <>
                                {proposal.description}
                            </>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default InputAnggaran;