import React from "react";
import { EventElem, parseEvent } from "./parseEvent";

export class Gem {
  static gemsPerDoller = 200
  static yenParDoller = 150

  v: number

  constructor(v: number) {
    this.v = v
  }

  add(v: number): Gem;
  add(v: Gem): Gem;
  add(value: number|Gem): Gem {
    if(typeof value === 'number') {
      return new Gem(this.v + value)
    }
    return this.add(value.v)
  }

  div(v: number): Gem;
  div(v: Gem): Gem;
  div(value: number|Gem): Gem {
    if(value == 0){ return new Gem(0)}
    if(typeof value === 'number') {
      return new Gem(this.v / value)
    }
    return this.div(value.v)
  }

  sub(v: number): Gem;
  sub(v: Gem): Gem;
  sub(value: number|Gem): Gem {
    if(typeof value === 'number') {
      return new Gem(this.v - value)
    }
    return this.sub(value.v)
  }    

  valueOf() {
      return this.v
  }

  toString() {
    return this.v.toLocaleString("ja-JP", {maximumFractionDigits: 0})
  }

  doller() {
    return this.v / Gem.gemsPerDoller
  }

  yen() {
    return this.doller() * Gem.yenParDoller
  }

  dollerStr() {
    return this.doller().toLocaleString("ja-JP", {maximumFractionDigits: 2})
  }

  yenStr() {
    return this.yen().toLocaleString("ja-JP", {maximumFractionDigits: 0})
  }
}

export class Pack {
  static gemsPerPack = 200

  v: number
  constructor(v: number) {
    this.v = v
  }

  toString() { return this.v.toString() }
  valueOf() { return this.v.valueOf() }
  gem() {return new Gem(this.v * Pack.gemsPerPack)}
}

const entryFee = 1500
const rewardGems = [50, 100, 250, 1000, 1400, 1600, 1800, 2200]
const rewardPacks = [1, 1, 2, 2, 3, 4, 5, 6]
export class Result {
  events: EventElem[]

  constructor(events: EventElem[]) {
    this.events = events.filter(e => e.format == "PremierDraft")
                        .filter(e => !(e.win == 0 && e.lose == 0))
  }

  totalGames() {
    return this.events.length
  }

  totalWins() {
    return this.events.reduce((p, c) => p + c.win, 0)
  }

  totalLoses() {
    return this.events.reduce((p, c) => p + c.lose, 0)
  }

  entryFee() {
    return new Gem(this.totalGames() * entryFee)
  }

  rewardPacks() {
    return new Pack(this.events.reduce((p, c) => p + rewardPacks[c.win], 0))
  }

  rewardGems() {
    return this.events.reduce((p, c) => p.add(rewardGems[c.win]), new Gem(0))
  }

  profitGemsWithoutPack() {
    return this.rewardGems().sub(this.entryFee())
  }

  profitGemsWithPack() {
    return this.profitGemsWithoutPack().add(this.rewardPacks().gem())
  }
}


export const useAnalyse = (): [result: Result, analyse: (input: string) => void] => {
  const [result, setResult] = React.useState<Result>(new Result([]))

  const analyse = (input: string) => {
    setResult(new Result(parseEvent(input)))
  }
  
  return [result, analyse]
}
