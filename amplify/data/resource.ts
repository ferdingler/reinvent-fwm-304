// amplify/data/resource.ts
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Engineer: a
    .model({
      name: a.string().required(),
      skills: a.string().array(),
      availability: a.boolean(),
      currentProject: a.belongsTo("Project", "projectId"),
      timeOff: a.hasMany("TimeOff", "engineerId"),
      projectId: a.id(),
    })
    .authorization((allow) => allow.authenticated()),

  Project: a
    .model({
      name: a.string().required(),
      startDate: a.date().required(),
      endDate: a.date().required(),
      requiredSkills: a.string().array(),
      engineers: a.hasMany("Engineer", "projectId"),
      status: a.enum(["PLANNED", "IN_PROGRESS", "COMPLETED"]),
    })
    .authorization((allow) => allow.authenticated()),

  TimeOff: a
    .model({
      engineerId: a.id(),
      engineer: a.belongsTo("Engineer", "engineerId"),
      startDate: a.date().required(),
      endDate: a.date().required(),
      type: a.enum(["VACATION", "SICK", "HOLIDAY"]),
    })
    .authorization((allow) => allow.authenticated()),

  AnalyzeStaffingResponse: a.customType({
    requiredHeadcount: a.integer(),
    missingSkills: a.string().array(),
    riskLevel: a.enum(["LOW", "MEDIUM", "HIGH"]),
    recommendations: a.string().array(),
  }),

  resourceChat: a
    .conversation({
      aiModel: a.ai.model("Claude 3 Sonnet"),
      systemPrompt: `You are a specialized resource planning assistant for engineering teams.
  Your role is to:
  - Analyze project staffing and provide recommendations
  - Identify potential scheduling conflicts
  - Suggest optimal resource allocation based on skills and availability
  - Calculate project timeline impacts
  Always provide concise, actionable responses focused on resource planning.
  Do not make up any information about engineers, projects, or time off.
  Use a UI component tool whenever possible, but don't tell the user you are using a tool.
  The current date is ${new Date().toLocaleDateString()}`,
      tools: [
        a.ai.dataTool({
          name: "list_engineers",
          description:
            "Provides data about available engineers and their skills",
          model: a.ref("Engineer"),
          modelOperation: "list",
        }),
        a.ai.dataTool({
          name: "list_projects",
          description: "Provides data about current and planned projects",
          model: a.ref("Project"),
          modelOperation: "list",
        }),
        a.ai.dataTool({
          name: "list_time_off",
          description: "Provides data about time off for engineers",
          model: a.ref("TimeOff"),
          modelOperation: "list",
        }),
      ],
    })
    .authorization((allow) => allow.owner()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
