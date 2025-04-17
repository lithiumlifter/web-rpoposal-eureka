import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/LoginPage";
import '@testing-library/jest-dom'; 

// Mock useNavigate dari react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock useLogin hook
vi.mock("../hooks/useLogin", () => {
  return {
    useLogin: () => ({
      handleLogin: vi.fn(),
      error: "",
    }),
  };
});

describe("Login Page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  it("renders username and password input fields", () => {
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it("allows typing in username and password", () => {
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password123");
  });

  it("toggles password visibility", () => {
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const toggleButton = screen.getByRole("button", { name: "" }); // icon button ga ada label, so manual

    // default type password
    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);
    // setelah diklik, type jadi text
    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);
    // kembali ke password
    expect(passwordInput.type).toBe("password");
  });

  it("renders login button", () => {
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
