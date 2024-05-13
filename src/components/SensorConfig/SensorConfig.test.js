import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SensorConfig from "./SensorConfig";
import {
  getSensors,
  addSensor,
  updateSensor,
  deleteSensor,
} from "../../data/api";

jest.mock("../../data/api");

// Mock data
const mockSensors = [
  {
    id: "1",
    name: "Sensor 1",
    createdBy: "User 1",
    updatedBy: "User 1",
    latitude: "10",
    longitude: "20",
  },
  {
    id: "2",
    name: "Sensor 2",
    createdBy: "User 2",
    updatedBy: "User 2",
    latitude: "30",
    longitude: "40",
  },
];

beforeEach(() => {
  // Mock API calls
  getSensors.mockResolvedValue({ data: mockSensors });
  addSensor.mockResolvedValue({
    data: {
      name: "Sensor 3",
      id: "3",
      createdBy: "User 3",
      latitude: "30",
      longitude: "40",
    },
  });
  updateSensor.mockResolvedValue({ data: {} });
  deleteSensor.mockResolvedValue({ data: {} });
});

test("renders SensorConfig component", async () => {
  render(<SensorConfig />);

  // Check if the component renders correctly
  expect(screen.getByText(/Sensor Configurations/i)).toBeInTheDocument();

  // Wait for the sensors to be fetched
  await waitFor(() => expect(getSensors).toHaveBeenCalledTimes(1));

  // Check if the sensors are displayed
  expect(screen.getByText(/Sensor 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Sensor 2/i)).toBeInTheDocument();
});

test("adds a new sensor when user submits the form", async () => {
  render(<SensorConfig />);

  // Click the "Create" button to show the form
  fireEvent.click(screen.getByRole("button", { name: /Create/i }));

  // Fill in the form
  fireEvent.change(
    screen.getByLabelText(/Sensor Name:/i, { selector: "input" }),
    {
      target: { value: "Sensor 3" },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/Sensor ID:/i, { selector: "input" }),
    {
      target: { value: "1" },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/Created By:/i, { selector: "input" }),
    {
      target: { value: "User 3" },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/Updated By:/i, { selector: "input" }),
    {
      target: { value: "User 4" },
    }
  );

  fireEvent.change(screen.getByLabelText(/Latitude:/i, { selector: "input" }), {
    target: { value: "20" },
  });

  fireEvent.change(
    screen.getByLabelText(/Longitude:/i, { selector: "input" }),
    {
      target: { value: "30" },
    }
  );

  // Submit the form
  fireEvent.click(screen.getByText(/Add Sensor/i));

  // Wait for the addSensor API call to be made
  await waitFor(() => expect(addSensor).toHaveBeenCalledTimes(1));

  // Check if the new sensor is added to the list
  // Note: This assumes that the addSensor API call returns the new sensor
  expect(screen.getByText(/Sensor 3/i)).toBeInTheDocument();
});

test("edits a sensor when user updates the form", async () => {
  render(<SensorConfig />);

  // Click the "Edit" button for the first sensor
  const editButtons = await screen.findAllByRole("button", { name: /Edit/i });
  fireEvent.click(editButtons[0]);

  // Fill in the form
  fireEvent.change(
    screen.getByLabelText(/Sensor Name:/i, { selector: "input" })
  );

  fireEvent.change(screen.getByLabelText(/Sensor ID:/i, { selector: "input" }));
  fireEvent.change(
    screen.getByLabelText(/Created By:/i, { selector: "input" })
  );
  fireEvent.change(
    screen.getByLabelText(/Updated By:/i, { selector: "input" })
  );
  fireEvent.change(screen.getByLabelText(/Latitude:/i, { selector: "input" }));
  fireEvent.change(screen.getByLabelText(/Longitude:/i, { selector: "input" }));

  // Submit the form
  fireEvent.click(screen.getByText(/Update Sensor/i));

  // Wait for the updateSensor API call to be made
  await waitFor(() => expect(updateSensor).toHaveBeenCalledTimes(1));
});
