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
  {
    name: "get_cv",
    description: "Returns my CV in JSON format",
    inputSchema: { type: "object", properties: {} },
    execute: async (args: any) => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              "SRS Security": [
                {
                  "title": "Head of Protective Services",
                  "duration": "Jul 2023 – Present",
                  "location": "Stockholm, Sweden",
                  "responsibilities": [
                    "Head of operations and SOC",
                    "Risk management and key account ownership",
                    "Sales and business development",
                    "Team leadership (65+ staff)"
                  ],
                  "skills": [
                    "Incident Management",
                    "Key Performance Indicators",
                    "Corporate Security",
                    "Analytical Skills",
                    "Crisis Management",
                    "Technology Security"
                  ]
                },
                {
                  "title": "Head of SOC",
                  "duration": "Nov 2020 – Jul 2023",
                  "responsibilities": [
                    "Led Security Operations Center",
                    "Managed tech stack and incident response",
                    "Focus on KPIs and corporate security"
                  ],
                  "skills": [
                    "IT",
                    "Incident Management",
                    "Corporate Security",
                    "Analytical Skills",
                    "Crisis Management",
                    "Rust",
                    "Java",
                    "TypeScript",
                    "SQL",
                    "JavaScript",
                    "Technology Security"
                  ]
                },
                {
                  "title": "Security Coordinator & Close Protection Officer",
                  "duration": "Sep 2018 – Nov 2020",
                  "responsibilities": [
                    "Site manager in Somalia",
                    "Close protection",
                    "Risk management"
                  ],
                  "skills": [
                    "Incident Management",
                    "Corporate Security",
                    "Personnel Security",
                    "Security Operations",
                    "Security Consulting",
                    "Security Management"
                  ]
                },
                {
                  "title": "Consultant",
                  "duration": "Jan 2007 – Sep 2010",
                  "responsibilities": [
                    "Executive protection",
                    "Counter surveillance",
                    "Risk management"
                  ]
                }
              ],
              "Swedish Armed Forces": [
                {
                  "title": "Hvgrpch stf (Home Guard Staff)",
                  "duration": "Nov 2017 – Sep 2020"
                },
                {
                  "title": "Deputy Squad Leader, Int. Ranger Platoon",
                  "duration": "Aug 2006 – Jan 2008",
                  "unit": "AJB"
                },
                {
                  "title": "Squad Leader, Para Rangers",
                  "duration": "Aug 2005 – Jul 2006",
                  "unit": "FJS/K3"
                }
              ],
              "Puori": [
                {
                  "title": "Executive Distributor, Sweden, Finland & Norway",
                  "duration": "Jan 2011 – Dec 2018",
                  "responsibilities": [
                    "Country Manager for Scandinavia",
                    "Sales and KPI tracking"
                  ],
                  "skills": [
                    "Key Performance Indicators",
                    "Analytical Skills"
                  ]
                }
              ],
              "Soya Group Support AB": [
                {
                  "title": "Security Operator",
                  "duration": "Oct 2010 – Aug 2017",
                  "location": "Stockholm, Sweden",
                  "responsibilities": [
                    "Executive protection",
                    "Counter surveillance",
                    "Duty officer",
                    "Risk management"
                  ],
                  "skills": [
                    "Incident Management",
                    "Corporate Security"
                  ]
                }
              ],
              "CrossFit Nordic": [
                {
                  "title": "Project Manager",
                  "duration": "Jan 2009 – Dec 2013",
                  "responsibilities": [
                    "Organized Nordic Showdown (major CrossFit event)",
                    "Managed annual CrossFit competitions"
                  ],
                  "skills": [
                    "Key Performance Indicators"
                  ]
                },
                {
                  "title": "Founder and Co-Owner",
                  "duration": "Jul 2008 – Dec 2013",
                  "responsibilities": [
                    "Founded CrossFit Nordic gym in Stockholm",
                    "Co-led operations with Rickard Walén and Mads Jacobsen"
                  ],
                  "skills": [
                    "Key Performance Indicators"
                  ]
                }
              ]
            }, null, 2),
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
    
