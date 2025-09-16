import type { Request, Response } from "express";
import express from "express";
import cors from 'cors';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  CallToolResult,
} from "@modelcontextprotocol/sdk/types.js";

const getServer = () => {
  // Create an MCP server with implementation details
  const server = new McpServer({
          name: "Erik Personal MCP-Server",
          version: "1.0.0",
          description: "A personal MCP-Server for Erik with a few tools",
          author: "Erik",
          capabilities: {
            tools: {},
            resources: {},
          }
})

  server.registerTool("get_about", {
    title: "Get information about Erik",
    description: "Returns basic information about Erik, including interests and skills.",
  },
  async (): Promise<CallToolResult> => ({
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

}));

  server.registerTool("get_cv", {
      title: "get_cv",
      description: "Returns my CV in JSON format",
    },
    async (): Promise<CallToolResult> => ({
        content: [
          {
            type: "text",
            text: JSON.stringify(`name: Erik\n
              title: Security & Technology Professional\n
              location: Sweden\n
              \n
              summary: Experienced professional with expertise in security, AI, technology, health, and management. Specialized in problem-solving and understanding the intersection of technology and people.\n
              \n
              technical skills: Security, AI/ML, Technology Architecture, Problem Solving\n
              soft skills: Leadership, Strategic Thinking, Big Picture Analysis, Management\n
              \n
              experience:\n
              SRS Security:\n
              - Head of Protective Services (Jul 2023 – Present, Stockholm, Sweden)\n
                • Head of operations and SOC\n
                • Risk management and key account ownership\n
                • Sales and business development\n
                • Team leadership (65+ staff)\n
                • Skills: Incident Management, KPIs, Corporate Security, Analytical Skills, Crisis Management, Technology Security\n
              - Head of SOC (Nov 2020 – Jul 2023)\n
                • Led Security Operations Center\n
                • Managed tech stack and incident response\n
                • Focus on KPIs and corporate security\n
                • Skills: IT, Incident Management, Corporate Security, Analytical Skills, Crisis Management, Rust, Java, TypeScript, SQL, JavaScript, Technology Security\n
              - Security Coordinator & Close Protection Officer (Sep 2018 – Nov 2020)\n
                • Site manager in Somalia\n
                • Close protection\n
                • Risk management\n
                • Skills: Incident Management, Corporate Security, Personnel Security, Security Operations, Security Consulting, Security Management\n
              - Consultant (Jan 2007 – Sep 2010)\n
                • Executive protection\n
                • Counter surveillance\n
                • Risk management\n
              \n
              Swedish Armed Forces:\n
              - Hvgrpch stf (Home Guard Staff) (Nov 2017 – Sep 2020)\n
              - Deputy Squad Leader, Int. Ranger Platoon (Aug 2006 – Jan 2008, AJB)\n
              - Squad Leader, Para Rangers (Aug 2005 – Jul 2006, FJS/K3)\n
              \n
              Puori:\n
              - Executive Distributor, Sweden, Finland & Norway (Jan 2011 – Dec 2018)\n
                • Country Manager for Scandinavia\n
                • Sales and KPI tracking\n
                • Skills: Key Performance Indicators, Analytical Skills\n
              \n
              Soya Group Support AB:\n
              - Security Operator (Oct 2010 – Aug 2017, Stockholm, Sweden)\n
                • Executive protection\n
                • Counter surveillance\n
                • Duty officer\n
                • Risk management\n
                • Skills: Incident Management, Corporate Security\n
              \n
              CrossFit Nordic:\n
              - Project Manager (Jan 2009 – Dec 2013)\n
                • Organized Nordic Showdown (major CrossFit event)\n
                • Managed annual CrossFit competitions\n
                • Skills: Key Performance Indicators\n
              - Founder and Co-Owner (Jul 2008 – Dec 2013)\n
                • Founded CrossFit Nordic gym in Stockholm\n
                • Co-led operations with Rickard Walén and Mads Jacobsen\n
                • Skills: Key Performance Indicators\n
              \n
              education:\n
              - Luleå University of Technology (2022)\n
                • Degree: Teknologie kandidatexamen (tekn.kand.)\n
                • Field: Systemvetenskap och -teori\n
                • Skills: Analytical Skills, Technology Security\n
              - Uppsala University (2020)\n
                • Field: IT-säkerhet, GDPR, Programmering, IT\n
                • Skills: Technology Security\n
              - Karolinska Institutet (2008 - 2009)\n
                • Field: Physiology\n
              - Försvarshögskolan - Swedish Defence University (2008)\n
                • Course: Leadership\n
                • Details: Civil Military Leadership\n
              - Scandinavian Risk Solutions (2009)\n
                • Course: VU1\n
                • Details: Väktare nivå 1\n
              \n
              interests: Security, AI, Technology, Health, Management\n
              mottos:\n
              - Skate to where the puck is going\n
              - Who dares wins\n
              `),
          },
        ],
}));

  server.registerTool("get_workout", {
    title: "get_workout",
    description: "Returns a random kettlebell workout from a list of 5 workouts. Get after it!",
    },
    async (): Promise<CallToolResult> => ({
        content: [
          {
            type: "text",
            text: `🎯 **${randomWorkout.name}**\n\n📝 **Description**: ${randomWorkout.description}\n\n⏱️ **Duration**: ${randomWorkout.duration}\n💪 **Difficulty**: ${randomWorkout.difficulty}\n\n**Exercises**:\n${randomWorkout.exercises.map(exercise => `• ${exercise}`).join('\n')}\n\n🔥 **Get ready to work!**`
          },
        ], 
}));

const workouts = [
  {
    name: "400 Bulk",
    description: "A workout with all the parts; squat, hinge, press, pull. Do all 100 reps before moving on to the next movement",
    exercises: [
      "Kettlebell Swing: 100 reps",
      "Gorilla Row: 100 reps, use 2 KBs",
      "Goblet Squat: 100 reps",
      "Floor press: 100 reps, use 2 KBs",
    ],
    duration: "20-30 minutes",
    difficulty: "Beginner to Intermediate"
  },
  {
    name: "Secret Service Snatch Test",
    description: "As many snatches as possible in 10 minutes",
    exercises: [
      "Snatch with 1 KB 24kg men, 16kg women"
    ],
    duration: "10 minutes",
    difficulty: "Intermediate to Advanced"
  },
  {
    name: "Starting strength",
    description: "Easy movements for 5 sets. Fun to do in team of 2, one person does 1 round while the other rest. 5 rounds each.",
    exercises: [
      "Kettlebell Swing: 10 reps",
      "Goblet squat: 10 reps",
      "Gorilla Row: 20 reps, 2 kettlebells",
    ],
    duration: "10-15 minutes",
    difficulty: "Beginner"
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
      "Burpee: 10 reps",
      "Goblet Squat: 10 reps",
      "Rest 2 minutes, repeat 4-6 rounds"
    ],
    duration: "35-50 minutes",
    difficulty: "Intermediate"
  },
  {
    name: "Hinge & Press",
    description: "Strenght endurance workout with cleans and pushpress.",
    exercises: [
      "Double KB Clean: 20 reps, 2 KBs 24kg men, 16kg women",
      "Alteranting Push Press: 20 reps, 2 KBs 24kg men, 16kg women",
      "Rest 3-4 minutes between rounds, 5 rounds for a total of 100 reps each exercise. You cant put the KBs down between cleans and pushpress."
    ],
    duration: "35-50 minutes",
    difficulty: "Intermediate"
  }
];

const randomWorkout = workouts[Math.floor(Math.random() * workouts.length)];

  return server
};

  const app = express();
  app.use(cors());
  app.use(express.json());
  
app.post('/', async (req: Request, res: Response) => {

try {
    const server = getServer(); 
    const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    res.on('close', () => {
      console.log('Request closed');
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

// Handle both MCP JSON-RPC requests and regular HTTP requests
app.get('/', async (req: Request, res: Response) => {
  console.log('Received GET request');
  
  // Check if this is an MCP JSON-RPC request (would have jsonrpc in query or headers)
  if (req.query.jsonrpc || req.headers['content-type']?.includes('application/json-rpc')) {
    res.writeHead(405).end(JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed."
      },
      id: null
    }));
  } else {
    // Regular HTTP request - return server info with 200 status for health checks
    res.json({
      name: "Erik Personal MCP-Server/daemon",
      version: "1.0.0",
      description: "Connect with an MCP-client to use tools",
      author: "Erik",
      capabilities: {
        tools: {
          get_about: {},
          get_cv: {},
          get_workout: {}
        }
      }
    });
  }
});

// Session termination not needed in stateless mode
app.delete('/', async (req: Request, res: Response) => {
  console.log('Received DELETE MCP request');
  res.writeHead(405).end(JSON.stringify({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  }));
});


// Start the server
const PORT = 8080;
getServer();
app.listen(PORT, () => {
  console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
});
    
