import { Hono } from 'hono'
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { redirects } from './schema';

const app = new Hono()

app.get('/', async (c) => {
  const client = createClient({ url: c.env.DB_URL, authToken: c.env.DB_TOKEN });

  const db = drizzle(client);

  const result = await db.select()
    .from(redirects).where(eq(redirects.host, c.req.header('host')));


  if (!result[0]?.url) {
    return c.text('No redirect found')
  }
  console.log(c.req.header('host'));

  return c.redirect(result[0].url);
})

export default app
