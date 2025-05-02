import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import updateStatusCabangServices from "../../services/admin/updateStatusCabangServices";
import ConfirmationModal from "../../components/ConfirmationModal";
import CustomTable from "../../components/table/customTable";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import TableFilterBar from "../../components/table/tableFilterBar";
import CategoryService from "../../services/admin/categoryServices";

const UpdateStatusCabang = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dataCabang, setDataCabang] = useState([]);
    const [selectedBU, setSelectedBU] = useState("");
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [buOptions, setBuOptions] = useState([]);
    const [buMasterList, setBuMasterList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await updateStatusCabangServices.getUpdateStatusCabangServices();
          const fetchedData = response?.data?.data || [];
          setDataCabang(fetchedData);
    
          // Ambil master list dari CategoryService
          const categoryRes = await CategoryService.getCategories();
          const allBU = [];
    
          categoryRes.data.bisnisUnit.forEach(unit => {
            allBU.push({ value: unit.value, label: unit.name });
            unit.branch.forEach(branch => {
              allBU.push({ value: branch.value, label: branch.name });
            });
          });
    
          setBuMasterList(allBU);
    
          const uniqueBU = [...new Set(fetchedData.map(item => item.bisnis_unit))];
          const buOptionsMapped = uniqueBU.map(value => {
            const match = allBU.find(bu => bu.value === value);
            return {
              value,
              label: match ? match.label : `BU ${value}`,
            };
          });
    
          setBuOptions(buOptionsMapped);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);
    
  

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        try {
            await updateStatusCabangServices.closeProposalCabang(selectedItem?.id);
            // alert(`Proposal dengan ID ${selectedItem?.id} berhasil di-approve.`);
            showSuccessToast(`Proposal dengan ID ${selectedItem?.id} berhasil diapprove.`);
            setDataCabang(prev => prev.filter(item => item.id !== selectedItem?.id));
        } catch (error) {
            // alert(`Gagal approve proposal: ${error.response?.data?.message || error.message}`);
            showErrorToast(`Gagal approve proposal: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsModalOpen(false);
            setSelectedItem(null);
        }
    };

    const handleCloseModal = (item) => {
        setSelectedItem(item);
        setIsCloseModalOpen(true);
    };

    const handleCloseConfirm = async () => {
        try {
            await updateStatusCabangServices.cancelProposalCabang(selectedItem?.id);
            // alert(`Proposal dengan ID ${selectedItem?.id} berhasil di-cancel.`);
            showSuccessToast(`Proposal dengan ID ${selectedItem?.id} berhasil dicancel.`)
            setDataCabang(prev => prev.filter(item => item.id !== selectedItem?.id));
        } catch (error) {
            // alert(`Gagal cancel proposal: ${error.response?.data?.message || error.message}`);
            showErrorToast(`Gagal cancel proposal: ${error.response?.data?.message || error.message}`)
        } finally {
            setIsCloseModalOpen(false);
            setSelectedItem(null);
        }
    };

    const filteredData = dataCabang.filter(item =>
        (selectedBU === "" || item.bisnis_unit.toString() === selectedBU) &&
        (searchText === "" ||
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.type.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns = [
        {
          name: "RL",
          selector: row => row.ruang_lingkup,
          sortable: true,
          wrap: true,
          width: "60px",
          style: {
            whiteSpace: "normal",
            overflow: "visible",
            textOverflow: "clip",
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "REG 1",
          selector: row => row.reg || "-",
          sortable: true,
          wrap: true,
          width: "70px",
          style: {
            whiteSpace: "normal",
            overflow: "visible",
            textOverflow: "clip",
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "REG 2",
          selector: row => row.reg_branch || "-",
          sortable: true,
          wrap: true,
          width: "70px",
          style: {
            whiteSpace: "normal",
            overflow: "visible",
            textOverflow: "clip",
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "ID",
          selector: row => row.kode_proposal,
          sortable: true,
          style: {
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "BU",
          selector: row => {
            const match = buMasterList.find(bu => bu.value === row.bisnis_unit);
            return match ? match.label : `BU ${row.bisnis_unit}`;
          },
          sortable: true,
          wrap: true,
          // width: "50px",
          maxWidth: "200px",
          style: {
            whiteSpace: "normal",
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "DATE",
          selector: row => row.tgl_pengajuan,
          sortable: true,
          wrap: true,
          width: "80px",
          style: {
            whiteSpace: "normal",
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "TITLE",
          selector: row => row.title,
          sortable: true,
          style: {
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "TYPE",
          selector: row => row.type,
          sortable: true,
          wrap: true,
          width: "100px",
          style: {
            whiteSpace: "normal",
            fontSize: "12px",
            padding: "4px",
          }
        },
        {
          name: "EDIT / VIEW",
          cell: row => (
            <button
              className="btn btn-warning btn-sm"
              onClick={() => navigate(`/admin/updatestatuscabang/${row.id}`)}
            >
              <i className="fas fa-edit" />
            </button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          width: "90px"
        },
        {
          name: "CANCEL",
          cell: row => (
            <button className="btn btn-danger btn-sm" onClick={() => handleCloseModal(row)}>
              <i className="fas fa-times" />
            </button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          width: "80px"
        },
        {
          name: "To PST",
          cell: row => (
            <button className="btn btn-success btn-sm" onClick={() => handleOpenModal(row)}>
              To PST
            </button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          width: "80px"
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
                message={`Apakah Anda yakin ingin mengonfirmasi item dengan ID ${selectedItem?.id}?`}
                confirmText="Ya, Kirim"
                cancelText="Batal"
                theme="success"
            />

            <ConfirmationModal
                isOpen={isCloseModalOpen}
                onClose={() => setIsCloseModalOpen(false)}
                onConfirm={handleCloseConfirm}
                title="Konfirmasi Cancel"
                message={`Apakah Anda yakin ingin cancel item dengan ID ${selectedItem?.id}?`}
                confirmText="Ya, Cancel"
                cancelText="Batal"
                theme="danger"
            />
        </div>
    );
};

export default UpdateStatusCabang;