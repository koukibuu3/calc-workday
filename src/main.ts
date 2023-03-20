import { serve } from 'https://deno.land/std@0.175.0/http/server.ts'
import dayjs from 'https://esm.sh/dayjs@1.11.7'
import Holidays from './Holidays.ts'
import SpecialHolidays from './SpecialHolidays.ts'

const DEFAULT_WORK_TIME = 7.75 // 7時間45分

const handler = async (request: Request) => {
  const q = new URL(request.url).searchParams.get('q')

  if (q && /^\d{6}$/.test(q) === false) {
    return returnBadRequestResponse() // 400
  }

  const date = q
    ? dayjs(`${parseInt(q.slice(0, 4))}/${parseInt(q.slice(4, 6))}/01`)
    : dayjs()
  console.log('date: ', date.format('YYYY/MM/DD'))

  const holidays = (new Holidays(date)).get()
  console.log('holidays: ', holidays)

  const specialHolidays = await SpecialHolidays(date)
  console.log('special holidays: ', specialHolidays)

  const allHolidaysCount = new Set([...holidays, ...specialHolidays]).size
  const lastDayOfMonth = date.endOf('month').date()
  const workdays = lastDayOfMonth - allHolidaysCount
  console.log('workdays: ', workdays)

  const json = JSON.stringify({
    year: date.format('YYYY'),
    month: date.format('MM'),
    days: lastDayOfMonth,
    holidays: holidays.length,
    specialHolidays: specialHolidays.length,
    workdays: workdays,
    workHours: workdays * DEFAULT_WORK_TIME,
  })

  return new Response(json, {
    status: 200,
    headers: {
      'content-type': 'text/json',
    },
  })
}

const returnBadRequestResponse = () => {
  return new Response('Invalid query', {
    status: 400,
    headers: {
      'content-type': 'text/json',
    },
  })
}

serve(handler)
