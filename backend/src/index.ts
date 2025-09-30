import { Hono } from 'hono'
import { cors } from "hono/cors";


import v1Router from './routes/v1'


const app = new Hono()

app.use(
	"/*",
	cors({
		origin: ["http://localhost:3000"],
	}),
);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/v1', v1Router)

export default {
  port: 8080,
  fetch: app.fetch,
}
