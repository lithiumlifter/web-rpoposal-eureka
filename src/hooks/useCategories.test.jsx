import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useCategories from './useCategories';
import CategoryService from '../services/admin/categoryServices';

vi.mock('../services/admin/categoryServices');

describe('useCategories', () => {
  const mockResponse = {
    bisnisUnit: ['Unit A'],
    roleUser: ['Admin'],
    dataWil: ['Wilayah 1'],
    ruangLingkup: ['Lingkup X'],
    dataKategori: ['Kategori Y'],
    dataTipe: ['Tipe Z'],
    dataOtorisasi: ['Otorisasi 1'],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('harus memuat data kategori dengan benar', async () => {
    CategoryService.getCategories.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.categories).toEqual(mockResponse);
    expect(result.current.error).toBe(null);
  });

  it('harus menangani error jika fetch gagal', async () => {
    const mockError = new Error('Gagal ambil data');
    CategoryService.getCategories.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(mockError);
    expect(result.current.categories).toEqual({
      bisnisUnit: [],
      roleUser: [],
      dataWil: [],
      ruangLingkup: [],
      dataKategori: [],
      dataTipe: [],
      dataOtorisasi: [],
    });
  });
});
