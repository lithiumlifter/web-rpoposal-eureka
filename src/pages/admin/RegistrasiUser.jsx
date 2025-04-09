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
