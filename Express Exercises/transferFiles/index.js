var express = require('express');
var path = require('path');

var app = express();

var FILES_DIR = path.join(__dirname, 'files');

app.get('/', function(req, res) {
  res.send('<ul>' +
    '<li>Download <a href="/files/notes/groceries.txt" download>notes/groceries.txt</a>.</li>' +
    '<li>Download <a href="/files/amazing.txt" download>amazing.txt</a>.</li>' +
    '<li>Download <a href="/files/missing.txt">missing.txt</a>.</li>' +
    '<li>Download <a href="/files/CCTV大赛上海分赛区.txt">CCTV大赛上海分赛区.txt</a>.</li>' +
    '</ul>');
});

app.get('/files/*', function (req, res, next) {
  const filePath = req.params[0]; // req.params[0] gets the wildcard path after /files/
  const fullFilePath = path.join(FILES_DIR, filePath); // Join the base folder with the file path

  res.download(fullFilePath, function (err) {
    if (!err) return; // file sent successfully
    if (err.status !== 404) return next(err); // pass non-404 errors to error handler

    // File not found
    res.status(404).send('Sorry, the file you are looking for does not exist.');
  });
});

app.listen(3500, function() {
  console.log('Express started on port 3500');
});
