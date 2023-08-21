import { Alert, Container } from "react-bootstrap";
import AdminEmailForm from "../../components/AdminEmailForm";
import AdminNavHeader from "../../components/AdminNavHeader";
import { isClerkJs } from "../../config";
import { AuthProvider } from "../../layouts/AuthContext";
import MainLayout from "../../layouts/MainLayout";

function AdminEmailPage() {
  return (
    <AuthProvider>
      <MainLayout title="Regions | Admin Panel | Runtime.land">
        <Container id="admin-page" className="mt-4">
          <h3 className="mb-3">Admin Panel</h3>
          <AdminNavHeader activeKey="email" />
          <p className="text-secondary py-2">
            The Email settings are used to configure the SMTP provider.
          </p>
          {isClerkJs && (
            <Alert variant="warning" className="mb-4">
              You are using ClerkJS social login, it's not required to configure
              SMTP.
            </Alert>
          )}
          <AdminEmailForm />
        </Container>
      </MainLayout>
    </AuthProvider>
  );
}

export default AdminEmailPage;
