import { useEffect, useState } from "react";
import CategoryService from "../../services/admin/categoryServices";

const InputProposal = () => {
  const [categories, setCategories] = useState({
    bisnisUnit: [],
    roleUser: [],
    dataWil: [],
    ruangLingkup: [],
    dataKategori: [],
    dataTipe: [],
    dataOtorisasi: [],
  });

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
  return (
    <>
    <div className="card">
      <div className="card-header text-start">Master</div>
      <div className="card-body">
        <form id="validationform" data-parsley-validate noValidate>
          {/* Session */}
          {/* <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Session:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input
                type="text"
                required
                placeholder="Type something"
                className="form-control" readOnly
              />
            </div>
          </div> */}

          {/* Tanggal */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Tanggal:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
            <input
                type="date"
                required
                className="form-control"
                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            />

            </div>
          </div>

          {/* Proposal ID */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Proposal ID:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input
                type="text"
                required
                placeholder="Nomor Surat Proposal cabang/Pusat"
                className="form-control"
              />
            </div>
          </div>

          {/* BU */}
         <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              BU:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
              <select className="form-control">
              {categories.bisnisUnit.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name} - {item.wilayah}
                </option>
              ))}
              </select>
            </div>
          </div>

          {/* Ruang Lingkup */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Ruang Lingkup:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
              <select className="form-control">
                {categories.ruangLingkup.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Kategori */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Kategori:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
              <select className="form-control">
                  {categories.dataKategori.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Tanggal Proposal */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Tanggal Proposal:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
            <input
                type="date"
                required
                className="form-control"
                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            />  
            </div>
          </div>

          {/* Judul Proposal */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Judul Proposal:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input type="text" required className="form-control" />
            </div>
          </div>

          {/* Pemohon */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Pemohon:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input type="text" className="form-control" value="P1362" readOnly />
            </div>
          </div>

         {/* Type */}
         <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Type:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
            <select className="form-control">
                {categories.dataTipe.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Otorisasi */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Otorisasi:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
            <select className="form-control">
                {categories.dataOtorisasi.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tombol Simpan */}
          {/* <div className="form-group row">
            <div className="col-12 col-sm-8 col-lg-6 offset-sm-3">
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </div> */}
        </form>
      </div>
    </div>

    <div className="card">
      <div className="card-header text-start">G. Lampiran</div>
      <div className="card-body">
        <form id="validationform" data-parsley-validate noValidate>
          {/* 3 Kolom Email */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Cc Email to</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input type="email" required placeholder="Email 1" className="form-control" />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Cc Email to</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input type="email" required placeholder="Email 2" className="form-control" />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">Cc Email to</label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input type="email" required placeholder="Email 3" className="form-control" />
            </div>
          </div>

          {/* Upload Scan (Upload File) */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Upload Scan:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input type="file" className="form-control-file" />
            </div>
          </div>

          {/* Upload Photo Sekolah/Guru (Upload File) */}
          <div className="form-group row">
            <label className="col-12 col-sm-3 col-form-label text-left">
              Upload Foto Sekolah/Guru:
            </label>
            <div className="col-12 col-sm-8 col-lg-8">
              <input type="file" className="form-control-file" />
            </div>
          </div>

          {/* Tombol Simpan */}
          <div className="form-group row">
            <div className="col-12 col-sm-8 col-lg-8 offset-sm-3">
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default InputProposal;
