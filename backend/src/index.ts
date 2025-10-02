import { Hono } from 'hono'
import { cors } from "hono/cors";


import v1Router from './routes/v1'

// initialising app
const app = new Hono()

// giving cross domain permissions using cors
app.use(
	"/*",
	cors({
		origin: ["http://localhost:3000"],
	}),
);

app.get('/', (c) => {
	return c.text('Hello Hono!')
})

// version 1 router
app.route('/v1', v1Router)

// run the server on port 8080
export default {
	port: 8080,
	fetch: app.fetch,
}
