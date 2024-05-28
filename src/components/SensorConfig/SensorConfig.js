import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useMemo } from "react";
import { FiEdit2, FiTrash2, FiPlusCircle } from "react-icons/fi";
import { LuRefreshCcw } from "react-icons/lu";
import { Button, Container } from "react-bootstrap";
import {
  addSensor,
  deleteSensor,
  getSensors,
  updateSensor,
} from "../../data/api";
import "./SensorConfig.css";
import EmptyState from "../EmptyState/EmptyState";
import SensorTableWithPagination from "../SensorTableWithPagination/SensorTableWithPagination";
import SearchInput from "../SearchInput/SearchInput";
import LoadingState from "../LoadingState/LoadingState";
import SensorModal from "../Modal/SensorModal";
import SuccessToast from "../SuccessToast/SuccessToast";
import ErrorToast from "../ErrorToast/ErrorToast";

const SensorConfig = () => {
  // Fetch the sensor data from the mock API, will use the useEffect hook to fetch the data when the component mounts
  const [sensors, setSensors] = useState([]);
  const [newSensor, setNewSensor] = useState({
    name: "",
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
  const [modalContent, setModalContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState("All");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState("");

  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    getSensors()
      .then((response) => {
        setOriginalSensors(response.data);
        setFilteredSensors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sensors: ", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const lowerCasedSearchTerm = searchTerm.toLowerCase();

    const newFilteredSensors = originalSensors.filter((sensor) => {
      switch (filterSearch) {
        case "Sensor Name":
          return sensor.name.toLowerCase().includes(lowerCasedSearchTerm);
        case "ID":
          return sensor.id.toLowerCase().includes(lowerCasedSearchTerm);
        case "Timestamp":
          return (
            new Date(sensor.createTimestamp)
              .toLocaleString()
              .includes(lowerCasedSearchTerm) ||
            new Date(sensor.updateTimestamp)
              .toLocaleString()
              .includes(lowerCasedSearchTerm)
          );
        default:
          return (
            sensor.name.toLowerCase().includes(lowerCasedSearchTerm) ||
            sensor.id.toLowerCase().includes(lowerCasedSearchTerm) ||
            new Date(sensor.createTimestamp)
              .toLocaleString()
              .includes(lowerCasedSearchTerm) ||
            new Date(sensor.updateTimestamp)
              .toLocaleString()
              .includes(lowerCasedSearchTerm) ||
            sensor.createdBy.toLowerCase().includes(lowerCasedSearchTerm) ||
            sensor.updatedBy.toLowerCase().includes(lowerCasedSearchTerm) ||
            sensor.latitude.toString().includes(lowerCasedSearchTerm) ||
            sensor.longitude.toString().includes(lowerCasedSearchTerm)
          );
      }
    });

    setFilteredSensors(newFilteredSensors);
    setCurrentPage(1);
  }, [searchTerm, originalSensors, filterSearch]);

  // Calculate the range of sensors for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredSensors.length);
  const currentSensors = filteredSensors.slice(startIndex, endIndex);

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const errorToast = (errorMessage) => {
    setErrorToastMessage(errorMessage);
    setShowErrorToast(true);
  };

  const handleInputChange = (event) => {
    setNewSensor({ ...newSensor, [event.target.name]: event.target.value });
  };

  const handleAddSensor = (event) => {
    event.preventDefault();

    const newSensor = {
      id: uuidv4().slice(0, 8),
      name: event.target.elements.name.value,
      createdBy: event.target.elements.createdBy.value,
      updatedBy: event.target.elements.updatedBy.value,
      createTimestamp: new Date().toISOString(),
      updateTimestamp: new Date().toISOString(),
      latitude: event.target.elements.latitude.value,
      longitude: event.target.elements.longitude.value,
    };

    // Add the new sensor to the list of sensors
    addSensor(newSensor)
      .then((response) => {
        setSensors((prevSensors) => [...prevSensors, response.data]);
        setFilteredSensors((prevFilteredSensors) => [
          ...prevFilteredSensors,
          response.data,
        ]);
        setOriginalSensors((prevOriginalSensors) => [
          ...prevOriginalSensors,
          response.data,
        ]);
        // Clear the input fields
        setNewSensor({
          name: "",
          createdBy: "",
          updatedBy: "",
          createTimestamp: "",
          updateTimestamp: "",
          latitude: "",
          longitude: "",
        });
        displayToast("Sensor successfully created!");
      })
      .catch(() => {
        errorToast("Error adding sensor!");
      });

    // After adding a new sensor, close the modal
    setModalContent(null);
  };

  const handleEditButtonClick = (sensor) => {
    setEditingSensor(sensor);
    setModalContent("edit");
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
    updateSensor(updatedSensor.id, updatedSensor)
      .then((response) => {
        // The response from the server after the update should contain the updated sensor data
        const updatedSensorFromServer = response.data;

        setSensors((prevSensors) => {
          return prevSensors.map((sensor) =>
            sensor.id === updatedSensorFromServer.id
              ? updatedSensorFromServer
              : sensor
          );
        });

        setOriginalSensors((prevSensors) => {
          return prevSensors.map((sensor) =>
            sensor.id === updatedSensorFromServer.id
              ? updatedSensorFromServer
              : sensor
          );
        });

        setFilteredSensors((prevFilteredSensors) => {
          return prevFilteredSensors.map((sensor) =>
            sensor.id === updatedSensorFromServer.id
              ? updatedSensorFromServer
              : sensor
          );
        });

        setEditingSensor(null);
        setModalContent(null);
        displayToast("Sensor successfully updated!");
      })
      .catch(() => {
        errorToast(`Error updated sensor with ID ${updatedSensor.id}`);
      });
  };

  const handleDeleteButtonClick = (id) => {
    deleteSensor(id)
      .then(() => {
        // Refresh the sensor list after a sensor is deleted
        getSensors().then((response) => {
          setSensors(response.data);
          setOriginalSensors(response.data);
          setFilteredSensors(response.data);
          displayToast("Sensor successfully deleted!");
        });
      })
      .catch(() => {
        errorToast("Error deleting sensor!");
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRefreshButton = () => {
    getSensors()
      .then((response) => {
        setOriginalSensors(response.data);
        setFilteredSensors(response.data);
      })
      .catch((error) => {
        console.error("Error refreshing sensors: ", error);
      });
  };

  const handleCreateButton = () => {
    setModalContent("add");
  };

  const handleSearchFilter = (selectedFilter) => {
    setFilterSearch(selectedFilter);
  };

  const columns = useMemo(
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
              <FiEdit2 />
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteButtonClick(row.original.id)}
            >
              <FiTrash2 />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const CreateButton = () => (
    <Button variant="success" className="mb-3" onClick={handleCreateButton}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>Create</span>
        <FiPlusCircle style={{ marginLeft: "3px" }} />
      </div>
    </Button>
  );

  const RefreshButton = () => (
    <Button
      variant="outline-secondary"
      className="mb-3"
      style={{ marginLeft: "10px" }}
      onClick={handleRefreshButton}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>Refresh</span>
        <LuRefreshCcw style={{ marginLeft: "3px" }} />
      </div>
    </Button>
  );

  const SensorTablePagination = () => (
    <>
      {filteredSensors.length === 0 ? (
        <EmptyState searchTerm={searchTerm} />
      ) : (
        <SensorTableWithPagination
          columns={columns}
          currentSensors={currentSensors}
          currentPage={currentPage}
          filteredSensors={filteredSensors}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );

  return (
    <Container className="container">
      <Container className="my-2">
        <h1 className="text-center" style={{ color: "black" }}>
          Sensor Configuration
        </h1>
      </Container>
      <SearchInput
        filterSearch={filterSearch}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleSearchFilter={handleSearchFilter}
      />
      <CreateButton />
      <RefreshButton />
      {loading ? <LoadingState /> : <SensorTablePagination />}
      <SensorModal
        modalContent={modalContent}
        newSensor={newSensor}
        handleInputChange={handleInputChange}
        handleAddSensor={handleAddSensor}
        editingSensor={editingSensor}
        handleEditInputChange={handleEditInputChange}
        handleEditFormSubmit={handleEditFormSubmit}
        setModalContent={setModalContent}
      />
      <SuccessToast
        showToast={showToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
      />
      <ErrorToast
        showErrorToast={showErrorToast}
        setShowErrorToast={setShowErrorToast}
        errorToastMessage={errorToastMessage}
      />
    </Container>
  );
};

export default SensorConfig;
