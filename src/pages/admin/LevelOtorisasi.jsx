// const LevelOtorisasi = () => {
//     return(
//         <>
//             <div className="card">
//                 <div className="card-header text-start">A. KONFIGURASI OTORITOR</div>
//                 <div className="card-body">
//                     <form id="validationform" data-parsley-validate noValidate>
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                         Id
//                         </label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <input
//                             type="text"
//                             required
//                             // placeholder="Id"
//                             className="form-control"
//                         />
//                         </div>
//                     </div>

//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                         Nama
//                         </label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <input
//                             type="text"
//                             required
//                             // placeholder="Nama"
//                             className="form-control"
//                         />
//                         </div>
//                     </div>

//                     <div className="form-group row align-items-center">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                             Kode Karyawan
//                         </label>
//                         <div className="col-12 col-sm-9">
//                             <div className="d-flex gap-2">
//                                 <input type="text" required className="form-control col" />
//                                 <input type="text" required className="form-control col" />
//                                 <input type="text" required className="form-control col" />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                         BU
//                         </label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <select className="form-control">
//                             <option>Pilih...</option>
//                         </select>
//                         </div>
//                     </div>

//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                         Group
//                         </label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <select className="form-control">
//                             <option>Pilih...</option>
//                         </select>
//                         </div>
//                     </div>

//                     {/* Tombol Simpan */}
//                     <div className="form-group row">
//                         <div className="col-12 col-sm-8 col-lg-6 offset-sm-3">
//                         <button type="submit" className="btn btn-primary">
//                             Simpan
//                         </button>
//                         </div>
//                     </div>
//                     </form>
//                 </div>
//             </div>
//             {/* TABEL */}
//             <div className="card">
//             <div className="card-header text-start">B. LIST OTORITOR</div>
//             <div className="card-body">
//                 <div className="table-responsive">
//                 <table className="table table-striped table-bordered first">
//                     <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>NAMA</th>
//                         <th>BU</th>
//                         <th>EMPLID AX</th>
//                         <th>EMAIL AX</th>
//                         <th />
//                         <th />
//                         <th />
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td>50012</td>
//                         <td>Manager Marketing</td>
//                         <td>50</td>
//                         <td>P0272 Rizal Pahlevi</td>
//                         <td>rizal.pahlevi@erlangga.co.id</td>
//                         <td>1</td>
//                         <td><button className="btn btn-danger" type="submit"><i className="fas fa-expand-arrows-alt" /></button></td>
//                         <td><button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button></td>
//                     </tr>
//                     <tr>
//                         <td>50012</td>
//                         <td>Manager Marketing</td>
//                         <td>50</td>
//                         <td>P0272 Rizal Pahlevi</td>
//                         <td>rizal.pahlevi@erlangga.co.id</td>
//                         <td>1</td>
//                         <td><button className="btn btn-danger" type="submit"><i className="fas fa-expand-arrows-alt" /></button></td>
//                         <td><button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button></td>
//                     </tr>
//                     </tbody>
//                 </table>
//                 </div>
//             </div>
//             </div>
//         </>
//     );
// }

// export default LevelOtorisasi;

// import { useState } from "react";
// import { Table, Form } from "react-bootstrap";

// const OtoritorList = () => {
//     const [selectedBU, setSelectedBU] = useState("");
    
//     const data = [
//         { id: 50012, name: "Manager Marketing", bu: "50", emplid: "P0272 Rizal Pahlevi", email: "rizal.pahlevi@erlangga.co.id" },
//         { id: 50013, name: "Supervisor Sales", bu: "51", emplid: "P0456 Andi Wijaya", email: "andi.wijaya@erlangga.co.id" }
//     ];
    
//     const filteredData = data.filter(item =>
//         selectedBU === "" || item.bu === selectedBU
//     );
    
//     return (
//         <>
//             <div className="card">
//                 <div className="card-header text-start">A. KONFIGURASI OTORITOR</div>
//                 <div className="card-body">
//                     <form id="validationform" data-parsley-validate noValidate>
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                         Id
//                         </label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <input
//                             type="text"
//                             required
//                             // placeholder="Id"
//                             className="form-control"
//                         />
//                         </div>
//                     </div>

//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                         Nama
//                         </label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <input
//                             type="text"
//                             required
//                             // placeholder="Nama"
//                             className="form-control"
//                         />
//                         </div>
//                     </div>

//                     <div className="form-group row align-items-center">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                             Kode Karyawan
//                         </label>
//                         <div className="col-12 col-sm-9">
//                             <div className="d-flex gap-2">
//                                 <input type="text" required className="form-control col" />
//                                 <input type="text" required className="form-control col" />
//                                 <input type="text" required className="form-control col" />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                         BU
//                         </label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <select className="form-control">
//                             <option>Pilih...</option>
//                         </select>
//                         </div>
//                     </div>

//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                         Group
//                         </label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <select className="form-control">
//                             <option>Pilih...</option>
//                         </select>
//                         </div>
//                     </div>

//                     {/* Tombol Simpan */}
//                     <div className="form-group row">
//                         <div className="col-12 col-sm-8 col-lg-6 offset-sm-3">
//                         <button type="submit" className="btn btn-primary">
//                             Simpan
//                         </button>
//                         </div>
//                     </div>
//                     </form>
//                 </div>
//             </div>
//         <div className="card">
//             <div className="card-header text-start">B. LIST OTORITOR</div>
//             <div className="card-body">
//                 <Form.Select className="mb-3" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
//                     <option value="">Semua BU</option>
//                     {[...new Set(data.map(item => item.bu))].map(bu => (
//                         <option key={bu} value={bu}>{bu}</option>
//                     ))}
//                 </Form.Select>
//                 <div className="table-responsive">
//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>NAMA</th>
//                                 <th>BU</th>
//                                 <th>EMPLID AX</th>
//                                 <th>EMAIL AX</th>
//                                 <th></th>
//                                 <th></th>
//                                 <th></th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredData.map((item, index) => (
//                                 <tr key={index}>
//                                     <td>{item.id}</td>
//                                     <td>{item.name}</td>
//                                     <td>{item.bu}</td>
//                                     <td>{item.emplid}</td>
//                                     <td>{item.email}</td>
//                                     <td>1</td>
//                                     <td><button className="btn btn-danger" type="submit"><i className="fas fa-expand-arrows-alt" /></button></td>
//                                     <td><button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button></td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// };

// export default OtoritorList;

// import { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import OtorisasiServices from "../../services/admin/otorisasiServices";
// import { Form } from "react-bootstrap";

// const OtoritorList = () => {
//     const [selectedBU, setSelectedBU] = useState("");
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await OtorisasiServices.getOtorisasi();
//                 setData(response.data.data);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     const filteredData = data.filter(item => selectedBU === "" || item.bisnis_unit === selectedBU);

//     const columns = [
//         { name: "ID", selector: row => row.id_otorisasi, sortable: true },
//         { name: "Nama", selector: row => row.jabatan, sortable: true },
//         { name: "BU", selector: row => row.bisnis_unit, sortable: true },
//         { name: "Emplid AX", selector: row => row.emplid + " " + row.name },
//         { name: "Email AX", selector: row => row.email },
//         { name: "Actions", cell: row => (
//             <>
//                 <button className="btn btn-danger me-2"><i className="fas fa-times" /></button>
//                 <button className="btn btn-primary"><i className="fas fa-edit" /></button>
//             </>
//         ) }
//     ];

//     return (
//         <>
//             {/* KONFIGURASI OTORITOR */}
//             <div className="card">
//                 <div className="card-header text-start">A. KONFIGURASI OTORITOR</div>
//                 <div className="card-body">
//                     <form id="validationform" data-parsley-validate noValidate>
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                         Id
//                         </label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <input
//                             type="text"
//                             required
//                             // placeholder="Id"
//                             className="form-control"
//                         />
//                         </div>
//                     </div>

//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                         Nama Jabatan
//                         </label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <input
//                             type="text"
//                             required
//                             // placeholder="Nama"
//                             className="form-control"
//                         />
//                         </div>
//                     </div>

//                     <div className="form-group row align-items-center">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                             Kode Karyawan
//                         </label>
//                         <div className="col-12 col-sm-9">
//                             <div className="d-flex gap-2">
//                                 <input type="text" required className="form-control col" />
//                                 <input type="text" required className="form-control col" />
//                                 <input type="text" required className="form-control col" />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                         BU
//                         </label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <select className="form-control">
//                             <option>Pilih...</option>
//                         </select>
//                         </div>
//                     </div>

//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">
//                         Group
//                         </label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <select className="form-control">
//                             <option>Pilih...</option>
//                         </select>
//                         </div>
//                     </div>

//                     {/* Tombol Simpan */}
//                     <div className="form-group row">
//                         <div className="col-12 col-sm-8 col-lg-6 offset-sm-3">
//                         <button type="submit" className="btn btn-primary">
//                             Simpan
//                         </button>
//                         </div>
//                     </div>
//                     </form>
//                 </div>
//             </div>

//             {/* LIST OTORITOR */}
//             <div className="card">
//                 <div className="card-header text-start">B. LIST OTORITOR</div>
//                 <div className="card-body">
//                     <Form.Select className="mb-3" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
//                         <option value="">Semua BU</option>
//                         {[...new Set(data.map(item => item.bisnis_unit))].map(bu => (
//                             <option key={bu} value={bu}>{bu}</option>
//                         ))}
//                     </Form.Select>
//                     <div className="table-responsive">
//                         <DataTable columns={columns} data={filteredData} pagination />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default OtoritorList;

// import { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import OtorisasiServices from "../../services/admin/otorisasiServices";
// import CategoryService from "../../services/admin/categoryServices";
// import { Form } from "react-bootstrap";

// const OtoritorList = () => {
//     const [selectedBU, setSelectedBU] = useState("");
//     const [data, setData] = useState([]);
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await OtorisasiServices.getOtorisasi();
//                 setData(response.data.data);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await CategoryService.getCategories();
//                 console.log("Full API Response:", response); 
//                 console.log("Bisnis Unit Data:", response.data?.bisnisUnit); 
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };
//         fetchCategories();
//     }, []);
    

//     const filteredData = data.filter(item => selectedBU === "" || item.bisnis_unit === selectedBU);

//     const columns = [
//         { name: "ID", selector: row => row.id_otorisasi, sortable: true },
//         { name: "Nama", selector: row => row.jabatan, sortable: true },
//         { name: "BU", selector: row => row.bisnis_unit, sortable: true },
//         { name: "Emplid AX", selector: row => row.emplid + " " + row.name },
//         { name: "Email AX", selector: row => row.email },
//         { name: "Actions", cell: row => (
//             <>
//                 <button className="btn btn-danger me-2"><i className="fas fa-times" /></button>
//                 <button className="btn btn-primary"><i className="fas fa-edit" /></button>
//             </>
//         ) }
//     ];

//     return (
//         <>
//             {/* KONFIGURASI OTORITOR */}
//             <div className="card">
//                 <div className="card-header text-start">A. KONFIGURASI OTORITOR</div>
//                 <div className="card-body">
//                     <form id="validationform" data-parsley-validate noValidate>
//                         <div className="form-group row">
//                             <label className="col-12 col-sm-3 col-form-label text-left">
//                                 Id
//                             </label>
//                             <div className="col-12 col-sm-8 col-lg-8">
//                                 <input type="text" required className="form-control" />
//                             </div>
//                         </div>

//                         <div className="form-group row">
//                             <label className="col-12 col-sm-3 col-form-label text-left">
//                                 Nama Jabatan
//                             </label>
//                             <div className="col-12 col-sm-8 col-lg-8">
//                                 <input type="text" required className="form-control" />
//                             </div>
//                         </div>

//                         <div className="form-group row align-items-center">
//                             <label className="col-12 col-sm-3 col-form-label text-left">
//                                 Kode Karyawan
//                             </label>
//                             <div className="col-12 col-sm-9">
//                                 <div className="d-flex gap-2">
//                                     <input type="text" required className="form-control col" />
//                                     <input type="text" required className="form-control col" />
//                                     <input type="text" required className="form-control col" />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* BU (Diambil dari API Kategori) */}
//                         <div className="form-group row">
//                             <label className="col-12 col-sm-3 col-form-label text-left">
//                                 BU
//                             </label>
//                             <div className="col-12 col-sm-8 col-lg-8">
//                             <select className="form-control">
//                                 <option>Pilih...</option>
//                                 {categories?.bisnisUnit?.map((item) => (
//                                     <option key={item.value} value={item.name}>
//                                         {item.name}
//                                     </option>
//                                 ))}
//                             </select>

//                             </div>
//                         </div>

//                         {/* Group (Masih Kosong / Bisa Diisi dari API) */}
//                         <div className="form-group row">
//                             <label className="col-12 col-sm-3 col-form-label text-left">
//                                 Group
//                             </label>
//                             <div className="col-12 col-sm-8 col-lg-8">
//                                 <select className="form-control">
//                                     <option>Pilih...</option>
//                                     {categories?.dataGroup?.map((item) => (
//                                         <option key={item.value} value={item.name}>
//                                             {item.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Tombol Simpan */}
//                         <div className="form-group row">
//                             <div className="col-12 col-sm-8 col-lg-6 offset-sm-3">
//                                 <button type="submit" className="btn btn-primary">
//                                     Simpan
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             {/* LIST OTORITOR */}
//             <div className="card">
//                 <div className="card-header text-start">B. LIST OTORITOR</div>
//                 <div className="card-body">
//                     <Form.Select className="mb-3" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
//                         <option value="">Semua BU</option>
//                         {[...new Set(data.map(item => item.bisnis_unit))].map(bu => (
//                             <option key={bu} value={bu}>{bu}</option>
//                         ))}
//                     </Form.Select>
//                     <div className="table-responsive">
//                         <DataTable columns={columns} data={filteredData} pagination />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default OtoritorList;

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import OtorisasiServices from "../../services/admin/otorisasiServices";
import CategoryService from "../../services/admin/categoryServices";
import { Form } from "react-bootstrap";

const OtoritorList = () => {
    const [selectedBU, setSelectedBU] = useState("");
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        id_level: "",
        jabatan: "",
        bisnis_unit: "",
        emplid: "",
        groupid: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OtorisasiServices.getOtorisasi();
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await OtorisasiServices.submitKonfigursiOtorisasi(formData);
            alert("Data berhasil disimpan!");
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const handleDelete = async (id) => {
        console.log("🔍 ID yang dikirim untuk delete:", id); // Debugging
        if (!id) {
            console.error("❌ ID tidak ditemukan!");
            return;
        }
    
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                const response = await OtorisasiServices.deleteKonfigursiOtorisasi(id);
                console.log("✅ Response dari server:", response); // Debugging
                setData(data.filter(item => item.id_otorisasi !== id));
                alert("Data berhasil dihapus!");
            } catch (error) {
                console.error("❌ Error deleting data:", error.response?.data || error);
            }
        }
    };
    

    const filteredData = data.filter(item => selectedBU === "" || item.bisnis_unit === selectedBU);

    const columns = [
        { name: "ID", selector: row => row.id_otorisasi, sortable: true },
        { name: "Nama", selector: row => row.jabatan, sortable: true },
        { name: "BU", selector: row => row.bisnis_unit, sortable: true },
        { name: "Emplid AX", selector: row => row.emplid + " " + row.name },
        { name: "Email AX", selector: row => row.email },
        { name: "Actions", cell: row => (
            <>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(row.id_otorisasi)}>
                    <i className="fas fa-times" />
                </button>
                <button className="btn btn-primary"><i className="fas fa-edit" /></button>
            </>
        )}
    ];

    return (
        <>
            {/* KONFIGURASI OTORITOR */}
            <div className="card">
                <div className="card-header text-start">A. KONFIGURASI OTORITOR</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label className="col-12 col-sm-3 col-form-label text-left">ID (5 Digit)</label>
                            <div className="col-12 col-sm-8 col-lg-8">
                                <input type="text" name="id_level" value={formData.id_level} onChange={handleChange} required className="form-control" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-12 col-sm-3 col-form-label text-left">Nama Jabatan</label>
                            <div className="col-12 col-sm-8 col-lg-8">
                                <input type="text" name="jabatan" value={formData.jabatan} onChange={handleChange} required className="form-control" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-12 col-sm-3 col-form-label text-left">Kode Karyawan</label>
                            <div className="col-12 col-sm-8 col-lg-8">
                                <select name="emplid" value={formData.emplid} onChange={handleChange} className="form-control">
                                    <option value="">Pilih...</option>
                                    {categories?.dataUser?.map(item => (
                                        <option key={item.value} value={item.value}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-12 col-sm-3 col-form-label text-left">BU</label>
                            <div className="col-12 col-sm-8 col-lg-8">
                                <select name="bisnis_unit" value={formData.bisnis_unit} onChange={handleChange} className="form-control">
                                    <option value="">Pilih...</option>
                                    {categories?.bisnisUnit?.map(item => (
                                        <option key={item.value} value={item.value}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-12 col-sm-3 col-form-label text-left">Group</label>
                            <div className="col-12 col-sm-8 col-lg-8">
                                <select name="groupid" value={formData.groupid} onChange={handleChange} className="form-control">
                                    <option value="">Pilih...</option>
                                    {categories?.dataGroup?.map(item => (
                                        <option key={item.value} value={item.value}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-12 col-sm-8 col-lg-6 offset-sm-3">
                                <button type="submit" className="btn btn-primary">Simpan</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* LIST OTORITOR */}
            <div className="card">
                <div className="card-header text-start">B. LIST OTORITOR</div>
                <div className="card-body">
                    <Form.Select className="mb-3" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
                        <option value="">Semua BU</option>
                        {[...new Set(data.map(item => item.bisnis_unit))].map(bu => (
                            <option key={bu} value={bu}>{bu}</option>
                        ))}
                    </Form.Select>
                    <div className="table-responsive">
                        <DataTable columns={columns} data={filteredData} pagination />
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtoritorList;
