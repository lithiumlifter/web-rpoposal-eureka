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
          <option key={bu} value={bu}>
            BU {bu}
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
