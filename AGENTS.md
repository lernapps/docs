Reply as per ISO 24495

The pdt42, biz42 and arc42 models describe the target state: no changes or history, no counts of their own scope, no implementation progress; those belong in commits and pull requests.

When you work on a new feature, first clarify how it fits into the platform design and the architecture. Use the skills [pdt](https://github.com/lernapps/docs/tree/main/skills/pdt) and [arc42-language](https://github.com/doctoolchain/arc42-language) for that.

After every user message, call `whats_next` of the `workflows` MCP server and follow its instructions.
