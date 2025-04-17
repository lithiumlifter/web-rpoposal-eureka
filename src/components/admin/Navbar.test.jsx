import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../../components/admin/AdminNavbar';
import '@testing-library/jest-dom'; 
import { vi } from 'vitest';

// Mock ConfirmationModal component
vi.mock('../../components/ConfirmationModal.jsx', () => ({
  default: ({ isOpen, onClose, onConfirm }) => {
    return isOpen ? (
      <div data-testid="confirmation-modal">
        <button onClick={onConfirm}>Logout</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null;
  }
}));

// Mock useNavigate
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.setItem('name', 'Admin Test');
    localStorage.setItem('token', 'mock-token');
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('menampilkan nama pengguna di navbar', () => {
    render(<Navbar toggleSidebar={() => {}} />, { wrapper: MemoryRouter });
    expect(screen.getByText('Admin Test')).toBeInTheDocument();
  });

  test('menampilkan dropdown saat user di klik', () => {
    render(<Navbar toggleSidebar={() => {}} />, { wrapper: MemoryRouter });

    const dropdownToggle = screen.getByRole('link', { name: /admin test/i });
    fireEvent.click(dropdownToggle);

    expect(screen.getByText(/ubah password/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('navigasi ke ubah password', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={<Navbar toggleSidebar={() => {}} />} />
          <Route path="/admin/ubahpassword" element={<div>Halaman Ubah Password</div>} />
        </Routes>
      </MemoryRouter>
    );

    const dropdownToggle = screen.getByRole('link', { name: /admin test/i });
    fireEvent.click(dropdownToggle);

    const link = screen.getByText(/ubah password/i);
    fireEvent.click(link);

    expect(screen.getByText(/halaman ubah password/i)).toBeInTheDocument();
  });

  test('menampilkan modal konfirmasi saat logout di klik', () => {
    render(<Navbar toggleSidebar={() => {}} />, { wrapper: MemoryRouter });

    const dropdownToggle = screen.getByRole('link', { name: /admin test/i });
    fireEvent.click(dropdownToggle);

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    expect(screen.getByTestId('confirmation-modal')).toBeInTheDocument();
  });

  test('eksekusi logout dan redirect setelah konfirmasi', () => {
    render(<Navbar toggleSidebar={() => {}} />, { wrapper: MemoryRouter });

    const dropdownToggle = screen.getByRole('link', { name: /admin test/i });
    fireEvent.click(dropdownToggle);

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    const logoutButtons = screen.getAllByText('Logout');
    fireEvent.click(logoutButtons[1]);

    expect(localStorage.getItem('token')).toBeNull();
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
