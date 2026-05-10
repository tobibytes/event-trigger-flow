# event-trigger-flow

A tiny interactive visualization of a pub/sub event flow. The left panel is a "client" that emits events; the right panel is a column of "services," each subscribed to its own set of events. Click **emit**, and only the services subscribed to those events log a delivery — pure vanilla JS, no framework.

Lives at [play.tobiolajide.com](https://play.tobiolajide.com) as one of the "play" demos.

## What it shows

The mental model behind event-driven architecture, condensed into a single page:

- **Decoupled producer/consumer** — the client doesn't know who's listening, and services don't care who emitted.
- **Subscriptions are per-service** — each service has its own checklist of events it listens for.
- **A delivery log** — every emit fans out to the matching subscribers; misses don't generate a delivery.

## Run it

It's three static files. Open `index.html`, or serve the folder:

```sh
python -m http.server
```

Then visit http://localhost:8000.

## Stack

Vanilla HTML · CSS · ES2020 JavaScript — no build, no deps
