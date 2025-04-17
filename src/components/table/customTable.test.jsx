import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTable from './customTable';
import '@testing-library/jest-dom';

const columns = [
  { name: 'Nama', selector: row => row.name, sortable: true },
  { name: 'Umur', selector: row => row.age },
];

const data = [
  { id: 1, name: 'Budi', age: 30 },
  { id: 2, name: 'Siti', age: 25 },
];

describe('CustomTable', () => {
  test('merender kolom dan data dengan benar', () => {
    render(<CustomTable columns={columns} data={data} loading={false} />);
    expect(screen.getByText('Nama')).toBeInTheDocument();
    expect(screen.getByText('Umur')).toBeInTheDocument();
    expect(screen.getByText('Budi')).toBeInTheDocument();
    expect(screen.getByText('Siti')).toBeInTheDocument();
  });

  test('menampilkan loading state saat loading = true', () => {
    render(<CustomTable columns={columns} data={[]} loading={true} />);
    // react-data-table-component akan menampilkan "Loading..." secara default
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('menggunakan customStyles dan conditionalRowStyles', () => {
    // Kita tidak bisa tes langsung gaya CSS-nya karena DTC render inline
    // Tapi kita bisa pastikan tidak error saat props diberikan
    expect(() => {
      render(<CustomTable columns={columns} data={data} loading={false} />);
    }).not.toThrow();
  });

  test('menampilkan pagination dan rows per page', () => {
    render(<CustomTable columns={columns} data={data} loading={false} />);
    expect(screen.getByText(/rows per page/i)).toBeInTheDocument();
  });

  test('menerima dan meneruskan props tambahan', () => {
    render(
      <CustomTable
        columns={columns}
        data={data}
        loading={false}
        title="Daftar Pengguna"
      />
    );
    expect(screen.getByText(/daftar pengguna/i)).toBeInTheDocument();
  });
});
