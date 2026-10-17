import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The app intentionally does not proxy to an invented OmniRush endpoint.
// OmniRush.ai Connect is an authenticated MCP service for a configured MCP
// client, not a public HTTP API exposed by this workspace.
export default defineConfig({ plugins: [react()] })
