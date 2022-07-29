import express from 'express'
import cors from 'cors'

export const App: express.Application = express();

App.use(cors())
App.use(express.json())

import './routes/form'
import './routes/shortener'
import './routes/shortened'

App.listen(80, () => {
    console.log('App listening on port 80')
})