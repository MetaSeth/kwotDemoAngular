const express = require('express');
const app = express();


function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
app.use(requireHTTPS);
app.use(express.static('./dist/kwotDemoAngular'));

app.get('/*', function (req, res) {
  console.log("something try to connect");
  res.sendFile('index.html', { root: 'dist/kwotDemoAngular/' }
  );
});
app.listen(process.env.PORT || 8080, () => {
  return console.log(`server is listening on ${process.env.PORT || 8080}`);
});

