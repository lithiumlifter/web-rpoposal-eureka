// const RubahRuangLingkup = () => {
//     return (
//          <>
//               <div className="card">
//                     {/* <h5 className="card-header">Update Anggaran</h5> */}
//                     <div className="card-body">
//                         <div className="table-responsive">
//                         <table className="table table-striped table-bordered first">
//                             <thead>
//                             <tr>
//                                 <th>RL</th>
//                                 <th>REG1</th>
//                                 <th>REG2</th>
//                                 <th>ID</th>
//                                 <th>BU</th>
//                                 <th>DATE</th>
//                                 <th>TITLE</th>
//                                 <th>TYPE</th>
//                                 <th>RL</th>
//                                 <th>RUBAH</th>
//                                 <th>STATUS</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             <tr>
//                                     <td>
//                                         PST
//                                     </td>
//                                     <td>RB-8061</td>
//                                     <td>RB-8061</td>
//                                     <td>0314/MASTERDISKON/III/2025</td>
//                                     <td>50</td>
//                                     <td>2025-03-10 11:21:12</td>
//                                     <td>Surat Konfirmasi Issue Tiket Pesawat Peserta Tour Incentive West Europe</td>
//                                     <td>99.LAIN-LAIN</td>
//                                     <td>PST</td>
//                                     <td><button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button></td>
//                                     <td></td>
//                             </tr>
//                             <tr>
//                                     <td>
//                                         PST
//                                     </td>
//                                     <td>RB-8061</td>
//                                     <td>RB-8061</td>
//                                     <td>0314/MASTERDISKON/III/2025</td>
//                                     <td>50</td>
//                                     <td>2025-03-10 11:21:12</td>
//                                     <td>Surat Konfirmasi Issue Tiket Pesawat Peserta Tour Incentive West Europe</td>
//                                     <td>99.LAIN-LAIN</td>
//                                     <td>PST</td>
//                                     <td><button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button></td>
//                                     <td></td>
//                             </tr>
//                             </tbody>
//                         </table>
//                         </div>
//                     </div>
//                     </div>

//         </>
//     );
// }

// export default RubahRuangLingkup;

// import React, { useEffect, useState } from 'react';
// import RuangLingkupServices from '../../services/admin/ruangLingkupServices';

// const RubahRuangLingkup = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await RuangLingkupServices.getRuangLingkup();
//                 setData(response.data.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="card">
//             <div className="card-body">
//                 <div className="table-responsive">
//                     <table className="table table-striped table-bordered first">
//                         <thead>
//                             <tr>
//                                 <th>RL</th>
//                                 <th>REG1</th>
//                                 <th>REG2</th>
//                                 <th>ID</th>
//                                 <th>BU</th>
//                                 <th>DATE</th>
//                                 <th>TITLE</th>
//                                 <th>TYPE</th>
//                                 <th>RL</th>
//                                 <th>RUBAH</th>
//                                 <th>STATUS</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data.map((item) => (
//                                 <tr key={item.id}>
//                                     <td>{item.ruang_lingkup}</td>
//                                     <td>{item.reg_branch || '-'}</td>
//                                     <td>{item.reg || '-'}</td>
//                                     <td>{item.kode_proposal}</td>
//                                     <td>{item.bisnis_unit}</td>
//                                     <td>{item.tgl_pengajuan}</td>
//                                     <td>{item.title}</td>
//                                     <td>{item.type}</td>
//                                     <td>{item.ruang_lingkup}</td>
//                                     <td>
//                                         <button className="btn btn-primary" type="button">
//                                             <i className="fas fa-edit" />
//                                         </button>
//                                     </td>
//                                     <td>{item.status}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RubahRuangLingkup;

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import RuangLingkupServices from "../../services/admin/ruangLingkupServices";
import CustomTable from "../../components/table/customTable";

const RubahRuangLingkup = () => {
    const [data, setData] = useState([]);
    const [selectedBU, setSelectedBU] = useState("");
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RuangLingkupServices.getRuangLingkup();
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // handle ubah ruang lingkup
    // const handleRubahClick = async (id, currentRuangLingkup) => {
    //     const newRuangLingkup = currentRuangLingkup === "PST" ? "CAB" : "PST";
    //     try {
    //         const response = await RuangLingkupServices.submitRubahRuangLingkup({
    //             id_anggaran: id,
    //             ruang_lingkup: newRuangLingkup
    //         });
    //         console.log('Response:', response);
    //     } catch (error) {
    //         console.error('Error submitting perubahan ruang lingkup:', error);
    //     }
    // };
    // handle ubah ruang lingkup
    const handleRubahClick = async (id, currentRuangLingkup) => {
        const newRuangLingkup = currentRuangLingkup === "PST" ? "CAB" : "PST";
        try {
            const response = await RuangLingkupServices.submitRubahRuangLingkup({
                id_anggaran: id,
                ruang_lingkup: newRuangLingkup
            });
            console.log('Response:', response);
            
            // Update state tanpa refresh halaman
            setData(prevData => 
                prevData.map(item => 
                    item.id === id ? { ...item, ruang_lingkup: newRuangLingkup } : item
                )
            );
        } catch (error) {
            console.error('Error submitting perubahan ruang lingkup:', error);
        }
    };

    const filteredData = data.filter((item) =>
        (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
        (searchText === "" ||
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.type.toLowerCase().includes(searchText.toLowerCase()) ||
            item.kode_proposal.toLowerCase().includes(searchText.toLowerCase()))
    ).map((item, index) => ({ ...item, no: index + 1 }));

    const columns = [
        { name: "NO", selector: row => row.no, sortable: true, width: "70px" },
        { name: "RL", selector: row => row.ruang_lingkup, sortable: true, width: "70px" },
        { name: "REG1", selector: row => row.reg, sortable: true, width: "100px" },
        { name: "REG2", selector: row => row.reg_branch, sortable: true, width: "100px" },
        { name: "ID", selector: row => row.kode_proposal, sortable: true },
        { name: "BU", selector: row => row.bisnis_unit, sortable: true, width: "70px" },
        { name: "DATE", selector: row => row.tgl_pengajuan, sortable: true },
        { name: "TITLE", selector: row => row.title, sortable: true },
        { name: "TYPE", selector: row => row.type, sortable: true },
        { name: "RL", selector: row => row.ruang_lingkup, sortable: true, width: "60px" },
        {
            name: "RUBAH",
            cell: (row) => {
                return (
                    <button
                        className="btn btn-primary"
                        onClick={() => handleRubahClick(row.id, row.ruang_lingkup)}
                    >
                         <i className="fas fa-redo" />
                    </button>
                );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "100px"
        },        
        { name: "STATUS", selector: row => row.status, sortable: true },
    ];

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex gap-2 mb-3 align-items-center">
                    <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
                        <option value="">Semua BU</option>
                        <option value="50">BU 50</option>
                        <option value="51">BU 51</option>
                    </select>
                    <input
                        type="text"
                        className="form-control w-auto"
                        placeholder="Cari Title / Type / ID..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                
                <CustomTable
                columns={columns}
                data={filteredData}
                loading={loading}
                />

                {/* <DataTable
                    columns={columns}
                    data={filteredData}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                    persistTableHead
                /> */}
            </div>
        </div>
    );
};

export default RubahRuangLingkup;
