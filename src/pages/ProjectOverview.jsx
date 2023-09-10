import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  disableDeployment,
  enableDeployment,
  publishDeployment,
} from "../api/deployments";
import DeploymentProd from "../components/DeploymentProd";
import DeploymentsList from "../components/DeploymentsList";
import ProjectHeader from "../components/ProjectHeader";
import { AuthProvider } from "../layouts/AuthContext";
import MainLayout from "../layouts/MainLayout";
import QueryWrapper from "../layouts/QueryWrapper";
import { clientv2 } from "../api/clientv2";

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
      const data = await clientv2.project.overview(projectName);
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

  return (
    <AuthProvider>
      <MainLayout title={projectName + " | Runtime.land"}>
        <QueryWrapper isLoading={isLoading} isError={isError} error={error}>
          <Container className="mx-auto" id="project-overview-container">
            <QueryWrapper isLoading={isLoading} isError={isError} error={error}>
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
            </QueryWrapper>
          </Container>
        </QueryWrapper>
      </MainLayout>
    </AuthProvider>
  );
}

export default ProjectOverviewPage;
