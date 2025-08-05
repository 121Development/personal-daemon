import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';

const serverInfo = {
  name: "Erik Personal MCP-Server",
  version: "1.0.0",
  description: "A personal MCP-Server for Erik with a few tools",
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
              "personalInfo": {
                "name": "Erik",
                "title": "Security & Technology Professional",
                "location": "Sweden"
              },
              "summary": "Experienced professional with expertise in security, AI, technology, health, and management. Specialized in problem-solving and understanding the intersection of technology and people.",
              "skills": {
                "technical": ["Security", "AI/ML", "Technology Architecture", "Problem Solving"],
                "soft": ["Leadership", "Strategic Thinking", "Big Picture Analysis", "Management"]
              },
              "experience": [
                {
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
                }
                
              ],
              "education": [
                {
                  "institution": "Luleå University of Technology",
                  "degree": "Teknologie kandidatexamen (tekn.kand.)",
                  "field": "Systemvetenskap och -teori",
                  "year": 2022,
                  "skills": [
                    "Analytical Skills",
                    "Technology Security"
                  ]
                },
                {
                  "institution": "Uppsala University",
                  "field": "IT-säkerhet, GDPR, Programmering, IT",
                  "year": 2020,
                  "skills": [
                    "Technology Security"
                  ]
                },
                {
                  "institution": "Karolinska Institutet",
                  "field": "Physiology",
                  "years": "2008 - 2009"
                },
                {
                  "institution": "Försvarshögskolan - Swedish Defence University",
                  "course": "Leadership",
                  "year": 2008,
                  "details": "Civil Military Leadership"
                },
                {
                  "institution": "Scandinavian Risk Solutions",
                  "course": "VU1",
                  "year": 2009,
                  "details": "Väktare nivå 1"
                }
              ],
              "interests": ["Security", "AI", "Technology", "Health", "Management"],
              "mottos": [
                "Skate to where the puck is going",
                "Who dares wins"
              ]
            }, null, 2),
          },
        ],
      };
    },
  },
  {
    name: "get_workout",
    description: "Returns a random kettlebell workout from a list of 5 workouts",
    inputSchema: { type: "object", properties: {} },
    execute: async (args: any) => {
      const workouts = [
        {
          name: "Simple & Sinister",
          description: "A classic kettlebell workout focusing on two main movements",
          exercises: [
            "Turkish Get-Up: 10 reps (5 each side)",
            "Swing: 100 reps (50 each hand)",
            "Rest 1-2 minutes between sets"
          ],
          duration: "20-30 minutes",
          difficulty: "Beginner to Intermediate"
        },
        {
          name: "The Giant",
          description: "High-volume clean and press workout for strength and conditioning",
          exercises: [
            "Clean and Press: 10 sets of 5 reps",
            "Rest 60-90 seconds between sets",
            "Focus on perfect form and controlled breathing"
          ],
          duration: "25-35 minutes",
          difficulty: "Intermediate to Advanced"
        },
        {
          name: "Armor Building",
          description: "Complex movement workout for total body strength",
          exercises: [
            "Double Clean: 2 reps",
            "Double Press: 1 rep",
            "Double Front Squat: 3 reps",
            "Repeat for 5 rounds, then rest 2-3 minutes",
            "Complete 3-5 total rounds"
          ],
          duration: "30-45 minutes",
          difficulty: "Advanced"
        },
        {
          name: "Quick & Dirty",
          description: "Fast-paced circuit for conditioning and fat burning",
          exercises: [
            "Swings: 15 reps",
            "Goblet Squats: 10 reps",
            "Push-ups: 10 reps",
            "Rest 30 seconds, repeat 5-8 rounds"
          ],
          duration: "15-20 minutes",
          difficulty: "All Levels"
        },
        {
          name: "Strength Endurance",
          description: "Build strength and endurance with this comprehensive workout",
          exercises: [
            "Snatch: 5 reps each side",
            "Turkish Get-Up: 3 reps each side",
            "Goblet Squat: 10 reps",
            "Rest 2 minutes, repeat 4-6 rounds"
          ],
          duration: "35-50 minutes",
          difficulty: "Intermediate"
        }
      ];
      
      const randomWorkout = workouts[Math.floor(Math.random() * workouts.length)];
      
      return {
        content: [
          {
            type: "text",
            text: `🎯 **${randomWorkout.name}**\n\n📝 **Description**: ${randomWorkout.description}\n\n⏱️ **Duration**: ${randomWorkout.duration}\n💪 **Difficulty**: ${randomWorkout.difficulty}\n\n**Exercises**:\n${randomWorkout.exercises.map(exercise => `• ${exercise}`).join('\n')}\n\n🔥 **Get ready to work!**`
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
    
