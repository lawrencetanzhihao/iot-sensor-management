import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import axios from "axios";
import SensorForm from "./SensorForm";
import EditSensorForm from "./EditSensorForm";
import SensorTable from "./SensorTable";
import Pagination from "./Pagination";

const SensorConfig = () => {
  // Need to fetch the sensor data from our mock API, will use the useEffect hook to fetch the data when the component mounts
  // useState hook to store the data
  const [sensors, setSensors] = useState([]);
  const [newSensor, setNewSensor] = useState({
    name: "",
    id: "",
    createdBy: "",
    updatedBy: "",
    latitude: "",
    longitude: "",
  });
  const [editingSensor, setEditingSensor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalSensors, setOriginalSensors] = useState([]);
  const [filteredSensors, setFilteredSensors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // When fetching data from the server, set both originalSensors and filteredSensors
  useEffect(() => {
    axios
      .get("http://localhost:3001/sensors")
      .then((response) => {
        setOriginalSensors(response.data);
        setFilteredSensors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sensors: ", error);
      });
  }, []);

  const pageSize = 10;

  useEffect(() => {
    const lowerCasedSearchTerm = searchTerm.toLowerCase();

    const newFilteredSensors = originalSensors.filter((sensor) => {
      return (
        sensor.name.toLowerCase().includes(lowerCasedSearchTerm) ||
        sensor.id.toLowerCase().includes(lowerCasedSearchTerm) ||
        new Date(sensor.createTimestamp)
          .toLocaleString()
          .includes(lowerCasedSearchTerm) ||
        new Date(sensor.updateTimestamp)
          .toLocaleString()
          .includes(lowerCasedSearchTerm)
      );
    });

    setFilteredSensors(newFilteredSensors);
  }, [searchTerm, originalSensors]);

  // Calculate the range of sensors for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredSensors.length);
  const currentSensors = filteredSensors.slice(startIndex, endIndex);

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
        const newSensorList = [...sensors, response.data];
        setSensors(newSensorList);
        setFilteredSensors(newSensorList);
        // Clear the input fields
        setNewSensor({
          name: "",
          id: "",
          createdBy: "",
          updatedBy: "",
          createTimestamp: "",
          updateTimestamp: "",
          latitude: "",
          longitude: "",
        });
      })
      .catch((error) => {
        console.error("Error adding sensor: ", error);
      });

    // After adding a new sensor, switch back to the table view
    setShowForm(false);
  };

  const handleEditButtonClick = (sensor) => {
    setEditingSensor(sensor);
    setShowEditForm(true);
  };

  const handleEditInputChange = (event) => {
    setEditingSensor({
      ...editingSensor,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    // Update the updateTimestamp field with the current time
    const updatedSensor = {
      ...editingSensor,
      updateTimestamp: new Date().toISOString(),
    };

    // Display updated sensor data in the form without making an additional API call
    axios
      .put(`http://localhost:3001/sensors/${updatedSensor.id}`, updatedSensor)
      .then((response) => {
        // The response from the server after the update should contain the updated sensor data
        const updatedSensorFromServer = response.data;

        // Update the states using a functional update
        setSensors((prevSensors) => {
          // Find the index of the edited sensor in the previous sensors array
          const index = prevSensors.findIndex(
            (sensor) => sensor.id === updatedSensorFromServer.id
          );

          // Create a new array with the updated sensor
          const newSensors = [...prevSensors];
          newSensors[index] = updatedSensorFromServer;

          return newSensors;
        });

        setOriginalSensors((prevSensors) => {
          const index = prevSensors.findIndex(
            (sensor) => sensor.id === updatedSensorFromServer.id
          );
          const newSensors = [...prevSensors];
          newSensors[index] = updatedSensorFromServer;

          return newSensors;
        });

        // Update the filteredSensors state directly
        setFilteredSensors((prevFilteredSensors) => {
          const index = prevFilteredSensors.findIndex(
            (sensor) => sensor.id === updatedSensorFromServer.id
          );
          const newFilteredSensors = [...prevFilteredSensors];
          newFilteredSensors[index] = updatedSensorFromServer;

          return newFilteredSensors;
        });

        setEditingSensor(null);
        setShowEditForm(false);
      })
      .catch((error) => {
        console.error(
          `Error editing sensor with ID ${updatedSensor.id}: `,
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
          setOriginalSensors(response.data);
          setFilteredSensors(response.data);
        });
      })
      .catch((error) => {
        console.error(`Error deleting sensor with ID ${id}: `, error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: "Update Timestamp",
        accessor: "updateTimestamp",
        Cell: ({ value }) => new Date(value).toLocaleString(),
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
            <Button
              variant="warning"
              style={{ marginRight: "5px" }}
              onClick={() => handleEditButtonClick(row.original)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteButtonClick(row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Container>
      <h1 className="text-center">Sensor Configurations</h1>

      {!showEditForm && (
        <>
          <InputGroup className="mb-3 mt-4">
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
          <Button
            variant="primary"
            className="mb-3"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Create"}
          </Button>
        </>
      )}

      {showForm ? (
        <SensorForm
          newSensor={newSensor}
          handleInputChange={handleInputChange}
          handleAddSensor={handleAddSensor}
        />
      ) : showEditForm ? (
        <EditSensorForm
          editingSensor={editingSensor}
          handleEditInputChange={handleEditInputChange}
          handleEditFormSubmit={handleEditFormSubmit}
        />
      ) : (
        <>
          <Table striped bordered hover>
            <SensorTable
              columns={columns}
              data={currentSensors}
              handleEditButtonClick={handleEditButtonClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
            />
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredSensors.length / pageSize)}
            handlePreviousClick={() => setCurrentPage(currentPage - 1)}
            handleNextClick={() => setCurrentPage(currentPage + 1)}
          />
        </>
      )}

    </Container>
  );
};

export default SensorConfig;
