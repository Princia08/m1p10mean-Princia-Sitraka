const mongoose = require('mongoose')

async function load(){
    try{
        mongoose.set('strictQuery', true)
        const db = await mongoose.connect(process.env.DATABASE)
        return db
    }catch(e){ throw e }
}

module.exports = { load }