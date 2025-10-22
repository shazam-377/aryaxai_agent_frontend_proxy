const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for your frontend domain (or all during development)
app.use(cors({ origin: 'https://aryaxai-agent-react-frontend.onrender.com' }));

// Proxy API requests to your ngrok URL
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://ethyl-uncynical-jimmie.ngrok-free.dev', // Your ngrok URL
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // remove /api prefix when forwarding
    },
    onProxyReq: (proxyReq) => {
      // Optionally modify requests - e.g., add headers
    },
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server started on port ${PORT}`);
});
