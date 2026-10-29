Reply as per ISO 24495

The pdt42, biz42 and arc42 models describe the target state: no changes or history, no counts of their own scope, no implementation progress; those belong in commits and pull requests.

When you work on a new feature, first clarify how it fits into the platform design and the architecture. Use the skills [pdt](https://github.com/lernapps/docs/tree/main/skills/pdt) and [arc42-language](https://github.com/doctoolchain/arc42-language) for that.

After every user message, call `whats_next` of the `workflows` MCP server and follow its `instructions`. Keep the session state in the returned `plan_file_path`: read it at the start of each phase and update it as directed.

If a message is ambiguous, ask before calling `whats_next`. Then state assumptions and tradeoffs, and say if a simpler approach exists.

Do only what the current phase requires; do not work ahead. Check the phase success criteria before calling `proceed_to_phase`.

Do not use your own task management tools; the plan file is the record.
