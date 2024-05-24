import { Modal } from "react-bootstrap";
import ModalContent from "./ModalContent";

const SensorModal = ({
  modalContent,
  newSensor,
  handleInputChange,
  handleAddSensor,
  editingSensor,
  handleEditInputChange,
  handleEditFormSubmit,
  setModalContent,
}) => {
  const title = modalContent === "add" ? "Create Sensor" : "Edit Sensor";
  return (
    <Modal
      show={modalContent !== null}
      onHide={() => setModalContent(null)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalContent
          modalContent={modalContent}
          newSensor={newSensor}
          handleInputChange={handleInputChange}
          handleAddSensor={handleAddSensor}
          editingSensor={editingSensor}
          handleEditInputChange={handleEditInputChange}
          handleEditFormSubmit={handleEditFormSubmit}
        />
      </Modal.Body>
    </Modal>
  );
};

export default SensorModal;
