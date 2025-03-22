import { z } from 'zod';

// Regular expression for validating IDs consisting of lowercase letters and numbers
const idRegex = /^[a-z0-9]+$/;

const BaseSchema = z.object({
  organizationId: z
    .string()
    .regex(idRegex, 'ID must consist of lowercase letters and numbers only')
    .describe('Unique identifier for the organization'),
});

export const ListTasksSchema = BaseSchema;
export const ListMetricsSchema = BaseSchema;
export const ListCirclesSchema = BaseSchema;
export const GetCircleSchema = BaseSchema.extend({
  circleId: z
    .string()
    .regex(idRegex, 'ID must consist of lowercase letters and numbers only')
    .describe('Unique identifier for the circle'),
});
export const ListRolesSchema = BaseSchema;
export const GetRoleSchema = BaseSchema.extend({
  roleId: z
    .string()
    .regex(idRegex, 'ID must consist of lowercase letters and numbers only')
    .describe('Unique identifier for the role'),
});
export const ListDomainsSchema = BaseSchema;
export const ListPoliciesSchema = BaseSchema;
export const ListMeetingsSchema = BaseSchema;
export const GetMeetingSchema = BaseSchema.extend({
  meetingId: z
    .string()
    .regex(idRegex, 'ID must consist of lowercase letters and numbers only')
    .describe('Unique identifier for the meeting'),
});
