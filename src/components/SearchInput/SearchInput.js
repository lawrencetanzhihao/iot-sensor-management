import { Form, InputGroup, DropdownButton, Dropdown } from "react-bootstrap";

const SearchInput = ({
  filterSearch,
  searchTerm,
  handleSearchChange,
  handleSearchFilter,
}) => {
  return (
    <InputGroup className="mb-4 mt-4">
      <Form.Control
        type="text"
        placeholder={`Search by ${filterSearch.toLowerCase()}`}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <DropdownButton
        as={InputGroup.Append}
        variant="outline-secondary"
        title={filterSearch}
        id="input-group-dropdown-2"
        onSelect={handleSearchFilter}
      >
        <Dropdown.Item eventKey="All">All</Dropdown.Item>
        <Dropdown.Item eventKey="Sensor Name">Sensor Name</Dropdown.Item>
        <Dropdown.Item eventKey="ID">ID</Dropdown.Item>
        <Dropdown.Item eventKey="Timestamp">Timestamp</Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  );
};

export default SearchInput;
