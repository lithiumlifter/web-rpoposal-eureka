import { useState, useEffect } from "react";
import AllReportServices from "../../services/admin/allReportServices";
import CustomTable from "../../components/table/customTable";

const ReportToCabang = () => {
    const [searchText, setSearchText] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handlePrint = () => {
        localStorage.setItem("print-data-cabang", JSON.stringify(filteredData));
        window.open("/print-report-cabang", "_blank");
    };
      

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await AllReportServices.getReportCabang();
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
        (fromDate === "" || new Date(item.date?.receive_cabang) >= new Date(fromDate)) &&
        (toDate === "" || new Date(item.date?.receive_cabang) <= new Date(toDate))
    );    

    // const columns = [
    //     { name: "NO", selector: (row, index) => index + 1, width: "60px" },
    //     { name: "REG", selector: (row) => row.reg || "-", sortable: true, width: "80px" },
    //     { name: "REG BRANCH", selector: (row) => row.reg_branch || "-", sortable: true, width: "100px" },
    //     {
    //         name: "KODE PROPOSAL",
    //         selector: (row) => row.kode_proposal || "-",
    //         sortable: true,
    //         grow: 2,
    //         wrap: true,
    //         style: { whiteSpace: "normal" },
    //     },
    //     {
    //         name: "TITLE",
    //         selector: (row) => row.title || "-",
    //         sortable: true,
    //         grow: 3,
    //         wrap: true,
    //         style: { whiteSpace: "normal" },
    //     },
    //     {
    //         name: "RECEIVED CABANG",
    //         selector: (row) => row.date?.receive_cabang || "-",
    //         sortable: true,
    //         width: "150px"
    //     },
    //     {
    //         name: "RECEIVED PUSAT",
    //         selector: (row) => row.date?.receive_pusat || "-",
    //         sortable: true,
    //         width: "150px"
    //     },
    //     {
    //         name: "PENGAJUAN",
    //         selector: (row) => row.date?.pengajuan || "-",
    //         sortable: true,
    //         width: "130px"
    //     },
    //     {
    //         name: "PROPOSAL",
    //         selector: (row) => row.date?.proposal || "-",
    //         sortable: true,
    //         width: "130px"
    //     },
    //     {
    //         name: "STATUS",
    //         selector: (row) => row.status || "-",
    //         sortable: true,
    //         width: "120px"
    //     },
    //     {
    //         name: "JAM",
    //         selector: (row) => row.jam || "-",
    //         sortable: true,
    //         width: "80px"
    //     }
    // ];    

    const columns = [
        { name: "NO", selector: (row, index) => index + 1, width: "60px" },
        { name: "TGL", selector: (row) => row.date?.receive_cabang || "-", width: "120px" },
        { name: "ID", selector: (row) => row.kode_proposal || "-", width: "180px" },
        { name: "TITLE", selector: (row) => row.title || "-", wrap: true, grow: 3 },
        { name: "MGR PST", selector: (row) => row.approve?.oto_mgr || "-", width: "100px" },
        { name: "AKT PST", selector: (row) => row.approve?.oto_akt || "-", width: "100px" },
        { name: "FIN", selector: (row) => row.approve?.oto_fin || "-", width: "80px" },
        { name: "AMD", selector: (row) => row.approve?.oto_amd || "-", width: "80px" },
        { name: "DIR MKT", selector: (row) => row.approve?.oto_mkt || "-", width: "100px" },
        { name: "DIR UTM", selector: (row) => row.approve?.oto_ut || "-", width: "100px" },
        { name: "NO ARSIP", selector: (row) => row.no_arsip || "-", width: "100px" },
        { name: "STATUS", selector: (row) => row.status || "-", width: "120px" },
        { name: "TGL RECEIVED", selector: (row) => row.date?.receive_pusat || "-", width: "160px" },
        { name: "TGL OTORISASI AKT PST", selector: (row) => row.date?.otorisasi_akt || "-", width: "200px" },
        { name: "JAM", selector: (row) => row.jam || "0", width: "80px" },
    ];

    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
                    {/* Kiri: Filter */}
                    <div className="d-flex gap-2 flex-wrap align-items-center">
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
                    </div>

                    {/* Kanan: Tombol Print */}
                    <button
                        className="btn btn-warning d-flex align-items-center gap-2"
                        onClick={handlePrint}
                    >
                        <i className="fas fa-print"></i> Print
                    </button>
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

export default ReportToCabang;
