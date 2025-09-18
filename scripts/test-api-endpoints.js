#!/usr/bin/env node

/**
 * Test script for API endpoints compatibility
 */

const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://smartsparkservices.com' 
  : 'http://localhost:3000';

const testEndpoints = [
  {
    name: 'Contact Form',
    endpoint: '/api/contact',
    method: 'POST',
    data: {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message from API test script'
    }
  },
  {
    name: 'Simple Contact',
    endpoint: '/api/simple-contact',
    method: 'POST',
    data: {
      name: 'Test User Simple',
      email: 'test@example.com',
      message: 'Test message from simple contact'
    }
  },
  {
    name: 'Quote Request',
    endpoint: '/api/quote',
    method: 'POST',
    data: {
      name: 'Test User Quote',
      email: 'test@example.com',
      phone: '+1234567890',
      service: 'Web Development',
      budget: '$1000-$5000',
      message: 'Test quote request'
    }
  }
];

async function testEndpoint(test) {
  try {
    console.log(`\n🧪 Testing ${test.name}...`);
    
    const response = await fetch(`${baseUrl}${test.endpoint}`, {
      method: test.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(test.data)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ ${test.name}: SUCCESS`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Response: ${result.message}`);
    } else {
      console.log(`❌ ${test.name}: FAILED`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Error: ${result.message}`);
    }
  } catch (error) {
    console.log(`❌ ${test.name}: ERROR`);
    console.log(`   Error: ${error.message}`);
  }
}

async function runTests() {
  console.log(`🚀 Testing API endpoints on ${baseUrl}`);
  console.log('='.repeat(50));

  for (const test of testEndpoints) {
    await testEndpoint(test);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between tests
  }

  console.log('\n' + '=' .repeat(50));
  console.log('🏁 API testing completed');
}

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
  console.error('❌ This script requires Node.js 18+ or install node-fetch');
  process.exit(1);
}

runTests().catch(console.error);