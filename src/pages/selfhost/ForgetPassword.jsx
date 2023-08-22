import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { forget_password } from "../../api/sign";
import { ButtonLink } from "../../layouts/Links";

function ForgetPasswordPage() {
  const [validated, setValidated] = useState(false);
  const mutation = useMutation(
    async (data) => {
      return await forget_password(data);
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const handleSubmit = async (event) => {
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
    mutation.mutate(values);
    setValidated(false);
  };

  return (
    <Container className="text-center mt-5">
      <Helmet>
        <title>Forget Password | Runtime.land</title>
      </Helmet>
      <div className="mb-4">
        <img width={80} src="/public/logo-v2.svg" />
      </div>
      <Form
        id="login-form"
        className="mx-auto"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <h3 className="mb-4">Forget Password</h3>
        <FloatingLabel label="Email address" className="mb-4">
          <Form.Control
            size="lg"
            type="email"
            name="email"
            placeholder="name@example.com"
            required
          />
          <Form.Text className="text-muted">
            We'll send you an email with a link to reset your password. This
            email is valid for 24 hours.
          </Form.Text>
        </FloatingLabel>
        {mutation.isSuccess && (
          <Alert variant="success">
            We've sent you an email with a link to reset your password.
          </Alert>
        )}
        {mutation.isError && (
          <Alert variant="danger">{mutation.error.toString()}</Alert>
        )}
        <hr className="mb-4" />
        <div className="text-end mb-4">
          <ButtonLink to="/login" variant="outline-primary">
            Back to Login
          </ButtonLink>
          <Button
            disabled={mutation.isLoading}
            variant="primary"
            type="submit"
            form="login-form"
            className="ms-4"
          >
            {mutation.isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ForgetPasswordPage;
