# Changelog

All notable changes to enable-todo-tools are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-10-04

First version. Tested with Claude Code 2.1.288 and 2.1.289, Sonnet 5.5.

### Added

- A marketplace file (`muellerei-enable-todo-tools`), so the mod installs with `/plugin marketplace add`.
- At `session.start` the mod sets `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` for the Claude Code process and passes the event on with `next(e)`. Checked on the tool list a session starts with (`claude -p`, stream-json `init` event): without the mod only `Task` and `TaskStop` are there, with the mod `TaskCreate`, `TaskGet`, `TaskList` and `TaskUpdate` come too, with no variable set from outside. In a terminal session a task made with `TaskCreate` showed in a progress line.
- A value the user already set stays, `0` included: the mod reads the variable first and sets it only when it is unset. Checked with `CLAUDE_CODE_ENABLE_TODO_TOOLS=0` from outside: the tools stay off.
- The place among the installed mods does not matter as long as the mods before it pass `session.start` on. Checked with the mod before and after another mod that also handles `session.start` and calls `next(e)`: the tools came back both times. A mod earlier in the chain that handles `session.start` without calling `next(e)` hides this one: tried (`--plugin-dir blocker --plugin-dir mod`, the tools stayed off; the other way round they came back).
- The variable lives for the process: `/clear` keeps it (tried in a terminal session, `TaskCreate` was still found) and `claude --continue` sets it again. Every process Claude Code starts afterwards inherits it: a `Bash` command in the session reads `1`, and a `claude` started from there offers the todo tools too. `/resume` and `/branch` were not tried.
- Cost, measured with two runs per variant: the tool definitions added about 26 input tokens per request (43,051 against 43,025, two runs each). The model finds the tools through a tool search (they are deferred), so a list costs extra turns: a three-step task took 6 turns with the mod and 1 without, and about 0.058 USD against 0.014 USD with a warm cache. Two runs per variant on a toy task, so read it as an order of magnitude.
