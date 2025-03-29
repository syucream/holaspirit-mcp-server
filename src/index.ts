#!/usr/bin/env node

import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import * as schemas from './schemas.js';
import { createHolaspiritClient } from 'holaspirit-client-typescript-fetch';

const holaClient = createHolaspiritClient('https://app.holaspirit.com', {
  headers: {
    Authorization: `Bearer ${process.env.HOLASPIRIT_API_TOKEN}`,
  },
});

const server = new Server(
  {
    name: 'holaspirit-mcp-server',
    version: '0.0.1',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const apiToken = process.env.HOLASPIRIT_API_TOKEN;
if (!apiToken) {
  throw new Error('HOLASPIRIT_API_TOKEN environment variable is required');
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'holaspirit_list_tasks',
        description: 'List all tasks in the organization',
        inputSchema: zodToJsonSchema(schemas.ListTasksRequestSchema),
      },
      {
        name: 'holaspirit_list_metrics',
        description: 'List all metrics in the organization',
        inputSchema: zodToJsonSchema(schemas.ListMetricsRequestSchema),
      },
      {
        name: 'holaspirit_list_circles',
        description: 'List all circles in the organization',
        inputSchema: zodToJsonSchema(schemas.ListCirclesRequestSchema),
      },
      {
        name: 'holaspirit_get_circle',
        description: 'Get details of a specific circle',
        inputSchema: zodToJsonSchema(schemas.GetCircleRequestSchema),
      },
      {
        name: 'holaspirit_list_roles',
        description: 'List all roles in the organization',
        inputSchema: zodToJsonSchema(schemas.ListRolesRequestSchema),
      },
      {
        name: 'holaspirit_get_role',
        description: 'Get details of a specific role',
        inputSchema: zodToJsonSchema(schemas.GetRoleRequestSchema),
      },
      {
        name: 'holaspirit_list_domains',
        description: 'List all domains in the organization',
        inputSchema: zodToJsonSchema(schemas.ListDomainsRequestSchema),
      },
      {
        name: 'holaspirit_list_policies',
        description: 'List all policies in the organization',
        inputSchema: zodToJsonSchema(schemas.ListPoliciesRequestSchema),
      },
      {
        name: 'holaspirit_list_meetings',
        description: 'List all meetings in the organization',
        inputSchema: zodToJsonSchema(schemas.ListMeetingsRequestSchema),
      },
      {
        name: 'holaspirit_get_meeting',
        description: 'Get details of a specific meeting',
        inputSchema: zodToJsonSchema(schemas.GetMeetingRequestSchema),
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (!request.params) {
      throw new Error('Params are required');
    }

    switch (request.params.name) {
      case 'holaspirit_list_tasks': {
        const args = schemas.ListTasksRequestSchema.parse(
          request.params.arguments
        );
        const { data: apiResponse } = await holaClient.GET(
          '/api/organizations/{organization_id}/tasks',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
            },
          }
        );
        if (apiResponse?.data == null) {
          throw new Error('Tasks not found or invalid response format');
        }
        const parsed = schemas.ListTasksResponseSchema.parse(apiResponse.data);
        return {
          content: [{ type: 'text', text: JSON.stringify(parsed, null, 2) }],
        };
      }

      case 'holaspirit_list_metrics': {
        const args = schemas.ListMetricsRequestSchema.parse(
          request.params.arguments
        );
        const { data: apiResponse } = await holaClient.GET(
          '/api/organizations/{organization_id}/metrics',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
            },
          }
        );
        if (apiResponse?.data == null) {
          throw new Error('Metrics not found or invalid response format');
        }
        const parsed = schemas.ListMetricsResponseSchema.parse(
          apiResponse.data
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(parsed, null, 2) }],
        };
      }

      case 'holaspirit_list_circles': {
        const args = schemas.ListCirclesRequestSchema.parse(
          request.params.arguments
        );
        const { data: apiResponse } = await holaClient.GET(
          '/api/organizations/{organization_id}/circles',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
              query: {
                member: args.member,
                circle: args.circle,
                page: args.page,
                count: args.count,
              },
            },
          }
        );
        if (apiResponse?.data == null) {
          throw new Error('Circle not found');
        }
        const parsed = schemas.ListCirclesResponseSchema.parse(
          apiResponse.data
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(parsed, null, 2) }],
        };
      }

      case 'holaspirit_get_circle': {
        const args = schemas.GetCircleRequestSchema.parse(
          request.params.arguments
        );
        const { data: apiResponse } = await holaClient.GET(
          '/api/organizations/{organization_id}/circles/{circle_id}',
          {
            params: {
              path: {
                organization_id: args.organizationId,
                circle_id: args.circleId,
              },
            },
          }
        );
        if (apiResponse?.data == null) {
          throw new Error('Circle not found');
        }
        const parsed = schemas.GetCircleResponseSchema.parse(apiResponse.data);
        return {
          content: [{ type: 'text', text: JSON.stringify(parsed, null, 2) }],
        };
      }

      case 'holaspirit_list_roles': {
        const args = schemas.ListRolesRequestSchema.parse(
          request.params.arguments
        );
        const { data: apiResponse } = await holaClient.GET(
          '/api/organizations/{organization_id}/roles',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
              query: {
                member: args.member,
                circle: args.circle,
                page: args.page,
                count: args.count,
              },
            },
          }
        );
        if (apiResponse?.data == null) {
          throw new Error('Roles not found or invalid response format');
        }
        const parsed = schemas.ListRolesResponseSchema.parse(apiResponse.data);
        return {
          content: [{ type: 'text', text: JSON.stringify(parsed, null, 2) }],
        };
      }

      case 'holaspirit_get_role': {
        const args = schemas.GetRoleRequestSchema.parse(
          request.params.arguments
        );
        const { data: apiResponse } = await holaClient.GET(
          '/api/organizations/{organization_id}/roles/{role_id}',
          {
            params: {
              path: {
                organization_id: args.organizationId,
                role_id: args.roleId,
              },
            },
          }
        );
        if (apiResponse?.data == null) {
          throw new Error('Role not found or invalid response format');
        }
        const parsed = schemas.GetRoleResponseSchema.parse(apiResponse.data);
        return {
          content: [{ type: 'text', text: JSON.stringify(parsed, null, 2) }],
        };
      }

      case 'holaspirit_list_domains': {
        const args = schemas.ListDomainsRequestSchema.parse(
          request.params.arguments
        );
        const { data: apiResponse } = await holaClient.GET(
          '/api/organizations/{organization_id}/domains',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
            },
          }
        );
        if (apiResponse?.data == null) {
          throw new Error('Domains not found or invalid response format');
        }
        const parsed = schemas.ListDomainsResponseSchema.parse(
          apiResponse.data
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(parsed, null, 2) }],
        };
      }

      case 'holaspirit_list_policies': {
        const args = schemas.ListPoliciesRequestSchema.parse(
          request.params.arguments
        );
        const { data: apiResponse } = await holaClient.GET(
          '/api/organizations/{organization_id}/policies',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
            },
          }
        );
        if (apiResponse?.data == null) {
          throw new Error('Policies not found or invalid response format');
        }
        const parsed = schemas.ListPoliciesResponseSchema.parse(
          apiResponse.data
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(parsed, null, 2) }],
        };
      }

      case 'holaspirit_list_meetings': {
        const args = schemas.ListMeetingsRequestSchema.parse(
          request.params.arguments
        );
        const { data: apiResponse } = await holaClient.GET(
          '/api/organizations/{organization_id}/meetings',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
              query: {
                circle: args.circle,
                member: args.member,
                page: args.page,
                count: args.count,
              },
            },
          }
        );
        if (apiResponse?.data == null) {
          throw new Error('Meetings not found or invalid response format');
        }
        const parsed = schemas.ListMeetingsResponseSchema.parse(
          apiResponse.data
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(parsed, null, 2) }],
        };
      }

      case 'holaspirit_get_meeting': {
        const args = schemas.GetMeetingRequestSchema.parse(
          request.params.arguments
        );
        const { data: apiResponse } = await holaClient.GET(
          '/api/organizations/{organization_id}/meetings/{meeting_id}',
          {
            params: {
              path: {
                organization_id: args.organizationId,
                meeting_id: args.meetingId,
              },
            },
          }
        );
        if (apiResponse?.data == null) {
          throw new Error('Meeting not found or invalid response format');
        }
        const parsed = schemas.GetMeetingResponseSchema.parse(apiResponse.data);
        return {
          content: [{ type: 'text', text: JSON.stringify(parsed, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${request.params.name}`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(errorMessage);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Holaspirit MCP Server running on stdio');
}

runServer().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
