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
    Avatar,
  } from "@aws-amplify/ui-react";
  import { generateClient } from "aws-amplify/data";
  import { useEffect, useState } from "react";
  import type { Schema } from "../../amplify/data/resource";
  
  const client = generateClient<Schema>();
  
  type Engineer = Schema["Engineer"]["type"];
  type Project = Schema["Project"]["type"];
  type TimeOff = Schema["TimeOff"]["type"];
  
  export function ResourceDashboard() {
    const [engineers, setEngineers] = useState<Engineer[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [vacations, setVacations] = useState<TimeOff[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function loadData() {
        try {
          const [engineersData, projectsData, vacationData] = await Promise.all([
            client.models.Engineer.list(),
            client.models.Project.list(),
            client.models.TimeOff.list(),
          ]);
  
          setEngineers(engineersData.data);
          setProjects(projectsData.data);
          setVacations(vacationData.data);
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
                  {(engineer: Engineer) => (
                    <Card key={engineer.id} padding="1rem" variation="elevated">
                    <Flex direction="row" gap="1rem" alignItems="flex-start">
                      <Avatar
                        src={`https://i.pravatar.cc/300#${engineer.id}`}
                        size="large"
                        alt={engineer.name}
                      />
                      <Flex direction="column" gap="0.5rem" flex="1">
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text variation="primary" fontSize="1.1rem" fontWeight="bold">
                            {engineer.name}
                          </Text>
                          <Badge variation={engineer.availability ? "success" : "error"}>
                            {engineer.availability ? "Available" : "Assigned"}
                          </Badge>
                        </Flex>
                
                        <Flex gap="0.5rem" wrap="wrap">
                          {engineer.skills?.filter(Boolean).map((skill) => (
                            <Badge key={skill} variation="info" size="small">
                              {skill}
                            </Badge>
                          ))}
                        </Flex>
                
                        {engineer.projectId && (
                          <Text variation="secondary" fontSize="0.9rem">
                            Current Project:{" "}
                            <span style={{ fontWeight: "500" }}>
                              {projects.find(p => p.id === engineer.projectId)?.name}
                            </span>
                          </Text>
                        )}
                      </Flex>
                    </Flex>
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
            {
              label: "TimeOff",
              value: "TimeOff",
              content: (
                <Collection
                  items={vacations}
                  type="list"
                  gap="1rem"
                  padding="1rem"
                >
                  {(vacation: TimeOff) => (
                    <Card key={vacation.id}>
                      <Flex
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Flex direction="column" gap="0.5rem">
                          <Text variation="primary" fontWeight="bold">
                            {engineers.find((e: Engineer) => e.id === vacation.engineerId)?.name}
                          </Text>
                        </Flex>
                        <Badge variation="info">
                          {vacation.type}
                        </Badge>
                      </Flex>
                      <Text variation="secondary">
                        {new Date(vacation.startDate).toLocaleDateString()} -{" "}
                        {new Date(vacation.endDate).toLocaleDateString()}
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