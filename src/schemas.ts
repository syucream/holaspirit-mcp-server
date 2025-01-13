import { z } from 'zod';

// リクエストスキーマ
const BaseSchema = z.object({
  organizationId: z.string(),
});

export const ListTasksSchema = BaseSchema;
export const ListMetricsSchema = BaseSchema;
export const ListCirclesSchema = BaseSchema;
export const GetCircleSchema = BaseSchema.extend({
  circleId: z.string(),
});
export const ListRolesSchema = BaseSchema;
export const GetRoleSchema = BaseSchema.extend({
  roleId: z.string(),
});
export const ListDomainsSchema = BaseSchema;
export const ListPoliciesSchema = BaseSchema;
export const ListMeetingsSchema = BaseSchema;
export const GetMeetingSchema = BaseSchema.extend({
  meetingId: z.string(),
});
