import { Hono } from 'hono'

import v1Router from './routes/v1'


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/v1', v1Router)

export default app
