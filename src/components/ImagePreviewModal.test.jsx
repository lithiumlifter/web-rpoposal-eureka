const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ImagePreviewModal from './ImagePreviewModal';
import '@testing-library/jest-dom';

describe('ImagePreviewModal', () => {
  const mockImages = [
    { link: 'https://example.com/image1.jpg' },
    { link: 'https://example.com/image2.jpg' },
  ];

  it('harus menampilkan modal dengan gambar aktif', () => {
    const setActiveIndex = vi.fn();
    render(
      <ImagePreviewModal
        isOpen={true}
        onClose={() => {}}
        images={mockImages}
        activeIndex={0}
        setActiveIndex={setActiveIndex}
      />
    );

    expect(screen.getByText('Preview Gambar')).toBeInTheDocument();
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Tutup/i })).toBeInTheDocument();
  });

  it('harus memanggil setActiveIndex saat tombol navigasi diklik', () => {
    const setActiveIndex = vi.fn();
    render(
      <ImagePreviewModal
        isOpen={true}
        onClose={() => {}}
        images={mockImages}
        activeIndex={0}
        setActiveIndex={setActiveIndex}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Selanjutnya/i }));
    fireEvent.click(screen.getByRole('button', { name: /Sebelumnya/i }));

    expect(setActiveIndex).toHaveBeenCalledTimes(2);
  });

  it('harus memanggil onClose saat tombol tutup diklik', () => {
    const onClose = vi.fn();
    render(
      <ImagePreviewModal
        isOpen={true}
        onClose={onClose}
        images={mockImages}
        activeIndex={0}
        setActiveIndex={() => {}}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Tutup/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
