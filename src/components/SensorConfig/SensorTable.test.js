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
    {
      Header: "Created By",
      accessor: "createdBy",
    },
    {
      Header: "Updated By",
      accessor: "updatedBy",
    },
    {
      Header: "Create Timestamp",
      accessor: "createTimestamp",
    },
    {
      Header: "Update Timestamp",
      accessor: "updateTimestamp",
    },
    {
      Header: "Latitude",
      accessor: "latitude",
    },
    {
      Header: "Longitude",
      accessor: "longitude",
    },
  ];

  const data = [
    {
      name: "Test Sensor",
      id: "123",
      createdBy: "User 1",
      updatedBy: "User 2",
      createTimestamp: "2024-05-13T08:03:49.356Z",
      updateTimestamp: "2024-05-13T08:29:52.639Z",
      latitude: "10",
      longitude: "20",
    },
  ];

  render(<SensorTable columns={columns} data={data} />);

  // Check if the column headers are rendered
  expect(screen.getByText("Sensor Name")).toBeInTheDocument();
  expect(screen.getByText("Sensor ID")).toBeInTheDocument();
  expect(screen.getByText("Created By")).toBeInTheDocument();
  expect(screen.getByText("Updated By")).toBeInTheDocument();
  expect(screen.getByText("Create Timestamp")).toBeInTheDocument();
  expect(screen.getByText("Update Timestamp")).toBeInTheDocument();
  expect(screen.getByText("Latitude")).toBeInTheDocument();
  expect(screen.getByText("Longitude")).toBeInTheDocument();

  // Check if the data is rendered
  expect(screen.getByText("Test Sensor")).toBeInTheDocument();
  expect(screen.getByText("123")).toBeInTheDocument();
  expect(screen.getByText("User 1")).toBeInTheDocument();
  expect(screen.getByText("User 2")).toBeInTheDocument();
  expect(screen.getByText("2024-05-13T08:03:49.356Z")).toBeInTheDocument();
  expect(screen.getByText("2024-05-13T08:29:52.639Z")).toBeInTheDocument();
  expect(screen.getByText("10")).toBeInTheDocument();
  expect(screen.getByText("20")).toBeInTheDocument();
});
