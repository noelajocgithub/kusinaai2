/* ==================================================================
   Kusina — app logic
   Runs entirely in the browser: no API key, no network, no backend.
   The assistant matches intent against the local recipe database.
   ================================================================== */

(function () {
  'use strict';

  const R = window.RECIPES;
  const ICONS = window.ICONS;
  const STORE = 'kusina.v1';

  /* ---------------------------------------------------------------
     State
     --------------------------------------------------------------- */
  const S = {
    recipeId: null,
    tier: 'core',
    servings: null,
    format: 'text',
    vegan: false,
    lite: false,
    allergens: new Set(),
    pantry: [],
    log: [],
    progress: [],
    klass: null
  };

  const TIERS = ['easy', 'core', 'complex'];
  const TIER_LABEL = { easy: 'Easy', core: 'Intermediate', complex: 'Complex' };
  const TIER_DOTS = { easy: 1, core: 2, complex: 3 };

  const ALLERGENS = {
    gluten: { label: 'Gluten / celiac', icon: 'wheat' },
    dairy: { label: 'Dairy', icon: 'can' },
    egg: { label: 'Egg', icon: 'egg' },
    shellfish: { label: 'Shellfish', icon: 'shrimp' },
    fish: { label: 'Fish', icon: 'fish' },
    peanut: { label: 'Peanut', icon: 'peanut' },
    soy: { label: 'Soy', icon: 'bottle' },
    sesame: { label: 'Sesame', icon: 'shaker' }
  };

  const CATS = {
    breakfast: { label: 'Breakfast & almusal', icon: 'egg' },
    main: { label: 'Main dishes', icon: 'pot' },
    soup: { label: 'Soups & stews', icon: 'bowl' },
    noodle: { label: 'Noodles', icon: 'noodles' },
    veg: { label: 'Vegetables', icon: 'leaf' },
    snack: { label: 'Snacks & merienda', icon: 'skewer' },
    dessert: { label: 'Desserts', icon: 'flan' }
  };

  /* Filipino and common kitchen synonyms, so a pantry list written the
     way people actually talk still matches. */
  const SYN = {
    toyo: 'soy sauce', patis: 'fish sauce', suka: 'vinegar', bawang: 'garlic',
    sibuyas: 'onion', kamatis: 'tomato', baboy: 'pork', manok: 'chicken',
    baka: 'beef', isda: 'fish', hipon: 'shrimp', gata: 'coconut milk',
    niyog: 'coconut', luya: 'ginger', asin: 'salt', asukal: 'sugar',
    kanin: 'rice', bigas: 'rice', talong: 'eggplant', okra: 'okra',
    sitaw: 'string beans', kalabasa: 'squash', ampalaya: 'bitter melon',
    labanos: 'radish', kangkong: 'water spinach', petsay: 'bok choy',
    pechay: 'bok choy', malunggay: 'malunggay', monggo: 'mung beans',
    munggo: 'mung beans', bagoong: 'shrimp paste', alamang: 'shrimp paste',
    sampaloc: 'tamarind', gabi: 'taro', saging: 'banana', langka: 'jackfruit',
    ube: 'purple yam', kamote: 'sweet potato', mantika: 'oil',
    paminta: 'pepper', 'dahon ng laurel': 'bay leaves', laurel: 'bay leaves',
    calamansi: 'calamansi', kalamansi: 'calamansi', bihon: 'rice noodles',
    pancit: 'rice noodles', chicharon: 'pork rinds', liempo: 'pork belly',
    scallions: 'green onions', 'spring onions': 'green onions',
    cilantro: 'coriander', aubergine: 'eggplant', courgette: 'squash',
    'bell pepper': 'bell peppers', 'bok choi': 'bok choy',
    'coconut cream': 'coconut cream', 'soya sauce': 'soy sauce',
    'glass noodles': 'rice noodles', 'rice vermicelli': 'rice noodles',
    'spring roll wrapper': 'lumpia wrapper', 'spring roll wrappers': 'lumpia wrapper',
    'condensed milk': 'condensed milk', 'evap': 'evaporated milk'
  };

  const BADGES = [
    { id: 'first', label: 'First dish', icon: 'check', test: p => p.length >= 1 },
    { id: 'three', label: 'Three dishes', icon: 'check', test: p => p.length >= 3 },
    { id: 'ten', label: 'Ten dishes', icon: 'trophy', test: p => p.length >= 10 },
    { id: 'alltiers', label: 'All three difficulties', icon: 'scale', test: p => TIERS.every(t => p.some(x => x.tier === t)) },
    { id: 'sweet', label: 'Dessert maker', icon: 'flan', test: p => p.some(x => catOf(x.id) === 'dessert') },
    { id: 'merienda', label: 'Merienda host', icon: 'skewer', test: p => p.filter(x => catOf(x.id) === 'snack').length >= 2 },
    { id: 'gulay', label: 'Vegetable cook', icon: 'leaf', test: p => p.some(x => catOf(x.id) === 'veg') },
    { id: 'hard', label: 'Took on a complex recipe', icon: 'flame', test: p => p.some(x => x.tier === 'complex') },
    { id: 'regions', label: 'Cooked across 3 regions', icon: 'book', test: p => new Set(p.map(x => regionOf(x.id))).size >= 3 }
  ];

  /* ---------------------------------------------------------------
     Small helpers
     --------------------------------------------------------------- */
  const $ = s => document.querySelector(s);
  const byId = id => R.find(r => r.id === id);
  const catOf = id => (byId(id) || {}).cat;
  const regionOf = id => (byId(id) || {}).region;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function ico(key, size) {
    const body = ICONS[key] || ICONS.plate;
    const d = size || 18;
    return '<svg width="' + d + '" height="' + d + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true">' + body + '</svg>';
  }

  const FRACS = [
    [0, ''], [1 / 8, '⅛'], [1 / 4, '¼'], [1 / 3, '⅓'], [3 / 8, '⅜'],
    [1 / 2, '½'], [5 / 8, '⅝'], [2 / 3, '⅔'], [3 / 4, '¾'],
    [7 / 8, '⅞'], [1, '+1']
  ];

  function fmtQty(n) {
    if (n === null || n === undefined) return '—';
    if (n >= 10) return String(Math.round(n));
    const whole = Math.floor(n + 1e-9);
    const frac = n - whole;
    let best = FRACS[0], bd = Infinity;
    for (const f of FRACS) { const d = Math.abs(frac - f[0]); if (d < bd) { bd = d; best = f; } }
    if (bd > 0.055) return String(Math.round(n * 100) / 100);
    let w = whole, mark = best[1];
    if (mark === '+1') { w += 1; mark = ''; }
    if (!w && !mark) return '0';
    if (!w) return mark;
    return mark ? w + ' ' + mark : String(w);
  }

  const UNITS = 'lbs?|oz|g|kg|ml|l|cups?|tbsps?|tsps?|tablespoons?|teaspoons?|quarts?|pints?|' +
    'cloves?|thumbs?|bunch(?:es)?|bundles?|stalks?|sprigs?|heads?|packs?|sachets?|cans?|' +
    'pieces?|pcs?|pinch(?:es)?|slices?|sticks?';

  /* ---------------------------------------------------------------
     Scaling quantities written into the method text

     "Heat 3 tbsp oil" has to become "Heat 6 tbsp oil" when the cook
     doubles the recipe, or the steps quietly contradict the ingredient
     list. Only number+unit pairs are touched — minutes, seconds,
     temperatures and plain counts are left alone, and a step marked
     noscale (a per-wrapper or per-glass amount) is skipped entirely.
     --------------------------------------------------------------- */
  const UNI_FRAC = { '½': .5, '¼': .25, '¾': .75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': .125, '⅜': .375, '⅝': .625, '⅞': .875 };
  /* Order matters: "1½" must be tried before the bare "1" alternative,
     or the fraction is left stranded in front of the unit. */
  const NUM_SRC = '(?:\\d+\\s*[½¼¾⅓⅔⅛⅜⅝⅞]|\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d+(?:\\.\\d+)?|[½¼¾⅓⅔⅛⅜⅝⅞])';
  const UNIT_SRC = '(cups?|tbsps?|tsps?|tablespoons?|teaspoons?|lbs?|pounds?|ounces?|oz|' +
    'quarts?|pints?|cloves?|heads?|packs?|sachets?|stalks?|thumbs?|bunch(?:es)?|cans?|sprigs?)';
  const STEP_QTY = new RegExp('(' + NUM_SRC + ')(\\s*(?:–|—|-|to)\\s*(' + NUM_SRC + '))?(\\s*)' + UNIT_SRC, 'gi');

  function parseNum(s) {
    s = String(s).trim();
    if (UNI_FRAC[s] !== undefined) return UNI_FRAC[s];
    const mixed = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (mixed) return +mixed[1] + (+mixed[2] / +mixed[3]);
    const frac = s.match(/^(\d+)\/(\d+)$/);
    if (frac) return +frac[1] / +frac[2];
    const uni = s.match(/^(\d+)\s*([½¼¾⅓⅔⅛⅜⅝⅞])$/);
    if (uni) return +uni[1] + UNI_FRAC[uni[2]];
    const n = parseFloat(s);
    return isNaN(n) ? null : n;
  }

  /* "2 cup" reads wrong; "2 cups" does. Abbreviations never change. */
  const ABBREV = /^(tbsp|tsp|oz|lb|lbs|g|kg|ml)$/i;
  function unitFor(unit, n) {
    if (ABBREV.test(unit)) return unit;
    const plural = unit.endsWith('es') || unit.endsWith('s');
    if (n >= 1.999 && !plural) return unit + (/(ch|sh|s|x)$/i.test(unit) ? 'es' : 's');
    if (n < 1.999 && plural && !/^(bunches)$/i.test(unit)) {
      return unit.replace(/es$/i, '').replace(/s$/i, '');
    }
    return unit;
  }

  function scaleText(t, f) {
    if (f === 1) return t;
    return t.replace(STEP_QTY, function (m, a, rangePart, b, gap, unit) {
      const na = parseNum(a);
      if (na === null) return m;
      const sa = na * f;
      if (b !== undefined && b !== null && b !== '') {
        const nb = parseNum(b);
        if (nb === null) return m;
        const sb = nb * f;
        return fmtQty(sa) + '–' + fmtQty(sb) + (gap || ' ') + unitFor(unit, sb);
      }
      return fmtQty(sa) + (gap || ' ') + unitFor(unit, sa);
    });
  }

  function norm(s) {
    let t = String(s).toLowerCase().trim()
      .replace(/^[\d\s./¼½¾⅓⅔⅛-]+/, '')
      .replace(new RegExp('\\b(' + UNITS + ')\\b', 'g'), ' ')
      .replace(/\b(fresh|frozen|dried|ground|minced|chopped|sliced|crushed|peeled|grated|julienned|trimmed|cubed|quartered|halved|whole|large|small|medium|optional|about|a|an|some|of|the)\b/g, '')
      .replace(/[^a-z\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (SYN[t]) t = SYN[t];
    if (t.endsWith('es') && t.length > 5) { const c = t.slice(0, -2); if (SYN[c]) return SYN[c]; }
    if (t.endsWith('s') && t.length > 4) { const c = t.slice(0, -1); if (SYN[c]) return SYN[c]; }
    return t;
  }

  /* Every ingredient word the book knows about, used to recognise a
     bare list of groceries as a pantry list. */
  const KNOWN_INGREDIENTS = (function () {
    const set = new Set();
    for (const r of R) {
      r.keys.forEach(k => set.add(norm(k)));
      r.ing.forEach(i => set.add(norm(i.n)));
      TIERS.forEach(t => (r.tiers[t].add || []).forEach(i => set.add(norm(i.n))));
    }
    Object.keys(SYN).forEach(k => { set.add(norm(k)); set.add(norm(SYN[k])); });
    set.delete('');
    return [...set];
  })();

  function save() {
    try {
      localStorage.setItem(STORE, JSON.stringify({
        pantry: S.pantry, progress: S.progress,
        prefs: { tier: S.tier, format: S.format, vegan: S.vegan, lite: S.lite, allergens: [...S.allergens] }
      }));
    } catch (e) { /* storage unavailable — the app still works, it just forgets */ }
  }

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(STORE) || '{}');
      S.pantry = d.pantry || [];
      S.progress = d.progress || [];
      const p = d.prefs || {};
      if (TIERS.includes(p.tier)) S.tier = p.tier;
      if (p.format) S.format = p.format;
      S.vegan = !!p.vegan;
      S.lite = !!p.lite;
      S.allergens = new Set(p.allergens || []);
    } catch (e) { /* first run, or blocked storage */ }
  }

  /* ---------------------------------------------------------------
     Recipe assembly: tier, scaling, modifications
     --------------------------------------------------------------- */
  /* Step text as the cook should read it: scaled to their serving
     count, unless the step's amount is per-item rather than per-batch. */
  function stepText(s, r) {
    return s.noscale ? s.t : scaleText(s.t, factor(r));
  }

  function factor(r) {
    const want = S.servings || r.serves;
    return want / r.serves;
  }

  function ingList(r, tier) {
    const t = r.tiers[tier] || {};
    let list = r.ing.map(i => Object.assign({}, i, { _added: false }));
    if (t.drop) list = list.filter(i => !t.drop.includes(i.n));
    if (t.add) list = list.concat(t.add.map(i => Object.assign({}, i, { _added: true })));
    return list;
  }

  /* Which modifications apply to one ingredient, and what they say to do. */
  function ingMods(ing) {
    const out = [];
    const al = ing.al || [];
    for (const a of S.allergens) {
      if (al.includes(a)) {
        out.push({ why: ALLERGENS[a].label, text: (ing.sub && ing.sub[a]) || 'omit' });
      }
    }
    if (S.vegan && ing.an) {
      out.push({ why: 'Vegan', text: (ing.sub && ing.sub.vg) || 'omit' });
    }
    if (S.lite && ing.sub && ing.sub.lite) {
      out.push({ why: 'Healthier', text: ing.sub.lite });
    }
    return out;
  }

  /* Two pantry strings match when they share a whole word, so "rice"
     finds "rice noodles" but "ice" does not find "rice". */
  function looseMatch(a, b) {
    if (!a || !b) return false;
    if (a === b) return true;
    const aw = a.split(' ').filter(w => w.length > 2);
    const bw = b.split(' ').filter(w => w.length > 2);
    return aw.some(w => bw.includes(w));
  }

  function pantryHas(name) {
    if (!S.pantry.length) return false;
    const n = norm(name);
    if (!n) return false;
    return S.pantry.some(p => looseMatch(n, p));
  }

  /* Nutrition. Source figures are per serving at the recipe's own
     serving count; modifiers shift them by documented rough factors. */
  const TIER_CAL = { easy: 0.95, core: 1, complex: 1.08 };

  function nutrition(r, tier) {
    const b = r.nutr;
    const k = TIER_CAL[tier] || 1;
    let cal = b.cal * k, pro = b.pro;
    let fat = b.fat === undefined ? null : b.fat * k;
    let carb = b.carb === undefined ? null : b.carb * k;
    let adjusted = tier !== 'core';
    if (S.vegan) { cal *= 0.85; pro *= 0.6; if (fat !== null) fat *= 0.9; adjusted = true; }
    if (S.lite) { cal *= 0.72; if (fat !== null) fat *= 0.55; if (carb !== null) carb *= 0.9; adjusted = true; }
    return {
      cal: Math.round(cal), pro: Math.round(pro),
      fat: fat === null ? null : Math.round(fat),
      carb: carb === null ? null : Math.round(carb),
      /* iron is reported as published — the diet modifiers shift fat and
         calories predictably, but they do not shift iron predictably */
      iron: b.iron === undefined ? null : b.iron,
      adjusted: adjusted
    };
  }

  /* ---------------------------------------------------------------
     Chat
     --------------------------------------------------------------- */
  const log = () => $('#log');

  function bubble(who, html, extraHtml) {
    const el = document.createElement('div');
    el.className = 'msg msg--' + (who === 'me' ? 'me' : 'bot');
    el.innerHTML =
      '<div class="msg__av">' + ico(who === 'me' ? 'spoon' : 'pot', 11) +
      (who === 'me' ? 'You' : 'Kusina') + '</div>' +
      '<div class="msg__body">' + html + (extraHtml || '') + '</div>';
    log().appendChild(el);
    log().scrollTop = log().scrollHeight;
    return el;
  }

  function chips(list) {
    if (!list || !list.length) return '';
    return '<div class="chips">' + list.map(c =>
      '<button class="chip" type="button" data-say="' + esc(c.say || c.label) + '">' +
      (c.icon ? '<span class="chip__ic">' + ico(c.icon, 14) + '</span>' : '') +
      esc(c.label) + '</button>'
    ).join('') + '</div>';
  }

  function hitList(items) {
    if (!items.length) return '';
    return '<div class="hits">' + items.map(h => {
      const r = h.r || h;
      let score = '';
      if (h.pct !== undefined) {
        const tone = h.pct >= 70 ? 'high' : h.pct >= 40 ? 'mid' : 'low';
        score = '<span class="hit__score" data-tone="' + tone + '">' + h.pct + '% match</span>';
      } else if (h.note) {
        score = '<span class="hit__score">' + esc(h.note) + '</span>';
      } else {
        score = '<span class="hit__score">' + nutrition(r, S.tier).cal + ' kcal</span>';
      }
      return '<button class="hit" type="button" data-open="' + r.id + '" data-cat="' + r.cat + '">' +
        '<span class="hit__ic">' + ico(r.icon, 22) + '</span>' +
        '<span><span class="hit__name">' + esc(r.name) + '</span>' +
        '<span class="hit__sub">' + esc(r.aka) + ' · ' + esc(r.region) + '</span></span>' +
        score + '</button>';
    }).join('') + '</div>';
  }

  /* ---------------------------------------------------------------
     Intent handling
     --------------------------------------------------------------- */
  const START_CHIPS = [
    { label: 'Show me every recipe', icon: 'book' },
    { label: 'What can I cook from my pantry?', icon: 'pantry' },
    { label: 'Something easy for a beginner', icon: 'sprout' },
    { label: 'High-protein dinner', icon: 'beef' },
    { label: 'Filipino desserts', icon: 'flan' },
    { label: 'Make it vegan', icon: 'leaf' },
    { label: "I'm cooking for 10 people", icon: 'people' },
    { label: 'I have celiac disease', icon: 'wheat' },
    { label: 'Start a cooking class', icon: 'class' }
  ];

  function greet() {
    bubble('bot',
      '<p><strong>Kumusta.</strong> I am Kusina, and I know ' + R.length + ' Filipino recipes down to the measurement.</p>' +
      '<p>Everything I show you can be rebuilt on the spot: pick <em>easy</em>, <em>intermediate</em> or <em>complex</em> and the ingredients and method genuinely change. ' +
      'I can scale a dish to any number of eaters, swap it to vegan, strip out an allergen, make it leaner, read the steps aloud, or walk you through it one step at a time and keep score.</p>' +
      '<p>Tell me what you have in your kitchen and I will work backwards from there.</p>',
      chips(START_CHIPS));
  }

  function handle(text) {
    const q = text.toLowerCase().trim();
    if (!q) return;

    /* --- settings that can be set from anywhere in a sentence --- */
    let touched = [];

    const people = q.match(/(?:for|serves?|feed(?:ing)?|party of)\s+(\d{1,3})\s*(?:people|persons|pax|guests|servings?)?/) ||
      q.match(/(\d{1,3})\s*(?:people|persons|pax|guests|servings?)/);
    if (people) {
      const n = Math.max(1, Math.min(60, parseInt(people[1], 10)));
      S.servings = n;
      touched.push('scaled to <strong>' + n + ' ' + (n === 1 ? 'serving' : 'servings') + '</strong>');
    }

    if (/\b(vegan|plant[- ]based|no meat|vegetarian|meatless)\b/.test(q)) { S.vegan = true; touched.push('switched to <strong>vegan</strong>'); }
    if (/\b(not vegan|un-?vegan|drop vegan|remove vegan)\b/.test(q)) { S.vegan = false; }
    if (/\b(healthier|healthy|leaner|lighter|low[- ]fat|cut the fat|less oil)\b/.test(q)) { S.lite = true; touched.push('made it <strong>healthier</strong>'); }

    const allergenHits = [];
    if (/\b(celiac|coeliac|gluten|wheat)\b/.test(q)) allergenHits.push('gluten');
    if (/\b(dairy|lactose|milk allergy|no milk)\b/.test(q)) allergenHits.push('dairy');
    if (/\b(egg|eggs)\b/.test(q) && /\b(allerg|avoid|without|no|free)\b/.test(q)) allergenHits.push('egg');
    if (/\b(shellfish|shrimp|prawn|crab|bagoong)\b/.test(q) && /\b(allerg|avoid|without|no|free)\b/.test(q)) allergenHits.push('shellfish');
    if (/\b(fish|patis|anchov)\b/.test(q) && /\b(allerg|avoid|without|no|free)\b/.test(q)) allergenHits.push('fish');
    if (/\b(peanut|nut)\b/.test(q) && /\b(allerg|avoid|without|no|free)\b/.test(q)) allergenHits.push('peanut');
    if (/\b(soy|soya)\b/.test(q) && /\b(allerg|avoid|without|no|free)\b/.test(q)) allergenHits.push('soy');
    if (/\bsesame\b/.test(q) && /\b(allerg|avoid|without|no|free)\b/.test(q)) allergenHits.push('sesame');
    if (allergenHits.length) {
      allergenHits.forEach(a => S.allergens.add(a));
      touched.push('avoiding <strong>' + allergenHits.map(a => ALLERGENS[a].label.toLowerCase()).join(', ') + '</strong>');
    }

    if (/\b(easy|easiest|beginner|simple|quick|fast|weeknight)\b/.test(q)) { S.tier = 'easy'; touched.push('set to <strong>easy</strong>'); }
    else if (/\b(complex|hard|hardest|advanced|from scratch|restaurant|authentic method|challenge)\b/.test(q)) { S.tier = 'complex'; touched.push('set to <strong>complex</strong>'); }
    else if (/\b(intermediate|normal|standard|classic|as published)\b/.test(q)) { S.tier = 'core'; touched.push('set to <strong>intermediate</strong>'); }

    if (/\b(audio|read.*(aloud|out)|speak|voice|listen|hands[- ]free)\b/.test(q)) { S.format = 'audio'; touched.push('instructions set to <strong>audio</strong>'); }
    else if (/\b(picture|pictures|photo|visual|image|show me what it looks like)\b/.test(q)) { S.format = 'pictures'; touched.push('instructions set to <strong>pictures</strong>'); }
    else if (/\b(text only|just text|plain text|only text)\b/.test(q)) { S.format = 'text'; touched.push('instructions set to <strong>text only</strong>'); }
    else if (/\b(all formats|everything|all of them|text and audio and pictures|give me all)\b/.test(q)) { S.format = 'all'; touched.push('instructions set to <strong>all formats</strong>'); }

    if (touched.length && S.recipeId) {
      render();
      bubble('bot', '<p>Done — I have ' + touched.join(', ') + '. The card has been rewritten.</p>',
        chips([{ label: 'Walk me through it', icon: 'class' }, { label: 'Show the nutrition', icon: 'heart' }]));
      save();
      return;
    }

    /* settings changed but no dish open, and nothing else in the
       sentence to act on — acknowledge and offer somewhere to apply it */
    if (touched.length && !searchRecipes(q).length && !/\b(dessert|snack|soup|noodle|vegetable|main|pantry|fridge|protein|calorie)\b/.test(q)) {
      save();
      const pool = S.vegan
        ? R.filter(r => r.ing.some(i => i.an) === false || ['laing', 'ginisang-monggo', 'pinakbet', 'puto', 'turon', 'ube-halaya', 'halo-halo'].includes(r.id))
        : R;
      bubble('bot', '<p>Noted — I have ' + touched.join(', ') + '. It will apply to whatever you open next.</p>' +
        (S.vegan ? '<p>These take to a vegan rewrite most easily:</p>' : '<p>Pick something to start on:</p>'),
        hitList(pool.slice(0, 6).map(r => ({ r: r, note: TIER_LABEL[S.tier] }))) +
        chips([{ label: 'Show me every recipe', icon: 'book' }, { label: 'What can I cook from my pantry?', icon: 'pantry' }]));
      return;
    }
    save();

    /* --- nutrition for the open dish ---------------------------- */
    if (S.recipeId && /\b(nutrition|macros|nutrients|calorie|calories|protein|how much fat|how many carbs)\b/.test(q) &&
      !/\b(high|low|under|over|at least|more than|less than)\b/.test(q)) {
      const r = byId(S.recipeId);
      const n = nutrition(r, S.tier);
      const servings = S.servings || r.serves;
      bubble('bot', '<p><strong>' + esc(r.name) + '</strong>, ' + TIER_LABEL[S.tier].toLowerCase() + ', per serving: <strong>' +
        n.cal + ' kcal</strong>, ' + n.pro + ' g protein, ' + n.fat + ' g fat, ' + n.carb + ' g carbohydrate.</p>' +
        '<p>Across ' + servings + ' servings that is ' + (n.cal * servings).toLocaleString() + ' kcal and ' + (n.pro * servings) + ' g protein in the pot.</p>' +
        (n.adjusted ? '<p class="hint">Adjusted estimate — the published figure has been shifted for the difficulty tier and your diet settings.</p>'
          : '<p class="hint">Straight from the published source.</p>'),
        chips([{ label: 'Make it healthier', icon: 'heart' }, { label: 'Walk me through it', icon: 'class' }]));
      return;
    }

    /* --- cooking class ------------------------------------------ */
    if (/\b(cooking class|class|teach me|walk me through|guide me|step by step|lesson)\b/.test(q)) {
      if (S.recipeId) { startClass(); return; }
      bubble('bot', '<p>Happy to teach. Pick a dish and I will take you through it one step at a time, with timers on the steps that need them and a tick in your progress log at the end.</p>',
        hitList(R.slice(0, 5).map(r => ({ r: r, note: TIER_LABEL[S.tier] }))) +
        chips([{ label: 'Show me every recipe', icon: 'book' }]));
      return;
    }

    if (/\b(progress|how many have i|my score|track|log|badge|achievement)\b/.test(q)) { openSheet('progress'); return; }

    /* --- pantry ------------------------------------------------- */
    /* A bare comma-separated list of things that are mostly real
       ingredients is a pantry list, even with no "I have" in front. */
    const bareList = extractPantry(text);
    const looksLikeList = bareList.length >= 3 &&
      bareList.filter(x => KNOWN_INGREDIENTS.some(k => looseMatch(k, x))).length / bareList.length >= 0.6;

    const pantryIntent = looksLikeList ||
      /\b(pantry|fridge|refrigerator|i have|ive got|i've got|i got|all i have|left ?over|what can i (make|cook)|in my kitchen)\b/.test(q);
    if (pantryIntent) {
      const items = extractPantry(text);
      if (items.length >= 2) { setPantry(items, true); return; }
      if (S.pantry.length >= 2) { suggestFromPantry(); return; }
      openSheet('pantry');
      bubble('bot', '<p>Write down everything you have in the list I just opened — one item per line, or separated by commas. Tagalog names work too: <em>toyo, bawang, baboy, gata</em>.</p>');
      return;
    }

    /* --- nutrition queries -------------------------------------- */
    /* iron queries — the reason the FNRI booklet is in here at all */
    if (/\b(iron|anemia|anaemic|anemic|iron[- ]rich)\b/.test(q)) {
      const withIron = R.filter(r => r.nutr.iron !== undefined)
        .sort((a, b) => b.nutr.iron - a.nutr.iron);
      bubble('bot', '<p><strong>' + withIron.length + ' recipes</strong> here carry a published iron figure — they come from the FNRI iron-rich booklet and the DOST recovery-diet booklet, both of which were written to address iron deficiency.</p>' +
        '<p>Ranked by iron per serving:</p>',
        hitList(withIron.slice(0, 8).map(r => ({ r: r, note: r.nutr.iron + ' mg iron' }))));
      return;
    }

    const underCal = q.match(/(?:under|below|less than|max|fewer than|at most)\s*(\d{2,4})\s*(?:kcal|calories|cals?)/);
    const overPro = q.match(/(?:at least|over|more than|above|min)\s*(\d{1,3})\s*g?\s*(?:of\s*)?protein/);
    if (underCal || overPro || /\b(high|low)[- ](protein|calorie|cal)\b/.test(q) || /\b(low calorie|high protein|most protein|fewest calories|lightest)\b/.test(q)) {
      let pool = R.map(r => ({ r: r, n: nutrition(r, S.tier) }));
      let desc = [];
      if (underCal) { const lim = +underCal[1]; pool = pool.filter(x => x.n.cal <= lim); desc.push('under ' + lim + ' kcal a serving'); }
      if (overPro) { const lim = +overPro[1]; pool = pool.filter(x => x.n.pro >= lim); desc.push('at least ' + lim + ' g protein a serving'); }
      if (/high[- ]protein|most protein/.test(q) && !overPro) { pool.sort((a, b) => b.n.pro - a.n.pro); desc.push('ranked by protein'); }
      else if (/low[- ](calorie|cal)|fewest calories|lightest/.test(q) && !underCal) { pool.sort((a, b) => a.n.cal - b.n.cal); desc.push('ranked from lightest'); }
      else { pool.sort((a, b) => b.n.pro - a.n.pro); }

      if (!pool.length) {
        bubble('bot', '<p>Nothing in the book clears that bar as written. Turn on <strong>Healthier</strong> and the numbers drop by roughly a third — shall I?</p>',
          chips([{ label: 'Make it healthier', icon: 'heart' }, { label: 'Show me every recipe', icon: 'book' }]));
        return;
      }
      bubble('bot', '<p>Here is what fits — ' + desc.join(', ') + ', at <strong>' + TIER_LABEL[S.tier].toLowerCase() + '</strong> difficulty' +
        (S.vegan || S.lite ? ' with your modifications applied' : '') + '.</p>' +
        '<p class="hint">Figures are per serving, from each published source. Open a dish to see the full breakdown.</p>',
        hitList(pool.slice(0, 6).map(x => ({ r: x.r, note: x.n.cal + ' kcal · ' + x.n.pro + ' g protein' }))));
      return;
    }

    /* --- lookup and browse, most specific signal first ---------- */
    const found = searchRecipes(q);

    /* 1. an unmistakable dish name */
    if (found.length && found[0].score >= 10) { open(found[0].r.id); return; }

    /* 2. a query that is only a region name */
    const bare = q.split(/[^a-z]+/).filter(w => w.length > 2 && !STOP.has(w)).join(' ');
    const REGIONS = ['bicol', 'ilocos', 'pampanga', 'bacolod', 'negros', 'luzon', 'tagalog', 'kapampangan', 'ilonggo'];
    if (REGIONS.includes(bare)) {
      const key = { kapampangan: 'pampanga', ilonggo: 'bacolod' }[bare] || bare;
      const list = R.filter(r => r.region.toLowerCase().includes(key));
      if (list.length) {
        bubble('bot', '<p>From <strong>' + bare.replace(/^./, c => c.toUpperCase()) + '</strong> — ' +
          list.length + ' ' + (list.length === 1 ? 'dish' : 'dishes') + ':</p>', hitList(list.map(r => ({ r: r }))));
        return;
      }
    }

    /* 3. a category word */
    for (const key in CATS) {
      const words = {
        breakfast: /\b(breakfast|almusal|agahan|morning|brunch)\b/,
        main: /\b(main|mains|dinner|lunch|ulam|entree|meat)\b/,
        soup: /\b(soup|soups|sabaw|stew|broth|sour)\b/,
        noodle: /\b(noodle|noodles|pancit|pasta)\b/,
        veg: /\b(vegetable|vegetables|gulay|veggie|veg)\b/,
        snack: /\b(snack|snacks|merienda|street food|appetizer|party)\b/,
        dessert: /\b(dessert|desserts|sweet|sweets|panghimagas|kakanin)\b/
      }[key];
      if (words && words.test(q)) {
        const list = R.filter(r => r.cat === key);
        bubble('bot', '<p><strong>' + CATS[key].label + '</strong> — ' + list.length + ' of them.</p>', hitList(list.map(r => ({ r: r }))));
        return;
      }
    }

    /* 4. one plausible dish */
    if (found.length === 1) { open(found[0].r.id); return; }

    /* 5. several — let them pick */
    if (found.length > 1) {
      bubble('bot', '<p>A few things match that. Which one did you mean?</p>',
        hitList(found.slice(0, 6).map(f => ({ r: f.r }))));
      return;
    }

    if (/\b(all|every|everything|list|browse|show me|what do you (have|know)|menu|index)\b/.test(q)) { listAll(); return; }
    if (/\b(help|how do(es)? (this|you) work|what can you do|instructions)\b/.test(q)) { helpMsg(); return; }
    if (/\b(hi|hello|hey|kumusta|kamusta|magandang)\b/.test(q)) { greet(); return; }

    /* --- fallback ----------------------------------------------- */
    bubble('bot',
      '<p>I did not catch a dish in that. I can look things up by name, by what is in your kitchen, by calories or protein, or by category.</p>',
      chips([
        { label: 'Show me every recipe', icon: 'book' },
        { label: 'What can I cook from my pantry?', icon: 'pantry' },
        { label: 'Filipino desserts', icon: 'flan' },
        { label: 'How does this work?', icon: 'text' }
      ]));
  }

  function helpMsg() {
    bubble('bot',
      '<h4>What I can do</h4>' +
      '<p><strong>Difficulty.</strong> Every recipe exists in three real versions. Easy cuts components and uses stand-ins; intermediate is the published recipe; complex builds the stocks, pastes and coconut milk from scratch. The ingredient list and the steps both change.</p>' +
      '<p><strong>Your pantry.</strong> Write out what you have and I will rank all ' + R.length + ' dishes by how much of each one you can already cover, and tell you what is missing.</p>' +
      '<p><strong>Scaling.</strong> Say how many people are eating and every quantity is recalculated.</p>' +
      '<p><strong>Allergies and diet.</strong> Gluten/celiac, dairy, egg, shellfish, fish, peanut, soy, sesame — I flag each offending ingredient and name a specific replacement. Vegan and Healthier work the same way.</p>' +
      '<p><strong>Instruction format.</strong> Text, spoken aloud, pictures, or all three at once.</p>' +
      '<p><strong>Cooking class.</strong> One step at a time, with timers, and a tally of every meal, snack and dessert you finish.</p>',
      chips(START_CHIPS.slice(0, 6)));
  }

  function listAll() {
    let html = '<p>All <strong>' + R.length + ' recipes</strong>, sourced and measured. Grouped the way a Filipino kitchen thinks about them.</p>';
    for (const key in CATS) {
      const list = R.filter(r => r.cat === key);
      if (!list.length) continue;
      html += '<h4>' + CATS[key].label + '</h4>' + hitList(list.map(r => ({ r: r })));
    }
    bubble('bot', html);
  }

  /* Words that say nothing about which dish is meant. Without this,
     "filipino desserts" scores every recipe whose subtitle starts
     "Filipino …" and never reaches the category branch. */
  const STOP = new Set(['filipino', 'philippine', 'philippines', 'pinoy', 'recipe', 'recipes',
    'dish', 'dishes', 'food', 'meal', 'show', 'give', 'want', 'need', 'make', 'cook', 'cooking',
    'some', 'something', 'anything', 'please', 'the', 'for', 'and', 'with', 'about', 'know',
    'have', 'got', 'like', 'you', 'your', 'how', 'can', 'any', 'get', 'has', 'are', 'what',
    'from', 'region', 'province', 'style', 'area', 'authentic', 'traditional', 'classic']);

  function searchRecipes(q) {
    const out = [];
    const words = q.split(/[^a-z]+/).filter(w => w.length > 2 && !STOP.has(w));
    for (const r of R) {
      let score = 0;
      const name = r.name.toLowerCase(), aka = r.aka.toLowerCase();
      if (q.includes(name)) score += 12;
      if (q.includes(aka)) score += 10;
      for (const w of words) {
        if (name.includes(w)) score += 5;
        if (aka.includes(w)) score += 3;
        if (r.id.includes(w)) score += 4;
        if (r.keys.some(k => k.includes(w))) score += 1;
      }
      if (score > 0) out.push({ r: r, score: score });
    }
    out.sort((a, b) => b.score - a.score);
    return out.filter(x => x.score >= 3);
  }

  /* ---------------------------------------------------------------
     Pantry
     --------------------------------------------------------------- */
  function extractPantry(text) {
    return String(text)
      .replace(/^.*?\b(i have|i've got|ive got|i got|pantry|fridge|refrigerator)\b[:\s]*/i, '')
      .split(/[,;\n•]|\sand\s|\/|\|/)
      .map(norm)
      .filter(x => x && x.length > 1 && !/^(what|can|cook|make|only|just|some|left|over|my|in|the)$/.test(x));
  }

  function setPantry(items, announce) {
    S.pantry = [...new Set(items)];
    save();
    renderPantryTags();
    renderStatus();
    if (announce) suggestFromPantry();
  }

  function pantryScore(r) {
    const keys = r.keys.map(norm).filter(Boolean);
    if (!keys.length) return { pct: 0, have: [], missing: [] };
    const have = [], missing = [];
    for (const k of keys) {
      if (S.pantry.some(p => looseMatch(k, p))) have.push(k); else missing.push(k);
    }
    return { pct: Math.round(have.length / keys.length * 100), have: have, missing: missing };
  }

  function suggestFromPantry() {
    if (!S.pantry.length) {
      bubble('bot', '<p>Your pantry list is empty. Add a few things and I will work out what you can cook.</p>',
        chips([{ label: 'Open my pantry list', icon: 'pantry' }]));
      return;
    }
    const ranked = R.map(r => Object.assign({ r: r }, pantryScore(r))).sort((a, b) => b.pct - a.pct);
    const top = ranked.filter(x => x.pct > 0).slice(0, 6);

    let html = '<p>You listed <strong>' + S.pantry.length + ' ' + (S.pantry.length === 1 ? 'item' : 'items') + '</strong>. ' +
      (top.length ? 'Here is what you are closest to cooking right now.' : 'Nothing lines up yet — try adding a protein, an aromatic and a souring agent.') + '</p>';

    if (top.length) {
      html += hitList(top.map(x => ({ r: x.r, pct: x.pct })));
      const best = top[0];
      if (best.missing.length) {
        html += '<p style="margin-top:12px">For <strong>' + esc(best.r.name) + '</strong> you would still need: <em>' +
          best.missing.slice(0, 6).map(esc).join(', ') + '</em>.</p>';
      } else {
        html += '<p style="margin-top:12px">You have everything for <strong>' + esc(best.r.name) + '</strong>. Start there.</p>';
      }
    }
    bubble('bot', html, chips([
      { label: 'Edit my pantry list', icon: 'pantry' },
      { label: 'Only show easy ones', icon: 'sprout', say: 'easy recipes from my pantry' }
    ]));
  }

  function renderPantryTags() {
    const box = $('#pantryTags');
    if (!box) return;
    box.innerHTML = S.pantry.length
      ? S.pantry.map(p => '<span class="ptag">' + esc(p) +
        '<button type="button" data-rm="' + esc(p) + '" aria-label="Remove ' + esc(p) + '">' + ico('close', 12) + '</button></span>').join('')
      : '<span class="hint">Nothing saved yet.</span>';
    const n = $('#pantryCount');
    if (n) { n.textContent = S.pantry.length; n.hidden = !S.pantry.length; }
  }

  /* ---------------------------------------------------------------
     Recipe panel
     --------------------------------------------------------------- */
  function open(id) {
    const r = byId(id);
    if (!r) return;
    S.recipeId = id;
    S.servings = S.servings || null;
    render();
    $('#panel').dataset.open = '1';
    $('#recipeNav').hidden = false;

    const sc = S.pantry.length ? pantryScore(r) : null;
    let msg = '<p><strong>' + esc(r.name) + '</strong> is open on the right, at <strong>' + TIER_LABEL[S.tier].toLowerCase() +
      '</strong> difficulty for <strong>' + (S.servings || r.serves) + '</strong> ' + ((S.servings || r.serves) === 1 ? 'serving' : 'servings') + '.</p>' +
      '<p>' + esc(r.tiers[S.tier].about) + '</p>';
    if (sc && sc.missing.length && sc.missing.length <= 8) {
      msg += '<p class="hint">From your pantry you are missing: ' + sc.missing.map(esc).join(', ') + '.</p>';
    }
    bubble('bot', msg, chips([
      { label: 'Walk me through it', icon: 'class' },
      { label: 'Read the steps aloud', icon: 'audio' },
      { label: 'Make it vegan', icon: 'leaf' },
      { label: 'Make it healthier', icon: 'heart' },
      { label: 'Try the complex version', icon: 'flame' }
    ]));
  }

  function render() {
    const panel = $('#panel');
    const r = byId(S.recipeId);
    if (!r) {
      panel.innerHTML = emptyPanel();
      return;
    }
    const tier = r.tiers[S.tier];
    const f = factor(r);
    const servings = S.servings || r.serves;
    const n = nutrition(r, S.tier);
    const list = ingList(r, S.tier);

    /* ingredients */
    const ingHtml = list.map(i => {
      const mods = ingMods(i);
      const q = i.q === null ? null : (i.fixed ? i.q : i.q * f);
      const cut = mods.length && mods.every(m => /^omit/i.test(m.text));
      const cls = ['ing'];
      if (i._added) cls.push('ing--added');
      if (mods.length) cls.push('ing--sub');
      if (cut) cls.push('ing--cut');

      let row = '<li class="' + cls.join(' ') + '">' +
        '<span class="ing__q">' + fmtQty(q) + (i.u ? ' ' + esc(i.u) : '') + '</span>' +
        '<span class="ing__n">' + esc(i.n) +
        (i.note ? ', <span class="ing__note">' + esc(i.note) + '</span>' : '') +
        (pantryHas(i.n) ? '<span class="have">have it</span>' : '') +
        (mods.length ? mods.map(m => '<span class="ing__flag">' + esc(m.why) + '</span>').join('') : '');

      if (mods.length) {
        row += mods.map(m => '<span class="ing__sub"><b>' + esc(m.why) + ':</b> ' + esc(m.text) + '</span>').join('');
      }
      return row + '</span></li>';
    }).join('');

    /* steps */
    const showText = S.format === 'text' || S.format === 'all' || S.format === 'audio';
    const showPics = S.format === 'pictures' || S.format === 'all';
    const showAudio = S.format === 'audio' || S.format === 'all';

    const stepsHtml = tier.steps.map((s, idx) => {
      let body = '';
      if (showText || !showPics) body += '<p class="step__t">' + esc(stepText(s, r)) + '</p>';
      if (showPics && s.look) {
        body += '<div class="step__look">' + ico('picture', 16) +
          '<span><b>What it should look like</b>' + esc(s.look) + '</span></div>';
      }
      const row = [];
      if (showAudio) row.push('<button class="minibtn" type="button" data-speak="' + idx + '">' + ico('audio', 13) + 'Listen</button>');
      if (s.min) row.push('<span class="timechip">' + s.min + ' min</span>');
      if (row.length) body += '<div class="step__row">' + row.join('') + '</div>';

      return '<li class="step">' +
        '<span class="step__gutter"><span class="step__ic">' + ico(s.ic, 17) + '</span>' +
        '<span class="step__no">' + String(idx + 1).padStart(2, '0') + '</span></span>' +
        '<span class="step__main">' + body + '</span></li>';
    }).join('');

    const totalCal = n.cal * servings;

    panel.innerHTML =
      '<article class="card" data-cat="' + r.cat + '">' +
      '<div class="card__head">' +
      '<span class="card__ic">' + ico(r.icon, 24) + '</span>' +
      '<div class="card__titles">' +
      '<div class="card__eyebrow">' + esc(CATS[r.cat].label) + ' · ' + esc(r.region) + '</div>' +
      '<h1 class="card__name" data-name="' + esc(r.name) + '">' + esc(r.name) + '</h1>' +
      '<div class="card__aka">' + esc(r.aka) + '</div>' +
      /* the blurb lives inside the header plate so it sits on glass
         rather than on the raw backdrop, where the icons cut it up */
      '<p class="card__blurb">' + esc(r.blurb) + '</p>' +
      '</div>' +
      '<button class="iconbtn panel-close" type="button" id="closePanel" aria-label="Close recipe">' + ico('close', 18) + '</button>' +
      '</div>' +

      /* difficulty */
      '<section class="sect">' +
      '<div class="sect__head">' + ico('scale', 17) + '<h2 class="sect__title">Difficulty</h2>' +
      '<span class="sect__meta">the recipe itself changes</span></div>' +
      '<div class="seals">' + TIERS.map(t =>
        '<button class="seal" type="button" data-tier="' + t + '" aria-pressed="' + (t === S.tier) + '">' +
        '<span class="seal__dots">' + [1, 2, 3].map(i =>
          '<i data-on="' + (i <= TIER_DOTS[t] ? 1 : 0) + '"></i>').join('') + '</span>' +
        '<span class="seal__name">' + TIER_LABEL[t] + '</span>' +
        '<span class="seal__time">' + esc(r.tiers[t].time) + '</span></button>').join('') +
      '</div>' +
      '<p class="tier-about">' + esc(tier.about) + '</p>' +
      '</section>' +

      /* controls */
      '<section class="sect">' +
      '<div class="sect__head">' + ico('whisk', 17) + '<h2 class="sect__title">Adjust</h2></div>' +
      '<div class="controls">' +

      '<div class="ctl"><div class="ctl__label">' + ico('people', 14) + 'How many are eating' +
      '<span class="ctl__val">×' + (Math.round(f * 100) / 100) + ' on the original ' + r.serves + '</span></div>' +
      '<div class="stepper">' +
      '<button type="button" data-serv="-1" aria-label="Fewer servings">−</button>' +
      '<output>' + servings + '</output>' +
      '<button type="button" data-serv="1" aria-label="More servings">+</button>' +
      '</div></div>' +

      '<div class="ctl"><div class="ctl__label">' + ico('text', 14) + 'Instruction format</div>' +
      '<div class="toggles">' +
      [['text', 'Text only', 'text'], ['audio', 'Audio', 'audio'], ['pictures', 'Pictures', 'picture'], ['all', 'All three', 'all']]
        .map(([k, lbl, i]) => '<button class="tog" data-kind="format" type="button" data-format="' + k + '" aria-pressed="' + (S.format === k) + '">' +
          ico(i, 13) + lbl + '</button>').join('') +
      '</div></div>' +

      '<div class="ctl"><div class="ctl__label">' + ico('sprout', 14) + 'Diet</div>' +
      '<div class="toggles">' +
      '<button class="tog" type="button" data-diet="vegan" aria-pressed="' + S.vegan + '">' + ico('leaf', 13) + 'Vegan</button>' +
      '<button class="tog" type="button" data-diet="lite" aria-pressed="' + S.lite + '">' + ico('heart', 13) + 'Healthier</button>' +
      '</div></div>' +

      '<div class="ctl"><div class="ctl__label">' + ico('shaker', 14) + 'Allergies to avoid' +
      (S.allergens.size ? '<span class="ctl__val">' + S.allergens.size + ' active</span>' : '') + '</div>' +
      '<div class="toggles">' +
      Object.keys(ALLERGENS).map(a => '<button class="tog" data-kind="allergen" type="button" data-allergen="' + a + '" aria-pressed="' +
        S.allergens.has(a) + '">' + ico(ALLERGENS[a].icon, 13) + esc(ALLERGENS[a].label) + '</button>').join('') +
      '</div></div>' +

      '</div></section>' +

      /* nutrition */
      '<section class="sect">' +
      '<div class="sect__head">' + ico('heart', 17) + '<h2 class="sect__title">Per serving</h2>' +
      '<span class="sect__meta">' + (n.adjusted ? 'adjusted estimate' : 'as published') + '</span></div>' +
      '<div class="nutr">' + nutrCells(n) + '</div>' +
      '<div class="nutr-total">' + servings + ' servings × ' + n.cal + ' kcal = ' + totalCal.toLocaleString() + ' kcal total · ' +
      (n.pro * servings) + ' g protein total' +
      (n.iron !== null ? ' · ' + Math.round(n.iron * servings * 10) / 10 + ' mg iron total' : '') + '</div>' +
      (n.adjusted
        ? '<div class="note">' + ico('text', 15) + '<span>These numbers start from the published figures and are shifted by rough factors for the difficulty tier and the diet changes — treat them as an estimate, not a lab result.</span></div>'
        : '') +
      (r.nutrNote ? '<div class="note">' + ico('text', 15) + '<span>' + esc(r.nutrNote) + '</span></div>' : '') +
      '</section>' +

      /* ingredients */
      '<section class="sect">' +
      '<div class="sect__head">' + ico('bowl', 17) + '<h2 class="sect__title">Ingredients</h2>' +
      '<span class="sect__meta">' + list.length + ' items · ' + servings + ' servings</span></div>' +
      '<ul class="ings">' + ingHtml + '</ul>' +
      '</section>' +

      /* method */
      '<section class="sect">' +
      '<div class="sect__head">' + ico('pot', 17) + '<h2 class="sect__title">Method</h2>' +
      '<span class="sect__meta">' + tier.steps.length + ' steps · ' + esc(tier.time) + '</span></div>' +
      '<div class="step__row" style="margin:12px 0 0">' +
      '<button class="minibtn" type="button" id="readAll">' + ico('audio', 13) + 'Read every step aloud</button>' +
      '<button class="minibtn" type="button" id="stopRead">' + ico('close', 13) + 'Stop</button>' +
      '<button class="minibtn" type="button" id="startClass">' + ico('class', 13) + 'Cooking class</button>' +
      '</div>' +
      '<ol class="steps">' + stepsHtml + '</ol>' +
      '</section>' +

      '<p class="src">Measurements transcribed from <a href="' + esc(r.src.url) + '" target="_blank" rel="noopener">' +
      esc(r.src.site) + '</a>. Difficulty variants, substitutions and scaling are this app’s own work.</p>' +
      '</article>';
  }

  /* Only the figures the source actually gives. The FNRI booklets publish
     energy, protein and iron but no fat or carbohydrate — showing a blank
     tile is honest, inventing one is not. */
  function nutrCells(n) {
    const cells = [
      ['calories', 'Calories', n.cal, 'kcal'],
      ['protein', 'Protein', n.pro, 'grams'],
      ['fat', 'Fat', n.fat, 'grams'],
      ['carbs', 'Carbs', n.carb, 'grams'],
      ['iron', 'Iron', n.iron, 'mg']
    ].filter(c => c[2] !== null && c[2] !== undefined);
    return cells.map(c =>
      '<div class="nutr__cell" data-key="' + c[0] + '">' +
      '<div class="nutr__k">' + c[1] + '</div>' +
      '<div class="nutr__v">' + c[2] + '</div>' +
      '<div class="nutr__u">' + c[3] + '</div></div>').join('');
  }

  function emptyPanel() {
    return '<div class="panel__empty">' + ico('pot', 54) +
      '<h2>No recipe open yet</h2>' +
      '<p>Ask for a recipe by name, list what is in your fridge, or tell me how many people you are feeding. The full card lands here.</p>' +
      '</div>';
  }

  /* ---------------------------------------------------------------
     Speech
     --------------------------------------------------------------- */
  const canSpeak = 'speechSynthesis' in window;

  function speak(text) {
    if (!canSpeak) {
      bubble('bot', '<p>This browser will not let me speak — no speech synthesis available. The written steps are all there on the card.</p>');
      return;
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.pitch = 1;
    speechSynthesis.speak(u);
  }

  function speakSteps(r, tier) {
    const steps = r.tiers[tier].steps;
    const text = r.name + ', ' + TIER_LABEL[tier] + ' version, for ' + (S.servings || r.serves) + '. ' +
      steps.map((s, i) => 'Step ' + (i + 1) + '. ' + stepText(s, r)).join(' ');
    speak(text);
  }

  /* ---------------------------------------------------------------
     Cooking class
     --------------------------------------------------------------- */
  let tick = null;

  function startClass() {
    const r = byId(S.recipeId);
    if (!r) { bubble('bot', '<p>Open a recipe first and I will teach it to you step by step.</p>'); return; }
    S.klass = { id: r.id, tier: S.tier, i: 0, left: null, running: false };
    openSheet('class');
    renderClass();
  }

  function renderClass() {
    const k = S.klass;
    if (!k) return;
    const r = byId(k.id);
    const steps = r.tiers[k.tier].steps;
    const s = steps[k.i];
    const pct = Math.round(k.i / steps.length * 100);
    const last = k.i === steps.length - 1;

    $('#classTitle').textContent = r.name + ' · ' + TIER_LABEL[k.tier];
    $('#classBar').innerHTML =
      '<div class="meter"><i style="width:' + pct + '%"></i></div>' +
      '<span class="class__count">Step ' + (k.i + 1) + ' of ' + steps.length + '</span>';

    let timerHtml = '';
    if (s.min) {
      const left = k.left === null ? s.min * 60 : k.left;
      const mm = String(Math.floor(left / 60)).padStart(2, '0');
      const ss = String(left % 60).padStart(2, '0');
      timerHtml = '<div class="timer">' +
        '<span class="timer__clock" data-done="' + (left === 0 ? 1 : 0) + '">' + mm + ':' + ss + '</span>' +
        '<span class="timer__lbl">' + (left === 0 ? 'Time is up' : 'this step takes about ' + s.min + ' min') + '</span>' +
        '<button class="minibtn" type="button" id="timerToggle" aria-pressed="' + k.running + '">' +
        ico('timer', 13) + (k.running ? 'Pause' : 'Start timer') + '</button>' +
        '<button class="minibtn" type="button" id="timerReset">' + ico('back', 13) + 'Reset</button>' +
        '</div>';
    }

    $('#classStep').innerHTML =
      '<div class="class__no">Step ' + String(k.i + 1).padStart(2, '0') + '</div>' +
      '<div class="class__ic">' + ico(s.ic, 26) + '</div>' +
      '<p class="class__t">' + esc(stepText(s, r)) + '</p>' +
      (s.look ? '<div class="step__look">' + ico('picture', 16) +
        '<span><b>What it should look like</b>' + esc(s.look) + '</span></div>' : '') +
      timerHtml;

    $('#classFoot').innerHTML =
      '<button class="btn" type="button" id="classPrev"' + (k.i === 0 ? ' disabled' : '') + '>' + ico('back', 14) + 'Back</button>' +
      '<button class="minibtn" type="button" id="classSpeak">' + ico('audio', 13) + 'Read this step</button>' +
      '<button class="btn btn--primary" type="button" id="classNext">' +
      (last ? ico('check', 14) + 'Finish and log it' : 'Next step') + '</button>';

    if (S.format === 'audio' || S.format === 'all') speak(stepText(s, r));
  }

  function classStep(d) {
    const k = S.klass;
    const steps = byId(k.id).tiers[k.tier].steps;
    stopTimer();
    k.left = null;
    if (k.i + d >= steps.length) { finishClass(); return; }
    k.i = Math.max(0, Math.min(steps.length - 1, k.i + d));
    renderClass();
  }

  function stopTimer() {
    if (tick) { clearInterval(tick); tick = null; }
    if (S.klass) S.klass.running = false;
  }

  function toggleTimer() {
    const k = S.klass;
    const s = byId(k.id).tiers[k.tier].steps[k.i];
    if (k.running) { stopTimer(); renderClass(); return; }
    if (k.left === null) k.left = s.min * 60;
    k.running = true;
    tick = setInterval(() => {
      k.left--;
      if (k.left <= 0) {
        k.left = 0;
        stopTimer();
        if (canSpeak) speak('Time is up for step ' + (k.i + 1) + '.');
      }
      renderClass();
    }, 1000);
    renderClass();
  }

  function finishClass() {
    const k = S.klass;
    const r = byId(k.id);
    stopTimer();
    S.progress.push({ id: r.id, tier: k.tier, at: Date.now() });
    save();
    S.klass = null;
    closeSheet('class');
    renderProgressBadge();

    const counts = tally();
    bubble('bot',
      '<p><strong>' + esc(r.name) + '</strong> is logged — ' + TIER_LABEL[k.tier].toLowerCase() + ' version. That is ' +
      counts.total + ' ' + (counts.total === 1 ? 'dish' : 'dishes') + ' cooked: ' +
      counts.meal + ' ' + (counts.meal === 1 ? 'meal' : 'meals') + ', ' +
      counts.snack + ' ' + (counts.snack === 1 ? 'snack' : 'snacks') + ', ' +
      counts.dessert + ' ' + (counts.dessert === 1 ? 'dessert' : 'desserts') + '.</p>' +
      (k.tier !== 'complex'
        ? '<p>When you want to go further, the ' + (k.tier === 'easy' ? 'intermediate' : 'complex') + ' version of this same dish is a real step up, not just more words.</p>'
        : '<p>That was the complex version. Not much left to teach you on this one.</p>'),
      chips([
        { label: 'See my progress', icon: 'trophy' },
        { label: 'Cook something else', icon: 'book', say: 'show me every recipe' }
      ]));
  }

  function tally() {
    const t = { meal: 0, snack: 0, dessert: 0, total: S.progress.length };
    for (const p of S.progress) {
      const c = catOf(p.id);
      if (c === 'dessert') t.dessert++;
      else if (c === 'snack') t.snack++;
      else t.meal++;
    }
    return t;
  }

  function renderProgress() {
    const t = tally();
    const uniq = new Set(S.progress.map(p => p.id));
    const goals = { meal: 14, snack: 4, dessert: 3 };

    $('#progBody').innerHTML =
      '<div class="prog-grid">' +
      [['meal', 'Meals cooked'], ['snack', 'Snacks cooked'], ['dessert', 'Desserts cooked']].map(([k, lbl]) =>
        '<div class="prog-tile" data-k="' + k + '">' +
        '<div class="prog-tile__v">' + t[k] + '</div>' +
        '<div class="prog-tile__k">' + lbl + '</div>' +
        '<div class="meter"><i style="width:' + Math.min(100, Math.round(t[k] / goals[k] * 100)) + '%"></i></div>' +
        '</div>').join('') +
      '</div>' +

      '<p class="hint" style="margin-top:16px">' + uniq.size + ' of ' + R.length + ' recipes attempted' +
      (S.progress.length > uniq.size ? ' · ' + (S.progress.length - uniq.size) + ' repeats' : '') + '.</p>' +

      '<h4 class="subhead">Badges</h4>' +
      '<div class="badges">' + BADGES.map(b => {
        const got = b.test(S.progress);
        return '<span class="badge" data-locked="' + (got ? 0 : 1) + '">' + ico(got ? b.icon : 'timer', 13) + esc(b.label) + '</span>';
      }).join('') + '</div>' +

      (S.progress.length
        ? '<h4 class="subhead">Everything you have cooked</h4>' +
        '<ul class="done-list">' + S.progress.slice().reverse().map(p => {
          const r = byId(p.id);
          if (!r) return '';
          const d = new Date(p.at);
          return '<li class="done-row">' + ico('check', 16) +
            '<span>' + esc(r.name) + '</span>' +
            '<span class="done-row__tier">' + TIER_LABEL[p.tier] + '</span>' +
            '<span class="done-row__when">' + d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + '</span></li>';
        }).join('') + '</ul>'
        : '<p class="hint" style="margin-top:20px">Nothing logged yet. Open a recipe and run the cooking class — finishing it records the dish here.</p>');
  }

  function renderProgressBadge() {
    const n = $('#progCount');
    if (n) { n.textContent = S.progress.length; n.hidden = !S.progress.length; }
    renderStatus();
  }

  /* status bar readout — the console reporting its own state */
  function renderStatus() {
    const el = $('#status');
    if (!el) return;
    el.textContent = R.length + ' recipes \u00b7 ' + S.pantry.length + ' in pantry \u00b7 ' + S.progress.length + ' cooked';
  }

  /* ---------------------------------------------------------------
     Sheets
     --------------------------------------------------------------- */
  function openSheet(which) {
    const el = $('#' + which + 'Sheet');
    if (!el) return;
    if (which === 'progress') renderProgress();
    if (which === 'pantry') {
      $('#pantryText').value = S.pantry.join('\n');
      renderPantryTags();
    }
    el.hidden = false;
    /* Move focus into the dialog, but onto the panel rather than the
       close button — landing on "close" reads as "we want you to leave". */
    const ta = el.querySelector('textarea');
    if (ta) { ta.focus(); return; }
    const card = el.querySelector('.sheet__card');
    if (card) { card.setAttribute('tabindex', '-1'); card.focus(); }
  }

  function closeSheet(which) {
    const el = $('#' + which + 'Sheet');
    if (el) el.hidden = true;
    if (which === 'class') { stopTimer(); if (canSpeak) speechSynthesis.cancel(); }
  }

  /* ---------------------------------------------------------------
     Decorative icon field
     --------------------------------------------------------------- */
  function drawField() {
    const pool = ['garlic', 'chili', 'leaf', 'coconut', 'rice', 'eggplant', 'onion', 'tomato',
      'ginger', 'citrus', 'fish', 'shrimp', 'egg', 'peanut', 'mushroom', 'noodles',
      'bowl', 'pot', 'flan', 'ice', 'skewer', 'mortar', 'can', 'bottle', 'sprout', 'tofu'];
    let seed = 20261110;
    const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    let html = '';
    for (let i = 0; i < 34; i++) {
      const k = pool[Math.floor(rnd() * pool.length)];
      const size = 26 + Math.floor(rnd() * 44);
      /* inset so nothing is sliced off at the viewport edges */
      const x = 2 + rnd() * 88, y = 2 + rnd() * 90;
      const rot = Math.floor(rnd() * 50) - 25;
      html += '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" ' +
        'stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" ' +
        'style="left:' + x.toFixed(2) + '%;top:' + y.toFixed(2) + '%;transform:rotate(' + rot + 'deg)">' +
        ICONS[k] + '</svg>';
    }
    $('#field').innerHTML = html;
  }

  /* ---------------------------------------------------------------
     Wiring
     --------------------------------------------------------------- */
  function send(text) {
    bubble('me', '<p>' + esc(text) + '</p>');
    setTimeout(() => handle(text), 160);
  }

  document.addEventListener('click', e => {
    const t = e.target;

    const chip = t.closest('[data-say]');
    if (chip) { send(chip.dataset.say); return; }

    const hit = t.closest('[data-open]');
    if (hit) { open(hit.dataset.open); return; }

    const tier = t.closest('[data-tier]');
    if (tier) {
      S.tier = tier.dataset.tier; save(); render();
      const r = byId(S.recipeId);
      bubble('bot', '<p>Switched <strong>' + esc(r.name) + '</strong> to the <strong>' + TIER_LABEL[S.tier].toLowerCase() +
        '</strong> version — ' + r.tiers[S.tier].steps.length + ' steps, ' + esc(r.tiers[S.tier].time) + '.</p>' +
        '<p>' + esc(r.tiers[S.tier].about) + '</p>');
      return;
    }

    const serv = t.closest('[data-serv]');
    if (serv) {
      const r = byId(S.recipeId);
      const cur = S.servings || r.serves;
      S.servings = Math.max(1, Math.min(60, cur + (+serv.dataset.serv)));
      render(); save();
      return;
    }

    const fmt = t.closest('[data-format]');
    if (fmt) {
      S.format = fmt.dataset.format; save(); render();
      if (S.format === 'audio' || S.format === 'all') {
        bubble('bot', '<p>Audio is on. Every step has a <em>Listen</em> button, and the cooking class will read each step out as you reach it.</p>' +
          (canSpeak ? '' : '<p class="hint">This browser does not support speech synthesis, so the buttons will tell you so rather than speaking.</p>'));
      }
      return;
    }

    const diet = t.closest('[data-diet]');
    if (diet) {
      const k = diet.dataset.diet;
      S[k] = !S[k]; save(); render();
      if (S[k]) {
        const r = byId(S.recipeId);
        const changed = ingList(r, S.tier).filter(i => ingMods(i).length).length;
        bubble('bot', '<p><strong>' + (k === 'vegan' ? 'Vegan' : 'Healthier') + '</strong> is on. ' + changed +
          ' ingredient' + (changed === 1 ? '' : 's') + ' in ' + esc(r.name) + ' now carry a named replacement — they are highlighted on the card.</p>' +
          (k === 'vegan' && /flan|halo/.test(r.id)
            ? '<p>Fair warning on this one: an egg-yolk custard has no honest vegan version, so I have said so on the card rather than pretend otherwise.</p>'
            : ''));
      }
      return;
    }

    const alg = t.closest('[data-allergen]');
    if (alg) {
      const a = alg.dataset.allergen;
      if (S.allergens.has(a)) S.allergens.delete(a); else S.allergens.add(a);
      save(); render();
      if (S.allergens.has(a)) {
        const r = byId(S.recipeId);
        const n = ingList(r, S.tier).filter(i => (i.al || []).includes(a)).length;
        bubble('bot', '<p>Avoiding <strong>' + ALLERGENS[a].label.toLowerCase() + '</strong>. ' +
          (n ? n + ' ingredient' + (n === 1 ? '' : 's') + ' in ' + esc(r.name) + ' ' + (n === 1 ? 'is' : 'are') + ' flagged with a replacement.'
            : esc(r.name) + ' is already clear of it.') + '</p>');
      }
      return;
    }

    const sp = t.closest('[data-speak]');
    if (sp) {
      const r = byId(S.recipeId);
      speak(stepText(r.tiers[S.tier].steps[+sp.dataset.speak], r));
      return;
    }

    if (t.closest('#readAll')) { speakSteps(byId(S.recipeId), S.tier); return; }
    if (t.closest('#stopRead')) { if (canSpeak) speechSynthesis.cancel(); return; }
    if (t.closest('#startClass')) { startClass(); return; }
    if (t.closest('#closePanel') || t.closest('#recipeNav')) {
      const p = $('#panel');
      p.dataset.open = p.dataset.open === '1' ? '0' : '1';
      return;
    }

    if (t.closest('#openPantry')) { openSheet('pantry'); return; }
    if (t.closest('#openProgress')) { openSheet('progress'); return; }

    const closer = t.closest('[data-close]');
    if (closer) { closeSheet(closer.dataset.close); return; }
    if (t.classList && t.classList.contains('sheet')) { closeSheet(t.id.replace('Sheet', '')); return; }

    if (t.closest('#savePantry')) {
      const raw = $('#pantryText').value;
      const items = raw.split(/[,;\n]/).map(norm).filter(Boolean);
      closeSheet('pantry');
      setPantry(items, true);
      return;
    }

    const rm = t.closest('[data-rm]');
    if (rm) {
      S.pantry = S.pantry.filter(p => p !== rm.dataset.rm);
      $('#pantryText').value = S.pantry.join('\n');
      save(); renderPantryTags();
      if (S.recipeId) render();
      return;
    }

    const clear = t.closest('#clearProgress');
    if (clear) {
      if (!S.progress.length) return;
      if (clear.dataset.armed !== '1') {
        clear.dataset.armed = '1';
        clear.textContent = 'Tap again to delete ' + S.progress.length;
        clear.style.borderColor = 'var(--crit)';
        clear.style.color = 'var(--crit)';
        setTimeout(() => {
          clear.dataset.armed = '0';
          clear.textContent = 'Clear log';
          clear.style.borderColor = '';
          clear.style.color = '';
        }, 4000);
        return;
      }
      S.progress = [];
      save();
      renderProgress();
      renderProgressBadge();
      clear.dataset.armed = '0';
      clear.textContent = 'Clear log';
      clear.style.borderColor = '';
      clear.style.color = '';
      return;
    }

    if (t.closest('#classPrev')) { classStep(-1); return; }
    if (t.closest('#classNext')) { classStep(1); return; }
    if (t.closest('#classSpeak')) {
      const k = S.klass, kr = byId(k.id);
      speak(stepText(kr.tiers[k.tier].steps[k.i], kr));
      return;
    }
    if (t.closest('#timerToggle')) { toggleTimer(); return; }
    if (t.closest('#timerReset')) { stopTimer(); S.klass.left = null; renderClass(); return; }

    if (t.closest('#themeBtn')) {
      const root = document.documentElement;
      const dark = root.dataset.theme
        ? root.dataset.theme === 'dark'
        : matchMedia('(prefers-color-scheme: dark)').matches;
      root.dataset.theme = dark ? 'light' : 'dark';
      $('#themeBtn').innerHTML = ico(dark ? 'moon' : 'sun', 18);
      return;
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      ['pantry', 'progress', 'class'].forEach(w => {
        const el = $('#' + w + 'Sheet');
        if (el && !el.hidden) closeSheet(w);
      });
    }
    if (S.klass && !$('#classSheet').hidden) {
      if (e.key === 'ArrowRight') classStep(1);
      if (e.key === 'ArrowLeft') classStep(-1);
    }
  });

  $('#composer').addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#input');
    const v = input.value.trim();
    if (!v) return;
    input.value = '';
    input.style.height = 'auto';
    send(v);
  });

  $('#input').addEventListener('input', e => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(140, e.target.scrollHeight) + 'px';
  });

  $('#input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      $('#composer').requestSubmit();
    }
  });

  /* ---------------------------------------------------------------
     Boot
     --------------------------------------------------------------- */
  load();
  drawField();
  render();
  renderPantryTags();
  renderProgressBadge();
  $('#themeBtn').innerHTML = ico(matchMedia('(prefers-color-scheme: dark)').matches ? 'sun' : 'moon', 18);
  greet();

  /* Test seam — lets the suite in test/ drive the assistant directly
     instead of clicking through the UI. */
  window.KusinaInternals = {
    S: S, handle: handle, send: send, open: open, render: render,
    searchRecipes: searchRecipes, pantryScore: pantryScore, setPantry: setPantry,
    norm: norm, looseMatch: looseMatch, fmtQty: fmtQty,
    scaleText: scaleText, stepText: stepText, parseNum: parseNum,
    nutrition: nutrition, ingList: ingList, ingMods: ingMods,
    factor: factor, tally: tally, startClass: startClass, classStep: classStep
  };
})();
