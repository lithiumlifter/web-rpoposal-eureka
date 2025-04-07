import DataTable from "react-data-table-component";
import { tableCustomStyles, rowConditionalStyles } from "./tableStyles";

const CustomTable = ({ columns, data, loading, ...rest }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
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
