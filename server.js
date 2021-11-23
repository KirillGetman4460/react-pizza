const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('product.json')
const middlewares = jsonServer.defaults({
  static: 'product.json',
});

const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log('Server is running');
});