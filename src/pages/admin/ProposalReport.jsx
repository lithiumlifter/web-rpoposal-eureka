import { useState, useEffect } from "react";
import AllReportServices from "../../services/admin/allReportServices";
import { useNavigate } from "react-router-dom"; 
import DataTable from "react-data-table-component";
import CustomTable from "../../components/table/customTable";

const ProposalReport = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        keyword: "",
        fromDate: "",
        toDate: "",
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await AllReportServices.getReportCabang(filters);
                setData(result.data.data || []);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredData = data.filter(item =>
        (filters.keyword === "" ||
            item.reg?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            item.reg_branch?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            item.kode_proposal?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            item.title?.toLowerCase().includes(filters.keyword.toLowerCase())
        ) &&
        (filters.fromDate !== "" && filters.toDate !== "" ? 
            (new Date(item.date?.receive_cabang) >= new Date(filters.fromDate) && 
            new Date(item.date?.receive_cabang) <= new Date(filters.toDate)) 
            : true)
    );

    const columns = [
        { name: "NO", selector: (_, index) => index + 1, width: "60px", wrap: true },
        { name: "REG", selector: row => `${row.reg_branch || "-"}/${row.reg || "-"}`, maxWidth: "120px", wrap: true },
        { name: "PROPOSAL", selector: row => row.kode_proposal || "-", maxWidth: "130px", wrap: true },
        { name: "TITLE", selector: row => row.title || "-", grow: 2, wrap: true },
        { name: "BU", selector: row => row.bisnis_unit || "-", maxWidth: "70px", wrap: true },
        {
          name: "VIEW",
          cell: row => (
            <button className="btn btn-success btn-sm" onClick={() => navigate(`/admin/proposalreport/${row.id}`)}>
              <i className="fas fa-search" />
            </button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          maxWidth: "70px"
        },
        { name: "RECV", selector: row => row.date?.receive_cabang || "-", maxWidth: "120px", wrap: true },
        { name: "MGRCAB", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "KADEPT", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "AKTCAB", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "KACAB", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "MGRPST", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "AKTPST", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "FIN", selector: () => "-", maxWidth: "80px", wrap: true },
        { name: "AMD", selector: () => "-", maxWidth: "80px", wrap: true },
        { name: "DIRMKT", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "DIRUTM", selector: () => "-", maxWidth: "90px", wrap: true },
        { name: "STATUS", selector: row => row.status || "-", maxWidth: "100px", wrap: true },
        { name: "USER", selector: row => row.user || "-", maxWidth: "100px", wrap: true }
      ];
      
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex gap-2 mb-3 align-items-center flex-wrap">
                    <input
                        type="text"
                        className="form-control w-auto"
                        name="keyword"
                        placeholder="Search by REG, No Proposal, Title, or Status..."
                        value={filters.keyword}
                        onChange={handleFilterChange}
                    />

                    <span>From</span>
                    <input
                        type="date"
                        className="form-control w-auto"
                        name="fromDate"
                        value={filters.fromDate}
                        onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                        onChange={handleFilterChange}
                    />

                    <span>To</span>
                    <input
                        type="date"
                        className="form-control w-auto"
                        name="toDate"
                        value={filters.toDate}
                        onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                        onChange={handleFilterChange}
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
                    pointerOnHover
                    responsive
                /> */}
            </div>
        </div>
    );
};

export default ProposalReport;
