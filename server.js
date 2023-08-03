const http = require('http')
const {
  getPlayers,
  getPlayer,
  createProduct,
} = require('./controllers/player_controller')

const server = http.createServer((req, res) => {
  if (req.url === '/api/players' && req.method === 'GET') {
    getPlayers(req, res)
  } else if (
    req.url.match(/\/api\/players\/([0-9]+)/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3]
    getPlayer(req, res, id)
  } else if (req.url === '/api/players' && req.method === 'POST') {
    createProduct(req, res)
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({ error: `url ${req.url} ${req.method} not found!` })
    )
  }
})

server.listen(3000, () => {
  console.log('Server Running!')
})
