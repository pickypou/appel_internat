import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders dashboard button", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const button = screen.getByText(/Créer une nouvelle liste/i);
  expect(button).toBeInTheDocument();
});
