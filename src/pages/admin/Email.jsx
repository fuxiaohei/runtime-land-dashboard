import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Container } from "react-bootstrap";
import { getEmailSettings, updateEmailSettings } from "../../api/settings";
import AdminEmailForm from "../../components/AdminEmailForm";
import AdminNavHeader from "../../components/AdminNavHeader";
import { isClerkJs } from "../../config";
import { AuthProvider } from "../../layouts/AuthContext";
import MainLayout from "../../layouts/MainLayout";
import QueryWrapper from "../../layouts/QueryWrapper";

function AdminEmailPage() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings-email"],
    queryFn: getEmailSettings,
    retry: false,
  });

  const mutation = useMutation(updateEmailSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries("settings-email");
    },
  });

  return (
    <AuthProvider>
      <MainLayout title="Regions | Admin Panel | Runtime.land">
        <Container id="admin-page" className="mt-4">
          <h3 className="mb-2 border-bottom pb-3">Admin Panel</h3>
          <div className="d-flex justify-content-start">
            <AdminNavHeader activeKey="email" />
            <div>
              <p className="text-secondary py-2">
                The Email settings are used to configure the SMTP provider.
              </p>
              {isClerkJs && (
                <Alert variant="warning" className="mb-4">
                  You are using ClerkJS social login, it's not required to
                  configure SMTP.
                </Alert>
              )}
              <QueryWrapper
                isLoading={isLoading}
                isError={isError}
                error={error}
              >
                <AdminEmailForm
                  data={settings || {}}
                  onSubmit={(data) => mutation.mutate(data)}
                  isSuccess={mutation.isSuccess}
                  isError={mutation.isError}
                  error={mutation.error}
                  isLoading={mutation.isLoading}
                />
              </QueryWrapper>
            </div>
          </div>
        </Container>
      </MainLayout>
    </AuthProvider>
  );
}

export default AdminEmailPage;
