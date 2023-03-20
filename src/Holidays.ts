import { format } from 'https://deno.land/std@0.174.0/datetime/format.ts'
import { Dayjs } from 'https://esm.sh/dayjs@1.11.7'

class Holidays {
  private year: number
  private month: number
  private daysOfMonth: number

  private REGULAR_HOLIDAYS = [0, 6] // 0: 日曜日, 6: 土曜日
  private DATE_FORMAT = 'yyyy/MM/dd'

  constructor(date: Dayjs) {
    this.year = date.year()
    this.month = date.month()
    this.daysOfMonth = date.endOf('month').date()
  }

  public get() {
    const holidays = [...Array(this.daysOfMonth).keys()].filter(
      (i) => {
        const dayOfWeek = (new Date(this.year, this.month, i + 1)).getDay()
        return this.REGULAR_HOLIDAYS.includes(dayOfWeek)
      },
    ).map((i) =>
      format(new Date(this.year, this.month, i + 1), this.DATE_FORMAT)
    )

    return holidays
  }
}

export default Holidays
