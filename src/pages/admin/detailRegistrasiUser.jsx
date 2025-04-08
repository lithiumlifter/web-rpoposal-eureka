// import { useState, useEffect } from "react";
// import OtorisasiServices from "../../services/admin/otorisasiServices";
// import CategoryService from "../../services/admin/categoryServices";
// import { Form } from "react-bootstrap";
// import { useParams } from "react-router-dom";

// const DetailRegistrasiUser = () => {

//     return (
//         <>
//             <div className="card">
//                 <div className="card-header text-start">A. REGISTRASI MEMBER</div>
//                 <div className="card-body">
//                     <form onSubmit={handleSubmit}>
//                     {/* Employ ID */}
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">Employ ID (5 Digit)</label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <input type="text" name="idLevel" value={formData.idLevel} onChange={handleChange} required className="form-control" readOnly />
//                         </div>
//                     </div>

//                     {/* Employ Name */}
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">Employ Name</label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <div className="row">
//                             <div className="col-5">
//                             <input type="text" className="form-control" value={formData.emplid} readOnly />
//                             </div>
//                             <div className="col-7">
//                             <select name="emplid" value={formData.emplid} onChange={handleChange} className="form-control" disabled={!isEditMode}>
//                                 <option value="">Pilih...</option>
//                                 {categories?.dataUser?.map(item => (
//                                 <option key={item.value} value={item.value}>{item.name}</option>
//                                 ))}
//                             </select>
//                             </div>
//                         </div>
//                         </div>
//                     </div>

//                     {/* BU */}
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">BU</label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <select name="bisnis_unit" value={formData.bisnis_unit} onChange={handleChange} className="form-control" disabled={!isEditMode}>
//                             <option value="">Pilih...</option>
//                             {categories?.bisnisUnit?.map(item => (
//                             <option key={item.value} value={item.value}>{item.name}</option>
//                             ))}
//                         </select>
//                         </div>
//                     </div>

//                     {/* Jabatan [AX] */}
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">Jabatan [AX]</label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <select name="groupid" value={formData.groupid} onChange={handleChange} className="form-control" disabled={!isEditMode}>
//                             <option value="">Pilih...</option>
//                             {categories?.dataGroup?.map(item => (
//                             <option key={item.value} value={item.value}>{item.name}</option>
//                             ))}
//                         </select>
//                         </div>
//                     </div>

//                     {/* Phone [AX] */}
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">Phone [AX]</label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" disabled={!isEditMode} />
//                         </div>
//                     </div>

//                     {/* Email [AX] */}
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">Email [AX]</label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" disabled={!isEditMode} />
//                         </div>
//                     </div>

//                     {/* Level */}
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">Level</label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <input type="text" name="level" value={formData.level} onChange={handleChange} className="form-control" disabled={!isEditMode} />
//                         </div>
//                     </div>

//                     {/* User */}
//                         <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">User</label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                             <select
//                             name="user"
//                             value={formData.user}
//                             onChange={handleChange}
//                             className="form-control"
//                             disabled={!isEditMode}
//                             >
//                             <option value="">Pilih...</option>
//                             {categories?.dataUser?.map(item => (
//                                 <option key={item.value} value={item.value}>{item.name}</option>
//                             ))}
//                             </select>
//                         </div>
//                         </div>


//                     {/* Password* */}
//                     <div className="form-group row">
//                         <label className="col-12 col-sm-3 col-form-label text-left">Password*</label>
//                         <div className="col-12 col-sm-8 col-lg-8">
//                         <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" disabled={!isEditMode} required />
//                         </div>
//                     </div>

//                     {/* Button */}
//                     {isEditMode ? (
//                         <div className="mt-3">
//                         <button type="submit" className="btn btn-primary me-2">Simpan</button>
//                         <button type="button" className="btn btn-secondary" onClick={() => {
//                             setFormData(initialData);
//                             setIsEditMode(false);
//                         }}>
//                             Batal
//                         </button>
//                         </div>
//                     ) : (
//                         <div className="mt-3">
//                         <button type="button" className="btn btn-warning" onClick={() => setIsEditMode(true)}>Edit</button>
//                         </div>
//                     )}
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default DetailRegistrasiUser;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userServices from "../../services/admin/userServices"; // pastikan ini benar
import OtorisasiServices from "../../services/admin/otorisasiServices";
import CategoryService from "../../services/admin/categoryServices";

const DetailRegistrasiUser = () => {
    const { id_user } = useParams(); // ambil dari route
    const [formData, setFormData] = useState({
        idLevel: "",
        emplid: "",
        bisnis_unit: "",
        groupid: "",
        phone: "",
        email: "",
        level: "",
        user: "",
        password: "",
    });

    const [initialData, setInitialData] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const detail = await userServices.getDetailUser(id_user);
                const data = detail.data;

                const newFormData = {
                    idLevel: data.id_user || "",
                    emplid: data.emplid || "",
                    bisnis_unit: data.bisnis_unit || "",
                    groupid: "", // belum ada di API
                    phone: data.phone || "",
                    email: data.email || "",
                    level: data.hakproposal || "",
                    user: data.username || "",
                    password: "", // kosongkan untuk keamanan
                };

                setFormData(newFormData);
                setInitialData(newFormData);
            } catch (err) {
                console.error("Gagal ambil detail user", err);
            }
        };

        const fetchCategories = async () => {
            try {
                const kategoriData = await CategoryService.getCategory();
                setCategories(kategoriData);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit data:", formData);
        // tambahkan logic simpan data di sini
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
                        <input type="text" name="idLevel" value={formData.idLevel} onChange={handleChange} required className="form-control" readOnly />
                        </div>
                    </div>

                    {/* Employ Name */}
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">Employ Name</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                        <div className="row">
                            <div className="col-5">
                            <input type="text" className="form-control" value={formData.emplid} readOnly />
                            </div>
                            <div className="col-7">
                            <select name="emplid" value={formData.emplid} onChange={handleChange} className="form-control" disabled={!isEditMode}>
                                <option value="">Pilih...</option>
                                {categories?.dataUser?.map(item => (
                                <option key={item.value} value={item.value}>{item.name}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* BU */}
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">BU</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                        <select name="bisnis_unit" value={formData.bisnis_unit} onChange={handleChange} className="form-control" disabled={!isEditMode}>
                            <option value="">Pilih...</option>
                            {categories?.bisnisUnit?.map(item => (
                            <option key={item.value} value={item.value}>{item.name}</option>
                            ))}
                        </select>
                        </div>
                    </div>

                    {/* Jabatan [AX] */}
                    <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">Jabatan [AX]</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                        <select name="groupid" value={formData.groupid} onChange={handleChange} className="form-control" disabled={!isEditMode}>
                            <option value="">Pilih...</option>
                            {categories?.dataGroup?.map(item => (
                            <option key={item.value} value={item.value}>{item.name}</option>
                            ))}
                        </select>
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
                        <input type="text" name="level" value={formData.level} onChange={handleChange} className="form-control" disabled={!isEditMode} />
                        </div>
                    </div>

                    {/* User */}
                        <div className="form-group row">
                        <label className="col-12 col-sm-3 col-form-label text-left">User</label>
                        <div className="col-12 col-sm-8 col-lg-8">
                            <select
                            name="user"
                            value={formData.user}
                            onChange={handleChange}
                            className="form-control"
                            disabled={!isEditMode}
                            >
                            <option value="">Pilih...</option>
                            {categories?.dataUser?.map(item => (
                                <option key={item.value} value={item.value}>{item.name}</option>
                            ))}
                            </select>
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
