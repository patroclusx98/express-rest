import express from 'express'

import { config } from 'config'
import { helloWorldRouter } from 'routes'

const { DATABASE_URL } = config

export const runServer = () => {
  const app = express()

  app.use(express.json())
  app.use('/helloworld', helloWorldRouter)

  app.listen(3000, () => console.log('Server Started'))
}
