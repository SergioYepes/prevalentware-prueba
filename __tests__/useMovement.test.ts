import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { useMovements } from "../hooks/useMovements";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { id: 1, concept: "Pago servicio", amount: 120000, date: "2023-05-05T00:00:00.000Z", type: "INGRESO" },
      ]),
  })
) as jest.Mock;

test("useMovements fetches data and calculates balance", async () => {
  const { result } = renderHook(() => useMovements());

  await waitFor(() => {
    // espera hasta que los datos se hayan cargado
    expect(result.current.data.length).toBeGreaterThan(0);
  });

  expect(result.current.data[0].concept).toBe("Pago servicio");
  expect(result.current.balance).toBe(120000);
});
