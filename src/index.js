const http = require('http');
const path = require('path');
const fs = require('fs');
const PredictiveTestSelector = require('./pts_engine');

const PORT = parseInt(process.env.PORT, 10) || 7069;
const startTime = Date.now();

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
  const pathname = reqUrl.pathname;

  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'UP', service: 'SmartSelect-PTS', uptimeSeconds: Math.floor((Date.now() - startTime) / 1000) }));
  }

  if (req.method === 'POST' && pathname === '/api/select') {
    const coverage = {
      'test_order_creation': ['Order.create', 'Inventory.check', 'Tax.calc'],
      'test_order_cancellation': ['Order.cancel', 'Payment.refund'],
      'test_notification_sms': ['SMS.send', 'Template.render']
    };
    const modified = ['Payment.refund'];
    const result = PredictiveTestSelector.selectTests(modified, coverage);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(result));
  }

  let filePath = path.join(__dirname, '..', 'public', pathname === '/' ? 'index.html' : pathname);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return fs.createReadStream(filePath).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log('SmartSelect-PTS running on port ' + PORT);
});
