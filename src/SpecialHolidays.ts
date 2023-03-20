import { Dayjs } from 'npm:dayjs@1.11.7'
import SpecialHolidayClient from './components/SpecialHolidayClient.ts'

const SpecialHolidays = async (date: Dayjs) => {
  const formattedDate = date.format('YYYY/MM')
  const specialHolidays = await SpecialHolidayClient.get()

  return specialHolidays.filter(
    (specialHoliday) => specialHoliday.date.includes(formattedDate),
  ).map((specialHoliday) => specialHoliday.date)
}

export default SpecialHolidays
