#!/usr/bin/env node

/**
 * ClaudePoint MCP Server Entry Point
 * Detects if running via Claude Code MCP (stdio) or CLI
 */

// Detect if running as MCP server (stdin/stdout communication)
const isStdio = !process.stdin.isTTY || process.argv.includes('--stdio');

if (isStdio) {
  // Running as MCP server via Claude Code
  require('../src/mcp-server.js');
} else {
  // Running as CLI
  require('../src/cli.js');
}