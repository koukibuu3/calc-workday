import { format } from "https://deno.land/std@0.174.0/datetime/format.ts";
import { serve } from "https://deno.land/std@0.175.0/http/server.ts"

import { getSpecialHolidays } from "./getSpecialHolidays.ts"

const handler = async (request: Request) => {
  let query = new URL(request.url).searchParams.get('q')
  if (query && /^\d{6}$/.test(query) === false) {
    return new Response('Invalid query', {
      status: 400,
      headers: {
        "content-type": "text/json",
      },
    })
  }
  if (!query) {
    query = format(new Date(), 'yyyyMM')
  }

  const [y, m] = [query.slice(0, 4), query.slice(4, 6)]

  console.log(`y: ${y}, m: ${m}`)

  const json = JSON.stringify({
    year: y,
    month: m,
    days: 31,
    workdays: 22,
    holidays: 8,
    specialHolidays: (await getSpecialHolidays(query)).length,
    workHours: 176,
  })

  return new Response(json, {
    status: 200,
    headers: {
      "content-type": "text/json",
    },
  })
}

serve(handler)
