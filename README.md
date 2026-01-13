# Hello3DMCP Server - MCP Server for 3D Model Control

MCP server that provides Model Context Protocol (MCP) tools for controlling a 3D model visualization application via WebSocket. This server is designed to be installed in **Claude Desktop** as a `.mcpb` package file.

## Features

- **Claude Desktop Integration**: Install as a self-contained `.mcpb` package file
- **WebSocket Bridge**: Real-time bidirectional communication with frontend applications
- **Session Management**: Multi-user support with isolated sessions
- **State Management**: Query and cache application state for accurate relative operations
- **Comprehensive 3D Control**: Extensive tools for model, lighting, camera, and scene control

## Installation in Claude Desktop

The primary way to use this MCP server is by installing the `.mcpb` package file in Claude Desktop.

### Step 1: Install in Claude Desktop

1. **Open Claude Desktop** → **Settings** → **Extensions** → **Advanced Settings**
2. Click **"Install Extension"**
3. Select the `.mcpb` file (`hello3dmcp-server.mcpb`) from this project
4. **Restart Claude Desktop**

### Step 2: Connect to Your 3D Application

1. **Start your frontend application** (see [hello3dmcp-frontend](https://github.com/aidenlab/hello3dmcp-frontend))
2. **In Claude Desktop**, ask Claude:
   - "How do I connect to the 3D app?" or
   - "Get browser URL"
3. Claude will provide a URL with your unique session ID
4. **Open that URL in your browser** to connect your 3D app to the MCP server

📖 **New to using the tool?** See [Natural Language Interaction Guide](docs/mcp-notes/natural-language-interaction.md) for detailed instructions on how to interact with Claude to control your 3D scene.

> **Note for Developers**: If you want to make changes to this project and build your own version, you'll need to build the package using `npm install` and `npm run build`. This creates a new `.mcpb` file that you can then install in Claude Desktop. See the [Development](#development) section for more details.

### Benefits of the .mcpb Package

- ✅ **No manual configuration** - Everything is bundled in the package
- ✅ **Self-contained** - Includes all dependencies and configuration
- ✅ **Easy updates** - Just rebuild and reinstall when you update the server
- ✅ **Works with localhost** - No need for public URLs or tunnels

## Testing with MCP Inspector

For development and testing purposes, you can test the server using the MCP Inspector. See [Testing with MCP Inspector](docs/testing-with-mcp-inspector.md) for detailed instructions.

## Available MCP Tools

The server provides extensive tools for controlling the 3D model. You interact with these tools using **simple, natural language** in Claude Desktop. Just tell Claude what you want to do with the 3D model, and Claude will use the appropriate tool.

### Model Control
- `change_model_color` - Change model color (hex or Apple crayon color name)
  - *Example: "Change the model color to blue" or "Make the model red"*
- `change_model_size` - Change uniform model size
  - *Example: "Make the model bigger" or "Scale the model to 2.5"*
- `scale_model` - Scale model independently in x, y, z dimensions
  - *Example: "Stretch the model vertically" or "Make it wider"*
- `set_model_rotation` - Set model rotation (Euler angles)
  - *Example: "Rotate the model to 45 degrees"*
- `rotate_model_clockwise` - Rotate model clockwise (relative)
  - *Example: "Rotate the model clockwise" or "Turn it to the right"*
- `rotate_model_counterclockwise` - Rotate model counterclockwise (relative)
  - *Example: "Rotate the model counterclockwise" or "Turn it to the left"*
- `nudge_model_pitch_up` - Adjust model pitch up (relative)
  - *Example: "Tilt the model up" or "Pitch it forward"*
- `nudge_model_pitch_down` - Adjust model pitch down (relative)
  - *Example: "Tilt the model down" or "Pitch it back"*
- `nudge_model_roll` - Adjust model roll (relative)
  - *Example: "Roll the model" or "Tilt it sideways"*
- `get_model_color` - Get current model color
  - *Example: "What color is the model?" or "Show me the current model color"*
- `get_model_scale` - Get current model scale
  - *Example: "What's the current scale?" or "How big is the model?"*
- `get_model_rotation` - Get current model rotation
  - *Example: "What's the current rotation?" or "How is the model rotated?"*

### Lighting Control
- `set_key_light_intensity` - Set key light intensity
  - *Example: "Make the key light brighter" or "Set key light intensity to 0.8"*
- `set_key_light_color` - Set key light color
  - *Example: "Change the key light to warm white" or "Make the key light yellow"*
- `set_key_light_position_spherical` - Set key light position (spherical coordinates)
  - *Example: "Move the key light to the top right"*
- `set_key_light_distance` - Set key light distance
  - *Example: "Move the key light farther away" or "Set key light distance to 5"*
- `swing_key_light_up/down/left/right` - Swing key light in directions
  - *Example: "Move the key light up" or "Swing the key light to the left"*
- `walk_key_light_in/out` - Move key light closer/farther
  - *Example: "Bring the key light closer" or "Move the key light away"*
- `rotate_key_light_clockwise/counterclockwise` - Rotate key light
  - *Example: "Rotate the key light clockwise" or "Turn the key light around"*
- `nudge_key_light_elevation_up/down` - Adjust key light elevation
  - *Example: "Raise the key light" or "Lower the key light elevation"*
- `move_key_light_toward_direction` - Move key light toward direction
  - *Example: "Move the key light toward the front"*
- Similar tools for fill light (e.g., `set_fill_light_intensity`, `swing_fill_light_up`, etc.)
  - *Example: "Make the fill light dimmer" or "Move the fill light to the side"*
- `get_key_light_*` / `get_fill_light_*` - Query light properties
  - *Example: "What's the key light intensity?" or "Where is the fill light positioned?"*

### Camera Control
- `dolly_camera` - Set camera distance
  - *Example: "Move the camera closer" or "Set camera distance to 10"*
- `dolly_camera_in/out` - Move camera closer/farther
  - *Example: "Zoom in" or "Pull the camera back"*
- `set_camera_fov` - Set camera field of view
  - *Example: "Set the field of view to 60 degrees"*
- `increase_camera_fov` / `decrease_camera_fov` - Adjust FOV
  - *Example: "Widen the view" or "Narrow the field of view"*
- `get_camera_distance` - Get camera distance
  - *Example: "How far is the camera?" or "What's the camera distance?"*
- `get_camera_fov` - Get camera FOV
  - *Example: "What's the field of view?" or "Show me the camera FOV"*

### Scene Control
- `change_background_color` - Change scene background color
  - *Example: "Change the background to black" or "Make the background white"*
- `get_background_color` - Get background color
  - *Example: "What color is the background?"*

### Connection
- `get_browser_connection_url` - Get URL to connect browser to 3D app
  - *Example: "How do I connect to the 3D app?" or "Get browser URL"*

## Architecture

The server runs as a subprocess in Claude Desktop:

```
┌─────────────────┐         ┌──────────────┐         ┌─────────────┐
│ Claude Desktop  │──stdin▶│  MCP Server   │────────▶│  WebSocket  │
│  (Subprocess)   │◀─stdout│  (server.js)  │         │   Server    │
└─────────────────┘         └──────────────┘         └─────────────┘
                                      │                       │
                                      │              ┌────────▼────────┐
                                      └──────────────▶│  Frontend App   │
                                                     │  (WebSocket)     │
                                                     └─────────────────┘
```

**How it works:**
1. **Claude Desktop** spawns the MCP server as a subprocess (via STDIO)
2. **MCP Server** processes tool call requests from Claude
3. **MCP Server** routes commands via WebSocket to connected browser clients (by session ID)
4. **Frontend App** receives WebSocket messages and updates the 3D model
5. Changes are immediately visible in the browser

## Configuration

The `.mcpb` package includes configuration in `manifest.json`. The default configuration includes:

- **MCP Port**: 3000 (for HTTP mode testing)
- **WebSocket Port**: 3001
- **Browser URL**: `https://hello3dmcp-frontend.netlify.app/` (default frontend)

To customize these settings, edit `manifest.json` before building the package:

```json
{
  "server": {
    "mcp_config": {
      "env": {
        "BROWSER_URL": "https://your-frontend.netlify.app/",
        "MCP_PORT": "3000",
        "WS_PORT": "3001"
      }
    }
  }
}
```

Then rebuild the package with `npm run build`.

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm
- Frontend application running (see [hello3dmcp-frontend](https://github.com/aidenlab/hello3dmcp-frontend))

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```
   
   The server starts on:
   - **MCP endpoint**: `http://localhost:3000/mcp` (HTTP mode)
   - **WebSocket server**: `ws://localhost:3001`

3. **Test with MCP Inspector:**
   See [Testing with MCP Inspector](docs/testing-with-mcp-inspector.md)

### Building the Package

To create a new `.mcpb` package:

```bash
npm run build
```

This will:
1. Bundle the server code using esbuild (`npm run build:bundle`)
2. Package everything into a `.mcpb` file (`npm run build:package`)

The resulting `.mcpb` file contains:
- `manifest.json` - Package metadata and configuration
- `dist/hello3dmcp-server.js` - Bundled server code

### Adding New Tools

1. **Register tool in `server.js`:**
   ```javascript
   mcpServer.registerTool(
     'your_tool_name',
     {
       title: 'Your Tool Title',
       description: 'Description',
       inputSchema: {
         param: z.string().describe('Parameter')
       }
     },
     async ({ param }) => {
       routeToCurrentSession({
         type: 'yourCommandType',
         param: param
       });
       return {
         content: [{ type: 'text', text: 'Success' }]
       };
     }
   );
   ```

2. **Frontend handles command** in `Application.js` WebSocket message handler

3. **Rebuild the package** with `npm run build`

4. **Reinstall in Claude Desktop** to use the new tool

## Troubleshooting

### Package Installation Issues

- **Claude Desktop doesn't recognize the file**: Make sure you're selecting a `.mcpb` file, not a `.zip` or other format
- **Server doesn't start**: Check that `dist/hello3dmcp-server.js` exists in the package
- **Tools not appearing**: Restart Claude Desktop after installation

### Connection Issues

- **Can't get browser URL**: Make sure the frontend application is running
- **WebSocket connection fails**: Verify the WebSocket server is running on port 3001
- **Changes not reflected**: Check that the browser is connected with the correct session ID

### Development Issues

- **Port already in use:**
   ```bash
   # Check what's using the ports
   lsof -i :3000 -i :3001
   
   # Kill processes
   lsof -ti :3000 -ti :3001 | xargs kill -9
   ```

- **Build errors**: Make sure all dependencies are installed with `npm install`

## Related Projects

- [hello3dmcp-frontend](https://github.com/aidenlab/hello3dmcp-frontend) - Standalone Three.js 3D visualization application designed to be driven by this MCP server

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.
