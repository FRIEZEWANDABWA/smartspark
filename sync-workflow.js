#!/usr/bin/env node

/**
 * SmartSpark VPS-GitHub-Local Sync Workflow
 * Handles synchronization between local development, GitHub, and VPS deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function runCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return false;
  }
}

async function checkGitStatus() {
  console.log('\n📊 Checking Git status...');
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      console.log('📝 Uncommitted changes found:');
      console.log(status);
      return false;
    } else {
      console.log('✅ Working tree is clean');
      return true;
    }
  } catch (error) {
    console.error('❌ Git status check failed:', error.message);
    return false;
  }
}

async function syncWorkflow() {
  console.log('🚀 SmartSpark Sync Workflow');
  console.log('==========================\n');

  const action = await ask(`Choose sync action:
1. Pull from VPS → Local → GitHub (Get VPS changes)
2. Local → GitHub → VPS (Deploy local changes)
3. GitHub → Local (Update local from GitHub)
4. Compare Local vs GitHub
5. Exit

Enter choice (1-5): `);

  switch (action) {
    case '1':
      await pullFromVPS();
      break;
    case '2':
      await deployToVPS();
      break;
    case '3':
      await pullFromGitHub();
      break;
    case '4':
      await compareWithGitHub();
      break;
    case '5':
      console.log('👋 Goodbye!');
      process.exit(0);
    default:
      console.log('❌ Invalid choice');
      await syncWorkflow();
  }
}

async function pullFromVPS() {
  console.log('\n📥 Pulling changes from VPS to Local to GitHub');
  
  const vpsHost = await ask('Enter VPS host (e.g., user@your-vps-ip): ');
  const vpsPath = await ask('Enter VPS project path (e.g., /var/www/smartspark): ');
  
  if (!vpsHost || !vpsPath) {
    console.log('❌ VPS details required');
    return;
  }

  // Create temporary directory for VPS files
  const tempDir = path.join(__dirname, 'temp-vps-sync');
  
  try {
    // 1. Download VPS files
    console.log('\n📦 Downloading files from VPS...');
    if (fs.existsSync(tempDir)) {
      execSync(`rmdir /s /q "${tempDir}"`, { stdio: 'inherit' });
    }
    fs.mkdirSync(tempDir, { recursive: true });
    
    // Use rsync or scp to download files
    const rsyncCmd = `rsync -avz --exclude node_modules --exclude .next --exclude .git ${vpsHost}:${vpsPath}/ "${tempDir}/"`;
    console.log(`Running: ${rsyncCmd}`);
    
    const useRsync = await ask('Do you have rsync installed? (y/n): ');
    if (useRsync.toLowerCase() === 'y') {
      execSync(rsyncCmd, { stdio: 'inherit' });
    } else {
      console.log('📝 Manual step required:');
      console.log(`Please manually copy files from VPS to: ${tempDir}`);
      await ask('Press Enter when files are copied...');
    }

    // 2. Compare and merge changes
    console.log('\n🔍 Comparing VPS files with local...');
    await compareDirectories(tempDir, process.cwd());
    
    const proceed = await ask('Proceed with merging VPS changes? (y/n): ');
    if (proceed.toLowerCase() === 'y') {
      await mergeVPSChanges(tempDir);
    }

    // 3. Commit and push to GitHub
    const isClean = await checkGitStatus();
    if (!isClean) {
      const commitMsg = await ask('Enter commit message for VPS changes: ');
      runCommand('git add .', 'Staging changes');
      runCommand(`git commit -m "${commitMsg}"`, 'Committing changes');
      runCommand('git push origin master', 'Pushing to GitHub');
    }

    // Cleanup
    if (fs.existsSync(tempDir)) {
      execSync(`rmdir /s /q "${tempDir}"`, { stdio: 'inherit' });
    }

  } catch (error) {
    console.error('❌ VPS sync failed:', error.message);
  }
}

async function deployToVPS() {
  console.log('\n🚀 Deploying Local changes to GitHub and VPS');
  
  // 1. Check for uncommitted changes
  const isClean = await checkGitStatus();
  if (!isClean) {
    const commit = await ask('Commit local changes first? (y/n): ');
    if (commit.toLowerCase() === 'y') {
      const commitMsg = await ask('Enter commit message: ');
      runCommand('git add .', 'Staging changes');
      runCommand(`git commit -m "${commitMsg}"`, 'Committing changes');
    }
  }

  // 2. Push to GitHub
  runCommand('git push origin master', 'Pushing to GitHub');

  // 3. Deploy to VPS
  const vpsHost = await ask('Enter VPS host (e.g., user@your-vps-ip): ');
  const vpsPath = await ask('Enter VPS project path (e.g., /var/www/smartspark): ');
  
  if (vpsHost && vpsPath) {
    console.log('\n📝 VPS deployment commands:');
    console.log(`ssh ${vpsHost}`);
    console.log(`cd ${vpsPath}`);
    console.log('git pull origin master');
    console.log('npm install');
    console.log('npm run build');
    console.log('pm2 restart smartspark');
    
    const autoDeploy = await ask('Run deployment automatically? (y/n): ');
    if (autoDeploy.toLowerCase() === 'y') {
      const deployCmd = `ssh ${vpsHost} "cd ${vpsPath} && git pull origin master && npm install && npm run build && pm2 restart smartspark"`;
      runCommand(deployCmd, 'Deploying to VPS');
    }
  }
}

async function pullFromGitHub() {
  console.log('\n📥 Pulling changes from GitHub to Local');
  
  const isClean = await checkGitStatus();
  if (!isClean) {
    const stash = await ask('Stash local changes before pulling? (y/n): ');
    if (stash.toLowerCase() === 'y') {
      runCommand('git stash', 'Stashing local changes');
    }
  }

  runCommand('git pull origin master', 'Pulling from GitHub');
  runCommand('npm install', 'Installing dependencies');
  runCommand('npx prisma generate', 'Generating Prisma client');
  runCommand('npx prisma db push', 'Updating database schema');
}

async function compareWithGitHub() {
  console.log('\n🔍 Comparing Local with GitHub');
  
  runCommand('git fetch origin', 'Fetching latest from GitHub');
  
  try {
    const diff = execSync('git diff origin/master', { encoding: 'utf8' });
    if (diff.trim()) {
      console.log('\n📝 Differences found:');
      console.log(diff);
    } else {
      console.log('✅ Local is in sync with GitHub');
    }
  } catch (error) {
    console.error('❌ Comparison failed:', error.message);
  }
}

async function compareDirectories(vpsDir, localDir) {
  console.log(`\n🔍 Comparing ${vpsDir} with ${localDir}`);
  
  const vpsFiles = getAllFiles(vpsDir);
  const localFiles = getAllFiles(localDir);
  
  const vpsOnly = vpsFiles.filter(f => !localFiles.includes(f.replace(vpsDir, localDir)));
  const localOnly = localFiles.filter(f => !vpsFiles.includes(f.replace(localDir, vpsDir)));
  
  if (vpsOnly.length > 0) {
    console.log('\n📁 Files only in VPS:');
    vpsOnly.forEach(f => console.log(`  + ${f.replace(vpsDir, '')}`));
  }
  
  if (localOnly.length > 0) {
    console.log('\n📁 Files only in Local:');
    localOnly.forEach(f => console.log(`  - ${f.replace(localDir, '')}`));
  }
}

function getAllFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    if (item.startsWith('.') || item === 'node_modules' || item === '.next') continue;
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function mergeVPSChanges(vpsDir) {
  console.log('\n🔄 Merging VPS changes...');
  
  // Copy non-conflicting files
  const excludeDirs = ['node_modules', '.next', '.git', 'temp-vps-sync'];
  
  function copyRecursive(src, dest) {
    const items = fs.readdirSync(src);
    
    for (const item of items) {
      if (excludeDirs.includes(item)) continue;
      
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  copyRecursive(vpsDir, process.cwd());
  console.log('✅ VPS changes merged');
}

// Start the workflow
syncWorkflow().finally(() => rl.close());