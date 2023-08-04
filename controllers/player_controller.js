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
  }
}

const updatePlayer = async (req, res, id) => {
  try {
    const player = await PlayerModel.findById(id)
    if (!player) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: `No player with that ID ${id}` }))
    } else {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk.toString()
      })

      req.on('end', async () => {
        const { name, age, bio } = JSON.parse(body)
        const player = {
          name: name || player.name,
          age: age || player.age,
          bio: bio || player.bio,
        }
        const updatedProduct = await PlayerModel.update(id, player)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(updatedProduct))
      })
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: `Something Went Wrong!` }))
  }
}

const deletePlayer = async (req, res, id) => {
  try {
    const player = await PlayerModel.findById(id)
    if (!player) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: `No player with that ID ${id}` }))
    } else {
      await PlayerModel.remove(id)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: `Successfully deleted!` }))
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: `Something Went Wrong!` }))
  }
}

module.exports = {
  getPlayers,
  getPlayer,
  createProduct,
  updatePlayer,
  deletePlayer,
}
