import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';

const serverInfo = {
  name: "Erik Personal Daemon",
  version: "1.0.0",
  description: "A personal daemon for Erik with a few tools",
  author: "Erik",
  capabilities: {
    tools: { listChanged: true },
    resources: { listChanged: true },
  },
};

async function handleMCPRequest(json: any): Promise<object> {
  if (json.jsonrpc === "2.0") {
    if (json.method === "initialize") {
      return {
        result: {
          protocolVersion: "2025-03-26",
          capabilities: {
            tools: { listChanged: true },
            resources: { listChanged: true },
          },
          serverInfo,
        },
        jsonrpc: "2.0",
        id: json.id,
      };
    }
    if (json.method === "tools/list") {
      return {
        result: {
          tools: tools.map((tool) => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema,
          })),
        },
        jsonrpc: "2.0",
        id: json.id,
      };
    }
    if (json.method === "tools/call") {
      const tool = tools.find((tool) => tool.name === json.params.name);
      if (tool) {
        const toolResponse = await tool.execute(json.params.arguments);
        return {
          result: toolResponse,
          jsonrpc: "2.0",
          id: json.id,
        };
      } else {
        return {
          error: {
            code: -32602,
            message: `MCP error -32602: Tool ${json.params.name} not found`,
          },
          jsonrpc: "2.0",
          id: json.id,
        };
      }
    }
    if (json.method === "ping") {
      return {
        result: {},
        jsonrpc: "2.0",
        id: json.id,
      };
    }
  }
  
  return {
    error: {
      code: -32601,
      message: "Method not found",
    },
    jsonrpc: "2.0",
    id: json.id,
  };
}

export async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  // Health check endpoint
  app.get('/', (_req: Request, res: Response) => {
    res.send(serverInfo);
  });

  // MCP JSON-RPC endpoint
  app.post('/', async (req: Request, res: Response) => {
    try {
      const response = await handleMCPRequest(req.body);
      res.json(response);
    } catch (error) {
      res.status(500).json({
        error: {
          code: -32603,
          message: "Internal error",
        },
        jsonrpc: "2.0",
        id: req.body?.id || null,
      });
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

}


const tools = [
  {
    name: "get_about",
    description: "Basic information about me",
    inputSchema: { type: "object", properties: {} },
    execute: async (args: any) => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(`I help people and organisations stay safe and proactively navigate the current state of flux.

We have a technological event horizon around the corner coupled with geopolitical shifts and an economy facing population decline and never ending QE in our collective economic experiment.

Things are, and will get interesting.

Interests are Security, AI, Technology, Health and Management.
My strength is understanding technology and people and big picture events and perspectives.
Special skill is problem solving. 
Nothing is impossible.

Personal mottos are: 
- Skate to where the puck is going
- Who dares wins`),
          },
        ],
      };
    },
  },
];

(async function main() {
  try {
    startServer();
  } catch (error) {
    console.error(error);
  }
})();
    
