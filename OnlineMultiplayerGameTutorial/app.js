import express from 'express'
let app = express()
const PORT = 8080

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})



app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta: http://localhost:${PORT}`)
})