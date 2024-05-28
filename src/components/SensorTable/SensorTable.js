import { useTable } from "react-table";
import { Table } from "react-bootstrap";

const SensorTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    // Display sensor table with the sensor data fetched from the mock API
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
