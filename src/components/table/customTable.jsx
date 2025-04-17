import DataTable from "react-data-table-component";
import { tableCustomStyles, rowConditionalStyles } from "./tableStyles";

const CustomTable = ({ columns, data, loading, ...rest }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationPerPage={10}
      paginationRowsPerPageOptions={[10, 25, 50, 100]}
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
