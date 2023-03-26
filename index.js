const express = require('express')

const app = express()




//routes
app.get('/',(req,res) => {
    res.status(400).send('Url ot found')
})


//config
const port = process.env.PORT || 3000

app.listen(3000,() => {
    console.log("Listening port: ",port)
})