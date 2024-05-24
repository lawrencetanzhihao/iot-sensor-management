import { Spinner } from "react-bootstrap";

const LoadingState = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
    }}
  >
    <Spinner animation="border" />
  </div>
);

export default LoadingState;
