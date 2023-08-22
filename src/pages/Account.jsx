import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { createDeploymentToken, listDeploymentTokens } from "../api/token";
import PasswordFormModal from "../components/PasswordFormModal";
import TokensList from "../components/TokensList";
import { AuthProvider, useAuthContext } from "../layouts/AuthContext";
import MainLayout from "../layouts/MainLayout";
import QueryWrapper from "../layouts/QueryWrapper";
import { updatePassword } from "../api/settings";

function AccountCard() {
  const { user } = useAuthContext();

  return (
    <div className="account-info mt-3 py-3">
      <div className="d-flex pb-3 justify-content-between border-bottom">
        <div className="d-flex justify-content-start">
          <img
            src={user.avatar_url}
            width="70"
            height="70"
            className="rounded-3"
          />
          <div className="info ms-4">
            <h2 className="fs-3 fw-bold">{user.name}</h2>
            <p className="email text-secondary">{user.email}</p>
          </div>
        </div>
        <div>
          <Button variant="outline-success">Free Plan</Button>
        </div>
      </div>
    </div>
  );
}

function DangerZone() {
  const { user } = useAuthContext();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (data.new_password !== data.confirm_password) {
        throw new Error("Confirm password do not match");
      }
      return await updatePassword(data);
    },
    onSuccess: () => {
      setShowPasswordModal(false);
    },
  });

  return (
    <div className="danger-zone border-top pt-4">
      <h5 className="fw-bold text-danger">Danger Zone</h5>
      <div className="mt-4">
        {user.oauth_provider == "clerk" && (
          <Alert variant="warning">
            Your account is managed by Clerk. Please update your password from
            your Clerk dashboard.
          </Alert>
        )}
        <Button
          variant="outline-danger"
          onClick={() => setShowPasswordModal(true)}
          disabled={user.oauth_provider !== "email"}
        >
          Update Password
        </Button>
        <Button variant="outline-danger" disabled className="ms-4">
          Delete Account
        </Button>
        {mutation.isSuccess && (
          <Alert variant="success" className="mt-4">Password updated successfully</Alert>
        )}
      </div>
      <PasswordFormModal
        show={showPasswordModal}
        handleClose={() => setShowPasswordModal(false)}
        onSubmit={(data) => mutation.mutate(data)}
        isLoading={mutation.isLoading}
        isError={mutation.isError}
        error={mutation.error}
        isSuccess={mutation.isSuccess}
      />
    </div>
  );
}

function AccountPage() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: tokens,
  } = useQuery({
    queryKey: ["tokens"],
    queryFn: listDeploymentTokens,
    retry: false,
  });

  const [newToken, setNewToken] = useState(null);

  const newTokenMutation = useMutation({
    mutationFn: async (name) => {
      return await createDeploymentToken(name);
    },
    onSuccess: (data) => {
      setNewToken(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleNewToken = async (token) => {
    await newTokenMutation.mutateAsync(token);
  };

  const handleNewTokenDone = () => {
    setNewToken(null);
    queryClient.invalidateQueries({ queryKey: ["tokens"] });
  };

  const handleRemoveToken = () => {
    queryClient.invalidateQueries({ queryKey: ["tokens"] });
  };

  return (
    <AuthProvider>
      <MainLayout title="Account | Runtime.land">
        <Container id="account-container">
          <AccountCard />
          <QueryWrapper isLoading={isLoading} isError={isError} error={error}>
            <TokensList
              tokens={tokens}
              newToken={newToken}
              handleNewToken={handleNewToken}
              handleNewTokenDone={handleNewTokenDone}
              handleRemoveToken={handleRemoveToken}
            />
          </QueryWrapper>
          <DangerZone />
        </Container>
      </MainLayout>
    </AuthProvider>
  );
}

export default AccountPage;
