import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { createRegionToken, listRegionTokens } from "../../api/settings";
import AdminNavHeader from "../../components/AdminNavHeader";
import { AuthProvider } from "../../layouts/AuthContext";
import MainLayout from "../../layouts/MainLayout";
import QueryWrapper from "../../layouts/QueryWrapper";

function AdminTokensPage() {
  const {
    isLoading,
    isError,
    error,
    data: tokens,
  } = useQuery({
    queryKey: ["region-tokens"],
    queryFn: listRegionTokens,
    retry: false,
  });
  const queryClient = useQueryClient();

  const renderRow = (token) => {
    return (
      <ListGroup.Item key={token.uuid}>
        <span className="fw-bold">{token.name}</span>
        <span className="text-secondary ms-3">({token.value})</span>
      </ListGroup.Item>
    );
  };

  const [successStatus, setSuccessStatus] = useState(false);

  const createMutation = useMutation({
    mutationFn: createRegionToken,
    onSuccess: () => {
      setSuccessStatus(true);
      queryClient.invalidateQueries({ queryKey: ["region-tokens"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const target = event.currentTarget;
    const form = new FormData(target);
    const values = Object.fromEntries(form.entries());
    await createMutation.mutateAsync(values);
  };

  return (
    <AuthProvider>
      <MainLayout title="Regions | Admin Panel | Runtime.land">
        <Container id="admin-page" className="mt-4">
          <h3 className="mb-3">Admin Panel</h3>
          <AdminNavHeader activeKey="tokens" />
          <p className="text-secondary py-2">
            Region tokens are used to authenticate edge nodes with Runtime.land.
          </p>
          <ListGroup className="lh-lg" variant="flush">
            <QueryWrapper isLoading={isLoading} isError={isError} error={error}>
              {(tokens || []).length == 0 ? (
                <ListGroup.Item>
                  <p>No Tokens found.</p>
                  <Alert variant="light">
                    <code>land-edge</code> component use this token to connect
                    to Runtime.land center.
                  </Alert>
                </ListGroup.Item>
              ) : null}
              {(tokens || []).map((region) => renderRow(region))}
            </QueryWrapper>
          </ListGroup>
          <Row>
            <Col md={4}>
              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <Form.Control
                    required
                    placeholder="token's name"
                    name="name"
                  />
                  <Button variant="outline-primary" type="submit">
                    + New Token
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
          {successStatus && (
            <Alert variant="success" className="mt-4">
              Token created successfully.
            </Alert>
          )}
        </Container>
      </MainLayout>
    </AuthProvider>
  );
}

export default AdminTokensPage;
