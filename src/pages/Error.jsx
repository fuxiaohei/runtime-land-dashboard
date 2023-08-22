import { Alert, Button, Container } from "react-bootstrap";
import { removeLocalInfo } from "../api/client";

function ErrorPage({ message, isNeedLogin }) {
  const handleLoginAgain = () => {
    removeLocalInfo();
    window.location.reload();
  };

  return (
    <Container className="text-center mt-5">
      <div className="mb-4">
        <img width={80} src="/public/logo-v2.svg" />
      </div>
      <div>
        <h2>Oops !</h2>
        <Alert variant="danger" className="mx-auto my-4" id="error-alert">
          <Alert.Heading>Something went wrong</Alert.Heading>
          <p>We are sorry, but something went wrong. Please try again later.</p>
          <hr />
          <p className="mb-0">{message}</p>
        </Alert>
        {isNeedLogin && (
          <p>
            <Button variant="outline-primary" onClick={handleLoginAgain}>
              Login again
            </Button>
          </p>
        )}
      </div>
    </Container>
  );
}

export default ErrorPage;
