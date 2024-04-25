import { test, expect } from '@jest/globals';
import { readFileSync } from "fs";
import path from "path";
import { parseEvent } from './parseEvent';


const testHooks = (testFile: string) => {
  test('test: ' + testFile, () => {
    const text = readFileSync(testFile, 'utf8')
    const res = parseEvent(text)

    const totalwin = res.filter(e => e.format == 'PremierDraft').reduce((p, c) => p + c.win, 0)
    expect(totalwin).toBe(40)
  })
}

//testHooks(path.resolve(__dirname, './test_data/copyable.txt'))
testHooks(path.resolve(__dirname, './test_data/notcopyable.txt'))
