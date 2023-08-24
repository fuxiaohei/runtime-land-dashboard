import { useQuery } from "@tanstack/react-query";
import { Card, Container } from "react-bootstrap";
import { BiDetail, BiLayer, BiServer, BiUserCircle } from "react-icons/bi";
import { getStats } from "../../api/settings";
import AdminNavHeader from "../../components/AdminNavHeader";
import { AuthProvider } from "../../layouts/AuthContext";
import MainLayout from "../../layouts/MainLayout";
import QueryWrapper from "../../layouts/QueryWrapper";

function AdminStatsPage() {
  const {
    isLoading,
    isError,
    error,
    data: stats,
  } = useQuery({
    queryKey: ["settings-stats"],
    queryFn: getStats,
    retry: false,
  });

  return (
    <AuthProvider>
      <MainLayout title="Stats | Admin Panel | Runtime.land">
        <Container id="admin-page" className="mt-4">
          <h3 className="mb-2 border-bottom pb-3">Admin Panel</h3>
          <div className="d-flex justify-content-start">
            <AdminNavHeader activeKey="stats" />
            <div>
              <p className="text-secondary py-2">
                Runtime.land is currently serving:
              </p>
              <QueryWrapper
                isLoading={isLoading}
                isError={isError}
                error={error}
              >
                <div className="d-flex justify-content-start">
                  <Card className="me-4 stats-card">
                    <Card.Body>
                      <Card.Title>Users</Card.Title>
                      <Card.Text className="d-flex justify-content-between">
                        <span className="fs-3 fw-bold">{stats?.users}</span>
                        <BiUserCircle
                          size={40}
                          className="text-opacity-75 text-secondary"
                        />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className="me-4 stats-card">
                    <Card.Body>
                      <Card.Title>Projects</Card.Title>
                      <Card.Text className="d-flex justify-content-between">
                        <span className="fs-3 fw-bold">{stats?.projects}</span>
                        <BiDetail
                          size={40}
                          className="text-opacity-75 text-secondary"
                        />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className="me-4 stats-card">
                    <Card.Body>
                      <Card.Title>Deployments</Card.Title>
                      <Card.Text className="d-flex justify-content-between">
                        <span className="fs-3 fw-bold">
                          {stats?.deployments}
                        </span>
                        <BiLayer
                          size={40}
                          className="text-opacity-75 text-secondary"
                        />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className="me-4 stats-card">
                    <Card.Body>
                      <Card.Title>Regions</Card.Title>
                      <Card.Text className="d-flex justify-content-between">
                        <span className="fs-3 fw-bold">{stats?.regions}</span>
                        <BiServer
                          size={40}
                          className="text-opacity-75 text-secondary"
                        />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </QueryWrapper>
            </div>
          </div>
        </Container>
      </MainLayout>
    </AuthProvider>
  );
}

export default AdminStatsPage;
