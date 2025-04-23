import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useImagePreview from './useImagePreview';

describe('useImagePreview', () => {
  it('harus memiliki nilai awal default', () => {
    const { result } = renderHook(() => useImagePreview());

    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.activeIndex).toBe(0);
  });

  it('harus membuka modal dan mengatur index aktif', () => {
    const { result } = renderHook(() => useImagePreview());

    act(() => {
      result.current.openModal(3);
    });

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.activeIndex).toBe(3);
  });

  it('harus menutup modal', () => {
    const { result } = renderHook(() => useImagePreview());

    act(() => {
      result.current.openModal(1);
      result.current.closeModal();
    });

    expect(result.current.isModalOpen).toBe(false);
  });

  it('harus bisa mengatur modal dan index secara manual', () => {
    const { result } = renderHook(() => useImagePreview());

    act(() => {
      result.current.setIsModalOpen(true);
      result.current.setActiveIndex(5);
    });

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.activeIndex).toBe(5);
  });
});
