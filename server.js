const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const uuid = require('uuid4')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

const series = {}
const seasons = {}

seasons[String(uuid())] = {name: 'Saison 1', idSerie: '1'}
seasons[String(uuid())] = {name: 'Saison 2', idSerie: '1'}
seasons[String(uuid())] = {name: 'Saison 3', idSerie: '1'}
seasons[String(uuid())] = {name: 'Saison 1', idSerie: '2'}
seasons[String(uuid())] = {name: 'Saison 1', idSerie: '3'}
seasons[String(uuid())] = {name: 'Saison 2', idSerie: '3'}

series[1] = {name: 'Dr Who', url: 'http://www.hbc333.com/data/out/71/46987055-dr-who-wallpaper.jpg'}
series[2] = {name: 'Pokemon', url: 'http://cdn.bulbagarden.net/upload/thumb/7/70/079Slowpoke.png/250px-079Slowpoke.png'}
series[3] = {name: 'Orange is the new black', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Orange_is_the_new_Black.png'}

// POST /: insère une nouvelle série et retourne son identifant généré par le serveur
app.post('/', (req, res, next) => {
  const name = req.body.name
  const id = String(uuid())
  const url = req.body.url

  series[id] = {name, url}
  res.send(name + ' ' + id)
  next()
})

// POST /: insère une nouvelle série et retourne son identifant généré par le serveur
app.post('/:tvShowId', (req, res, next) => {
  const name = req.body.name
  const idSerie = req.params.tvShowId
  const id = String(uuid())

  seasons[id] = {name, idSerie}
  res.send('Nouvelle saison ajoutée ' + id)
  next()
})

// GET/ "retourne un objet contenant la liste des séries"
app.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(series))
  res.end()
  next()
})

// GET /<tvShowId>: retourne un objet contenant le titre de la série, l'URL de son image et la liste des saisons
app.get('/:tvShowId', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  const selectedSerie = series[req.params.tvShowId]
  const seasonsArray = []

  for (id in seasons) {
    if (seasons[id].idSerie === req.params.tvShowId) {
      seasonsArray.push(seasons[id].name)
    }
  }

  res.write('Serie ' + req.params.tvShowId + ' : ' + JSON.stringify(selectedSerie.name) + ' Saisons : ' + JSON.stringify(seasonsArray))
  res.end()
  next()
})

app.listen(8080)
