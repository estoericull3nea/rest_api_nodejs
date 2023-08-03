const fs = require('fs')

const appendPlayerToAFile = (filename, playerToAdd) => {
  fs.writeFileSync(filename, JSON.stringify(playerToAdd), 'utf8', (err) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: `Something Went Wrong!\n${err}` }))
    }
  })
}

module.exports = {
  appendPlayerToAFile,
}
