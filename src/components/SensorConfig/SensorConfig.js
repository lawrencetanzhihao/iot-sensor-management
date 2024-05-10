import axios from "axios";
import React, { useEffect, useState } from "react";
import SensorForm from "./SensorForm";
import EditSensorForm from "./EditSensorForm";
import SensorTable from "./SensorTable";
import Pagination from "./Pagination";

const SensorConfig = () => {
  // Need to fetch the sensor data from our mock API, will use the useEffect hook to fetch the data when the component mounts
  // useState hook to store the data
  const [sensors, setSensors] = useState([]);
  const [newSensor, setNewSensor] = useState({ name: "", id: "" });
  const [editingSensor, setEditingSensor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    axios
      .get("http://localhost:3001/sensors")
      .then((response) => {
        setSensors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sensors: ", error);
      });
  }, []);

  // Calculate the range of sensors for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, sensors.length);
  const currentSensors = sensors.slice(startIndex, endIndex);

  useEffect(() => {
    axios.get("http://localhost:3001/sensors").then((response) => {
      setSensors(response.data);
    });
  }, []);

  const handleInputChange = (event) => {
    setNewSensor({ ...newSensor, [event.target.name]: event.target.value });
  };

  const handleAddSensor = (event) => {
    event.preventDefault();

    const newSensor = {
      id: event.target.elements.id.value,
      name: event.target.elements.name.value,
      createdBy: event.target.elements.createdBy.value,
      updatedBy: event.target.elements.updatedBy.value,
      createTimestamp: new Date().toISOString(),
      updateTimestamp: new Date().toISOString(),
      latitude: event.target.elements.latitude.value,
      longitude: event.target.elements.longitude.value,
    };

    // Add the new sensor to the list of sensors
    axios
      .post("http://localhost:3001/sensors", newSensor)
      .then((response) => {
        setSensors([...sensors, response.data]);
      })
      .catch((error) => {
        console.error("Error adding sensor: ", error);
      });
  };

  const handleEditButtonClick = (sensor) => {
    setEditingSensor(sensor);
  };

  const handleEditInputChange = (event) => {
    setEditingSensor({
      ...editingSensor,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/sensors/${editingSensor.id}`, editingSensor)
      .then(() => {
        setEditingSensor(null);
        axios.get("http://localhost:3001/sensors").then((response) => {
          setSensors(response.data);
        });
      })
      .catch((error) => {
        console.error(
          `Error editing sensor with ID ${editingSensor.id}: `,
          error
        );
      });
  };

  const handleDeleteButtonClick = (id) => {
    axios
      .delete(`http://localhost:3001/sensors/${id}`)
      .then(() => {
        // Refresh the sensor list after a sensor is deleted
        axios.get("http://localhost:3001/sensors").then((response) => {
          setSensors(response.data);
        });
      })
      .catch((error) => {
        console.error(`Error deleting sensor with ID ${id}: `, error);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Sensor Name",
        accessor: "name",
      },
      {
        Header: "Sensor ID",
        accessor: "id",
      },
      {
        Header: "Created By",
        accessor: "createdBy",
      },
      {
        Header: "Updated By",
        accessor: "updatedBy",
      },
      {
        Header: "Create Timestamp",
        accessor: "createTimestamp",
      },
      {
        Header: "Update Timestamp",
        accessor: "updateTimestamp",
      },
      {
        Header: "Latitude",
        accessor: "latitude",
      },
      {
        Header: "Longitude",
        accessor: "longitude",
      },

      // Add more columns as needed
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }) => (
          <div>
            <button onClick={() => handleEditButtonClick(row.original)}>
              Edit
            </button>
            <button onClick={() => handleDeleteButtonClick(row.original.id)}>
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <h1>Sensor Configurations</h1>
      <SensorForm
        newSensor={newSensor}
        handleInputChange={handleInputChange}
        handleAddSensor={handleAddSensor}
      />
      {editingSensor && (
        <EditSensorForm
          editingSensor={editingSensor}
          handleEditInputChange={handleEditInputChange}
          handleEditFormSubmit={handleEditFormSubmit}
        />
      )}
      <SensorTable
        columns={columns}
        data={currentSensors}
        handleEditButtonClick={handleEditButtonClick}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(sensors.length / pageSize)}
        handlePreviousClick={() => setCurrentPage(currentPage - 1)}
        handleNextClick={() => setCurrentPage(currentPage + 1)}
      />
    </div>
  );
};

export default SensorConfig;
