# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) server that provides AI assistants access to Holaspirit's organizational management API. The server exposes 13 different tools for querying tasks, circles, roles, meetings, metrics, and other organizational data.

## Architecture

- **Main entry point**: `src/index.ts` - Sets up MCP server with both stdio and HTTP transport modes
- **Schema definitions**: `src/schemas.ts` - Contains Zod schemas for request/response validation and type safety
- **Transport modes**: 
  - Stdio (default) - for MCP clients communicating via stdin/stdout
  - HTTP - for web clients using Streamable HTTP protocol
- **API client**: Uses `holaspirit-client-typescript-fetch` to interact with Holaspirit API

The server implements a request handler pattern where each tool (like `holaspirit_list_circles`) maps to a specific API endpoint. All responses are validated using Zod schemas before being returned.

## Environment Variables

Required environment variables:
- `HOLASPIRIT_API_TOKEN` - Your Holaspirit API token
- `HOLASPIRIT_ORGANIZATION_ID` - Your Holaspirit organization ID

The server supports `.env` files via `dotenv/config`. You can create a `.env` file in the project root with the required variables:

```bash
HOLASPIRIT_API_TOKEN=your_api_token_here
HOLASPIRIT_ORGANIZATION_ID=your_organization_id_here
```

A `.env.example` file is provided as a template.

## Development Commands

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build TypeScript to JavaScript in `dist/`
- `npm run start` - Run production server from `dist/`
- `npm run lint` - Run ESLint and Prettier checks
- `npm run fix` - Auto-fix linting issues
- `npm run examples` - Run example script (`examples/list_circles.ts`)

## Testing

Currently no automated tests are configured (`npm test` outputs "No tests yet").

## TypeScript Configuration

- Uses ES2022 target with NodeNext modules
- Strict type checking enabled
- Development uses `ts-node` with ESM support via `ts-node-loader.js`
- Separate build config in `tsconfig.build.json`

## Transport Modes Usage

**Stdio mode (default):**
```bash
npx holaspirit-mcp-server
```

**HTTP mode:**
```bash
npx holaspirit-mcp-server --port 3000
```

## Key Implementation Details

- All API responses are parsed and validated using Zod schemas
- Error handling includes per-request error catching and meaningful error messages  
- The `holaspirit_get_tensions` tool handles multiple meeting IDs concurrently and aggregates results
- The `holaspirit_search_member` tool implements pagination to search through all members
- ID validation uses regex pattern `^[a-zA-Z0-9-]+$` throughout the codebase