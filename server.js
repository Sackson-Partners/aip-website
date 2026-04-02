const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const CUSTOM_DOMAIN = 'www.africa-infra.com';

// Redirect default Azure domain to custom domain
app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host.includes('azurewebsites.net')) {
    const redirectUrl = `https://${CUSTOM_DOMAIN}${req.url}`;
    console.log(`Redirecting ${host} to ${redirectUrl}`);
    return res.redirect(301, redirectUrl);
  }
  next();
});

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routing - Express 5 compatible
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Custom domain: ${CUSTOM_DOMAIN}`);
});
