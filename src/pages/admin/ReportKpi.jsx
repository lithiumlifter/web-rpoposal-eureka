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

const ReportKpi = () => {
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const data = [
        { noReg: "001", id: "OTR-001", bu: "50", date: "2025-03-12", title: "Approval Budget", type: "Finance", status: "Pending", view: "View", recPst: "Yes", aktPst: "No" },
        { noReg: "002", id: "OTR-002", bu: "51", date: "2025-03-13", title: "Marketing Proposal", type: "Marketing", status: "Approved", view: "View", recPst: "No", aktPst: "Yes" }
    ];

    const filteredData = data.filter(item =>
        (selectedLevel === "" || item.type === selectedLevel) &&
        (selectedDate === "" || item.date === selectedDate) &&
        ((fromDate === "" && toDate === "") || (item.date >= fromDate && item.date <= toDate))
    );

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex gap-2 mb-3 align-items-center flex-wrap">
                         By Date<input type="date" className="form-control w-auto" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} onClick={(e) => e.target.showPicker()} />
                        <select className="form-control w-auto" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                            <option value="">Semua Level</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                        From <input type="date" className="form-control w-auto" value={fromDate} onChange={(e) => setFromDate(e.target.value)} onClick={(e) => e.target.showPicker()} />
                        to <input type="date" className="form-control w-auto" value={toDate} onChange={(e) => setToDate(e.target.value)} onClick={(e) => e.target.showPicker()} />
                        <button className="btn btn-primary">Tampilkan</button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered first">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>REG</th>
                                    <th>ID</th>
                                    <th>TITLE</th>
                                    <th>TGGL RECIEVED</th>
                                    <th>TGGL OTORISASI</th>
                                    <th>JAM</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.noReg}</td>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.date}</td>
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

export default ReportKpi;