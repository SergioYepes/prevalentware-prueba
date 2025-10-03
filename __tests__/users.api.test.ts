import handler from "../pages/api/users/[id]";
import httpMocks from "node-mocks-http";

jest.mock("../lib/prisma", () => ({
  prisma: {
    user: {
      update: jest.fn().mockResolvedValue({ id: "u1", name: "Bob", role: "USER" }),
    },
  },
}));

describe("/api/users/[id]", () => {
  it("PUT devuelve 403 si usuario no es admin", async () => {
    const req = httpMocks.createRequest({ method: "PUT", query: { id: "u1" }, body: { name: "Bob" } });
    const res = httpMocks.createResponse();

    jest.spyOn(require("next-auth/next"), "getServerSession").mockResolvedValue({
      user: { id: "u2", role: "USER" },
    });

    await handler(req, res);
    expect(res.statusCode).toBe(403);
  });
});
