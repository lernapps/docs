Reply as per ISO 24495

The pdt42, biz42 and arc42 models describe the target state: no changes or history, no counts of their own scope, no implementation progress; those belong in commits and pull requests.

Before you build a feature, that is anything that is not a fix, read the platform design (pdt42) and the architecture (arc42) in this repository and place the request in them: the journey and service it serves, and the building block and interface it changes. If the feature changes what the models say, change them in the same pull request.
