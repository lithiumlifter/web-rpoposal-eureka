import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import userServices from "../../services/admin/userServices";

const SetupUser = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userServices.getUser();
                console.log("Response user data:", response);

                if (response.success && response.data?.data) {
                    setUserData(response.data.data);
                } else {
                    console.warn("Data tidak ditemukan:", response);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleSwitchChange = (index, field) => {
        setUserData(prevData => {
            return prevData.map((user, i) =>
                i === index ? { ...user, [field]: user[field] === 1 ? 0 : 1 } : user
            );
        });
    };

    const filteredData = userData.filter(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (user.role && user.role.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns = [
        { name: "User Name", selector: row => row.username, sortable: true },
        { name: "Empl Id", selector: row => row.id_user, sortable: true },
        { name: "Name", selector: row => row.name, sortable: true },
        {
            name: "Status",
            cell: row => (
                <div className="form-check form-switch d-flex justify-content-center">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={row.status === 1}
                        onChange={() => handleSwitchChange(userData.indexOf(row), "status")}
                        style={{ transform: "scale(1.3)" }}
                    />
                </div>
            ),
            center: true
        },
        {
            name: "Lihat Semua",
            cell: row => (
                <div className="form-check form-switch d-flex justify-content-center">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={row.lihat_semua === 1}
                        onChange={() => handleSwitchChange(userData.indexOf(row), "lihat_semua")}
                        style={{ transform: "scale(1.3)" }}
                    />
                </div>
            ),
            center: true
        },
        { name: "Level", selector: row => row.role || "-", sortable: true },
        { name: "BU", selector: row => row.bisnis_unit || "-", sortable: true },
        { name: "Wil", selector: row => row.wilayah || "-", sortable: true },
        {
            name: "Aksi",
            cell: () => (
                <button className="btn btn-sm btn-danger">X</button>
            ),
            center: true
        },
        {
            name: "Ubah Level",
            cell: row => (
                <div className="dropdown">
                    <button className="btn btn-sm btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        {row.role || "Pilih"}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item">Menu 1</a></li>
                        <li><a className="dropdown-item">Menu 2</a></li>
                        <li><a className="dropdown-item">Menu 3</a></li>
                    </ul>
                </div>
            ),
            center: true
        },
        {
            name: "Ubah Wilayah",
            cell: row => (
                <div className="dropdown">
                    <button className="btn btn-sm btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        {row.wilayah || "Pilih"}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item">Wilayah 1</a></li>
                        <li><a className="dropdown-item">Wilayah 2</a></li>
                        <li><a className="dropdown-item">Wilayah 3</a></li>
                    </ul>
                </div>
            ),
            center: true
        }
    ];

    return (
        <div className="card">
            <div className="card-body">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Cari..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <DataTable
                    columns={columns}
                    data={filteredData}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    responsive
                />
            </div>
        </div>
    );
};

export default SetupUser;
