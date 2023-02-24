import express from 'express'
import mysql from 'mysql2'

import { config } from 'config'
import { helloWorldRouter } from 'routes'

const { DATABASE_URL } = config

export const runServer = () => {
  const app = express()
  const db = mysql.createConnection(DATABASE_URL)
  db.connect((err) => console.log(err))

  app.use(express.json())
  app.use('/helloworld', helloWorldRouter)

  app.listen(3000, () => console.log('Server Started'))
}
