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
        name: 'list_tasks',
        description: 'List all tasks in the organization',
        inputSchema: zodToJsonSchema(schemas.ListTasksSchema),
      },
      {
        name: 'list_metrics',
        description: 'List all metrics in the organization',
        inputSchema: zodToJsonSchema(schemas.ListMetricsSchema),
      },
      {
        name: 'list_circles',
        description: 'List all circles in the organization',
        inputSchema: zodToJsonSchema(schemas.ListCirclesSchema),
      },
      {
        name: 'get_circle',
        description: 'Get details of a specific circle',
        inputSchema: zodToJsonSchema(schemas.GetCircleSchema),
      },
      {
        name: 'list_roles',
        description: 'List all roles in the organization',
        inputSchema: zodToJsonSchema(schemas.ListRolesSchema),
      },
      {
        name: 'get_role',
        description: 'Get details of a specific role',
        inputSchema: zodToJsonSchema(schemas.GetRoleSchema),
      },
      {
        name: 'list_domains',
        description: 'List all domains in the organization',
        inputSchema: zodToJsonSchema(schemas.ListDomainsSchema),
      },
      {
        name: 'list_policies',
        description: 'List all policies in the organization',
        inputSchema: zodToJsonSchema(schemas.ListPoliciesSchema),
      },
      {
        name: 'list_meetings',
        description: 'List all meetings in the organization',
        inputSchema: zodToJsonSchema(schemas.ListMeetingsSchema),
      },
      {
        name: 'get_meeting',
        description: 'Get details of a specific meeting',
        inputSchema: zodToJsonSchema(schemas.GetMeetingSchema),
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (!request.params.arguments) {
      throw new Error('Arguments are required');
    }

    switch (request.params.name) {
      case 'list_tasks': {
        const args = schemas.ListTasksSchema.parse(request.params.arguments);
        const { data } = await holaClient.GET(
          '/api/organizations/{organization_id}/tasks',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
            },
          }
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'list_metrics': {
        const args = schemas.ListMetricsSchema.parse(request.params.arguments);
        const { data } = await holaClient.GET(
          '/api/organizations/{organization_id}/metrics',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
            },
          }
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'list_circles': {
        const args = schemas.ListCirclesSchema.parse(request.params.arguments);
        const { data } = await holaClient.GET(
          '/api/organizations/{organization_id}/circles',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
            },
          }
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'get_circle': {
        const args = schemas.GetCircleSchema.parse(request.params.arguments);
        const { data } = await holaClient.GET(
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
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'list_roles': {
        const args = schemas.ListRolesSchema.parse(request.params.arguments);
        const { data } = await holaClient.GET(
          '/api/organizations/{organization_id}/roles',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
            },
          }
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'get_role': {
        const args = schemas.GetRoleSchema.parse(request.params.arguments);
        const { data } = await holaClient.GET(
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
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'list_domains': {
        const args = schemas.ListDomainsSchema.parse(request.params.arguments);
        const { data } = await holaClient.GET(
          '/api/organizations/{organization_id}/domains',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
            },
          }
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'list_policies': {
        const args = schemas.ListPoliciesSchema.parse(request.params.arguments);
        const { data } = await holaClient.GET(
          '/api/organizations/{organization_id}/policies',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
            },
          }
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'list_meetings': {
        const args = schemas.ListMeetingsSchema.parse(request.params.arguments);
        const { data } = await holaClient.GET(
          '/api/organizations/{organization_id}/meetings',
          {
            params: {
              path: {
                organization_id: args.organizationId,
              },
            },
          }
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'get_meeting': {
        const args = schemas.GetMeetingSchema.parse(request.params.arguments);
        const { data } = await holaClient.GET(
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
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
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
