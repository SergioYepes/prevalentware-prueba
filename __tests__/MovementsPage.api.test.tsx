import { render, screen, within, waitFor } from "@testing-library/react";
import MovementsPage from "../pages/movements";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

describe("MovementsPage", () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              concept: "Pago servicio",
              amount: 120000,
              date: "2023-05-05T00:00:00.000Z",
            },
          ]),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("muestra título Movimientos y datos en la tabla", async () => {
    render(<MovementsPage />);

    expect(screen.getByText("Movimientos")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Pago servicio")).toBeInTheDocument()
    );

    const amounts = screen.getAllByText("$120.000");
    expect(amounts.length).toBeGreaterThan(0);
  });
});
