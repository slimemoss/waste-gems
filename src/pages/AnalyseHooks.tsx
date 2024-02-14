import * as React from 'react'

interface Result {
  totalGames: number
  totalWins: number
  totalLoses: number
  profitGems: number
  profitPacks: number
  gemsPerDollar: number
  dollarPerYen: number
  gemsPerPack: number
  errIncludeOtherFormat: boolean
}

const gemsPerDollar = 200
const gemsPerPack = 200
const dollarPerYen = 150

const defaultResult: Result = {
  totalGames: 0,
  totalWins: 0,
  totalLoses: 0,
  profitGems: 0,
  profitPacks: 0,
  gemsPerDollar: gemsPerDollar,
  gemsPerPack: gemsPerPack,
  dollarPerYen: dollarPerYen,
  errIncludeOtherFormat: false
}

const rewardGems = [50, 100, 250, 1000, 1400, 1600, 1800, 2200]
const rewardPacks = [1, 1, 2, 2, 3, 4, 5, 6]

export const useAnalyse = (): [result: Result, analyse: (input: string) => void] => {
  const [result, setResult] = React.useState<Result>(defaultResult)

  const analyse = (input: string) => {
    const res = {...defaultResult}

    input.replace(/\r\n|\r/g, "\n").split('\n').forEach((line) => {
      if(line.substring(0, 3) != '202') {
        return
      }

      if(line.split('\t')[6] != 'PremierDraft') {
        res.errIncludeOtherFormat = true
        return
      }

      if(line.split('\t')[1] == '') {
        return
      }

      const winlose = line.split('\t')[5]
      if(winlose == undefined) {
        return
      }

      const win = parseInt(winlose.split('-')[0])
      if(win < 0 || 7 < win) {
        return
      }
      const lose = parseInt(winlose.split('-')[1])

      res.totalWins += win
      res.totalLoses += lose
      res.profitGems += (rewardGems[win] - 1500)
      res.profitPacks += rewardPacks[win]
      res.totalGames += 1
    })
    
    setResult(res)
  }

  return [result, analyse]
}
