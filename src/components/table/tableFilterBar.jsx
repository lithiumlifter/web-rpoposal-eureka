import React from "react";

const TableFilterBar = ({
  selectedBU,
  setSelectedBU,
  buOptions,
  searchText,
  setSearchText,
}) => {
  return (
    <div className="d-flex gap-2 mb-3 align-items-center">
      <select
        className="form-control w-auto"
        value={selectedBU}
        onChange={(e) => setSelectedBU(e.target.value)}
      >
        <option value="">Semua BU</option>
        {buOptions.map((bu) => (
  <option key={bu.value} value={bu.value}>
    {bu.label}
  </option>
))}
      </select>
      <input
        type="text"
        className="form-control w-auto"
        placeholder="Cari Title / Type..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default TableFilterBar;

// import React from "react";

// const TableFilterBar = ({
//   selectedBU,
//   setSelectedBU,
//   buOptions,
//   selectedStatus,
//   setSelectedStatus,
//   statusOptions,
//   searchText,
//   setSearchText,
// }) => {
//   return (
//     <div className="d-flex gap-2 mb-3 align-items-center flex-wrap">
//       {/* Dropdown BU */}
//       <select
//         className="form-control w-auto"
//         value={selectedBU}
//         onChange={(e) => setSelectedBU(e.target.value)}
//       >
//         <option value="">Semua BU</option>
//         {buOptions.map((bu) => (
//           <option key={bu.value} value={bu.value}>
//             {bu.label}
//           </option>
//         ))}
//       </select>

//       {/* Dropdown Status */}
//       <select
//         className="form-control w-auto"
//         value={selectedStatus}
//         onChange={(e) => setSelectedStatus(e.target.value)}
//       >
//         {statusOptions.map((status) => (
//           <option key={status.value} value={status.value}>
//             {status.label}
//           </option>
//         ))}
//       </select>

//       {/* Search */}
//       <input
//         type="text"
//         className="form-control w-auto"
//         placeholder="Cari Title / Type..."
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//       />
//     </div>
//   );
// };

// export default TableFilterBar;
