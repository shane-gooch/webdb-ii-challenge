const server = require("./server.js");

const port = process.env.PORT || 8000;

server.use(function(req, res) {
  res.status(404).send("<h1>Invalid URL</h1>");
});

server.listen(port, () => console.log(`server running on ${port}`));
