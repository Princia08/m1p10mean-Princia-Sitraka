const express = require('express')
const path = require('path')
const app = express()
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Headers', '*')
    next()
})
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('dist/m1p10mean-Princia-Sitraka'))

module.exports = {app}