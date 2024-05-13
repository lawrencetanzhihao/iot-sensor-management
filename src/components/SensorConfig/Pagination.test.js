import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "./Pagination";

test("pagination controls work correctly", () => {
  const handlePreviousClick = jest.fn();
  const handleNextClick = jest.fn();

  render(
    <Pagination
      currentPage={2}
      totalPages={3}
      handlePreviousClick={handlePreviousClick}
      handleNextClick={handleNextClick}
    />
  );

  // Check if the current page is displayed
  const listItems = screen.getAllByRole("listitem");
  const currentPageItem = listItems.find((item) => item.textContent === "2");
  expect(currentPageItem).not.toBeNull();

  // Click the previous button and check if the correct function is called
  fireEvent.click(screen.getByRole("button", { name: /previous/i }));
  expect(handlePreviousClick).toHaveBeenCalled();

  // Click the next button and check if the correct function is called
  fireEvent.click(screen.getByRole("button", { name: /next/i }));
  expect(handleNextClick).toHaveBeenCalled();
});
