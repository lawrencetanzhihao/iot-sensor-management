const EditSensorForm = ({
  editingSensor,
  handleEditInputChange,
  handleEditFormSubmit,
}) => {
  return (
      <form onSubmit={handleEditFormSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Sensor Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={editingSensor?.name || ""}
            onChange={handleEditInputChange}
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
            value={editingSensor?.createdBy || ""}
            onChange={handleEditInputChange}
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
            value={editingSensor?.updatedBy || ""}
            onChange={handleEditInputChange}
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
            step="0.000001"
            id="latitude"
            name="latitude"
            value={editingSensor?.latitude || ""}
            onChange={handleEditInputChange}
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
            step="0.000001"
            id="longitude"
            name="longitude"
            value={editingSensor?.longitude || ""}
            onChange={handleEditInputChange}
            required
            className="form-control"
          />
        </div>
        <button
          data-testid="update-btn"
          type="submit"
          className="btn btn-warning"
        >
          Update
        </button>
      </form>
  );
};

export default EditSensorForm;
