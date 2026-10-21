# Chapter 9: Capabilities

## Communication in plain language

Telling what lernapps.net is and is not, in plain German (ISO 24495-1), so that it explains itself: on the home page, on every app page, and right where a thank-you is asked for.

```biz42
:::capability
id: cap-communication
title: Communication in plain language
status: exists
enables: prod-home, prod-apps
owner: owner-platform
:::
```

## Listing and checking entries

Turning a few fields into a listing: one entry per app, checked against a schema that encodes the conditions for listing, published automatically (lernapps/apps).

```biz42
:::capability
id: cap-listing
title: Listing apps from a few fields, checked against a schema
status: exists
enables: prod-apps
owner: owner-platform
:::
```

## Serving listed apps

Publishing a copy of every listed app's built bundle under lernapps.net, updating it when the creator releases a new version, and removing it when the app is delisted (pdt42 KD-21, lernapps/apps#58).

```biz42
:::capability
id: cap-hosting
title: Serving a copy of every listed app under lernapps.net
status: planned
enables: prod-apps
owner: owner-platform
:::
```

## Receiving thanks and feedback

Receiving thanks and structured feedback, counting them, and passing thanks on to creators. For now by prepared e-mail; later one click, counted openly as a total.

```biz42
:::capability
id: cap-thanks
title: Receiving, counting and passing on thanks and feedback
status: exists
enables: prod-apps
owner: owner-platform
:::
```

## Checking fitness for use

Checking what an app does, so that "no requests to third parties before a click" and "accesses only its own data in the browser" are verified rather than declared: an agent clicks through the app while the network is recorded, and reviews the source code (lernapps/tooling#1).

```biz42
:::capability
id: cap-fitness-check
title: Agent-based check of what an app loads and sends
status: planned
enables: prod-apps
owner: owner-platform
:::
```

## Guidance for AI assistants

Guidance and a starting point that creators' AI assistants can follow: how to build an app that runs in the browser, needs no account, collects nothing, and can be listed (lernapps/tooling, lernapps/app-template).

```biz42
:::capability
id: cap-guidance
title: Guidance and templates for creators' AI assistants
status: planned
enables: prod-guidance
owner: owner-platform
:::
```
