// const OtorisationNotCompleted = () => {
//     return(
//         <>
//            <div className="card">
//                 <div className="card-body">
//                     <div className="table-responsive">
//                     <table className="table table-striped table-bordered first">
//                         <thead>
//                         <tr>
//                             <th>NO.REG</th>
//                             <th>ID</th>
//                             <th>BU</th>
//                             <th>DATE</th>
//                             <th>TITLE</th>
//                             <th>TYPE</th>
//                             <th>STATUS</th>
//                             <th>VIEW</th>
//                             <th>RECIEV PST</th>
//                             <th>AKT PST</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         <tr>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td>
//                             </td>
//                             <td>
//                             </td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td>
//                             </td>
//                             <td>
//                             </td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td></td>
//                             <td>
//                             </td>
//                         </tr>
//                         </tbody>
//                     </table>
//                     </div>
//                 </div>
//             </div>       
//         </>
//     );
// }

// export default OtorisationNotCompleted;

import { useState } from "react";

const OtorisationNotCompleted = () => {
    const [selectedBU, setSelectedBU] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [searchTitle, setSearchTitle] = useState("");

    const data = [
        { noReg: "001", id: "OTR-001", bu: "50", date: "2025-03-12", title: "Approval Budget", type: "Finance", status: "Pending", view: "View", recPst: "Yes", aktPst: "No" },
        { noReg: "002", id: "OTR-002", bu: "51", date: "2025-03-13", title: "Marketing Proposal", type: "Marketing", status: "Approved", view: "View", recPst: "No", aktPst: "Yes" }
    ];

    const filteredData = data.filter(item =>
        (selectedBU === "" || item.bu === selectedBU) &&
        (selectedLevel === "" || item.type === selectedLevel) &&
        (searchTitle === "" || item.title.toLowerCase().includes(searchTitle.toLowerCase()))
    );

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex gap-2 mb-3 align-items-center">
                        <input type="text" className="form-control w-auto" placeholder="Cari Title..." value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                        <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
                            <option value="">Semua BU</option>
                            <option value="50">BU 50</option>
                            <option value="51">BU 51</option>
                        </select>
                        <select className="form-control w-auto" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                            <option value="">Semua Level</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                        <button className="btn btn-primary">Tampilkan</button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered first">
                            <thead>
                                <tr>
                                    <th>NO.REG</th>
                                    <th>ID</th>
                                    <th>BU</th>
                                    <th>DATE</th>
                                    <th>TITLE</th>
                                    <th>TYPE</th>
                                    <th>STATUS</th>
                                    <th>VIEW</th>
                                    <th>RECIEV PST</th>
                                    <th>AKT PST</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.noReg}</td>
                                        <td>{item.id}</td>
                                        <td>{item.bu}</td>
                                        <td>{item.date}</td>
                                        <td>{item.title}</td>
                                        <td>{item.type}</td>
                                        <td>{item.status}</td>
                                        <td>{item.view}</td>
                                        <td>{item.recPst}</td>
                                        <td>{item.aktPst}</td>
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

export default OtorisationNotCompleted;
