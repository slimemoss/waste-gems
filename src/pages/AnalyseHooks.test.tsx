import { useAnalyse } from "./AnalyseHooks"
import { test, expect } from '@jest/globals';
import { act, renderHook } from "@testing-library/react";
import { readFileSync } from "fs";
import path from "path";


test('test from copyable', () => {
  const { result } = renderHook(() => useAnalyse())
  expect(result.current[0].totalWins).toBe(0)

  const str = readFileSync(path.resolve(__dirname, './test_data/copyable.txt'), 'utf8')
  act(() => {
    result.current[1](str)
  })

  expect(result.current[0].totalWins).toBe(40)
})
