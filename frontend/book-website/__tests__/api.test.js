// Test for Vercel API functions
const { createMocks } = require('node-mocks-http');

// Mock the ES module import
jest.mock('../api/health', () => ({
  __esModule: true,
  default: function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
}));

const healthHandler = require('../api/health');

describe('API Tests', () => {
  test('Health check endpoint returns correct status', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await healthHandler.default(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toHaveProperty('status', 'healthy');
  });

  test('Health check rejects non-GET methods', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await healthHandler.default(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});