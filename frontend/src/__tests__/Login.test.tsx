import { renderWithRouter } from "@/app/utils/renderWithRouter";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../app/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

describe("Login", () => {
  it("Testa se os inputs estejam funcionando corretamente.", async () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
    await userEvent.type(inputEmail, "teste@teste.com");
    await userEvent.type(inputPassword, "123456");
    const loginBtn = screen.getByRole("button", { name: /login/i });
    expect(loginBtn).toBeEnabled();
  });

  it("Testa se a mensagem de usuário ou senha incorretos aparece.", async () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    await userEvent.type(inputEmail, "teste@teste.com");
    await userEvent.type(inputPassword, "123456");
    const loginBtn = screen.getByRole("button", { name: /login/i });

    await userEvent.click(loginBtn);

    expect(await screen.findByText(/usuário ou senha incorretos/i)).toBeInTheDocument();
  })
});
