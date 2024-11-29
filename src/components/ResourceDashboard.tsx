// src/components/ResourceDashboard.tsx
import {
    Badge,
    Card,
    Collection,
    Flex,
    Heading,
    Loader,
    Tabs,
    Text,
  } from "@aws-amplify/ui-react";
  import { generateClient } from "aws-amplify/data";
  import { useEffect, useState } from "react";
  import type { Schema } from "../../amplify/data/resource";
  
  const client = generateClient<Schema>();
  
  type Engineer = Schema["Engineer"]["type"];
  type Project = Schema["Project"]["type"];
  
  export function ResourceDashboard() {
    const [engineers, setEngineers] = useState<Engineer[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function loadData() {
        try {
          const [engineersData, projectsData] = await Promise.all([
            client.models.Engineer.list(),
            client.models.Project.list(),
          ]);
  
          setEngineers(engineersData.data);
          setProjects(projectsData.data);
        } catch (err) {
          console.error("Error loading data:", err);
        } finally {
          setLoading(false);
        }
      }
  
      loadData();
    }, []);
  
    if (loading) return <Loader />;
  
    return (
      <Card>
        <Heading level={3}>Team Resources</Heading>
        <Tabs
          justifyContent="flex-start"
          defaultValue="Engineers"
          items={[
            {
              label: "Engineers",
              value: "Engineers",
              content: (
                <Collection
                  items={engineers}
                  type="list"
                  gap="1rem"
                  padding="1rem"
                >
                  {(engineer) => (
                    <Card key={engineer.id}>
                      <Flex
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Flex direction="column" gap="0.5rem">
                          <Text variation="primary" fontWeight="bold">
                            {engineer.name}
                          </Text>
                          <Flex gap="0.5rem">
                            {engineer.skills
                              ?.filter((m) => m)
                              .map((skill) => (
                                <Badge key={skill} variation="info">
                                  {skill}
                                </Badge>
                              ))}
                          </Flex>
                        </Flex>
                        <Badge
                          variation={engineer.availability ? "success" : "error"}
                        >
                          {engineer.availability ? "Available" : "Assigned"}
                        </Badge>
                      </Flex>
                      {engineer.projectId && (
                        <Text variation="secondary">
                          Current Project:
                          {
                            projects.filter(
                              (m) => m.id === engineer.projectId,
                            )?.[0].name
                          }
                        </Text>
                      )}
                    </Card>
                  )}
                </Collection>
              ),
            },
            {
              label: "Projects",
              value: "Projects",
              content: (
                <Collection
                  items={projects}
                  type="list"
                  gap="1rem"
                  padding="1rem"
                >
                  {(project) => (
                    <Card key={project.id}>
                      <Flex
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Flex direction="column" gap="0.5rem">
                          <Text variation="primary" fontWeight="bold">
                            {project.name}
                          </Text>
                          <Flex gap="0.5rem">
                            {project.requiredSkills
                              ?.filter((s) => s)
                              .map((skill) => (
                                <Badge key={skill} variation="info">
                                  {skill}
                                </Badge>
                              ))}
                          </Flex>
                        </Flex>
                        <Badge
                          variation={
                            project.status === "IN_PROGRESS"
                              ? "success"
                              : project.status === "COMPLETED"
                              ? "warning"
                              : "info"
                          }
                        >
                          {project.status}
                        </Badge>
                      </Flex>
                      <Text variation="secondary">
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </Text>
                    </Card>
                  )}
                </Collection>
              ),
            },
          ]}
        />
      </Card>
    );
  }