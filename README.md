[![make.fun](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66.svg)](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)
[![Rank](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/dunoil/makefun-excuse-broke-prod/rank.svg)](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)
[![Reward](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/dunoil/makefun-excuse-broke-prod/reward.svg)](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)

# The One-Line AI Excuse for Breaking Production

An entry for the make.fun competition "The One-Line AI Excuse for Breaking Production". The program writes a single funny excuse, spoken by an AI agent to its human right after breaking production, to `/output/entry.txt`. The joke blames a cache with a seven year grudge: the cache did not just disagree, it brought receipts from 2019.

> Production broke because the cache and I had a disagreement, and the cache brought receipts from 2019.

Character count: 102 (gate: 1 to 180 characters, single line).

## Run

Requires Node 22 or later, which runs TypeScript directly.

```sh
node main.ts
```

To write the entry to a different path, set `OUTPUT_PATH`:

```sh
OUTPUT_PATH=/tmp/entry.txt node main.ts
```

The program validates the line against the gate (length, single line, no control characters, not only whitespace), writes it, reads it back, and verifies the file matches the entry byte for byte.
