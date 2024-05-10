import React from "react";

const SensorForm = ({ newSensor, handleInputChange, handleAddSensor }) => {
  return (
    <div>
      {/* Add a form to add a new sensor */}
      <form onSubmit={handleAddSensor}>
        <label>
          Sensor Name:
          <input
            type="text"
            name="name"
            value={newSensor.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Sensor ID:
          <input
            type="text"
            name="id"
            value={newSensor.id}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Created By:
          <input type="text" name="createdBy" required />
        </label>
        <label>
          Updated By:
          <input type="text" name="updatedBy" required />
        </label>
        <label>
          Latitude:
          <input type="number" name="latitude" required />
        </label>
        <label>
          Longitude:
          <input type="number" name="longitude" required />
        </label>
        <button type="submit">Add Sensor</button>
      </form>
    </div>
  );
};

export default SensorForm;
