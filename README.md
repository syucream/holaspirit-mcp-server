# holaspirit-mcp-server
[![smithery badge](https://smithery.ai/badge/holaspirit-mcp-server)](https://smithery.ai/server/holaspirit-mcp-server)

A [MCP(Model Context Protocol)](https://www.anthropic.com/news/model-context-protocol) server that accesses to [Holaspirit API](https://www.holaspirit.com/).

This server provides MCP-compatible access to Holaspirit's API, allowing AI assistants to interact with your Holaspirit data through a standardized interface.

## Features

Available tools:

- `list_tasks` - List all tasks in the organization
- `list_metrics` - List all metrics in the organization
- `list_circles` - List all circles in the organization
- `get_circle` - Get details of a specific circle
- `list_roles` - List all roles in the organization
- `get_role` - Get details of a specific role
- `list_domains` - List all domains in the organization
- `list_policies` - List all policies in the organization
- `list_meetings` - List all meetings in the organization
- `get_meeting` - Get details of a specific meeting

## Quick Start

### Installation

#### Installing via Smithery

To install holaspirit-mcp-server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/holaspirit-mcp-server):

```bash
npx -y @smithery/cli install holaspirit-mcp-server --client claude
```

#### Manual Installation
```bash
npm install holaspirit-mcp-server
```

### Configuration

Create a `.env` file with your Holaspirit API credentials:

```env
HOLASPIRIT_API_TOKEN=your_api_token
```

### Usage

1. Start the MCP server:
```bash
npx holaspirit-mcp-server
```

2. For example usage, check the `examples` directory. To run the example:
```bash
# Set required environment variables
export EXAMPLES_CLIENT_HOLASPIRIT_API_TOKEN=your_api_token
export EXAMPLES_CLIENT_HOLASPIRIT_ORGANIZATION_ID=your_organization_id

# Run the example
npm run examples
```

## Development

### Available Scripts

- `npm run dev` - Start the server in development mode with hot reloading
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run linting checks (ESLint and Prettier)
- `npm run fix` - Automatically fix linting issues
- `npm run examples` - Run the example scripts

### Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests and linting: `npm run lint`
4. Commit your changes
5. Push to the branch
6. Create a Pull Request
