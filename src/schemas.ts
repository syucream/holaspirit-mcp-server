import { z } from 'zod';

// Regular expression for validating IDs consisting of letters, numbers, and hyphens
const idPattern = /^[a-zA-Z0-9-]+$/;
const idErrorMessage = 'ID must consist of letters, numbers, and hyphens';

const BaseRequestSchema = z.object({
  organizationId: z
    .string()
    .regex(idPattern, idErrorMessage)
    .describe('Unique identifier for the organization'),
});
const ListBaseRequestSchema = BaseRequestSchema.extend({
  page: z.number().min(1).describe('Page number').optional(),
  count: z.number().min(1).describe('Number of elements per page').optional(),
});

// NOTE it strips some redundant fields
export const CircleSchema = z
  .object({
    id: z
      .string()
      .regex(idPattern, idErrorMessage)
      .describe('Unique identifier for the circle'),
    // organization: z.string().regex(idPattern, idErrorMessage).optional(),
    name: z.string(),
    // slug: z.string().optional(),
    role: z.string().regex(idPattern, idErrorMessage).optional(),
    parentCircle: z
      .string()
      .regex(idPattern, idErrorMessage)
      .nullable()
      .optional(),
    // policies: z.array(z.string()).optional(),
    // createdAt: z.string().optional(),
    // updatedAt: z.string().optional(),
    // timeSpent: z
    //   .object({
    //     totalMemberCount: z.number(),
    //     FTEFilledMemberCount: z.number(),
    //     roleCount: z.number(),
    //     FTEValue: z.number(),
    //   })
    //   .nullable()
    //   .optional(),
    // settings: CircleSettingsSchema.optional(),
    circleAdmins: z.array(z.string()).optional(),
    decisionMakers: z.array(z.string()).optional(),
    nonDecisionMakers: z.array(z.string()).optional(),
    coreRoles: z.array(z.string()).optional(),
    subRoles: z.array(z.string()).optional(),
    assigner: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
    lead: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
    // type: z.literal('circles'),
    // membersCount: z.number().optional(),
    // rolesCount: z.number().optional(),
    // version: z.number().optional(),
  })
  .strip();

// NOTE it strips some redundant fields
export const DomainSchema = z
  .object({
    id: z.string().regex(idPattern, idErrorMessage),
    description: z.string(),
    role: z.string(),
    policies: z.array(z.string()),
    // type: z.literal('domains')
  })
  .strip();

// NOTE it strips some redundant fields
export const MeetingSchema = z
  .object({
    id: z.string().regex(idPattern, idErrorMessage),
    title: z.string().nullable().optional(),
    // createdAt: z.string(),
    // updatedAt: z.string(),
    circle: z.string().regex(idPattern, idErrorMessage).nullable(),
    circleName: z.string().nullable(),
    // meetingTemplate: z.string().regex(idPattern, idErrorMessage).nullable(),
    createdBy: z.string().regex(idPattern, idErrorMessage).nullable(),
    // scheduledAt: z.string().nullable(),
    // duration: z.number().nullable(),
    secretary: z.string().nullable(),
    openedBy: z.string().nullable(),
    openedAt: z.string().nullable(),
    tensions: z.array(z.string()).optional(),
    attendees: z.array(z.string()).optional(),
    // tensionsCount: z.number(),
    channel: z.string(),
    status: z.enum(['scheduled', 'processing', 'closed']),
    recurrent: z.boolean().nullable(),
    meetingRecurrence: z
      .string()
      .regex(idPattern, idErrorMessage)
      .nullable()
      .optional(),
    evolutionOutOfMeeting: z.boolean(),
    // type: z.literal('meetings'),
    // location: z.string().nullable(),
    description: z.string().nullable(),
    // videoConfUrl: z.string().nullable(),
    // templateSettings: z.array(z.record(z.unknown())).nullable(),
    // version: z.number(),
    // private: z.boolean().optional(),
    context: z.object({}),
    // calendarSync: z.string().nullable().optional()
  })
  .strip();

// NOTE it strips some redundant fields
export const MetricSchema = z
  .object({
    id: z.string().regex(idPattern, idErrorMessage),
    global: z.boolean().nullable(),
    // template: z.string().regex(idPattern, idErrorMessage).optional().nullable(),
    title: z.string().nullable(),
    body: z.string().nullable(),
    role: z.string().regex(idPattern, idErrorMessage).optional().nullable(),
    members: z.array(z.string()).optional(),
    recurrence: z.string().nullable(),
    mainLink: z.string().optional().nullable(),
    // isDraft: z.boolean().optional().nullable(),
    circle: z.string().regex(idPattern, idErrorMessage).optional().nullable(),
    lastCheckDate: z.string().optional().nullable(),
    // createdAt: z.string().nullable(),
    // updatedAt: z.string().nullable(),
    // type: z.literal('metrics'),
    // version: z.number().nullable()
  })
  .strip();

// NOTE it strips some redundant fields
export const PolicySchema = z
  .object({
    id: z.string().regex(idPattern, idErrorMessage),
    title: z.string(),
    body: z.string().nullable(),
    circle: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
    domain: z.string().nullable(),
    domainRole: z.string().nullable(),
    // type: z.literal('policies'),
    // version: z.number().optional()
  })
  .strip();

// NOTE it strips some redundant fields
export const RoleSchema = z
  .object({
    id: z.string().regex(idPattern, idErrorMessage),
    // organization: z.string().uuid().optional(),
    name: z.string(),
    // translatedName: z.string().nullable().optional(),
    // slug: z.string().optional(),
    purpose: z.string().nullable().optional(),
    // translatedPurpose: z.string().nullable().optional(),
    parentCircle: z
      .string()
      .regex(idPattern, idErrorMessage)
      .nullable()
      .optional(),
    circle: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
    domains: z.array(z.string()).nullable().optional(),
    members: z.array(z.string()).nullable().optional(),
    accountabilities: z.array(z.string()),
    transversalRoleDomains: z.array(z.string()).nullable().optional(),
    transversalRoleAccountabilities: z.array(z.string()).nullable().optional(),
    assignedMembers: z.array(z.string()),
    transversalRoleMembers: z.array(z.string()).nullable().optional(),
    transversalRoleTargets: z.array(z.string()).nullable().optional(),
    transversalRolePolicies: z.array(z.string()).nullable().optional(),
    hasAssignation: z.boolean().optional(),
    isTransversalRole: z.boolean().optional(),
    // createdAt: z.string().optional(),
    // updatedAt: z.string().optional(),
    template: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
    transversalRole: z
      .string()
      .regex(idPattern, idErrorMessage)
      .nullable()
      .optional(),
    visibleSubRoles: z.array(z.string()).nullable().optional(),
    visibleSubMembers: z.array(z.string()),
    policies: z.array(z.string()).optional(),
    memberFocus: z.string().nullable().optional(),
    effortNeeded: z.number().nullable().optional(),
    // timeSpent: z
    //   .object({
    //     totalMemberCount: z.number(),
    //     FTEFilledMemberCount: z.number(),
    //     FTEValue: z.number(),
    //   })
    //   .nullable()
    //   .optional(),
    // settings: RoleSettingsSchema.optional(),
    // stats: RoleStatsSchema.optional(),
    // currentEvolutionsCount: z.number().optional(),
    // currentEvolutions: z.array(z.string()).optional(),
    // type: z.enum(['roles']),
    // customFields: z.record(CustomFieldValueSchema).optional(),
    highlights: z.array(z.string()).optional(),
    highlightsColor: z.array(z.string()).optional(),
    // version: z.number().optional(),
  })
  .strip();

// NOTE it strips some redundant fields
export const TaskSchema = z.object({
  id: z
    .string()
    .regex(idPattern, idErrorMessage)
    .describe('Unique identifier for the task'),
  title: z.string().nullable(),
  status: z.enum(['done', 'current']).nullable(),
  column: z.string().nullable().optional(),
  // isDraft: z.boolean().nullable().optional(),
  // private: z.boolean().nullable().optional(),
  body: z.string().nullable(),
  // position: z.number().nullable(),
  startDate: z.string().nullable().optional(),
  term: z.string().nullable(),
  progressions: z.array(z.string()).optional(),
  objectives: z.array(z.string().nullable()).optional(),
  labels: z.array(z.string().nullable()).optional(),
  boardTitle: z.string().nullable().optional(),
  board: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
  // createdAt: z.string().optional(),
  // updatedAt: z.string().optional(),
  // archivedAt: z.string().optional(),
  // attachmentCount: z.number().optional(),
  breadcrumb: z
    .array(
      z.object({
        id: z.string().regex(idPattern, idErrorMessage).optional(),
        title: z.string().optional(),
      })
    )
    .optional(),
  tension: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
  checked: z.boolean().nullable().optional(),
  // completedAt: z.string().nullable().optional(),
  // type: z.literal('tasks'),
  // version: z.number().nullable(),
  // external: z.boolean().nullable(),
  todoLists: z.array(z.string()).optional(),
  // todoListsCount: z.number(),
  // todoListsSubtasksCount: z.number(),
  // todoListsCheckedSubtasksCount: z.number(),
  parent: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
  context: z.object({}),
  externalService: z.string().nullable().optional(),
  rootTask: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
});

export const ListTasksRequestSchema = ListBaseRequestSchema;
export const ListMetricsRequestSchema = ListBaseRequestSchema;
export const ListCirclesRequestSchema = ListBaseRequestSchema.extend({
  member: z
    .string()
    .describe('Comma-separated unique identifiers for the member')
    .optional(),
  circle: z
    .string()
    .describe('Comma-separated unique identifiers for the circle')
    .optional(),
});
export const GetCircleRequestSchema = BaseRequestSchema.extend({
  circleId: z
    .string()
    .regex(idPattern, idErrorMessage)
    .describe('Unique identifier for the circle'),
});
export const ListRolesRequestSchema = ListBaseRequestSchema.extend({
  member: z
    .string()
    .describe('Comma-separated unique identifiers for the member')
    .optional(),
  circle: z
    .string()
    .describe('Comma-separated unique identifiers for the circle')
    .optional(),
});
export const GetRoleRequestSchema = BaseRequestSchema.extend({
  roleId: z
    .string()
    .regex(idPattern, idErrorMessage)
    .describe('Unique identifier for the role'),
});
export const ListDomainsRequestSchema = ListBaseRequestSchema;
export const ListPoliciesRequestSchema = ListBaseRequestSchema;
export const ListMeetingsRequestSchema = ListBaseRequestSchema.extend({
  circle: z
    .string()
    .describe('Comma-separated unique identifiers for the circle')
    .optional(),
  member: z
    .string()
    .describe('Comma-separated unique identifiers for the member')
    .optional(),
});
export const GetMeetingRequestSchema = BaseRequestSchema.extend({
  meetingId: z
    .string()
    .regex(idPattern, idErrorMessage)
    .describe('Unique identifier for the meeting'),
});

export const ListCirclesResponseSchema = z.array(CircleSchema);
export const GetCircleResponseSchema = CircleSchema;
export const ListDomainsResponseSchema = z.array(DomainSchema);
export const ListMeetingsResponseSchema = z.array(MeetingSchema);
export const GetMeetingResponseSchema = MeetingSchema;
export const ListMetricsResponseSchema = z.array(MetricSchema);
export const ListPoliciesResponseSchema = z.array(PolicySchema);
export const ListRolesResponseSchema = z.array(RoleSchema);
export const GetRoleResponseSchema = RoleSchema;
export const ListTasksResponseSchema = z.array(TaskSchema);
