# ClaudPoint 🎯

**The safest way to experiment with Claude Code.** Create instant checkpoints of your codebase, experiment fearlessly, and restore instantly if things go wrong.

[![npm version](https://badge.fury.io/js/claudpoint.svg)](https://badge.fury.io/js/claudpoint)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js 18+](https://img.shields.io/badge/node-18+-blue.svg)](https://nodejs.org/downloads/)

> *"The undo button your codebase deserves"*

## ✨ Features

- 🚀 **Global NPM package** - Install once, use everywhere
- 🤖 **Claude Code integration** - Direct MCP support
- 📦 **Smart compression** - Efficient tar.gz storage
- 🔍 **Gitignore aware** - Respects your .gitignore patterns
- 🛡️ **Safe restoration** - Auto-backup before every restore
- 🧹 **Auto cleanup** - Configurable checkpoint limits
- ⚡ **Fast operations** - Optimized for development workflows

## 🚀 Quick Start

### 1. Install ClaudPoint globally

```bash
npm install -g claudepoint
```

### 2. Configure Claude Code

Add to your Claude Code MCP settings:

```json
{
  "mcpServers": {
    "claudepoint": {
      "command": "claudepoint",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

### 3. Let Claude Code manage checkpoints

**In any Claude Code conversation:**

- "Setup checkpoints for this project"
- "Create a checkpoint before refactoring"
- "List all my checkpoints"
- "Restore the checkpoint from before the auth changes"

Claude Code will automatically use ClaudPoint tools!

## 🤖 How to Instruct Claude Code

Once configured, you can naturally tell Claude Code:

### **Before making changes:**
```
"Create a checkpoint before you start - call it 'before auth refactor'"
```

### **When experimenting:**
```
"Let's try a different approach. First restore the 'stable' checkpoint, then implement OAuth differently"
```

### **Checking history:**
```
"Show me all my checkpoints so I can see our progress"
```

### **If something breaks:**
```
"Something went wrong, restore the last working checkpoint"
```

Claude Code will handle all the checkpoint operations automatically using the MCP tools!

## 🔧 Manual CLI Usage

You can also use ClaudPoint directly:

```bash
# Setup in any project
cd your-project
claudepoint setup

# Create checkpoint
claudepoint create --description "Before major refactor"

# List checkpoints
claudepoint list

# Restore checkpoint
claudepoint restore "before-major" --dry-run
claudepoint restore "before-major"
```

## 🛠️ MCP Tools (For Claude Code)

When Claude Code has ClaudPoint configured, it can use:

- **`setup_claudpoint`** - Initialize checkpoints in current project
- **`create_checkpoint`** - Create new checkpoint with name/description
- **`list_checkpoints`** - Show all available checkpoints
- **`restore_checkpoint`** - Restore previous state (with emergency backup)

## 🎯 Development Workflow

### 1. Project Setup
```
You: "Setup checkpoints for this project"
Claude Code: Uses setup_claudpoint → Creates .checkpoints/, updates .gitignore
```

### 2. Before Changes
```
You: "Create a checkpoint before refactoring the auth system"
Claude Code: Uses create_checkpoint → Saves current state
```

### 3. Making Changes
```
You: "Now refactor the authentication to use OAuth"
Claude Code: Makes changes knowing there's a safe restore point
```

### 4. If Issues Arise
```
You: "This isn't working, go back to the previous version"
Claude Code: Uses restore_checkpoint → Emergency backup + restore
```

## 📁 What Gets Saved

ClaudPoint automatically:
- ✅ **Respects .gitignore** - Won't save node_modules, .env, etc.
- ✅ **Compresses efficiently** - Uses tar.gz for small storage
- ✅ **Tracks metadata** - Timestamps, descriptions, file counts
- ✅ **Auto-cleans** - Removes old checkpoints (configurable limit)

## 🛡️ Safety Features

### Emergency Backup
Every restore creates an emergency backup first:
```
📦 Emergency backup: emergency_backup_2025-05-30T15-45-30
🔄 Restoring: auth_refactor_2025-05-30T14-30-15
✅ Restore complete!
```

### Dry Run Mode
Preview changes safely:
```
claudpoint restore "checkpoint-name" --dry-run
```

### Smart Name Matching
Use partial names:
```
"Restore the auth checkpoint" → Finds "auth_refactor_2025-05-30T14-30-15"
```

## ⚙️ Configuration

Auto-created `.checkpoints/config.json`:

```json
{
  "maxCheckpoints": 10,
  "autoName": true,
  "ignorePatterns": [
    ".git", ".checkpoints", "node_modules", ".env", ".env.*",
    "*.log", ".DS_Store", "Thumbs.db", "__pycache__", "*.pyc",
    ".vscode", ".idea", "dist", "build", "coverage", ".nyc_output",
    ".next", ".nuxt", ".cache", "tmp", "temp"
  ],
  "additionalIgnores": ["my-custom-dir"],
  "nameTemplate": "checkpoint_{timestamp}"
}
```

## 🔧 Troubleshooting

### Installation Issues
```bash
# Clear npm cache and reinstall
npm cache clean --force
npm uninstall -g claudpoint
npm install -g claudpoint
```

### Claude Code Not Finding ClaudPoint
1. Verify global install: `npm list -g claudpoint`
2. Check MCP config path: `claudpoint` should be in PATH
3. Test manually: `claudpoint --version`

### "No files found to checkpoint"
1. Run setup first: `claudpoint setup`
2. Check if .gitignore is too restrictive
3. Verify you're in a project directory

## 🎉 Pro Tips

### 1. **Descriptive Checkpoints**
```
"Create a checkpoint called 'working-auth' - the OAuth is perfect here"
```

### 2. **Strategic Timing**
- Before each Claude Code session
- After completing features  
- Before risky refactors

### 3. **Use with Confidence**
```
"Try a completely different approach - we have a checkpoint to fall back on"
```

### 4. **Combine with Git**
- ClaudPoint: Rapid experimentation
- Git: Permanent version control
- Perfect together!

## 📊 Why ClaudPoint?

| Feature | ClaudPoint | Git Commits | File Copies |
|---------|------------|-------------|-------------|
| **Setup Time** | 30 seconds | Minutes | Manual |
| **Claude Integration** | ✅ Native | ❌ | ❌ |
| **Auto Backup** | ✅ Always | ❌ | ❌ |
| **Fast Restore** | ✅ Instant | ❌ Complex | ❌ Manual |
| **Space Efficient** | ✅ Compressed | ✅ | ❌ |
| **Zero Pollution** | ✅ | ❌ History | ❌ Clutter |

## 🤝 Contributing

Want to improve ClaudPoint?

1. Fork: `https://github.com/Andycufari/ClaudPoint`
2. Feature branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Pull Request

## 🐛 Issues & Support

- 🐛 **Bug reports**: [GitHub Issues](https://github.com/Andycufari/ClaudPoint/issues)
- 💡 **Feature requests**: [GitHub Issues](https://github.com/Andycufari/ClaudPoint/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Andycufari/ClaudPoint/discussions)

## ⭐ Show Your Support

If ClaudPoint saves your code (and sanity), give it a star! ⭐

## 📄 License

MIT License - Use it however you want!

---

**Made with ❤️ for the Claude Code community**

Follow [@Andycufari](https://github.com/Andycufari) for more dev tools!