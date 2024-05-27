import { useTable } from "react-table";
import { Table } from "react-bootstrap";

const SensorTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    // Display sensor data
    // This code will display a table with the sensor data fetched from the mock API
    // The table will have columns for the sensor name and ID, and a row for each sensor
    <Table striped bordered hover {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          const { key, ...props } = headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...props}>
              {headerGroup.headers.map((column) => {
                const { key, ...props } = column.getHeaderProps();
                return (
                  <th
                    key={key}
                    {...props}
                    className="text-center"
                    style={{ backgroundColor: "#E8F5E9" }}
                  >
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...props } = row.getRowProps();
          return (
            <tr key={key} {...props}>
              {row.cells.map((cell) => {
                const { key, ...props } = cell.getCellProps();
                return (
                  <td key={key} {...props} className="text-center">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default SensorTable;
