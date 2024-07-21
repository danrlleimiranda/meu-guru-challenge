import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { NextRouter } from "next/router";
import { ReactElement } from "react";

// Ensure the router is mocked

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
export function renderWithRouter(
  ui: ReactElement,
  { route = "/", ...options } = {}
) {
  // const mockRouter = jest.mock('next/router', () => ({
  //   useRouter() {
  //     return ({
  //       route: '/',
  //       pathname: '',
  //       query: '',
  //       asPath: '',
  //       push: jest.fn(),
  //       events: {
  //         on: jest.fn(),
  //         off: jest.fn()
  //       },
  //       beforePopState: jest.fn(() => null),
  //       prefetch: jest.fn(() => null)
  //     });
  //   },
  // }));
  const mockRouter: NextRouter = {
    basePath: "",
    pathname: route,
    route,
    query: {},
    asPath: route,
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
    locale: "en",
    locales: ["en"],
    defaultLocale: "en",
    domainLocales: [],
    forward: jest.fn(),
  };

  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterContext.Provider value={mockRouter}>{ui}</RouterContext.Provider>
    </QueryClientProvider>,
    options
  );
}
