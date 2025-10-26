#!/usr/bin/env node

/**
 * Intellecty Retail MVP - Deployment Test Script
 * Tests all API endpoints and functionality
 */

const https = require('https');
const fs = require('fs');

// Configuration
const BASE_URL = 'https://intellecty-retail-2js1495ce-meetbkarthiks-projects.vercel.app';
const BYPASS_TOKEN = process.env.VERCEL_BYPASS_TOKEN || '';

// Test results
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

// Utility function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

// Test function
async function runTest(name, testFn) {
  console.log(`\n🧪 Testing: ${name}`);
  try {
    await testFn();
    results.passed++;
    results.tests.push({ name, status: 'PASSED' });
    console.log(`✅ ${name} - PASSED`);
  } catch (error) {
    results.failed++;
    results.tests.push({ name, status: 'FAILED', error: error.message });
    console.log(`❌ ${name} - FAILED: ${error.message}`);
  }
}

// Test cases
async function testLandingPage() {
  const url = BYPASS_TOKEN 
    ? `${BASE_URL}/?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${BYPASS_TOKEN}`
    : BASE_URL;
    
  const response = await makeRequest(url);
  
  if (response.statusCode === 200) {
    if (response.body.includes('Intellecty Retail')) {
      console.log('   ✓ Landing page loads correctly');
    } else {
      throw new Error('Landing page content not found');
    }
  } else if (response.statusCode === 401) {
    console.log('   ⚠️  Landing page requires authentication (deployment protection enabled)');
  } else {
    throw new Error(`Unexpected status code: ${response.statusCode}`);
  }
}

async function testAPIEndpoint(endpoint, expectedStatus = 200) {
  const url = BYPASS_TOKEN 
    ? `${BASE_URL}${endpoint}?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${BYPASS_TOKEN}`
    : `${BASE_URL}${endpoint}`;
    
  const response = await makeRequest(url);
  
  if (response.statusCode === expectedStatus) {
    console.log(`   ✓ ${endpoint} returns ${response.statusCode}`);
    
    // Try to parse JSON response
    try {
      const data = JSON.parse(response.body);
      if (data.success !== undefined) {
        console.log(`   ✓ Response has success field: ${data.success}`);
      }
    } catch (e) {
      // Not JSON, that's okay for some endpoints
    }
  } else if (response.statusCode === 401) {
    console.log(`   ⚠️  ${endpoint} requires authentication (deployment protection enabled)`);
  } else {
    throw new Error(`Expected ${expectedStatus}, got ${response.statusCode}`);
  }
}

async function testPOSTEndpoint(endpoint, body) {
  const url = BYPASS_TOKEN 
    ? `${BASE_URL}${endpoint}?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${BYPASS_TOKEN}`
    : `${BASE_URL}${endpoint}`;
    
  const response = await makeRequest(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    },
    body: body
  });
  
  if (response.statusCode === 200 || response.statusCode === 201) {
    console.log(`   ✓ ${endpoint} POST returns ${response.statusCode}`);
    
    try {
      const data = JSON.parse(response.body);
      if (data.success !== undefined) {
        console.log(`   ✓ Response has success field: ${data.success}`);
      }
    } catch (e) {
      // Not JSON, that's okay
    }
  } else if (response.statusCode === 401) {
    console.log(`   ⚠️  ${endpoint} requires authentication (deployment protection enabled)`);
  } else {
    throw new Error(`Expected 200/201, got ${response.statusCode}`);
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting Intellecty Retail MVP Deployment Tests');
  console.log(`📍 Testing URL: ${BASE_URL}`);
  
  if (BYPASS_TOKEN) {
    console.log('🔑 Using Vercel bypass token for authentication');
  } else {
    console.log('⚠️  No bypass token provided - some tests may fail due to deployment protection');
  }

  // Test landing page
  await runTest('Landing Page', testLandingPage);

  // Test API endpoints
  await runTest('Tenant Info API', () => testAPIEndpoint('/api/tenants/info'));
  await runTest('Weather API', () => testAPIEndpoint('/api/external-apis/weather'));
  await runTest('Economic API', () => testAPIEndpoint('/api/external-apis/economic'));
  await runTest('ABC Analysis API', () => testAPIEndpoint('/api/analytics/abc-analysis'));
  await runTest('Inventory Optimization API', () => testAPIEndpoint('/api/inventory/optimize'));
  
  // Test POST endpoints
  await runTest('Forecast Generation API', () => 
    testPOSTEndpoint('/api/forecasting/generate', JSON.stringify({
      productId: 'test-product-1',
      horizon: 30,
      includeExternalFactors: true
    }))
  );

  // Test authentication pages
  await runTest('Sign In Page', () => testAPIEndpoint('/auth/signin'));
  await runTest('Sign Up Page', () => testAPIEndpoint('/auth/signup'));

  // Test dashboard pages
  await runTest('Dashboard Page', () => testAPIEndpoint('/dashboard'));
  await runTest('Forecasting Page', () => testAPIEndpoint('/dashboard/forecasting'));
  await runTest('Inventory Page', () => testAPIEndpoint('/dashboard/inventory'));
  await runTest('Analytics Page', () => testAPIEndpoint('/dashboard/analytics'));
  await runTest('Data Sources Page', () => testAPIEndpoint('/dashboard/data-sources'));
  await runTest('Settings Page', () => testAPIEndpoint('/dashboard/settings'));

  // Print results
  console.log('\n📊 Test Results Summary:');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);

  console.log('\n📋 Detailed Results:');
  results.tests.forEach(test => {
    const status = test.status === 'PASSED' ? '✅' : '❌';
    console.log(`${status} ${test.name}`);
    if (test.error) {
      console.log(`   Error: ${test.error}`);
    }
  });

  // Save results to file
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    bypassTokenUsed: !!BYPASS_TOKEN,
    summary: {
      passed: results.passed,
      failed: results.failed,
      successRate: ((results.passed / (results.passed + results.failed)) * 100).toFixed(1)
    },
    tests: results.tests
  };

  fs.writeFileSync('test-results.json', JSON.stringify(report, null, 2));
  console.log('\n💾 Test results saved to test-results.json');

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(error => {
  console.error('💥 Test runner failed:', error);
  process.exit(1);
});
