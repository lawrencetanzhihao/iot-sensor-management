import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";

test("navbar links are rendered correctly", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  // Check if the Home link is rendered
  const homeLink = screen.getByRole("link", { name: /home/i });
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute("href", "/");

  // Check if the Sensor Configurations link is rendered
  const configLink = screen.getByRole("link", {
    name: /sensor configurations/i,
  });
  expect(configLink).toBeInTheDocument();
  expect(configLink).toHaveAttribute("href", "/config");
});
