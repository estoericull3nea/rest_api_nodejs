const PlayerModel = require('../models/player_model')

// read all
const getPlayers = async (req, res) => {
  try {
    const player = await PlayerModel.findAll()

    if (player.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Empty Players!' }))
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(player))
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: `Something Went Wrong!` }))
  }
}

// read one
const getPlayer = async (req, res, id) => {
  try {
    const player = await PlayerModel.findById(id)

    if (!player) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: `No player with that ID ${id}` }))
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(player))
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: `Something Went Wrong!` }))
  }
}

// create
const createProduct = async (req, res, id) => {
  try {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', async () => {
      const { name, age, bio } = JSON.parse(body)
      const player = {
        name,
        age,
        bio,
      }
      const newPlayer = await PlayerModel.create(player)

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(newPlayer))
    })
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: `Something Went Wrong!` }))
    console.log(error)
  }
}

module.exports = {
  getPlayers,
  getPlayer,
  createProduct,
}
