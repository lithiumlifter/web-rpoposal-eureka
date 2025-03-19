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

import { useState } from "react";
import { Table, Form } from "react-bootstrap";

const OtoritorList = () => {
    const [selectedBU, setSelectedBU] = useState("");
    
    const data = [
        { id: 50012, name: "Manager Marketing", bu: "50", emplid: "P0272 Rizal Pahlevi", email: "rizal.pahlevi@erlangga.co.id" },
        { id: 50013, name: "Supervisor Sales", bu: "51", emplid: "P0456 Andi Wijaya", email: "andi.wijaya@erlangga.co.id" }
    ];
    
    const filteredData = data.filter(item =>
        selectedBU === "" || item.bu === selectedBU
    );
    
    return (
        <>
            <div className="card">
                <div className="card-header text-start">A. KONFIGURASI OTORITOR</div>
                <div className="card-body">
                    <form id="validationform" data-parsley-validate noValidate>
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">
                        Id
                        </label>
                        <div className="col-12 col-sm-8 col-lg-8">
                        <input
                            type="text"
                            required
                            // placeholder="Id"
                            className="form-control"
                        />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">
                        Nama
                        </label>
                        <div className="col-12 col-sm-8 col-lg-8">
                        <input
                            type="text"
                            required
                            // placeholder="Nama"
                            className="form-control"
                        />
                        </div>
                    </div>

                    <div className="form-group row align-items-center">
                        <label className="col-12 col-sm-3 col-form-label text-left">
                            Kode Karyawan
                        </label>
                        <div className="col-12 col-sm-9">
                            <div className="d-flex gap-2">
                                <input type="text" required className="form-control col" />
                                <input type="text" required className="form-control col" />
                                <input type="text" required className="form-control col" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">
                        BU
                        </label>
                        <div className="col-12 col-sm-8 col-lg-8">
                        <select className="form-control">
                            <option>Pilih...</option>
                        </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">
                        Group
                        </label>
                        <div className="col-12 col-sm-8 col-lg-8">
                        <select className="form-control">
                            <option>Pilih...</option>
                        </select>
                        </div>
                    </div>

                    {/* Tombol Simpan */}
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 col-lg-6 offset-sm-3">
                        <button type="submit" className="btn btn-primary">
                            Simpan
                        </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        <div className="card">
            <div className="card-header text-start">B. LIST OTORITOR</div>
            <div className="card-body">
                <Form.Select className="mb-3" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
                    <option value="">Semua BU</option>
                    {[...new Set(data.map(item => item.bu))].map(bu => (
                        <option key={bu} value={bu}>{bu}</option>
                    ))}
                </Form.Select>
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAMA</th>
                                <th>BU</th>
                                <th>EMPLID AX</th>
                                <th>EMAIL AX</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.bu}</td>
                                    <td>{item.emplid}</td>
                                    <td>{item.email}</td>
                                    <td>1</td>
                                    <td><button className="btn btn-danger" type="submit"><i className="fas fa-expand-arrows-alt" /></button></td>
                                    <td><button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
        </>
    );
};

export default OtoritorList;
