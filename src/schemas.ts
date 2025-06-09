import { z } from 'zod';

// Regular expression for validating IDs consisting of letters, numbers, and hyphens
const idPattern = /^[a-zA-Z0-9-]+$/;
const idErrorMessage = 'ID must consist of letters, numbers, and hyphens';

const ListBaseRequestSchema = z.object({
  page: z.number().min(1).describe('Page number').optional(),
  count: z.number().min(1).describe('Number of elements per page').optional(),
});
const ListBaseResponseSchema = z.object({
  pagination: z.object({
    currentPage: z.number(),
    pagesCount: z.number(),
  }),
});

// NOTE it strips some redundant fields
export const CircleSchema = z
  .object({
    id: z
      .string()
      .regex(idPattern, idErrorMessage)
      .describe('Unique identifier for the circle'),
    name: z.string(),
    role: z.string().regex(idPattern, idErrorMessage).optional(),
    parentCircle: z
      .string()
      .regex(idPattern, idErrorMessage)
      .nullable()
      .optional(),
    circleAdmins: z.array(z.string()).optional(),
    decisionMakers: z.array(z.string()).optional(),
    nonDecisionMakers: z.array(z.string()).optional(),
    coreRoles: z.array(z.string()).optional(),
    subRoles: z.array(z.string()).optional(),
    assigner: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
    lead: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
  })
  .strip();

// NOTE it strips some redundant fields
export const DomainSchema = z
  .object({
    id: z.string().regex(idPattern, idErrorMessage),
    description: z.string(),
    role: z.string(),
    policies: z.array(z.string()),
  })
  .strip();

// NOTE it strips some redundant fields
export const MeetingSchema = z
  .object({
    id: z.string().regex(idPattern, idErrorMessage),
    title: z.string().nullable().optional(),
    circle: z.string().regex(idPattern, idErrorMessage).nullable(),
    scheduledAt: z.string().nullable(),
    openedBy: z.string().nullable(),
    openedAt: z.string().nullable(),
    tensions: z.array(z.string()).optional(),
    attendees: z.array(z.string()).optional(),
    status: z.enum(['scheduled', 'processing', 'closed']),
    description: z.string().nullable(),
  })
  .strip();

export const MemberSchema = z
  .object({
    id: z.string().regex(idPattern, idErrorMessage),
    firstName: z.string().nullable().optional(),
    lastName: z.string().nullable().optional(),
    email: z.string().email().nullable().optional(),
    createdAt: z.string().optional(),
  })
  .strip();

// NOTE it strips some redundant fields
export const MetricSchema = z
  .object({
    id: z.string().regex(idPattern, idErrorMessage),
    global: z.boolean().nullable(),
    title: z.string().nullable(),
    body: z.string().nullable(),
    role: z.string().regex(idPattern, idErrorMessage).optional().nullable(),
    members: z.array(z.string()).optional(),
    mainLink: z.string().optional().nullable(),
    circle: z.string().regex(idPattern, idErrorMessage).optional().nullable(),
    lastCheckDate: z.string().optional().nullable(),
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
  })
  .strip();

// NOTE it strips some redundant fields
export const RoleSchema = z
  .object({
    id: z.string().regex(idPattern, idErrorMessage),
    name: z.string(),
    purpose: z.string().nullable().optional(),
    parentCircle: z
      .string()
      .regex(idPattern, idErrorMessage)
      .nullable()
      .optional(),
    circle: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
    domains: z.array(z.string()).nullable().optional(),
    members: z.array(z.string()).nullable().optional(),
    accountabilities: z.array(z.string()).optional(),
    assignedMembers: z.array(z.string()).optional(),
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
  body: z.string().nullable(),
  startDate: z.string().nullable().optional(),
  term: z.string().nullable(),
  progressions: z.array(z.string()).optional(),
  objectives: z.array(z.string().nullable()).optional(),
  labels: z.array(z.string().nullable()).optional(),
  boardTitle: z.string().nullable().optional(),
  board: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
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
  todoLists: z.array(z.string()).optional(),
  rootTask: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
});

// NOTE it strips some redundant fields
export const TensionSchema = z
  .object({
    id: z.string().regex(idPattern, idErrorMessage),
    status: z.enum([
      'draft',
      'ready',
      'attached',
      'gog',
      'objected',
      'accepted',
      'rejected',
      'stalled',
      'archived',
    ]),
    name: z.string().nullable(),
    body: z.string().nullable(),
    member: z.string().regex(idPattern, idErrorMessage).nullable(),
    circle: z.string().regex(idPattern, idErrorMessage).nullable(),
    createdAt: z.string(),
    meeting: z.string().regex(idPattern, idErrorMessage).nullable().optional(),
  })
  .strip();

// Common object type for foreignId, target, origin, tension
const FeedObjectType = z.enum([
  'attachment',
  'board',
  'checklist',
  'circle',
  'column',
  'objective',
  'meeting',
  'member',
  'metric',
  'policy',
  'publication',
  'role',
  'task',
  'tension',
]);

const FeedBaseObjectSchema = z.object({
  id: z.string().optional(),
  type: FeedObjectType.optional(),
  circle: z.string().optional(),
  title: z.string().optional(),
  name: z.string().optional(),
  deleted: z.boolean().optional(),
});

export const FeedSchema = z.object({
  id: z.string(),
  verb: z.string(),
  title: z.string(),
  object: FeedBaseObjectSchema,
  target: FeedBaseObjectSchema.nullable(),
  tension: z
    .object({
      id: z.string().optional(),
      type: FeedObjectType.optional(),
      name: z.string().optional(),
      deleted: z.boolean().optional(),
    })
    .nullable(),
  time: z.string(),
  updatedAt: z.string().nullable(),
});

export type Feed = z.infer<typeof FeedSchema>;

/**
 * Request Schemas
 */
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
export const GetCircleRequestSchema = z.object({
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
export const GetRoleRequestSchema = z.object({
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
export const GetMeetingRequestSchema = z.object({
  meetingId: z
    .string()
    .regex(idPattern, idErrorMessage)
    .describe('Unique identifier for the meeting'),
});
export const GetMemberFeedRequestSchema = z
  .object({
    memberId: z
      .string()
      .regex(idPattern, idErrorMessage)
      .describe('Unique identifier for the member'),
    activityType: z
      .string()
      .optional()
      .describe(
        'A comma separated list of: assignation|board|checklist|metric|objective|policy|publication|role|task|tension'
      )
      .refine(
        (v) =>
          v === undefined ||
          v
            .split(',')
            .every((item) =>
              [
                'assignation',
                'board',
                'checklist',
                'metric',
                'objective',
                'policy',
                'publication',
                'role',
                'task',
                'tension',
              ].includes(item.trim())
            ),
        {
          message: `activityType must be a comma-separated list of valid types: assignation, board, checklist, metric, objective, policy, publication, role, task, tension`,
        }
      ),
    event: z
      .enum(['assigned', 'unassigned', 'elected', 'scope'])
      .optional()
      .describe('Use only with activityType=assignation'),
    minTime: z
      .string()
      .optional()
      .describe('Filter elements by date (ISO 8601 format)'),
    maxTime: z
      .string()
      .optional()
      .describe(
        'Pager: time of the last element of the previous page (ISO 8601 format)'
      ),
    count: z
      .number()
      .positive()
      .optional()
      .describe('Pager: number of elements per page'),
  })
  .superRefine((data, ctx) => {
    if (
      data.event &&
      (!data.activityType ||
        !data.activityType.split(',').includes('assignation'))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'event can only be used when activityType includes "assignation"',
        path: ['event'], // Path to the field causing the error
      });
    }
  });

export const GetTensionsRequestSchema = z.object({
  meetingIds: z
    .array(z.string().regex(idPattern, idErrorMessage))
    .min(1)
    .describe('List of unique meeting IDs'),
});

export const SearchMemberRequestSchema = z.object({
  email: z
    .string()
    .email()
    .describe('Email address of the member to search for'),
});

/**
 * Response Schemas
 */
export const ListCirclesResponseSchema = ListBaseResponseSchema.extend({
  items: z.array(CircleSchema),
});
export const GetCircleResponseSchema = CircleSchema.extend({
  linked: z
    .object({
      roles: z.array(RoleSchema).optional(),
    })
    .optional(),
});
export const ListDomainsResponseSchema = ListBaseResponseSchema.extend({
  items: z.array(DomainSchema),
});
export const ListMeetingsResponseSchema = ListBaseResponseSchema.extend({
  items: z.array(MeetingSchema),
});
export const GetMeetingResponseSchema = MeetingSchema.extend({
  linked: z
    .object({
      tensions: z.array(TensionSchema).optional(),
    })
    .optional(),
});
export const ListMetricsResponseSchema = ListBaseResponseSchema.extend({
  items: z.array(MeetingSchema),
});
export const ListPoliciesResponseSchema = ListBaseResponseSchema.extend({
  items: z.array(PolicySchema),
});
export const ListRolesResponseSchema = ListBaseResponseSchema.extend({
  items: z.array(RoleSchema),
});
export const GetRoleResponseSchema = RoleSchema;
export const ListTasksResponseSchema = ListBaseResponseSchema.extend({
  items: z.array(TaskSchema),
});
export const GetMemberFeedResponseSchema = z.array(FeedSchema);

export const GetTensionsResponseSchema = z.object({
  tensions: z.array(TensionSchema),
  failures: z.array(
    z.object({
      meetingId: z.string(),
      error: z.string().optional(),
    })
  ),
});

export const SearchMemberResponseSchema = MemberSchema;
