import SensorTable from "../SensorTable/SensorTable";
import Pagination from "../Pagination/Pagination";
import { Table } from "react-bootstrap";

const SensorTableWithPagination = ({
  columns,
  currentSensors,
  currentPage,
  filteredSensors,
  pageSize,
  setCurrentPage,
}) => {
  return (
    <>
      <Table striped bordered hover className="table">
        <SensorTable columns={columns} data={currentSensors} />
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredSensors.length / pageSize)}
        handlePreviousClick={() => setCurrentPage(currentPage - 1)}
        handleNextClick={() => setCurrentPage(currentPage + 1)}
      />
    </>
  );
};

export default SensorTableWithPagination;
