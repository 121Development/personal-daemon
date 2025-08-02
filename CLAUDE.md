# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript-based MCP (Model Context Protocol) server that implements a coffee shop interface. The project combines both an HTTP Express server and a JSON-RPC stdin/stdout MCP server in a single application.

## Development Commands

- **Build**: `pnpm run build` - Compiles TypeScript to JavaScript in the `dist/` directory
- **Start**: `pnpm start` - Runs the application using ts-node
- **Debug MCP**: `pnpm run inspector` - Runs the MCP inspector for debugging

## Architecture

### Core Components

**Single Entry Point**: `src/index.ts` contains the entire application logic including:

- **Express HTTP Server**: Runs on port 3000 (or PORT env var) with CORS enabled
  - Health check endpoint at `/`
  - JSON request body parsing

- **MCP JSON-RPC Server**: Handles stdin/stdout communication for MCP protocol
  - Implements `initialize`, `tools/list`, `tools/call`, `resources/list`, `resources/read`, and `ping` methods
  - Protocol version: 2025-03-26

### Data Structure

**Coffee Shop Data**: Static arrays defined in `src/index.ts`:
- `drinks` array with name, price, and description
- `resources` array with URI-based menu access
- `tools` array with MCP tool definitions

### MCP Tools Available

1. `getDrinkNames` - Returns array of drink names
2. `getDrinkInfo` - Returns detailed info for a specific drink by name

## Configuration

- **TypeScript**: ES2016 target, NodeNext modules, strict mode enabled
- **Package Manager**: pnpm (locked to version 10.6.5)
- **Module Type**: ES modules (`"type": "module"` in package.json)
- **Build Output**: `dist/` directory

## Key Dependencies

- Express.js with CORS for HTTP server
- Node.js built-in readline for stdin/stdout handling
- TypeScript with Node.js types for development