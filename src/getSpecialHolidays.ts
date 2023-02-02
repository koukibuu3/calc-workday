import { parse } from "https://deno.land/std@0.175.0/encoding/csv.ts"

export const getSpecialHolidays = async (y: number|string, m: number|string) => {
  const ym = `${y}/${m}`
  const syukujitsu = parse(await Deno.readTextFile(".data/syukujitsu.csv"))

  return syukujitsu.filter(row => row[0].includes(ym)).map(row => row[0])
}
