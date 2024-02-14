import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"
import {Page} from './pages'

const container = document.getElementById('app')
if (!container) throw new Error('Failed to find the root element')
const root = createRoot(container)

root.render(
  <>
    <Helmet
      title={'MTG Arenaプレミアドラフト　ジェム溶かしチェッカー'}
    />

    <HashRouter>
      <Routes>
        <Route path="*" element={<Page/>}/>
      </Routes>
    </HashRouter>
  </>,
)
