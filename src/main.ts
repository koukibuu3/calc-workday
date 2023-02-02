import { serve } from "https://deno.land/std@0.175.0/http/server.ts"
import { getSpecialHolidays } from "./getSpecialHolidays.ts"

const handler = async (request: Request) => {
  const searchParams = new URL(request.url).searchParams

  const year = searchParams.get("year") ?? new Date().getFullYear()
  const month = searchParams.get("month") ?? new Date().getMonth() + 1

  console.log(`year: ${year}, month: ${month}`)

  const json = JSON.stringify({
    year,
    month,
    days: 31,
    workdays: 22,
    holidays: 8,
    specialHolidays: (await getSpecialHolidays(year, month)).length,
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
