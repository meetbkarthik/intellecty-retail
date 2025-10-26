// Simple API test script for Intellecty Retail
const API_BASE = 'http://localhost:3000/api'

async function testAPI() {
  console.log('🧪 Testing Intellecty Retail API...\n')

  const tests = [
    {
      name: 'Weather API',
      url: `${API_BASE}/external-apis/weather?lat=40.7128&lon=-74.0060&days=5`,
      method: 'GET'
    },
    {
      name: 'Economic API',
      url: `${API_BASE}/external-apis/economic?country=US`,
      method: 'GET'
    },
    {
      name: 'ABC Analysis',
      url: `${API_BASE}/analytics/abc-analysis`,
      method: 'GET'
    }
  ]

  for (const test of tests) {
    try {
      console.log(`Testing ${test.name}...`)
      const response = await fetch(test.url, {
        method: test.method,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`✅ ${test.name}: SUCCESS`)
        console.log(`   Response: ${JSON.stringify(data).substring(0, 100)}...`)
      } else {
        console.log(`❌ ${test.name}: FAILED (${response.status})`)
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ERROR - ${error.message}`)
    }
    console.log('')
  }

  console.log('🎉 API testing completed!')
}

// Run tests
testAPI().catch(console.error)
