import * as React from 'react'

import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { Gem, Pack, Result, useAnalyse } from './PremDraftHooks'

const tr = (res: Result, unit: (v: Gem) => (string), unitstr: string) => {
  return (
    <tr>
      <td>
        {unit(res.profitGemsWithoutPack().div(1))}{unitstr}&ensp;
        ({unit(res.profitGemsWithoutPack().div(res.totalGames()))}{unitstr})
      </td>
      <td>
        {unit(res.profitGemsWithPack().div(1))}{unitstr}&ensp;
        ({unit(res.profitGemsWithPack().div(res.totalGames()))}{unitstr})
      </td>
      <td>
        {unit(res.rewardPacks().gem().div(1))}{unitstr}&ensp;
        ({unit(res.rewardPacks().gem().div(res.totalGames()))}{unitstr})
      </td>
    </tr>
  )
}

export const Page = () => {
  const [result, analyse] = useAnalyse()

  return (
    <div>
      <h1>MTG Arenaプレミアドラフトでジェムをいくら使ったか</h1>

      <h3>概要</h3>
      <p>
        17Landsのデータから、プレミアドラフトでどれくらいジェムを使ったかを計算します。
        その他のフォーマットは対象外です。
      </p>

      <h3>使い方</h3>
      <p>
        <ol>
          <li>
            <a href="https://www.17lands.com/history/events"
               target="_blank" rel="noopener noreferrer">17LandsのEvent History</a>
            にアクセス
          </li>
          <li>Ctrl+A Ctrl+Cで全体をコピーする</li>
          <li>下のフォームに貼り付ける</li>
        </ol>
      </p>

      <hr/>

      <p>
        通算 {result.totalGames()}ドラフト {result.totalWins()}勝 {result.totalLoses()}負
      </p>

      <Table>
        <caption>
          通算(1ドラフトあたり)<br/>
          <small>
            * 1パック = {Pack.gemsPerPack}ジェム<br/>
            * 1ドル = {Gem.gemsPerDoller}ジェム = {Gem.yenParDoller}円
          </small>
        </caption>
        <thead>
          <tr>
            <th>ジェム収支</th>
            <th>ジェム収支(パック込)</th>
            <th>獲得パック: {result.rewardPacks().toString()}</th>
          </tr>
        </thead>
        <tbody>
          {tr(result, v => v.toString(), "ジェム")}
          {tr(result, v => v.dollerStr(), "ドル")}
          {tr(result, v => v.yenStr(), "円")}
        </tbody>
      </Table>

      <Form>
        <Form.Group className="mb-3">
          <Form.Control as="textarea" rows={5} placeholder="17landsからコピーしたものをここにペースト"
                        autoFocus
                        onChange={e => analyse(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  )
}
