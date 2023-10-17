import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import { clientv2 } from "../api/clientv2";
import { createProject } from "../api/projects";
import ProjectCreateModal from "../components/ProjectCreateModal";
import ProjectStartGuide from "../components/ProjectStartGuide";
import ProjectsList from "../components/ProjectsList";
import { AuthProvider } from "../layouts/AuthContext";
import { ButtonLink } from "../layouts/Links";
import MainLayout from "../layouts/MainLayout";
import QueryWrapper from "../layouts/QueryWrapper";

function ProjectsHeader({ count, onShow, onSearch }) {
  return (
    <div className="projects-header mt-4 d-flex justify-content-between">
      <h3>
        Projects
        <span className="text-secondary fs-5 ms-3 fw-bold">({count})</span>
      </h3>
      <div>
        <Form className="d-inline-block align-middle">
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="filter by project name"
              aria-label="Search"
              onChange={(e) => onSearch(e.target.value)}
            />
            <ButtonLink variant="primary" to="/new">
              + New Project
            </ButtonLink>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const queryClient = useQueryClient();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createAlert, setCreateAlert] = useState("");

  const {
    isLoading,
    isError,
    error,
    data: projects,
  } = useQuery({
    queryKey: ["projects-list"],
    queryFn: clientv2.project.list,
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      return await createProject(data);
    },
    onSuccess: () => {
      setShowCreateModal(false);
      setCreateAlert("");
      queryClient.invalidateQueries({ queryKey: ["projects-list"] });
    },
    onError: (error) => {
      setCreateAlert(error.toString());
    },
  });

  const [searchFilter, setSearchFilter] = useState("all");

  const handleSearch = (search) => {
    setSearchFilter(search);
  };

  const filterProjects = (projects) => {
    projects = projects || [];
    if (searchFilter === "all") {
      return projects;
    }
    return projects.filter((project) => {
      return project.project.name.includes(searchFilter);
    });
  };

  const filtered_projects = filterProjects(projects);

  return (
    <AuthProvider>
      <MainLayout title="Projects | Runtime.land">
        <QueryWrapper isLoading={isLoading} isError={isError} error={error}>
          <Container className="mx-auto" id="projects-list-container">
            <ProjectsHeader
              count={filtered_projects?.length || 0}
              onShow={() => setShowCreateModal(true)}
              onSearch={handleSearch}
            />
            {filtered_projects.length ? (
              <ProjectsList projects={filtered_projects || []} />
            ) : (
              <div className="mt-4 text-secondary">
                <p className="fs-4">No projects found.</p>
                {searchFilter == "all" && <ProjectStartGuide />}
              </div>
            )}
            <ProjectCreateModal
              show={showCreateModal}
              handleClose={() => setShowCreateModal(false)}
              handleCreate={(data) => createMutation.mutate(data)}
              alert={createAlert}
            />
          </Container>
        </QueryWrapper>
      </MainLayout>
    </AuthProvider>
  );
}

export default ProjectsPage;
