import express from 'express'
import mongoose from 'mongoose'

import { config } from 'config'
import { helloWorldRouter, productsRouter } from 'routes'

const { DATABASE_URL } = config

const connectDatabase = () => {
  mongoose.connect(DATABASE_URL)
  const db = mongoose.connection

  db.on('error', (err) => console.error(err))
  db.once('open', () => console.log('Database Connection Established'))

  return db
}

export const runServer = () => {
  const app = express()
  connectDatabase()

  app.use(express.json())
  app.use('/helloworld', helloWorldRouter)
  app.use('/product', productsRouter)

  app.listen(3000, () => console.log('Server Started'))
}
