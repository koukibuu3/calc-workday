import { serve } from "https://deno.land/std@0.175.0/http/server.ts"

const handler = () => {
  return new Response("Hello World", {
    status: 200,
    headers: {
      "content-type": "text/json",
    },
  })
}

serve(handler)
