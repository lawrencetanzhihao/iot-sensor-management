const SensorForm = ({ newSensor, handleInputChange, handleAddSensor }) => {
  return (
    <form onSubmit={handleAddSensor}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Sensor Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={newSensor.name}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="createdBy" className="form-label">
          Created By:
        </label>
        <input
          type="text"
          id="createdBy"
          name="createdBy"
          value={newSensor.createdBy}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="updatedBy" className="form-label">
          Updated By:
        </label>
        <input
          type="text"
          id="updatedBy"
          name="updatedBy"
          value={newSensor.updatedBy}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="latitude" className="form-label">
          Latitude:
        </label>
        <input
          type="number"
          id="latitude"
          name="latitude"
          value={newSensor.latitude}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="longitude" className="form-label">
          Longitude:
        </label>
        <input
          type="number"
          id="longitude"
          name="longitude"
          value={newSensor.longitude}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <button
        data-testid="submit-btn"
        type="submit"
        className="btn btn-success"
      >
        Submit
      </button>
    </form>
  );
};

export default SensorForm;
