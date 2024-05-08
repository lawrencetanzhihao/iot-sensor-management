import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";

const SensorConfig = () => {
  // Need to fetch the sensor data from our mock API, will use the useEffect hook to fetch the data when the component mounts
  // useState hook to store the data
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/sensors").then((response) => {
      setSensors(response.data);
    });
  }, []);

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
      // Add more columns as needed
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: sensors });

  return (
    <div>
      <h1>Sensor Configurations</h1>
      {/* Sensor configurations will go here */}
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
    </div>
  );
};

export default SensorConfig;
