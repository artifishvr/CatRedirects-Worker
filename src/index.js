import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const app = new Hono()

app.get('/', (c) => {
  const client = createClient({ url: c.env.DB_URL, authToken: c.env.DB_TOKEN });

  const db = drizzle(client);

  console.log(c.req.header('host'));

  return c.text('Hello Hono!')
})

export default app
