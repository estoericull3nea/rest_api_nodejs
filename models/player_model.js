const Player = require('../players.json')
const { v4: uuidv4 } = require('uuid')
const { appendPlayerToAFile } = require('../utils.js')

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(Player)
  })
}

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const player = Player.find((p) => p.id === Number(id))
    resolve(player)
  })
}

const create = (player) => {
  return new Promise((resolve, reject) => {
    const newPlayer = { id: uuidv4(), ...player }
    Player.push(newPlayer)
    appendPlayerToAFile('../players.json', Player)
    resolve(newPlayer)
  })
}

module.exports = {
  findAll,
  findById,
  create,
}
