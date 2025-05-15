import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import AnggaranServices from "../../services/admin/anggaranServices";
import CustomTable from "../../components/table/customTable";
import CategoryService from "../../services/admin/categoryServices";
import TableFilterBar from "../../components/table/tableFilterBar";

const UpdateAnggaran = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedBU, setSelectedBU] = useState("");
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
    const [buOptions, setBuOptions] = useState([]);
    const [buMasterList, setBuMasterList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AnggaranServices.getAnggaran();
                setData(response.data.data);

                const categoryRes = await CategoryService.getCategories();
                const allBU = [];
    
                categoryRes.data.bisnisUnit.forEach(unit => {
                    allBU.push({ value: unit.value, label: unit.name });
                    unit.branch.forEach(branch => {
                        allBU.push({ value: branch.value, label: branch.name });
                    });
                });
    
                setBuMasterList(allBU);
    
                // Ambil value unik dari inbox
                const uniqueBUValues = [...new Set(response.data.data.map(item => item.bisnis_unit))];
    
                // Mapping value ke name
                const buOptions = uniqueBUValues.map(value => {
                    const match = allBU.find(bu => bu.value === value);
                    return {
                        value,
                        label: match ? match.label : `BU ${value}`,
                    };
                });
    
                setBuOptions(buOptions);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredData = data.filter(item =>
        (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
        (searchText === "" ||
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.type.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns = [
        {
          name: "VIEW",
          cell: (row) => (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                console.log("ID yang dikirim ke detail:", row.id);
                navigate(`/admin/updateanggaran/${row.id}`);
              }}
            >
              <i className="fas fa-edit" />
            </button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          width: "70px", // Lebar kecil
        },
        {
          name: "ID",
          selector: row => row.id,
          sortable: true,
          width: "100px",
        },
        // {
        //   name: "BU",
        //   selector: row => row.bisnis_unit,
        //   sortable: true,
        //   width: "80px",
        // },
         {
            name: "BU",
            selector: row => {
              const match = buMasterList.find(bu => bu.value === row.bisnis_unit);
              return match ? match.label : `BU ${row.bisnis_unit}`;
            },
            wrap: true,
            sortable: true,
            maxWidth: "200px",
            style: {
                textAlign: "left",
            }
        },  
        {
          name: "PRO DATE",
          selector: row => row.tgl_pengajuan,
          sortable: true,
          width: "120px",
        },
        {
          name: "TITLE",
          selector: row => row.title,
          sortable: true,
          grow: 3, // Biarkan TITLE yang membesar
          wrap: true, // Bungkus teks jika panjang
          style: {
            whiteSpace: "normal",
          },
        },
        {
          name: "TYPE",
          selector: row => row.type,
          sortable: true,
          width: "120px",
        },
      ];
      

    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="d-flex gap-2 mb-3 align-items-center">
                    {/* <select className="form-control w-auto" value={selectedBU} onChange={(e) => setSelectedBU(e.target.value)}>
                        <option value="">Semua BU</option>
                        <option value="50">BU 50</option>
                        <option value="51">BU 51</option>
                    </select>
                    <input
                        type="text"
                        className="form-control w-auto"
                        placeholder="Cari Title / Type..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    /> */}
                    <TableFilterBar
                        selectedBU={selectedBU}
                        setSelectedBU={setSelectedBU}
                        buOptions={buOptions}
                        searchText={searchText}
                        setSearchText={setSearchText}
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

export default UpdateAnggaran;
