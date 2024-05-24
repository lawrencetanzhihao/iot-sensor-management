import { render, fireEvent, screen } from "@testing-library/react";
import EditSensorForm from "./EditSensorForm";

test("form submits successfully after user edits", () => {
  const handleEditInputChange = jest.fn();
  const handleEditFormSubmit = jest.fn();
  const editingSensor = {
    name: "",
    id: "",
    createdBy: "",
    updatedBy: "",
    latitude: "",
    longitude: "",
  };

  render(
    <EditSensorForm
      editingSensor={editingSensor}
      handleEditInputChange={handleEditInputChange}
      handleEditFormSubmit={handleEditFormSubmit}
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

  expect(handleEditInputChange).toHaveBeenCalledTimes(6);

  const form = screen.getByTestId("update-btn");
  fireEvent.submit(form);

  expect(handleEditFormSubmit).toHaveBeenCalled();
});
