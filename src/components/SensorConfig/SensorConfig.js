import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";

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
      id: event.target.id.value,
      name: event.target.name.value,
      createdBy: event.target.createdBy.value,
      updatedBy: event.target.updatedBy.value,
      createTimestamp: new Date().toISOString(),
      updateTimestamp: new Date().toISOString(),
      latitude: event.target.latitude.value,
      longitude: event.target.longitude.value,
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: currentSensors });

  return (
    <div>
      <h1>Sensor Configurations</h1>
      {/* Sensor configurations will go here */}

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

      {/* Add a form to edit a sensor */}
      {editingSensor && (
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
          <button type="submit">Update Sensor</button>
        </form>
      )}

      {/* Display sensor data */}
      {/* This code will display a table with the sensor data fetched from the mock API */}
      {/* The table will have columns for the sensor name and ID, and a row for each sensor */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Render the pagination controls */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage * pageSize >= sensors.length}
      >
        Next
      </button>
    </div>
  );
};

export default SensorConfig;
