let express = require('express');
let path = require('path');

let app = express();
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
})
app.listen(4000, function() {
  console.log('4000 start');
})