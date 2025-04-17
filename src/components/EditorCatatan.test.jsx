import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditorCatatan from './EditorCatatan';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('@ckeditor/ckeditor5-react', () => ({
  CKEditor: ({ data, onChange, disabled }) => (
    <textarea
      data-testid="mock-ckeditor"
      value={data}
      disabled={disabled}
      onChange={(e) => onChange({}, { getData: () => e.target.value })}
    />
  )
}));

describe('EditorCatatan', () => {
  test('merender label judul dan editor', () => {
    render(<EditorCatatan value="" onChange={() => {}} readOnly={false} />);
    expect(screen.getByText('F. CATATAN')).toBeInTheDocument();
    expect(screen.getByTestId('mock-ckeditor')).toBeInTheDocument();
  });

  test('menampilkan value awal dengan benar', () => {
    render(<EditorCatatan value="Isi awal" onChange={() => {}} readOnly={false} />);
    expect(screen.getByDisplayValue('Isi awal')).toBeInTheDocument();
  });

  test('memanggil onChange saat konten berubah', () => {
    const mockOnChange = vi.fn();
    render(<EditorCatatan value="" onChange={mockOnChange} readOnly={false} />);

    const editor = screen.getByTestId('mock-ckeditor');
    fireEvent.change(editor, { target: { value: 'Teks baru' } });

    expect(mockOnChange).toHaveBeenCalledWith('Teks baru');
  });

  test('editor dalam mode readOnly jika prop readOnly = true', () => {
    render(<EditorCatatan value="Readonly text" onChange={() => {}} readOnly={true} />);
    const editor = screen.getByTestId('mock-ckeditor');
    expect(editor).toBeDisabled();
  });
});
