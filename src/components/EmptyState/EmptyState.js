const EmptyState = ({ searchTerm }) => {
  const message = searchTerm
    ? "No records to display"
    : "No sensors found. Please create a new sensor.";
  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default EmptyState;
