import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function PasswordFormModal({ show, handleClose }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.preventDefault();
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    setValidated(false);
    console.log("----", values);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              name="current_password"
              type="password"
              placeholder="enter current password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Current password is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              name="new_password"
              type="password"
              placeholder="enter new password"
              required
            />
            <Form.Control.Feedback type="invalid">
              New password is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirm_password"
              type="password"
              placeholder="enter confirm password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Confirm password is required
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default PasswordFormModal;
