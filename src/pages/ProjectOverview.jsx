import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  disableDeployment,
  enableDeployment,
  publishDeployment,
} from "../api/deployments";
import { getProjectOverview } from "../api/projects";
import DeploymentProd from "../components/DeploymentProd";
import DeploymentsList from "../components/DeploymentsList";
import ProjectHeader from "../components/ProjectHeader";
import { AuthProvider } from "../layouts/AuthContext";
import MainLayout from "../layouts/MainLayout";
import LoadingPage from "./Loading";

function ProjectOverviewPage() {
  let { name: projectName } = useParams();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: overview,
  } = useQuery({
    queryKey: ["project-overview", { projectName }],
    queryFn: async ({ queryKey }) => {
      const { projectName } = queryKey[1];
      const data = await getProjectOverview(projectName);
      return data;
    },
    retry: false,
  });

  const publishMutation = useMutation({
    mutationFn: publishDeployment,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "project-overview",
        { projectName },
      ]);
    },
    onError: (error) => {},
  });

  const disableMutation = useMutation({
    mutationFn: disableDeployment,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "project-overview",
        { projectName },
      ]);
    },
    onError: (error) => {},
  });

  const enableMutation = useMutation({
    mutationFn: enableDeployment,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "project-overview",
        { projectName },
      ]);
    },
    onError: (error) => {},
  });

  const renderContainer = () => {
    if (isLoading) {
      return <LoadingPage />;
    }
    return (
      <Container className="mx-auto" id="project-overview-container">
        <ProjectHeader project={overview?.project} activeKey="overview" />
        <DeploymentProd project={overview?.project} />
        <DeploymentsList
          deployments={overview?.deployments || []}
          onPublish={(uuid) => {
            publishMutation.mutate(uuid);
          }}
          onDisable={(uuid) => {
            disableMutation.mutate(uuid);
          }}
          onEnable={(uuid) => {
            enableMutation.mutate(uuid);
          }}
        />
      </Container>
    );
  };

  return (
    <AuthProvider>
      <MainLayout title={projectName + " | Runtime.land"}>
        {renderContainer()}
      </MainLayout>
    </AuthProvider>
  );
}

export default ProjectOverviewPage;
