const { createServer } = require("http");

const DEFAULT_USER = { username: "CherryRamatis", password: "123" };

const routes = {
  "/contact:get": (request, response) => {
    response.write("contact us page");
    return response.end();
  },
  "/login:post": async (request, response) => {
    // response is a iterator
    for await (const data of request) {
      const user = JSON.parse(data);
      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401);
        response.write("Login failed");
        return response.end();
      }

      response.write("Login has succeeded");
      return response.end();
    }
  },
  default: (request, response) => {
    response.write("Hello world");
    return response.end();
  },
};

const handler = (request, response) => {
  const { url, method } = request;

  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;

  response.writeHead(200, {
    "Content-Type": "text/html",
  });

  return chosen(request, response);
};

const port = process.env.PORT || 3000;

const app = createServer(handler).listen(port, () =>
  console.log(`app running at ${port}`)
);

module.exports = app;
