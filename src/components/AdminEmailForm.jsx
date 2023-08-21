import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function AdminEmailForm() {
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
    <Form
      className="border-top pt-4"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3">
        <Form.Label>SMTP Host</Form.Label>
        <Form.Control
          name="host"
          type="text"
          placeholder="enter smtp host"
          required
        />
        <Form.Text className="text-muted">
          Enter the SMTP host of your email provider
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>SMTP Port</Form.Label>
        <Form.Control
          name="port"
          type="text"
          placeholder="enter smtp port"
          required
        />
        <Form.Text className="text-muted">
          Enter the SMTP port of your email provider
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>SMTP Username</Form.Label>
        <Form.Control
          name="username"
          type="text"
          placeholder="enter smtp username"
          required
        />
        <Form.Text className="text-muted">
          Enter the SMTP username of your email provider
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>SMTP Password</Form.Label>
        <Form.Control
          name="password"
          type="text"
          placeholder="enter smtp password"
          required
        />
        <Form.Text className="text-muted">
          Enter the SMTP password of your email provider
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>SMTP Sender</Form.Label>
        <Form.Control
          name="sender"
          type="text"
          placeholder="enter smtp sender"
          required
        />
        <Form.Text className="text-muted">
          Enter the SMTP sender of your email provider
        </Form.Text>
      </Form.Group>
      <div className="text-start">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default AdminEmailForm;
