# Contributing to enable-todo-tools

Hey, thanks for stopping by. enable-todo-tools is a tiny helper for people who use Claude: it does one small thing, and I'd like it to stay that way. That is a guide and not a rule, though. What makes it better is good ideas and reports from setups I don't have, and yours are welcome in any shape. None of it has to be polished. Let's make it better together.

## Ways to help, no code needed

- **Does it work on your setup?** Start a session on a newer model (Sonnet 5.5, for example) and ask Claude to "make a todo list with three tasks". With the mod, it creates the list. Let me know the model, whether you're in the terminal or the desktop app, and whether the list came up. A short "works for me" is great. I haven't tried `/resume` and `/branch` yet, so a report from there is especially welcome.
- **Did something go wrong?** An error, odd behaviour, a clash with another mod or with a skill that expects the todo tools: say what you can. A half-filled report is welcome too.
- **Got an idea, even a half-baked one?** "It would be nice if…" is a perfectly good start. Say what you wanted to do and what got in the way, and we'll figure out the rest together.
- **Something unclear?** If the README confused you, that is useful to know: it means the README needs a better sentence.
- **A typo or a clumsy sentence?** Fix it, or just point it out.

Open an [issue](https://github.com/muellerei/enable-todo-tools/issues) or start a [discussion](https://github.com/muellerei/enable-todo-tools/discussions), whichever feels natural. No need to pick the right place, I'll move it if it fits better elsewhere, and no need to ask first. Write in whatever language suits you. The repository is in English, so English is a plus where you can.

## Build and check

You need Claude Code (the version is under Requirements in the README) and Node. From a clone:

```bash
claude plugin validate --strict .
claude plugin test .
claude --plugin-dir . -p "reply with the word ok"   # lays down the types tsc needs, once
npx -p typescript@5 tsc -p .
npx prettier@3 --check hooks
```

The third line is a short call to the model, so you need to be signed in. Stuck on a step? Tell me. I'd rather fix this page than have you struggle.

## What makes a change easy to merge

A few things help a pull request go in smoothly. None of them is a hurdle, and none stands in the way of an idea:

- A test that fails without your change, so we both see it works.
- A line under `[Unreleased]` in `CHANGELOG.md` when behaviour changes (add the heading if it isn't there yet).
- One thought per pull request, with a short subject line in English ("Keep the variable when it is set to 0").

Not sure about any of it? Open the pull request anyway and we'll sort it out together. It doesn't need an issue first, and a change written with an AI tool is welcome too. Please run the checks and read the diff yourself before you send it.

## Things to talk about first

enable-todo-tools does one thing: at the start of a session it sets `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` if you haven't set it yourself. It has no tool of its own, reads and writes no files and makes no network calls. That is on purpose. If you have an idea that would make it do more, tell me first. It doesn't mean the idea is unwelcome. A good idea can change my mind, so open an issue or a discussion and let's talk.

## How we talk

Let's be kind to each other and assume good intent. Questions of any kind are welcome, and so is friendly disagreement. Unkind words, insults and personal attacks have no place here. I'll remove such comments and, if it comes to that, stop the person from writing here.

## What to expect

I read every issue and pull request, and I answer each one, starting with a thank you. I'm one person, so it can take a while. If your change goes in, I'll ask whether you'd like to be named, and then your name goes into its CHANGELOG entry and into the Thank you section below. Contributions are under the MIT license of the repository.

## Thank you

Everyone who helps and would like to be named is listed here. Thank you for helping us make enable-todo-tools better.
