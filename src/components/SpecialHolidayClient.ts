import { format } from 'https://deno.land/std@0.174.0/datetime/format.ts'
import { parse } from 'https://deno.land/std@0.175.0/encoding/csv.ts'

const SYUKUJITSU_CSV_FILE = '.data/syukujitsu.csv'

class SpecialHoliday {
  constructor(public readonly date: string, public readonly name: string) {
    this.date = format(new Date(date), 'yyyy/MM/dd')
    this.name = name
  }
}

const SpecialHolidayClient = {
  get: async () => {
    return parse(await Deno.readTextFile(SYUKUJITSU_CSV_FILE)).map(
      (row) => new SpecialHoliday(row[0], row[1]),
    )
  },
}

export default SpecialHolidayClient
