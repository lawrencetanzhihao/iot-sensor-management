import { Toast } from "react-bootstrap";
import { FcOk } from "react-icons/fc";

const SuccessToast = ({ showToast, setShowToast, toastMessage }) => (
  <Toast
    onClose={() => setShowToast(false)}
    show={showToast}
    delay={3000}
    autohide
  >
    <Toast.Header>
      <FcOk style={{ marginRight: "5px" }} />
      <strong className="me-auto">Success</strong>
    </Toast.Header>
    <Toast.Body>{toastMessage}</Toast.Body>
  </Toast>
);

export default SuccessToast;
