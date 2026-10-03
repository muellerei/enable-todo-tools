import { test, expect, mock } from 'claude-code/testing'
import type { TestBody } from 'claude-code/testing'

type TestOn = Parameters<TestBody>[1]

const start = { cwd: '/work', surface: null, isInteractive: false }

// What the test answers beneath the mod: the session starts, and every env.set is recorded.
const beneath = (on: TestOn) => {
  const sets: unknown[] = []
  const seen: unknown[] = []
  on('session.start', async (_, e) => {
    seen.push(e)
    return { cwd: e.cwd }
  })
  on('env.set', async (_, e) => {
    sets.push(e)
    return { value: undefined } as never
  })
  return { sets, seen }
}

test('session.start: sets the variable when the user has not', async ($, on) => {
  mock.env(on, {})
  const { sets } = beneath(on)

  await $.session.start(start)

  expect(sets).toEqual([{ name: 'CLAUDE_CODE_ENABLE_TODO_TOOLS', value: '1' }])
})

for (const value of ['0', '1', '']) {
  test(`session.start: leaves a value the user set (${JSON.stringify(value)})`, async ($, on) => {
    mock.env(on, { CLAUDE_CODE_ENABLE_TODO_TOOLS: value })
    const { sets } = beneath(on)

    await $.session.start(start)

    expect(sets).toEqual([])
  })
}

test('session.start: passes the event on, so mods beneath still start', async ($, on) => {
  mock.env(on, {})
  const { seen } = beneath(on)

  const result = await $.session.start(start)

  expect(seen).toEqual([start])
  expect(result).toEqual({ cwd: '/work' })
})
