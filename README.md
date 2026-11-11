# Kusina — Filipino recipe companion

A chatbot that teaches Filipino cooking. 45 recipes, each transcribed from a
published source and each rebuilt three ways, with everything on the card
adjustable: difficulty, servings, diet, allergies, and how the instructions
are delivered.

Runs entirely in the browser. No API key, no backend, no network calls.

## Running it

```
open open-locally.html          # or just double-click it
```

`open-locally.html` is generated — if you change `index.html`, regenerate with:

```
node make-local.js
```

`index.html` is written as body content only (no `<!doctype>`, `<head>` or
`<body>` tags) so it can be published directly as a hosted artifact. The
generator wraps it for local use.

## Files

| File | What it holds |
|---|---|
| `index.html` | Markup: the shell, the chat column, the recipe panel, three dialogs |
| `styles.css` | Design tokens and all styling, light and dark |
| `recipes.js` | The 45 recipes — the only file you need to touch to add a dish |
| `icons.js` | ~60 single-stroke SVG food and interface icons |
| `app.js` | Intent matching, scaling, modifications, cooking class, progress |
| `make-local.js` | Wraps `index.html` into a standalone page |

## What it does

**Three real difficulties.** Every recipe has `easy`, `core` (intermediate) and
`complex` tiers. These are not three labels on one method — each tier has its
own step list, and tiers add, drop or replace ingredients. Easy adobo is a
one-pot braise with no marinating; complex adobo dry-brines overnight, builds a
garlic confit, and reduces the sauce separately. 975 steps are written across
the 45 recipes.

**Scaling that reaches the method text.** Change the serving count and every
quantity recalculates — including amounts written into the instructions, so
"Heat 3 tbsp oil" becomes "Heat 6 tbsp oil" when you double it. Steps whose
amounts are per-item rather than per-batch are marked `noscale` and left alone.
Frying oil and water-to-cover are marked `fixed` and never scale.

**Pantry matching.** List what you have and all 45 recipes are ranked by the
share of their key ingredients you can already cover, with the gaps named.
Tagalog ingredient names are understood (`toyo`, `bawang`, `gata`, `baboy`).
A bare comma-separated list is recognised as a pantry list without any
preamble.

**Allergies, vegan, healthier.** Eight allergens (gluten/celiac, dairy, egg,
shellfish, fish, peanut, soy, sesame) plus vegan and healthier modes. Every
affected ingredient is flagged inline with a *named* replacement, not a generic
warning. Where a dish has no honest version — leche flan without eggs — it says
so instead of inventing one.

**Four instruction formats.** Text only, audio (Web Speech API), pictures (each
step carries a written visual cue describing what the pan should look like), or
all three.

**Cooking class.** One step at a time, with a countdown timer on timed steps,
spoken instructions if audio is on, and a log of every meal, snack and dessert
finished — with badges, kept in `localStorage`.

## Nutrition figures

Per-serving figures come from each recipe's published source. Four of the
Panlasang Pinoy / Foxy Folksy sources had figures that were plainly wrong —
frying-oil totals counted as if fully absorbed, a whole-batch protein number
labelled per-serving, a quarter chicken listed at 1 g protein. Those are
recalculated and the discrepancy is stated on the card.

**Not every source publishes the same fields.** The two FNRI booklets give
energy, protein and **iron** but neither fat nor carbohydrate. The nutrition
panel is built from whatever the source actually reported, so those recipes
show three tiles instead of five. A blank is honest; an invented number is not.

Iron is reported exactly as published and is *not* shifted by the difficulty
or diet modifiers — those move fat and calories predictably, but they do not
move iron predictably. Ask for "iron-rich recipes" to rank the 21 dishes that
carry an iron figure.

When a difficulty tier or a diet modifier is active, the remaining figures are
shifted by rough factors and the card labels them an **adjusted estimate**.

## Design system

**Frosted kitchen glass.** Glassmorphism grounded in the subject rather than
in a stock gradient.

The palette is **warm orange / cream / forest green** — classic everyday home
cooking. The ground is the given cream `#ECE4DC`, the glass is white over it
(reading as lit porcelain), and the backdrop light fields are warm orange,
terracotta, butter and a kelly-green wash through the centre so the "touch of
freshness" actually shows rather than hiding behind a panel. The decorative
food icons sit *on* that backdrop, so every panel's `backdrop-filter` has real
content to refract. A faint SVG grain stops the gradients banding under blur.

Blur is applied to major surfaces only — the bar, message bubbles, recipe
sections, dialogs, the composer. Chips and small controls are translucent
without blur, so layers never stack into mush. Rule of thumb: **every piece of
text sits on a glass plate**, never directly on the backdrop.

| Token | Light | Dark | Means |
|---|---|---|---|
| `--orange-fill` | `#FFA400` | `#FFA400` | primary fills: send, primary button, selected difficulty |
| `--orange` | `#9E4409` | `#FFA400` | the same hue at **text** weight |
| `--on-orange` | `#2B1B05` | `#2B1B05` | ink on an orange fill |
| `--green` / `--green-fill` | `#1E5515` | `#7FD36C` | anything switched on: vegan, in-pantry, your voice |
| `--on-green` | `#FFFFFF` | `#122009` | ink on a green fill |
| `--tomato` | `#A32B14` | `#FF8A6E` | allergens, substitutions, destructive |
| `--bg` | `#ECE4DC` | `#1B140C` | the ground |

Two notes on how the given palette was applied:

**`#FFA400` is a fill colour, not a text colour.** On a light ground it reaches
only **1.96:1** — far under the 4.5:1 floor — so using it for labels would have
made them unreadable. The fill keeps the given orange exactly; text weight uses
the terracotta alternative (`#9E4409`, 5.7:1). On the dark ground the given
orange clears 8.6:1 on its own, so there the fill and the ink are the same
value. Filled orange buttons take **dark** ink, since white on `#FFA400` fails
too.

**A third signal colour was unavoidable.** Allergen warnings must not read as
the primary action, so brick tomato carries them — chosen to stay inside the
same kitchen family rather than introduce a foreign hue.

**Type:** `ui-rounded` (SF Pro Rounded on Apple) for headings and UI — soft and
appetising, and it pairs naturally with glass — a neutral system sans for
instruction prose, and monospace retained for measurements, where tabular
numerals genuinely help a cook scanning a column.

### Minimum font size: 12px

Every size derives from a scale whose floor is 12px:

```
--fs-micro 12  labels, badges, flags, meta   (the floor)
--fs-small 13  chips, toggles, buttons
--fs-note  14  secondary prose, notes
--fs-body  15  instruction prose
--fs-lead  16  blurbs
--fs-title 17  result names, dialog headings
--fs-hero  30  dish name
```

This is verified rather than assumed: a headless Chrome pass walks every
rendered element across the chat, an open recipe, the pantry and progress
dialogs and the cooking class — with all diet and allergen toggles on — reads
`getComputedStyle().fontSize` for the element *and* its `::before`/`::after`
content, and reports anything under 12px. Current result: **0 violations**. The
same probe reports 37 at a 16px threshold, which is how we know it is actually
looking.

Contrast is checked the same way, compositing every translucent ancestor down
onto the page colour before computing the ratio. All text and filled controls
clear **4.5:1 in both themes**.

## Adding a recipe

Append an object to `window.RECIPES` in `recipes.js`. The schema is documented
in the file header. Every ingredient can carry `al` (allergens), `an` (animal
origin) and `sub` (named replacements keyed by modifier); every step carries an
icon key, an optional duration, and a `look` cue used by Pictures mode.

## Sources

| Source | Recipes | Notes |
|---|---|---|
| [Panlasang Pinoy](https://panlasangpinoy.com) and [Foxy Folksy](https://www.foxyfolksy.com) | 24 | The classic repertoire — adobo, sinigang, kare-kare, leche flan |
| [FNRI-DOST / IIRR / DepEd, *Iron Rich Recipes* (2017)](https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf) | 15 | School-feeding dishes built around monggo, liver, dilis and malunggay |
| [FNRI-DOST, *Healthy Recipes for PWUDs* (2019)](https://ddb.gov.ph/wp-content/uploads/2023/01/healthy_recipes_for_PWUDs-min.pdf) | 6 | A selection, chiefly breakfast — see the note below |

Each recipe card links to the exact document it came from.

### A note on the DDB / FNRI booklet

*Healthy Recipes for PWUDs* carries an explicit notice: **"All rights reserved.
No part of this publication may be reproduced, stored in a retrieval system or
transmitted in any form... without prior permission of the copyright owner"**
(© 2019, Registration No. A2019-1069).

Ingredient quantities and functional procedure are facts rather than protected
expression, but the selection and arrangement of its 117 recipes is a
compilation, and that notice states the publisher's wishes plainly. So this
project takes a **small selection** rather than the booklet, writes every
blurb, step rewrite and difficulty variant itself, and links back to the
source. If you intend to redistribute this app publicly, that notice is worth
your own look.

That booklet also interleaves its spreads — a recipe's title and nutrition sit
on one page while its ingredient table sits on the next. Each of the six was
paired by cross-checking the serving description against the table contents
(for example, "2 pcs loaf bread + 6 Tbsp spread" against a tuna-egg-mayonnaise
table) before being transcribed.

The difficulty variants, substitutions, scaling and pantry logic across all 45
recipes are this project's own work.
