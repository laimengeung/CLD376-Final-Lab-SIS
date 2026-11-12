const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

// Same pod as registration, so localhost. Delete service is reached by its K8s Service name.
const REGISTRATION_URL = process.env.REGISTRATION_URL || 'http://localhost:5001';
const DELETE_URL = process.env.DELETE_URL || 'http://localhost:5002';

// Without this, the gateway crashes if a microservice is down
proxy.on('error', (err, req, res) => {
  res.status(502).json({ error: 'Service unavailable: ' + err.message });
});

// /registration/register  ->  registration service /register
app.use('/registration', (req, res) => {
  console.log('Gateway -> Registration', req.method, req.url);
  proxy.web(req, res, { target: REGISTRATION_URL });
});

// /student/delete/:id  ->  delete service /delete/:id
app.use('/student', (req, res) => {
  console.log('Gateway -> Delete Student', req.method, req.url);
  proxy.web(req, res, { target: DELETE_URL });
});

app.listen(4000, () => console.log('API Gateway running on port 4000'));