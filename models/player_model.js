let Player = require('../players.json')
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

const update = (id, player) => {
  return new Promise((resolve, reject) => {
    const index = Player.findIndex((p) => p.id === Number(id))
    player[index] = { id, ...player }
    appendPlayerToAFile('../players.json', Player)
    resolve(player[index])
  })
}

const remove = (id) => {
  return new Promise((resolve, reject) => {
    Player = Player.filter((p) => p.id !== Number(id))
    appendPlayerToAFile('../players.json', Player)
    resolve()
  })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
}
