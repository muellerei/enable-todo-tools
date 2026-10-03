# enable-todo-tools

Switches Claude Code's todo tools on for the models that have them left out.

Since Claude Code 2.1.268 the todo tools (`TaskCreate`, `TaskUpdate`, `TaskGet`, `TaskList`) are offered by default only on Claude 3.x, Opus 4 to 4.7, Sonnet 4 to 4.6 and Haiku 4.5. On newer models (for example Sonnet 5.5) they are left out, because those models keep track of multi-step work without a written checklist ([Task tool availability](https://code.claude.com/docs/en/tools-reference#task-tool-availability)). Anything that reads Claude's todo list, such as a progress line, then has nothing to show.

This mod was made for [task-line](https://github.com/muellerei/task-line), a progress line above the prompt that shows the todo lists Claude keeps. task-line only reads lists and creates none, so on a newer model its line stays empty until Claude keeps a list. enable-todo-tools is the separate, opt-in way to get the lists back. Each works alone: this mod changes nothing about what is drawn, and task-line works without it on every model that has the todo tools.

## Requirements

- Claude Code 2.1.287 or later (mods). Tested with 2.1.288 and 2.1.289.
- The variable it sets needs Claude Code 2.1.233 or later.

## What it does

At the start of a session it sets `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` for the Claude Code process, if the variable is not set yet. Claude Code then offers the todo tools on every model. That is all: no tool of its own, no text in the prompt, no files, no network.

- A value you set yourself stays, `0` included. Set `CLAUDE_CODE_ENABLE_TODO_TOOLS=0` to keep the tools off while the mod is installed.
- With `CLAUDE_CODE_ENABLE_TASKS=0` Claude Code offers `TodoWrite` and not `TaskCreate`, `TaskGet`, `TaskList` and `TaskUpdate`. The mod sets its variable all the same (measured on the tool list of a `claude -p` run, Claude Code 2.1.289).
- The variable is set once per process. `/clear` keeps it (tried in a terminal session), `claude --continue` and plain `claude -p` runs get it too (tried). `/resume` and `/branch` were not tried.
- Every process Claude Code starts afterwards inherits the variable: a `Bash` command in the session reads `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` (tried), and so does a `claude` started from it, which then offers the todo tools too. Set `CLAUDE_CODE_ENABLE_TODO_TOOLS=0` for such a process if you do not want that.

## Install

```
/plugin marketplace add muellerei/enable-todo-tools
/plugin install enable-todo-tools@muellerei-enable-todo-tools
/reload-plugins
```

Or from a shell: `claude plugin marketplace add muellerei/enable-todo-tools`, then `claude plugin install enable-todo-tools@muellerei-enable-todo-tools`.

To try it from a clone without installing:

```bash
claude --plugin-dir /path/to/enable-todo-tools
```

To load it in every session, add the folder to `CLAUDE_CODE_PLUGIN_DIRS` in the `env` of your `~/.claude/settings.json` (folders separated by `:`), then run `/reload-plugins`.

## Check it

Start a session on a newer model and ask Claude to "make a todo list with three tasks". With the mod it creates the list. Without it, it answers that it has no todo tool.

## Should you turn it on?

Claude Code leaves the todo tools out on newer models on purpose: "On newer models, Claude keeps track of multi-step work without a written checklist, and the tools' definitions and reminders take up context." (Claude Code's documentation, [Task tool availability](https://code.claude.com/docs/en/tools-reference#task-tool-availability), as of Claude Code 2.1.288). This mod undoes that choice, so it is worth it when you want what the tools give:

- **A list that something can show.** A display such as [task-line](https://github.com/muellerei/task-line) reads the list Claude keeps. Without the tools, "Claude adds nothing to the task list while it works" (same page), and there is nothing to read.
- **The shared task list of agent teams.** Without the Task tools, an agent "coordinates with its team through messages instead of the shared task list" (same page).

A model that does not need a list works without one, so nothing breaks if you leave the mod out.

Good to know: some skills and plugins assume the todo tools exist and have nothing to call without them. [One report](https://github.com/obra/superpowers/issues/2177) names four such skills of a single plugin.

## Cost

The tools are on offer, not forced. A model that keeps a list makes a call for every change, and each call is another turn that reads the whole context again. That is the reason Claude Code leaves the tools out on newer models. Measured with two runs per variant (Claude Code 2.1.288, Sonnet 5.5): the tool definitions themselves added about 26 input tokens per request, the rest was not split: the extra turns of a list for a three-step task, and the reminders about the list that Claude Code adds while the tools are on, were not measured apart.

## Order of mods

The hook runs in `session.start` and passes the event on with `next(e)`. A mod that does the same can sit before or after it: tried both ways, the tools came back both times. A mod that handles `session.start` and does not call `next(e)` hides this one when it is loaded first: tried, the tools stayed off, and with this mod first they came back. Put this mod before such a mod, for example first in `CLAUDE_CODE_PLUGIN_DIRS`.

## Support

Report problems and ideas as issues at https://github.com/muellerei/enable-todo-tools/issues. Say which Claude Code version, model and surface (terminal, desktop app) you use, and whether `CLAUDE_CODE_ENABLE_TODO_TOOLS` is set in your environment.

## Develop

```bash
claude plugin validate --strict .
claude plugin test .
claude --plugin-dir .          # lays the engine's types into .claude-plugin/types for the editor and tsc
npx -p typescript@5 tsc -p .
npx prettier@3 --check hooks
```

## License

MIT, see [LICENSE](LICENSE).
