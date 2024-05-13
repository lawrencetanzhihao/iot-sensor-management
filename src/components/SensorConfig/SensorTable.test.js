import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SensorTable from "./SensorTable";

test("table renders correctly", () => {
  const columns = [
    {
      Header: "Sensor Name",
      accessor: "name",
    },
    {
      Header: "Sensor ID",
      accessor: "id",
    },
    // TODO
    // Add more columns as needed
  ];

  const data = [
    {
      name: "Test Sensor",
      id: "123",
      // Add more data fields as needed
    },
    // Add more rows as needed
  ];

  render(<SensorTable columns={columns} data={data} />);

  // Check if the column headers are rendered
  expect(screen.getByText("Sensor Name")).toBeInTheDocument();
  expect(screen.getByText("Sensor ID")).toBeInTheDocument();

  // Check if the data is rendered
  expect(screen.getByText("Test Sensor")).toBeInTheDocument();
  expect(screen.getByText("123")).toBeInTheDocument();
});
