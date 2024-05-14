import http from 'node:http'

const users = [
  { name: 'Diego', age: 25 },
  { name: 'Vini', age: 25 },
  { name: 'Rafa', age: 25 },
]

const server = http.createServer((request, response) => {
  const { method, url } = request

  if (method === 'GET' && url === '/users') {
    return response
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({ name: 'Lucas', age: 25 })
    return response.writeHead(201).end()
  }

  return response.writeHead(404).end()
})

server.listen(3333)