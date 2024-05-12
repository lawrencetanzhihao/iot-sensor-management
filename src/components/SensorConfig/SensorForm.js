const SensorForm = ({ newSensor, handleInputChange, handleAddSensor }) => {
  return (
    <div className="container mt-5">
      <form onSubmit={handleAddSensor}>
        <div className="mb-3">
          <label className="form-label">Sensor Name:</label>
          <input
            type="text"
            name="name"
            value={newSensor.name}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sensor ID:</label>
          <input
            type="text"
            name="id"
            value={newSensor.id}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Created By:</label>
          <input
            type="text"
            name="createdBy"
            value={newSensor.createdBy}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Updated By:</label>
          <input
            type="text"
            name="updatedBy"
            value={newSensor.updatedBy}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={newSensor.latitude}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={newSensor.longitude}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className=" btn btn-success">
          Add Sensor
        </button>
      </form>
    </div>
  );
};

export default SensorForm;
