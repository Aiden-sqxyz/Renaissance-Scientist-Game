# Renaissance Scientist: Survival Against the Odds

A fully playable, browser-local historical survival game set in Italy, approximately 1587–1633. Version 1 preserves the finalized six-decision specification. Each chapter has exactly three choices, four bounded statistics, independent random events, educational notes, and one of five mutually exclusive endings.

## Status

Saved prototype, not publicly published. Publication requires the user's approval. No GitHub, Lovable, paid APIs, external images, network fonts, analytics, accounts, or databases are used.

## Run and build

The app has no third-party runtime or build dependencies. Node.js is needed only for development and tests.

```sh
npm test
npm run simulate
npm run build
```

Open `dist/index.html` in a modern browser, or serve the `dist` directory. The generated page contains everything needed to play. Source modules remain separate for editing. In the ChatGPT managed environment, use `sites-preview start` with this checkout's absolute path.

`build.mjs` also writes a response-only inline preview fragment to `/workspace/renaissance-scientist-preview.html`. Its only difference is the surrounding viewport minimum-height rule; gameplay and content are identical.

## Files

- `src/engine.js`: pure game rules, transitions, chance resolution, ending classification, and save validation.
- `src/content.js`: fictional scenes, choices, responsive narrative, random incidents, and final reflections.
- `src/history.js`: historical insights, optional notes, and attributed sources.
- `src/art.js`: original SVG drawings and icons.
- `src/style.css`: responsive manuscript-inspired visual design.
- `src/app.js`: accessible interface, navigation, local browser saving, and dialogs.
- `tests/engine.test.mjs`: numerical, boundary, state, ending, save, and content checks.
- `tests/model.mjs`: exact enumeration and seeded Monte Carlo modeling.
- `tests/model-results.json`: full reproducible results, including ending distributions and seeds.

## Rule interpretation

Stats start at Money 3, Research 0, Reputation 1, and Safety 3. Stats are capped after the choice and again after the random event. Money or Safety reaching zero ends the career immediately: no later opportunity can rescue it. Research or Reputation may reach zero without ending the career.

For each surviving decision, event probabilities are 60% none, 25% setback, and 15% opportunity. Event stats are selected uniformly, including at their bounds. A capped or floored event still occurs and is explained; it is not redrawn.

After the sixth decision and its event, surviving careers with Research and Reputation at least 4 receive one recognition check: 15% at Reputation 4 and 25% at Reputation 5. Random outcomes are resolved at selection, saved, and never rerolled by rendering or reloading.

## Validation

- Eight automated test groups pass.
- 61,513 reachable probabilistic branches checked against the runtime resolver.
- All 1,296 bounded stat combinations checked for both recognition outcomes.
- All 729 fixed six-choice sequences evaluated exactly.
- 600,000 simulated careers (200,000 per policy) compared with exact probabilities.
- Browser QA: complete six-chapter run, early ruin, replay, restart cancellation, saved outcome reload, historical disclosures, source/model dialog, keyboard Escape, and layouts at 320, 390, 768, and 1,024 pixels.
- One mobile overflow and a timeline decoration defect were found and fixed during QA.

| Policy | Simulated full victory | Exact full victory |
| --- | ---: | ---: |
| Uniform random choices | 5.553% | 5.5818% |
| Cautious fixed choices: B, B, C, B, B, B | 8.944% | 9.0161% |
| State-aware optimized choices | 19.6735% | 19.8054% |

The optimized strategy is computed with backward dynamic programming over current statistics, maximizing Exceptional Success. It does not know future random results. Simulation uses independent seeded pseudorandom streams, with seeds recorded in the report. These are modeled game outcomes, not measured ordinary-player or historical success rates. The intended 5–10 minute duration still needs human playtesting.

## Historical and practical limits

The protagonist, offers, random incidents, stats, and probabilities are fictional. Sources are attributed in-game beside the notes and in Sources & Context. The game distinguishes observational questions and competing astronomical models from institutional restrictions. The Star-Gazer is literary inspiration only.

The six moments compress a complicated career into a short game. Seeking approval is a mechanical benefit, not a historical guarantee of protection. Scientific progress at the maximum is discarded as specified, so apparently reasonable choices may add no further points.

Saving uses this browser's local storage when available. It does not synchronize across devices and may be unavailable in private or embedded browsing. All gameplay works without storage, but progress then lasts only while the page remains open. Tests establish game-rule consistency and modeled odds; they do not establish player experience, historical representativeness, or behavior in every browser.
