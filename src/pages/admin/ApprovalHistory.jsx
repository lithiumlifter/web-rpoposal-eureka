import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApprovalHistoryServices from "../../services/admin/approvalHistoryServices";
import ConfirmationModal from "../../components/ConfirmationModal";
import CustomTable from "../../components/table/customTable";
import CategoryService from "../../services/admin/categoryServices";
import TableFilterBar from "../../components/table/tableFilterBar";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import updateStatusPusatServices from "../../services/admin/updateStatusPusatServices";

const ApprovalHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataApproval, setDataApproval] = useState([]);
  const [selectedBU, setSelectedBU] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [buMasterList, setBuMasterList] = useState([]);
  const [buOptions, setBuOptions] = useState([]);
  const emplid = localStorage.getItem("emplid");
  // const emplid = "P2121";

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "approve", label: "Approve" },
    { value: "pending", label: "Pending" },
    { value: "close", label: "Close" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ApprovalHistoryServices.getApprovalHistory(emplid);
        const fetchedData = response?.data?.data || [];
        setDataApproval(fetchedData);
      } catch (error) {
        console.error("Error fetching approval history:", error);
        showErrorToast(`Gagal mengambil data: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [emplid]);

  useEffect(() => {
    const fetchBU = async () => {
      try {
        const categoryRes = await CategoryService.getCategories();
        const allBU = [];
        categoryRes.data.bisnisUnit.forEach(unit => {
          allBU.push({ value: unit.value, label: unit.name });
          unit.branch.forEach(branch => {
            allBU.push({ value: branch.value, label: branch.name });
          });
        });
        setBuMasterList(allBU);
        setBuOptions(allBU);
      } catch (error) {
        console.error("Error fetching BU master:", error);
      }
    };

    fetchBU();
  }, []);

  const handleConfirm = async () => {
    try {
      await updateStatusPusatServices.closeProposalPusat(selectedItem?.id);
      showSuccessToast(`Proposal dengan ID ${selectedItem?.id} berhasil diclose.`);
      setDataApproval(prev => prev.filter(item => item.id !== selectedItem?.id));
    } catch (error) {
      showErrorToast(`Gagal close proposal: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsModalOpen(false);
      setSelectedItem(null);
    }
  };

  const handleCancelConfirm = async () => {
    try {
      await updateStatusPusatServices.cancelProposalPusat(selectedItem?.id);
      showSuccessToast(`Proposal dengan ID ${selectedItem?.id} berhasil di-cancel.`);
      setDataApproval(prev => prev.filter(item => item.id !== selectedItem?.id));
    } catch (error) {
      showErrorToast(`Gagal cancel proposal: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsCloseModalOpen(false);
      setSelectedItem(null);
    }
  };

  const filteredData = dataApproval.filter(item =>
    (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
    (selectedStatus === "" || item.status.toLowerCase() === selectedStatus.toLowerCase()) &&
    (searchText === "" ||
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.type.toLowerCase().includes(searchText.toLowerCase()))
  );

  const columns = [
    { name: "RL", selector: row => row.ruang_lingkup, sortable: true, maxWidth: "80px" },
    { name: "CAB", selector: row => row.reg_branch || "-", sortable: true, maxWidth: "80px" },
    { name: "PST", selector: row => row.reg || "-", sortable: true, maxWidth: "80px" },
    {
      name: "ID",
      selector: row => row.kode_proposal,
      sortable: true,
      maxWidth: "120px",
      wrap: true,
      style: { textAlign: "left", whiteSpace: "normal" }
    },
    {
      name: "BU",
      selector: row => {
        const match = buMasterList.find(bu => bu.value === row.bisnis_unit);
        return match ? match.label : `BU ${row.bisnis_unit}`;
      },
      sortable: true,
      wrap: true,
      maxWidth: "200px",
      style: {
        whiteSpace: "normal",
        fontSize: "12px",
        padding: "4px",
        textAlign: "left",
      }
    },
    { name: "DATE", selector: row => row.tgl_pengajuan, sortable: true, maxWidth: "120px" },
    {
      name: "TITLE",
      selector: row => row.title,
      sortable: true,
      grow: 2,
      wrap: true,
      style: { textAlign: "left", whiteSpace: "normal" }
    },
    { name: "TYPE", selector: row => row.type, sortable: true, maxWidth: "100px" },
    {
      name: "STATUS",
      selector: row => row.status,
      sortable: true,
      maxWidth: "120px",
      cell: row => {
        let badgeColor;
        let label = row.status;

        if (label.toLowerCase() === "approve") {
          badgeColor = "success";
        } else if (label.toLowerCase() === "pending") {
          badgeColor = "warning";
        } else if (label.toLowerCase() === "close") {
          badgeColor = "danger";
        } else {
          badgeColor = "secondary";
        }

        return (
          <span className={`badge fs-6 bg-${badgeColor}`}>
            {label}
          </span>
        );
      }
    },
    {
      name: "DETAIL",
      cell: row => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => navigate(`/admin/detailapprovalhistory/${row.id}`)}
          >
            <i className="fas fa-edit" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      maxWidth: "180px"
    },
  ];

  return (
    <div className="card">
      <div className="card-body p-0">
        <div className="d-flex gap-2 mb-3 align-items-center">
          <TableFilterBar
            selectedBU={selectedBU}
            setSelectedBU={setSelectedBU}
            buOptions={buOptions}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            statusOptions={statusOptions}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>
        <CustomTable
          columns={columns}
          data={filteredData}
          loading={loading}
        />
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Konfirmasi Aksi"
        message={`Apakah Anda yakin ingin close item dengan ID ${selectedItem?.id}?`}
        confirmText="Ya, Close"
        cancelText="Batal"
        theme="success"
      />

      <ConfirmationModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        onConfirm={handleCancelConfirm}
        title="Konfirmasi Tutup"
        message={`Apakah Anda yakin ingin cancel proposal dengan ID ${selectedItem?.id}?`}
        confirmText="Ya, Cancel"
        cancelText="Batal"
        theme="danger"
      />
    </div>
  );
};

export default ApprovalHistory;
