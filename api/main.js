const { app } = require("./modules/app/app.module")
const path = require('path')
const { load } = require("./modules/database/database.module")
const { UserRouter } = require("./router/user/user.router")
const { PersonneRouter } = require("./router/personne.router")

async function main(){
    try{
        await load()
        app.get('/api/test', (req, res) => res.json({message: 'Ok Bee'}))

        // UserRouter('user')
        PersonneRouter('Personne')
        app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/bee-project/index.html')))

        app.listen(process.env.PORT, () => console.log(`Start on ${process.env.PORT}`))
    }catch(e){ console.error(e) }
}

module.exports = {main}