// const UpdateAnggaran = () => {
//     return(
//         <>
//               <div className="card">
//                     {/* <h5 className="card-header">Update Anggaran</h5> */}
//                     <div className="card-body">
//                         <div className="table-responsive">
//                         <table className="table table-striped table-bordered first">
//                             <thead>
//                             <tr>
//                                 <th>OTO</th>
//                                 <th>REQ</th>
//                                 <th>ID</th>
//                                 <th>BU</th>
//                                 <th>TGL INPUT</th>
//                                 <th>TITLE</th>
//                                 <th>TYPE</th>
//                                 <th>STATUS</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             <tr>
//                                 <td><button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button></td>
//                                 <td>RB-8061</td>
//                                 <td>0314/MASTERDISKON/III/2025</td>
//                                 <td>50</td>
//                                 <td>2025-03-10 11:21:12</td>
//                                 <td>Surat Konfirmasi Issue Tiket Pesawat Peserta Tour Incentive West Europe</td>
//                                 <td>99.LAIN-LAIN</td>
//                                 <td>-RecievedPusat</td>
//                             </tr>
//                             <tr>
//                                 <td><button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button></td>
//                                 <td>RB-8054</td>
//                                 <td>0314/MASTERDISKON/III/2025</td>
//                                 <td>50</td>
//                                 <td>2025-03-10 11:21:12</td>
//                                 <td>Surat Konfirmasi Issue Tiket Pesawat Peserta Tour Incentive West Europe</td>
//                                 <td>99.LAIN-LAIN</td>
//                                 <td>-RecievedPusat</td>
//                             </tr>
//                             </tbody>
//                         </table>
//                         </div>
//                     </div>
//                     </div>

//         </>
//     );
// }

// export default UpdateAnggaran;

import { useState } from "react";

const UpdateAnggaran = () => {
    const [selectedBU, setSelectedBU] = useState("");
    const [searchTitle, setSearchTitle] = useState("");

    const data = [
        { oto: "Edit", req: "RB-8061", id: "0314/MASTERDISKON/III/2025", bu: "50", tglInput: "2025-03-10 11:21:12", title: "Surat Konfirmasi Issue Tiket Pesawat Peserta Tour Incentive West Europe", type: "99.LAIN-LAIN", status: "-RecievedPusat" },
        { oto: "Edit", req: "RB-8054", id: "0314/MASTERDISKON/III/2025", bu: "50", tglInput: "2025-03-10 11:21:12", title: "Surat Konfirmasi Issue Tiket Pesawat Peserta Tour Incentive West Europe", type: "99.LAIN-LAIN", status: "-RecievedPusat" }
    ];

    const filteredData = data.filter(item =>
        (selectedBU === "" || item.bu === selectedBU) &&
        (searchTitle === "" || item.title.toLowerCase().includes(searchTitle.toLowerCase()))
    );

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex gap-2 mb-3 align-items-center">
                        <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
                            <option value="">Semua BU</option>
                            <option value="50">BU 50</option>
                            <option value="51">BU 51</option>
                        </select>
                        <input type="text" className="form-control w-auto" placeholder="Cari Title..." value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                        <button className="btn btn-primary">Tampilkan</button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered first">
                            <thead>
                                <tr>
                                    <th>OTO</th>
                                    <th>REQ</th>
                                    <th>ID</th>
                                    <th>BU</th>
                                    <th>TGL INPUT</th>
                                    <th>TITLE</th>
                                    <th>TYPE</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td><button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button></td>
                                        <td>{item.req}</td>
                                        <td>{item.id}</td>
                                        <td>{item.bu}</td>
                                        <td>{item.tglInput}</td>
                                        <td>{item.title}</td>
                                        <td>{item.type}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateAnggaran;
