import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ConfirmationModal from "./ConfirmationModal";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import '@testing-library/jest-dom'; 

describe("ConfirmationModal", () => {
  // Mock fungsi handler
  let onCloseMock;
  let onConfirmMock;

  // Setup sebelum setiap test
  beforeEach(() => {
    onCloseMock = vi.fn();
    onConfirmMock = vi.fn();
  });

  // Cleanup setelah test
  afterEach(() => {
    cleanup();
  });

  // Props default
  const defaultProps = {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
    title: "Hapus Data",
    message: "Apakah Anda yakin ingin menghapus data ini?",
    confirmText: "Hapus",
    cancelText: "Batal",
    theme: "danger",
  };

  it("tidak merender apa-apa jika isOpen = false", () => {
    const { container } = render(<ConfirmationModal {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("merender modal dengan teks yang sesuai", () => {
    render(<ConfirmationModal {...defaultProps} onClose={onCloseMock} onConfirm={onConfirmMock} />);

    expect(screen.getByText("Hapus Data")).toBeInTheDocument();
    expect(screen.getByText("Apakah Anda yakin ingin menghapus data ini?")).toBeInTheDocument();
    expect(screen.getByText("Hapus")).toBeInTheDocument();
    expect(screen.getByText("Batal")).toBeInTheDocument();
  });

  it("memanggil onClose saat tombol Batal ditekan", () => {
    render(<ConfirmationModal {...defaultProps} onClose={onCloseMock} onConfirm={onConfirmMock} />);
    fireEvent.click(screen.getByText("Batal"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("memanggil onConfirm saat tombol Konfirmasi ditekan", () => {
    render(<ConfirmationModal {...defaultProps} onClose={onCloseMock} onConfirm={onConfirmMock} />);
    fireEvent.click(screen.getByText("Hapus"));
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it("memanggil onClose saat tombol (X) ditekan", () => {
    render(<ConfirmationModal {...defaultProps} onClose={onCloseMock} onConfirm={onConfirmMock} />);
    const closeButton = screen.getByRole("button", { name: "" }); // tombol X
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  // Theme test
  const themes = ["danger", "primary", "success", "warning", "info"];

  themes.forEach((theme) => {
    it(`menggunakan class yang sesuai dengan theme "${theme}"`, () => {
      render(
        <ConfirmationModal
          {...defaultProps}
          theme={theme}
          onClose={onCloseMock}
          onConfirm={onConfirmMock}
        />
      );
      const header = screen.getByText(defaultProps.title).closest(".modal-header");
      const confirmBtn = screen.getByText(defaultProps.confirmText);

      expect(header).toHaveClass(`bg-${theme}`);
      expect(confirmBtn).toHaveClass(`btn-${theme}`);
    });
  });
});
