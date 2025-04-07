import { useState, useEffect } from "react";
import OtorisasiServices from "../../services/admin/otorisasiServices";
import CategoryService from "../../services/admin/categoryServices";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const DetailLevelOtorisasi = () => {
    const { id_otorisasi } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const [initialData, setInitialData] = useState(null);
    // const [selectedBU, setSelectedBU] = useState("");
    // const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        id_otorisasi: "",
        id_level:"",
        jabatan: "",
        bisnis_unit: "",
        emplid: "",
        groupid: ""
    });

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await OtorisasiServices.getDetailOtorisasi(id_otorisasi);
                console.log("🔥 Detail Otorisasi:", res);
    
                if (res.success && res.data) {
                    const newData = {
                        id_otorisasi: res.data.id_otorisasi || "",
                        idLevel: res.data.idLevel?.toString() || "",
                        jabatan: res.data.nama_jabatan || "",
                        bisnis_unit: res.data.bisnis_unit || "",
                        emplid: res.data.emplid || "",
                        groupid: res.data.groupid || ""
                      };
                
                    setFormData(newData);
                    setInitialData(newData);
                }                
            } catch (error) {
                console.error("❌ Gagal fetch detail otorisasi:", error);
            }
        };
    
        if (id_otorisasi) fetchDetail();
    }, [id_otorisasi]);

    const isDataChanged = () => {
        if (!initialData) return false;
        return JSON.stringify(formData) !== JSON.stringify(initialData);
    };    

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryService.getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!isEditMode) return;
    
        if (!isDataChanged()) {
            alert("Tidak ada perubahan data.");
            return;
        }
    
        const isValidUser = categories?.dataUser?.some(item => item.value.toString() === formData.emplid.toString());
        const isValidBU = categories?.bisnisUnit?.some(item => item.value.toString() === formData.bisnis_unit.toString());
        const isValidGroup = categories?.dataGroup?.some(item => item.value.toString() === formData.groupid.toString());

    
        if (!isValidUser || !isValidBU || !isValidGroup) {
            alert("Data yang dipilih tidak valid.");
            return;
        }

        const payload = {
            id_otorisasi: parseInt(formData.id_otorisasi),
            id_level: parseInt(formData.id_level),
            jabatan: formData.jabatan,
            bisnis_unit: parseInt(formData.bisnis_unit),
            emplid: formData.emplid,
            groupid: parseInt(formData.groupid)
        };
    
        try {
            console.log("📦 Payload yang dikirim:", payload);
            await OtorisasiServices.editKonfigurasiOtorisasi(payload);
            alert("Data berhasil disimpan!");
            setIsEditMode(false);
            setInitialData(formData); // update data awal setelah berhasil simpan
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };
    
    

    return (
        <>
            {/* KONFIGURASI OTORITOR */}
            <div className="card">
                <div className="card-header text-start">A. EDIT KONFIGURASI OTORITOR</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label className="col-12 col-sm-3 col-form-label text-left">ID (5 Digit)</label>
                            <div className="col-12 col-sm-8 col-lg-8">
                                <input type="text" name="idLevel" value={formData.idLevel} onChange={handleChange} required className="form-control" readOnly/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-12 col-sm-3 col-form-label text-left">Nama Jabatan</label>
                            <div className="col-12 col-sm-8 col-lg-8">
                            <input
                                type="text"
                                name="jabatan"
                                value={formData.jabatan}
                                onChange={handleChange}
                                className="form-control"
                                readOnly={!isEditMode}
                                />
                            </div>
                        </div>

                        {/* <div className="form-group row">
                            <label className="col-12 col-sm-3 col-form-label text-left">Kode Karyawan</label>
                            <div className="col-12 col-sm-8 col-lg-8">
                                <select name="emplid" value={formData.emplid} onChange={handleChange} className="form-control" disabled={!isEditMode}>
                                    <option value="">Pilih...</option>
                                    {categories?.dataUser?.map(item => (
                                        <option key={item.value} value={item.value}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div> */}
                        <div className="form-group row">
                            <label className="col-12 col-sm-3 col-form-label text-left">Kode Karyawan</label>
                            <div className="col-12 col-sm-8 col-lg-8">
                                <div className="row">
                                    <div className="col-5">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.emplid}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-7">
                                        <select
                                            name="emplid"
                                            value={formData.emplid}
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
                            </div>
                        </div>


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

                    <div className="form-group row">
                            <label className="col-12 col-sm-3 col-form-label text-left">Group</label>
                            <div className="col-12 col-sm-8 col-lg-8">
                                <select name="groupid" value={formData.groupid} onChange={handleChange} className="form-control" disabled={!isEditMode}>
                                    <option value="">Pilih...</option>
                                    {categories?.dataGroup?.map(item => (
                                        <option key={item.value} value={item.value}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {isEditMode ? (
                            <>
                                <button type="submit" className="btn btn-primary me-2">Simpan</button>
                                <button type="button" className="btn btn-secondary" onClick={() => {
                                setFormData(initialData); // reset data ke awal
                                setIsEditMode(false);     // keluar dari mode edit
                                }}>
                                Batal
                                </button>
                            </>
                            ) : (
                            <button type="button" className="btn btn-warning" onClick={() => setIsEditMode(true)}>
                                Edit
                            </button>
                            )}
                    </form>
                </div>
            </div>
        </>


    );
};

export default DetailLevelOtorisasi;
