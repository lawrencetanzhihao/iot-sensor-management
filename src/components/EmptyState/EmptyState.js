import { Container, Alert } from 'react-bootstrap';

const EmptyState = ({ searchTerm }) => {
  const message = searchTerm
    ? "No records to display"
    : "No sensors found. Please create a new sensor.";
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <Alert variant="info">
        <Alert.Heading className="text-center">{message}</Alert.Heading>
      </Alert>
    </Container>
  );
};

export default EmptyState;
