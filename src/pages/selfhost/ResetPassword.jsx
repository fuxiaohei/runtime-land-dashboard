import { useQuery } from "@tanstack/react-query";
import { Alert, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { reset_password } from "../../api/sign";
import ErrorPage from "../Error";
import LoadingPage from "../Loading";

function ResetPasswordPage() {
  const { token } = useParams();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["reset-password", token],
    queryFn: async () => {
      return await reset_password(token);
    },
    retry: false,
    cacheTime: 0,
  });
  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <ErrorPage message={error} />;
  }
  return (
    <Container className="text-center mt-5">
      <div className="mb-4">
        <img width={80} src="/public/logo-v2.svg" />
      </div>
      <div>
        <h2>Reset Password</h2>
        <Alert variant="success" className="mx-auto my-4" id="error-alert">
          <Alert.Heading>Reset Password Success</Alert.Heading>
          <p>
            Your account <strong>{data.email}</strong> has been reset password.
            New password:{" "}
          </p>
          <p className="fs-4 fw-bold">{data.password}</p>
          <hr />
          <p className="mb-0 text-secondary">
            You can login with new password and change it in the account page.
          </p>
        </Alert>
      </div>
    </Container>
  );
}

export default ResetPasswordPage;
