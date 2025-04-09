import DataTable from "react-data-table-component";
import { tableCustomStyles, rowConditionalStyles } from "./tableStyles";

const CustomTable = ({ columns, data, loading, ...rest }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationPerPage={10} // default: 10 rows per page
      paginationRowsPerPageOptions={[10, 25, 50, 100]} // pilihan jumlah rows
      highlightOnHover
      striped
      responsive
      persistTableHead
      customStyles={tableCustomStyles}
      conditionalRowStyles={rowConditionalStyles}
      {...rest}
    />
  );
};

export default CustomTable;
