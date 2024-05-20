import http from 'node:http'

let id = 0;

const users = []

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    request.body = null;
  }


  if (method === 'GET' && url === '/users') {
    return response
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = request.body

    id += 1;

    users.push({
      id,
      name,
      email,
    })
    
    return response.writeHead(201).end()
  }

  return response.writeHead(404).end()
})

server.listen(3333)