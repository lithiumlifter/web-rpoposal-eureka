// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const DetailProposalCabang = ({ id_proposal }) => {
//   const [proposal, setProposal] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDetailProposal = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${BASE_URL}/master/detail-proposal?id_proposal=${id_proposal}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setProposal(response.data.data);
//       } catch (err) {
//         setError(err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetailProposal();
//   }, [id_proposal]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {JSON.stringify(error)}</p>;

//   return (
//     <>
//       <div className="card">
//         <div className="card-header text-start">Master</div>
//         <div className="card-body">
//           <form id="validationform" data-parsley-validate noValidate>
//             <div className="form-group row">
//               <label className="col-12 col-sm-3 col-form-label text-left">Tanggal Proposal:</label>
//               <div className="col-12 col-sm-8 col-lg-8">
//                 <input type="text" className="form-control" value={proposal?.tgl_proposal || ''} readOnly />
//               </div>
//             </div>

//             <div className="form-group row">
//               <label className="col-12 col-sm-3 col-form-label text-left">Proposal ID:</label>
//               <div className="col-12 col-sm-8 col-lg-8">
//                 <input type="text" className="form-control" value={proposal?.kode_proposal || ''} readOnly />
//               </div>
//             </div>

//             <div className="form-group row">
//               <label className="col-12 col-sm-3 col-form-label text-left">Judul Proposal:</label>
//               <div className="col-12 col-sm-8 col-lg-8">
//                 <input type="text" className="form-control" value={proposal?.title || ''} readOnly />
//               </div>
//             </div>

//             <div className="form-group row">
//               <label className="col-12 col-sm-3 col-form-label text-left">Pemohon:</label>
//               <div className="col-12 col-sm-8 col-lg-8">
//                 <input type="text" className="form-control" value={proposal?.pemohon?.name || ''} readOnly />
//               </div>
//             </div>

//             <div className="form-group row">
//               <label className="col-12 col-sm-3 col-form-label text-left">Status:</label>
//               <div className="col-12 col-sm-8 col-lg-8">
//                 <input type="text" className="form-control" value={proposal?.status || ''} readOnly />
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DetailProposalCabang;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import DetailProposal from "../../services/admin/detailProposalServices";
// import CategoryService from "../../services/admin/categoryServices";


// const DetailProposalCabang = () => {
//   const { id_proposal } = useParams();
//   const [categories, setCategories] = useState([]);
//   const [proposal, setProposal] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await CategoryService.getCategories();
//         setCategories(response.data.bisnisUnit); // Pastikan response sesuai dengan struktur data
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (!id_proposal) return;

//     const fetchDetailProposal = async () => {
//       try {
//         setLoading(true);
//         const data = await DetailProposal.getDetailProposal(id_proposal);
//         setProposal(data.data);
//       } catch (err) {
//         setError(err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetailProposal();
//   }, [id_proposal]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {JSON.stringify(error)}</p>;

//   return (
//     <div className="card">
//       <div className="card-header text-start">Master</div>
//       <div className="card-body">
//         <form id="validationform" data-parsley-validate noValidate>
//           <div className="form-group row">
//             <label className="col-12 col-sm-3 col-form-label text-left">Tanggal Proposal:</label>
//             <div className="col-12 col-sm-8 col-lg-8">
//               <input type="text" className="form-control" value={proposal?.tgl_proposal || ""} readOnly />
//             </div>
//           </div>

//           <div className="form-group row">
//             <label className="col-12 col-sm-3 col-form-label text-left">Proposal ID:</label>
//             <div className="col-12 col-sm-8 col-lg-8">
//               <input type="text" className="form-control" value={proposal?.kode_proposal || ""} readOnly />
//             </div>
//           </div>

//           {/* BU */}
//           <div className="form-group row">
//             <label className="col-12 col-sm-3 col-form-label text-left">BU:</label>
//             <div className="col-12 col-sm-8 col-lg-8">
//               <select className="form-control" value={proposal?.bu || ""} readOnly>
//                 <option value="">Pilih BU</option>
//                 {categories.map((item) => (
//                   <option key={item.value} value={item.value}>
//                     {item.name} - {item.wilayah}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>


//           <div className="form-group row">
//             <label className="col-12 col-sm-3 col-form-label text-left">Judul Proposal:</label>
//             <div className="col-12 col-sm-8 col-lg-8">
//               <input type="text" className="form-control" value={proposal?.title || ""} readOnly />
//             </div>
//           </div>

//           <div className="form-group row">
//             <label className="col-12 col-sm-3 col-form-label text-left">Pemohon:</label>
//             <div className="col-12 col-sm-8 col-lg-8">
//               <input type="text" className="form-control" value={proposal?.pemohon?.name || ""} readOnly />
//             </div>
//           </div>

//           <div className="form-group row">
//             <label className="col-12 col-sm-3 col-form-label text-left">Status:</label>
//             <div className="col-12 col-sm-8 col-lg-8">
//               <input type="text" className="form-control" value={proposal?.status || ""} readOnly />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DetailProposalCabang;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailProposal from "../../services/admin/detailProposalServices";
import CategoryService from "../../services/admin/categoryServices";

const DetailProposalReport = () => {
  const [categories, setCategories] = useState({
    bisnisUnit: [],
    ruangLingkup: [],
    dataKategori: [],
    dataTipe: [],
    dataOtorisasi: [],
  });

  const { id_proposal } = useParams();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State untuk mode edit
  const [formData, setFormData] = useState({}); // State untuk menyimpan nilai input
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

  useEffect(() => {
    if (!id_proposal) return;

    const fetchDetailProposal = async () => {
      try {
        setLoading(true);
        const data = await DetailProposal.getDetailProposal(id_proposal);
        setProposal(data.data);
        setFormData(data.data); // Set nilai awal form
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailProposal();
  }, [id_proposal]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!proposal) return <p>Data tidak ditemukan</p>;

  // Handler untuk mengubah nilai input saat mode edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler untuk tombol Edit/Simpan
  const toggleEdit = () => {
    if (isEditing) {
      // Jika sedang dalam mode edit dan klik Simpan, update data ke state utama
      setProposal(formData);
    }
    setIsEditing(!isEditing); // Toggle mode edit
  };

  // COBA GAMBAR
  const fileList = [
    { id: 1, name: "file1.jpg", url: "/path/to/file1.jpg" },
    { id: 2, name: "file2.png", url: "/path/to/file2.png" },
  ];

  return (
    <>
          <div className="card">
      <div className="card-header text-start">Detail Proposal</div>
      <div className="card-body">
        <form id="validationform" data-parsley-validate noValidate>
          {/* Tanggal Proposal */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Tanggal Proposal:</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input
                type="text"
                name="tgl_proposal"
                className="form-control"
                value={formData.tgl_proposal}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Proposal ID */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Proposal ID:</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input
                type="text"
                name="kode_proposal"
                className="form-control"
                value={formData.kode_proposal}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Ruang Lingkup */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Ruang Lingkup:</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input
                type="text"
                name="ruang_lingkup"
                className="form-control"
                value={formData.ruang_lingkup}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group row">
              <label className="col-12 col-sm-3 col-form-label text-left">BU:</label>
              <div className="col-12 col-sm-8 col-lg-8">
                <select className="form-control" disabled={!isEditing}>
                  {categories.bisnisUnit.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name} - {item.wilayah}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-12 col-sm-3 col-form-label text-left">Ruang Lingkup:</label>
              <div className="col-12 col-sm-8 col-lg-8">
                <select className="form-control" disabled={!isEditing}>
                  {categories.ruangLingkup.map((item) => (
                    <option key={item.value} value={item.value}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-12 col-sm-3 col-form-label text-left">Kategori:</label>
              <div className="col-12 col-sm-8 col-lg-8">
                <select className="form-control" disabled={!isEditing}>
                  {categories.dataKategori.map((item) => (
                    <option key={item.value} value={item.value}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>

          {/* Kategori */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Kategori:</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input
                type="text"
                name="kategori"
                className="form-control"
                value={formData.kategori}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Bisnis Unit */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Bisnis Unit:</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input
                type="text"
                name="bisnis_unit"
                className="form-control"
                value={formData.bisnis_unit}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Judul Proposal */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Judul Proposal:</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Deskripsi */}
          {/* <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Deskripsi:</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <textarea
                name="description"
                className="form-control"
                value={formData.description}
                readOnly={!isEditing}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div> */}

          {/* Status */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Status:</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input
                type="text"
                name="status"
                className="form-control"
                value={formData.status}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Pemohon */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Pemohon:</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input
                type="text"
                name="pemohon"
                className="form-control"
                value={formData.pemohon?.name}
                readOnly
              />
            </div>
          </div>

          {/* Tanggal Pengajuan */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Tanggal Pengajuan:</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input
                type="text"
                name="tgl_pengajuan"
                className="form-control"
                value={formData.tgl_pengajuan}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Tombol Edit / Simpan */}
          <div className="form-group row mt-3">
            <div className="col-12 text-center">
              {/* <button type="button" className="btn btn-primary" onClick={toggleEdit}>
                {isEditing ? "Simpan" : "Edit"}
              </button> */}
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className="card mt-3">
              <div className="card-header text-start">H. BIAYA LAIN-LAIN</div>
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-12 col-sm-3 col-form-label text-left">Biaya lain-lain(rp):</label>
                  <div className="col-12 col-sm-8 col-lg-8">
                    <input
                      type="number"
                      className="form-control"
                      value={formData.biaya_lain}
                      readOnly
                      // onChange={(e) => setCustomNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
      </div>

      {/* F. CATATAN */}
      <div className="card mt-3">
        <div className="card-header text-start">F. CATATAN</div>
        <div className="card-body">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Masukkan catatan..."
            value={formData.description}
            readOnly
          ></textarea>
        </div>
      </div>

      {/* G. LAMPIRAN */}
      <div className="card mt-3">
        <div className="card-header text-start">G. LAMPIRAN</div>
        <div className="card-body">
          <ul className="list-group">
            {fileList.map((file) => (
              <li key={file.id} className="list-group-item">
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* B. HISTORY */}
      <div className="card mt-3">
        <div className="card-header text-start">B. HISTORY</div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Position</th>
                <th>Description</th>
                <th>BY</th>
              </tr>
            </thead>
            <tbody>
              {proposal.history?.map((item) => (
              <tr key={item.id_history}>
                <td>{item.transdate}</td>
                <td>{item.status_position}</td>
                <td>{item.description}</td>
                <td>{item.name}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* C. OTORITOR */}
      <div className="card mt-3">
        <div className="card-header text-start">C. OTORITOR</div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Urutan No. Level</th>
                <th>EMPLID</th>
                <th>Otorisasi</th>
              </tr>
            </thead>
            <tbody>
            {proposal.otoritas?.map((item) => (
              <tr key={item.id_otorisasi}>
                <td>{item.urutan}</td>
                <td>{item.emplid +" " + item.name}</td>
                <td>{item.status}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DetailProposalReport;

// import { useEffect, useState } from "react";
// import CategoryService from "../../services/admin/categoryServices";

// const InputProposal = () => {
//   const [categories, setCategories] = useState({
//     bisnisUnit: [],
//     ruangLingkup: [],
//     dataKategori: [],
//     dataTipe: [],
//     dataOtorisasi: [],
//   });

//   const [isEditable, setIsEditable] = useState(false);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await CategoryService.getCategories();
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   return (
//     <>
//       <div className="card">
//         <div className="card-header text-start">Master</div>
//         <div className="card-body">
//           <form>
//             <div className="form-group row">
//               <label className="col-12 col-sm-3 col-form-label text-left">
//                 Tanggal:
//               </label>
//               <div className="col-12 col-sm-8 col-lg-8">
//                 <input type="date" required className="form-control" disabled={!isEditable} />
//               </div>
//             </div>

//             <div className="form-group row">
//               <label className="col-12 col-sm-3 col-form-label text-left">
//                 Proposal ID:
//               </label>
//               <div className="col-12 col-sm-8 col-lg-8">
//                 <input type="text" required className="form-control" disabled={!isEditable} />
//               </div>
//             </div>

//             <div className="form-group row">
//               <label className="col-12 col-sm-3 col-form-label text-left">BU:</label>
//               <div className="col-12 col-sm-8 col-lg-8">
//                 <select className="form-control" disabled={!isEditable}>
//                   {categories.bisnisUnit.map((item) => (
//                     <option key={item.value} value={item.value}>
//                       {item.name} - {item.wilayah}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="form-group row">
//               <label className="col-12 col-sm-3 col-form-label text-left">Ruang Lingkup:</label>
//               <div className="col-12 col-sm-8 col-lg-8">
//                 <select className="form-control" disabled={!isEditable}>
//                   {categories.ruangLingkup.map((item) => (
//                     <option key={item.value} value={item.value}>{item.name}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="form-group row">
//               <label className="col-12 col-sm-3 col-form-label text-left">Kategori:</label>
//               <div className="col-12 col-sm-8 col-lg-8">
//                 <select className="form-control" disabled={!isEditable}>
//                   {categories.dataKategori.map((item) => (
//                     <option key={item.value} value={item.value}>{item.name}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </form>
//           <button className="btn btn-secondary mt-3" onClick={() => setIsEditable(!isEditable)}>
//             {isEditable ? "Simpan" : "Edit"}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default InputProposal;
