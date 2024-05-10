import React from "react";

const EditSensorForm = ({
  editingSensor,
  handleEditInputChange,
  handleEditFormSubmit,
}) => {
  return (
    /* Add a form to edit a sensor */
    <form onSubmit={handleEditFormSubmit}>
      <label>
        Sensor Name:
        <input
          type="text"
          name="name"
          value={editingSensor.name}
          onChange={handleEditInputChange}
          required
        />
      </label>
      <label>
        Sensor ID:
        <input
          type="text"
          name="id"
          value={editingSensor.id}
          onChange={handleEditInputChange}
          required
        />
      </label>
      <label>
        Created By:
        <input
          type="text"
          name="createdBy"
          value={editingSensor.createdBy}
          onChange={handleEditInputChange}
          required
        />
      </label>
      <label>
        Updated By:
        <input
          type="text"
          name="updatedBy"
          value={editingSensor.updatedBy}
          onChange={handleEditInputChange}
          required
        />
      </label>
      <label>
        Latitude:
        <input
          type="number"
          name="latitude"
          value={editingSensor.latitude}
          onChange={handleEditInputChange}
          required
        />
      </label>
      <label>
        Longitude:
        <input
          type="number"
          name="longitude"
          value={editingSensor.longitude}
          onChange={handleEditInputChange}
          required
        />
      </label>
      <button type="submit">Update Sensor</button>
    </form>
  );
};

export default EditSensorForm;
