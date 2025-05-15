import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import userServices from "../../services/admin/userServices";
import CategoryService from "../../services/admin/categoryServices";
import CustomTable from "../../components/table/customTable";
import { wrap } from "framer-motion";

const SetupUser = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await CategoryService.getCategories();
                if (data?.success && data?.data) {
                    setCategories({
                        level: data.data.roleUser,
                        wilayah: data.data.dataWil,
                    });
                } else {
                    console.warn("Kategori tidak ditemukan");
                }
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
    
        fetchCategories();
    }, []);
    
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

    const saveUserChanges = async (user) => {
        const existingUser = userData.find(u => u.id_user === user.id_user);
        const updatedUser = {
            id_user: String(user.id_user),
            status: user.status,
            lihatsemua: user.lihat_semua,
            wilid: user.wilayah || "",
            hakproposal: user.role || "",
            password: existingUser?.password || "password"
        };
    
        try {
            const response = await userServices.updateUser(updatedUser);
            if (response.success) {
                console.log("User updated:", updatedUser);
            } else {
                console.warn("Update gagal:", response);
            }
        } catch (error) {
            console.error("Gagal update user:", error);
        }
    };

    const handleSwitchChange = (index, field) => {
        const updatedUser = {
            ...userData[index],
            [field]: userData[index][field] === 1 ? 0 : 1
        };
    
        const updatedData = userData.map((user, i) =>
            i === index ? updatedUser : user
        );
    
        setUserData(updatedData);
        saveUserChanges(updatedUser);
    };
    
    const handleLevelChange = (row, levelId) => {
        const updatedUser = { ...row, role: levelId };
        const updatedData = userData.map(user =>
            user.id_user === row.id_user ? updatedUser : user
        );
        setUserData(updatedData);
        saveUserChanges(updatedUser);
    };
    
    const handleWilayahChange = (row, wilayahId) => {
        const updatedUser = { ...row, wilayah: wilayahId };
        const updatedData = userData.map(user =>
            user.id_user === row.id_user ? updatedUser : user
        );
        setUserData(updatedData);
        saveUserChanges(updatedUser);
    };

    const filteredData = userData.filter(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (user.role && user.role.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns = [
        { name: "User Name", selector: row => row.username, sortable: true },
        { name: "Empl Id", selector: row => row.id_user, sortable: true },
        { name: "Name", 
            selector: row => row.name, 
            sortable: true,
            wrap: true,
            style: {
                textAlign: "left",
            } 
        },
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
        { name: "BU", 
            selector: row => row.bisnis_unit || "-", 
            sortable: true, 
            wrap: true,
            style: {
                textAlign: "left",
            }
        },
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
                        {categories.level && categories.level.map((level) => (
                            <li key={level.value}>
                                <a className="dropdown-item" onClick={() => handleLevelChange(row, level.value)}>
                                    {level.name}
                                </a>
                            </li>
                        ))}
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
                        {categories.wilayah && categories.wilayah.map((wilayah) => (
                            <li key={wilayah.value}>
                                <a className="dropdown-item" onClick={() => handleWilayahChange(row, wilayah.value)}>
                                    {wilayah.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ),
            center: true
        }
    ];

    return (
        <div className="card">
            <div className="card-body p-0">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Cari..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                {/* <DataTable
                    columns={columns}
                    data={filteredData}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    responsive
                /> */}
                <CustomTable
                    columns={columns}
                    data={filteredData}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default SetupUser;
