// src/test-data.ts
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

async function createTestData() {
  // Create multiple projects
  const projects = await Promise.all([
    client.models.Project.create({
      name: "Website Redesign",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      requiredSkills: ["React", "TypeScript", "UI/UX"],
      status: "PLANNED",
    }),
    client.models.Project.create({
      name: "Mobile App Development",
      startDate: "2024-03-15",
      endDate: "2024-08-30",
      requiredSkills: [
        "React Native",
        "TypeScript",
        "Mobile Design",
        "API Integration",
      ],
      status: "IN_PROGRESS",
    }),
    client.models.Project.create({
      name: "Backend Migration",
      startDate: "2024-05-01",
      endDate: "2024-07-31",
      requiredSkills: ["Node.js", "AWS", "Database", "DevOps"],
      status: "PLANNED",
    }),
  ]);

  // Create multiple engineers with diverse skills
  const engineers = await Promise.all([
    client.models.Engineer.create({
      name: "Jane Smith",
      skills: ["React", "TypeScript", "Node.js", "UI/UX"],
      availability: true,
      projectId: projects[0].data?.id,
    }),
    client.models.Engineer.create({
      name: "John Davis",
      skills: ["React Native", "TypeScript", "Mobile Design", "iOS"],
      availability: true,
      projectId: projects[1].data?.id,
    }),
    client.models.Engineer.create({
      name: "Maria Garcia",
      skills: ["Node.js", "AWS", "DevOps", "Python"],
      availability: false,
      projectId: projects[2].data?.id,
    }),
    client.models.Engineer.create({
      name: "Alex Chen",
      skills: ["React", "AWS", "Database", "API Design"],
      availability: true,
      projectId: projects[1].data?.id,
    }),
    client.models.Engineer.create({
      name: "Sarah Johnson",
      skills: ["UI/UX", "React", "Mobile Design", "TypeScript"],
      availability: true,
      projectId: projects[0].data?.id,
    }),
  ]);

  // Create various time-off records
  const timeOffRecords = await Promise.all([
    // Vacation time
    client.models.TimeOff.create({
      engineerId: engineers[0].data?.id,
      startDate: "2024-05-01",
      endDate: "2024-05-07",
      type: "VACATION",
    }),
    // Holiday
    client.models.TimeOff.create({
      engineerId: engineers[1].data?.id,
      startDate: "2024-04-15",
      endDate: "2024-04-15",
      type: "HOLIDAY",
    }),
    // Sick leave
    client.models.TimeOff.create({
      engineerId: engineers[2].data?.id,
      startDate: "2024-03-20",
      endDate: "2024-03-22",
      type: "SICK",
    }),
    // Extended vacation
    client.models.TimeOff.create({
      engineerId: engineers[3].data?.id,
      startDate: "2024-06-15",
      endDate: "2024-06-30",
      type: "VACATION",
    }),
    // Multiple entries for same engineer
    client.models.TimeOff.create({
      engineerId: engineers[4].data?.id,
      startDate: "2024-05-20",
      endDate: "2024-05-21",
      type: "SICK",
    }),
    client.models.TimeOff.create({
      engineerId: engineers[4].data?.id,
      startDate: "2024-07-01",
      endDate: "2024-07-14",
      type: "VACATION",
    }),
  ]);

  return {
    projects,
    engineers,
    timeOffRecords,
  };
}

// Run this in your browser console to create test data
declare global {
    interface Window {
      createTestData: typeof createTestData;
    }
}

// Run "createTestData" in your browser console to create test data
window.createTestData = createTestData;