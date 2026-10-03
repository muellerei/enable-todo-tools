import type { Register } from 'claude-code'

// Claude Code leaves the todo tools out on newer models unless this variable is set. A value the user already set, even 0, stays.
export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    if ((await $.env.get('CLAUDE_CODE_ENABLE_TODO_TOOLS')) === undefined) await $.env.set('CLAUDE_CODE_ENABLE_TODO_TOOLS', '1')
    return next(e)
  })
}
