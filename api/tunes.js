const https = require('https');

module.exports = function(req, res) {
  const term = req.query && req.query.term;
  if (!term) {
    res.status(400).json({ error: 'missing term' });
    return;
  }

  const url = 'https://itunes.apple.com/search?term=' + encodeURIComponent(term) + '&media=music&entity=album&limit=25';

  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => data += chunk);
    apiRes.on('end', () => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    });
  }).on('error', (e) => {
    res.status(500).json({ error: e.message });
  });
};
