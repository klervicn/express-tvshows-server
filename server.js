
const EXPRESS = require('express')
const APP = EXPRESS()
const BODY_PARSER = require('body-parser')
const UUID = require('uuid4')
APP.use(BODY_PARSER.json())
APP.use(BODY_PARSER.urlencoded({ extended: true}))

const SERIES = {}
const SEASONS = {}

SEASONS[String(UUID())] = {name: 'Saison 1', idSerie: '1'}
SEASONS[String(UUID())] = {name: 'Saison 2', idSerie: '1'}
SEASONS[String(UUID())] = {name: 'Saison 3', idSerie: '1'}
SEASONS[String(UUID())] = {name: 'Saison 1', idSerie: '2'}
SEASONS[String(UUID())] = {name: 'Saison 1', idSerie: '3'}
SEASONS[String(UUID())] = {name: 'Saison 2', idSerie: '3'}

SERIES[1] = {name: 'Dr Who', url: 'http://www.hbc333.com/data/out/71/46987055-dr-who-wallpaper.jpg'}
SERIES[2] = {name: 'Pokemon', url: 'http://cdn.bulbagarden.net/upload/thumb/7/70/079Slowpoke.png/250px-079Slowpoke.png'}
SERIES[3] = {name: 'Orange is the new black', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Orange_is_the_new_Black.png'}

APP.post('/', (req, res, next) => {
  var name = req.body.name
  var id = String(UUID())
  var url = req.body.url

  SERIES[id] = {name, url}
  res.send(name + ' ' + id)
  next()
})

APP.post('/:tvShowId', (req, res, next) => {
  var name = req.body.name
  var idSerie = req.params.tvShowId
  var id = String(UUID())

  SEASONS[id] = {name, idSerie}
  res.send('Nouvelle saison ajoutée ' + id)
  next()
})


// GET/ "retourne un objet contenant la liste des séries"
APP.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
/*var seriesList = []
  for (serie of SERIES) {
    seriesList.push(serie.name)
  }*/
  res.write(JSON.stringify({SERIES}))
  res.end()
  next()
})
/*
// GET /<tvShowId>: retourne un objet contenant le titre de la série, l'URL de son image et la liste des saisons
APP.get('/:tvShowId', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  var selectedSerie = SERIES.find(function (serie) {
    return String(serie.id) === req.params.tvShowId
  })
  var seasonsArray = []

  for (season of SEASONS){
    if (season.idSerie === req.params.tvShowId ){
      seasonsArray.push(season.name)
    }
  }
  res.write(JSON.stringify(selectedSerie))
  res.write('Serie ' + req.params.tvShowId + ' : ' + JSON.stringify(selectedSerie.name) + ' Saisons : ' + JSON.stringify({seasonsArray}))
  res.end()
  next()
})

APP.use( (req, res, next) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send(404, 'Page introuvable !')
  next()
})*/

APP.listen(8080)
