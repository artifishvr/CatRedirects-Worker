import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { redirects } from "./schema";

const app = new Hono();

app.get("*", async (c) => {
  const client = createClient({ url: c.env.DB_URL, authToken: c.env.DB_TOKEN });

  const db = drizzle(client);

  const result = await db
    .select()
    .from(redirects)
    .where(eq(redirects.host, c.req.header("host")));

  if (!result[0]?.url) {
    return c.text("Not found! Go to gaycat.online to claim this domain.");
  }

  if (result[0].url == "reserved") {
    return;
  }

  if (result[0].url.endsWith("*")) {
    let redirecturl = result[0].url.replace("/*", "");
    redirecturl = `${redirecturl}${c.req.path}`;

    return c.redirect(redirecturl);
  }

  if (
    result[0].wkPrefix &&
    c.req.path === `/.well-known/${result[0].wkPrefix}`
  ) {
    return c.text(result[0].wkContent);
  }

  return c.redirect(result[0].url);
});

export default app;
