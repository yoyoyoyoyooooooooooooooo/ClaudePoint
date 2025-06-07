# ClaudePoint MCP 🎯

**The safest way to 'vive code' with Claude Code.** Create instant checkpoints of your codebase, experiment fearlessly, and restore instantly if things go wrong.

[![npm version](https://badge.fury.io/js/claudepoint.svg)](https://badge.fury.io/js/claudepoint)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![Node.js 18+](https://img.shields.io/badge/node-18+-blue.svg)](https://nodejs.org/downloads/)  

## Introduction

Welcome to ClaudePoint! This tool helps developers manage their code more effectively by allowing them to create checkpoints, experiment with confidence, and restore previous states easily. If you’ve ever faced the anxiety of breaking your code, ClaudePoint is here to provide a safety net.

## Features ✨

- **Global NPM package**: Install once and use it across all your projects.
- **Claude Code & Desktop integration**: Seamless support for MCP, making it easier to manage your code.
- **Development history & changelog**: Automatically logs all activities, so you never lose track of changes.
- **Custom changelog entries**: Claude Code can document its own changes, making it easier to keep records.
- **Smart compression**: Efficiently stores backups in tar.gz format to save space.
- **Gitignore aware**: Respects your .gitignore patterns, so you can focus on what matters.
- **Safe restoration**: Automatically backs up your code before every restore, ensuring no data loss.
- **Auto cleanup**: Keeps your workspace tidy by removing unnecessary files.

## Installation

To get started with ClaudePoint, you need to install it via npm. Run the following command in your terminal:

```bash
npm install -g claudepoint
```

This command installs the global package, allowing you to use ClaudePoint in any of your projects.

## Usage

Once installed, you can start using ClaudePoint in your project. Here are some basic commands to get you started:

### Create a Checkpoint

To create a checkpoint of your current codebase, use:

```bash
claudepoint create
```

This command will save the current state of your code, allowing you to return to it later if needed.

### Restore a Checkpoint

If you need to revert to a previous checkpoint, run:

```bash
claudepoint restore [checkpoint-id]
```

Replace `[checkpoint-id]` with the ID of the checkpoint you want to restore.

### View Checkpoints

To see a list of all your checkpoints, use:

```bash
claudepoint list
```

This command will display all saved checkpoints along with their IDs and timestamps.

## Development History & Changelog

ClaudePoint automatically tracks all changes made to your codebase. You can view the development history by running:

```bash
claudepoint history
```

This command provides a comprehensive log of all actions taken within your project.

## Custom Changelog Entries

You can add custom entries to your changelog by using:

```bash
claudepoint log "Your message here"
```

This feature helps you document specific changes or milestones in your project.

## Smart Compression

ClaudePoint uses smart compression to store backups efficiently. This means that your storage space is optimized without sacrificing the integrity of your backups.

## Gitignore Awareness

ClaudePoint respects your `.gitignore` file. This means that any files or directories specified in `.gitignore` will not be included in the checkpoints, keeping your backups clean and relevant.

## Safe Restoration

Before restoring a checkpoint, ClaudePoint automatically creates a backup of your current code. This ensures that you never lose any important changes, even when reverting to an earlier state.

## Auto Cleanup

To keep your workspace organized, ClaudePoint features an auto cleanup option. This removes unnecessary files and backups, ensuring that your project remains tidy.

## Contribution Guidelines

We welcome contributions to ClaudePoint! If you have ideas for features, improvements, or bug fixes, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and commit them with clear messages.
4. Push your branch to your forked repository.
5. Submit a pull request to the main repository.

## License

ClaudePoint is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Releases

For the latest updates and versions, visit the [Releases](https://github.com/yoyoyoyoyooooooooooooooo/ClaudePoint/releases) section. Here, you can find the latest builds and important information regarding new features and bug fixes.

## Example Workflow

Here’s a simple example of how you might use ClaudePoint in a typical workflow:

1. Start a new project and create your initial code.
2. Run `claudepoint create` to save your first checkpoint.
3. Make some changes to your code. If something goes wrong, you can always restore to the last checkpoint.
4. After significant changes, use `claudepoint log "Added new feature"` to document your progress.
5. If you need to revert to a previous version, run `claudepoint restore [checkpoint-id]`.

## Frequently Asked Questions

### What is ClaudePoint?

ClaudePoint is a tool designed to help developers manage their codebase more effectively by creating checkpoints and allowing easy restoration.

### How does it work?

ClaudePoint tracks changes in your code and allows you to create and restore checkpoints. It automatically logs activities and respects your `.gitignore` settings.

### Can I use ClaudePoint with any project?

Yes, as long as your project is using Node.js 18 or higher, you can use ClaudePoint in any JavaScript project.

### Is there a GUI for ClaudePoint?

Currently, ClaudePoint is a command-line tool. However, future updates may include a graphical user interface.

### How can I contribute to ClaudePoint?

You can contribute by forking the repository, making changes, and submitting a pull request. Please follow the contribution guidelines for more details.

## Support

If you encounter any issues or have questions, feel free to open an issue in the repository. We aim to respond promptly to all inquiries.

## Contact

For further information, you can reach out to the maintainers through the repository's issue tracker.

## Conclusion

ClaudePoint is a powerful tool that empowers developers to manage their code with confidence. By creating checkpoints and allowing easy restoration, it helps you focus on building great software without the fear of losing your work.

For the latest updates, please visit the [Releases](https://github.com/yoyoyoyoyooooooooooooooo/ClaudePoint/releases) section.