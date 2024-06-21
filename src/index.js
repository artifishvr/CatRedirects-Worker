import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ url: 'DATABASE_URL', authToken: 'DATABASE_AUTH_TOKEN' });

const db = drizzle(client);
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
