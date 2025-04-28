import { useState, useEffect } from "react";
import AllReportServices from "../../services/admin/allReportServices";
import DataTable from "react-data-table-component";
import CustomTable from "../../components/table/customTable";

const ReportKpi = () => {
    const [searchText, setSearchText] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await AllReportServices.getReportKPI();
                setData(result.data.data || []);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredData = data.filter(item =>
        (searchText === "" ||
            item.reg?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.reg_branch?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.kode_proposal?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.title?.toLowerCase().includes(searchText.toLowerCase())
        ) &&
        (fromDate === "" || new Date(item.tgl_receive) >= new Date(fromDate)) &&
        (toDate === "" || new Date(item.tgl_receive) <= new Date(toDate))
    );

    const columns = [
        { name: "NO", selector: (row, index) => index + 1, width: "60px" },
        { name: "REG", selector: (row) => row.reg || "-", sortable: true, width: "80px" },
        { name: "REG BRANCH", selector: (row) => row.reg_branch || "-", sortable: true, width: "100px" },
        {
          name: "KODE PROPOSAL",
          selector: (row) => row.kode_proposal || "-",
          sortable: true,
          grow: 2,
          wrap: true,
          style: {
            whiteSpace: "normal",
          },
        },
        {
          name: "TITLE",
          selector: (row) => row.title || "-",
          sortable: true,
          grow: 3,
          wrap: true,
          style: {
            whiteSpace: "normal",
          },
        },
        { name: "TGL RECEIVED", selector: (row) => row.tgl_receive || "-", sortable: true, width: "120px" },
        { name: "TGL OTORISASI", selector: (row) => row.tgl_otorisasi || "-", sortable: true, width: "130px" },
        { name: "JAM", selector: (row) => row.jam || "-", sortable: true, width: "80px" },
      ];
      

    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="d-flex gap-2 mb-3 align-items-center flex-wrap">
                    <input
                        type="text"
                        className="form-control w-auto"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <span>From</span>
                    <input
                        type="date"
                        className="form-control w-auto"
                        value={fromDate}
                        onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                        onChange={(e) => setFromDate(e.target.value)}
                    />

                    <span>To</span>
                    <input
                        type="date"
                        className="form-control w-auto"
                        value={toDate}
                        onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                        onChange={(e) => setToDate(e.target.value)}
                    />

                    {/* <button className="btn btn-primary" onClick={() => setLoading(true)}>
                        Tampilkan
                    </button> */}
                </div>
                {/* <DataTable
                    columns={columns}
                    data={filteredData}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    pointerOnHover
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

export default ReportKpi;
