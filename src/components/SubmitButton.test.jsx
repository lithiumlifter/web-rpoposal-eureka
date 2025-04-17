import { render, screen, fireEvent } from "@testing-library/react";
import SubmitButton from "./SubmitButton";
import { describe, it, expect, vi } from "vitest";
import '@testing-library/jest-dom'; 

describe("SubmitButton", () => {
  it("merender tombol dengan label default 'Simpan'", () => {
    render(<SubmitButton />);
    const button = screen.getByRole("button", { name: "Simpan" });
    expect(button).toBeInTheDocument();
  });

  it("menampilkan label custom jika diberikan melalui props", () => {
    render(<SubmitButton label="Kirim Data" />);
    expect(screen.getByRole("button", { name: "Kirim Data" })).toBeInTheDocument();
  });

  it("memiliki class 'btn btn-primary' secara default", () => {
    render(<SubmitButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn-primary");
  });

  it("menggabungkan class tambahan jika diberikan", () => {
    render(<SubmitButton className="w-100" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn-primary");
    expect(button).toHaveClass("w-100");
  });

  it("memanggil fungsi onClick jika diklik", () => {
    const handleClick = vi.fn();
    render(<SubmitButton onClick={handleClick} label="Klik Saya" />);
    const button = screen.getByRole("button", { name: "Klik Saya" });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("bertipe 'submit'", () => {
    render(<SubmitButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
