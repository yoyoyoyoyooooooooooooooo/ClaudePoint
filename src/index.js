#!/usr/bin/env node

/**
 * ClaudePoint MCP Server
 * The safest way to experiment with Claude Code
 * 
 * GitHub: https://github.com/Andycufari/ClaudePoint
 */

// Check if running as MCP server
const isMCP = process.argv.includes('--mcp');

if (isMCP) {
  // Run as MCP server
  const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
  const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
  const CheckpointManager = require('./lib/checkpoint-manager.js');
  runMCPServer();
} else {
  // Show help
  console.log('ClaudePoint - The safest way to experiment with Claude Code');
  console.log('');
  console.log('Usage:');
  console.log('  claudepoint --mcp          # Run as MCP server');
  console.log('  claudepoint setup          # Setup in current project');
  console.log('  claudepoint create         # Create checkpoint');
  console.log('  claudepoint list           # List checkpoints');
  console.log('  claudepoint restore <n>    # Restore checkpoint');
  console.log('');
  console.log('For CLI usage, see: claudepoint --help');
  process.exit(0);
}

function runMCPServer() {
  const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
  const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
  const CheckpointManager = require('./lib/checkpoint-manager.js');

class ClaudePointMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'claudepoint',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.manager = new CheckpointManager();
    this.setupToolHandlers();
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: 'create_checkpoint',
            description: 'Create a new checkpoint of the current codebase',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Optional custom name for the checkpoint'
                },
                description: {
                  type: 'string',
                  description: 'Description of what this checkpoint represents'
                }
              }
            }
          },
          {
            name: 'list_checkpoints',
            description: 'List all available checkpoints in the current project',
            inputSchema: {
              type: 'object',
              properties: {}
            }
          },
          {
            name: 'restore_checkpoint',
            description: 'Restore a previous checkpoint (creates emergency backup first)',
            inputSchema: {
              type: 'object',
              properties: {
                checkpoint: {
                  type: 'string',
                  description: 'Name or partial name of the checkpoint to restore'
                },
                dry_run: {
                  type: 'boolean',
                  description: 'Preview changes without actually restoring',
                  default: false
                }
              },
              required: ['checkpoint']
            }
          },
          {
            name: 'setup_claudepoint',
            description: 'Setup ClaudePoint in the current project (creates .checkpoints dir, updates .gitignore)',
            inputSchema: {
              type: 'object',
              properties: {}
            }
          }
        ]
      };
    });

    // Handle tool calls
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'create_checkpoint':
            return await this.handleCreateCheckpoint(args);
          
          case 'list_checkpoints':
            return await this.handleListCheckpoints(args);
          
          case 'restore_checkpoint':
            return await this.handleRestoreCheckpoint(args);
          
          case 'setup_claudepoint':
            return await this.handleSetup(args);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`
            }
          ],
          isError: true
        };
      }
    });
  }

  async handleCreateCheckpoint(args) {
    const { name, description } = args;
    
    try {
      await this.manager.ensureDirectories();
      const files = await this.manager.getProjectFiles();
      
      if (files.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: '❌ No files found to checkpoint! Make sure you\'re in a project directory and run setup first.'
            }
          ]
        };
      }

      const result = await this.manager.create(name, description);
      
      if (result.success) {
        return {
          content: [
            {
              type: 'text',
              text: `✅ Checkpoint created: ${result.name}\n   Files: ${result.fileCount}\n   Size: ${result.size}\n   Description: ${result.description || 'Manual checkpoint'}`
            }
          ]
        };
      } else {
        return {
          content: [
            {
              type: 'text',
              text: `❌ Failed to create checkpoint: ${result.error}`
            }
          ]
        };
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Error creating checkpoint: ${error.message}`
          }
        ]
      };
    }
  }

  async handleListCheckpoints(args) {
    try {
      const checkpoints = await this.manager.getCheckpoints();
      
      if (checkpoints.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: '📋 No checkpoints found. Create your first checkpoint with create_checkpoint!'
            }
          ]
        };
      }

      let output = `📋 Available checkpoints (${checkpoints.length}):\n\n`;
      
      checkpoints.forEach((cp, index) => {
        const date = new Date(cp.timestamp).toLocaleString();
        output += `${index + 1}. ${cp.name}\n`;
        output += `   📝 ${cp.description}\n`;
        output += `   📅 ${date} | ${cp.fileCount} files | ${this.manager.formatSize(cp.totalSize)}\n\n`;
      });

      return {
        content: [
          {
            type: 'text',
            text: output
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Error listing checkpoints: ${error.message}`
          }
        ]
      };
    }
  }

  async handleRestoreCheckpoint(args) {
    const { checkpoint, dry_run = false } = args;
    
    try {
      const checkpoints = await this.manager.getCheckpoints();
      const targetCheckpoint = checkpoints.find(cp => 
        cp.name === checkpoint || cp.name.includes(checkpoint)
      );

      if (!targetCheckpoint) {
        const available = checkpoints.slice(0, 5).map(cp => `  - ${cp.name}`).join('\n');
        return {
          content: [
            {
              type: 'text',
              text: `❌ Checkpoint not found: ${checkpoint}\n\nAvailable checkpoints:\n${available}`
            }
          ]
        };
      }

      if (dry_run) {
        const currentFiles = await this.manager.getProjectFiles();
        const filesToDelete = currentFiles.filter(f => !targetCheckpoint.files.includes(f));
        
        let output = `🔍 DRY RUN - Would restore: ${targetCheckpoint.name}\n`;
        output += `   📝 Description: ${targetCheckpoint.description}\n`;
        output += `   📅 Date: ${new Date(targetCheckpoint.timestamp).toLocaleString()}\n`;
        output += `   📁 Files: ${targetCheckpoint.fileCount}\n`;
        
        if (filesToDelete.length > 0) {
          output += `   🗑️  Would delete ${filesToDelete.length} files that didn't exist in checkpoint\n`;
        }
        
        output += '\nUse restore_checkpoint without dry_run to proceed.';
        
        return {
          content: [
            {
              type: 'text',
              text: output
            }
          ]
        };
      }

      // Perform actual restore
      const result = await this.manager.restore(checkpoint, false);
      
      if (result.success) {
        return {
          content: [
            {
              type: 'text',
              text: `✅ Checkpoint restored successfully!\n   📦 Emergency backup created: ${result.emergencyBackup}\n   🔄 Restored: ${targetCheckpoint.name}\n   📁 Files restored: ${targetCheckpoint.fileCount}`
            }
          ]
        };
      } else {
        return {
          content: [
            {
              type: 'text',
              text: `❌ Failed to restore checkpoint: ${result.error}`
            }
          ]
        };
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Error restoring checkpoint: ${error.message}`
          }
        ]
      };
    }
  }

  async handleSetup(args) {
    try {
      const result = await this.manager.setup();
      
      if (result.success) {
        let output = '🚀 ClaudePoint setup complete!\n\n';
        output += '✅ Created .checkpoints directory\n';
        output += '✅ Updated .gitignore\n';
        output += '✅ Created configuration\n';
        
        if (result.initialCheckpoint) {
          output += `✅ Created initial checkpoint: ${result.initialCheckpoint}\n`;
        }
        
        output += '\n📋 Quick commands:\n';
        output += '  • create_checkpoint - Create a new checkpoint\n';
        output += '  • list_checkpoints - See all checkpoints\n';
        output += '  • restore_checkpoint - Restore a previous state\n';
        output += '\n💡 Tip: Always create a checkpoint before major changes!';
        
        return {
          content: [
            {
              type: 'text',
              text: output
            }
          ]
        };
      } else {
        return {
          content: [
            {
              type: 'text',
              text: `❌ Setup failed: ${result.error}`
            }
          ]
        };
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Error during setup: ${error.message}`
            }
          ]
        };
    }
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('ClaudePoint MCP server running on stdio');
  }
}

// Start the server
if (require.main === module) {
  const server = new ClaudePointMCPServer();
  server.start().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}

module.exports = ClaudePointMCPServer;

} // End of runMCPServer function