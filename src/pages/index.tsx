import * as React from 'react'

import Form from 'react-bootstrap/Form'
import { useAnalyse } from './AnalyseHooks'

export const Page = () => {
  const [result, analyse] = useAnalyse()

  return (
    <>
      <h1>MTG Arenaプレミアドラフト　ジェム溶かしチェッカー</h1>
      <hr/>

      <h3>概要</h3>
      17Landsのデータから、プレミアドラフトでどれくらいジェムを溶かしたかを計算します。
      その他のフォーマットは対象外です。
      <hr/>

      <h3>使い方</h3>
      <div>
        <ol>
          <li>
            <a href="https://www.17lands.com/history/events"
               target="_blank" rel="noopener noreferrer">17LandsのEvent History</a>
            にアクセス
          </li>

          <li>表のCopyableにチェックを入れる</li>
          <li>セットを絞り込む(任意)</li>
          <li>Ctrl+A Ctrl+Cで全体をコピーする</li>
          <li>下のフォームに貼り付ける</li>
        </ol>
      </div>

      <hr/>

      <p>
        通算 {result.totalGames}ドラフト {result.totalWins}勝 {result.totalLoses}負
      </p>
      <ul>
        <li>{(result.profitGems).toLocaleString("ja-JP", {maximumFractionDigits: 0})}ジェム
          + {result.profitPacks.toLocaleString("ja-JP", {maximumFractionDigits: 0})}パック
          = {(result.profitGems + result.profitPacks * result.gemsPerPack).toLocaleString("ja-JP", {maximumFractionDigits: 0})}ジェム</li>
        <li>{(result.profitGems / result.gemsPerDollar).toLocaleString("ja-JP", {maximumFractionDigits: 2})}ドル
          ({((result.profitGems + result.profitPacks * result.gemsPerPack) / result.gemsPerDollar).toLocaleString("ja-JP", {maximumFractionDigits: 2})}ドル)</li>
        <li>{(result.profitGems / result.gemsPerDollar * result.dollarPerYen).toLocaleString("ja-JP", {maximumFractionDigits: 0})}円
          ({((result.profitGems + result.profitPacks * result.gemsPerPack) / result.gemsPerDollar * result.dollarPerYen).toLocaleString("ja-JP", {maximumFractionDigits: 0})}円)
        </li>
      </ul>

      <p>
        1ドラフトあたり
      </p>
      <ul>
        <li>{(result.profitGems / result.totalGames).toFixed(0)}ジェム
          ({((result.profitGems + result.profitPacks * result.gemsPerPack) / result.totalGames).toFixed(0)}ジェム)</li>
        <li>{(result.profitGems / result.totalGames / result.gemsPerDollar).toFixed(2)}ドル
          ({((result.profitGems + result.profitPacks * result.gemsPerPack) / result.totalGames / result.gemsPerDollar).toFixed(2)}ドル)</li>
        <li>{(result.profitGems / result.totalGames / result.gemsPerDollar * result.dollarPerYen).toFixed(0)}円
          ({((result.profitGems + result.profitPacks * result.gemsPerPack) / result.totalGames / result.gemsPerDollar * result.dollarPerYen).toFixed(0)}円)</li>
      </ul>

      <p>
        <small>
          * (括弧)内は、パック込の値<br/>
          * 1ドル = {result.gemsPerDollar}ジェム = {result.dollarPerYen}円<br/>
          * 1パック = {result.gemsPerPack}
        </small>
      </p>

      <Form>
        <Form.Group className="mb-3">
          <Form.Control as="textarea" rows={5} placeholder="17landsからコピーしたものをここにペースト"
                        onChange={e => analyse(e.target.value)}
          />
        </Form.Group>
      </Form>
    </>
  )
}
