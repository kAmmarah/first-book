// Vercel Serverless Function for Chat API

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Parse the request body
      const { query, context } = req.body;
      
      // In a real implementation, this would call your actual chat service
      // For now, we'll return a mock response
      const response = {
        response: `This is a mock response to your question: '${query}'. In a production environment, this would be answered by an AI model.`
      };
      
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
  if (req.method === 'POST') {
    try {
      // Parse the request body
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', async () => {
        const { query, context } = JSON.parse(body);
        
        // In a real implementation, this would call your actual chat service
        // For now, we'll return a mock response
        const response = {
          response: `This is a mock response to your question: '${query}'. In a production environment, this would be answered by an AI model.`
        };
        
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(response));
      });
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  } else {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
}