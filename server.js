
const EXPRESS = require('express')
const APP = EXPRESS()
const BODY_PARSER = require('body-parser')
const UUID = require('uuid4')
APP.use(BODY_PARSER.json())
APP.use(BODY_PARSER.urlencoded({ extended: true}))
const SERIES = []
const SEASONS = []

SERIES.push({name: 'Dr Who', id: '1', path: 'C:\Users\Klervi\Pictures\tardis.png'})
SERIES.push({name: 'Pokemon', id: '2', path: 'C:\Users\Klervi\Pictures\slowpoke.png'})
SERIES.push({name: 'Orange is the new black', id: '3', path: 'C:\Users\Klervi\Pictures\orange_is_the_new_black.png'})
SEASONS.push({name: 'Saison 1', idSerie: '1', id : String(UUID())})
SEASONS.push({name: 'Saison 2', idSerie: '1', id : String(UUID())})
SEASONS.push({name: 'Saison 3', idSerie: '1', id : String(UUID())})
SEASONS.push({name: 'Saison 1', idSerie: '2', id : String(UUID())})
SEASONS.push({name: 'Saison 1', idSerie: '3', id : String(UUID())})
SEASONS.push({name: 'Saison 2', idSerie: '3', id : String(UUID())})

APP.post('/', (req, res, next) => {
  var name = req.body.name
  var id = String(UUID())
  var path = req.body.path

  SERIES.push({name, id, path})
  res.send(name + ' ' + id)
  next()
})

APP.post('/:tvShowId', (req, res, next) => {
  var name = req.body.name
  var idSerie = req.params.tvShowId
  var id = String(UUID())

  SEASONS.push({name, idSerie, id})
  res.send('Nouvelle saison ajoutée ' + id)
  next()
})


// GET/ "retourne un objet contenant la liste des séries"
APP.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  var seriesList = []
  for (serie of SERIES) {
    seriesList.push(serie.name)
  }
  res.write(JSON.stringify({ seriesList }))
  res.end()
  next()
})

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
})

APP.listen(8080)
