const Express = require('express');

const app = Express();
const port = process.env.PORT || 5000;

app.use(Express.static(__dirname + '/build'));

app.get('*', function(req, res) {
  res.sendfile(__dirname + '/build/index.html');
});

const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`)
});
