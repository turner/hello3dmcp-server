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

### Step 1: Build the Package

Build the `.mcpb` package file:

```bash
npm install
npm run build
```

This creates a `.mcpb` file (`hello3dmcp-server.mcpb`) in your project root. A timestamped version is also created (e.g., `hello3dmcp-server-20260112-115054.mcpb`) for testing and development purposes, but it is git ignored and does not become part of the project.

### Step 2: Install in Claude Desktop

1. **Open Claude Desktop** → **Settings** → **Extensions** → **Advanced Settings**
2. Click **"Install Extension"**
3. Select the `.mcpb` file you just built
4. **Restart Claude Desktop**

### Step 3: Connect to Your 3D Application

1. **Start your frontend application** (see [hello3dmcp-frontend](https://github.com/aidenlab/hello3dmcp-frontend))
2. **In Claude Desktop**, ask Claude:
   - "How do I connect to the 3D app?" or
   - "Get browser URL"
3. Claude will provide a URL with your unique session ID
4. **Open that URL in your browser** to connect your 3D app to the MCP server

📖 **New to using the tool?** See [Natural Language Interaction Guide](docs/mcp-notes/natural-language-interaction.md) for detailed instructions on how to interact with Claude to control your 3D scene.

### Benefits of the .mcpb Package

- ✅ **No manual configuration** - Everything is bundled in the package
- ✅ **Self-contained** - Includes all dependencies and configuration
- ✅ **Easy updates** - Just rebuild and reinstall when you update the server
- ✅ **Works with localhost** - No need for public URLs or tunnels

## Testing with MCP Inspector

For development and testing purposes, you can test the server using the MCP Inspector. See [Testing with MCP Inspector](docs/testing-with-mcp-inspector.md) for detailed instructions.

## Available MCP Tools

The server provides extensive tools for controlling the 3D model:

### Model Control
- `change_model_color` - Change model color (hex or Apple crayon color name)
- `change_model_size` - Change uniform model size
- `scale_model` - Scale model independently in x, y, z dimensions
- `set_model_rotation` - Set model rotation (Euler angles)
- `rotate_model_clockwise` - Rotate model clockwise (relative)
- `rotate_model_counterclockwise` - Rotate model counterclockwise (relative)
- `nudge_model_pitch_up` - Adjust model pitch up (relative)
- `nudge_model_pitch_down` - Adjust model pitch down (relative)
- `nudge_model_roll` - Adjust model roll (relative)
- `get_model_color` - Get current model color
- `get_model_scale` - Get current model scale
- `get_model_rotation` - Get current model rotation

### Lighting Control
- `set_key_light_intensity` - Set key light intensity
- `set_key_light_color` - Set key light color
- `set_key_light_position_spherical` - Set key light position (spherical coordinates)
- `set_key_light_distance` - Set key light distance
- `swing_key_light_up/down/left/right` - Swing key light in directions
- `walk_key_light_in/out` - Move key light closer/farther
- `rotate_key_light_clockwise/counterclockwise` - Rotate key light
- `nudge_key_light_elevation_up/down` - Adjust key light elevation
- `move_key_light_toward_direction` - Move key light toward direction
- Similar tools for fill light
- `get_key_light_*` / `get_fill_light_*` - Query light properties

### Camera Control
- `dolly_camera` - Set camera distance
- `dolly_camera_in/out` - Move camera closer/farther
- `set_camera_fov` - Set camera field of view
- `increase_camera_fov` / `decrease_camera_fov` - Adjust FOV
- `get_camera_distance` - Get camera distance
- `get_camera_fov` - Get camera FOV

### Scene Control
- `change_background_color` - Change scene background color
- `get_background_color` - Get background color

### Connection
- `get_browser_connection_url` - Get URL to connect browser to 3D app

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
