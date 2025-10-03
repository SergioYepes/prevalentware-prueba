import handler from "../pages/api/movements";
import httpMocks from "node-mocks-http";

jest.mock("../lib/prisma", () => ({
  prisma: {
    movement: {
      findMany: jest.fn().mockResolvedValue([
        { id: "m1", concept: "Venta", amount: 1000, date: new Date(), type: "INGRESO", userId: "u1" }
      ]),
      create: jest.fn(),
    },
  },
}));

describe("/api/movements", () => {
  it("GET devuelve movimientos si hay sesión", async () => {
    const req = httpMocks.createRequest({ method: "GET" });
    const res = httpMocks.createResponse();

    jest.spyOn(require("next-auth/next"), "getServerSession").mockResolvedValue({
      user: { id: "u1", role: "ADMIN" },
    });

    await handler(req, res);
    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].concept).toBe("Venta");
  });

  it("POST devuelve 401 si no hay sesión", async () => {
    const req = httpMocks.createRequest({ method: "POST", body: {} });
    const res = httpMocks.createResponse();

    jest.spyOn(require("next-auth/next"), "getServerSession").mockResolvedValue(null);

    await handler(req, res);
    expect(res.statusCode).toBe(401);
  });
});
