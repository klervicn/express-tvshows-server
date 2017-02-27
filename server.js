var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var uuid = require('uuid4')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
var series = []
var seasons = []

series.push({name: 'Dr Who', id: '1', path: 'C:\Users\Klervi\Pictures\tardis.png'})
series.push({name: 'Pokemon', id: '2', path: 'C:\Users\Klervi\Pictures\slowpoke.png'})
series.push({name: 'Orange is the new black', id: '3', path: 'C:\Users\Klervi\Pictures\orange_is_the_new_black.png'})
seasons.push({name: 'Saison 1', idSerie: '1', id : String(uuid())})
seasons.push({name: 'Saison 2', idSerie: '1', id : String(uuid())})
seasons.push({name: 'Saison 3', idSerie: '1', id : String(uuid())})
seasons.push({name: 'Saison 1', idSerie: '2', id : String(uuid())})
seasons.push({name: 'Saison 1', idSerie: '3', id : String(uuid())})
seasons.push({name: 'Saison 2', idSerie: '3', id : String(uuid())})

app.post('/', function (req, res, next) {
  var name = req.body.name
  var id = String(uuid())
  var path = req.body.path

  series.push({name, id, path})
  res.send(name + ' ' + id)
  next()
})

app.post('/:tvShowId', function (req, res, next) {
  var name = req.body.name
  var idSerie = req.params.tvShowId
  var id = String(uuid())

  seasons.push({name, idSerie, id})
  res.send('Nouvelle saison ajoutée ' + id)
  next()
})


// GET/ "retourne un objet contenant la liste des séries"
app.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  var seriesList = []
  for (serie of series) {
    seriesList.push(serie.name)
  }
  res.write(JSON.stringify({ seriesList }))
  res.end()
  next()
})

// GET /<tvShowId>: retourne un objet contenant le titre de la série, l'URL de son image et la liste des saisons
app.get('/:tvShowId', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  var selectedSerie = series.find(function (serie) {
    return String(serie.id) === req.params.tvShowId
  })
  var seasonsArray = []

  for (season of seasons){
    if (season.idSerie === req.params.tvShowId ){
      seasonsArray.push(season.name)
    }
  }
  res.write(JSON.stringify(selectedSerie))
  res.write('Serie ' + req.params.tvShowId + ' : ' + JSON.stringify(selectedSerie.name) + ' Saisons : ' + JSON.stringify({seasonsArray}))
  res.end()
  next()
})

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain')
  res.send(404, 'Page introuvable !')
  next()
})

app.listen(8080)
