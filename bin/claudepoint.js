#!/usr/bin/env node

/**
 * ClaudPoint CLI
 * The safest way to experiment with Claude Code
 * 
 * GitHub: https://github.com/Andycufari/ClaudePoint
 */

const { program } = require('commander');
const CheckpointManager = require('../src/lib/checkpoint-manager');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

program
  .name('claudepoint')
  .description('The safest way to experiment with Claude Code')
  .version('1.0.0');

program
  .command('setup')
  .description('Setup ClaudPoint in the current project')
  .action(async () => {
    const spinner = ora('Setting up ClaudPoint...').start();
    
    try {
      const manager = new CheckpointManager();
      const result = await manager.setup();
      
      if (result.success) {
        spinner.succeed('ClaudPoint setup complete!');
        console.log(chalk.green('✅ Created .checkpoints directory'));
        console.log(chalk.green('✅ Updated .gitignore'));
        console.log(chalk.green('✅ Created configuration'));
        
        if (result.initialCheckpoint) {
          console.log(chalk.green(`✅ Created initial checkpoint: ${result.initialCheckpoint}`));
        }
        
        console.log(chalk.blue('\n📋 Quick commands:'));
        console.log('  claudepoint create --description "Your description"');
        console.log('  claudepoint list');
        console.log('  claudepoint restore checkpoint-name');
        console.log(chalk.yellow('\n💡 Tip: Always create a checkpoint before major changes!'));
      } else {
        spinner.fail(`Setup failed: ${result.error}`);
        process.exit(1);
      }
    } catch (error) {
      spinner.fail('Setup failed');
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('create')
  .description('Create a new checkpoint')
  .option('-n, --name <name>', 'Custom checkpoint name')
  .option('-d, --description <description>', 'Checkpoint description')
  .action(async (options) => {
    const spinner = ora('Creating checkpoint...').start();
    
    try {
      const manager = new CheckpointManager();
      const result = await manager.create(options.name, options.description);
      
      if (result.success) {
        spinner.succeed(`Checkpoint created: ${chalk.cyan(result.name)}`);
        console.log(`   Files: ${result.fileCount}`);
        console.log(`   Size: ${result.size}`);
        console.log(`   Description: ${result.description}`);
      } else {
        spinner.fail(`Create failed: ${result.error}`);
        process.exit(1);
      }
    } catch (error) {
      spinner.fail('Create failed');
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all checkpoints')
  .action(async () => {
    try {
      const manager = new CheckpointManager();
      const checkpoints = await manager.getCheckpoints();
      
      if (checkpoints.length === 0) {
        console.log(chalk.yellow('No checkpoints found.'));
        console.log('Create your first checkpoint with: claudepoint create');
        return;
      }

      console.log(chalk.blue(`📋 Available checkpoints (${checkpoints.length}):`));
      checkpoints.forEach((cp, index) => {
        console.log(`  ${chalk.cyan((index + 1) + '.')} ${chalk.bold(cp.name)}`);
        console.log(`     ${cp.description}`);
        console.log(`     ${new Date(cp.timestamp).toLocaleString()} | ${cp.fileCount} files | ${manager.formatSize(cp.totalSize)}`);
        console.log();
      });
    } catch (error) {
      console.error(chalk.red('❌ List failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('restore <checkpoint>')
  .description('Restore a checkpoint')
  .option('--dry-run', 'Show what would happen without making changes')
  .action(async (checkpoint, options) => {
    try {
      const manager = new CheckpointManager();
      
      if (options.dryRun) {
        const checkpoints = await manager.getCheckpoints();
        const targetCheckpoint = checkpoints.find(cp => 
          cp.name === checkpoint || cp.name.includes(checkpoint)
        );

        if (!targetCheckpoint) {
          console.log(chalk.red(`❌ Checkpoint not found: ${checkpoint}`));
          console.log(chalk.blue('Available checkpoints:'));
          checkpoints.slice(0, 5).forEach(cp => {
            console.log(`  - ${cp.name}`);
          });
          return;
        }

        const currentFiles = await manager.getProjectFiles();
        const filesToDelete = currentFiles.filter(f => !targetCheckpoint.files.includes(f));
        
        console.log(chalk.blue(`🔍 DRY RUN - Would restore: ${targetCheckpoint.name}`));
        console.log(`   Description: ${targetCheckpoint.description}`);
        console.log(`   Date: ${new Date(targetCheckpoint.timestamp).toLocaleString()}`);
        console.log(`   Files: ${targetCheckpoint.fileCount}`);
        
        if (filesToDelete.length > 0) {
          console.log(chalk.yellow(`   Would delete ${filesToDelete.length} files that didn't exist in checkpoint`));
        }
        
        console.log('\nUse restore without --dry-run to proceed.');
        return;
      }

      // Create emergency backup and confirm
      console.log(chalk.blue('📦 This will create an emergency backup before restoring...'));
      
      const { confirm } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: `Restore checkpoint '${checkpoint}'? This will modify your codebase.`,
        default: false
      }]);

      if (!confirm) {
        console.log(chalk.red('❌ Restoration cancelled'));
        return;
      }

      const spinner = ora('Restoring checkpoint...').start();
      const result = await manager.restore(checkpoint, false);
      
      if (result.success) {
        spinner.succeed('Checkpoint restored successfully!');
        console.log(chalk.green(`   Emergency backup created: ${result.emergencyBackup}`));
        console.log(chalk.green(`   Restored: ${result.restored}`));
      } else {
        spinner.fail(`Restore failed: ${result.error}`);
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red('❌ Restore failed:'), error.message);
      process.exit(1);
    }
  });

program.parse();