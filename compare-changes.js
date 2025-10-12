#!/usr/bin/env node

/**
 * Quick comparison tool for SmartSpark project
 * Helps identify what has changed locally vs GitHub
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 SmartSpark Change Comparison Tool');
console.log('===================================\n');

function runGitCommand(command, description) {
  try {
    console.log(`📊 ${description}...`);
    const result = execSync(command, { encoding: 'utf8' });
    return result.trim();
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return null;
  }
}

// 1. Check current Git status
console.log('1️⃣ Current Git Status:');
const status = runGitCommand('git status --porcelain', 'Checking working tree');
if (status) {
  if (status.length > 0) {
    console.log('📝 Uncommitted changes:');
    status.split('\n').forEach(line => {
      if (line.trim()) {
        const status = line.substring(0, 2);
        const file = line.substring(3);
        const statusMap = {
          'M ': '📝 Modified',
          'A ': '➕ Added',
          'D ': '❌ Deleted',
          '??': '❓ Untracked',
          'MM': '📝 Modified (staged & unstaged)'
        };
        console.log(`   ${statusMap[status] || status}: ${file}`);
      }
    });
  } else {
    console.log('✅ Working tree is clean');
  }
} else {
  console.log('❌ Could not check Git status');
}

console.log('\n' + '='.repeat(50) + '\n');

// 2. Compare with remote
console.log('2️⃣ Comparison with GitHub (origin/master):');
runGitCommand('git fetch origin', 'Fetching latest from GitHub');

const diff = runGitCommand('git diff --name-status origin/master', 'Comparing with remote');
if (diff) {
  if (diff.length > 0) {
    console.log('📊 Differences with GitHub:');
    diff.split('\n').forEach(line => {
      if (line.trim()) {
        const [status, file] = line.split('\t');
        const statusMap = {
          'M': '📝 Modified',
          'A': '➕ Added',
          'D': '❌ Deleted',
          'R': '🔄 Renamed',
          'C': '📋 Copied'
        };
        console.log(`   ${statusMap[status] || status}: ${file}`);
      }
    });
  } else {
    console.log('✅ Local is in sync with GitHub');
  }
}

console.log('\n' + '='.repeat(50) + '\n');

// 3. Recent commits
console.log('3️⃣ Recent Commits (last 5):');
const commits = runGitCommand('git log --oneline -5', 'Getting recent commits');
if (commits) {
  commits.split('\n').forEach((commit, index) => {
    console.log(`   ${index + 1}. ${commit}`);
  });
}

console.log('\n' + '='.repeat(50) + '\n');

// 4. Branch information
console.log('4️⃣ Branch Information:');
const branch = runGitCommand('git branch --show-current', 'Getting current branch');
const remote = runGitCommand('git remote -v', 'Getting remote info');

if (branch) {
  console.log(`📍 Current branch: ${branch}`);
}

if (remote) {
  console.log('🔗 Remote repositories:');
  remote.split('\n').forEach(line => {
    if (line.includes('(fetch)')) {
      const [name, url] = line.split('\t');
      console.log(`   ${name}: ${url.replace(' (fetch)', '')}`);
    }
  });
}

console.log('\n' + '='.repeat(50) + '\n');

// 5. File summary
console.log('5️⃣ Project File Summary:');
const importantFiles = [
  'package.json',
  '.env.local',
  'next.config.js',
  'prisma/schema.prisma',
  'README.md'
];

importantFiles.forEach(file => {
  const exists = fs.existsSync(file);
  const status = exists ? '✅' : '❌';
  console.log(`   ${status} ${file}`);
  
  if (exists && file === 'package.json') {
    try {
      const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
      console.log(`      📦 Version: ${pkg.version}`);
      console.log(`      🏷️  Name: ${pkg.name}`);
    } catch (e) {
      console.log('      ⚠️  Could not read package.json');
    }
  }
});

console.log('\n' + '='.repeat(50) + '\n');

// 6. Quick actions
console.log('6️⃣ Quick Actions Available:');
console.log('   📥 Pull from GitHub: git pull origin master');
console.log('   📤 Push to GitHub: git add . && git commit -m "message" && git push');
console.log('   🔄 Full sync: npm run sync');
console.log('   🧪 Test APIs: npm run test:api');
console.log('   🗄️  Database: npm run db:studio');

console.log('\n✨ Comparison complete!\n');