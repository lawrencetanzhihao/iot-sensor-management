import { render, fireEvent, screen } from "@testing-library/react";
import SensorForm from "./SensorForm";

test("form submits correctly", () => {
  const handleInputChange = jest.fn();
  const handleAddSensor = jest.fn();
  const newSensor = {
    name: "",
    id: "",
    createdBy: "",
    updatedBy: "",
    latitude: "",
    longitude: "",
  };

  render(
    <SensorForm
      newSensor={newSensor}
      handleInputChange={handleInputChange}
      handleAddSensor={handleAddSensor}
    />
  );

  fireEvent.change(screen.getByLabelText(/Sensor Name:/i), {
    target: { value: "Test Sensor" },
  });
  fireEvent.change(screen.getByLabelText(/Sensor ID:/i), {
    target: { value: "123" },
  });
  fireEvent.change(screen.getByLabelText(/Created By:/i), {
    target: { value: "Test Creator" },
  });
  fireEvent.change(screen.getByLabelText(/Updated By:/i), {
    target: { value: "Test Updater" },
  });
  fireEvent.change(screen.getByLabelText(/Latitude:/i), {
    target: { value: "50.8503" },
  });
  fireEvent.change(screen.getByLabelText(/Longitude:/i), {
    target: { value: "4.3517" },
  });

  const form = screen.getByTestId("submit-btn");
  fireEvent.submit(form);

  expect(handleAddSensor).toHaveBeenCalled();
});
