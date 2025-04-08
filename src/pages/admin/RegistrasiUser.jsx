// const RegistrasiUser = () => {
//     return(
//         <>
//              <div className="card">
//             <div className="card-body">
//                 <div className="table-responsive">
//                 <table className="table table-striped table-bordered first">
//                     <thead>
//                     <tr>
//                         <th>NO</th>
//                         <th></th>
//                         <th>EMPLID</th>
//                         <th>EMPLNAME</th>
//                         <th>DIMENSION</th>
//                         <th>EMAIL</th>
//                         <th>PHONE</th>
//                         <th>JABATAN</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td>1</td>
//                         <td><button className="btn" type="submit"><i className="fas fa-sign-out-alt" /></button></td>
//                         <td>B0011</td>
//                         <td>Fatukhurohman</td>
//                         <td>50</td>
//                         <td>fatkhurohman.01@erlangga.co.id</td>
//                         <td>082227617094</td>
//                         <td>AMD HUB.KELEMBAGAAN HUKUM</td>
//                     </tr>
//                     <tr>
//                         <td>2</td>
//                         <td><button className="btn" type="submit"><i className="fas fa-sign-out-alt" /></button></td>
//                         <td>B0011</td>
//                         <td>Fatukhurohman</td>
//                         <td>50</td>
//                         <td>fatkhurohman.01@erlangga.co.id</td>
//                         <td>082227617094</td>
//                         <td>AMD HUB.KELEMBAGAAN HUKUM</td>
//                     </tr>
//                     </tbody>
//                 </table>
//                 </div>
//             </div>
//             </div>
//         </>
//     );
// }

// export default RegistrasiUser;

// import React, { useEffect, useState } from 'react';
// import userServices from '../../services/admin/userServices';
// const RegistrasiUser = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await userServices.getUser();
//                 setUsers(res.data.data);
//             } catch (error) {
//                 console.error('Failed to load user data:', error);
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
//                                 <th>NO</th>
//                                 <th></th>
//                                 <th>EMPLID</th>
//                                 <th>EMPLNAME</th>
//                                 <th>DIMENSION</th>
//                                 <th>EMAIL</th>
//                                 <th>PHONE</th>
//                                 <th>JABATAN</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((user, index) => (
//                                 <tr key={user.id_user}>
//                                     <td>{index + 1}</td>
//                                     <td>
//                                         <button className="btn" type="button">
//                                             <i className="fas fa-sign-out-alt" />
//                                         </button>
//                                     </td>
//                                     <td>{user.emplid}</td>
//                                     <td>{user.name}</td>
//                                     <td>{user.wilayah || '-'}</td>
//                                     <td>{user.bisnis_unit}</td>
//                                     <td>{user.phone}</td>
//                                     <td>{user.role.toUpperCase()}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RegistrasiUser;

import React, { useEffect, useState } from 'react';
import userServices from '../../services/admin/userServices';
import CustomTable from '../../components/table/customTable';
import { useNavigate } from 'react-router-dom';

const RegistrasiUser = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userServices.getUser();
                setUsers(res.data.data);
            } catch (error) {
                console.error('Failed to load user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = users.filter(user =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
    );

    const columns = [
        {
            name: 'NO',
            selector: (row, index) => index + 1,
            width: '70px',
        },
        {
            name: '',
            cell: row => (
                <button
                    className="btn btn-info"
                    type="button"
                    onClick={() => navigate(`/detailregistrasiuser/${row.id_user}`)}
                >
                    <i className="fas fa-edit" />
                </button>
            ),
            width: '60px',
        },        
        {
            name: 'EMPLID',
            selector: row => row.emplid,
            sortable: true,
        },
        {
            name: 'EMPLNAME',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'DIMENSION',
            selector: row => row.wilayah || '-',
        },
        {
            name: 'EMAIL',
            selector: row => row.bisnis_unit,
        },
        {
            name: 'PHONE',
            selector: row => row.phone,
        },
        {
            name: 'JABATAN',
            selector: row => row.role.toUpperCase(),
        },
    ];

    return (
        <div className="card">
            <div className="card-body">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control form-control-sm w-50"
                        placeholder="Cari berdasarkan nama..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div>

                <CustomTable
                    columns={columns}
                    data={filteredData}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default RegistrasiUser;
