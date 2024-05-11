import React from "react";
import { Form, Button } from "react-bootstrap";

const EditSensorForm = ({
  editingSensor,
  handleEditInputChange,
  handleEditFormSubmit,
}) => {
  return (
    /* Add a form to edit a sensor */
    <Form onSubmit={handleEditFormSubmit}>
      <Form.Group controlId="formSensorName" className="mt-4">
        <Form.Label>Sensor Name:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={editingSensor.name}
          onChange={handleEditInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formSensorId" className="mt-2">
        <Form.Label>Sensor ID:</Form.Label>
        <Form.Control
          type="text"
          name="id"
          value={editingSensor.id}
          onChange={handleEditInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCreatedBy" className="mt-2">
        <Form.Label>Created By:</Form.Label>
        <Form.Control
          type="text"
          name="createdBy"
          value={editingSensor.createdBy}
          onChange={handleEditInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formUpdatedBy" className="mt-2">
        <Form.Label>Updated By:</Form.Label>
        <Form.Control
          type="text"
          name="updatedBy"
          value={editingSensor.updatedBy}
          onChange={handleEditInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formLatitude" className="mt-2">
        <Form.Label>Latitude:</Form.Label>
        <Form.Control
          type="number"
          name="latitude"
          value={editingSensor.latitude}
          onChange={handleEditInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formLongitude" className="mt-2">
        <Form.Label>Longitude:</Form.Label>
        <Form.Control
          type="number"
          name="longitude"
          value={editingSensor.longitude}
          onChange={handleEditInputChange}
          required
        />
      </Form.Group>

      <Button variant="warning" className="mt-4" type="submit">
        Update Sensor
      </Button>
    </Form>
  );
};

export default EditSensorForm;
