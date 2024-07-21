import { columns } from "@/app/users/columns";
import { renderWithRouter } from "@/app/utils/renderWithRouter";
import { DataTable } from "@/components/ui/data-table";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InternalAxiosRequestConfig } from "axios";
import { MOCK_USERS } from "../__mocks__/mockData";

jest.mock("axios", () => {
  const originalModule = jest.requireActual("axios");

  // Crie uma instância mockada do Axios
  const mockAxios = originalModule.create({
    baseURL: "https://exemplo.com",
  });

  mockAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      // Simule a adição de um token de autenticação, por exemplo
      config.headers.Authorization = "Bearer token_mockado";
      return config;
    }
  );

  mockAxios.get = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ data: { data: { data: MOCK_USERS } } })
    );

  return mockAxios;
});
describe("Users", () => {
  it("Deve renderizar a página de usuários.", async () => {
    const handlePagination = jest.fn();
    renderWithRouter(
      <DataTable
        columns={columns}
        data={MOCK_USERS}
        handlePagination={handlePagination}
      />
    );

    const users = await screen.findAllByText(/rafa/i);

    expect(users).toHaveLength(2);
  });

  it("Deve filtrar por email", async () => {
    const handlePagination = jest.fn();
    renderWithRouter(
      <DataTable
        columns={columns}
        data={MOCK_USERS}
        handlePagination={handlePagination}
      />
    );

    const user1 = await screen.findAllByText(/rafa/i);
    const user2 = await screen.findAllByText(/alice/i);

    expect(user1).toHaveLength(2);
    expect(user2).toHaveLength(2);

    const emailFilter = screen.getByRole("textbox");

    await userEvent.type(emailFilter, "alice");

    expect(screen.queryByText(/rafa@prisma.io/i)).not.toBeInTheDocument();
  });
});
