#!/usr/bin/env node

/**
 * Sync script to ensure local development matches VPS production
 * Run this after pulling changes from VPS
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Syncing local environment with VPS...');

try {
  // 1. Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // 2. Push database schema
  console.log('🗄️  Pushing database schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });

  // 3. Install dependencies
  console.log('📚 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // 4. Check environment variables
  console.log('🔧 Checking environment configuration...');
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    console.warn('⚠️  .env.local not found. Please create it with required variables.');
  } else {
    console.log('✅ Environment file found');
  }

  // 5. Test n8n connection
  console.log('🔗 Testing n8n webhook connection...');
  const testN8N = async () => {
    try {
      const response = await fetch(process.env.N8N_WEBHOOK_URL || 'https://n8n.smartsparkservices.com/webhook/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true, timestamp: new Date().toISOString() })
      });
      
      if (response.ok) {
        console.log('✅ n8n webhook connection successful');
      } else {
        console.warn('⚠️  n8n webhook returned status:', response.status);
      }
    } catch (error) {
      console.warn('⚠️  n8n webhook test failed:', error.message);
    }
  };

  // Run async test
  if (typeof fetch !== 'undefined') {
    testN8N();
  }

  console.log('\n✅ Sync completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Test contact forms');
  console.log('3. Verify n8n integration');
  console.log('4. Check admin dashboard');

} catch (error) {
  console.error('❌ Sync failed:', error.message);
  process.exit(1);
}