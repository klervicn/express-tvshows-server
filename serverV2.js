const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

const series = {}

series['Dr_Who'] = {url: 'http://www.hbc333.com/data/out/71/46987055-dr-who-wallpaper.jpg', seasons: []}
series['Pokemon'] = {url: 'http://cdn.bulbagarden.net/upload/thumb/7/70/079Slowpoke.png/250px-079Slowpoke.png', seasons: []}
series['Orange_is_the_new_Black'] = {url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Orange_is_the_new_Black.png', seasons: []}

app.post('/', (req, res, next) => {
  const name = req.body.name
  const url = req.body.url
  const seasons = []

  series[name] = {url, seasons}
  res.send(name + ' ajoutée')
  next()
})

app.post('/:tvShowName', (req, res, next) => {
  const serieName = req.params.tvShowName
  const seasonName = req.body.name

  series[serieName].seasons.push(seasonName)
  res.send('Nouvelle saison ajoutée à ' + serieName + ' : ' + seasonName)
  next()
})

app.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(series))
  res.end()
  next()
})

app.get('/:tvShowName', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  const selectedSerie = series[req.params.tvShowName]

  res.write('Serie ' + req.params.tvShowName + ' : ' + ' Saisons : ' + JSON.stringify(selectedSerie.seasons))
  res.end()
  next()
})

app.listen(8080)
