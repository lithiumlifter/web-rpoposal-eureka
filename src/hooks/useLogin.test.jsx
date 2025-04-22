import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useLogin } from './useLogin';
import * as authServices from '../services/authServices';

describe('useLogin', () => {
  const mockSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('berhasil login dan menyimpan token ke localStorage', async () => {
    const fakeToken = 'fake-token-123';
    
    vi.spyOn(authServices, 'login').mockResolvedValue({
      data: { token: fakeToken },
    });

    const { result } = renderHook(() => useLogin(mockSuccess));

    await act(async () => {
      await result.current.handleLogin('admin', 'password');
    });

    expect(localStorage.getItem('token')).toBe(fakeToken);
    expect(mockSuccess).toHaveBeenCalled();
    expect(result.current.error).toBe('');
  });

  it('gagal login karena token tidak ditemukan di response', async () => {
    vi.spyOn(authServices, 'login').mockResolvedValue({
      data: {},
    });

    const { result } = renderHook(() => useLogin(mockSuccess));

    await act(async () => {
      await result.current.handleLogin('admin', 'password');
    });

    expect(localStorage.getItem('token')).toBe(null);
    expect(result.current.error).toBe('Token tidak ditemukan dalam response.');
    expect(mockSuccess).not.toHaveBeenCalled();
  });

  it('gagal login karena error dari server', async () => {
    vi.spyOn(authServices, 'login').mockRejectedValue(new Error('Server error'));

    const { result } = renderHook(() => useLogin(mockSuccess));

    await act(async () => {
      await result.current.handleLogin('admin', 'wrong-password');
    });

    expect(localStorage.getItem('token')).toBe(null);
    expect(result.current.error).toBe('Server error');
    expect(mockSuccess).not.toHaveBeenCalled();
  });
});
