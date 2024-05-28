import { Toast } from "react-bootstrap";
import { FcCancel } from "react-icons/fc";

const ErrorToast = ({
  showErrorToast,
  setShowErrorToast,
  errorToastMessage,
}) => (
  <Toast
    onClose={() => setShowErrorToast(false)}
    show={showErrorToast}
    delay={3000}
    autohide
  >
    <Toast.Header>
      <FcCancel style={{ marginRight: "5px" }} />
      <strong className="me-auto">Error</strong>
    </Toast.Header>
    <Toast.Body>{errorToastMessage}</Toast.Body>
  </Toast>
);

export default ErrorToast;
