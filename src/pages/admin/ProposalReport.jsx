import { useState, useEffect } from "react";
import AllReportServices from "../../services/admin/allReportServices";
import { useNavigate } from "react-router-dom"; 
import CustomTable from "../../components/table/customTable";

const ProposalReport = () => {
    const navigate = useNavigate();
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    
    const formatDate = (date) => date.toISOString().split("T")[0];
    const [filters, setFilters] = useState({
        keyword: "",
        fromDate: formatDate(threeMonthsAgo),
        toDate: formatDate(today),
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await AllReportServices.getProposalReport(filters);
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

    // const columns = [
    //     { name: "NO", selector: (_, index) => index + 1, width: "60px", wrap: true },
    //     {
    //         name: "REG",
    //         selector: row => (
    //           <div style={{ whiteSpace: 'pre-line' }}>
    //             {`${row.reg_branch || "-"}\n${row.reg || "-"}`}
    //           </div>
    //         ),
    //         maxWidth: "120px",
    //         wrap: true
    //     },          
    //     { name: "PROPOSAL", selector: row => row.kode_proposal || "-", maxWidth: "130px", wrap: true },
    //     { name: "TITLE", selector: row => row.title || "-", grow: 2, wrap: true },
    //     { name: "BU", selector: row => row.bisnis_unit || "-", maxWidth: "70px", wrap: true },
    //     {
    //       name: "VIEW",
    //       cell: row => (
    //         <button className="btn btn-success btn-sm" onClick={() => navigate(`/admin/proposalreport/${row.id}`)}>
    //           <i className="fas fa-search" />
    //         </button>
    //       ),
    //       ignoreRowClick: true,
    //       allowOverflow: true,
    //       button: true,
    //       maxWidth: "70px"
    //     },
    //     { name: "RECV", selector: row => row.date?.receive_cabang || "-", maxWidth: "120px", wrap: true },
    //     { name: "MGRCAB", selector: () => "-", maxWidth: "90px", wrap: true },
    //     { name: "KADEPT", selector: () => "-", maxWidth: "90px", wrap: true },
    //     { name: "AKTCAB", selector: () => "-", maxWidth: "90px", wrap: true },
    //     { name: "KACAB", selector: () => "-", maxWidth: "90px", wrap: true },
    //     { name: "MGRPST", selector: () => "-", maxWidth: "90px", wrap: true },
    //     { name: "AKTPST", selector: () => "-", maxWidth: "90px", wrap: true },
    //     { name: "FIN", selector: () => "-", maxWidth: "80px", wrap: true },
    //     { name: "AMD", selector: () => "-", maxWidth: "80px", wrap: true },
    //     { name: "DIRMKT", selector: () => "-", maxWidth: "90px", wrap: true },
    //     { name: "DIRUTM", selector: () => "-", maxWidth: "90px", wrap: true },
    //     { name: "STATUS", selector: row => row.status || "-", maxWidth: "100px", wrap: true },
    //     { name: "USER", selector: row => row.user || "-", maxWidth: "100px", wrap: true }
    //   ];
      
    const columns = [
        { 
          name: "NO", 
          selector: (_, index) => index + 1, 
          width: "60px", 
          wrap: true, 
          style: { textAlign: "left" }
        },
        {
          name: "REG",
          selector: row => (
            <div style={{ whiteSpace: 'pre-line' }}>
              {`${row.reg_branch || "-"}\n${row.reg || "-"}`}
            </div>
          ),
          maxWidth: "120px",
          wrap: true,
          style: { textAlign: "left" }
        },
        { 
          name: "PROPOSAL", 
          selector: row => row.kode_proposal || "-", 
          maxWidth: "130px", 
          wrap: true, 
          style: { textAlign: "left" }
        },
        { 
          name: "TITLE", 
          selector: row => row.title || "-", 
          grow: 2, 
          wrap: true, 
          style: { textAlign: "left" }
        },
        { 
          name: "BU", 
          selector: row => row.bisnis_unit || "-", 
          maxWidth: "70px", 
          wrap: true, 
          style: { textAlign: "left" }
        },
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
          maxWidth: "70px",
          style: { textAlign: "left" }
        },
        { name: "RECV", selector: row => row.date?.receive_cabang || "-", maxWidth: "120px", wrap: true, style: { textAlign: "left" } },
        { name: "MGRCAB", selector: () => "-", maxWidth: "90px", wrap: true, style: { textAlign: "left" } },
        { name: "KADEPT", selector: () => "-", maxWidth: "90px", wrap: true, style: { textAlign: "left" } },
        { name: "AKTCAB", selector: () => "-", maxWidth: "90px", wrap: true, style: { textAlign: "left" } },
        { name: "KACAB", selector: () => "-", maxWidth: "90px", wrap: true, style: { textAlign: "left" } },
        { name: "MGRPST", selector: () => "-", maxWidth: "90px", wrap: true, style: { textAlign: "left" } },
        { name: "AKTPST", selector: () => "-", maxWidth: "90px", wrap: true, style: { textAlign: "left" } },
        { name: "FIN", selector: () => "-", maxWidth: "80px", wrap: true, style: { textAlign: "left" } },
        { name: "AMD", selector: () => "-", maxWidth: "80px", wrap: true, style: { textAlign: "left" } },
        { name: "DIRMKT", selector: () => "-", maxWidth: "90px", wrap: true, style: { textAlign: "left" } },
        { name: "DIRUTM", selector: () => "-", maxWidth: "90px", wrap: true, style: { textAlign: "left" } },
        { name: "STATUS", selector: row => row.status || "-", maxWidth: "100px", wrap: true, style: { textAlign: "left" } },
        { name: "USER", selector: row => row.user || "-", maxWidth: "100px", wrap: true, style: { textAlign: "left" } }
      ];
      
    return (
        <div className="card">
            <div className="card-body p-0">
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
            </div>
        </div>
    );
};

export default ProposalReport;
