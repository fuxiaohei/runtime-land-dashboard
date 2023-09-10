import { AuthProvider } from "../layouts/AuthContext";
import MainLayout from "../layouts/MainLayout";
import { Container, Alert } from "react-bootstrap";
import { useState } from "react";
import { clientv2 } from "../api/clientv2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import TemplateTabs from "../components/project-create/TemplateTabs";
import QueryWrapper from "../layouts/QueryWrapper";

function ProjectCreatePage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [createAlert, setCreateAlert] = useState("");
  const [projectData, setProjectData] = useState({});

  const handleCreate = async (data) => {
    await createMutation.mutateAsync(data);
  };

  const createMutation = useMutation({
    mutationFn: async (data) => {
      setProjectData(data);
      return await clientv2.project.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects-list"] });
      navigate("/projects/" + projectData.name + "/overview");
    },
    onError: (error) => {
      setCreateAlert(error.toString());
    },
  });

  const {
    isLoading,
    isError,
    error,
    data: templates,
  } = useQuery({
    queryKey: ["templates-list"],
    queryFn: clientv2.template.list,
    retry: false,
  });

  return (
    <AuthProvider>
      <MainLayout title="Create Project | Runtime.land">
        <Container id="project-create-container">
          <div className="projects-header mt-4">
            <h3 className="border-bottom mb-3 pb-3">Create a project</h3>
            <p className="text-secondary">
              To get started, choose from the templates as first step or create
              an empty project.
            </p>
            {createAlert && <Alert variant="danger">{createAlert}</Alert>}
            <QueryWrapper isLoading={isLoading} isError={isError} error={error}>
              <div id="project-create-tabs">
                <TemplateTabs data={templates} onCreate={handleCreate} />
              </div>
            </QueryWrapper>
          </div>
        </Container>
      </MainLayout>
    </AuthProvider>
  );
}

export default ProjectCreatePage;
