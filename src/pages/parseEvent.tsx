export interface EventElem {
  win: number
  lose: number
  format: string
}

export const parseEvent = (text: string): EventElem[] => {
  const l = text.split(/(\d+-\d+-\d+ \d+:\d)/g).slice(1)
  const lines: string[] = []
  for (let i = 0; i < l.length / 2; i++) {
    const s = l[i*2].concat(l[i*2+1])
    lines.push(s)
  }

  if (lines == null) {
    return []
  }

  const res = lines.map((line) => {
    const format = line.split('\t')[6]
    const winlose = line.split('\t')[5]
    if(winlose == undefined) {
      return null
    }
    const win = parseInt(winlose.split('-')[0])
    const lose = parseInt(winlose.split('-')[1])

    const e: EventElem = {
      win: win,
      lose: lose,
      format: format
    }

    return e
  })

  return res.flatMap(e => e ? [e] : [])
}
