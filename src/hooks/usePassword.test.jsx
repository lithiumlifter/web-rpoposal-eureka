import { renderHook, act } from '@testing-library/react';
import usePasswordForm from './usePassword';
import * as authServices from '../services/authServices';

vi.mock('../services/authServices', () => ({
  resetPassword: vi.fn(),
}));

describe('usePasswordForm', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  it('menampilkan pesan error jika token tidak ditemukan saat validasi', () => {
    const { result } = renderHook(() => usePasswordForm());

    act(() => {
      result.current.handleValidate({ preventDefault: () => {} });
    });

    expect(result.current.message).toBe('Token tidak ditemukan. Silakan login kembali.');
  });

  it('menampilkan error jika password kosong', () => {
    localStorage.setItem('token', 'dummy-token');

    const { result } = renderHook(() => usePasswordForm());

    act(() => {
      result.current.handleValidate({ preventDefault: () => {} });
    });

    expect(result.current.message).toBe('Password harus diisi!');
  });

  it('menampilkan error jika konfirmasi password kosong', () => {
    localStorage.setItem('token', 'dummy-token');

    const { result } = renderHook(() => usePasswordForm());

    act(() => {
      result.current.setPassword('password123');
    });

    act(() => {
      result.current.handleValidate({ preventDefault: () => {} });
    });

    expect(result.current.message).toBe('Konfirmasi password harus diisi!');
  });

  it('menampilkan error jika password dan konfirmasi tidak cocok', () => {
    localStorage.setItem('token', 'dummy-token');

    const { result } = renderHook(() => usePasswordForm());

    act(() => {
      result.current.setPassword('password123');
    });

    act(() => {
      result.current.setConfirmPassword('beda');
    });

    act(() => {
      result.current.handleValidate({ preventDefault: () => {} });
    });

    expect(result.current.message).toBe('Password dan konfirmasi password harus sama!');
  });

  it('menampilkan modal saat validasi berhasil', () => {
    localStorage.setItem('token', 'dummy-token');

    const { result } = renderHook(() => usePasswordForm());

    act(() => {
      result.current.setPassword('password123');
    });

    act(() => {
      result.current.setConfirmPassword('password123');
    });

    act(() => {
      result.current.handleValidate({ preventDefault: () => {} });
    });

    expect(result.current.showModal).toBe(true);
  });

  it('berhasil reset password dan mengosongkan field', async () => {
    localStorage.setItem('token', 'dummy-token');
    authServices.resetPassword.mockResolvedValue({ message: 'Berhasil' });

    const { result } = renderHook(() => usePasswordForm());

    act(() => {
      result.current.setPassword('password123');
      result.current.setConfirmPassword('password123');
      result.current.setShowModal(true);
    });

    await act(async () => {
      await result.current.handleConfirm();
    });

    expect(authServices.resetPassword).toHaveBeenCalled();
    expect(result.current.message).toBe('Berhasil');
    expect(result.current.password).toBe('');
    expect(result.current.confirmPassword).toBe('');
  });

  it('menangani error saat resetPassword gagal', async () => {
    localStorage.setItem('token', 'dummy-token');
    authServices.resetPassword.mockRejectedValue(new Error('Gagal reset'));

    const { result } = renderHook(() => usePasswordForm());

    act(() => {
      result.current.setPassword('password123');
      result.current.setConfirmPassword('password123');
      result.current.setShowModal(true);
    });

    await act(async () => {
      await result.current.handleConfirm();
    });

    expect(result.current.message).toBe('Gagal reset');
  });
});
