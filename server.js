var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
var series = []

series.push({name: 'Dr Who', id: '1', path: 'C:\Users\Klervi\Pictures\tardis.png', nbSeasons: 9})
series.push({name: 'Pokemon', id: '2', path: 'C:\Users\Klervi\Pictures\slowpoke.png', nbSeasons: 12})
series.push({name: 'Orange is the new black', id: '3', path: 'C:\Users\Klervi\Pictures\orange_is_the_new_black.png', nbSeasons: 4})

app.post('/addSerie', function (req, res, next) {
  var name = req.body.name
  var id = req.body.id
  var path = req.body.path
  var nbSeasons = req.body.nbSeasons

  series.push({name, id, path, nbSeasons})
  res.send(name + ' ' + id + ' ' + nbSeasons)
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
    return serie.id === req.params.tvShowId
  })
  res.write(JSON.stringify(selectedSerie))
  res.write('Serie ' + req.params.tvShowId + ' : ' + JSON.stringify(selectedSerie.name))
  res.end()
  next()
})

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain')
  res.send(404, 'Page introuvable !')
  next()
})

app.listen(8080)
