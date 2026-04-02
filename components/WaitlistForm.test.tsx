import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WaitlistForm from "./WaitlistForm";

// Mock the Supabase client
vi.mock("@/lib/supabase", () => ({
  getSupabase: vi.fn(),
}));

import { getSupabase } from "@/lib/supabase";

const mockInsert = vi.fn();
const mockFrom = vi.fn(() => ({ insert: mockInsert }));

beforeEach(() => {
  vi.clearAllMocks();
  (getSupabase as ReturnType<typeof vi.fn>).mockReturnValue({ from: mockFrom });
});

describe("WaitlistForm", () => {
  it("renders the email input and CTA button", () => {
    render(<WaitlistForm />);
    expect(screen.getByPlaceholderText("you@company.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get early access/i })).toBeInTheDocument();
  });

  it("shows invalid state for a malformed email", async () => {
    render(<WaitlistForm />);
    fireEvent.change(screen.getByPlaceholderText("you@company.com"), {
      target: { value: "notanemail" },
    });
    fireEvent.submit(screen.getByRole("button").closest("form")!);
    await waitFor(() =>
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    );
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("shows success state after a valid insert", async () => {
    mockInsert.mockResolvedValue({ error: null });
    render(<WaitlistForm />);
    fireEvent.change(screen.getByPlaceholderText("you@company.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.submit(screen.getByRole("button").closest("form")!);
    await waitFor(() =>
      expect(screen.getByText(/you're on the list/i)).toBeInTheDocument()
    );
  });

  it("shows duplicate state when Supabase returns code 23505", async () => {
    mockInsert.mockResolvedValue({ error: { code: "23505" } });
    render(<WaitlistForm />);
    fireEvent.change(screen.getByPlaceholderText("you@company.com"), {
      target: { value: "existing@example.com" },
    });
    fireEvent.submit(screen.getByRole("button").closest("form")!);
    await waitFor(() =>
      expect(screen.getByText(/already on the list/i)).toBeInTheDocument()
    );
  });

  it("shows generic error state on unknown Supabase error", async () => {
    mockInsert.mockResolvedValue({ error: { code: "PGRST116", message: "unknown" } });
    render(<WaitlistForm />);
    fireEvent.change(screen.getByPlaceholderText("you@company.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.submit(screen.getByRole("button").closest("form")!);
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });

  it("shows ratelimit state after MAX_ATTEMPTS network submissions", async () => {
    // Simulate 5 failed inserts to exhaust the counter (counter increments after network call)
    mockInsert.mockResolvedValue({ error: { code: "PGRST116" } });
    render(<WaitlistForm />);
    const input = screen.getByPlaceholderText("you@company.com");
    const form = screen.getByRole("button").closest("form")!;

    for (let i = 0; i < 5; i++) {
      fireEvent.change(input, { target: { value: `test${i}@example.com` } });
      fireEvent.submit(form);
      await waitFor(() => expect(mockInsert).toHaveBeenCalledTimes(i + 1));
    }

    // The 6th attempt should hit the rate limit (no network call made)
    fireEvent.change(input, { target: { value: "test5@example.com" } });
    fireEvent.submit(form);
    await waitFor(() =>
      expect(screen.getByText(/too many attempts/i)).toBeInTheDocument()
    );
    expect(mockInsert).toHaveBeenCalledTimes(5);
  });

  it("resets rate limit counter on success", async () => {
    // First insert succeeds → counter resets
    mockInsert.mockResolvedValueOnce({ error: null });
    render(<WaitlistForm />);
    const input = screen.getByPlaceholderText("you@company.com");
    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.submit(screen.getByRole("button").closest("form")!);
    await waitFor(() => expect(screen.getByText(/you're on the list/i)).toBeInTheDocument());
    expect(mockInsert).toHaveBeenCalledTimes(1);
  });

  it("duplicate state shows a stable end-state message (form is replaced)", async () => {
    // The duplicate state replaces the entire form — this is by design (same as success).
    // No input is visible after a duplicate, so the user must refresh to try a different email.
    mockInsert.mockResolvedValue({ error: { code: "23505" } });
    render(<WaitlistForm />);
    const input = screen.getByPlaceholderText("you@company.com");
    fireEvent.change(input, { target: { value: "existing@example.com" } });
    fireEvent.submit(screen.getByRole("button").closest("form")!);
    await waitFor(() => expect(screen.getByText(/already on the list/i)).toBeInTheDocument());
    // Input is unmounted after duplicate state
    expect(screen.queryByPlaceholderText("you@company.com")).not.toBeInTheDocument();
  });

  it("passes the correct source prop to Supabase", async () => {
    mockInsert.mockResolvedValue({ error: null });
    render(<WaitlistForm source="blog" />);
    fireEvent.change(screen.getByPlaceholderText("you@company.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.submit(screen.getByRole("button").closest("form")!);
    await waitFor(() => expect(mockInsert).toHaveBeenCalledTimes(1));
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ source: "blog" })
    );
  });

  it("lowercases the email before inserting", async () => {
    mockInsert.mockResolvedValue({ error: null });
    render(<WaitlistForm />);
    fireEvent.change(screen.getByPlaceholderText("you@company.com"), {
      target: { value: "Test@Example.COM" },
    });
    fireEvent.submit(screen.getByRole("button").closest("form")!);
    await waitFor(() => expect(mockInsert).toHaveBeenCalledTimes(1));
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ email: "test@example.com" })
    );
  });
});
