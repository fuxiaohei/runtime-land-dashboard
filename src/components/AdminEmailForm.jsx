import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

function AdminEmailForm({
  data,
  onSubmit,
  isSuccess,
  isLoading,
  isError,
  error,
}) {
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
    onSubmit(values);
  };
  return (
    <Form
      className="border-top pt-4"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      {isSuccess && (
        <Alert className="mb-3" variant="success" dismissible>
          Settings updated successfully
        </Alert>
      )}
      {isError && (
        <Alert className="mb-3" variant="danger" dismissible>
          {error.toString()}
        </Alert>
      )}
      <Form.Group className="mb-3">
        <Form.Label>SMTP Host</Form.Label>
        <Form.Control
          name="host"
          type="text"
          placeholder="enter smtp host"
          defaultValue={data.host}
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
          defaultValue={data.port}
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
          defaultValue={data.username}
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
          defaultValue={data.password}
          required
        />
        <Form.Text className="text-muted">
          Enter the SMTP password of your email provider
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>SMTP Sender</Form.Label>
        <Form.Control
          name="from"
          type="text"
          placeholder="enter smtp sender"
          defaultValue={data.from}
          required
        />
        <Form.Text className="text-muted">
          Enter the SMTP sender of your email provider
        </Form.Text>
      </Form.Group>
      <div className="text-start">
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </div>
    </Form>
  );
}

export default AdminEmailForm;
