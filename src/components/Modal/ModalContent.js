import SensorForm from "../SensorForm/SensorForm";
import EditSensorForm from "../EditSensorForm/EditSensorForm";

const ModalContent = ({
  modalContent,
  newSensor,
  handleInputChange,
  handleAddSensor,
  editingSensor,
  handleEditInputChange,
  handleEditFormSubmit,
}) => {
  if (modalContent === "add") {
    return (
      <SensorForm
        newSensor={newSensor}
        handleInputChange={handleInputChange}
        handleAddSensor={handleAddSensor}
      />
    );
  } else {
    return (
      <EditSensorForm
        editingSensor={editingSensor}
        handleEditInputChange={handleEditInputChange}
        handleEditFormSubmit={handleEditFormSubmit}
      />
    );
  }
};

export default ModalContent;
