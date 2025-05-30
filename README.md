# ClaudePoint 🎯

**The safest way to experiment with Claude Code.** Create instant checkpoints of your codebase, experiment fearlessly, and restore instantly if things go wrong.

[![npm version](https://badge.fury.io/js/claudepoint.svg)](https://badge.fury.io/js/claudepoint)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js 18+](https://img.shields.io/badge/node-18+-blue.svg)](https://nodejs.org/downloads/)

> *"The undo button your codebase deserves"*

## ✨ Features

- 🚀 **Global NPM package** - Install once, use everywhere
- 🤖 **Claude Code integration** - Direct MCP support (auto-detection)
- 📋 **Development history** - Track all checkpoint activities with changelog
- 📦 **Smart compression** - Efficient tar.gz storage
- 🔍 **Gitignore aware** - Respects your .gitignore patterns
- 🛡️ **Safe restoration** - Auto-backup before every restore
- 🧹 **Auto cleanup** - Configurable checkpoint limits
- ⚡ **Fast operations** - Optimized for development workflows

## 🚀 Quick Start

### 1. Install ClaudePoint globally

```bash
npm install -g claudepoint
```

### 2. Configure Claude Code

**Simple command (recommended):**
```bash
claude mcp add claudepoint claudepoint
```

**Or for local testing:**
```bash
claude mcp add claudepoint node /path/to/claudepoint/bin/claudepoint.js
```

### 3. Let Claude Code manage checkpoints

**In any Claude Code conversation:**

- "Setup checkpoints for this project"
- "Create a checkpoint before refactoring"
- "Show me our development history from previous sessions"
- "List all my checkpoints"
- "Restore the checkpoint from before the auth changes"

Claude Code will automatically use ClaudePoint tools!

## 🤖 How to Instruct Claude Code

Once configured, you can naturally tell Claude Code:

### **Project Setup:**
```
"Setup checkpoints for this project and show me what we've worked on before"
```

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
"Show me our development history so I can see what we've tried"
```

### **Session context:**
```
"What checkpoints do we have and what was the last thing we were working on?"
```

### **If something breaks:**
```
"Something went wrong, restore the last working checkpoint"
```

Claude Code will handle all the checkpoint operations automatically using the MCP tools!

## 🔧 Manual CLI Usage

You can also use ClaudePoint directly:

```bash
# Setup in any project
cd your-project
claudepoint setup

# Create checkpoint
claudepoint create --description "Before major refactor"

# List checkpoints
claudepoint list

# View development history
claudepoint changelog

# Restore checkpoint
claudepoint restore "before-major" --dry-run
claudepoint restore "before-major"
```

## 🛠️ MCP Tools (For Claude Code)

When Claude Code has ClaudePoint configured, it can use:

- **`setup_claudepoint`** - Initialize checkpoints in current project
- **`create_checkpoint`** - Create new checkpoint with name/description
- **`list_checkpoints`** - Show all available checkpoints
- **`restore_checkpoint`** - Restore previous state (with emergency backup)
- **`get_changelog`** - View development history and session activities

## 📋 Development History & Changelog

ClaudePoint automatically tracks all your development activities:

### **What Gets Tracked:**
- ✅ **Project setup** - When ClaudePoint was initialized
- ✅ **Checkpoint creation** - Every checkpoint with description
- ✅ **Checkpoint restoration** - When you rolled back changes
- ✅ **Emergency backups** - Auto-backups before restores

### **Claude Code Integration:**
```
You: "Show me what we've been working on"
Claude Code: Uses get_changelog → Shows development timeline across sessions
```

### **Session Continuity:**
ClaudePoint helps Claude Code understand:
- What you worked on in previous sessions
- Which approaches you've already tried
- What checkpoints represent stable states
- Development progression over time

## 🎯 Development Workflow

### 1. Project Setup
```
You: "Setup checkpoints and show me our development history"
Claude Code: Uses setup_claudepoint + get_changelog → Full context
```

### 2. Before Changes
```
You: "Create a checkpoint before refactoring the auth system"
Claude Code: Uses create_checkpoint → Saves current state + logs activity
```

### 3. Making Changes
```
You: "Now refactor the authentication to use OAuth"
Claude Code: Makes changes knowing there's a safe restore point
```

### 4. If Issues Arise
```
You: "This isn't working, go back to the previous version"
Claude Code: Uses restore_checkpoint → Emergency backup + restore + logs activity
```

### 5. Next Session
```
You: "What were we working on last time?"
Claude Code: Uses get_changelog → Shows recent development history
```

## 📁 What Gets Saved

ClaudePoint automatically:
- ✅ **Respects .gitignore** - Won't save node_modules, .env, etc.
- ✅ **Compresses efficiently** - Uses tar.gz for small storage
- ✅ **Tracks metadata** - Timestamps, descriptions, file counts
- ✅ **Logs activities** - Development history in changelog.json
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
claudepoint restore "checkpoint-name" --dry-run
```

### Smart Name Matching
Use partial names:
```
"Restore the auth checkpoint" → Finds "auth_refactor_2025-05-30T14-30-15"
```

### Development Timeline
Track what you've tried:
```
📋 Development History:
1. SETUP - Project initialized
2. CREATE_CHECKPOINT - Created stable-base checkpoint
3. CREATE_CHECKPOINT - Created auth-refactor checkpoint
4. RESTORE_CHECKPOINT - Restored to stable-base
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
npm uninstall -g claudepoint
npm install -g claudepoint
```

### Claude Code MCP Issues
```bash
# Check if added correctly
claude mcp list
claude mcp get claudepoint

# Remove and re-add
claude mcp remove claudepoint
claude mcp add claudepoint claudepoint
```

### "No files found to checkpoint"
1. Run setup first: `claudepoint setup`
2. Check if .gitignore is too restrictive
3. Verify you're in a project directory

## 🎉 Pro Tips

### 1. **Use Development History**
```
"Show me our development timeline and create a checkpoint before we try the new approach"
```

### 2. **Strategic Timing**
- Before each Claude Code session
- After completing features  
- Before risky refactors

### 3. **Session Continuity**
```
"What checkpoints do we have from our previous work on the authentication system?"
```

### 4. **Experiment Confidently**
```
"Try three different approaches - we have checkpoints to fall back on for each one"
```

### 5. **Combine with Git**
- ClaudePoint: Rapid experimentation within sessions
- Git: Permanent version control across sessions
- Perfect together!

## 📊 Why ClaudePoint?

| Feature | ClaudePoint | Git Commits | File Copies |
|---------|------------|-------------|-------------|
| **Setup Time** | 30 seconds | Minutes | Manual |
| **Claude Integration** | ✅ Native | ❌ | ❌ |
| **Auto Backup** | ✅ Always | ❌ | ❌ |
| **Fast Restore** | ✅ Instant | ❌ Complex | ❌ Manual |
| **Session History** | ✅ Timeline | ❌ | ❌ |
| **Space Efficient** | ✅ Compressed | ✅ | ❌ |
| **Zero Pollution** | ✅ | ❌ History | ❌ Clutter |

## 🤝 Contributing

Want to improve ClaudePoint?

1. Fork: `https://github.com/Andycufari/ClaudePoint`
2. Feature branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Pull Request

## 🐛 Issues & Support

- 🐛 **Bug reports**: [GitHub Issues](https://github.com/Andycufari/ClaudePoint/issues)
- 💡 **Feature requests**: [GitHub Issues](https://github.com/Andycufari/ClaudePoint/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Andycufari/ClaudePoint/discussions)

## ⭐ Show Your Support

If ClaudePoint saves your code (and sanity), give it a star! ⭐

## 📄 License

MIT License - Use it however you want!

---

**Made with ❤️ for the Claude Code community**

Follow [@Andycufari](https://github.com/Andycufari) for more dev tools!