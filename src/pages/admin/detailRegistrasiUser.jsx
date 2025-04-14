import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userServices from "../../services/admin/userServices"; // pastikan ini benar
import CategoryService from "../../services/admin/categoryServices";

const DetailRegistrasiUser = () => {
    const { id_user } = useParams(); // ambil dari route
    const [initialData, setInitialData] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [categories, setCategories] = useState({});

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const detail = await userServices.getDetailUser(id_user);
    //             const data = detail.data;

    //             const newFormData = {
    //                 idLevel: data.id_user || "",
    //                 emplid: data.emplid || "",
    //                 bisnis_unit: data.bisnis_unit || "",
    //                 groupid: "", // belum ada di API
    //                 phone: data.phone || "",
    //                 email: data.email || "",
    //                 level: data.hakproposal || "",
    //                 user: data.username || "",
    //                 password: "", // kosongkan untuk keamanan
    //             };

    //             setFormData(newFormData);
    //             setInitialData(newFormData);
    //         } catch (err) {
    //             console.error("Gagal ambil detail user", err);
    //         }
    //     };

    //     const fetchCategories = async () => {
    //         try {
    //             const kategoriData = await CategoryService.getCategory();
    //             setCategories(kategoriData);
    //         } catch (err) {
    //             console.error("Gagal ambil kategori", err);
    //         }
    //     };

    //     fetchData();
    //     fetchCategories();
    // }, [id_user]);

    const [formData, setFormData] = useState({
        idLevel: "",
        emplid: "",
        name: "",
        bisnis_unit: "",
        wilid: "",
        phone: "",
        email: "",
        hakproposal: "",
        user: "",
        password: "",
    });
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userServices.getDetailUser(id_user);
                const data = response.data;
    
                const newFormData = {
                    idLevel: data.id_user || "",
                    emplid: data.emplid || "",
                    name: data.name || "",
                    bisnis_unit: data.bisnis_unit || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    hakproposal: data.hakproposal || "",
                    user: data.username || "",
                    wilid: data.wilid || "",
                    password: "",
                };
    
                setFormData(newFormData);
                setInitialData(newFormData);
            } catch (err) {
                console.error("Gagal ambil detail user", err);
            }
        };
    
        const fetchCategories = async () => {
            try {
                const kategoriData = await CategoryService.getCategories();
                // setCategories(kategoriData);
                setCategories(kategoriData.data);
            } catch (err) {
                console.error("Gagal ambil kategori", err);
            }
        };
    
        fetchData();
        fetchCategories();
    }, [id_user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    const bodyRequest = {
        id_user: formData.idLevel,
        emplid: formData.emplid,
        name: formData.name,
        bisnis_unit: formData.bisnis_unit,
        wilid: formData.wilid,
        phone: formData.phone,
        email: formData.email,
        hakproposal: formData.hakproposal,
        username: formData.user,
        password: formData.password,
    };

    console.log("ISI:", formData);

    try {
        const response = await userServices.updateUser(bodyRequest);
        console.log("Berhasil update:", response.data);
        alert("Data berhasil disimpan");
        setIsEditMode(false);
    } catch (err) {
        console.error("Gagal update:", err);
        alert("Gagal menyimpan data");
    }
};


    return (
         <>
            <div className="card">
                <div className="card-header text-start">A. REGISTRASI MEMBER</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                    {/* Employ ID */}
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">Employ ID (5 Digit)</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                        <input type="text" name="emplid" value={formData.emplid} onChange={handleChange} required className="form-control" readOnly />
                        </div>
                    </div>
                    
                    {/* Employ Name */}
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">Employ Name</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" readOnly />
                        </div>
                    </div>

                   {/* BU */}
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">BU</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                            <input
                                type="text"
                                name="bisnis_unit"
                                value={formData.bisnis_unit}
                                onChange={handleChange}
                                className="form-control"
                                readOnly
                            />
                        </div>
                    </div>

                   {/* Jabatan [AX] */}
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">Jabatan [AX]</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                            <input
                                type="text"
                                name="groupid"
                                value={formData.wilid}
                                onChange={handleChange}
                                className="form-control"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Phone [AX] */}
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">Phone [AX]</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" disabled={!isEditMode} />
                        </div>
                    </div>

                    {/* Email [AX] */}
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">Email [AX]</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" disabled={!isEditMode} />
                        </div>
                    </div>

                    {/* Level */}
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">Level</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                            {!isEditMode ? (
                            <input
                                type="text"
                                name="hakproposal"
                                value={formData.hakproposal}
                                className="form-control"
                                readOnly
                            />
                            ) : (
                            <select
                                name="hakproposal"
                                value={formData.hakproposal}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">
                                     {formData.hakproposal}
                                </option>
                                {categories?.roleUser?.map(item => (
                                <option key={item.value} value={item.value}>
                                    {item.name}
                                </option>
                                ))}
                            </select>
                            )}
                        </div>
                    </div>

                    {/* Password* */}
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">Password*</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" disabled={!isEditMode} required />
                        </div>
                    </div>

                    {/* Button */}
                    {isEditMode ? (
                        <div className="mt-3">
                        <button type="submit" className="btn btn-primary me-2">Simpan</button>
                        <button type="button" className="btn btn-secondary" onClick={() => {
                            setFormData(initialData);
                            setIsEditMode(false);
                        }}>
                            Batal
                        </button>
                        </div>
                    ) : (
                        <div className="mt-3">
                        <button type="button" className="btn btn-warning" onClick={() => setIsEditMode(true)}>Edit</button>
                        </div>
                    )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default DetailRegistrasiUser;
