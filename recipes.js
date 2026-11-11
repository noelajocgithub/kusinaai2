/* ------------------------------------------------------------------
   Kusina — recipe database

   Every quantity here is transcribed from a published Filipino recipe
   (source URL on each entry) and stored at its original serving count
   so the app can scale it honestly.

   INGREDIENT
     q     quantity at base serving count (null = "to taste")
     u     unit ('' for countables)
     n     ingredient name
     note  prep note shown after a comma
     al    allergens triggered: gluten soy shellfish fish peanut egg
           dairy sesame treenut
     an    animal origin for the vegan filter: meat seafood fish egg dairy
     sub   replacement text keyed by modifier — vg (vegan), lite
           (healthier), or an allergen key (gluten, shellfish, ...)
     fixed true = does not scale (frying oil, water to cover)

   TIERS
     easy    shortcuts: fewer components, store-bought stand-ins
     core    the recipe as published
     complex from-scratch components and restaurant technique
   Each tier may drop / add / swap ingredients and has its own steps.

   STEP
     t     instruction
     ic    icon key
     min   minutes, if the step is timed (drives the class-mode timer)
     look  what it should look like — shown in Pictures mode
   ------------------------------------------------------------------ */

window.RECIPES = [];

window.RECIPES.push(

/* 1 ---------------------------------------------------------------- */
{
  id: 'chicken-adobo',
  name: 'Chicken Adobo',
  aka: 'Adobong Manok',
  cat: 'main',
  region: 'Nationwide',
  icon: 'pot',
  serves: 4,
  blurb: 'The national braise. Soy, vinegar, garlic, bay and whole peppercorns — nothing else, and it still tastes like a whole cuisine.',
  nutr: { cal: 646, pro: 45, fat: 48, carb: 6 },
  keys: ['chicken', 'soy sauce', 'vinegar', 'garlic', 'bay leaves', 'peppercorns', 'sugar', 'oil'],
  ing: [
    { q: 2, u: 'lbs', n: 'chicken', note: 'cut into serving pieces', an: 'meat', sub: { vg: 'extra-firm tofu, pressed and cubed, or king oyster mushrooms', lite: 'skinless chicken thighs' } },
    { q: 4, u: 'tbsp', n: 'soy sauce', al: ['gluten', 'soy'], sub: { gluten: 'tamari or coconut aminos', soy: 'coconut aminos', lite: 'low-sodium soy sauce' } },
    { q: 4.5, u: 'tbsp', n: 'white vinegar' },
    { q: 10, u: 'cloves', n: 'garlic', note: 'crushed' },
    { q: 3, u: '', n: 'dried bay leaves' },
    { q: 1, u: 'tsp', n: 'whole peppercorns' },
    { q: 1.5, u: 'cups', n: 'water' },
    { q: 4, u: 'tbsp', n: 'cooking oil', sub: { lite: 'cooking oil (use 1 tbsp — enough to sear)' } },
    { q: 1, u: 'tsp', n: 'sugar', sub: { lite: 'omit, or use 1/2 tsp' } },
    { q: null, u: '', n: 'salt', note: 'to taste' }
  ],
  tiers: {
    easy: {
      time: '45 min',
      about: 'No marinating, no searing. Everything goes in the pot at once — the classic "adobo sa palayok" shortcut every Filipino household actually uses on a weeknight.',
      drop: ['cooking oil'],
      steps: [
        { t: 'Put the chicken, soy sauce, vinegar, crushed garlic, bay leaves, peppercorns and water into a pot. Do not stir.', ic: 'pot', look: 'Chicken sitting in dark liquid, garlic cloves scattered on top.' },
        { t: 'Bring to a boil over high heat, uncovered. Let it boil 2 minutes without stirring — this cooks off the raw edge of the vinegar.', ic: 'flame', min: 2, look: 'Big rolling bubbles, steam carrying a sharp vinegar smell.' },
        { t: 'Lower the heat, cover, and simmer 30 minutes until the chicken is tender.', ic: 'simmer', min: 30, look: 'Lazy bubbles at the edge; chicken has gone from pink-white to opaque.' },
        { t: 'Uncover, stir in the sugar, and let the sauce reduce 8–10 minutes until it is glossy and coats the chicken.', ic: 'simmer', min: 10, look: 'Sauce reduced by half, dark and shiny, pooling rather than running.' },
        { t: 'Taste and add salt if needed. Serve with hot rice.', ic: 'plate', look: 'Chicken darkly lacquered, a spoonful of sauce over white rice.' }
      ]
    },
    core: {
      time: '1 hr marinate + 50 min cook',
      about: 'The published method: marinate, sear, then braise. Searing builds the fond that gives adobo its depth, and the garlic gets fried twice.',
      steps: [
        { t: 'Crush the garlic in a mortar and pestle — bruised garlic releases more than chopped garlic does.', ic: 'mortar', look: 'Flattened, split cloves with papery skin loosened, not minced to paste.' },
        { t: 'Combine the chicken, soy sauce and crushed garlic in a bowl. Marinate at least 1 hour.', ic: 'timer', min: 60, look: 'Chicken sitting in shallow brown liquid, surface darkened where it touches.' },
        { t: 'Lift the chicken out. Keep the marinade and the garlic — both go back in later.', ic: 'bowl', look: 'Chicken on a plate, bowl of dark marinade with garlic at the bottom.' },
        { t: 'Heat 3 tbsp oil in the pot over medium-high. Pan-fry the chicken 2 minutes per side, then set aside.', ic: 'pan', min: 4, look: 'Golden-brown patches on the skin, oil spitting lightly.' },
        { t: 'Add the last tablespoon of oil and fry the reserved garlic until it starts to brown. Watch it — it turns bitter the moment it goes past gold.', ic: 'garlic', min: 2, look: 'Garlic edges the colour of honey, smelling sweet and nutty.' },
        { t: 'Return the chicken. Pour in the reserved marinade, the peppercorns and the bay leaves.', ic: 'pot', look: 'Chicken half-submerged, bay leaves floating.' },
        { t: 'Add the water and bring to a boil.', ic: 'water', look: 'Full boil, liquid just covering the chicken.' },
        { t: 'Cover and simmer 30 minutes until the chicken is fork-tender.', ic: 'simmer', min: 30, look: 'Meat pulling slightly from the bone at the joint.' },
        { t: 'Pour in the vinegar. Let it boil 1 minute WITHOUT stirring, then stir.', ic: 'bottle', min: 1, look: 'Surface bubbling hard; the smell goes sharp, then settles.' },
        { t: 'Simmer uncovered 15 minutes to reduce the sauce.', ic: 'simmer', min: 15, look: 'Sauce thickened enough to leave a trail behind the spoon.' },
        { t: 'Add the sugar and salt to taste. Turn off the heat and serve hot with rice.', ic: 'plate', look: 'Dark glossy sauce clinging to each piece.' }
      ]
    },
    complex: {
      time: 'Overnight + 1 hr 45 min',
      about: 'Adobo taken apart and rebuilt: an overnight dry brine for seasoned meat and dry skin, a garlic confit, the braise and the glaze finished separately, and the skin re-crisped in rendered fat at the end.',
      add: [
        { q: 2, u: 'tsp', n: 'kosher salt', note: 'for the overnight dry brine' },
        { q: 2, u: 'heads', n: 'garlic', note: 'cloves separated and peeled, for the confit' },
        { q: 0.5, u: 'cup', n: 'neutral oil', note: 'for the garlic confit' },
        { q: 3, u: 'tbsp', n: 'sukang paombong or cane vinegar', note: 'replaces part of the white vinegar' },
        { q: 1, u: 'tbsp', n: 'muscovado or dark brown sugar' },
        { q: 1, u: 'cup', n: 'unsalted chicken stock', note: 'in place of some of the water', an: 'meat', sub: { vg: 'mushroom stock' } }
      ],
      steps: [
        { t: 'The night before: pat the chicken completely dry, rub with the kosher salt, and rest uncovered on a rack in the fridge. The skin dries out and the salt seasons the meat all the way through.', ic: 'chill', look: 'Skin matte and slightly tightened, no visible moisture.' },
        { t: 'Make the garlic confit: put the 2 heads of peeled cloves in a small pan with the 1/2 cup oil. Cook on the lowest heat 35–40 minutes until the cloves are soft and pale gold. Strain — keep both the cloves and the garlic oil.', ic: 'simmer', min: 40, look: 'Cloves collapsed and translucent, oil clear with a faint gold tint.' },
        { t: 'Toast the peppercorns in a dry pan 60 seconds until fragrant, then crack them coarsely in the mortar. Toasting is what makes the pepper taste like pepper rather than dust.', ic: 'mortar', min: 1, look: 'Peppercorns glossy and smelling woody; cracked into uneven halves.' },
        { t: 'Heat 2 tbsp of the garlic oil in a heavy pot. Sear the chicken skin-side down 5–6 minutes without moving it, until the skin is deep brown and releases on its own. Sear the other side 2 minutes. Set aside.', ic: 'pan', min: 8, look: 'Skin lacquer-brown and crackling, a layer of fat rendered into the pot.' },
        { t: 'Pour off all but 1 tbsp of fat. Add the crushed raw garlic and the cracked peppercorns; cook 90 seconds until the garlic is fragrant and just colouring.', ic: 'garlic', min: 2, look: 'Garlic pale gold, pepper visible against the fat.' },
        { t: 'Deglaze with the soy sauce, scraping the browned bits off the bottom. Add the bay leaves, the chicken stock and 1/2 cup water. Return the chicken skin-side up — the liquid should come only two-thirds of the way up.', ic: 'pot', look: 'Skin above the waterline, body submerged.' },
        { t: 'Cover and simmer very gently 45 minutes. The liquid should barely move.', ic: 'simmer', min: 45, look: 'One or two bubbles at a time; meat yielding to a fork.' },
        { t: 'Lift the chicken out onto a rack. Add both vinegars to the pot and boil hard 1 minute without stirring.', ic: 'bottle', min: 1, look: 'Hard boil, aroma sharp and bright.' },
        { t: 'Reduce the sauce uncovered 15–20 minutes to about 3/4 cup. Stir in the muscovado and the confit cloves, crushing a few against the side of the pan to thicken it.', ic: 'simmer', min: 18, look: 'Syrupy and dark enough to coat the back of a spoon in an even sheet.' },
        { t: 'Heat 1 tbsp garlic oil in a clean pan and crisp the chicken skin-side down 2–3 minutes.', ic: 'flame', min: 3, look: 'Skin audibly crackling, deep mahogany, no soft patches.' },
        { t: 'Season the glaze with salt to taste. Spoon it over the chicken at the table so the skin stays crisp.', ic: 'plate', look: 'Crisp skin on top, glaze pooled underneath, whole confit cloves in the sauce.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/filipino-chicken-adobo-recipe/' }
},

/* 2 ---------------------------------------------------------------- */
{
  id: 'pork-sinigang',
  name: 'Sinigang na Baboy',
  aka: 'Pork and Tamarind Sour Soup',
  cat: 'soup',
  region: 'Nationwide',
  icon: 'bowl',
  serves: 6,
  blurb: 'Sour pork soup loaded with vegetables. The whole dish is a conversation between tamarind, fish sauce and pork fat.',
  nutr: { cal: 799, pro: 15, fat: 80, carb: 3 },
  keys: ['pork', 'pork belly', 'tamarind', 'sinigang mix', 'fish sauce', 'tomato', 'onion', 'radish', 'okra', 'eggplant', 'string beans', 'kangkong', 'taro', 'chili'],
  ing: [
    { q: 2, u: 'lbs', n: 'pork belly', note: 'sliced into cubes', an: 'meat', sub: { vg: 'firm tofu and king oyster mushrooms', lite: 'pork loin or lean pork shoulder' } },
    { q: 8, u: 'cups', n: 'water' },
    { q: 1, u: '', n: 'onion', note: 'quartered' },
    { q: 2, u: '', n: 'tomatoes', note: 'quartered' },
    { q: 2, u: '', n: 'taro (gabi)', note: 'peeled and halved' },
    { q: 2, u: 'packs', n: 'sinigang sa sampaloc mix', note: '20 g each', al: ['gluten', 'fish'], sub: { gluten: '1 cup fresh tamarind pulp, strained', fish: '1 cup fresh tamarind pulp, strained', vg: '1 cup fresh tamarind pulp, strained' } },
    { q: 3, u: 'tbsp', n: 'fish sauce (patis)', al: ['fish'], an: 'fish', sub: { vg: 'light soy sauce or 2 tbsp white miso', fish: 'light soy sauce', lite: 'fish sauce (use 2 tbsp)' } },
    { q: 0.25, u: 'tsp', n: 'ground black pepper' },
    { q: 1, u: 'cup', n: 'daikon radish (labanos)', note: 'sliced' },
    { q: 3, u: '', n: 'long green chili peppers', note: 'siling pansigang' },
    { q: 15, u: '', n: 'okra' },
    { q: 11, u: '', n: 'snake beans (sitaw)', note: 'cut into 2-inch pieces' },
    { q: 2.5, u: 'cups', n: 'kangkong leaves', note: 'water spinach', sub: { gluten: 'kangkong, or spinach' } }
  ],
  tiers: {
    easy: {
      time: '50 min',
      about: 'Uses the tamarind packet and only the vegetables that hold up to rough timing. Drop the taro and the soup needs no babysitting at all.',
      drop: ['taro (gabi)', 'okra'],
      steps: [
        { t: 'Bring the water to a boil with the onion and tomatoes. Boil 5 minutes.', ic: 'pot', min: 5, look: 'Tomato skins splitting and curling back.' },
        { t: 'Add the pork. Simmer 35 minutes until tender, skimming off any grey foam that rises in the first few minutes.', ic: 'simmer', min: 35, look: 'Broth gone cloudy and golden; pork easy to pierce.' },
        { t: 'Stir in the sinigang mix, fish sauce and black pepper.', ic: 'shaker', look: 'Broth turns opaque and tan; it should smell distinctly sour.' },
        { t: 'Add the radish and snake beans; cook 5 minutes. Add the chilies and cook 2 more.', ic: 'veg', min: 7, look: 'Radish translucent at the edges, beans bright green.' },
        { t: 'Drop in the kangkong, cover, and turn off the heat. Let it sit 3 minutes, then serve.', ic: 'leaf', min: 3, look: 'Leaves just wilted and still deep green, not olive.' }
      ]
    },
    core: {
      time: '1 hr 40 min',
      about: 'The published recipe, with the vegetables staged by cooking time so none of them turn to mush. This is the order that matters most in sinigang.',
      steps: [
        { t: 'Boil the water in a large pot.', ic: 'water', look: 'Full rolling boil.' },
        { t: 'Add the onion and tomato. Boil 5–8 minutes.', ic: 'tomato', min: 7, look: 'Tomatoes slumped, onion layers separating.' },
        { t: 'Add the pork and boil 25 minutes.', ic: 'pork', min: 25, look: 'Grey foam at first, then a clearer, fattier broth.' },
        { t: 'Add the taro, cover, and boil 30 minutes. The taro slowly dissolves and thickens the broth — that is the point of it.', ic: 'simmer', min: 30, look: 'Broth noticeably thicker and slightly cloudy; taro soft through.' },
        { t: 'Stir in the sinigang mix, fish sauce and ground black pepper.', ic: 'shaker', look: 'Even tan colour, no powder clumps on the surface.' },
        { t: 'Add the daikon radish and cook 3–5 minutes.', ic: 'veg', min: 4, look: 'Radish edges turning from chalky white to glassy.' },
        { t: 'Add the chili peppers, okra and snake beans. Cook 7 minutes.', ic: 'chili', min: 7, look: 'Okra still firm with no sliminess, beans vivid.' },
        { t: 'Add the kangkong, cover, and take the pot off the heat. Leave it 5 minutes — the residual heat cooks the leaves exactly enough.', ic: 'leaf', min: 5, look: 'Leaves limp but still green; stems tender-crisp.' },
        { t: 'Serve in bowls with rice and a dish of fish sauce with crushed chili.', ic: 'plate', look: 'Clear sour broth, vegetables visible and distinct.' }
      ]
    },
    complex: {
      time: '3 hr 30 min',
      about: 'No packet. You boil down fresh tamarind for the souring agent, build a proper pork broth from bones first, and layer in a second souring note from kamias.',
      drop: ['sinigang sa sampaloc mix'],
      add: [
        { q: 1.5, u: 'lbs', n: 'pork neck bones', note: 'for the broth', an: 'meat', sub: { vg: 'dried shiitake and kombu' } },
        { q: 0.75, u: 'lb', n: 'fresh tamarind pods', note: 'green or barely ripe' },
        { q: 6, u: '', n: 'kamias (bilimbi)', note: 'optional second sour note' },
        { q: 2, u: 'thumbs', n: 'ginger', note: 'smashed' }
      ],
      steps: [
        { t: 'Blanch the pork bones: cover with cold water, bring to a boil, boil 5 minutes, then drain and rinse. This is the step that gets you a clear broth instead of a muddy one.', ic: 'pot', min: 10, look: 'Rinsed bones, clean and pale; the discarded water grey with scum.' },
        { t: 'Return the bones to the pot with 10 cups fresh water and the smashed ginger. Simmer gently, uncovered, 2 hours. Never let it boil hard.', ic: 'simmer', min: 120, look: 'Barely trembling surface; broth pale gold and fragrant.' },
        { t: 'Meanwhile make the sinigang base: simmer the tamarind pods in 2 cups water 20 minutes until the pods burst and the flesh slips off.', ic: 'simmer', min: 20, look: 'Split pods, water gone murky brown.' },
        { t: 'Mash the tamarind against a sieve and press through, scraping until only seeds and fibre are left. You should get roughly a cup of thick sour pulp.', ic: 'mix', look: 'Smooth brown purée in the bowl, dry seeds left in the sieve.' },
        { t: 'Strain the pork broth and discard the bones. Return the broth to the pot and bring to a simmer.', ic: 'water', look: 'Clear amber broth, no floating solids.' },
        { t: 'Add the onion and tomatoes; simmer 8 minutes. Add the pork belly and simmer 40 minutes until tender.', ic: 'pork', min: 48, look: 'Belly soft enough to split with a spoon, fat translucent.' },
        { t: 'Add the taro and simmer 25 minutes, letting it break down and body the broth.', ic: 'simmer', min: 25, look: 'Broth thickened, a faint starchy sheen.' },
        { t: 'Stir in the tamarind pulp a few spoonfuls at a time, tasting as you go, then the fish sauce and pepper. Add kamias if you want it sharper. This is the moment you are actually seasoning the dish — take your time.', ic: 'bowl', look: 'Broth the colour of weak tea; it should make you wince slightly.' },
        { t: 'Stage the vegetables: radish 4 minutes, then chilies, okra and snake beans 6 minutes.', ic: 'veg', min: 10, look: 'Each vegetable still its own colour and shape.' },
        { t: 'Kill the heat, add the kangkong, cover 4 minutes, and serve immediately.', ic: 'leaf', min: 4, look: 'Steam carrying a sour, savoury smell; leaves just collapsed.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/sinigang-na-baboy-with-gabi/' }
},

/* 3 ---------------------------------------------------------------- */
{
  id: 'chicken-tinola',
  name: 'Tinolang Manok',
  aka: 'Chicken Ginger Soup',
  cat: 'soup',
  region: 'Nationwide',
  icon: 'ginger',
  serves: 6,
  blurb: 'Clear ginger broth with chicken and green papaya. What a Filipino household makes when somebody is unwell, or when it rains.',
  nutr: { cal: 436, pro: 29, fat: 32, carb: 6 },
  keys: ['chicken', 'ginger', 'garlic', 'onion', 'fish sauce', 'green papaya', 'chayote', 'malunggay', 'spinach', 'lemongrass'],
  ing: [
    { q: 2, u: 'tbsp', n: 'cooking oil', sub: { lite: 'cooking oil (use 1 tbsp)' } },
    { q: 3, u: 'thumbs', n: 'ginger', note: 'cut into strips' },
    { q: 2, u: 'cloves', n: 'garlic', note: 'minced' },
    { q: 1, u: '', n: 'onion', note: 'coarsely chopped' },
    { q: 2, u: 'lbs', n: 'chicken', note: 'cut into serving pieces', an: 'meat', sub: { vg: 'firm tofu and oyster mushrooms', lite: 'skinless chicken thighs and breast' } },
    { q: 4, u: 'tbsp', n: 'fish sauce', al: ['fish'], an: 'fish', sub: { vg: 'light soy sauce or white miso', fish: 'light soy sauce', lite: 'fish sauce (use 3 tbsp)' } },
    { q: 6, u: 'cups', n: 'water' },
    { q: 2, u: 'stalks', n: 'lemongrass', note: 'optional, bruised' },
    { q: 1, u: '', n: 'green papaya or chayote', note: 'cut into wedges' },
    { q: 1, u: 'cup', n: 'malunggay or chili leaves', sub: { gluten: 'malunggay, or spinach' } }
  ],
  tiers: {
    easy: {
      time: '35 min',
      about: 'Everything into one pot, chayote instead of green papaya because it is easier to find and needs no peeling skill.',
      drop: ['lemongrass'],
      steps: [
        { t: 'Heat the oil in a pot and cook the ginger, garlic and onion 3 minutes until soft and fragrant.', ic: 'pan', min: 3, look: 'Onion translucent, kitchen smelling strongly of ginger.' },
        { t: 'Add the chicken and the fish sauce. Stir once, cover, and let it sit 5 minutes.', ic: 'chicken', min: 5, look: 'Chicken turning white at the edges, liquid collecting in the pot.' },
        { t: 'Pour in the water, bring to a boil, then lower the heat and simmer covered 20 minutes.', ic: 'simmer', min: 20, look: 'Broth pale gold, a little fat gathering on top.' },
        { t: 'Add the chayote and cook 5 minutes until just soft.', ic: 'veg', min: 5, look: 'Chayote gone from opaque to faintly translucent.' },
        { t: 'Stir in the leaves, simmer 1 minute, and serve.', ic: 'leaf', min: 1, look: 'Leaves wilted into the broth, still green.' }
      ]
    },
    core: {
      time: '35 min',
      about: 'The published recipe, with the ginger properly bloomed in oil first and the chicken sweated in fish sauce before any water goes in — that is where the flavour comes from.',
      steps: [
        { t: 'Sauté the ginger, garlic and onion in the oil over medium heat until tender.', ic: 'ginger', min: 4, look: 'Ginger strips slightly curled, onion soft and glassy.' },
        { t: 'Add the chicken and fish sauce. Cover and simmer 5 minutes until the chicken releases its juices.', ic: 'chicken', min: 5, look: 'An inch of cloudy liquid in the bottom of the pot.' },
        { t: 'Pour in the water and the lemongrass. Bring to a boil, then lower the heat and simmer covered 20 minutes until the chicken is tender.', ic: 'simmer', min: 20, look: 'Clear broth with a thin golden film; meat loose on the bone.' },
        { t: 'Add the green papaya or chayote and cook 5 minutes until soft.', ic: 'veg', min: 5, look: 'Wedges tender but still holding their shape.' },
        { t: 'Taste and adjust with more fish sauce or salt.', ic: 'spoon', look: 'Broth should taste clean and gingery, not flat.' },
        { t: 'Mix in the chili or malunggay leaves and simmer 1 minute. Serve hot with rice.', ic: 'leaf', min: 1, look: 'Bright green leaves suspended in clear broth.' }
      ]
    },
    complex: {
      time: '1 hr 50 min',
      about: 'A tinola with a real double broth: the carcass and wings become stock while the ginger is charred for depth, and the chicken pieces are poached gently at the end so the breast never goes stringy.',
      add: [
        { q: 1, u: '', n: 'chicken carcass and wing tips', note: 'for the stock', an: 'meat', sub: { vg: 'dried shiitake, kombu and charred onion' } },
        { q: 1, u: 'tbsp', n: 'whole black peppercorns' },
        { q: 2, u: '', n: 'shallots', note: 'halved' },
        { q: 1, u: 'tbsp', n: 'calamansi juice', note: 'to finish' }
      ],
      steps: [
        { t: 'Char half the ginger and the shallots directly over a flame or in a dry pan until blackened in patches, 6–8 minutes. Charring turns the ginger from sharp to smoky-sweet.', ic: 'flame', min: 8, look: 'Blistered black spots on the cut faces, smoke rising.' },
        { t: 'Make the stock: cover the carcass and wing tips with 8 cups cold water, bring to a bare simmer, and skim carefully for the first 10 minutes.', ic: 'pot', min: 10, look: 'Grey foam lifted off; liquid beginning to clear.' },
        { t: 'Add the charred ginger and shallots, the peppercorns and the lemongrass. Simmer uncovered 75 minutes, never letting it boil.', ic: 'simmer', min: 75, look: 'Broth deep gold, reduced by about a quarter.' },
        { t: 'Strain the stock through a fine sieve and skim the fat, reserving 2 tbsp of it.', ic: 'water', look: 'Clear, glossy broth with no cloudiness.' },
        { t: 'In a clean pot, sweat the remaining fresh ginger, garlic and onion in the reserved chicken fat 4 minutes.', ic: 'pan', min: 4, look: 'Aromatics soft, coated in gold fat, nothing browned.' },
        { t: 'Add the fish sauce and let it reduce 30 seconds — it loses its fishiness and turns savoury.', ic: 'bottle', min: 1, look: 'A dark glaze forming on the bottom of the pot.' },
        { t: 'Pour in the strained stock and bring to 190°F / 88°C — just below a simmer. Slide in the chicken pieces and poach 25 minutes.', ic: 'timer', min: 25, look: 'Only the occasional bubble; chicken firm and white, never bouncing in the pot.' },
        { t: 'Add the green papaya wedges and poach 8 minutes.', ic: 'veg', min: 8, look: 'Papaya translucent at the edge, opaque at the centre.' },
        { t: 'Off the heat, stir in the malunggay leaves and the calamansi juice. The acid at the very end lifts the whole bowl.', ic: 'citrus', min: 2, look: 'Leaves just collapsed; broth smelling bright and citrusy.' },
        { t: 'Serve in warmed bowls with the ginger strips divided between them.', ic: 'plate', look: 'Clear broth, a few ginger threads, green leaves, pale chicken.' }
      ]
    }
  },
  src: { site: 'Foxy Folksy', url: 'https://www.foxyfolksy.com/chicken-tinola/' }
},

/* 4 ---------------------------------------------------------------- */
{
  id: 'pancit-bihon',
  name: 'Pancit Bihon Guisado',
  aka: 'Stir-fried Rice Noodles',
  cat: 'noodle',
  region: 'Nationwide',
  icon: 'noodles',
  serves: 8,
  blurb: 'Rice vermicelli tossed with pork, chicken and vegetables. Served at every birthday in the country, because long noodles mean long life.',
  nutr: { cal: 240, pro: 13, fat: 11, carb: 23 },
  keys: ['bihon', 'rice noodles', 'pork', 'chicken', 'cabbage', 'carrots', 'celery', 'snow peas', 'soy sauce', 'onion', 'garlic'],
  ing: [
    { q: 1, u: 'lb', n: 'pancit bihon rice noodles' },
    { q: 0.5, u: 'lb', n: 'pork', note: 'thinly sliced', an: 'meat', sub: { vg: 'pressed firm tofu, sliced', lite: 'lean pork loin' } },
    { q: 0.5, u: 'lb', n: 'cooked chicken', note: 'deboned and sliced', an: 'meat', sub: { vg: 'shiitake mushrooms, sliced', lite: 'poached chicken breast' } },
    { q: 0.125, u: 'lb', n: 'snow peas' },
    { q: 1, u: 'cup', n: 'carrots', note: 'cut into thin strips' },
    { q: 0.5, u: '', n: 'small cabbage', note: 'chopped' },
    { q: 1, u: 'cup', n: 'celery leaves', note: 'finely chopped' },
    { q: 1, u: '', n: 'onion', note: 'chopped' },
    { q: 0.5, u: 'tbsp', n: 'garlic', note: 'minced' },
    { q: 2, u: 'tsp', n: 'chicken powder', al: ['gluten', 'soy'], an: 'meat', sub: { gluten: 'gluten-free chicken bouillon', soy: 'soy-free chicken bouillon, or 2 tsp salt plus 1 tsp onion powder', vg: 'mushroom seasoning powder', lite: 'low-sodium bouillon' } },
    { q: 5, u: 'tbsp', n: 'soy sauce', al: ['gluten', 'soy'], sub: { gluten: 'tamari', soy: 'coconut aminos', lite: 'low-sodium soy sauce' } },
    { q: 3.5, u: 'cups', n: 'water' },
    { q: 3, u: 'tbsp', n: 'cooking oil', sub: { lite: 'cooking oil (use 1 1/2 tbsp)' } }
  ],
  tiers: {
    easy: {
      time: '30 min',
      about: 'One protein, three vegetables, and the noodles cooked straight in the pan. Nothing gets removed and returned — you just keep adding.',
      drop: ['pork', 'snow peas', 'celery leaves'],
      steps: [
        { t: 'Soak the bihon in cool water 10 minutes, then drain well.', ic: 'water', min: 10, look: 'Noodles gone from brittle and glassy to flexible and white.' },
        { t: 'Heat the oil in a wide pan and cook the garlic and onion 2 minutes.', ic: 'pan', min: 2, look: 'Onion soft, garlic pale gold.' },
        { t: 'Add the cooked chicken, chicken powder, soy sauce and water. Bring to a boil.', ic: 'pot', min: 4, look: 'Brown liquid at a full boil.' },
        { t: 'Add the carrots and cabbage and cook 3 minutes.', ic: 'veg', min: 3, look: 'Cabbage collapsing slightly, carrots still bright.' },
        { t: 'Add the drained noodles and toss constantly with tongs until they have drunk up the liquid, about 6 minutes.', ic: 'noodles', min: 6, look: 'Noodles evenly tan, no liquid left in the pan.' },
        { t: 'Serve with calamansi or lemon wedges to squeeze over.', ic: 'citrus', look: 'Glossy noodles, vegetables scattered through, wedge on the side.' }
      ]
    },
    core: {
      time: '45 min',
      about: 'The published recipe. The meat and vegetables come out of the pan before the noodles go in, so nothing overcooks while the bihon absorbs the broth.',
      steps: [
        { t: 'Soak the bihon in water 10 minutes, drain, and set aside.', ic: 'water', min: 10, look: 'Pliable noodles, no brittle strands left.' },
        { t: 'Heat the oil in a large wok and sauté the garlic and onion until softened.', ic: 'pan', min: 3, look: 'Onion translucent at the edges.' },
        { t: 'Add the pork and cook 2–4 minutes until lightly browned.', ic: 'pork', min: 4, look: 'Pork opaque with light brown edges.' },
        { t: 'Add the cooked chicken and sauté 2 minutes.', ic: 'chicken', min: 2, look: 'Chicken heated through and coated in fat.' },
        { t: 'Add the chicken powder and water. Simmer 15 minutes.', ic: 'simmer', min: 15, look: 'A savoury broth, slightly reduced.' },
        { t: 'Add the carrots, snow peas, cabbage and celery leaves. Simmer until tender-crisp.', ic: 'veg', min: 4, look: 'Snow peas vivid green, cabbage wilted but not grey.' },
        { t: 'Lift out the meat and vegetables with a slotted spoon, leaving all the liquid in the wok.', ic: 'spoon', look: 'A bowl of solids; a wok of brown broth.' },
        { t: 'Stir the soy sauce into the liquid.', ic: 'bottle', look: 'Broth darkened to a deep mahogany.' },
        { t: 'Add the drained bihon and toss gently until the noodles are tender and the liquid has evaporated.', ic: 'noodles', min: 8, look: 'Noodles uniformly coloured, pan nearly dry, strands separate.' },
        { t: 'Return the meat and vegetables and toss 1–2 minutes.', ic: 'mix', min: 2, look: 'Everything evenly distributed, nothing clumped.' },
        { t: 'Transfer to a platter and serve hot.', ic: 'plate', look: 'A loose mound of noodles with vegetables visible throughout.' }
      ]
    },
    complex: {
      time: '1 hr 30 min',
      about: 'Built on a real chicken stock you make from a poached bird, with a toasted-garlic oil, and the noodles finished in stages so they take on the sauce without going soft.',
      drop: ['chicken powder', 'cooked chicken', 'water'],
      add: [
        { q: 1, u: '', n: 'whole chicken leg quarters', note: '2 lbs, for poaching and shredding', an: 'meat', sub: { vg: 'shiitake and king oyster mushrooms' } },
        { q: 6, u: 'cups', n: 'water', note: 'for the stock' },
        { q: 1, u: 'head', n: 'garlic', note: 'half for toasted garlic oil, half minced' },
        { q: 2, u: 'tbsp', n: 'oyster sauce', al: ['shellfish', 'gluten', 'soy'], an: 'seafood', sub: { shellfish: 'mushroom stir-fry sauce', vg: 'mushroom stir-fry sauce', gluten: 'gluten-free oyster sauce' } },
        { q: 1, u: 'tsp', n: 'toasted sesame oil', al: ['sesame'], sub: { sesame: 'omit' } },
        { q: 4, u: '', n: 'calamansi', note: 'halved, to serve' }
      ],
      steps: [
        { t: 'Poach the chicken leg quarters in the 6 cups water with the onion 35 minutes at a bare simmer. Lift out, cool, then shred the meat and return the bones to the pot.', ic: 'simmer', min: 35, look: 'Clear stock; meat pulling away in long strands.' },
        { t: 'Simmer the bones another 25 minutes, then strain. You want about 4 cups of concentrated stock.', ic: 'pot', min: 25, look: 'Stock reduced, deeper in colour, with body.' },
        { t: 'Make toasted garlic oil: gently fry half the sliced garlic in the 3 tbsp oil over low heat until golden, 5–6 minutes. Strain the chips out onto paper and keep both oil and chips.', ic: 'garlic', min: 6, look: 'Garlic chips evenly gold and crisp; oil fragrant and clear.' },
        { t: 'Soak the bihon 10 minutes in cool water and drain thoroughly.', ic: 'water', min: 10, look: 'Flexible noodles; no cloudy water clinging.' },
        { t: 'Sear the pork in 1 tbsp of the garlic oil over high heat 3 minutes until browned, then remove.', ic: 'pan', min: 3, look: 'Real browning on the pork, not just colour change.' },
        { t: 'Sauté the minced garlic and the remaining onion 2 minutes. Add the carrots and cook 2 minutes more.', ic: 'veg', min: 4, look: 'Carrots glossy and slightly softened.' },
        { t: 'Add 2 cups of the stock, the soy sauce and the oyster sauce. Bring to a boil.', ic: 'pot', min: 3, look: 'A dark, glossy sauce at a full boil.' },
        { t: 'Add the noodles and toss. As they drink up the liquid, add the rest of the stock half a cup at a time, exactly the way you would feed stock to a risotto. This is what keeps the strands separate and seasoned all the way through.', ic: 'noodles', min: 12, look: 'Noodles glossy and springy, never sitting in a puddle.' },
        { t: 'Fold in the shredded chicken, seared pork, cabbage, snow peas and celery leaves. Toss over high heat 2 minutes.', ic: 'mix', min: 2, look: 'Vegetables just wilted, noodles coated.' },
        { t: 'Off the heat, add the sesame oil and half the garlic chips. Toss once.', ic: 'bottle', look: 'A visible sheen; garlic chips scattered through.' },
        { t: 'Pile onto a platter, scatter the remaining garlic chips, and serve with calamansi halves.', ic: 'plate', look: 'Tall loose mound, crisp gold garlic on top, citrus alongside.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/pancit-guisado/' }
},

/* 5 ---------------------------------------------------------------- */
{
  id: 'lumpiang-shanghai',
  name: 'Lumpiang Shanghai',
  aka: 'Filipino Pork Spring Rolls',
  cat: 'snack',
  region: 'Nationwide',
  icon: 'skewer',
  serves: 6,
  blurb: 'Thin, long, crisp pork rolls cut into bite-size lengths. The party food that disappears first.',
  nutr: { cal: 430, pro: 22, fat: 26, carb: 28 },
  nutrNote: 'The source lists 1,359 kcal per serving because it counts all 3 cups of frying oil. Rolls absorb only a fraction of it — the figure here estimates roughly 8 rolls per serving with realistic oil uptake.',
  keys: ['ground pork', 'lumpia wrapper', 'carrots', 'onion', 'parsley', 'egg', 'sesame oil', 'garlic powder'],
  ing: [
    { q: 50, u: '', n: 'lumpia wrappers', al: ['gluten'], sub: { gluten: 'rice paper wrappers (fry at a lower 325°F and work quickly)' } },
    { q: 3, u: 'cups', n: 'cooking oil', note: 'for deep frying', fixed: true },
    { q: 1.5, u: 'lbs', n: 'ground pork', an: 'meat', sub: { vg: 'crumbled firm tofu and finely chopped mushrooms, squeezed dry', lite: 'ground chicken or lean ground pork' } },
    { q: 2, u: '', n: 'onions', note: 'minced' },
    { q: 2, u: '', n: 'carrots', note: 'minced' },
    { q: 1.5, u: 'tsp', n: 'garlic powder' },
    { q: 0.5, u: 'tsp', n: 'ground black pepper' },
    { q: 0.5, u: 'cup', n: 'parsley', note: 'chopped' },
    { q: 1.5, u: 'tsp', n: 'salt', sub: { lite: 'salt (use 1 tsp)' } },
    { q: 1, u: 'tbsp', n: 'sesame oil', al: ['sesame'], sub: { sesame: 'omit, or use 1 tbsp neutral oil' } },
    { q: 2, u: '', n: 'eggs', al: ['egg'], an: 'egg', sub: { egg: '3 tbsp cornstarch mixed with 3 tbsp water', vg: '3 tbsp cornstarch mixed with 3 tbsp water' } },
    { q: 1, u: '', n: 'egg', note: 'beaten, for sealing', al: ['egg'], an: 'egg', sub: { egg: 'a slurry of 1 tbsp flour and 2 tbsp water', vg: 'a slurry of 1 tbsp flour and 2 tbsp water' } }
  ],
  tiers: {
    easy: {
      time: '45 min',
      about: 'Fat rolls instead of thin ones — half as many to wrap, and they are far more forgiving. Shallow-fried in an inch of oil rather than deep-fried.',
      drop: ['parsley'],
      steps: [
        { t: 'Mix the ground pork, onions, carrots, garlic powder, pepper, salt, sesame oil and the 2 eggs in a bowl until it looks uniform.', ic: 'mix', look: 'An even pink-orange mixture with no streaks of plain pork.' },
        { t: 'Put 2 tablespoons of filling along one edge of a wrapper, fold the sides in, and roll into a thick cigar. Seal the end with beaten egg. Keep going until the filling is gone.', ic: 'knife', noscale: true, look: 'Rolls about as thick as your thumb, sealed and lying seam-side down.' },
        { t: 'Heat 1 inch of oil in a pan to 325°F / 165°C — a scrap of wrapper should sizzle steadily, not violently.', ic: 'flame', look: 'Oil shimmering with no smoke.' },
        { t: 'Fry in batches 5–6 minutes, turning, until deep gold. Thick rolls need longer so the pork cooks through.', ic: 'pan', min: 6, look: 'Even golden-brown all over, bubbling slowed down.' },
        { t: 'Drain on a rack. Cut one open to check the pork is cooked through, then serve with sweet chili sauce.', ic: 'plate', look: 'No pink in the centre; steam escaping when cut.' }
      ]
    },
    core: {
      time: '1 hr 10 min',
      about: 'The published recipe: 50 thin rolls, deep-fried at 325°F. Thin is the whole point — the ratio of crisp shell to filling is what makes lumpiang Shanghai different from any other spring roll.',
      steps: [
        { t: 'Combine all the filling ingredients in a bowl and mix thoroughly.', ic: 'mix', look: 'A cohesive mixture that holds together when squeezed.' },
        { t: 'Fry a teaspoon of the filling and taste it. Adjust the salt now — you cannot season a tray of finished rolls after the fact.', ic: 'pan', min: 2, look: 'A small browned patty; it should taste slightly saltier than you expect.' },
        { t: 'Place 1–1½ tablespoons of filling on each wrapper and spread it into a thin line. Fold the sides in and roll tightly.', ic: 'knife', noscale: true, look: 'Pencil-thin rolls, tight with no air pockets.' },
        { t: 'Brush the top edge with beaten egg and press to seal.', ic: 'egg', look: 'A sealed seam that stays shut when you lift the roll.' },
        { t: 'Heat the oil to 325°F / 165°C.', ic: 'flame', look: 'A wrapper scrap bubbles up and browns in about 20 seconds.' },
        { t: 'Deep-fry in batches, turning occasionally, until golden — 3–4 minutes. Do not crowd the pot or the temperature crashes.', ic: 'pan', min: 4, look: 'Uniform pale gold, rolls floating and rotating freely.' },
        { t: 'Drain on a rack, not on paper — paper traps steam and softens the bottoms.', ic: 'plate', look: 'Rolls propped up with air circulating underneath, still audibly crisp.' },
        { t: 'Cut into 2-inch lengths on the diagonal and serve with sweet chili or banana ketchup.', ic: 'plate', look: 'Angled cuts showing the dense filling against a thin shell.' }
      ]
    },
    complex: {
      time: '2 hr + overnight optional',
      about: 'Double-fried for a shell that stays crisp for an hour, with a filling bound by a panade and seasoned with shrimp and water chestnut, and a sweet-and-sour sauce made from scratch.',
      add: [
        { q: 0.5, u: 'lb', n: 'shrimp', note: 'peeled and roughly chopped', al: ['shellfish'], an: 'seafood', sub: { shellfish: 'omit and add 1/2 lb more ground pork', vg: 'omit' } },
        { q: 0.5, u: 'cup', n: 'water chestnuts', note: 'finely diced' },
        { q: 2, u: 'tbsp', n: 'cornstarch' },
        { q: 3, u: 'tbsp', n: 'cold water', note: 'for the panade' },
        { q: 0.5, u: 'cup', n: 'rice vinegar', note: 'for the sauce' },
        { q: 0.33, u: 'cup', n: 'sugar', note: 'for the sauce' },
        { q: 2, u: 'tbsp', n: 'banana ketchup', note: 'for the sauce' }
      ],
      steps: [
        { t: 'Make a panade: whisk the cornstarch into the cold water. Mixed into the pork it holds moisture, so the filling stays juicy instead of turning into a dry pellet.', ic: 'whisk', look: 'A thin, milky slurry with no lumps.' },
        { t: 'Mix the pork with the panade in one direction for 2 full minutes until it turns slightly sticky and pale. This develops the protein and binds the roll.', ic: 'mix', min: 2, look: 'The mixture clings to the spoon and pulls back on itself.' },
        { t: 'Fold in the shrimp, water chestnuts, onions, carrots, parsley, garlic powder, pepper, salt, sesame oil and eggs. Chill 1 hour — cold filling is far easier to roll thin.', ic: 'chill', min: 60, look: 'Firm, scoopable filling that holds a shape.' },
        { t: 'Roll the filling into thin rolls, each about the thickness of a finger, sealing the seams with beaten egg. Keep them under a damp cloth as you work.', ic: 'knife', noscale: true, look: 'Even rolls in neat rows, wrappers still supple.' },
        { t: 'First fry: 300°F / 150°C for 3 minutes. The rolls should go pale blonde, not brown — you are cooking the filling here, not colouring the shell.', ic: 'pan', min: 3, look: 'Barely coloured, slightly blistered wrappers.' },
        { t: 'Rest the rolls on a rack at least 15 minutes. They can also be frozen at this stage and fried straight from frozen.', ic: 'timer', min: 15, look: 'Surfaces dry to the touch, no steam rising.' },
        { t: 'Make the sauce: simmer the rice vinegar, sugar and banana ketchup 6 minutes until syrupy, then thicken with a teaspoon of cornstarch slurry.', ic: 'simmer', min: 6, look: 'Glossy red-orange sauce that coats a spoon.' },
        { t: 'Second fry: 375°F / 190°C for 90 seconds, until deep gold and blistered. This is the fry that makes the shell shatter.', ic: 'flame', min: 2, look: 'Deep amber, visibly bubbled surface, loud sizzle.' },
        { t: 'Drain upright on a rack, cut on a sharp diagonal, and serve with the sauce.', ic: 'plate', look: 'Shell audibly cracking under the knife; filling moist and set.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/filipino-lumpia-recipe/' }
},

/* 6 ---------------------------------------------------------------- */
{
  id: 'kare-kare',
  name: 'Kare-Kare',
  aka: 'Oxtail Peanut Stew',
  cat: 'main',
  region: 'Nationwide',
  icon: 'peanut',
  serves: 6,
  blurb: 'Oxtail in a thick peanut and toasted-rice sauce, eaten with bagoong on the side. Rich, slow, and worth the afternoon.',
  nutr: { cal: 934, pro: 91, fat: 53, carb: 24 },
  keys: ['oxtail', 'peanut butter', 'ground peanuts', 'annatto', 'banana flower', 'bok choy', 'string beans', 'eggplant', 'shrimp paste', 'toasted rice'],
  ing: [
    { q: 3, u: 'lbs', n: 'oxtail', note: 'cut into 2-inch slices', an: 'meat', sub: { vg: 'king oyster mushrooms and jackfruit, plus 2 cups mushroom stock', lite: 'beef shank, trimmed' } },
    { q: 1, u: '', n: 'small banana flower bud', note: 'sliced' },
    { q: 1, u: 'bundle', n: 'pechay or bok choy' },
    { q: 1, u: 'bundle', n: 'string beans', note: 'cut into 2-inch pieces' },
    { q: 4, u: '', n: 'Chinese eggplant', note: 'sliced' },
    { q: 1, u: 'cup', n: 'ground peanuts', al: ['peanut'], sub: { peanut: 'ground toasted sunflower seeds' } },
    { q: 0.5, u: 'cup', n: 'peanut butter', al: ['peanut'], sub: { peanut: 'sunflower seed butter', lite: 'natural peanut butter, no added sugar' } },
    { q: 0.5, u: 'cup', n: 'shrimp paste (bagoong)', note: 'served on the side', al: ['shellfish', 'fish'], an: 'seafood', sub: { shellfish: 'fermented black bean paste', vg: 'fermented black bean paste or miso', fish: 'fermented black bean paste' } },
    { q: 34, u: 'oz', n: 'water' },
    { q: 0.5, u: 'cup', n: 'annatto seeds', note: 'soaked in 1 cup water', sub: { gluten: 'annatto seeds, or 2 tsp annatto powder' } },
    { q: 0.5, u: 'cup', n: 'toasted ground rice', note: 'thickener' },
    { q: 1, u: 'tbsp', n: 'garlic', note: 'minced' },
    { q: 1, u: '', n: 'onion', note: 'chopped' },
    { q: null, u: '', n: 'salt and pepper', note: 'to taste' }
  ],
  tiers: {
    easy: {
      time: '1 hr 15 min (pressure cooker)',
      about: 'Pressure cooker for the oxtail, peanut butter alone for the sauce, and only the vegetables you can buy anywhere. Skips the banana flower and the toasted rice.',
      drop: ['small banana flower bud', 'ground peanuts', 'toasted ground rice', 'annatto seeds'],
      add: [{ q: 2, u: 'tsp', n: 'annatto powder' }, { q: 2, u: 'tbsp', n: 'cornstarch', note: 'mixed with 3 tbsp water' }],
      steps: [
        { t: 'Pressure-cook the oxtail with the onion and enough water to cover, 35 minutes on high.', ic: 'pot', min: 35, look: 'Meat shrunk back from the bone, broth deeply beefy.' },
        { t: 'Release the pressure and skim the fat off the top.', ic: 'spoon', look: 'A clear layer of orange fat lifted away.' },
        { t: 'Stir in the peanut butter and annatto powder until smooth.', ic: 'mix', min: 3, look: 'Sauce turned rust-orange and opaque, no streaks of peanut butter.' },
        { t: 'Add the eggplant and string beans; simmer 6 minutes.', ic: 'veg', min: 6, look: 'Eggplant soft, beans still green.' },
        { t: 'Thicken with the cornstarch slurry, simmer 2 minutes, then add the bok choy and turn off the heat.', ic: 'simmer', min: 3, look: 'Sauce coating the meat; bok choy just wilted.' },
        { t: 'Season with salt and pepper. Serve with bagoong on the side — the stew itself is deliberately under-salted because the bagoong does that job.', ic: 'plate', look: 'Thick orange sauce, a small dish of pink-grey bagoong alongside.' }
      ]
    },
    core: {
      time: '3 hr 20 min',
      about: 'The published recipe. Both ground peanuts and peanut butter go in, and toasted ground rice gives the sauce its particular grainy body.',
      steps: [
        { t: 'Boil the water, add the oxtail and onions, and simmer 2½–3 hours until fully tender. In a pressure cooker, 35 minutes.', ic: 'simmer', min: 165, look: 'Meat falling away from the bone; a gelatinous, glossy broth.' },
        { t: 'Add the ground peanuts, peanut butter and the strained annatto water. Simmer 5–7 minutes.', ic: 'peanut', min: 6, look: 'Sauce turned burnt-orange and thickened to a loose gravy.' },
        { t: 'Stir in the toasted ground rice and simmer 5 minutes.', ic: 'rice', min: 5, look: 'Sauce visibly thicker with a slightly grainy texture.' },
        { t: 'In a separate pan, sauté the garlic, then add the banana flower, eggplant and string beans. Cook 5 minutes. Cooking them apart keeps them from muddying the sauce.', ic: 'pan', min: 5, look: 'Vegetables glossy and just softened, each still distinct.' },
        { t: 'Transfer the vegetables into the main pot.', ic: 'pot', look: 'Vegetables sitting in the orange sauce.' },
        { t: 'Add the bok choy and season with salt and pepper.', ic: 'leaf', min: 2, look: 'Leaves wilted, stems still crisp.' },
        { t: 'Serve hot with rice and a dish of shrimp paste.', ic: 'plate', look: 'Oxtail standing in thick orange sauce, bagoong on the side.' }
      ]
    },
    complex: {
      time: '5 hr',
      about: 'Everything from scratch: peanuts roasted and ground yourself, rice toasted and milled, oxtail browned before braising, and the braising liquid strained and reduced into the sauce.',
      drop: ['ground peanuts', 'toasted ground rice'],
      add: [
        { q: 2, u: 'cups', n: 'raw skin-on peanuts', note: 'to roast and grind', al: ['peanut'], sub: { peanut: 'raw sunflower seeds' } },
        { q: 0.5, u: 'cup', n: 'glutinous rice', note: 'to toast and grind' },
        { q: 2, u: '', n: 'beef marrow bones' },
        { q: 3, u: 'tbsp', n: 'beef tallow or neutral oil', note: 'for browning' },
        { q: 1, u: 'tbsp', n: 'calamansi juice', note: 'to finish' }
      ],
      steps: [
        { t: 'Roast the peanuts at 350°F / 175°C for 15 minutes, shaking once. Rub off the skins in a towel, then grind: half to a coarse meal, half to a smooth butter.', ic: 'oven', min: 15, look: 'Peanuts deep tan and fragrant; skins flaking off easily.' },
        { t: 'Toast the glutinous rice in a dry pan over medium heat 8–10 minutes until it is the colour of weak coffee, then grind it to a powder. Burnt rice ruins the whole pot, so pull it early.', ic: 'pan', min: 10, look: 'Even light-brown grains, smelling like popcorn.' },
        { t: 'Pat the oxtail dry and brown it hard in the tallow, in batches, 4 minutes a side. Crowding the pan steams the meat instead of browning it.', ic: 'flame', min: 16, look: 'Dark crust on every face, pan bottom deeply browned.' },
        { t: 'Roast the marrow bones alongside at 425°F / 220°C for 25 minutes, then add them to the pot.', ic: 'oven', min: 25, look: 'Bones browned, marrow bubbling and translucent.' },
        { t: 'Deglaze with a cup of water, scraping everything up. Add the onion, the oxtail and water to cover, and simmer very gently 3½ hours.', ic: 'simmer', min: 210, look: 'Barely moving surface; meat completely surrendered.' },
        { t: 'Lift out the meat. Strain the liquid, skim the fat, and reduce it to 4 cups.', ic: 'water', min: 20, look: 'Broth dark, glossy and lightly sticky on the lips.' },
        { t: 'Whisk the peanut butter, ground peanuts and annatto water into the reduced broth and simmer 10 minutes.', ic: 'whisk', min: 10, look: 'Smooth, deep orange, thick enough to mound on a spoon.' },
        { t: 'Rain in the toasted rice powder while whisking, then simmer 6 minutes.', ic: 'rice', min: 6, look: 'Sauce thickened to a gravy with a faint sandy texture.' },
        { t: 'Blanch each vegetable separately in salted water: banana flower 5 minutes, string beans 3, eggplant 4, bok choy 1. Shock the greens in ice water.', ic: 'pot', min: 13, look: 'Each vegetable at its own peak colour, none grey.' },
        { t: 'Return the oxtail to the sauce to warm through, then stir in the calamansi juice off the heat.', ic: 'citrus', min: 5, look: 'Sauce clinging to the meat in a thick coat.' },
        { t: 'Plate the oxtail, arrange the vegetables around it, spoon the sauce over, and serve with bagoong.', ic: 'plate', look: 'Deliberately arranged vegetables, deep orange sauce, glossy meat.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/kare-kare-recipe/' }
},

/* 7 ---------------------------------------------------------------- */
{
  id: 'pork-sisig',
  name: 'Pork Sisig',
  aka: 'Sizzling Pork Sisig',
  cat: 'main',
  region: 'Pampanga',
  icon: 'grill',
  serves: 5,
  blurb: 'Boiled, grilled, then chopped pork, dressed sour and rich and served on a screaming-hot plate. Kapampangan, and unapologetic.',
  nutr: { cal: 1237, pro: 40, fat: 115, carb: 7 },
  nutrNote: 'This is a genuinely rich dish — the figure includes pig ears, snout, belly and a mayonnaise dressing. The Healthier mode swaps most of that out.',
  keys: ['pig ears', 'pork belly', 'onion', 'mayonnaise', 'liver spread', 'calamansi', 'vinegar', 'bay leaves', 'ginger', 'chili'],
  ing: [
    { q: 1, u: 'lb', n: 'pig ears', an: 'meat', sub: { vg: 'king oyster mushrooms, torn', lite: 'omit and use all pork shoulder' } },
    { q: 1, u: 'lb', n: 'pig snout', an: 'meat', sub: { vg: 'firm tofu, pressed and cubed', lite: 'omit and use all pork shoulder' } },
    { q: 1, u: 'lb', n: 'pork belly', an: 'meat', sub: { vg: 'oyster mushrooms', lite: 'pork shoulder, trimmed' } },
    { q: 2, u: '', n: 'onions', note: 'minced' },
    { q: 3, u: '', n: 'bay leaves' },
    { q: 2, u: 'tsp', n: 'salt' },
    { q: 4, u: 'thumbs', n: 'ginger', note: 'crushed' },
    { q: 1, u: 'quart', n: 'water' },
    { q: 0.5, u: 'cup', n: 'mayonnaise', al: ['egg'], an: 'egg', sub: { egg: 'vegan mayonnaise', vg: 'vegan mayonnaise', lite: 'plain Greek yogurt' } },
    { q: 2, u: 'tbsp', n: 'sukang Iloko', note: 'or cane vinegar' },
    { q: 0.25, u: 'tsp', n: 'ground black pepper' },
    { q: 1, u: 'tsp', n: 'salt', note: 'for the dressing' },
    { q: 1, u: 'tsp', n: 'sugar', sub: { lite: 'omit' } },
    { q: 0.25, u: 'cup', n: 'liver spread', al: ['gluten'], an: 'meat', sub: { vg: 'mashed roasted eggplant with 1 tsp miso', gluten: 'pure liver pâté', lite: 'omit' } },
    { q: 2, u: '', n: 'limes', note: 'or 6 calamansi' },
    { q: 1, u: 'tbsp', n: 'liquid seasoning', al: ['gluten', 'soy'], sub: { gluten: 'tamari', soy: 'coconut aminos' } }
  ],
  tiers: {
    easy: {
      time: '1 hr 30 min',
      about: 'Pork belly only — no ears or snout — and broiled instead of grilled. All the flavour, none of the butchery.',
      drop: ['pig ears', 'pig snout'],
      steps: [
        { t: 'Simmer the pork belly in the water with the ginger, bay leaves and 2 tsp salt for 1 hour.', ic: 'pot', min: 60, look: 'Pork pale and soft; a fork slides in with no resistance.' },
        { t: 'Drain and pat completely dry, then broil skin-side up 8 minutes until charred in patches.', ic: 'oven', min: 8, look: 'Blistered, blackened edges and crisp spots.' },
        { t: 'Cool 10 minutes, then chop into small dice.', ic: 'knife', min: 10, look: 'Rough 1/4-inch pieces with crisp bits mixed through.' },
        { t: 'Whisk the mayonnaise, vinegar, pepper, salt, sugar and liquid seasoning together.', ic: 'whisk', look: 'A loose, pale dressing.' },
        { t: 'Toss the pork with the minced onion and the dressing. Squeeze the limes over and serve on a hot plate with rice.', ic: 'plate', look: 'Creamy-dressed pork with raw onion flecks, sizzling at the edges.' }
      ]
    },
    core: {
      time: '1 hr 45 min',
      about: 'The published Kapampangan method: boil the pig parts until tender, grill them for smoke and texture, then chop and dress. The three cuts give three different textures in one bite.',
      steps: [
        { t: 'Combine the pig ears, snout, pork belly, ginger, bay leaves, salt and water in a pot. Boil 1 hour.', ic: 'pot', min: 60, look: 'Cartilage in the ears gone translucent; everything fork-tender.' },
        { t: 'Remove from the pot and drain thoroughly. Let the pieces dry — wet pork will not take a char.', ic: 'timer', min: 15, look: 'Surfaces dull and dry to the touch.' },
        { t: 'Heat the grill and cook the pig parts about 5 minutes per side.', ic: 'grill', min: 10, look: 'Dark grill marks and crackling, bubbled skin.' },
        { t: 'Let them cool completely before chopping — hot pork tears instead of dicing.', ic: 'timer', min: 15, look: 'Pieces at room temperature, firm.' },
        { t: 'Mix all the dressing ingredients: mayonnaise, sukang Iloko, pepper, salt, sugar, liver spread and liquid seasoning.', ic: 'whisk', look: 'A smooth, grey-brown dressing.' },
        { t: 'Chop the grilled pork into small pieces.', ic: 'knife', look: 'Fine dice with visible crisp skin throughout.' },
        { t: 'In a large bowl, combine the chopped pork with the minced onion and the dressing. Toss until well blended.', ic: 'mix', look: 'Everything coated, onion evenly distributed.' },
        { t: 'Transfer to a serving plate, squeeze the limes over, and serve immediately.', ic: 'plate', look: 'Glossy chopped pork, bright with citrus.' }
      ]
    },
    complex: {
      time: '1 day + 2 hr 30 min',
      about: 'Restaurant sisig: the pork is brined, confited, pressed overnight, then deep-fried for maximum crunch, and the whole thing finishes on a cast-iron plate with a raw egg cracked over it at the table.',
      add: [
        { q: 0.25, u: 'cup', n: 'kosher salt', note: 'for the brine' },
        { q: 2, u: 'tbsp', n: 'sugar', note: 'for the brine' },
        { q: 4, u: 'cups', n: 'lard or neutral oil', note: 'for confit and frying', fixed: true },
        { q: 5, u: '', n: 'eggs', note: 'one per plate, cracked over at the table', al: ['egg'], an: 'egg', sub: { egg: 'omit', vg: 'omit' } },
        { q: 4, u: '', n: 'Thai chilies', note: 'finely chopped' },
        { q: 2, u: 'tbsp', n: 'chicharon', note: 'crushed, to finish' }
      ],
      steps: [
        { t: 'Brine the pork: dissolve the kosher salt and sugar in 1 quart water, submerge the pig parts, and refrigerate 12 hours.', ic: 'chill', min: 60, look: 'Pork fully submerged, flesh firmed and slightly paler.' },
        { t: 'Rinse and pat dry. Confit the pork in the lard with the ginger and bay leaves at 200°F / 93°C for 2 hours — in the oven is easiest.', ic: 'oven', min: 120, look: 'Fat barely trembling; pork completely tender and translucent.' },
        { t: 'Lift the pork out, press it flat between two trays with a weight on top, and chill overnight. Pressing gives you clean dice and even frying.', ic: 'chill', look: 'A firm, flat slab you can cut into neat cubes.' },
        { t: 'Cut into 1/2-inch cubes. Fry at 375°F / 190°C for 4–5 minutes until the edges are deep brown and crunchy.', ic: 'flame', min: 5, look: 'Audibly crisp cubes, dark at the corners.' },
        { t: 'Make the dressing: whisk the mayonnaise, liver spread, sukang Iloko, liquid seasoning, pepper, salt and sugar. Thin it with a tablespoon of the confit fat.', ic: 'whisk', look: 'Glossy dressing, the consistency of thin cream.' },
        { t: 'Chop the fried pork roughly — not evenly. The irregular pieces are what make the texture interesting.', ic: 'knife', look: 'A mix of fine bits and bigger crunchy chunks.' },
        { t: 'Heat cast-iron plates in a 500°F / 260°C oven for 15 minutes until they are genuinely dangerous.', ic: 'oven', min: 15, look: 'Plates faintly smoking, oil instantly shimmering on contact.' },
        { t: 'Toss the pork with the onion, chilies and just enough dressing to coat — too much and it steams rather than sizzles.', ic: 'mix', look: 'Lightly coated, not wet.' },
        { t: 'Mound onto the hot plates, scatter the chicharon, crack an egg into the centre, and bring it to the table still sizzling. The egg cooks in the residual heat as you stir.', ic: 'egg', look: 'Loud sizzle, egg white setting at the edges, steam rising.' },
        { t: 'Squeeze calamansi over at the table and stir everything together before eating.', ic: 'citrus', look: 'Egg streaked through the pork, everything glossy.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/pork-sisig/' }
},

/* 8 ---------------------------------------------------------------- */
{
  id: 'bistek-tagalog',
  name: 'Bistek Tagalog',
  aka: 'Filipino Beef Steak',
  cat: 'main',
  region: 'Luzon',
  icon: 'beef',
  serves: 5,
  blurb: 'Thin beef braised in soy and calamansi under a blanket of soft onion rings. Spanish bistec encebollado, rewritten for rice.',
  nutr: { cal: 279, pro: 31, fat: 15, carb: 1 },
  keys: ['beef', 'sirloin', 'soy sauce', 'calamansi', 'lemon', 'onion', 'garlic', 'pepper'],
  ing: [
    { q: 1.5, u: 'lbs', n: 'beef sirloin', note: 'thinly sliced', an: 'meat', sub: { vg: 'king oyster mushrooms, sliced thick', lite: 'beef sirloin, trimmed of all fat' } },
    { q: 5, u: 'tbsp', n: 'soy sauce', al: ['gluten', 'soy'], sub: { gluten: 'tamari', soy: 'coconut aminos', lite: 'low-sodium soy sauce' } },
    { q: 4, u: '', n: 'calamansi', note: 'or 1 lemon' },
    { q: 0.5, u: 'tsp', n: 'ground black pepper' },
    { q: 3, u: 'cloves', n: 'garlic', note: 'minced' },
    { q: 3, u: '', n: 'onions', note: 'sliced into rings' },
    { q: 4, u: 'tbsp', n: 'cooking oil', sub: { lite: 'cooking oil (use 1 1/2 tbsp)' } },
    { q: 1, u: 'cup', n: 'water' },
    { q: 1, u: 'pinch', n: 'salt' }
  ],
  tiers: {
    easy: {
      time: '40 min',
      about: 'A 20-minute marinade and one pan, with the onions cooked right in the sauce instead of separately. Less elegant, same dinner.',
      steps: [
        { t: 'Mix the soy sauce, calamansi juice and pepper. Add the beef and leave 20 minutes while you slice the onions.', ic: 'timer', min: 20, look: 'Beef darkened on the outside, sitting in shallow liquid.' },
        { t: 'Heat 2 tbsp oil in a pan over high heat. Lift the beef out of the marinade and sear it in a single layer, 1 minute a side. Keep the marinade.', ic: 'pan', min: 3, look: 'Brown edges on the beef; the pan should hiss, not steam.' },
        { t: 'Add the garlic and all the onion rings, and cook 4 minutes until they soften.', ic: 'onion', min: 4, look: 'Onions limp and translucent, starting to colour.' },
        { t: 'Pour in the reserved marinade and the water. Cover and simmer 15 minutes until the beef is tender.', ic: 'simmer', min: 15, look: 'A dark, slightly thickened sauce; beef soft to the bite.' },
        { t: 'Taste, add a pinch of salt if needed, and serve over rice.', ic: 'plate', look: 'Beef under a pile of soft onions, dark sauce pooling.' }
      ]
    },
    core: {
      time: '1 hr marinate + 35 min',
      about: 'The published recipe. Half the onions are fried and set aside to stay sweet and distinct; the other half melt into the sauce. That split is the whole trick of bistek.',
      steps: [
        { t: 'Marinate the beef in the soy sauce, calamansi juice and black pepper at least 1 hour — overnight is better.', ic: 'timer', min: 60, look: 'Beef deeply browned by the marinade, liquid gone slightly syrupy.' },
        { t: 'Heat the oil and pan-fry half the onion rings until soft. Set them aside — these go on top at the end.', ic: 'onion', min: 5, look: 'Rings soft and glassy with gold edges, still holding their shape.' },
        { t: 'Drain the beef and reserve the marinade. Pan-fry the beef 1 minute per side, then remove from the pan.', ic: 'pan', min: 3, look: 'Seared outside, still pink inside.' },
        { t: 'Add the remaining oil and sauté the garlic and the raw onions until soft.', ic: 'garlic', min: 4, look: 'Onions collapsing, garlic fragrant and pale gold.' },
        { t: 'Pour in the reserved marinade and the water. Bring to a boil.', ic: 'pot', min: 3, look: 'Dark liquid at a full boil, smelling of soy and citrus.' },
        { t: 'Return the beef, cover, and simmer until tender, adding water as needed.', ic: 'simmer', min: 20, look: 'Sauce reduced and glossy; beef yielding easily.' },
        { t: 'Season with pepper and salt to taste.', ic: 'shaker', look: 'Sauce tasting salty-sour-sweet, balanced.' },
        { t: 'Top with the reserved onion rings, cover 1 minute to steam them through, and serve hot with rice.', ic: 'plate', min: 1, look: 'Whole soft rings sitting on top, sauce underneath.' }
      ]
    },
    complex: {
      time: 'Overnight + 1 hr 15 min',
      about: 'Bistek treated like a steak: the beef is dry-brined and seared hard separately, the braising liquid becomes a pan sauce finished with butter, and the onions are cooked three ways.',
      add: [
        { q: 1, u: 'tsp', n: 'baking soda', note: 'for velveting the beef' },
        { q: 2, u: 'tbsp', n: 'butter', note: 'cold, to finish the sauce', al: ['dairy'], an: 'dairy', sub: { dairy: 'vegan butter', vg: 'vegan butter', lite: 'omit' } },
        { q: 1, u: '', n: 'red onion', note: 'thinly sliced raw, to finish' },
        { q: 2, u: 'tbsp', n: 'beef tallow', note: 'for searing' },
        { q: 0.5, u: 'cup', n: 'beef stock', an: 'meat', sub: { vg: 'mushroom stock' } }
      ],
      steps: [
        { t: 'Toss the sliced beef with the baking soda and leave 20 minutes, then rinse thoroughly and pat bone dry. This velveting step is why restaurant beef is tender in strips this thin.', ic: 'timer', min: 20, look: 'Beef slightly slippery before rinsing, matte and dry after.' },
        { t: 'Marinate overnight in the soy sauce, calamansi juice and pepper.', ic: 'chill', look: 'Beef uniformly dark, marinade thickened.' },
        { t: 'Caramelise one onion, sliced thin, in 1 tbsp oil over low heat for 30 minutes until jammy and brown. Do not rush this — high heat gives you burnt onion, not sweet onion.', ic: 'simmer', min: 30, look: 'A dark brown, sticky mass about a quarter of the original volume.' },
        { t: 'Fry the second onion in rings over medium-high heat 6 minutes until gold at the edges but still intact. Set aside.', ic: 'onion', min: 6, look: 'Distinct rings, gold-edged, still springy.' },
        { t: 'Pat the beef dry and sear it in the tallow in small batches over very high heat, 45 seconds a side. Dry beef and a hot pan are the only way to get a crust on meat this thin.', ic: 'flame', min: 6, look: 'A real brown crust; pan smoking lightly between batches.' },
        { t: 'Deglaze the pan with the reserved marinade and the beef stock, scraping up every browned bit. Add the caramelised onion.', ic: 'pot', min: 3, look: 'A dark, slightly thick sauce with onion suspended in it.' },
        { t: 'Simmer 12 minutes to reduce by a third, then return the beef for 3 minutes only — it is already cooked.', ic: 'simmer', min: 15, look: 'Sauce coating a spoon; beef warmed through, still tender.' },
        { t: 'Off the heat, swirl in the cold butter one cube at a time until the sauce turns glossy and slightly thick.', ic: 'whisk', look: 'Sauce visibly shinier and emulsified, no separated fat.' },
        { t: 'Plate the beef, spoon the sauce over, pile the fried rings on top, and finish with the raw red onion for bite.', ic: 'plate', look: 'Three onion textures visible: jammy in the sauce, soft rings, sharp raw slivers.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/bistek-tagalog-beefsteak-recipe/' }
}

);

window.RECIPES.push(

/* 9 ---------------------------------------------------------------- */
{
  id: 'beef-caldereta',
  name: 'Beef Caldereta',
  aka: 'Kalderetang Baka',
  cat: 'main',
  region: 'Nationwide',
  icon: 'pot',
  serves: 6,
  blurb: 'Short ribs stewed in tomato, red wine and liver spread with olives and peppers. The dish that shows up at fiestas.',
  nutr: { cal: 610, pro: 49, fat: 36, carb: 14 },
  keys: ['beef', 'short ribs', 'tomato sauce', 'red wine', 'potatoes', 'carrots', 'olives', 'bell peppers', 'liver spread', 'soy sauce', 'thyme'],
  ing: [
    { q: 4, u: 'lbs', n: 'beef short ribs', an: 'meat', sub: { vg: 'jackfruit and king oyster mushrooms', lite: 'beef chuck, trimmed' } },
    { q: 1, u: '', n: 'beef bouillon cube', al: ['gluten', 'soy'], an: 'meat', sub: { gluten: 'gluten-free beef bouillon', soy: 'soy-free beef bouillon, or 1 tsp salt plus 1/2 tsp smoked paprika', vg: 'mushroom bouillon' } },
    { q: 14, u: 'oz', n: 'tomato sauce' },
    { q: 1, u: 'cup', n: 'red wine', sub: { lite: 'beef stock' } },
    { q: 2, u: '', n: 'large potatoes', note: 'cubed' },
    { q: 1, u: '', n: 'large carrot', note: 'cubed' },
    { q: 1, u: 'cup', n: 'manzanilla olives' },
    { q: 2, u: '', n: 'bell peppers', note: 'sliced' },
    { q: 4, u: 'sprigs', n: 'thyme' },
    { q: 2, u: '', n: 'large onions', note: 'chopped' },
    { q: 1, u: 'head', n: 'garlic', note: 'chopped' },
    { q: 3, u: 'tbsp', n: 'soy sauce', al: ['gluten', 'soy'], sub: { gluten: 'tamari', soy: 'coconut aminos', lite: 'low-sodium soy sauce' } },
    { q: 0.5, u: 'cup', n: 'liver spread', al: ['gluten'], an: 'meat', sub: { vg: 'mashed roasted eggplant with 1 tsp miso', gluten: 'pure liver pâté', lite: 'omit, and thicken with 1 tbsp tomato paste' } },
    { q: 1, u: 'cup', n: 'water' },
    { q: 0.25, u: 'cup', n: 'extra virgin olive oil', sub: { lite: 'olive oil (use 1 tbsp)' } },
    { q: 0.5, u: 'cup', n: 'cheddar cheese', note: 'grated, to finish', al: ['dairy'], an: 'dairy', sub: { dairy: 'omit', vg: 'omit', lite: 'omit' } },
    { q: null, u: '', n: 'salt and ground black pepper', note: 'to taste' }
  ],
  tiers: {
    easy: {
      time: '2 hr',
      about: 'No pre-frying of vegetables, no wine, no liver spread — tomato paste does the thickening. Everything goes in and the oven or the stovetop does the rest.',
      drop: ['red wine', 'liver spread', 'thyme', 'cheddar cheese'],
      add: [{ q: 2, u: 'tbsp', n: 'tomato paste' }],
      steps: [
        { t: 'Brown the short ribs in the olive oil in a heavy pot, in batches, about 3 minutes a side.', ic: 'pan', min: 12, look: 'Deep brown crust on the meat; a dark film on the pot bottom.' },
        { t: 'Add the onion and garlic and cook 4 minutes until soft.', ic: 'onion', min: 4, look: 'Onions slumped and picking up the browned bits.' },
        { t: 'Stir in the tomato paste and cook 1 minute, then add the tomato sauce, soy sauce and water.', ic: 'pot', min: 2, look: 'Paste darkened from bright red to brick, then thinned by the sauce.' },
        { t: 'Cover and simmer 90 minutes until the beef is tender.', ic: 'simmer', min: 90, look: 'Meat shrinking from the bone, sauce reduced and glossy.' },
        { t: 'Add the potatoes and carrots; cook 15 minutes. Add the bell peppers and olives; cook 5 more.', ic: 'veg', min: 20, look: 'Potatoes tender to a knife, peppers still bright.' },
        { t: 'Season with salt and pepper and serve with rice.', ic: 'plate', look: 'Thick red-brown stew, vegetables intact.' }
      ]
    },
    core: {
      time: '2 hr 45 min',
      about: 'The published recipe. The carrots and potatoes are fried separately first so they hold their shape instead of disintegrating into the sauce over a long braise.',
      steps: [
        { t: 'Heat the olive oil in a pot and fry the carrots 2 minutes on all sides. Remove and set aside.', ic: 'pan', min: 2, look: 'Carrots lightly browned at the edges, still firm.' },
        { t: 'Fry the potatoes until the outer edges turn light brown. Remove and set aside.', ic: 'pan', min: 6, look: 'A thin gold crust on each cube.' },
        { t: 'Sauté the garlic, onion and thyme in the remaining oil until the onions caramelise.', ic: 'onion', min: 8, look: 'Onions gone soft, sweet-smelling and genuinely brown.' },
        { t: 'Add the beef short ribs and cook until the outer surface browns lightly.', ic: 'beef', min: 8, look: 'Colour on every face of the meat.' },
        { t: 'Pour in the tomato sauce and red wine, and add the beef cube.', ic: 'pot', min: 3, look: 'A deep red braising liquid, smelling strongly of wine.' },
        { t: 'Add the soy sauce and water. Cover and simmer on low heat until the beef is tender — about 1 hour 45 minutes.', ic: 'simmer', min: 105, look: 'Meat pulling off the bone; sauce thickened and darkened.' },
        { t: 'Stir in the liver spread and the bell peppers; cook 3 minutes. The liver spread is what thickens caldereta and gives it that particular savoury depth.', ic: 'mix', min: 3, look: 'Sauce visibly thicker and a shade browner.' },
        { t: 'Return the reserved carrots and potatoes; cook 3 minutes.', ic: 'veg', min: 3, look: 'Vegetables heated through, coated in sauce, still whole.' },
        { t: 'Add the cheddar cheese and season with salt and pepper to taste.', ic: 'shaker', min: 2, look: 'Cheese melted into the sauce, surface glossy.' },
        { t: 'Transfer to a serving plate and serve with plenty of rice.', ic: 'plate', look: 'Thick, rust-red stew with olives and peppers visible.' }
      ]
    },
    complex: {
      time: '4 hr 30 min',
      about: 'Caldereta as a braise with technique: short ribs brined and seared, a proper sofrito, the sauce strained and reduced separately, and the vegetables cooked apart and returned at the very end.',
      add: [
        { q: 2, u: 'tbsp', n: 'kosher salt', note: 'for the dry brine' },
        { q: 3, u: 'tbsp', n: 'tomato paste' },
        { q: 2, u: 'cups', n: 'beef stock', an: 'meat', sub: { vg: 'mushroom stock' } },
        { q: 2, u: '', n: 'dried bay leaves' },
        { q: 1, u: 'tbsp', n: 'smoked paprika' },
        { q: 2, u: '', n: 'roasted red peppers', note: 'peeled, for the sauce' }
      ],
      steps: [
        { t: 'Dry-brine the short ribs: rub with the kosher salt and rest uncovered in the fridge at least 4 hours, ideally overnight.', ic: 'chill', look: 'Surfaces tacky and dry, meat a deeper red.' },
        { t: 'Roast the bell peppers whole under a broiler until blackened, 12 minutes, then steam in a covered bowl and peel. Roasted peppers give the sauce a sweetness raw ones cannot.', ic: 'oven', min: 12, look: 'Skins blistered black and slipping off in sheets.' },
        { t: 'Sear the short ribs hard in the olive oil, 4 minutes a side, in batches. Set aside.', ic: 'flame', min: 16, look: 'Mahogany crust, fat rendered into the pot.' },
        { t: 'Build the sofrito: cook the onions in the rendered fat 12 minutes until deeply browned, then add the garlic, thyme and bay and cook 3 minutes.', ic: 'onion', min: 15, look: 'Onions jammy and brown, garlic fragrant but not burnt.' },
        { t: 'Add the tomato paste and smoked paprika; cook 3 minutes until the paste darkens and smells sweet rather than metallic.', ic: 'shaker', min: 3, look: 'Paste gone from bright red to deep brick, sticking to the pot.' },
        { t: 'Deglaze with the red wine and reduce by half, 8 minutes. Add the tomato sauce, beef stock and soy sauce.', ic: 'pot', min: 8, look: 'No raw wine smell left; sauce slightly syrupy.' },
        { t: 'Return the ribs, cover, and braise in a 300°F / 150°C oven for 3 hours.', ic: 'oven', min: 180, look: 'Meat completely tender; bones sliding out clean.' },
        { t: 'Lift the meat out. Strain the sauce, skim the fat, then blend it with the roasted peppers and the liver spread until smooth. Reduce to 3 cups.', ic: 'mix', min: 15, look: 'A smooth, glossy, deep red sauce that coats a spoon heavily.' },
        { t: 'Roast the potatoes and carrots separately at 425°F / 220°C for 25 minutes until browned at the edges.', ic: 'oven', min: 25, look: 'Crisp brown edges, tender centres.' },
        { t: 'Combine the meat, sauce, roasted vegetables and olives. Warm through 10 minutes and season.', ic: 'simmer', min: 10, look: 'Everything coated in a sauce thick enough to cling.' },
        { t: 'Serve with the cheese grated over at the table.', ic: 'plate', look: 'Glossy dark sauce, distinct vegetables, cheese just melting on contact.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/beef-caldereta-recipe/' }
},

/* 10 --------------------------------------------------------------- */
{
  id: 'chicken-afritada',
  name: 'Chicken Afritada',
  aka: 'Afritadang Manok',
  cat: 'main',
  region: 'Nationwide',
  icon: 'tomato',
  serves: 4,
  blurb: 'Chicken braised in tomato sauce with potato, carrot and peas. The gentlest of the Filipino tomato stews, and the one kids ask for.',
  nutr: { cal: 583, pro: 37, fat: 37, carb: 25 },
  keys: ['chicken', 'tomato sauce', 'potatoes', 'carrots', 'hotdogs', 'green peas', 'bay leaves', 'onion', 'garlic', 'chicken broth'],
  ing: [
    { q: 1.5, u: 'lbs', n: 'chicken', note: 'cut into serving pieces', an: 'meat', sub: { vg: 'firm tofu and mushrooms', lite: 'skinless chicken thighs' } },
    { q: 2, u: '', n: 'potatoes', note: 'cubed' },
    { q: 1, u: '', n: 'carrot', note: 'sliced' },
    { q: 8, u: 'oz', n: 'tomato sauce' },
    { q: 3, u: '', n: 'hotdogs', note: 'sliced', an: 'meat', sub: { vg: 'omit, or use plant-based sausage', lite: 'omit' } },
    { q: 0.5, u: 'cup', n: 'green peas' },
    { q: 3, u: '', n: 'bay leaves' },
    { q: 1, u: '', n: 'red onion', note: 'chopped' },
    { q: 2, u: 'tsp', n: 'garlic', note: 'minced' },
    { q: 3, u: 'cups', n: 'chicken broth', an: 'meat', sub: { vg: 'vegetable broth', lite: 'low-sodium chicken broth' } },
    { q: 0.5, u: 'tsp', n: 'sugar', sub: { lite: 'omit' } },
    { q: 3, u: 'tbsp', n: 'cooking oil', sub: { lite: 'cooking oil (use 1 tbsp)' } },
    { q: null, u: '', n: 'salt and ground black pepper', note: 'to taste' }
  ],
  tiers: {
    easy: {
      time: '45 min',
      about: 'One pot, no staging. The potatoes go in early with everything else — slightly softer, but one less thing to time.',
      drop: ['hotdogs'],
      steps: [
        { t: 'Heat the oil and cook the onion and garlic 3 minutes until soft.', ic: 'pan', min: 3, look: 'Onion translucent, garlic fragrant.' },
        { t: 'Add the chicken and brown it lightly, about 4 minutes.', ic: 'chicken', min: 4, look: 'Skin gold in patches.' },
        { t: 'Add the tomato sauce, broth, bay leaves and sugar. Bring to a boil.', ic: 'pot', min: 4, look: 'An orange-red sauce at a full boil.' },
        { t: 'Add the potatoes and carrot, cover, and simmer 30 minutes.', ic: 'simmer', min: 30, look: 'Potatoes soft enough to crush against the pot; sauce thickened.' },
        { t: 'Stir in the peas, cook 2 minutes, season with salt and pepper, and serve.', ic: 'plate', min: 2, look: 'Bright peas against a brick-red sauce.' }
      ]
    },
    core: {
      time: '55 min',
      about: 'The published recipe. The chicken simmers for half an hour before the vegetables go in, staged shortest-cooking last, so nothing turns to mush.',
      steps: [
        { t: 'Heat the oil in a pot and sauté the onion and garlic until softened.', ic: 'pan', min: 3, look: 'Onion glassy, no browning yet.' },
        { t: 'Add the chicken and cook 30 seconds per side — just a quick sear.', ic: 'chicken', min: 2, look: 'Surface whitened, edges barely gold.' },
        { t: 'Pour in the tomato sauce and broth. Cover and bring to a boil.', ic: 'pot', min: 5, look: 'Chicken submerged in orange-red liquid.' },
        { t: 'Add the bay leaves, reduce the heat, cover, and simmer 30 minutes.', ic: 'simmer', min: 30, look: 'Sauce reduced slightly, deeper red, chicken tender.' },
        { t: 'Add the hotdogs and carrot; cook 3 minutes.', ic: 'veg', min: 3, look: 'Hotdog slices curling at the edges.' },
        { t: 'Add the potato, cover, and cook 8 minutes.', ic: 'simmer', min: 8, look: 'Potato cubes tender but holding square edges.' },
        { t: 'Stir in the green peas and cook 2 minutes.', ic: 'veg', min: 2, look: 'Peas bright green, just heated through.' },
        { t: 'Season with salt and pepper to taste, and add the sugar to round out the tomato.', ic: 'shaker', look: 'Sauce tasting rounded rather than sharp.' },
        { t: 'Serve hot with rice.', ic: 'plate', look: 'Chicken in thick red sauce, vegetables distinct and colourful.' }
      ]
    },
    complex: {
      time: '1 hr 50 min',
      about: 'Afritada with a built sauce: fresh tomatoes roasted down with the canned, chicken browned properly and the skin crisped separately, and a sofrito base with pimiento.',
      add: [
        { q: 1.5, u: 'lbs', n: 'ripe tomatoes', note: 'halved, for roasting' },
        { q: 2, u: 'tbsp', n: 'tomato paste' },
        { q: 1, u: '', n: 'red bell pepper', note: 'roasted and peeled' },
        { q: 2, u: 'tbsp', n: 'butter', al: ['dairy'], an: 'dairy', sub: { dairy: 'olive oil', vg: 'olive oil', lite: 'olive oil' } },
        { q: 1, u: 'tsp', n: 'smoked paprika' },
        { q: 2, u: 'sprigs', n: 'oregano', note: 'fresh' }
      ],
      steps: [
        { t: 'Roast the fresh tomatoes and the bell pepper, cut side up, at 425°F / 220°C for 35 minutes until collapsed and lightly charred. Peel the pepper.', ic: 'oven', min: 35, look: 'Tomatoes shrunken with dark edges, juices caramelised in the tray.' },
        { t: 'Blend the roasted tomatoes and pepper with the canned tomato sauce until smooth, then pass it through a sieve.', ic: 'mix', look: 'A smooth, thick, deep-red purée with no seeds or skin.' },
        { t: 'Salt the chicken and pat it dry. Sear skin-side down in the oil 6 minutes without moving it, then 2 minutes on the other side. Set aside.', ic: 'flame', min: 8, look: 'Skin crisp and deep brown, releasing from the pan on its own.' },
        { t: 'Cook the onion in the rendered fat 8 minutes until browned, then add the garlic, oregano, bay and smoked paprika for 2 minutes.', ic: 'onion', min: 10, look: 'Onions brown and sweet, spices fragrant.' },
        { t: 'Add the tomato paste and cook 2 minutes until it darkens.', ic: 'shaker', min: 2, look: 'Paste brick-coloured and sticking slightly.' },
        { t: 'Add the tomato purée and the broth. Simmer 15 minutes to concentrate before any meat goes back in.', ic: 'simmer', min: 15, look: 'Sauce reduced by a quarter, visibly thicker.' },
        { t: 'Return the chicken skin-side up so the skin stays above the liquid. Simmer gently, uncovered, 30 minutes.', ic: 'pot', min: 30, look: 'Crisp skin still dry on top, meat tender underneath.' },
        { t: 'Meanwhile roast the potatoes and carrots in the butter at 425°F / 220°C for 25 minutes.', ic: 'oven', min: 25, look: 'Browned, crisp-edged vegetables.' },
        { t: 'Fold the roasted vegetables and the peas into the sauce and warm 5 minutes. Season.', ic: 'mix', min: 5, look: 'Vegetables glazed in sauce, peas bright.' },
        { t: 'Serve the chicken on top so the skin stays crisp, sauce and vegetables underneath.', ic: 'plate', look: 'Crackling skin above a deep red sauce, nothing soggy.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/chicken-afritada-recipe/' }
},

/* 11 --------------------------------------------------------------- */
{
  id: 'lechon-kawali',
  name: 'Lechon Kawali',
  aka: 'Crispy Fried Pork Belly',
  cat: 'main',
  region: 'Nationwide',
  icon: 'pork',
  serves: 6,
  blurb: 'Pork belly boiled until tender, dried, then deep-fried until the skin blisters. Four ingredients, one spectacular result.',
  nutr: { cal: 790, pro: 18, fat: 76, carb: 2 },
  nutrNote: 'The source figure of 1,784 kcal counts all 3 cups of frying oil. This estimate reflects a roughly 5 oz portion of belly with realistic oil uptake.',
  keys: ['pork belly', 'salt', 'peppercorns', 'bay leaves', 'oil', 'vinegar'],
  ing: [
    { q: 2, u: 'lbs', n: 'pork belly', note: 'skin on', an: 'meat', sub: { vg: 'pressed firm tofu, scored and fried', lite: 'pork shoulder (far leaner, but it will not blister the same way)' } },
    { q: 2, u: 'tbsp', n: 'salt', note: 'divided' },
    { q: 2, u: 'tbsp', n: 'whole peppercorns' },
    { q: 5, u: '', n: 'dried bay leaves' },
    { q: 3, u: 'cups', n: 'cooking oil', note: 'for deep frying', fixed: true },
    { q: 34, u: 'oz', n: 'water', note: 'enough to cover the pork', fixed: true }
  ],
  tiers: {
    easy: {
      time: '1 hr 15 min',
      about: 'Air fryer instead of a pot of hot oil. Less dramatic blistering, but no spattering and no 3 cups of oil to dispose of.',
      drop: ['cooking oil'],
      steps: [
        { t: 'Boil the pork belly in the water with 1 tbsp salt, the peppercorns and bay leaves for 40 minutes.', ic: 'pot', min: 40, look: 'Pork pale and soft; a skewer goes in with no resistance.' },
        { t: 'Drain and pat the pork very dry. Rub the remaining salt into the skin.', ic: 'shaker', look: 'Skin dry, matte, visibly salted.' },
        { t: 'Rest uncovered 20 minutes — the drier the skin, the better it puffs.', ic: 'timer', min: 20, look: 'Skin tightened and chalky-looking.' },
        { t: 'Air-fry skin-side up at 400°F / 200°C for 20–25 minutes until the skin is blistered and crisp.', ic: 'oven', min: 25, look: 'Skin puffed into bubbles, deep gold, crackling when tapped.' },
        { t: 'Rest 5 minutes, chop, and serve with a dipping sauce of vinegar, garlic and chili.', ic: 'plate', min: 5, look: 'Audibly crisp skin over a layer of soft fat and meat.' }
      ]
    },
    core: {
      time: '1 hr + 30 min drying',
      about: 'The published recipe: boil, dry, deep-fry at 350°F. The air-drying step between is the one people skip, and it is the one that decides whether the skin blisters.',
      steps: [
        { t: 'Bring the water to a boil in a deep pot.', ic: 'water', look: 'Full rolling boil.' },
        { t: 'Add the pork belly, 1 tbsp salt, the peppercorns and the bay leaves.', ic: 'pot', look: 'Pork fully submerged, peppercorns floating.' },
        { t: 'Simmer 30–45 minutes until the meat is fork-tender.', ic: 'simmer', min: 40, look: 'A fork slides in and out of the meat cleanly.' },
        { t: 'Remove the pork and let it cool on a wire rack.', ic: 'timer', min: 15, look: 'Steam stopped rising; surface no longer wet.' },
        { t: 'Rub the remaining 1 tbsp salt all over, especially into the skin.', ic: 'shaker', look: 'Visible salt crystals on dry skin.' },
        { t: 'Air-dry at least 30 minutes — overnight in the fridge for a crispier result.', ic: 'chill', min: 30, look: 'Skin stiff and papery to the touch.' },
        { t: 'Heat the oil to 350°F / 175°C in a deep pot or wok. Use a pot with high sides; this will spatter.', ic: 'flame', look: 'Oil shimmering, a drop of water spitting instantly.' },
        { t: 'Carefully lower the pork in, skin-side down, standing back as you do.', ic: 'pan', look: 'Violent bubbling around the pork for the first 30 seconds.' },
        { t: 'Fry 7–10 minutes, turning occasionally, until the skin is golden and crisp.', ic: 'pan', min: 10, look: 'Skin puffed and blistered, deep amber, no pale soft patches.' },
        { t: 'Transfer to a wire rack to drain.', ic: 'plate', look: 'Oil dripping off, skin staying crisp rather than steaming.' },
        { t: 'Rest 5 minutes before slicing, then serve with vinegar dip or lechon sauce.', ic: 'plate', min: 5, look: 'Clean cuts through crackling skin, juices still in the meat.' }
      ]
    },
    complex: {
      time: '2 days',
      about: 'The two-day version: brined, slow-braised in aromatics, pressed flat overnight, then fried in two stages. The press is what gives you even, geometric slices with a uniformly blistered sheet of skin.',
      add: [
        { q: 0.25, u: 'cup', n: 'kosher salt', note: 'for the brine' },
        { q: 2, u: 'tbsp', n: 'sugar', note: 'for the brine' },
        { q: 1, u: 'head', n: 'garlic', note: 'halved' },
        { q: 2, u: 'thumbs', n: 'ginger', note: 'sliced' },
        { q: 1, u: 'tbsp', n: 'baking soda', note: 'rubbed on the skin before frying' },
        { q: 0.5, u: 'cup', n: 'cane vinegar', note: 'for the dipping sauce' }
      ],
      steps: [
        { t: 'Day 1 — brine: dissolve the kosher salt and sugar in 2 quarts water. Submerge the belly and refrigerate 12 hours.', ic: 'chill', look: 'Pork fully covered, flesh firmed and a little paler.' },
        { t: 'Rinse, then braise: cover with fresh water and add the garlic, ginger, bay leaves, peppercorns and 1 tbsp salt. Simmer at a bare tremble 90 minutes. A hard boil tears the skin.', ic: 'simmer', min: 90, look: 'Barely moving liquid; skin intact and smooth, meat fully tender.' },
        { t: 'Lift the belly out flat, skin-side up. Press between two trays with weights and refrigerate overnight.', ic: 'chill', look: 'A flat, dense slab with a smooth even skin.' },
        { t: 'Day 2 — scrape the skin dry with the back of a knife, then rub on the baking soda and the remaining salt. The alkali helps the skin bubble rather than harden.', ic: 'knife', look: 'Skin very dry, faintly powdery, no moisture at all.' },
        { t: 'First fry: 275°F / 135°C for 12 minutes. This renders the fat beneath the skin without colouring it.', ic: 'pan', min: 12, look: 'Skin still pale but tightened; fat visibly rendering out.' },
        { t: 'Rest on a rack 20 minutes.', ic: 'timer', min: 20, look: 'Surface dry again, no steam.' },
        { t: 'Second fry: 400°F / 200°C for 4–5 minutes, until the skin blisters all over into small hard bubbles.', ic: 'flame', min: 5, look: 'The whole skin erupted into even blisters, deep amber.' },
        { t: 'Make the sauce: combine the cane vinegar with minced garlic, chopped chili, a pinch of sugar and cracked pepper.', ic: 'bottle', look: 'Sharp clear vinegar with garlic and chili suspended in it.' },
        { t: 'Rest 10 minutes, then cut into thick batons with a heavy knife, cutting through the skin side last.', ic: 'knife', min: 10, look: 'Clean square slices: crackling top, white fat, pink-brown meat.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/lechon-kawali/' }
},

/* 12 --------------------------------------------------------------- */
{
  id: 'arroz-caldo',
  name: 'Arroz Caldo',
  aka: 'Chicken Rice Porridge',
  cat: 'soup',
  region: 'Nationwide',
  icon: 'rice',
  serves: 6,
  blurb: 'Ginger-heavy chicken rice porridge, finished with toasted garlic, egg and spring onion. Breakfast, sick food, merienda, all at once.',
  nutr: { cal: 516, pro: 25, fat: 26, carb: 43 },
  keys: ['chicken', 'rice', 'glutinous rice', 'ginger', 'garlic', 'onion', 'egg', 'green onions', 'turmeric', 'safflower', 'fish sauce', 'calamansi'],
  ing: [
    { q: 2, u: 'lbs', n: 'chicken', note: 'cut into serving pieces', an: 'meat', sub: { vg: 'shiitake mushrooms and firm tofu', lite: 'skinless chicken thighs' } },
    { q: 0.75, u: 'cup', n: 'jasmine rice' },
    { q: 0.75, u: 'cup', n: 'glutinous rice', note: 'malagkit' },
    { q: 2, u: '', n: 'chicken bouillon cubes', al: ['gluten', 'soy'], an: 'meat', sub: { gluten: 'gluten-free bouillon', soy: 'soy-free bouillon, or 2 tsp salt plus 1 tsp garlic powder', vg: 'mushroom bouillon' } },
    { q: 34, u: 'oz', n: 'water' },
    { q: 8, u: 'cloves', n: 'garlic', note: 'chopped' },
    { q: 3, u: '', n: 'onions', note: 'chopped' },
    { q: 8, u: '', n: 'hard-boiled eggs', al: ['egg'], an: 'egg', sub: { egg: 'omit, and top with extra toasted garlic', vg: 'omit' } },
    { q: 1, u: 'cup', n: 'green onions', note: 'chopped' },
    { q: 3, u: 'thumbs', n: 'ginger', note: 'julienned' },
    { q: 1, u: 'tbsp', n: 'safflower', note: 'kasubha', sub: { gluten: 'safflower, or a pinch of saffron' } },
    { q: 1, u: 'tsp', n: 'turmeric powder' },
    { q: 5, u: 'tbsp', n: 'cooking oil', sub: { lite: 'cooking oil (use 2 tbsp)' } },
    { q: null, u: '', n: 'fish sauce and black pepper', note: 'to taste', al: ['fish'], an: 'fish', sub: { vg: 'light soy sauce and black pepper', fish: 'light soy sauce and black pepper' } }
  ],
  tiers: {
    easy: {
      time: '50 min',
      about: 'Plain jasmine rice, bouillon instead of a built broth, and the garlic fried at the start rather than separately. One pot, no fuss.',
      drop: ['glutinous rice', 'safflower'],
      steps: [
        { t: 'Heat 3 tbsp oil and fry the chopped garlic until gold. Scoop half out and save it for topping.', ic: 'garlic', min: 4, look: 'Garlic honey-coloured and crisp; oil fragrant.' },
        { t: 'Add the onions and ginger to the pot and cook 3 minutes.', ic: 'ginger', min: 3, look: 'Onions soft, ginger smelling sharp and clean.' },
        { t: 'Add the chicken and cook 4 minutes until it whitens.', ic: 'chicken', min: 4, look: 'No pink left on the surface.' },
        { t: 'Add the rice, water, bouillon cubes and turmeric. Bring to a boil.', ic: 'pot', min: 5, look: 'Yellow, cloudy liquid at a full boil.' },
        { t: 'Lower the heat and simmer 30 minutes, stirring every few minutes so the rice does not catch on the bottom.', ic: 'simmer', min: 30, look: 'Thick and porridge-like; a spoon stands up briefly before falling.' },
        { t: 'Season with fish sauce and pepper. Top with the reserved garlic, green onions and a hard-boiled egg half. Serve with calamansi.', ic: 'plate', look: 'Golden porridge, crisp garlic on top, egg halves, green onion.' }
      ]
    },
    core: {
      time: '1 hr',
      about: 'The published recipe. Two rices — jasmine for body, glutinous for the silky thickness — and the garlic is fried first and saved as a topping, which is the single thing that makes arroz caldo taste like arroz caldo.',
      steps: [
        { t: 'Heat the oil in a wok and slowly fry the garlic until golden brown. Lift it out and set aside. Low and slow — fast garlic burns.', ic: 'garlic', min: 6, look: 'Uniformly gold chips, no dark edges; oil deeply fragrant.' },
        { t: 'Sauté the onions in the remaining oil until soft, then add the ginger and sauté 1 minute.', ic: 'ginger', min: 5, look: 'Onions translucent, ginger just softened.' },
        { t: 'Add the chicken and sauté until the exterior browns, then pour in 2 tbsp fish sauce.', ic: 'chicken', min: 6, look: 'Light brown patches on the chicken, a savoury glaze in the pan.' },
        { t: 'Add both rices and sauté 30 seconds to coat every grain in fat.', ic: 'rice', min: 1, look: 'Grains glossy and separate, slightly translucent at the edges.' },
        { t: 'Pour in the water and bring to a boil.', ic: 'water', min: 6, look: 'Full boil, rice beginning to move in the pot.' },
        { t: 'Add the bouillon cubes, reduce the heat to low, and simmer 35 minutes or more, stirring occasionally.', ic: 'simmer', min: 35, look: 'Grains burst and creamy; the porridge falls slowly off a spoon.' },
        { t: 'Add the turmeric and safflower and stir well.', ic: 'shaker', look: 'Colour shifting to a warm gold-yellow.' },
        { t: 'Season with black pepper and more fish sauce to taste.', ic: 'bottle', look: 'Tastes savoury and gingery, not bland or starchy.' },
        { t: 'Top with the hard-boiled eggs, the toasted garlic and the green onions.', ic: 'egg', look: 'Clear layers of toppings over gold porridge.' },
        { t: 'Serve with calamansi halves and extra fish sauce on the side.', ic: 'citrus', look: 'A bowl with everything visible on top, citrus alongside.' }
      ]
    },
    complex: {
      time: '2 hr 30 min',
      about: 'Built on a real chicken stock, with the chicken poached and shredded separately so the breast stays tender, schmaltz rendered for the garlic oil, and soft-boiled eggs instead of hard.',
      drop: ['chicken bouillon cubes', 'hard-boiled eggs'],
      add: [
        { q: 1, u: '', n: 'whole chicken', note: '3–4 lbs, for poaching and shredding', an: 'meat', sub: { vg: 'mushroom and kombu stock with tofu' } },
        { q: 10, u: 'cups', n: 'water', note: 'for the stock' },
        { q: 6, u: '', n: 'eggs', note: 'for soft-boiling', al: ['egg'], an: 'egg', sub: { egg: 'omit', vg: 'omit' } },
        { q: 4, u: 'oz', n: 'chicken skin and fat', note: 'to render into schmaltz', an: 'meat', sub: { vg: 'neutral oil' } },
        { q: 1, u: 'tbsp', n: 'calamansi juice', note: 'to finish' }
      ],
      steps: [
        { t: 'Render the schmaltz: cook the chopped chicken skin and fat with 2 tbsp water in a pan over low heat 25 minutes until the fat runs clear and the skin turns to cracklings. Strain, keeping both.', ic: 'simmer', min: 25, look: 'Clear gold fat in the pan, crisp brown skin bits.' },
        { t: 'Poach the whole chicken in the 10 cups water with half the ginger and one onion, at a bare simmer, 45 minutes. Lift out and shred the meat; return the bones to the pot.', ic: 'simmer', min: 45, look: 'Clear stock; meat pulling off in long strands.' },
        { t: 'Simmer the bones another 45 minutes, then strain. You want about 8 cups of real stock.', ic: 'pot', min: 45, look: 'Deep gold stock with body; it should feel slightly sticky.' },
        { t: 'Fry the garlic slowly in the schmaltz until gold, 7 minutes. Strain out the chips and keep both the oil and the chips.', ic: 'garlic', min: 7, look: 'Even gold chips; richly fragrant chicken-garlic oil.' },
        { t: 'Soft-boil the eggs exactly 6½ minutes, then plunge into ice water and peel.', ic: 'egg', min: 7, look: 'Set whites, a jammy orange centre when halved.' },
        { t: 'Sweat the remaining onion and ginger in 2 tbsp of the garlic oil 5 minutes, then toast both rices 2 minutes.', ic: 'rice', min: 7, look: 'Grains coated and faintly nutty-smelling.' },
        { t: 'Add the stock a few cups at a time, stirring often, over 40 minutes. Feeding the liquid gradually gives a creamier porridge than dumping it all in.', ic: 'simmer', min: 40, look: 'Glossy, thick porridge that ripples slowly.' },
        { t: 'Stir in the turmeric and safflower, then the shredded chicken. Season with fish sauce and pepper.', ic: 'shaker', min: 5, look: 'Gold porridge studded with shredded meat.' },
        { t: 'Finish off the heat with the calamansi juice.', ic: 'citrus', look: 'Smell turns bright; flavour sharpens.' },
        { t: 'Ladle into bowls and top with a halved soft egg, toasted garlic chips, cracklings and green onion.', ic: 'plate', look: 'A jammy egg centre, crisp gold garlic, green onion, deep gold porridge.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/arroz-caldo/' }
},

/* 13 --------------------------------------------------------------- */
{
  id: 'laing',
  name: 'Laing',
  aka: 'Taro Leaves in Coconut Milk',
  cat: 'veg',
  region: 'Bicol',
  icon: 'leaf',
  serves: 8,
  blurb: 'Dried taro leaves simmered down in coconut milk with chili and shrimp paste until almost black and intensely rich. Bicolano, and properly spicy.',
  nutr: { cal: 618, pro: 18, fat: 59, carb: 12 },
  keys: ['taro leaves', 'coconut milk', 'coconut cream', 'shrimp paste', 'pork', 'chili', 'onion', 'ginger', 'garlic'],
  ing: [
    { q: 3.5, u: 'oz', n: 'dried taro leaves' },
    { q: 6, u: 'cups', n: 'coconut milk' },
    { q: 2, u: 'cups', n: 'coconut cream' },
    { q: 0.5, u: 'cup', n: 'shrimp paste', note: 'bagoong or balaw', al: ['shellfish', 'fish'], an: 'seafood', sub: { shellfish: 'fermented black bean paste or white miso', vg: 'fermented black bean paste or white miso', fish: 'white miso' } },
    { q: 0.5, u: 'lb', n: 'pork shoulder', note: 'thinly sliced', an: 'meat', sub: { vg: 'omit, or use chopped king oyster mushrooms', lite: 'omit' } },
    { q: 6, u: '', n: 'red chilies' },
    { q: 1, u: '', n: 'onion', note: 'sliced' },
    { q: 0.5, u: 'cup', n: 'ginger', note: 'sliced' },
    { q: 8, u: 'cloves', n: 'garlic', note: 'crushed' }
  ],
  tiers: {
    easy: {
      time: '45 min',
      about: 'Canned coconut milk, no pork, and fewer chilies. The one rule that still applies: do not stir the leaves early.',
      drop: ['pork shoulder', 'coconut cream'],
      add: [{ q: 2, u: 'cups', n: 'coconut milk', note: 'extra, to replace the cream' }],
      steps: [
        { t: 'Put the coconut milk, shrimp paste, ginger, onion and garlic in a pot and bring to a boil.', ic: 'pot', min: 6, look: 'Milk simmering, smelling strongly of ginger and bagoong.' },
        { t: 'Simmer 10 minutes to build the base.', ic: 'simmer', min: 10, look: 'Slightly reduced; a thin layer of coconut oil at the edges.' },
        { t: 'Add the dried taro leaves on top. Do NOT stir — stirring taro leaves before they soften makes the dish itchy in the throat.', ic: 'leaf', look: 'Dry leaves sitting on the surface, slowly darkening as they drink the milk.' },
        { t: 'Simmer 20 minutes, pushing the leaves down gently but never stirring.', ic: 'simmer', min: 20, look: 'Leaves collapsed, dark green-black, mostly submerged.' },
        { t: 'Now stir, add the chilies, and cook 8 minutes until thick.', ic: 'chili', min: 8, look: 'Thick, dark, oily — the coconut oil should be visibly separating.' },
        { t: 'Serve with rice.', ic: 'plate', look: 'Almost-black leaves in glossy coconut oil.' }
      ]
    },
    core: {
      time: '1 hr 20 min',
      about: 'The published recipe. Coconut milk first, cream at the end, and a long hands-off stretch while the leaves absorb everything. The coconut oil separating out at the end is the sign it is done.',
      steps: [
        { t: 'Combine the coconut milk, pork, shrimp paste, ginger, onion and garlic in a pot. Heat and bring to a boil.', ic: 'pot', min: 8, look: 'Milk at a boil, pork turning pale, strongly aromatic.' },
        { t: 'Once boiling, stir gently and cover. Simmer 15–20 minutes, stirring occasionally.', ic: 'simmer', min: 18, look: 'Pork tender, liquid reduced slightly and tinted grey-brown.' },
        { t: 'Add the dried taro leaves WITHOUT stirring. Let them absorb the coconut milk for 20–30 minutes, gently pushing them down as needed.', ic: 'leaf', min: 25, look: 'Leaves gone from papery and grey to dark, soft and glossy.' },
        { t: 'Now stir the leaves through and cook 10 minutes.', ic: 'mix', min: 10, look: 'A uniform dark mass; liquid thickened around it.' },
        { t: 'Pour in the coconut cream, add the red chilies, stir, and cook 10–12 minutes.', ic: 'coconut', min: 12, look: 'Very thick and glossy; clear coconut oil pooling at the sides.' },
        { t: 'Transfer to a serving plate and serve with hot rice.', ic: 'plate', look: 'Near-black leaves sitting in visible coconut oil, whole chilies on top.' }
      ]
    },
    complex: {
      time: '2 hr 30 min',
      about: 'Coconut milk pressed fresh from grated coconut — the first press becomes the cream, the second the milk — and the aromatics are toasted first. Fresh coconut is what separates everyday laing from Bicolano laing.',
      drop: ['coconut milk', 'coconut cream'],
      add: [
        { q: 3, u: '', n: 'mature coconuts', note: 'grated, for fresh kakang gata' },
        { q: 6, u: 'cups', n: 'warm water', note: 'for pressing the coconut' },
        { q: 8, u: '', n: 'siling labuyo', note: "bird's eye chilies, chopped" },
        { q: 2, u: 'tbsp', n: 'cane vinegar' },
        { q: 1, u: 'tsp', n: 'whole black peppercorns', note: 'cracked' }
      ],
      steps: [
        { t: 'First press: knead 2 cups warm water into the grated coconut and squeeze hard through muslin. This thick first extraction is kakang gata — your cream. Set it aside.', ic: 'coconut', min: 15, look: 'Thick, opaque, almost paint-like white liquid.' },
        { t: 'Second and third press: repeat with the remaining 4 cups water to get the thinner coconut milk.', ic: 'coconut', min: 10, look: 'Thinner, bluish-white liquid, clearly lighter than the first press.' },
        { t: 'Toast the cracked peppercorns and the ginger in a dry pot 2 minutes until fragrant.', ic: 'pan', min: 2, look: 'Ginger edges curling, pepper smelling woody.' },
        { t: 'Add the garlic and onion and cook 4 minutes, then the pork, and brown it 6 minutes.', ic: 'pork', min: 10, look: 'Pork browned at the edges, aromatics golden.' },
        { t: 'Add the shrimp paste and fry 2 minutes until it darkens and stops smelling raw. Frying the bagoong rather than boiling it changes the whole dish.', ic: 'shaker', min: 2, look: 'Paste darkened to a rust brown, intensely savoury smell.' },
        { t: 'Pour in the thin coconut milk and simmer 25 minutes until the pork is tender and the liquid has reduced by a third.', ic: 'simmer', min: 25, look: 'Reduced, slightly thickened, pork soft.' },
        { t: 'Lay the dried taro leaves on top and leave them absolutely alone for 30 minutes at a bare simmer.', ic: 'leaf', min: 30, look: 'Leaves fully collapsed and dark, liquid much reduced.' },
        { t: 'Stir through, then add the kakang gata and the siling labuyo. Simmer 25 minutes on low, stirring now and then.', ic: 'simmer', min: 25, look: 'Very thick; coconut oil separating into clear pools.' },
        { t: 'Finish with the cane vinegar off the heat — it cuts the fat and sharpens everything.', ic: 'bottle', look: 'Smell brightens; the dish tastes less heavy.' },
        { t: 'Rest 10 minutes before serving. Laing is better after it sits.', ic: 'timer', min: 10, look: 'Oil risen to the surface, leaves dense and dark.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/laing-recipe/' }
},

/* 14 --------------------------------------------------------------- */
{
  id: 'chicken-inasal',
  name: 'Chicken Inasal',
  aka: 'Ilonggo Grilled Chicken',
  cat: 'main',
  region: 'Bacolod / Negros',
  icon: 'grill',
  serves: 4,
  blurb: 'Grilled chicken with no soy sauce in sight — calamansi, vinegar and lemongrass, basted with annatto oil until it glows orange.',
  nutr: { cal: 377, pro: 38, fat: 22, carb: 7 },
  nutrNote: 'The source lists 1 g protein per serving, which is clearly a data entry error for a quarter chicken. Corrected here to roughly 38 g.',
  keys: ['chicken', 'calamansi', 'vinegar', 'lemongrass', 'ginger', 'garlic', 'annatto', 'achuete', 'margarine', 'bay leaves'],
  ing: [
    { q: 4, u: 'cups', n: 'water', note: 'for the brine' },
    { q: 5, u: 'cups', n: 'ice cubes', note: 'for the brine' },
    { q: 0.25, u: 'cup', n: 'salt', note: 'for the brine' },
    { q: 1, u: 'tbsp', n: 'sugar', note: 'for the brine' },
    { q: 5, u: '', n: 'dried bay leaves' },
    { q: 1, u: '', n: 'whole chicken', note: 'quartered', an: 'meat', sub: { vg: 'thick-cut king oyster mushrooms or cauliflower steaks', lite: 'skinless chicken thighs' } },
    { q: 1, u: 'tbsp', n: 'garlic paste' },
    { q: 1, u: 'tbsp', n: 'ginger paste' },
    { q: 1, u: 'tbsp', n: 'lemongrass paste' },
    { q: 3, u: 'tbsp', n: 'calamansi juice' },
    { q: 3, u: 'tbsp', n: 'vinegar' },
    { q: 0.5, u: 'tsp', n: 'ground black pepper' },
    { q: 0.25, u: 'tsp', n: 'salt' },
    { q: 1, u: 'cup', n: 'lemon-lime soda', sub: { lite: 'sparkling water with 1 tsp sugar' } },
    { q: 0.5, u: 'cup', n: 'chicken oil', note: 'annatto-infused', an: 'meat', sub: { vg: 'annatto-infused vegetable oil', lite: 'annatto-infused vegetable oil (use 1/4 cup)' } },
    { q: 3, u: 'tbsp', n: 'margarine', note: 'melted', al: ['dairy'], sub: { dairy: 'annatto oil', lite: 'omit' } }
  ],
  tiers: {
    easy: {
      time: '3 hr marinate + 30 min',
      about: 'Skip the brine, use chicken thighs, and broil or pan-grill indoors. The marinade is doing most of the work anyway.',
      drop: ['water', 'ice cubes', 'salt', 'sugar', 'chicken oil'],
      add: [{ q: 0.33, u: 'cup', n: 'vegetable oil', note: 'simmered 5 min with 2 tsp annatto seeds, then strained' }],
      steps: [
        { t: 'Mix the garlic, ginger and lemongrass pastes with the calamansi juice, vinegar, pepper, salt and soda.', ic: 'whisk', look: 'A cloudy, fragrant marinade.' },
        { t: 'Add the chicken thighs, cover, and refrigerate at least 3 hours.', ic: 'chill', min: 60, look: 'Chicken submerged, surface slightly opaque from the acid.' },
        { t: 'Make the annatto oil: warm the oil with the annatto seeds 5 minutes on low, then strain out the seeds.', ic: 'simmer', min: 5, look: 'Oil a vivid orange-red, seeds removed.' },
        { t: 'Pat the chicken dry and grill or broil 6–7 minutes a side, basting with annatto oil at every turn.', ic: 'grill', min: 14, look: 'Orange-glazed, charred in patches, juices running clear.' },
        { t: 'Rest 5 minutes and serve with rice, the remaining annatto oil, and a dip of vinegar, soy and chili.', ic: 'plate', min: 5, look: 'Glossy orange skin, visible grill marks.' }
      ]
    },
    core: {
      time: '90 min brine + 3 hr marinate + 30 min',
      about: 'The published Ilonggo method. The brine seasons the bird all the way through before the acidic marinade goes anywhere near it — brine first, then marinade, never both at once.',
      steps: [
        { t: 'Combine the water, salt, sugar and bay leaves in a saucepan and bring to a boil.', ic: 'pot', min: 5, look: 'Salt and sugar fully dissolved, no grit at the bottom.' },
        { t: 'Pour it over the ice cubes in a large bowl and let it cool completely. Never put chicken into warm brine.', ic: 'chill', min: 15, look: 'Brine cold to the touch, ice mostly melted.' },
        { t: 'Soak the chicken in the brine 90 minutes, then drain and pat dry.', ic: 'timer', min: 90, look: 'Chicken plumped and firm, skin taut.' },
        { t: 'Mix the garlic, ginger and lemongrass pastes with the calamansi juice, vinegar, pepper, salt and lemon-lime soda.', ic: 'whisk', look: 'A pale, fragrant, slightly fizzy marinade.' },
        { t: 'Add the chicken to the marinade and refrigerate at least 3 hours.', ic: 'chill', min: 60, look: 'Chicken fully coated, flesh firmed by the acid.' },
        { t: 'Grill the chicken until the internal temperature reaches 165°F / 74°C, turning regularly.', ic: 'grill', min: 25, look: 'Charred edges, skin tight and glossy, clear juices.' },
        { t: 'Baste with the marinade early on, then switch to the chicken oil and melted margarine for the last few turns. Switching late keeps the oil from burning off.', ic: 'bottle', look: 'Deep orange sheen building on the skin.' },
        { t: 'Rest 5 minutes before serving with rice and annatto oil to spoon over.', ic: 'plate', min: 5, look: 'Orange-lacquered chicken, juices pooling.' }
      ]
    },
    complex: {
      time: '1 day + 1 hr',
      about: 'Fresh aromatics pounded to a paste instead of jarred, real chicken oil rendered from skin with annatto, an overnight marinade, and grilling over charcoal with a lemongrass basting brush.',
      drop: ['garlic paste', 'ginger paste', 'lemongrass paste', 'chicken oil'],
      add: [
        { q: 6, u: 'stalks', n: 'fresh lemongrass', note: '4 pounded, 2 bruised as a basting brush' },
        { q: 1, u: 'head', n: 'garlic', note: 'peeled' },
        { q: 3, u: 'thumbs', n: 'fresh ginger', note: 'peeled' },
        { q: 6, u: 'oz', n: 'chicken skin and fat', note: 'to render', an: 'meat', sub: { vg: 'vegetable oil' } },
        { q: 3, u: 'tbsp', n: 'annatto seeds' },
        { q: 12, u: '', n: 'calamansi', note: 'freshly squeezed' }
      ],
      steps: [
        { t: 'Pound the garlic, ginger and the white parts of 4 lemongrass stalks in a mortar to a rough paste. Pounded aromatics release oils that a blender shears away.', ic: 'mortar', min: 10, look: 'A fibrous, fragrant pale paste, not a smooth purée.' },
        { t: 'Brine the chicken 90 minutes in the cooled salt-sugar-bay brine, then dry it thoroughly.', ic: 'timer', min: 90, look: 'Firm, plump chicken with dry skin.' },
        { t: 'Marinate overnight in the pounded paste, fresh calamansi juice, vinegar, soda, pepper and salt.', ic: 'chill', look: 'Chicken coated in visible aromatics, flesh opaque at the surface.' },
        { t: 'Render the chicken oil: cook the chopped skin and fat with 2 tbsp water over low heat 25 minutes, then add the annatto seeds and steep off the heat 10 minutes. Strain.', ic: 'simmer', min: 35, look: 'Brilliant orange-red fat, crisp cracklings left behind.' },
        { t: 'Light a charcoal fire and let it burn down to even grey coals. Flames scorch; coals cook.', ic: 'flame', min: 25, look: 'Coals ashed over grey with an orange glow underneath, no flames.' },
        { t: 'Bruise the 2 remaining lemongrass stalks at one end to make a basting brush.', ic: 'knife', look: 'A frayed, fibrous brush end.' },
        { t: 'Grill skin-side up first over medium coals 12 minutes, then flip and grill 10 more, basting with the annatto chicken oil using the lemongrass brush at every turn.', ic: 'grill', min: 22, look: 'Deep orange, lightly charred at the edges, skin rendered and tight.' },
        { t: 'Move to the cooler side of the grill and cook to an internal 165°F / 74°C.', ic: 'timer', min: 10, look: 'Thermometer reading 165°F at the thickest part of the thigh.' },
        { t: 'Rest 8 minutes. Serve with garlic rice, a bowl of annatto oil, and a dip of vinegar, calamansi, chili and chopped garlic.', ic: 'plate', min: 8, look: 'Glowing orange skin, juices held in the meat, smoke still on it.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/grilled-chicken-inasal-recipe/' }
},

/* 15 --------------------------------------------------------------- */
{
  id: 'ginisang-monggo',
  name: 'Ginisang Monggo',
  aka: 'Sautéed Mung Beans',
  cat: 'veg',
  region: 'Nationwide',
  icon: 'sprout',
  serves: 6,
  blurb: 'Mung beans simmered soft and sautéed with garlic, tomato and greens. Friday food, cheap food, and quietly one of the best things in the cuisine.',
  nutr: { cal: 337, pro: 21, fat: 11, carb: 41 },
  keys: ['mung beans', 'monggo', 'pork', 'shrimp', 'spinach', 'malunggay', 'tomato', 'onion', 'garlic', 'fish sauce', 'chicharon'],
  ing: [
    { q: 1.5, u: 'cups', n: 'mung beans' },
    { q: 1, u: 'tbsp', n: 'garlic', note: 'minced' },
    { q: 0.5, u: 'lb', n: 'pork', note: 'thinly sliced', an: 'meat', sub: { vg: 'omit, or use smoked tofu', lite: 'lean pork loin' } },
    { q: 2, u: 'cups', n: 'spinach', note: 'or alugbati' },
    { q: 1, u: '', n: 'medium tomato', note: 'chopped' },
    { q: 1, u: '', n: 'medium onion', note: 'chopped' },
    { q: 8, u: '', n: 'shrimp', note: 'optional', al: ['shellfish'], an: 'seafood', sub: { shellfish: 'omit', vg: 'omit' } },
    { q: 2, u: 'tbsp', n: 'fish sauce', al: ['fish'], an: 'fish', sub: { vg: 'light soy sauce or miso', fish: 'light soy sauce', lite: 'fish sauce (use 1 tbsp)' } },
    { q: 24, u: 'oz', n: 'water', note: 'for boiling the beans' },
    { q: 1, u: '', n: 'beef bouillon cube', al: ['gluten', 'soy'], an: 'meat', sub: { gluten: 'gluten-free bouillon', soy: 'soy-free bouillon, or 1 tsp salt plus 1/2 tsp onion powder', vg: 'mushroom bouillon' } },
    { q: 0.5, u: 'cup', n: 'crushed pork rinds', note: 'chicharon', an: 'meat', sub: { vg: 'toasted garlic chips', lite: 'omit' } },
    { q: 0.25, u: 'tsp', n: 'ground black pepper' }
  ],
  tiers: {
    easy: {
      time: '1 hr',
      about: 'Beans and sofrito in the same pot, no pork, no shrimp. Fully vegetarian as written if you swap the fish sauce.',
      drop: ['pork', 'shrimp', 'crushed pork rinds'],
      steps: [
        { t: 'Rinse the mung beans and boil them in the water 40 minutes until soft and starting to break apart.', ic: 'pot', min: 40, look: 'Beans split open, liquid thickened and cloudy.' },
        { t: 'In the same pot, push the beans aside and cook the garlic, onion and tomato right in the liquid 5 minutes.', ic: 'tomato', min: 5, look: 'Tomato collapsed, onion soft.' },
        { t: 'Add the bouillon cube and fish sauce, and simmer 5 minutes.', ic: 'shaker', min: 5, look: 'Broth savoury and slightly thickened.' },
        { t: 'Stir in the spinach and the black pepper, cook 1 minute, and serve with rice.', ic: 'leaf', min: 1, look: 'Wilted bright greens in a thick golden stew.' }
      ]
    },
    core: {
      time: '1 hr 15 min',
      about: 'The published recipe. The beans boil in one pot while the sofrito and pork build flavour in another — combining them late keeps the beans creamy and the pork from going grey.',
      steps: [
        { t: 'Boil the water in a pan, add the mung beans, and simmer 35–50 minutes until soft.', ic: 'pot', min: 45, look: 'Beans collapsing; liquid thick and starchy.' },
        { t: 'In a separate pan, sauté the garlic, onion and tomato.', ic: 'tomato', min: 5, look: 'Tomato broken down into a rough sauce.' },
        { t: 'Add the pork and cook 5 minutes.', ic: 'pork', min: 5, look: 'Pork opaque with browned edges.' },
        { t: 'Add the bouillon cube and fish sauce, and simmer 10 minutes until the meat is tender.', ic: 'simmer', min: 10, look: 'A dark, savoury base; pork tender.' },
        { t: 'Add the shrimp, stir, and cook 2 minutes.', ic: 'shrimp', min: 2, look: 'Shrimp pink and curled.' },
        { t: 'Pour in the cooked mung beans, stir, and simmer 10 minutes.', ic: 'mix', min: 10, look: 'A thick, uniform golden stew.' },
        { t: 'Add the spinach and the crushed pork rinds.', ic: 'leaf', min: 2, look: 'Greens wilted; chicharon softening into the stew.' },
        { t: 'Sprinkle with black pepper and serve hot with rice.', ic: 'plate', look: 'Thick stew with visible greens, chicharon on top.' }
      ]
    },
    complex: {
      time: '2 hr',
      about: 'Beans cooked in a pork broth rather than water, a proper sofrito, and smoked pork for depth — plus crisp garlic and chicharon added only at the table so they stay crunchy.',
      add: [
        { q: 1, u: 'lb', n: 'smoked pork hock', note: 'for the broth', an: 'meat', sub: { vg: 'smoked paprika and dried shiitake' } },
        { q: 6, u: 'cups', n: 'water', note: 'for the broth' },
        { q: 1, u: 'cup', n: 'malunggay leaves', note: 'in addition to the spinach' },
        { q: 3, u: 'tbsp', n: 'neutral oil', note: 'for the garlic chips' },
        { q: 1, u: 'head', n: 'garlic', note: 'sliced, for crisping' },
        { q: 1, u: 'tbsp', n: 'calamansi juice', note: 'to finish' }
      ],
      steps: [
        { t: 'Simmer the smoked pork hock in the 6 cups water 75 minutes, skimming for the first 10. Strain and reserve the broth; shred any meat off the bone.', ic: 'simmer', min: 75, look: 'Smoky amber broth; meat falling off the hock.' },
        { t: 'Fry the sliced garlic slowly in the oil until gold, 6 minutes. Strain and reserve both the chips and the garlic oil.', ic: 'garlic', min: 6, look: 'Even gold crisp chips; fragrant oil.' },
        { t: 'Rinse the mung beans and simmer them in 4 cups of the pork broth 40 minutes until creamy.', ic: 'pot', min: 40, look: 'Beans broken down into a thick purée-like base.' },
        { t: 'In a wide pan, sweat the onion in 2 tbsp garlic oil 6 minutes, then add the minced garlic and tomato and cook 8 minutes until jammy. A sofrito cooked this long is a different ingredient from one cooked for three minutes.', ic: 'onion', min: 14, look: 'Deep red-brown, thick and sweet-smelling, no raw tomato edge.' },
        { t: 'Sear the fresh pork separately over high heat 4 minutes, then fold it in.', ic: 'pan', min: 4, look: 'Genuine browning on the pork, not just grey.' },
        { t: 'Combine the beans, sofrito, pork and shredded hock meat. Add the remaining broth and simmer 15 minutes.', ic: 'simmer', min: 15, look: 'Thick, glossy, deeply coloured stew.' },
        { t: 'Season with fish sauce and pepper, add the shrimp, and cook 2 minutes.', ic: 'shrimp', min: 2, look: 'Shrimp just pink and curled.' },
        { t: 'Off the heat, stir in the spinach, malunggay and calamansi juice.', ic: 'citrus', min: 2, look: 'Bright greens suspended in the stew; smell lifts.' },
        { t: 'Serve with the garlic chips and chicharon scattered over each bowl at the table.', ic: 'plate', look: 'Crisp gold garlic and chicharon sitting on top, still crunchy.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/ginisang-munggo-sauteed-mung-beans/' }
},

/* 16 --------------------------------------------------------------- */
{
  id: 'bicol-express',
  name: 'Bicol Express',
  aka: 'Sinilihan',
  cat: 'main',
  region: 'Bicol',
  icon: 'chili',
  serves: 6,
  blurb: 'Pork belly simmered in coconut milk with shrimp paste and a serious quantity of chili. Named after a train, and it moves about as fast through you.',
  nutr: { cal: 1224, pro: 23, fat: 124, carb: 10 },
  keys: ['pork belly', 'coconut milk', 'coconut cream', 'shrimp paste', 'bagoong', 'chili', 'garlic', 'ginger', 'onion'],
  ing: [
    { q: 2, u: 'lbs', n: 'pork belly', note: 'sliced into strips', an: 'meat', sub: { vg: 'king oyster mushrooms and firm tofu', lite: 'pork shoulder, trimmed' } },
    { q: 2, u: 'cups', n: 'coconut milk' },
    { q: 2, u: 'cups', n: 'coconut cream', sub: { lite: 'light coconut milk' } },
    { q: 0.25, u: 'cup', n: 'shrimp paste', note: 'bagoong alamang', al: ['shellfish', 'fish'], an: 'seafood', sub: { shellfish: 'fermented black bean paste', vg: 'fermented black bean paste or white miso', fish: 'white miso' } },
    { q: 5, u: 'cloves', n: 'garlic', note: 'crushed' },
    { q: 5, u: '', n: 'Thai chili peppers', note: 'chopped' },
    { q: 2, u: 'thumbs', n: 'ginger', note: 'minced' },
    { q: 1, u: '', n: 'onion', note: 'chopped' },
    { q: 2, u: '', n: 'Serrano peppers', note: 'sliced' },
    { q: 1, u: 'cup', n: 'water', note: 'optional' },
    { q: 8, u: 'g', n: 'all-purpose seasoning', al: ['gluten', 'soy'], sub: { gluten: 'salt to taste', soy: 'salt to taste', vg: 'mushroom seasoning' } }
  ],
  tiers: {
    easy: {
      time: '55 min',
      about: 'Two chilies instead of seven, canned coconut milk only, and a shorter simmer. Still recognisably Bicol Express, just survivable.',
      drop: ['coconut cream', 'Serrano peppers'],
      add: [{ q: 2, u: 'cups', n: 'coconut milk', note: 'extra, to replace the cream' }],
      steps: [
        { t: 'Put the pork, ginger, garlic, onion, chilies, shrimp paste and coconut milk in a pan. Mix, cover, and bring to a boil.', ic: 'pot', min: 8, look: 'Coconut milk simmering, pork turning pale.' },
        { t: 'Lower the heat and simmer 35 minutes, stirring now and then.', ic: 'simmer', min: 35, look: 'Pork tender, sauce reduced and starting to look oily.' },
        { t: 'Uncover and cook 10 minutes more until the sauce thickens and the coconut oil separates out.', ic: 'simmer', min: 10, look: 'Clear oil pooling at the edges, sauce clinging to the pork.' },
        { t: 'Taste, season with salt, and serve with plenty of rice.', ic: 'plate', look: 'Pork in thick white sauce flecked red with chili.' }
      ]
    },
    core: {
      time: '1 hr 10 min',
      about: 'The published recipe. Everything goes in cold and comes up to temperature together — no searing — which is deliberate: it keeps the coconut milk from splitting too early.',
      steps: [
        { t: 'Combine the pork, ginger, garlic, onion, Thai chilies, Serrano peppers, bagoong alamang and coconut milk in a pan. Mix well, cover, and bring to a boil.', ic: 'pot', min: 10, look: 'Everything submerged in white milk, just starting to bubble.' },
        { t: 'Reduce the heat to low, cover, and simmer 50 minutes, stirring occasionally. Add water if it gets too dry.', ic: 'simmer', min: 50, look: 'Pork completely tender; milk reduced and slightly grainy.' },
        { t: 'Add the remaining coconut cream and more bagoong if you want it saltier. Season with the all-purpose seasoning.', ic: 'coconut', min: 5, look: 'Sauce whitened and loosened again by the fresh cream.' },
        { t: 'Keep simmering on low until the sauce thickens. The oil separating out is the finish line, not a mistake.', ic: 'simmer', min: 12, look: 'Thick sauce with clear coconut oil visibly separating.' },
        { t: 'Transfer to a serving plate and serve with warm rice.', ic: 'plate', look: 'Glossy pork, thick white sauce, red chili flecks, visible oil.' }
      ]
    },
    complex: {
      time: '2 hr 15 min',
      about: 'Fresh-pressed coconut milk in two strengths, the pork rendered and browned first, the bagoong toasted, and the chilies added in three stages for layered heat rather than one flat burn.',
      drop: ['coconut milk', 'coconut cream'],
      add: [
        { q: 2, u: '', n: 'mature coconuts', note: 'grated, for fresh gata' },
        { q: 5, u: 'cups', n: 'warm water', note: 'for pressing' },
        { q: 8, u: '', n: 'siling labuyo', note: 'whole, added at the end' },
        { q: 2, u: 'tbsp', n: 'cane vinegar' },
        { q: 1, u: 'tsp', n: 'muscovado sugar' }
      ],
      steps: [
        { t: 'Press the fresh coconut: knead 1½ cups warm water into the grated flesh and squeeze through muslin for the thick first press (kakang gata). Reserve.', ic: 'coconut', min: 12, look: 'Thick, opaque, creamy-white liquid.' },
        { t: 'Press twice more with the remaining water for the thinner milk.', ic: 'coconut', min: 10, look: 'Noticeably thinner, bluish-white liquid.' },
        { t: 'Render the pork: cook the belly strips in a dry pan over medium heat 12 minutes until the fat runs and the meat browns. Pour off most of the fat.', ic: 'pan', min: 12, look: 'Browned pork sitting in rendered fat, edges crisp.' },
        { t: 'Cook the ginger, garlic and onion in 2 tbsp of the reserved fat 6 minutes.', ic: 'ginger', min: 6, look: 'Aromatics soft and golden.' },
        { t: 'Add the bagoong and fry 3 minutes until it darkens and turns nutty. Raw bagoong tastes sharp; toasted bagoong tastes deep.', ic: 'shaker', min: 3, look: 'Paste gone rust-brown, smelling savoury rather than fishy.' },
        { t: 'Add the Thai chilies — the first of three chili additions — and the thin coconut milk. Simmer uncovered 45 minutes.', ic: 'chili', min: 45, look: 'Liquid reduced by half, pork fully tender.' },
        { t: 'Add the Serrano peppers and the kakang gata. Simmer gently 20 minutes. Do not boil hard now or the fresh cream will split.', ic: 'simmer', min: 20, look: 'Thick, glossy sauce; oil beginning to separate.' },
        { t: 'Add the whole siling labuyo and the muscovado and cook 8 minutes. Whole chilies perfume without adding raw heat.', ic: 'chili', min: 8, look: 'Whole red chilies floating; sauce very thick.' },
        { t: 'Finish off the heat with the cane vinegar.', ic: 'bottle', look: 'Smell brightens; the richness pulls back.' },
        { t: 'Rest 10 minutes before serving — it thickens further as it sits.', ic: 'timer', min: 10, look: 'Coconut oil risen on top, sauce clinging heavily to the pork.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/bicol-express/' }
}

);

window.RECIPES.push(

/* 17 --------------------------------------------------------------- */
{
  id: 'pinakbet',
  name: 'Pinakbet',
  aka: 'Pakbet',
  cat: 'veg',
  region: 'Ilocos / Tagalog',
  icon: 'eggplant',
  serves: 4,
  blurb: 'Squash, eggplant, okra, beans and bitter melon cooked down with pork and shrimp paste. The whole garden in one pan.',
  nutr: { cal: 308, pro: 12, fat: 27, carb: 4 },
  keys: ['squash', 'kalabasa', 'eggplant', 'okra', 'string beans', 'bitter melon', 'ampalaya', 'shrimp paste', 'bagoong', 'pork belly', 'tomato'],
  ing: [
    { q: 1, u: 'tbsp', n: 'oil', sub: { lite: 'oil (use 1 tsp)' } },
    { q: 0.5, u: 'lb', n: 'pork belly', note: 'cut into strips', an: 'meat', sub: { vg: 'omit, or use fried firm tofu', lite: 'pork loin, or omit' } },
    { q: 1, u: '', n: 'small onion', note: 'chopped' },
    { q: 2, u: 'cloves', n: 'garlic', note: 'minced' },
    { q: 2.5, u: 'tbsp', n: 'shrimp paste', al: ['shellfish', 'fish'], an: 'seafood', sub: { shellfish: 'white miso or fermented black bean paste', vg: 'white miso', fish: 'white miso' } },
    { q: 3, u: '', n: 'medium tomatoes', note: 'chopped' },
    { q: 0.5, u: '', n: 'small squash', note: 'peeled and cubed' },
    { q: 1, u: 'cup', n: 'water' },
    { q: 6, u: '', n: 'young okra', note: 'trimmed and halved diagonally' },
    { q: 0.5, u: 'bunch', n: 'yard-long beans', note: 'cut into 3-inch lengths' },
    { q: 1, u: '', n: 'medium bitter gourd', note: 'seeded and sliced' },
    { q: 1, u: '', n: 'large eggplant', note: 'trimmed and cubed' },
    { q: null, u: '', n: 'salt', note: 'to taste' }
  ],
  tiers: {
    easy: {
      time: '30 min',
      about: 'Four vegetables instead of six — the bitter melon and okra come out, which also makes it an easier sell to anybody who is suspicious of pinakbet.',
      drop: ['medium bitter gourd', 'young okra'],
      steps: [
        { t: 'Brown the pork in the oil over medium-high heat 5 minutes until the fat renders.', ic: 'pan', min: 5, look: 'Browned pork sitting in its own clear fat.' },
        { t: 'Add the onion, garlic and tomatoes and cook 5 minutes until the tomatoes collapse.', ic: 'tomato', min: 5, look: 'A rough red sauce in the bottom of the pan.' },
        { t: 'Stir in the shrimp paste and cook 1 minute.', ic: 'shaker', min: 1, look: 'Paste darkened, smell turning savoury.' },
        { t: 'Add the squash and the water. Cover and simmer 6 minutes.', ic: 'simmer', min: 6, look: 'Squash tender at the edges, liquid turning orange.' },
        { t: 'Add the beans and eggplant, season with salt, and cook 5 minutes until just tender.', ic: 'veg', min: 5, look: 'Eggplant soft and glossy, beans still green.' },
        { t: 'Serve with rice. Do not stir too much from here — pinakbet should look like vegetables, not purée.', ic: 'plate', look: 'Distinct vegetables in a little orange sauce.' }
      ]
    },
    core: {
      time: '45 min',
      about: 'The published recipe, with the vegetables added in strict order of cooking time: squash first, okra last. That order is the entire technique of pinakbet.',
      steps: [
        { t: 'Heat the oil in a wok over medium-high heat and brown the pork until the fat renders.', ic: 'pan', min: 6, look: 'Crisp brown edges, a pool of clear fat.' },
        { t: 'Lower the heat, add the onion and garlic, and cook until tender and aromatic.', ic: 'onion', min: 4, look: 'Onion translucent, garlic fragrant but not browned.' },
        { t: 'Add the tomatoes and cook 3–5 minutes until soft.', ic: 'tomato', min: 4, look: 'Tomatoes broken down, juices released.' },
        { t: 'Add the shrimp paste and cook 1 minute.', ic: 'shaker', min: 1, look: 'Paste darkened and distributed through the sauce.' },
        { t: 'Add the squash and water, cover, and simmer 2 minutes.', ic: 'simmer', min: 2, look: 'Squash edges softening, sauce turning orange.' },
        { t: 'Add the yard-long beans, bitter gourd and eggplant. Season with salt.', ic: 'veg', look: 'Vegetables piled in; not yet stirred through.' },
        { t: 'Cook 2 minutes, then add the okra.', ic: 'veg', min: 2, look: 'Beans brightening, eggplant beginning to collapse.' },
        { t: 'Cook another 2 minutes until the vegetables are tender-crisp. Shake the pan rather than stirring, so nothing breaks up.', ic: 'pan', min: 2, look: 'Each vegetable still holding its shape and colour.' },
        { t: 'Serve hot with rice.', ic: 'plate', look: 'A pan of clearly distinguishable vegetables glossed with orange sauce.' }
      ]
    },
    complex: {
      time: '1 hr 30 min',
      about: 'The Ilocano version: bagoong isda instead of shrimp paste, the vegetables steamed in layers over the broth in the traditional order and never stirred, and a crisp lechon kawali topping made separately.',
      drop: ['shrimp paste'],
      add: [
        { q: 3, u: 'tbsp', n: 'bagoong isda', note: 'fermented fish sauce, Ilocano style', al: ['fish'], an: 'fish', sub: { fish: 'white miso thinned with water', vg: 'white miso thinned with water' } },
        { q: 0.5, u: 'lb', n: 'pork belly', note: 'extra, for crisping as a topping', an: 'meat', sub: { vg: 'omit' } },
        { q: 2, u: '', n: 'sweet potatoes (kamote)', note: 'cubed' },
        { q: 1, u: 'thumb', n: 'ginger', note: 'sliced' },
        { q: 1, u: 'tbsp', n: 'cane vinegar' }
      ],
      steps: [
        { t: 'Make the bagoong broth: simmer the bagoong isda with 1½ cups water and the ginger 12 minutes, then strain. Straining removes the bones and leaves a clean, intensely savoury liquid.', ic: 'simmer', min: 12, look: 'A cloudy grey-brown broth, no solids.' },
        { t: 'Crisp the extra pork belly: simmer in water 35 minutes, dry, then fry until crackling. Chop and set aside for the top.', ic: 'pan', min: 45, look: 'Blistered, crunchy cubes of pork.' },
        { t: 'Render the first batch of pork belly in the oil 8 minutes, then add the onion, garlic and tomatoes and cook 8 minutes until jammy.', ic: 'onion', min: 16, look: 'A thick, dark red base with rendered fat.' },
        { t: 'Pour in the strained bagoong broth and bring to a simmer.', ic: 'pot', min: 3, look: 'A shallow layer of savoury liquid in the pan.' },
        { t: 'Layer the vegetables in cooking order without mixing: squash and sweet potato on the bottom, then bitter gourd, then beans, then eggplant, and okra on top.', ic: 'veg', look: 'Visible strata of vegetables, okra sitting on the surface.' },
        { t: 'Cover and steam 12 minutes without touching it. The bottom layers boil, the top layers steam — that is why the order matters.', ic: 'steam', min: 12, look: 'Okra bright green and glossy on top, steam escaping the lid.' },
        { t: 'Shake the pan once, firmly, to settle everything — still no stirring.', ic: 'pan', look: 'Vegetables settled into the sauce, all still whole.' },
        { t: 'Cook uncovered 5 minutes to reduce the liquid to a glaze.', ic: 'simmer', min: 5, look: 'Only a few spoonfuls of thick sauce left in the pan.' },
        { t: 'Finish with the cane vinegar off the heat, and top with the crisp pork.', ic: 'plate', look: 'Glazed whole vegetables under a scatter of crackling pork.' }
      ]
    }
  },
  src: { site: 'Foxy Folksy', url: 'https://www.foxyfolksy.com/pinakbet/' }
},

/* 18 --------------------------------------------------------------- */
{
  id: 'pork-bbq',
  name: 'Filipino Pork BBQ',
  aka: 'Pork Barbecue Skewers',
  cat: 'snack',
  region: 'Nationwide',
  icon: 'skewer',
  serves: 8,
  blurb: 'Sweet-salty pork on bamboo skewers, basted until lacquered. Street-corner food, and the smell of every Filipino afternoon.',
  nutr: { cal: 365, pro: 29, fat: 19, carb: 14 },
  nutrNote: 'The source lists 2,339 kcal and 281 g protein per serving, which is a whole-batch figure mislabelled — 3 lbs of pork does not contain 281 g of protein per person. Recalculated here for 8 skewered servings.',
  keys: ['pork shoulder', 'banana ketchup', 'soy sauce', 'brown sugar', 'calamansi', 'garlic', 'skewers', 'barbecue'],
  ing: [
    { q: 3, u: 'lbs', n: 'pork shoulder', note: 'sliced into thin pieces', an: 'meat', sub: { vg: 'king oyster mushrooms or thick tofu slabs', lite: 'pork loin, trimmed' } },
    { q: 2, u: 'sachets', n: 'pork liquid seasoning', al: ['gluten', 'soy'], an: 'meat', sub: { gluten: 'tamari', soy: 'coconut aminos', vg: 'mushroom seasoning sauce' } },
    { q: 2, u: 'tbsp', n: 'brown sugar', sub: { lite: 'brown sugar (use 1 tbsp)' } },
    { q: 0.5, u: 'cup', n: 'banana ketchup', al: ['gluten'], sub: { gluten: 'gluten-free banana ketchup or tomato ketchup', lite: 'tomato ketchup, no added sugar' } },
    { q: 3, u: '', n: 'calamansi' },
    { q: 6, u: 'cloves', n: 'garlic', note: 'crushed' },
    { q: 0.5, u: 'cup', n: 'soy sauce', al: ['gluten', 'soy'], sub: { gluten: 'tamari', soy: 'coconut aminos', lite: 'low-sodium soy sauce' } },
    { q: 0.5, u: 'tsp', n: 'ground black pepper' },
    { q: 24, u: '', n: 'bamboo skewers', note: 'soaked in water 30 min', fixed: true }
  ],
  tiers: {
    easy: {
      time: '1 hr marinate + 20 min',
      about: 'A one-hour marinade and a grill pan or broiler instead of charcoal. No separate basting sauce — you just reuse the marinade, boiled first.',
      drop: ['pork liquid seasoning'],
      steps: [
        { t: 'Mix the soy sauce, banana ketchup, brown sugar, garlic, calamansi juice and pepper. Add the pork and leave 1 hour.', ic: 'timer', min: 60, look: 'Pork coated in a thick red-brown marinade.' },
        { t: 'Soak the bamboo skewers in water 30 minutes so they do not burn.', ic: 'water', min: 30, look: 'Skewers fully submerged and darkened.' },
        { t: 'Thread the pork onto the skewers, weaving so each piece lies flat.', ic: 'skewer', look: 'Flat, even skewers that will sit level on the grill.' },
        { t: 'Boil the leftover marinade 3 minutes to make it safe to baste with.', ic: 'pot', min: 3, look: 'Marinade at a rolling boil, slightly thickened.' },
        { t: 'Grill or broil 4 minutes a side, basting at each turn.', ic: 'grill', min: 8, look: 'Dark lacquered edges, a little char, meat cooked through.' },
        { t: 'Serve with spiced vinegar and rice.', ic: 'plate', look: 'Glossy mahogany skewers with charred edges.' }
      ]
    },
    core: {
      time: '3 hr marinate + 15 min',
      about: 'The published recipe. The basting mixture is made fresh rather than reusing the marinade, and it goes on after every flip — that repeated layering is what builds the lacquer.',
      steps: [
        { t: 'Combine the pork with the liquid seasoning, soy sauce, banana ketchup, brown sugar, garlic and black pepper in a large bowl. Mix thoroughly.', ic: 'mix', look: 'Every piece of pork coated in dark red-brown marinade.' },
        { t: 'Cover and refrigerate at least 3 hours — overnight is better.', ic: 'chill', min: 60, look: 'Marinade thickened and clinging; pork darkened through.' },
        { t: 'Soak the bamboo skewers in water 30 minutes.', ic: 'water', min: 30, look: 'Skewers waterlogged and heavy.' },
        { t: 'Thread the marinated pork generously onto the skewers.', ic: 'skewer', look: 'Densely packed skewers, meat laid flat not bunched.' },
        { t: 'Make the basting sauce: mix equal parts soy sauce and banana ketchup with a splash of oil.', ic: 'bottle', look: 'A loose, glossy red-brown sauce.' },
        { t: 'Heat the grill and cook the pork 3–5 minutes per side until cooked through, basting after each flip.', ic: 'grill', min: 10, look: 'Deep mahogany with charred edges; sugar caramelised, not burnt.' },
        { t: 'Serve with warm rice and spicy vinegar.', ic: 'plate', look: 'Shiny, dark skewers with visible grill marks.' }
      ]
    },
    complex: {
      time: 'Overnight + 1 hr',
      about: 'Overnight marinade with pineapple juice for tenderness, a reduced basting glaze built separately, and a two-zone charcoal fire so the sugar lacquers instead of burning.',
      add: [
        { q: 0.5, u: 'cup', n: 'pineapple juice', note: 'tenderiser' },
        { q: 1, u: 'cup', n: 'banana ketchup', note: 'extra, for the glaze' },
        { q: 0.25, u: 'cup', n: 'cane vinegar' },
        { q: 3, u: 'tbsp', n: 'muscovado sugar', note: 'for the glaze' },
        { q: 1, u: 'tbsp', n: '7-Up or lemon-lime soda' },
        { q: 2, u: 'tbsp', n: 'rendered pork fat', note: 'for basting', an: 'meat', sub: { vg: 'neutral oil' } }
      ],
      steps: [
        { t: 'Slice the pork shoulder across the grain into 1/4-inch sheets, leaving a thin fat cap on each. The fat is what keeps the meat from drying over fire.', ic: 'knife', min: 15, look: 'Thin even sheets with a visible white fat edge.' },
        { t: 'Marinate overnight in the soy sauce, liquid seasoning, pineapple juice, garlic, calamansi juice, soda, brown sugar and pepper.', ic: 'chill', look: 'Pork fully submerged, flesh noticeably softened.' },
        { t: 'Make the glaze: simmer the extra banana ketchup, cane vinegar, muscovado and 1/4 cup of the strained marinade 12 minutes until it coats a spoon.', ic: 'simmer', min: 12, look: 'A thick, glossy, deep red glaze that leaves a trail.' },
        { t: 'Thread the pork onto soaked skewers in tight accordion folds so every skewer cooks evenly.', ic: 'skewer', min: 15, look: 'Compact, flat, evenly loaded skewers.' },
        { t: 'Build a two-zone charcoal fire: coals banked on one side, nothing on the other. Sugar-heavy marinades burn over direct heat, so you need somewhere to retreat to.', ic: 'flame', min: 25, look: 'Grey-ashed coals on one half, a cool empty half.' },
        { t: 'Cook the skewers on the cool side, covered, 8 minutes a side to bring the pork up to temperature gently.', ic: 'grill', min: 16, look: 'Pork opaque and cooked through, barely any colour yet.' },
        { t: 'Move over the coals and sear 90 seconds a side, brushing on the glaze and letting it set between coats — three coats total.', ic: 'grill', min: 6, look: 'Each coat drying to a tacky shine before the next goes on.' },
        { t: 'Brush with rendered pork fat for the final 30 seconds.', ic: 'bottle', look: 'A high gloss over the dark glaze.' },
        { t: 'Rest 5 minutes and serve with spiced cane vinegar, chopped onion and chili.', ic: 'plate', min: 5, look: 'Deep lacquer, charred edges, juices still inside.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/pork-barbecue/' }
},

/* 19 --------------------------------------------------------------- */
{
  id: 'leche-flan',
  name: 'Leche Flan',
  aka: 'Filipino Caramel Custard',
  cat: 'dessert',
  region: 'Nationwide',
  icon: 'flan',
  serves: 6,
  blurb: 'Dense egg-yolk custard under a layer of dark caramel, steamed in a llanera. Richer than a crème caramel, and deliberately so.',
  nutr: { cal: 369, pro: 6, fat: 7, carb: 71 },
  keys: ['egg yolks', 'condensed milk', 'evaporated milk', 'sugar', 'vanilla', 'llanera', 'caramel'],
  ing: [
    { q: 10, u: '', n: 'egg yolks', note: 'whites discarded or saved', al: ['egg'], an: 'egg', sub: { egg: 'no honest substitute — try a coconut-milk pudding set with agar instead', vg: 'no honest substitute — try a coconut-milk pudding set with agar instead' } },
    { q: 14, u: 'oz', n: 'condensed milk', note: '1 can', al: ['dairy'], an: 'dairy', sub: { dairy: 'sweetened condensed coconut milk', vg: 'sweetened condensed coconut milk', lite: 'reduced-fat condensed milk' } },
    { q: 1, u: 'cup', n: 'fresh or evaporated milk', al: ['dairy'], an: 'dairy', sub: { dairy: 'full-fat coconut milk', vg: 'full-fat coconut milk', lite: 'low-fat evaporated milk' } },
    { q: 1, u: 'cup', n: 'granulated sugar', note: 'for the caramel', sub: { lite: 'granulated sugar (use 2/3 cup)' } },
    { q: 1, u: 'tsp', n: 'vanilla extract' }
  ],
  tiers: {
    easy: {
      time: '55 min',
      about: 'Caramel made in the pan rather than directly in the mould, and steamed in a covered pot instead of a water bath. Fewer ways to burn yourself.',
      steps: [
        { t: 'Melt the sugar in a dry pan over medium heat, without stirring, until it is amber — about 6 minutes. Swirl the pan rather than stirring, or it crystallises.', ic: 'pan', min: 6, look: 'Clear amber liquid, no white crystals, smelling toasty not acrid.' },
        { t: 'Pour the caramel into the mould and tilt to coat the bottom. Work fast — it sets in seconds.', ic: 'bowl', look: 'An even amber layer on the base of the mould.' },
        { t: 'Whisk the egg yolks, condensed milk, fresh milk and vanilla together gently. Gently — beating in air makes a bubbly flan.', ic: 'whisk', look: 'A smooth, pale yellow custard with very few bubbles on top.' },
        { t: 'Pour the custard through a sieve into the mould and cover tightly with foil.', ic: 'bowl', look: 'Smooth surface, no lumps or bubbles, foil sealed at the edges.' },
        { t: 'Steam over simmering water 35 minutes until the centre barely wobbles.', ic: 'steam', min: 35, look: 'Set at the edges; the centre jiggles as one piece, not in ripples.' },
        { t: 'Cool, then chill at least 3 hours before inverting onto a plate.', ic: 'chill', min: 60, look: 'Firm custard that releases cleanly with the caramel on top.' }
      ]
    },
    core: {
      time: '55 min + chilling',
      about: 'The published recipe: caramel made directly in the llanera over the stovetop, then steamed. This is how it is done in Filipino kitchens and it gives the best caramel-to-custard contact.',
      steps: [
        { t: 'Separate the egg yolks from the whites.', ic: 'egg', look: 'Ten intact yolks, no white clinging to them.' },
        { t: 'Beat the yolks in a large bowl with a fork or mixer.', ic: 'whisk', look: 'Yolks loosened to an even, slightly paler liquid.' },
        { t: 'Add the condensed milk and mix thoroughly.', ic: 'can', look: 'A thick, smooth, pale custard base.' },
        { t: 'Pour in the fresh milk and the vanilla, and mix well.', ic: 'mix', look: 'Thinner, pourable custard, uniform in colour.' },
        { t: 'Heat the llanera mould directly on the stovetop over low heat.', ic: 'flame', look: 'A dry, warm mould.' },
        { t: 'Add the sugar to the mould and stir until it melts into a light brown caramel.', ic: 'pan', min: 6, look: 'Molten amber sugar moving like thin syrup.' },
        { t: 'Spread the caramel evenly across the bottom of the mould by tilting it.', ic: 'bowl', look: 'An even glassy layer covering the base.' },
        { t: 'Wait 5 minutes for the caramel to set, then pour the egg mixture in — ideally through a sieve.', ic: 'timer', min: 5, look: 'Caramel hardened; custard sitting on top without mixing into it.' },
        { t: 'Cover the mould with aluminium foil.', ic: 'bowl', look: 'Foil crimped tight so no condensation drips in.' },
        { t: 'Steam 30–35 minutes until set.', ic: 'steam', min: 35, look: 'A toothpick in the centre comes out clean; a gentle uniform wobble.' },
        { t: 'Cool to room temperature.', ic: 'timer', min: 30, look: 'Custard pulled slightly away from the sides.' },
        { t: 'Refrigerate before serving, then run a knife around the edge and invert onto a plate.', ic: 'chill', look: 'Glossy caramel running down the sides of a pale custard.' }
      ]
    },
    complex: {
      time: '1 hr 30 min + overnight',
      about: 'A tempered, strained, bain-marie-baked flan with a dark caramel finished with salt and calamansi zest, and an infused milk base. The result is silkier and sets with no bubbles at all.',
      add: [
        { q: 1, u: '', n: 'cinnamon stick', note: 'for infusing the milk' },
        { q: 1, u: 'tsp', n: 'calamansi or lime zest' },
        { q: 0.25, u: 'tsp', n: 'fine sea salt', note: 'for the caramel' },
        { q: 2, u: 'tbsp', n: 'water', note: 'for the wet caramel' },
        { q: 2, u: '', n: 'whole eggs', note: 'in addition to the yolks, for structure', al: ['egg'], an: 'egg', sub: { egg: 'omit', vg: 'omit' } }
      ],
      steps: [
        { t: 'Infuse the milk: warm the fresh milk with the cinnamon stick and the zest to just below a simmer, then steep off the heat 20 minutes and strain.', ic: 'simmer', min: 20, look: 'Milk fragrant with cinnamon and citrus, no skin formed.' },
        { t: 'Make a wet caramel: combine the sugar and the 2 tbsp water in a pan and cook without stirring to a deep amber, 8–10 minutes. Wet caramel is slower but far less likely to crystallise or scorch.', ic: 'pan', min: 10, look: 'The colour of an old penny, smelling of toffee not smoke.' },
        { t: 'Off the heat, stir in the sea salt, then pour into the moulds and let it set.', ic: 'bowl', look: 'Dark glassy caramel, hardened and crack-free.' },
        { t: 'Whisk the yolks and whole eggs with the condensed milk, keeping the whisk below the surface so you fold in no air.', ic: 'whisk', look: 'Thick, smooth, almost no foam on the surface.' },
        { t: 'Temper: add the warm infused milk a ladle at a time, whisking constantly. Adding it all at once scrambles the yolks.', ic: 'mix', min: 5, look: 'A smooth, warm, homogeneous custard with no flecks of cooked egg.' },
        { t: 'Strain the custard twice through a fine sieve, then rest it 10 minutes and skim any foam off the top.', ic: 'timer', min: 10, look: 'A glassy surface with no bubbles whatsoever.' },
        { t: 'Pour into the moulds, cover with foil, and set them in a roasting tray. Pour hot water halfway up the sides.', ic: 'oven', look: 'Moulds standing in a shallow bath, water not touching the foil.' },
        { t: 'Bake at 325°F / 160°C for 45–50 minutes until the centre reads 175°F / 79°C.', ic: 'oven', min: 50, look: 'Set with a faint wobble dead centre; edges firm, no browning.' },
        { t: 'Cool in the water bath 30 minutes, then chill overnight. Overnight is not optional — the texture tightens and the caramel liquefies into a sauce.', ic: 'chill', min: 30, look: 'Firm, dense custard; a pool of liquid caramel around the base.' },
        { t: 'Invert onto a chilled plate and serve in thick slices.', ic: 'plate', look: 'Dense, bubble-free custard with a dark caramel sheen running down.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/leche-flan/' }
},

/* 20 --------------------------------------------------------------- */
{
  id: 'turon',
  name: 'Turon',
  aka: 'Banana Lumpia',
  cat: 'snack',
  region: 'Nationwide',
  icon: 'flame',
  serves: 6,
  blurb: 'Saba banana and jackfruit rolled in a lumpia wrapper and fried in caramelising sugar. Street merienda, and the easiest great Filipino dessert.',
  nutr: { cal: 292, pro: 1, fat: 8, carb: 58 },
  keys: ['saba banana', 'plantain', 'jackfruit', 'langka', 'lumpia wrapper', 'sugar', 'brown sugar'],
  ing: [
    { q: 6, u: '', n: 'saba bananas or plantains', note: 'cut in half lengthwise' },
    { q: 1, u: 'cup', n: 'ripe jackfruit', note: 'sliced' },
    { q: 1.5, u: 'cups', n: 'sugar', sub: { lite: 'sugar (use 2/3 cup — coat only, no caramel in the oil)' } },
    { q: 12, u: '', n: 'lumpia wrappers', al: ['gluten'], sub: { gluten: 'rice paper wrappers — fry cooler and faster' } },
    { q: 2, u: 'cups', n: 'cooking oil', fixed: true }
  ],
  tiers: {
    easy: {
      time: '20 min',
      about: 'Banana only, no jackfruit, and shallow-fried in plain oil with the sugar just coating the banana. The simplest possible turon.',
      drop: ['ripe jackfruit'],
      steps: [
        { t: 'Roll each banana half in sugar until well coated.', ic: 'bowl', look: 'Bananas crusted in visible sugar crystals.' },
        { t: 'Place one on a wrapper, fold the sides in, and roll tightly. Seal the edge with a dab of water.', ic: 'knife', look: 'A tight parcel with no gaps for sugar to leak out.' },
        { t: 'Heat 1/2 inch of oil in a pan over medium heat.', ic: 'flame', look: 'Oil shimmering; a scrap of wrapper sizzles steadily.' },
        { t: 'Fry 2–3 minutes a side until golden and the sugar at the seams has caramelised.', ic: 'pan', min: 5, look: 'Golden wrapper with dark caramel streaks at the edges.' },
        { t: 'Drain on a rack — not paper, which traps steam — and eat warm.', ic: 'plate', look: 'Crisp, blistered wrapper with caramel patches.' }
      ]
    },
    core: {
      time: '22 min',
      about: 'The published recipe. Sugar goes into the hot oil so the caramel forms directly on the wrapper as it fries — that lacquered shell is what makes turon turon.',
      steps: [
        { t: 'Roll the banana pieces on a plate of sugar until fully coated.', ic: 'bowl', look: 'An even sugar crust on every surface.' },
        { t: 'Place a sugar-coated banana on a lumpia wrapper and lay a slice of jackfruit on top.', ic: 'leaf', look: 'Banana and a strip of yellow jackfruit side by side on the wrapper.' },
        { t: 'Fold and seal the wrapper edges with water.', ic: 'knife', look: 'Tight sealed rolls, seam-side down.' },
        { t: 'Heat the oil in a pan and add the remaining sugar. Wait for it to dissolve.', ic: 'flame', min: 4, look: 'Sugar melting into the oil, turning it cloudy then amber.' },
        { t: 'Fry the rolls until the wrapper is golden brown and coated in caramelised sugar. Turn them often — the sugar catches fast.', ic: 'pan', min: 6, look: 'Deep amber shell, visibly glassy and sticky.' },
        { t: 'Lift onto a rack to set and serve hot as dessert or merienda.', ic: 'plate', look: 'Hard caramel shell that cracks audibly; soft banana inside.' }
      ]
    },
    complex: {
      time: '50 min',
      about: 'A double-wrapped turon with muscovado caramel, a latik coconut-caramel sauce, and a two-stage fry so the shell shatters and the banana inside goes jammy rather than raw.',
      add: [
        { q: 1, u: 'cup', n: 'muscovado sugar', note: 'for the coating' },
        { q: 1, u: 'cup', n: 'coconut cream', note: 'for the latik sauce' },
        { q: 0.33, u: 'cup', n: 'brown sugar', note: 'for the latik sauce' },
        { q: 0.25, u: 'tsp', n: 'sea salt' },
        { q: 12, u: '', n: 'lumpia wrappers', note: 'extra, for double-wrapping', al: ['gluten'], sub: { gluten: 'extra rice paper' } }
      ],
      steps: [
        { t: 'Make the latik sauce: simmer the coconut cream with the brown sugar and salt 18 minutes, stirring, until it thickens and turns the colour of caramel.', ic: 'simmer', min: 18, look: 'A thick, tan, glossy sauce that coats a spoon.' },
        { t: 'Toss the banana halves in muscovado sugar and let them sit 10 minutes. The sugar draws out moisture and starts a syrup before frying even begins.', ic: 'timer', min: 10, look: 'A dark syrup pooling around the bananas.' },
        { t: 'Wrap each banana with jackfruit in one wrapper, then roll the whole parcel in a second wrapper at a right angle. Double-wrapping is insurance against caramel blowouts.', ic: 'knife', min: 12, look: 'Firm, smooth parcels with no visible seams.' },
        { t: 'First fry at 325°F / 165°C for 3 minutes to cook the banana through and set the wrapper.', ic: 'pan', min: 3, look: 'Pale gold, firm, no colour on the caramel yet.' },
        { t: 'Rest on a rack 10 minutes.', ic: 'timer', min: 10, look: 'Surfaces dry; no steam escaping.' },
        { t: 'Add the remaining muscovado to the oil, raise to 375°F / 190°C, and fry 90 seconds, turning constantly, until lacquered.', ic: 'flame', min: 2, look: 'Dark amber glassy shell, bubbling vigorously.' },
        { t: 'Lift straight onto a wire rack so the caramel hardens instead of pooling.', ic: 'plate', min: 5, look: 'A hard shiny shell; the roll should click against the rack.' },
        { t: 'Cut on the diagonal and serve with the latik sauce poured over.', ic: 'plate', look: 'Cross-section of jammy banana and jackfruit; sauce pooling alongside.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/turon/' }
},

/* 21 --------------------------------------------------------------- */
{
  id: 'bibingka',
  name: 'Bibingka',
  aka: 'Rice Cake with Salted Egg and Cheese',
  cat: 'snack',
  region: 'Nationwide',
  icon: 'cake',
  serves: 3,
  blurb: 'Rice-flour cake baked on banana leaf, topped with salted duck egg and cheese. Christmas-season food, sold outside churches after dawn mass.',
  nutr: { cal: 734, pro: 13, fat: 41, carb: 83 },
  keys: ['rice flour', 'coconut milk', 'salted duck egg', 'cheese', 'banana leaf', 'butter', 'baking powder', 'grated coconut'],
  ing: [
    { q: 1, u: 'cup', n: 'rice flour' },
    { q: 0.125, u: 'tsp', n: 'salt' },
    { q: 2.5, u: 'tsp', n: 'baking powder' },
    { q: 3, u: 'tbsp', n: 'butter', al: ['dairy'], an: 'dairy', sub: { dairy: 'coconut oil', vg: 'coconut oil', lite: 'butter (use 1 1/2 tbsp)' } },
    { q: 0.5, u: 'cup', n: 'granulated sugar', sub: { lite: 'granulated sugar (use 1/3 cup)' } },
    { q: 1, u: 'cup', n: 'coconut milk' },
    { q: 0.25, u: 'cup', n: 'fresh milk', al: ['dairy'], an: 'dairy', sub: { dairy: 'coconut milk', vg: 'coconut milk' } },
    { q: 3, u: '', n: 'eggs', al: ['egg'], an: 'egg', sub: { egg: '3/4 cup aquafaba, whipped', vg: '3/4 cup aquafaba, whipped' } },
    { q: 1, u: '', n: 'salted duck egg', note: 'sliced', al: ['egg'], an: 'egg', sub: { egg: 'omit', vg: 'omit — top with toasted coconut instead' } },
    { q: 0.5, u: 'cup', n: 'grated cheese', al: ['dairy'], an: 'dairy', sub: { dairy: 'vegan cheese', vg: 'vegan cheese', lite: 'grated cheese (use 1/4 cup)' } },
    { q: 0.25, u: 'cup', n: 'grated coconut' },
    { q: 1, u: '', n: 'banana leaf', note: 'pre-cut, for lining', sub: { gluten: 'banana leaf, or parchment paper' } }
  ],
  tiers: {
    easy: {
      time: '40 min',
      about: 'Muffin tin, parchment instead of banana leaf, cheese on top and nothing else. All of the flavour with none of the leaf-wrangling.',
      drop: ['salted duck egg', 'banana leaf', 'grated coconut'],
      steps: [
        { t: 'Heat the oven to 375°F / 190°C and line a muffin tin with paper cases.', ic: 'oven', look: 'A lined tin, oven preheating.' },
        { t: 'Whisk the rice flour, baking powder, salt and sugar together.', ic: 'whisk', look: 'An evenly mixed pale dry blend.' },
        { t: 'Add the melted butter, coconut milk, fresh milk and eggs, and whisk until smooth.', ic: 'mix', look: 'A thin, pourable, lump-free batter.' },
        { t: 'Fill the cases two-thirds full and bake 18 minutes.', ic: 'oven', min: 18, look: 'Risen and set, barely coloured on top.' },
        { t: 'Scatter the cheese over and bake 7 more minutes until golden.', ic: 'oven', min: 7, look: 'Cheese melted and browning at the edges.' },
        { t: 'Serve warm.', ic: 'plate', look: 'Soft, slightly chewy cakes with browned cheese tops.' }
      ]
    },
    core: {
      time: '45 min',
      about: 'The published recipe, baked on banana leaf in a round pan. The two-stage bake is deliberate: the cake sets first, then the toppings go on so they brown rather than sink.',
      steps: [
        { t: 'Preheat the oven to 375°F / 190°C.', ic: 'oven', look: 'Oven fully up to temperature.' },
        { t: 'Combine the rice flour, baking powder and salt. Mix and set aside.', ic: 'whisk', look: 'An even pale dry mix.' },
        { t: 'Beat the butter, gradually adding the sugar while whisking.', ic: 'whisk', min: 3, look: 'Pale, slightly fluffy, no sugar grit visible.' },
        { t: 'Add the eggs and whisk until fully incorporated.', ic: 'egg', min: 2, look: 'A smooth, pale yellow mixture.' },
        { t: 'Gradually add the dry ingredients, mixing as you go.', ic: 'mix', look: 'A thick, smooth batter.' },
        { t: 'Pour in the coconut milk and the fresh milk and whisk 1–2 minutes.', ic: 'coconut', min: 2, look: 'A thin, pourable batter the consistency of heavy cream.' },
        { t: 'Soften the banana leaf over a flame for a few seconds until it turns glossy and pliable, then line the cake pan with it. Unsoftened leaf cracks.', ic: 'flame', look: 'Leaf deep green and shiny, folded into the pan without splitting.' },
        { t: 'Pour the batter into the lined pan.', ic: 'bowl', look: 'Batter filling the leaf-lined pan evenly.' },
        { t: 'Bake 15 minutes.', ic: 'oven', min: 15, look: 'Surface set and matte, no longer liquid.' },
        { t: 'Remove and top with the sliced salted egg and the grated cheese.', ic: 'egg', look: 'Orange egg slices and cheese arranged on a set surface.' },
        { t: 'Return to the oven and bake 15–20 minutes until the top turns medium brown.', ic: 'oven', min: 18, look: 'Golden-brown cheese, slightly puffed cake, edges pulling in.' },
        { t: 'Cool slightly, brush with butter, and top with the grated coconut.', ic: 'bowl', look: 'Glossy buttered top with white coconut scattered over.' }
      ]
    },
    complex: {
      time: '1 day + 1 hr',
      about: 'The traditional galapong version: rice soaked overnight and ground to a wet batter, fermented lightly with yeast, and baked in a clay pot between two layers of coals.',
      drop: ['rice flour', 'baking powder'],
      add: [
        { q: 1.5, u: 'cups', n: 'glutinous and regular rice', note: 'half and half, soaked overnight' },
        { q: 1, u: 'tsp', n: 'instant yeast' },
        { q: 0.5, u: 'cup', n: 'warm coconut water', note: 'to activate the yeast' },
        { q: 2, u: '', n: 'extra banana leaves' },
        { q: 2, u: 'tbsp', n: 'latik', note: 'toasted coconut curds, to finish' }
      ],
      steps: [
        { t: 'Soak the rice in plenty of water overnight, at least 8 hours.', ic: 'water', look: 'Grains swollen, soft enough to crush between your nails.' },
        { t: 'Drain and grind the rice with just enough fresh coconut milk to move it, until completely smooth. This wet rice batter is galapong, and it gives a texture no dry rice flour can match.', ic: 'mortar', min: 15, look: 'A thick, perfectly smooth white batter with no grittiness.' },
        { t: 'Bloom the yeast in the warm coconut water 10 minutes until foamy.', ic: 'timer', min: 10, look: 'A visible foam cap on the surface.' },
        { t: 'Stir the yeast into the galapong and ferment at room temperature 4 hours. It should smell faintly sour and taste tangy.', ic: 'timer', min: 60, look: 'Risen slightly with small bubbles throughout; a mild sour smell.' },
        { t: 'Whisk in the sugar, salt, melted butter, eggs and the remaining coconut milk.', ic: 'whisk', look: 'A smooth, pourable, slightly bubbly batter.' },
        { t: 'Soften the banana leaves over a flame and double-line a clay pot or heavy cake pan, letting the leaves overhang.', ic: 'flame', look: 'Two glossy green layers with edges standing above the rim.' },
        { t: 'Pour the batter in and bake at 400°F / 200°C with a tray of hot coals or a preheated baking stone above it, so it cooks from both directions.', ic: 'oven', min: 25, look: 'Rising and setting, top beginning to colour.' },
        { t: 'Top with salted egg and cheese and bake 15 more minutes.', ic: 'oven', min: 15, look: 'Deep gold top, cheese bubbling, leaf edges toasted brown.' },
        { t: 'Brush with butter and finish with grated coconut and latik.', ic: 'plate', look: 'Glossy top, crisp coconut curds, the banana leaf scorched and fragrant.' },
        { t: 'Serve hot in the leaf, the way it is sold outside church at dawn.', ic: 'plate', look: 'Steam rising; the leaf perfuming the cake.' }
      ]
    }
  },
  src: { site: 'Panlasang Pinoy', url: 'https://panlasangpinoy.com/rice-cake-bibingka-recipe/' }
},

/* 22 --------------------------------------------------------------- */
{
  id: 'puto',
  name: 'Puto',
  aka: 'Steamed Rice Cakes',
  cat: 'snack',
  region: 'Nationwide',
  icon: 'steam',
  serves: 12,
  blurb: 'Soft, faintly sweet steamed rice cakes. Eaten with dinuguan, with cheese on top, or on their own with coffee.',
  nutr: { cal: 212, pro: 3, fat: 6, carb: 38 },
  keys: ['rice flour', 'coconut milk', 'sugar', 'baking powder', 'yeast', 'anise', 'steamed'],
  ing: [
    { q: 2, u: 'cups', n: 'rice flour' },
    { q: 0.25, u: 'tsp', n: 'salt' },
    { q: 0.75, u: 'cup', n: 'white sugar', sub: { lite: 'white sugar (use 1/2 cup)' } },
    { q: 2, u: 'tsp', n: 'baking powder' },
    { q: 2, u: 'tsp', n: 'instant yeast' },
    { q: 1, u: 'cup', n: 'coconut milk' },
    { q: 1, u: 'cup', n: 'hot water' },
    { q: 1, u: 'tbsp', n: 'oil' },
    { q: 1, u: 'tsp', n: 'anise seeds', note: 'optional, plus more for topping' }
  ],
  tiers: {
    easy: {
      time: '35 min',
      about: 'Baking powder only, no yeast and no resting. Slightly denser, ready in half the time, and almost impossible to get wrong.',
      drop: ['instant yeast', 'anise seeds'],
      steps: [
        { t: 'Whisk the rice flour, salt, sugar and baking powder together.', ic: 'whisk', look: 'An even pale dry mix with no lumps.' },
        { t: 'Stir in the coconut milk, hot water and oil until smooth. The batter should be thin, like crêpe batter.', ic: 'mix', look: 'A thin, smooth, pourable white batter.' },
        { t: 'Fill greased moulds three-quarters full.', ic: 'bowl', look: 'Moulds evenly filled with room to rise.' },
        { t: 'Steam over boiling water 15 minutes, with a cloth under the lid to catch the condensation.', ic: 'steam', min: 15, look: 'Risen, domed, matte white tops; no wet dimples.' },
        { t: 'Check with a toothpick, cool slightly, then unmould.', ic: 'plate', look: 'Clean toothpick; cakes springy to the touch.' }
      ]
    },
    core: {
      time: '1 hr 5 min',
      about: 'The published recipe, with both yeast and baking powder and two short rests. The yeast is for flavour and that particular soft-stretchy crumb; the baking powder does the lifting.',
      steps: [
        { t: 'Mix all the dry ingredients — flour, salt, sugar, baking powder and yeast — in a large bowl.', ic: 'whisk', look: 'A uniform pale dry mix.' },
        { t: 'Combine the coconut milk and hot water until lukewarm, then add to the dry mixture. Lukewarm matters — hot liquid kills the yeast.', ic: 'water', look: 'Liquid warm to the wrist, not hot.' },
        { t: 'Stir in the oil and the anise seeds until blended. The mixture will be runny, and that is correct.', ic: 'mix', look: 'A thin, loose batter that pours in a stream.' },
        { t: 'Rest 10 minutes, then gently mix several times until it thickens.', ic: 'timer', min: 10, look: 'Noticeably thicker; small bubbles on the surface.' },
        { t: 'Transfer to the moulds and rest another 20 minutes.', ic: 'timer', min: 20, look: 'Batter risen slightly in the moulds, surface bubbled.' },
        { t: 'Prepare the steamer with boiling water and cover the lid with a cloth so condensation does not drip onto the cakes.', ic: 'steam', look: 'Steam escaping steadily; lid wrapped in cloth.' },
        { t: 'Place the moulds in the steamer basket, cover, and steam 15–20 minutes until a toothpick comes out clean.', ic: 'steam', min: 18, look: 'Domed, glossy-matte white tops; springy when pressed.' },
        { t: 'Cool slightly before unmoulding.', ic: 'plate', min: 5, look: 'Cakes shrinking a hair from the mould walls.' }
      ]
    },
    complex: {
      time: '1 day + 45 min',
      about: 'Galapong puto: rice soaked and ground wet, fermented overnight into a naturally leavened batter, and steamed in banana-leaf cups. This is the pre-baking-powder original.',
      drop: ['rice flour', 'baking powder', 'instant yeast'],
      add: [
        { q: 2, u: 'cups', n: 'jasmine rice', note: 'soaked overnight' },
        { q: 0.5, u: 'cup', n: 'cooked rice', note: 'as a starter for the ferment' },
        { q: 1, u: 'cup', n: 'coconut water', note: 'for grinding' },
        { q: 12, u: '', n: 'banana leaf squares', note: 'for lining the moulds' },
        { q: 0.5, u: 'cup', n: 'grated coconut', note: 'to serve' }
      ],
      steps: [
        { t: 'Soak the jasmine rice in water at least 8 hours, until a grain crushes easily under your thumbnail.', ic: 'water', look: 'Swollen, chalky-white, soft grains.' },
        { t: 'Drain and grind the rice with the coconut water and the cooked rice until completely smooth. The cooked rice carries the wild yeasts that start the ferment.', ic: 'mortar', min: 15, look: 'A smooth, thick, pourable white batter with no grit.' },
        { t: 'Cover loosely and ferment at room temperature 12–16 hours until bubbly and sour-smelling.', ic: 'timer', min: 60, look: 'A domed, actively bubbling surface; a clean sour smell like yogurt.' },
        { t: 'Stir down the batter, then whisk in the sugar, salt, coconut milk and oil.', ic: 'whisk', look: 'Deflated, smooth batter; sugar fully dissolved.' },
        { t: 'Rest 30 minutes to let the ferment pick back up.', ic: 'timer', min: 30, look: 'Fresh fine bubbles rising again.' },
        { t: 'Soften the banana leaf squares over a flame and press them into the moulds as cups.', ic: 'flame', look: 'Glossy green cups seated in each mould.' },
        { t: 'Fill the cups three-quarters full and rest 15 minutes while the steamer comes up.', ic: 'timer', min: 15, look: 'Batter crowning slightly in each cup.' },
        { t: 'Steam 18–20 minutes over vigorously boiling water with a cloth-wrapped lid.', ic: 'steam', min: 20, look: 'High domes, split tops, matte surfaces.' },
        { t: 'Rest 5 minutes, then serve warm in their leaves with grated coconut and anise sprinkled over.', ic: 'plate', min: 5, look: 'Tall white cakes in green leaf cups, faintly tangy and very soft.' }
      ]
    }
  },
  src: { site: 'Foxy Folksy', url: 'https://www.foxyfolksy.com/puto-recipe/' }
},

/* 23 --------------------------------------------------------------- */
{
  id: 'ube-halaya',
  name: 'Ube Halaya',
  aka: 'Purple Yam Jam',
  cat: 'dessert',
  region: 'Nationwide',
  icon: 'ube',
  serves: 6,
  blurb: 'Purple yam cooked down with coconut and condensed milk into a dense, glossy jam. Eaten by the spoon, or used in everything else.',
  nutr: { cal: 358, pro: 1, fat: 23, carb: 38 },
  keys: ['ube', 'purple yam', 'condensed milk', 'coconut milk', 'evaporated milk', 'butter', 'sugar', 'latik'],
  ing: [
    { q: 1, u: 'lb', n: 'purple yam (ube)', note: 'fresh or frozen, peeled and cubed' },
    { q: 10, u: 'fl oz', n: 'sweetened condensed milk', note: '1 can', al: ['dairy'], an: 'dairy', sub: { dairy: 'sweetened condensed coconut milk', vg: 'sweetened condensed coconut milk', lite: 'reduced-fat condensed milk' } },
    { q: 13.5, u: 'fl oz', n: 'coconut milk', note: '1 can' },
    { q: 12.5, u: 'fl oz', n: 'evaporated milk', note: '1 can', al: ['dairy'], an: 'dairy', sub: { dairy: 'coconut milk', vg: 'coconut milk', lite: 'low-fat evaporated milk' } },
    { q: 0.75, u: 'cup', n: 'butter', al: ['dairy'], an: 'dairy', sub: { dairy: 'coconut oil', vg: 'coconut oil', lite: 'butter (use 1/4 cup)' } },
    { q: 0.5, u: 'cup', n: 'sugar', sub: { lite: 'omit — the condensed milk is already sweet' } }
  ],
  tiers: {
    easy: {
      time: '35 min',
      about: 'Frozen grated ube and condensed milk only. No blending, no evaporated milk, far less butter — and it still sets properly.',
      drop: ['evaporated milk', 'sugar'],
      steps: [
        { t: 'Melt the butter in a wide pan over medium heat.', ic: 'pan', look: 'Butter melted and just starting to foam.' },
        { t: 'Add the grated ube and the coconut milk and cook 10 minutes, stirring.', ic: 'coconut', min: 10, look: 'A loose purple mixture, steaming.' },
        { t: 'Stir in the condensed milk and lower the heat.', ic: 'can', look: 'Colour deepening to a rich violet.' },
        { t: 'Cook 18–20 minutes, stirring often, until very thick. Keep the heat low and keep moving — ube scorches on the bottom in seconds.', ic: 'simmer', min: 20, look: 'Thick enough that a spoon leaves a trench that holds its shape.' },
        { t: 'Press into a greased dish, cool, then chill 2 hours before serving.', ic: 'chill', min: 60, look: 'Dense, glossy, sliceable purple jam.' }
      ]
    },
    core: {
      time: '1 hr + chilling',
      about: 'The published recipe. Blending the cooked ube partway through is the step that gives halaya its particular silky-dense texture rather than a grainy mash.',
      steps: [
        { t: 'Melt the butter in a wide, deep pan over medium heat, then add the purple yam and the coconut milk.', ic: 'pan', min: 3, look: 'Cubes of ube sitting in melted butter and coconut milk.' },
        { t: 'Bring to a boil, stirring occasionally, and cook 15 minutes.', ic: 'simmer', min: 15, look: 'Ube soft enough to crush against the side of the pan.' },
        { t: 'Transfer to a blender and purée until smooth — or use an immersion blender in the pan.', ic: 'mix', min: 3, look: 'A completely smooth, thick, vivid purple purée.' },
        { t: 'Return it to the pan and add the condensed milk, evaporated milk and sugar.', ic: 'can', look: 'A looser, lighter purple mixture.' },
        { t: 'Simmer on medium-low, stirring regularly, 20–30 minutes until very thick and pulling away from the sides of the pan.', ic: 'simmer', min: 25, look: 'The mixture mounds on a spoon and the pan bottom shows clean behind the spoon.' },
        { t: 'Grease 2–3 llanera moulds with butter.', ic: 'bowl', look: 'A visible film of butter in each mould.' },
        { t: 'Divide the halaya between the moulds and smooth the tops. Cool to room temperature.', ic: 'timer', min: 30, look: 'Flat, glossy, deep purple surfaces.' },
        { t: 'Cover with plastic wrap and refrigerate at least 2 hours until cold and firm.', ic: 'chill', min: 60, look: 'Firm enough to slice cleanly with a knife.' },
        { t: 'Top with latik or grated cheese before serving.', ic: 'plate', look: 'Deep purple jam under golden coconut curds.' }
      ]
    },
    complex: {
      time: '2 hr 30 min + overnight',
      about: 'Fresh ube steamed and riced rather than boiled, kakang gata pressed from fresh coconut, latik made from scratch, and the halaya cooked low and slow for over an hour until it is genuinely jam.',
      drop: ['coconut milk'],
      add: [
        { q: 2, u: '', n: 'mature coconuts', note: 'grated, for fresh kakang gata and latik' },
        { q: 2, u: 'cups', n: 'warm water', note: 'for pressing' },
        { q: 1, u: 'tsp', n: 'ube extract', note: 'optional, for colour' },
        { q: 0.25, u: 'tsp', n: 'fine sea salt' },
        { q: 1, u: '', n: 'vanilla bean', note: 'split and scraped' }
      ],
      steps: [
        { t: 'Steam the whole unpeeled ube 50–60 minutes until completely tender. Steaming keeps the flavour concentrated; boiling waterlogs it and dilutes the colour.', ic: 'steam', min: 55, look: 'Skin loose and wrinkled; a skewer slides through with no resistance.' },
        { t: 'Peel while still warm and push the flesh through a ricer or fine sieve.', ic: 'mix', min: 15, look: 'Fine, fluffy, intensely purple strands with no lumps.' },
        { t: 'Press fresh coconut milk: knead 1 cup warm water into the grated coconut and squeeze through muslin for the thick first press. Repeat with the second cup for thinner milk.', ic: 'coconut', min: 15, look: 'One bowl of thick cream, one of thinner milk.' },
        { t: 'Make latik: simmer 1 cup of the thin coconut milk in a dry pan 25 minutes, stirring, until the oil separates and the solids toast into golden curds. Strain and keep both.', ic: 'simmer', min: 25, look: 'Golden-brown crisp curds in clear coconut oil.' },
        { t: 'Melt the butter with the vanilla bean and seeds in a heavy pan, then add the riced ube and the remaining thin coconut milk.', ic: 'pan', min: 5, look: 'Ube loosened into a thick, fragrant paste.' },
        { t: 'Cook on low, stirring constantly, 30 minutes. Add the condensed and evaporated milks in three stages, letting each absorb before the next.', ic: 'simmer', min: 30, look: 'Progressively darker and thicker after each addition.' },
        { t: 'Add the kakang gata, the sugar and the sea salt, and cook a further 25–30 minutes until a spoon drawn across the pan leaves a clean dry track that holds.', ic: 'simmer', min: 30, look: 'A dense, glossy jam; the track behind the spoon stays open for several seconds.' },
        { t: 'Remove the vanilla pod. Stir in a tablespoon of the reserved coconut oil for shine.', ic: 'mix', look: 'A high gloss across the surface.' },
        { t: 'Press into buttered moulds, smooth the tops, cool fully, then chill overnight.', ic: 'chill', look: 'Firm, dense, deeply purple; it should hold a clean edge when cut.' },
        { t: 'Serve topped with the latik curds.', ic: 'plate', look: 'Dark violet jam under a scatter of crisp golden curds.' }
      ]
    }
  },
  src: { site: 'Foxy Folksy', url: 'https://www.foxyfolksy.com/ube-halaya-recipe-purple-yam-jam/' }
},

/* 24 --------------------------------------------------------------- */
{
  id: 'halo-halo',
  name: 'Halo-Halo',
  aka: 'Mixed Shaved Ice',
  cat: 'dessert',
  region: 'Nationwide',
  icon: 'ice',
  serves: 1,
  blurb: 'Shaved ice, evaporated milk and a dozen sweet preserves in a tall glass. "Halo" means mix — and you are meant to, immediately.',
  nutr: { cal: 195, pro: 3, fat: 8, carb: 14 },
  keys: ['shaved ice', 'evaporated milk', 'ube', 'leche flan', 'nata de coco', 'sago', 'sweet beans', 'jackfruit', 'macapuno', 'sweet potato', 'banana'],
  ing: [
    { q: 1, u: 'cup', n: 'crushed or shaved ice', fixed: true },
    { q: 0.25, u: 'cup', n: 'evaporated or fresh milk', al: ['dairy'], an: 'dairy', sub: { dairy: 'coconut milk or oat milk', vg: 'coconut milk or oat milk', lite: 'low-fat evaporated milk' } },
    { q: 1, u: 'tsp', n: 'sugar', note: 'only if needed', sub: { lite: 'omit' } },
    { q: 1, u: 'tsp', n: 'sweetened saba bananas' },
    { q: 1, u: 'tsp', n: 'sweetened sweet potatoes' },
    { q: 1, u: 'tsp', n: 'sweetened red mung beans' },
    { q: 1, u: 'tsp', n: 'sweetened garbanzos' },
    { q: 1, u: 'tsp', n: 'jackfruit (langka)', note: 'fresh or sweetened' },
    { q: 1, u: 'tsp', n: 'macapuno or coconut strips' },
    { q: 1, u: 'tsp', n: 'nata de coco', note: 'coconut gel' },
    { q: 1, u: 'tsp', n: 'sago or tapioca pearls' },
    { q: 1, u: 'tbsp', n: 'leche flan', note: 'topping', al: ['egg', 'dairy'], an: 'egg', sub: { egg: 'omit', dairy: 'omit', vg: 'omit' } },
    { q: 1, u: 'tbsp', n: 'ube halaya or ube ice cream', note: 'topping', al: ['dairy'], an: 'dairy', sub: { dairy: 'ube halaya made with coconut milk', vg: 'ube halaya made with coconut milk' } }
  ],
  tiers: {
    easy: {
      time: '5 min',
      about: 'Four components instead of ten, from jars. This is the version people actually make at home on a hot afternoon.',
      drop: ['sweetened red mung beans', 'sweetened garbanzos', 'macapuno or coconut strips', 'sago or tapioca pearls', 'leche flan'],
      steps: [
        { t: 'Spoon the sweetened bananas, sweet potato, jackfruit and nata de coco into the bottom of a tall glass.', ic: 'bowl', look: 'A layer of mixed preserves about a third up the glass.' },
        { t: 'Pack shaved ice on top, pressing down and adding more until it mounds over the rim.', ic: 'ice', look: 'A dome of ice rising above the glass.' },
        { t: 'Pour the milk over the ice.', ic: 'can', look: 'Milk soaking down through the ice in channels.' },
        { t: 'Top with ube halaya, and serve with a long spoon. Mix it all together before eating — that is the whole point of the name.', ic: 'plate', look: 'Purple cap on white ice, colours bleeding at the edges.' }
      ]
    },
    core: {
      time: '10 min',
      about: 'The published recipe: all ten components layered in the correct order so the heavy preserves stay at the bottom and the ice goes in last.',
      steps: [
        { t: 'Spoon a teaspoon of each preserve into the bottom of a tall glass — bananas, sweet potato, red mung beans, garbanzos, jackfruit, macapuno, nata de coco and sago.', ic: 'bowl', look: 'Distinct coloured layers filling the lower third of the glass.' },
        { t: 'Add the sugar if your preserves are not very sweet.', ic: 'shaker', look: 'A light dusting over the preserves.' },
        { t: 'Fill the glass to the brim with shaved ice, pressing down and adding more.', ic: 'ice', look: 'Tightly packed ice mounded above the rim.' },
        { t: 'Drizzle the milk over the top.', ic: 'can', look: 'Milk running down through the ice, turning it cream-coloured.' },
        { t: 'Add the leche flan and the ube halaya or ice cream on top.', ic: 'flan', look: 'A yellow flan slab and a purple scoop crowning the glass.' },
        { t: 'Serve immediately with a long spoon, for mixing.', ic: 'plate', look: 'Everything still distinct — it will not be for long.' }
      ]
    },
    complex: {
      time: '1 day',
      about: 'Every component made from scratch: beans and bananas cooked in syrup, sago boiled from pearls, pinipig toasted, ube halaya and leche flan both made ahead, and the ice shaved rather than crushed.',
      add: [
        { q: 0.5, u: 'cup', n: 'dried red mung beans', note: 'to cook in syrup' },
        { q: 0.5, u: 'cup', n: 'dried garbanzos', note: 'soaked overnight' },
        { q: 1, u: 'cup', n: 'sugar', note: 'for the syrups' },
        { q: 0.25, u: 'cup', n: 'small sago pearls' },
        { q: 0.25, u: 'cup', n: 'pinipig', note: 'pounded young rice, to toast' },
        { q: 1, u: 'cup', n: 'coconut sport (macapuno)', note: 'in syrup' },
        { q: 2, u: '', n: 'saba bananas', note: 'to cook in syrup' },
        { q: 1, u: '', n: 'sweet potato', note: 'cubed, to cook in syrup' }
      ],
      steps: [
        { t: 'Soak the garbanzos overnight. Simmer them 60 minutes until tender, then add 1/3 cup sugar and cook 15 minutes more into a light syrup.', ic: 'pot', min: 60, look: 'Soft beans sitting in a thin clear syrup.' },
        { t: 'Cook the red mung beans 35 minutes until soft, then sweeten with 1/3 cup sugar and reduce 10 minutes.', ic: 'simmer', min: 45, look: 'Dark red beans, glossy in syrup, still whole.' },
        { t: 'Make a light syrup with the remaining sugar and poach the saba bananas and sweet potato cubes separately, 8 minutes each, so the colours do not bleed into each other.', ic: 'simmer', min: 16, look: 'Translucent banana slices; orange sweet potato holding its shape.' },
        { t: 'Boil the sago pearls 15 minutes until clear through, then rinse in cold water and hold in a little syrup.', ic: 'pot', min: 15, look: 'Fully translucent pearls with no white centres.' },
        { t: 'Toast the pinipig in a dry pan 4 minutes until it crackles and smells nutty.', ic: 'pan', min: 4, look: 'Pale green-gold flakes, lightly puffed.' },
        { t: 'Make the ube halaya and the leche flan ahead and chill both. Both have their own recipes in here.', ic: 'chill', look: 'A firm purple jam and a set caramel custard, both cold.' },
        { t: 'Shave the ice rather than crushing it — shaved ice holds milk, crushed ice sheds it and leaves a puddle.', ic: 'ice', min: 5, look: 'Fine, snow-like, fluffy ice rather than hard chips.' },
        { t: 'Chill the glasses in the freezer 20 minutes before building.', ic: 'chill', min: 20, look: 'Frosted glass walls.' },
        { t: 'Layer the preserves in the glass, pack with shaved ice, pour the milk, then crown with leche flan, ube halaya and the toasted pinipig.', ic: 'bowl', look: 'A tall, deliberately built glass: layers below, snow above, toppings on top.' },
        { t: 'Serve immediately with a long spoon and a straw.', ic: 'plate', look: 'Condensation on the glass; nothing melted yet.' }
      ]
    }
  },
  src: { site: 'Foxy Folksy', url: 'https://www.foxyfolksy.com/halo-halo-recipe/' }
}

);


/* ==================================================================
   FNRI-DOST "Healthy Recipes for Persons Who Use Drugs" (2019)

   Quantities and procedure transcribed from the booklet's own tables.
   That publication carries an all-rights-reserved notice, so this is a
   small selection rather than the compilation, and every blurb, step
   rewrite and difficulty variant below is this project's own work.
   The booklet reports energy, protein, fat, carbohydrate and iron.
   ================================================================== */

window.RECIPES.push(

/* 25 --------------------------------------------------------------- */
{
  id: 'tuna-egg-sandwich',
  name: 'Tuna-Egg Sandwich',
  aka: 'Tuna at Itlog na Sandwich',
  cat: 'breakfast',
  region: 'Nationwide',
  icon: 'egg',
  serves: 10,
  blurb: 'Mashed egg and tuna bound with mayonnaise, piled on toast with tomato, cucumber and cabbage. Breakfast you can make the night before.',
  nutr: { cal: 354, pro: 18.5, fat: 11.8, carb: 41.3, iron: 4.3 },
  keys: ['tuna', 'egg', 'mayonnaise', 'cheese', 'celery', 'bread', 'tomato', 'cucumber', 'cabbage'],
  ing: [
    { q: 2, u: '', n: 'eggs', note: 'boiled and mashed', al: ['egg'], an: 'egg', sub: { egg: 'mashed firm tofu, 120 g', vg: 'mashed firm tofu, 120 g' } },
    { q: 2.75, u: 'cups', n: 'canned tuna flakes in brine', note: 'drained, 400 g', al: ['fish'], an: 'fish', sub: { fish: 'mashed chickpeas', vg: 'mashed chickpeas' } },
    { q: 2, u: 'tbsp', n: 'cheddar cheese', note: 'grated', al: ['dairy'], an: 'dairy', sub: { dairy: 'omit', vg: 'omit', lite: 'omit' } },
    { q: 0.33, u: 'cup', n: 'mayonnaise', al: ['egg'], an: 'egg', sub: { egg: 'vegan mayonnaise', vg: 'vegan mayonnaise', lite: 'plain yogurt' } },
    { q: 0.5, u: 'cup', n: 'celery (kinchay)', note: 'chopped' },
    { q: 1, u: 'tsp', n: 'iodized salt', sub: { lite: 'salt (use 1/2 tsp)' } },
    { q: 1, u: 'tsp', n: 'ground black pepper' },
    { q: 20, u: 'slices', n: 'loaf bread', note: 'toasted', al: ['gluten'], sub: { gluten: 'gluten-free bread', lite: 'wholemeal bread' } },
    { q: 3, u: 'cups', n: 'tomato', note: 'sliced' },
    { q: 1.75, u: 'cups', n: 'cucumber', note: 'peeled and sliced' },
    { q: 3, u: 'cups', n: 'cabbage', note: 'separated into leaves' }
  ],
  tiers: {
    easy: {
      time: '20 min',
      about: 'Spread and bread, nothing else. The salad vegetables come out, which also means it keeps in a lunchbox without going soggy.',
      drop: ['tomato', 'cucumber', 'cabbage', 'cheddar cheese'],
      steps: [
        { t: 'Boil the eggs 15 minutes, cool under running water, peel and mash them roughly with a fork.', ic: 'egg', min: 15, look: 'Yolk and white broken into coarse crumbs, not a paste.' },
        { t: 'Drain the tuna properly — press it against the side of a sieve. Wet tuna makes a spread that soaks the bread.', ic: 'fish', look: 'Flakes that hold their shape, no liquid pooling.' },
        { t: 'Mix the egg, tuna, mayonnaise and chopped celery, then season with salt and pepper.', ic: 'mix', look: 'A thick, scoopable spread that holds a ridge.' },
        { t: 'Spread about 3 tbsp onto a slice of toasted bread and close with a second slice.', ic: 'knife', look: 'Filling right to the edges, bread still crisp.' }
      ]
    },
    core: {
      time: '30 min',
      about: 'The published recipe: the full spread with cheese and celery, built into a proper sandwich with tomato, cucumber and cabbage.',
      steps: [
        { t: 'Boil the eggs 15 minutes. Peel and mash.', ic: 'egg', min: 15, look: 'Firm, fully set yolks with no grey ring.' },
        { t: 'Add the tuna flakes, grated cheese, mayonnaise and chopped celery.', ic: 'mix', look: 'An even, flecked spread.' },
        { t: 'Season with salt and pepper to taste.', ic: 'shaker', look: 'Tastes seasoned cold — spreads always taste flatter chilled.' },
        { t: 'Toast the bread and let it cool a moment before building. Hot toast steams the filling.', ic: 'flame', min: 4, look: 'Crisp, dry, pale gold slices.' },
        { t: 'Place about 3 tbsp of mixture onto one slice of toasted bread.', ic: 'knife', look: 'An even layer that reaches the crusts.' },
        { t: 'Top with tomato, cucumber and cabbage, then cover with another slice.', ic: 'veg', look: 'Visible layers at the cut edge.' },
        { t: 'Cut on the diagonal and serve.', ic: 'plate', look: 'Clean cut showing spread, tomato and cabbage.' }
      ]
    },
    complex: {
      time: '1 hr',
      about: 'Soft-boiled yolks for a richer spread, the cucumber salted and drained so it cannot leak, and the bread buttered to the edge to waterproof it.',
      add: [
        { q: 2, u: 'tsp', n: 'Dijon or yellow mustard' },
        { q: 1, u: 'tbsp', n: 'calamansi juice' },
        { q: 2, u: 'tbsp', n: 'butter', note: 'softened, to seal the bread', al: ['dairy'], an: 'dairy', sub: { dairy: 'olive oil', vg: 'olive oil', lite: 'omit' } },
        { q: 2, u: '', n: 'spring onions', note: 'finely sliced' }
      ],
      steps: [
        { t: 'Boil the eggs 9 minutes rather than 15, then shock in ice water. The yolk stays slightly fudgy and binds the spread without needing extra mayonnaise.', ic: 'egg', min: 9, look: 'Set white, deep orange yolk still soft at the centre.' },
        { t: 'Salt the sliced cucumber and leave it in a sieve 20 minutes, then pat dry. This is the single thing that stops a tuna sandwich going wet by lunchtime.', ic: 'timer', min: 20, look: 'A pool of liquid drawn out underneath; slices limp and dry.' },
        { t: 'Mash the eggs with the mayonnaise, mustard and calamansi juice before the tuna goes in, so the dressing coats evenly.', ic: 'whisk', look: 'A smooth pale dressing with egg through it.' },
        { t: 'Fold in the tuna, cheese, celery and spring onion. Season and chill 15 minutes to firm up.', ic: 'chill', min: 15, look: 'Spread holds a clean edge on the spoon.' },
        { t: 'Toast the bread, then butter it right to the crusts while warm — the fat seals the crumb against the filling.', ic: 'knife', look: 'A thin glossy layer over the whole slice.' },
        { t: 'Build: spread, then cabbage as the bottom layer, then tomato, then cucumber. The leaf under the tomato is a barrier, not a garnish.', ic: 'veg', look: 'Cabbage flat against the spread, tomato resting on it.' },
        { t: 'Press gently, cut on the diagonal, and serve.', ic: 'plate', look: 'Layers compressed but distinct, bread still crisp at the edge.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST, Healthy Recipes for PWUDs', url: 'https://ddb.gov.ph/wp-content/uploads/2023/01/healthy_recipes_for_PWUDs-min.pdf' }
},

/* 26 --------------------------------------------------------------- */
{
  id: 'tuna-misua-soup',
  name: 'Tuna Misua Soup',
  aka: 'Misua with Patola and Boiled Egg',
  cat: 'breakfast',
  region: 'Nationwide',
  icon: 'bowl',
  serves: 10,
  blurb: 'Thin wheat noodles in a light tuna broth with patola and upo, topped with boiled egg. Fifteen minutes, and it tastes like being looked after.',
  nutr: { cal: 201, pro: 16.7, fat: 9.2, carb: 12.7, iron: 3.1 },
  keys: ['tuna', 'misua', 'patola', 'upo', 'egg', 'fish sauce', 'onion', 'garlic'],
  ing: [
    { q: 1, u: 'tbsp', n: 'vegetable oil' },
    { q: 2, u: 'tbsp', n: 'onion', note: 'minced' },
    { q: 1, u: 'tbsp', n: 'garlic', note: 'minced' },
    { q: 2, u: 'cups', n: 'canned tuna flakes in brine', note: 'drained, 400 g', al: ['fish'], an: 'fish', sub: { fish: 'shredded king oyster mushrooms', vg: 'shredded king oyster mushrooms' } },
    { q: 7, u: 'cups', n: 'water' },
    { q: 3, u: 'cups', n: 'patola', note: 'sliced, 240 g' },
    { q: 1.5, u: 'cups', n: 'upo', note: 'diced, 120 g' },
    { q: 1, u: 'cup', n: 'misua noodles', note: '120 g', al: ['gluten'], sub: { gluten: 'rice vermicelli — add at the very end, it needs less time' } },
    { q: 2, u: 'tbsp', n: 'fish sauce', al: ['fish'], an: 'fish', sub: { fish: 'light soy sauce', vg: 'light soy sauce', lite: 'fish sauce (use 1 tbsp)' } },
    { q: 1, u: 'tsp', n: 'iodized salt' },
    { q: 1, u: 'tsp', n: 'ground black pepper' },
    { q: 10, u: '', n: 'eggs', note: 'boiled and sliced, to top', al: ['egg'], an: 'egg', sub: { egg: 'omit', vg: 'omit' } }
  ],
  tiers: {
    easy: {
      time: '20 min',
      about: 'One gourd instead of two and no egg to boil separately. Misua cooks in about two minutes, so this is genuinely a twenty-minute soup.',
      drop: ['upo', 'eggs'],
      steps: [
        { t: 'Heat the oil and cook the onion and garlic 2 minutes until soft.', ic: 'pan', min: 2, look: 'Onion translucent, garlic fragrant but not browned.' },
        { t: 'Add the drained tuna and stir-fry 2 minutes so it picks up the aromatics.', ic: 'fish', min: 2, look: 'Flakes coated and slightly dried out.' },
        { t: 'Pour in the water, add the patola, and boil 8 minutes.', ic: 'pot', min: 8, look: 'Patola gone from opaque to translucent at the edges.' },
        { t: 'Add the misua and fish sauce and simmer 2 minutes only — misua turns to paste if you leave it.', ic: 'noodles', min: 2, look: 'Noodles soft and separate; broth lightly thickened by their starch.' },
        { t: 'Season with salt and pepper and serve straight away.', ic: 'plate', look: 'Thin cloudy broth, noodles still distinct.' }
      ]
    },
    core: {
      time: '25 min',
      about: 'The published recipe, with both patola and upo and sliced boiled egg on top. Serve it the moment the misua is in — it keeps drinking the broth.',
      steps: [
        { t: 'Boil the eggs 12 minutes, then cool, peel and slice them. Do this first so they are ready.', ic: 'egg', min: 12, look: 'Firm yolks, clean slices.' },
        { t: 'Heat the oil and sauté the onion and garlic.', ic: 'pan', min: 3, look: 'Softened and fragrant, no colour.' },
        { t: 'Put in the tuna flakes and stir-fry 2 minutes.', ic: 'fish', min: 2, look: 'Tuna broken up and coated.' },
        { t: 'Add the water, patola and upo. Stir and boil 10 minutes.', ic: 'pot', min: 10, look: 'Both gourds tender and translucent.' },
        { t: 'Add the misua and fish sauce and simmer 5 minutes.', ic: 'noodles', min: 5, look: 'Broth thickened noticeably; noodles soft.' },
        { t: 'Season with salt and pepper to taste.', ic: 'shaker', look: 'Broth tastes savoury rather than merely salty.' },
        { t: 'Ladle out and top each bowl with sliced boiled egg.', ic: 'plate', look: 'Egg slices floating on a pale, slightly thick broth.' }
      ]
    },
    complex: {
      time: '1 hr 10 min',
      about: 'Built on a quick stock from the tuna brine and aromatics instead of plain water, with toasted garlic and jammy soft-boiled eggs, and the misua toasted dry first so it holds its bite.',
      add: [
        { q: 2, u: 'thumbs', n: 'ginger', note: 'sliced' },
        { q: 1, u: 'head', n: 'garlic', note: 'half sliced for chips, half minced' },
        { q: 4, u: '', n: 'dried shiitake mushrooms', note: 'for the stock' },
        { q: 1, u: 'tbsp', n: 'calamansi juice', note: 'to finish' },
        { q: 2, u: 'stalks', n: 'spring onion', note: 'sliced' }
      ],
      steps: [
        { t: 'Make a quick stock: simmer the water with the shiitake, ginger and the reserved tuna brine 30 minutes, then strain. Tuna brine is free savouriness that most people pour down the sink.', ic: 'simmer', min: 30, look: 'Pale amber liquid smelling of mushroom and sea.' },
        { t: 'Fry the sliced garlic slowly in the oil until gold, 5 minutes. Strain out the chips and keep both.', ic: 'garlic', min: 5, look: 'Even gold chips; oil fragrant.' },
        { t: 'Toast the dry misua in a dry pan 2 minutes until it smells nutty and turns a shade darker. It will hold its bite in the broth instead of dissolving.', ic: 'pan', min: 2, look: 'Noodles faintly tan, smelling toasted.' },
        { t: 'Soft-boil the eggs exactly 7 minutes and plunge into ice water. Peel and halve.', ic: 'egg', min: 7, look: 'Set white, jammy orange centre.' },
        { t: 'Sweat the minced garlic and onion in the garlic oil 3 minutes, add the tuna and stir-fry 2 minutes.', ic: 'pan', min: 5, look: 'Aromatics soft, tuna coated and fragrant.' },
        { t: 'Pour in the strained stock, add the patola and upo, and simmer 10 minutes.', ic: 'pot', min: 10, look: 'Gourds translucent, broth still clear.' },
        { t: 'Add the toasted misua and fish sauce and simmer 3 minutes.', ic: 'noodles', min: 3, look: 'Noodles swollen but still separate.' },
        { t: 'Off the heat, stir in the calamansi juice and season.', ic: 'citrus', look: 'Smell lifts; the broth tastes brighter.' },
        { t: 'Serve topped with a halved soft egg, the garlic chips and spring onion.', ic: 'plate', look: 'Jammy yolk, crisp gold garlic, green onion on a pale broth.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST, Healthy Recipes for PWUDs', url: 'https://ddb.gov.ph/wp-content/uploads/2023/01/healthy_recipes_for_PWUDs-min.pdf' }
},

/* 27 --------------------------------------------------------------- */
{
  id: 'tuna-peas-patty',
  name: 'Tuna and Peas Patty',
  aka: 'Tortang Tuna at Gisantes',
  cat: 'breakfast',
  region: 'Nationwide',
  icon: 'egg',
  serves: 10,
  blurb: 'A tuna omelette patty studded with peas and bell pepper, fried in scoops and eaten with rice and banana ketchup.',
  nutr: { cal: 202, pro: 15.9, fat: 10.7, carb: 10, iron: 2.9 },
  keys: ['tuna', 'green peas', 'bell pepper', 'tomato', 'egg', 'flour', 'onion powder'],
  ing: [
    { q: 1, u: 'cup', n: 'tomato', note: 'diced' },
    { q: 1.75, u: 'cups', n: 'canned tuna flakes in brine', note: 'drained, 350 g', al: ['fish'], an: 'fish', sub: { fish: 'mashed white beans', vg: 'mashed white beans' } },
    { q: 0.33, u: 'cup', n: 'green bell pepper', note: 'diced' },
    { q: 0.33, u: 'cup', n: 'red bell pepper', note: 'diced' },
    { q: 2, u: 'cups', n: 'canned green peas', note: 'drained' },
    { q: 1, u: 'tbsp', n: 'onion powder' },
    { q: 1.5, u: 'tsp', n: 'iodized salt', sub: { lite: 'salt (use 1 tsp)' } },
    { q: 1, u: 'tsp', n: 'ground black pepper' },
    { q: 10, u: '', n: 'eggs', note: 'beaten', al: ['egg'], an: 'egg', sub: { egg: '2 cups chickpea flour whisked with 2 cups water', vg: '2 cups chickpea flour whisked with 2 cups water' } },
    { q: 1.5, u: 'tbsp', n: 'all-purpose flour', al: ['gluten'], sub: { gluten: 'rice flour or cornstarch' } },
    { q: 0.75, u: 'cup', n: 'vegetable oil', note: 'for frying', sub: { lite: 'oil (use 3 tbsp and cook in a non-stick pan)' } }
  ],
  tiers: {
    easy: {
      time: '20 min',
      about: 'One bell pepper instead of two and no tomato, so there is less moisture to fight and the patties hold together on the first try.',
      drop: ['tomato', 'red bell pepper'],
      steps: [
        { t: 'Mix the drained tuna, green bell pepper and peas in a bowl.', ic: 'mix', look: 'An evenly speckled mixture.' },
        { t: 'Season with the onion powder, salt and pepper.', ic: 'shaker', look: 'Seasoning visible through the mixture.' },
        { t: 'Beat the eggs with the flour until smooth, then stir into the tuna.', ic: 'whisk', look: 'A loose batter that just binds the solids.' },
        { t: 'Heat oil in a pan and drop in scoops of about 1/8 cup. Fry 3 minutes a side.', ic: 'pan', min: 6, look: 'Set golden edges; the patty lifts cleanly.' },
        { t: 'Drain and serve with banana ketchup and rice.', ic: 'plate', look: 'Gold patties flecked green and red.' }
      ]
    },
    core: {
      time: '30 min',
      about: 'The published recipe. The one thing that decides success is draining the tuna and peas hard — the egg can only bind so much liquid.',
      steps: [
        { t: 'Drain the tuna and the peas thoroughly, pressing them in a sieve.', ic: 'bowl', look: 'No liquid running when you tilt the sieve.' },
        { t: 'Mix the tomato, tuna and both bell peppers.', ic: 'mix', look: 'Colours evenly distributed.' },
        { t: 'Season with onion powder, salt and pepper to taste.', ic: 'shaker', look: 'Evenly seasoned throughout.' },
        { t: 'Beat the eggs with the flour, then fold into the mixture.', ic: 'whisk', look: 'Everything coated in a thin batter, not swimming in it.' },
        { t: 'Heat the oil over medium. Scoop 1/8 cup of mixture per patty into the pan.', ic: 'pan', look: 'Oil shimmering; the batter sizzles on contact.' },
        { t: 'Cook each side 3 minutes until set and golden.', ic: 'flame', min: 6, look: 'Firm, browned, holding together when turned.' },
        { t: 'Drain on a rack and serve with ketchup.', ic: 'plate', look: 'Crisp edges, moist centre.' }
      ]
    },
    complex: {
      time: '1 hr',
      about: 'The vegetables are cooked down first to drive off water, the batter is rested, and the patties are shaped in a ring so they come out even instead of ragged.',
      add: [
        { q: 1, u: '', n: 'onion', note: 'finely chopped, in place of the powder' },
        { q: 2, u: 'cloves', n: 'garlic', note: 'minced' },
        { q: 2, u: 'tbsp', n: 'spring onion', note: 'sliced' },
        { q: 1, u: 'tbsp', n: 'calamansi juice' },
        { q: 1, u: 'tsp', n: 'smoked paprika' }
      ],
      steps: [
        { t: 'Cook the tomato, onion, garlic and both bell peppers in 1 tbsp of the oil over medium heat 8 minutes until the pan is dry. Wet vegetables are why tortang tuna falls apart.', ic: 'pan', min: 8, look: 'No liquid left; vegetables glossy and slightly collapsed.' },
        { t: 'Spread them on a plate and cool completely. Hot vegetables will scramble the egg.', ic: 'chill', min: 10, look: 'Room temperature, no steam.' },
        { t: 'Squeeze the tuna dry in a clean cloth, then flake it loose with a fork.', ic: 'fish', look: 'Dry, fluffy flakes.' },
        { t: 'Beat the eggs with the flour, smoked paprika, salt and pepper, and rest the batter 15 minutes so the flour hydrates.', ic: 'timer', min: 15, look: 'Smooth, slightly thickened batter with no lumps.' },
        { t: 'Fold in the tuna, cooled vegetables, peas and spring onion.', ic: 'mix', look: 'Thick enough to mound on a spoon.' },
        { t: 'Set a greased metal ring in the pan, fill it with a scoop, and cook 3 minutes before lifting the ring away.', ic: 'pan', min: 3, look: 'A clean round edge; the top still slightly wet.' },
        { t: 'Flip and cook 2–3 minutes more until browned.', ic: 'flame', min: 3, look: 'Even gold on both faces, firm to the touch.' },
        { t: 'Finish with calamansi juice squeezed over, and serve with rice.', ic: 'citrus', look: 'Neat discs, bright with citrus.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST, Healthy Recipes for PWUDs', url: 'https://ddb.gov.ph/wp-content/uploads/2023/01/healthy_recipes_for_PWUDs-min.pdf' }
},

/* 28 --------------------------------------------------------------- */
{
  id: 'chicken-veggie-nuggets',
  name: 'Chicken Veggie Nuggets',
  aka: 'Nuggets na may Gulay',
  cat: 'snack',
  region: 'Nationwide',
  icon: 'chicken',
  serves: 10,
  blurb: 'Ground chicken bound with mashed potato and squash, hiding carrot and malunggay, breadcrumbed and fried. The most effective vegetable delivery system ever devised.',
  nutr: { cal: 193, pro: 16.5, fat: 8.2, carb: 11.4, iron: 1.9 },
  keys: ['chicken breast', 'potato', 'squash', 'carrot', 'malunggay', 'bread crumbs', 'egg', 'flour', 'banana ketchup'],
  ing: [
    { q: 1.33, u: 'cups', n: 'potato', note: 'boiled and mashed, 200 g' },
    { q: 2, u: 'cups', n: 'squash', note: 'boiled and mashed, 240 g' },
    { q: 2, u: '', n: 'eggs', al: ['egg'], an: 'egg', sub: { egg: '4 tbsp cornstarch slurry for binding and a flour-water wash for coating', vg: '4 tbsp cornstarch slurry' } },
    { q: 3, u: 'cups', n: 'chicken breast', note: 'ground, 630 g', an: 'meat', sub: { vg: 'crumbled firm tofu, squeezed dry', lite: 'skinless chicken breast, ground' } },
    { q: 1, u: 'cup', n: 'carrot', note: 'shredded' },
    { q: 0.75, u: 'cup', n: 'malunggay leaves', sub: { gluten: 'malunggay, or spinach' } },
    { q: 2, u: 'tsp', n: 'iodized salt', sub: { lite: 'salt (use 1 tsp)' } },
    { q: 2, u: 'tsp', n: 'onion powder' },
    { q: 1, u: 'tsp', n: 'ground black pepper' },
    { q: 0.5, u: 'cup', n: 'all-purpose flour', al: ['gluten'], sub: { gluten: 'rice flour' } },
    { q: 1, u: 'cup', n: 'bread crumbs', al: ['gluten'], sub: { gluten: 'gluten-free crumbs or crushed cornflakes' } },
    { q: 0.75, u: 'cup', n: 'vegetable oil', sub: { lite: 'oil (use 2 tbsp, or bake at 400°F for 20 min)' } },
    { q: 3, u: 'tbsp', n: 'banana ketchup', note: 'for the dip', al: ['gluten'], sub: { gluten: 'gluten-free ketchup' } },
    { q: 2, u: 'tbsp', n: 'mayonnaise', note: 'for the dip', al: ['egg'], an: 'egg', sub: { egg: 'vegan mayonnaise', vg: 'vegan mayonnaise', lite: 'plain yogurt' } }
  ],
  tiers: {
    easy: {
      time: '45 min',
      about: 'Flour-and-crumb only, no egg wash station, and baked instead of fried. Messier coating, far less standing over hot oil.',
      drop: ['vegetable oil'],
      steps: [
        { t: 'Boil the potato and squash until soft, drain very well, and mash.', ic: 'pot', min: 15, look: 'Dry, fluffy mash with no free water.' },
        { t: 'Mix in the ground chicken, carrot, malunggay, salt, onion powder and pepper.', ic: 'mix', look: 'An even orange-green mixture that holds together.' },
        { t: 'Shape into nuggets and roll straight in the breadcrumbs.', ic: 'knife', min: 10, look: 'Evenly coated, no bare patches.' },
        { t: 'Bake at 400°F / 200°C for 20 minutes, turning once.', ic: 'oven', min: 20, look: 'Crumb gone gold, nuggets firm.' },
        { t: 'Serve with the ketchup and mayonnaise stirred together.', ic: 'plate', look: 'Pale orange dip alongside.' }
      ]
    },
    core: {
      time: '1 hr',
      about: 'The published recipe, with the three-stage flour, egg and crumb coating. That order matters: flour grips the wet mixture, egg grips the flour, crumb grips the egg.',
      steps: [
        { t: 'Boil the potatoes and squash in a big pot, then drain and mash them.', ic: 'pot', min: 18, look: 'Soft enough to crush against the pot wall.' },
        { t: 'Let the mash steam dry in the hot pan a minute before mixing. Wet mash makes nuggets that burst in the oil.', ic: 'flame', min: 1, look: 'Surface gone matte, steam stopped.' },
        { t: 'Whisk one egg and combine with the potato, squash, ground chicken, carrot and malunggay.', ic: 'mix', look: 'A cohesive mixture that holds a shape when squeezed.' },
        { t: 'Season with salt, onion powder and pepper. Mix well.', ic: 'shaker', look: 'Evenly seasoned, no pale patches.' },
        { t: 'Form the mixture into nugget shapes.', ic: 'knife', min: 12, look: 'Even pieces, roughly 35 g each.' },
        { t: 'Dredge in flour, dip in the second beaten egg, then roll in breadcrumbs.', ic: 'bowl', look: 'A dry, even crumb coat with no wet spots.' },
        { t: 'Heat the oil and fry until golden brown, then drain to remove excess oil.', ic: 'pan', min: 8, look: 'Deep gold crust, firm all the way through.' },
        { t: 'Serve with the banana ketchup and mayonnaise combined as a dip.', ic: 'plate', look: 'Crisp nuggets, pink-orange dip.' }
      ]
    },
    complex: {
      time: '2 hr',
      about: 'Chilled and double-crumbed for a shell that genuinely shatters, with panko and a rested mixture so the nuggets hold a clean shape instead of spreading.',
      add: [
        { q: 1, u: 'cup', n: 'panko breadcrumbs', note: 'for the second coat', al: ['gluten'], sub: { gluten: 'crushed gluten-free cornflakes' } },
        { q: 2, u: 'cloves', n: 'garlic', note: 'minced' },
        { q: 2, u: 'tbsp', n: 'parmesan', note: 'finely grated', al: ['dairy'], an: 'dairy', sub: { dairy: 'nutritional yeast', vg: 'nutritional yeast', lite: 'omit' } },
        { q: 1, u: 'tsp', n: 'smoked paprika' }
      ],
      steps: [
        { t: 'Steam the potato and squash rather than boiling them — they come out drier, which is the whole battle with a vegetable nugget.', ic: 'steam', min: 25, look: 'Tender but not waterlogged; a skewer slides through.' },
        { t: 'Rice or sieve the mash while warm, then spread it on a tray to cool and dry 15 minutes.', ic: 'mix', min: 15, look: 'Fine, dry, fluffy mash.' },
        { t: 'Mix with the ground chicken, carrot, malunggay, garlic, parmesan, smoked paprika and seasoning. Work it 2 minutes until slightly sticky so it binds.', ic: 'mix', min: 2, look: 'The mixture clings to itself and pulls back from the bowl.' },
        { t: 'Chill 30 minutes. Cold mixture shapes cleanly and will not slump in the pan.', ic: 'chill', min: 30, look: 'Firm enough to cut rather than scoop.' },
        { t: 'Shape into even nuggets and chill again 10 minutes.', ic: 'knife', min: 10, look: 'Sharp-edged, uniform pieces.' },
        { t: 'Coat: flour, then beaten egg, then ordinary crumbs — then egg again and panko. The second coat is what makes the shell shatter.', ic: 'bowl', min: 15, look: 'A thick, craggy, completely dry crust.' },
        { t: 'Fry at 340°F / 170°C for 5–6 minutes. Lower than you would guess, so the chicken cooks before the crumb burns.', ic: 'flame', min: 6, look: 'Deep even gold; bubbling slowed to a gentle fizz.' },
        { t: 'Rest on a rack 3 minutes, then serve with the ketchup-mayonnaise dip.', ic: 'plate', min: 3, look: 'Audibly crisp; steam escaping when broken open.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST, Healthy Recipes for PWUDs', url: 'https://ddb.gov.ph/wp-content/uploads/2023/01/healthy_recipes_for_PWUDs-min.pdf' }
},

/* 29 --------------------------------------------------------------- */
{
  id: 'ensaladang-talong',
  name: 'Ensaladang Talong',
  aka: 'Grilled Eggplant Salad with Bagoong',
  cat: 'veg',
  region: 'Nationwide',
  icon: 'eggplant',
  serves: 10,
  blurb: 'Boiled eggplant peeled and dressed with tomato, onion, green mango and bagoong. Served cold, and meant to cut through something fried.',
  nutr: { cal: 86, pro: 5.8, fat: 0.6, carb: 14.5, iron: 2.4 },
  keys: ['eggplant', 'tomato', 'onion', 'green mango', 'bagoong', 'shrimp paste', 'vinegar', 'brown sugar'],
  ing: [
    { q: 4, u: 'cups', n: 'eggplant', note: 'medium size, 960 g' },
    { q: 1, u: 'tbsp', n: 'brown sugar', sub: { lite: 'omit' } },
    { q: 0.75, u: 'cup', n: 'tomato', note: 'diced' },
    { q: 0.75, u: 'cup', n: 'onion', note: 'chopped' },
    { q: 2, u: 'cups', n: 'unripe mango', note: 'diced, 330 g' },
    { q: 1.5, u: 'tsp', n: 'iodized salt', sub: { lite: 'salt (use 1 tsp)' } },
    { q: 1.5, u: 'tsp', n: 'ground black pepper' },
    { q: 0.75, u: 'cup', n: 'bagoong ginamos', al: ['shellfish', 'fish'], an: 'seafood', sub: { shellfish: 'white miso thinned with water', fish: 'white miso thinned with water', vg: 'white miso thinned with water', lite: 'bagoong (use 1/3 cup)' } },
    { q: 1, u: 'cup', n: 'vinegar' }
  ],
  tiers: {
    easy: {
      time: '25 min',
      about: 'No mango — just eggplant, tomato, onion and the bagoong dressing. The version most people actually assemble next to a plate of fried fish.',
      drop: ['unripe mango', 'brown sugar'],
      steps: [
        { t: 'Wash the eggplants and boil them whole 12 minutes until a knife slides in easily.', ic: 'pot', min: 12, look: 'Skins dull and wrinkled, flesh collapsing when pressed.' },
        { t: 'Cool under running water and peel the skin away — it should slip off in sheets.', ic: 'water', look: 'Pale green-white flesh, skin removed cleanly.' },
        { t: 'Tear the flesh into strips and mix with the tomato and onion.', ic: 'mix', look: 'Loose strands rather than mush.' },
        { t: 'Stir the bagoong into the vinegar, pour over, and season with pepper.', ic: 'bottle', look: 'Everything lightly coated in a grey-pink dressing.' },
        { t: 'Chill 20 minutes before serving.', ic: 'chill', min: 20, look: 'Cold, with the dressing settled into the eggplant.' }
      ]
    },
    core: {
      time: '30 min + chilling',
      about: 'The published recipe, with green mango for sourness and the dressing added only at the last moment so the salad does not go slack.',
      steps: [
        { t: 'Wash and drain the eggplant. Boil it, then remove the skin.', ic: 'pot', min: 14, look: 'Fork-tender flesh; skin peeling away easily.' },
        { t: 'In a bowl, mix the sugar, tomato, onion and mango. Sprinkle with salt and pepper.', ic: 'mix', look: 'Mango and tomato glossy where the sugar and salt have drawn juice.' },
        { t: 'Fold the peeled eggplant through, keeping the strands intact.', ic: 'eggplant', look: 'Eggplant visible as strips, not paste.' },
        { t: 'Chill in the refrigerator at least 30 minutes.', ic: 'chill', min: 30, look: 'Thoroughly cold, juices pooled at the bottom.' },
        { t: 'Just before serving, pour over the bagoong and vinegar mixture.', ic: 'bottle', look: 'Dressing sitting on top, only just stirred through.' },
        { t: 'Toss once and serve cold.', ic: 'plate', look: 'Glossy, sharp-smelling, still distinct pieces.' }
      ]
    },
    complex: {
      time: '1 hr',
      about: 'Eggplant charred over a flame instead of boiled, which is how it is done when there is a fire going — the smoke is the entire point, and boiling cannot fake it.',
      drop: ['vinegar'],
      add: [
        { q: 0.5, u: 'cup', n: 'cane vinegar', note: 'in place of plain vinegar' },
        { q: 4, u: '', n: 'calamansi', note: 'juiced' },
        { q: 2, u: '', n: 'siling labuyo', note: 'finely chopped' },
        { q: 2, u: 'tbsp', n: 'toasted garlic chips' }
      ],
      steps: [
        { t: 'Char the eggplants whole directly over a gas flame or hot coals, turning, 10–12 minutes until the skin is blackened all over and the flesh has collapsed.', ic: 'flame', min: 12, look: 'Skin blistered black and papery, eggplant slumped and soft.' },
        { t: 'Seal them in a covered bowl 10 minutes. The trapped steam loosens the skin and keeps the smoke in.', ic: 'timer', min: 10, look: 'Condensation on the bowl; skin lifting at the stem.' },
        { t: 'Peel, then pull the flesh into long strands with two forks rather than chopping it.', ic: 'knife', look: 'Silky strands, deeply smoky-smelling.' },
        { t: 'Macerate the onion in the cane vinegar and calamansi juice 15 minutes to take the raw bite off.', ic: 'timer', min: 15, look: 'Onion gone slightly translucent and pink at the edges.' },
        { t: 'Whisk the bagoong into the macerating liquid with the sugar until smooth.', ic: 'whisk', look: 'A smooth, glossy, grey-brown dressing.' },
        { t: 'Fold the eggplant, tomato, mango and chilies together and chill 20 minutes.', ic: 'chill', min: 20, look: 'Cold, with the colours still separate.' },
        { t: 'Dress at the table and scatter the toasted garlic over.', ic: 'plate', look: 'Smoky strands under a sharp dressing, crisp garlic on top.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST, Healthy Recipes for PWUDs', url: 'https://ddb.gov.ph/wp-content/uploads/2023/01/healthy_recipes_for_PWUDs-min.pdf' }
},

/* 30 --------------------------------------------------------------- */
{
  id: 'ginataang-puso-saging',
  name: 'Ginataang Puso ng Saging',
  aka: 'Banana Blossom in Coconut Milk',
  cat: 'veg',
  region: 'Nationwide',
  icon: 'coconut',
  serves: 10,
  blurb: 'Banana heart simmered in coconut cream with vinegar and chili. Cheap, meaty-textured, and the best argument for cooking the part of the plant everyone throws away.',
  nutr: { cal: 128, pro: 5.1, fat: 11.5, carb: 4.1, iron: 0.8 },
  keys: ['banana blossom', 'puso ng saging', 'coconut cream', 'vinegar', 'chili', 'garlic', 'onion'],
  ing: [
    { q: 2, u: 'tbsp', n: 'vegetable oil', sub: { lite: 'oil (use 1 tbsp)' } },
    { q: 1, u: 'tbsp', n: 'garlic', note: 'chopped' },
    { q: 3, u: 'tbsp', n: 'onion', note: 'chopped' },
    { q: 4, u: 'cups', n: 'banana blossoms', note: 'sliced, 360 g' },
    { q: 4, u: 'tbsp', n: 'vinegar' },
    { q: 4, u: '', n: 'red chilies' },
    { q: 1, u: 'cup', n: 'coconut cream', note: 'pure first extract' },
    { q: 1, u: 'cup', n: 'coconut cream', note: 'second extract', sub: { lite: 'light coconut milk' } },
    { q: 2, u: 'tsp', n: 'iodized salt', sub: { lite: 'salt (use 1 tsp)' } },
    { q: 1, u: 'tsp', n: 'ground black pepper' }
  ],
  tiers: {
    easy: {
      time: '35 min',
      about: 'Canned coconut milk and one chili. The only step you cannot skip is salting the sliced blossom first, or the dish will be astringent.',
      drop: ['coconut cream'],
      add: [{ q: 2, u: 'cups', n: 'canned coconut milk' }, { q: 1, u: 'tbsp', n: 'salt', note: 'for rubbing the blossom' }],
      steps: [
        { t: 'Slice the banana blossom thinly, rub it with the extra salt, and leave 10 minutes. Then squeeze out the dark liquid and rinse. This removes the bitterness and the sap that stains.', ic: 'bowl', min: 10, look: 'Dark brown liquid squeezed out; the blossom paler and limp.' },
        { t: 'Heat the oil and cook the garlic and onion 3 minutes.', ic: 'pan', min: 3, look: 'Soft and fragrant.' },
        { t: 'Add the blossom and cook 2 minutes.', ic: 'veg', min: 2, look: 'Strands glossy and slightly wilted.' },
        { t: 'Add the vinegar and chili and let it boil without stirring for 1 minute.', ic: 'bottle', min: 1, look: 'Sharp steam rising; surface bubbling.' },
        { t: 'Pour in the coconut milk and simmer 15 minutes until thick. Season and serve.', ic: 'simmer', min: 15, look: 'Sauce clinging to the strands, oil beginning to show.' }
      ]
    },
    core: {
      time: '45 min',
      about: 'The published recipe, with both coconut extracts — the thin one to cook the blossom tender, the thick one to finish. Adding them in that order is why the sauce does not split.',
      steps: [
        { t: 'Slice the banana blossoms, salt them, squeeze and rinse to remove the bitter sap.', ic: 'bowl', min: 10, look: 'Rinsed strands, no longer staining your hands brown.' },
        { t: 'Heat a pan and pour in the cooking oil.', ic: 'pan', look: 'Oil shimmering.' },
        { t: 'Sauté the garlic and onion until the onion becomes soft.', ic: 'onion', min: 4, look: 'Translucent onion, fragrant garlic.' },
        { t: 'Add the banana blossoms and cook 2 minutes.', ic: 'veg', min: 2, look: 'Strands coated and beginning to soften.' },
        { t: 'Add the vinegar and chili and let it boil. Do not stir while it boils off.', ic: 'bottle', min: 2, look: 'Vigorous bubbling, the raw vinegar smell burning away.' },
        { t: 'Pour in the second extract first and simmer 15 minutes until the blossom is tender.', ic: 'simmer', min: 15, look: 'Blossom soft, liquid reduced by about a third.' },
        { t: 'Add the pure first extract and simmer gently 8 minutes more — a hard boil now will curdle it.', ic: 'coconut', min: 8, look: 'Thick, glossy sauce; oil just starting to separate.' },
        { t: 'Season with salt and pepper and serve with rice.', ic: 'plate', look: 'Creamy strands flecked red with chili.' }
      ]
    },
    complex: {
      time: '1 hr 30 min',
      about: 'Coconut milk pressed from fresh grated coconut in two strengths, the blossom blanched before cooking, and the dish finished with toasted coconut for texture.',
      drop: ['coconut cream'],
      add: [
        { q: 2, u: '', n: 'mature coconuts', note: 'grated, for fresh gata' },
        { q: 3, u: 'cups', n: 'warm water', note: 'for pressing' },
        { q: 2, u: 'thumbs', n: 'ginger', note: 'julienned' },
        { q: 3, u: 'tbsp', n: 'toasted grated coconut', note: 'to finish' },
        { q: 1, u: 'tbsp', n: 'bagoong alamang', note: 'optional', al: ['shellfish', 'fish'], an: 'seafood', sub: { shellfish: 'white miso', vg: 'white miso', fish: 'white miso' } }
      ],
      steps: [
        { t: 'Press the fresh coconut: knead 1 cup warm water into the grated flesh and squeeze through muslin for the thick first extract. Repeat with the remaining water for the thin.', ic: 'coconut', min: 15, look: 'One bowl of thick cream, one of thinner milk.' },
        { t: 'Slice the blossom, salt it, squeeze hard, then blanch 2 minutes in boiling water and drain. Blanching after salting takes out the last of the astringency.', ic: 'pot', min: 12, look: 'Pale, clean-smelling strands with no brown sap left.' },
        { t: 'Toast the grated coconut in a dry pan 4 minutes until deep gold, and set aside.', ic: 'pan', min: 4, look: 'Evenly browned, smelling nutty.' },
        { t: 'Sweat the ginger, garlic and onion in the oil 5 minutes.', ic: 'ginger', min: 5, look: 'Aromatics soft, nothing browned.' },
        { t: 'Fry the bagoong 2 minutes until it darkens, then add the blossom and cook 3 minutes.', ic: 'shaker', min: 5, look: 'Paste rust-brown; blossom coated and glossy.' },
        { t: 'Add the vinegar and boil 2 minutes undisturbed.', ic: 'bottle', min: 2, look: 'Sharp smell giving way to something rounder.' },
        { t: 'Pour in the thin coconut milk and simmer uncovered 20 minutes until the blossom is completely tender.', ic: 'simmer', min: 20, look: 'Reduced by half, blossom soft to the bite.' },
        { t: 'Add the first extract and the chilies and simmer very gently 10 minutes until the oil separates.', ic: 'coconut', min: 10, look: 'Clear coconut oil pooling at the edges of a thick sauce.' },
        { t: 'Season, rest 5 minutes, and serve scattered with the toasted coconut.', ic: 'plate', min: 5, look: 'Rich sauce with gold toasted coconut over the top.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST, Healthy Recipes for PWUDs', url: 'https://ddb.gov.ph/wp-content/uploads/2023/01/healthy_recipes_for_PWUDs-min.pdf' }
}

);

/* ==================================================================
   FNRI-DOST / IIRR / DepEd — "Iron Rich Recipes" (2017)

   Developed for the GarNESupp school feeding programme. Every dish is
   built around an iron source — monggo, pork liver, dilis, malunggay,
   kidney beans — and the booklet publishes energy, protein and iron
   per serving but no fat or carbohydrate, so neither is invented here.
   All yields are 10 servings. Steps and variants rewritten in full.
   ================================================================== */

window.RECIPES.push(

/* 31 --------------------------------------------------------------- */
{
  id: 'ginisang-togue',
  name: 'Ginisang Togue',
  aka: 'Sautéed Bean Sprouts with Tokwa',
  cat: 'veg',
  region: 'Nationwide',
  icon: 'sprout',
  serves: 10,
  blurb: 'Bean sprouts and fried tofu with banana heart and kinchay. Two pesos of vegetables made to taste like a proper dish.',
  nutr: { cal: 322, pro: 6.92, iron: 3.07 },
  keys: ['togue', 'bean sprouts', 'tokwa', 'tofu', 'garlic', 'onion', 'soy sauce', 'kinchay', 'puso ng saging', 'banana blossom'],
  ing: [
    { q: 1, u: 'cup', n: 'coconut oil', note: 'for frying the tokwa', sub: { lite: 'oil (use 3 tbsp and shallow-fry)' } },
    { q: 1.25, u: 'cups', n: 'tokwa', note: '300 g', al: ['soy'], sub: { soy: 'firm paneer or halloumi, cubed' } },
    { q: 1.5, u: 'tbsp', n: 'coconut oil', note: 'for sautéing' },
    { q: 2, u: 'tbsp', n: 'garlic', note: 'minced' },
    { q: 0.25, u: 'cup', n: 'onion', note: 'sliced' },
    { q: 1.5, u: 'cups', n: 'togue (bean sprouts)', note: '360 g' },
    { q: 2, u: 'cups', n: 'water' },
    { q: 1, u: 'tsp', n: 'iodized salt', sub: { lite: 'salt (use 1/2 tsp)' } },
    { q: 0.25, u: 'cup', n: 'soy sauce', al: ['gluten', 'soy'], sub: { gluten: 'tamari', soy: 'coconut aminos', lite: 'low-sodium soy sauce' } },
    { q: 1, u: 'tbsp', n: 'white sugar', sub: { lite: 'omit' } },
    { q: 0.5, u: 'cup', n: 'kinchay leaves', note: '60 g' },
    { q: 0.5, u: 'cup', n: 'puso ng saging', note: 'banana heart, sliced, 120 g' }
  ],
  tiers: {
    easy: {
      time: '20 min',
      about: 'Sprouts, tofu and aromatics only. Banana heart and kinchay come out — neither is easy to find outside a wet market.',
      drop: ['puso ng saging', 'kinchay leaves'],
      steps: [
        { t: 'Press the tokwa dry between paper, cube it, and fry until golden. Set aside.', ic: 'pan', min: 8, look: 'Crisp gold skin on every face.' },
        { t: 'In a second pan, sauté the garlic and onion 2 minutes, then add the togue.', ic: 'pan', min: 3, look: 'Sprouts glossy and just beginning to wilt.' },
        { t: 'Return the tokwa, season with the soy sauce and sugar, and cook 5 minutes over medium heat.', ic: 'bottle', min: 5, look: 'Everything coated, pan nearly dry.' },
        { t: 'Season with salt and serve with rice. Togue goes limp fast — take it off while it still has snap.', ic: 'plate', look: 'Sprouts still crunchy, not translucent.' }
      ]
    },
    core: {
      time: '30 min',
      about: 'The published recipe. The tofu is fried separately and returned at the end so it keeps its crust instead of steaming in the vegetables.',
      steps: [
        { t: 'In a pan, heat the frying oil and fry the tokwa until golden brown. Set aside.', ic: 'pan', min: 8, look: 'Firm, deep gold cubes.' },
        { t: 'In another pan, heat the sautéing oil and sauté the garlic, onion and togue.', ic: 'veg', min: 4, look: 'Aromatics soft, sprouts bright and glossy.' },
        { t: 'Add the fried tokwa and season with the soy sauce and sugar. Cook 5 minutes over medium fire.', ic: 'bottle', min: 5, look: 'A thin glaze clinging to the tofu.' },
        { t: 'Add the kinchay and puso ng saging. Let it simmer another 3 minutes.', ic: 'leaf', min: 3, look: 'Kinchay wilted, banana heart tender.' },
        { t: 'Taste, add salt if needed, and serve hot with rice.', ic: 'plate', look: 'Sprouts still with bite, tofu still crisp at the edges.' }
      ]
    },
    complex: {
      time: '1 hr',
      about: 'Tokwa pressed and twice-fried so it stays crisp under the sauce, banana heart salted and rinsed properly, and a quick sauce built in the pan rather than poured from a bottle.',
      add: [
        { q: 2, u: 'thumbs', n: 'ginger', note: 'julienned' },
        { q: 1, u: 'tbsp', n: 'oyster sauce', al: ['shellfish', 'gluten', 'soy'], an: 'seafood', sub: { shellfish: 'mushroom stir-fry sauce', vg: 'mushroom stir-fry sauce', gluten: 'gluten-free oyster sauce' } },
        { q: 1, u: 'tsp', n: 'cornstarch', note: 'slaked in 2 tbsp water' },
        { q: 2, u: 'stalks', n: 'spring onion', note: 'sliced' },
        { q: 1, u: 'tbsp', n: 'salt', note: 'for rubbing the banana heart' }
      ],
      steps: [
        { t: 'Slice the banana heart thinly, rub with the extra salt, leave 10 minutes, then squeeze and rinse until the water runs clear.', ic: 'bowl', min: 10, look: 'Dark sap squeezed out; strands pale and clean.' },
        { t: 'Press the tokwa under a weight 20 minutes, then cube it.', ic: 'chill', min: 20, look: 'Noticeably firmer, a puddle of whey drawn off.' },
        { t: 'Fry the tokwa at 325°F / 165°C for 4 minutes, rest it, then fry again at 375°F / 190°C for 90 seconds. The second fry is what keeps it crisp once the sauce goes on.', ic: 'flame', min: 7, look: 'Puffed, deep gold, audibly crisp.' },
        { t: 'Stir-fry the ginger, garlic and onion over high heat 2 minutes, then add the banana heart and cook 4 minutes.', ic: 'ginger', min: 6, look: 'Aromatics fragrant, banana heart softened.' },
        { t: 'Add the togue and toss for 60 seconds only — high heat, constant movement, so they sear rather than sweat.', ic: 'flame', min: 1, look: 'Sprouts glossy and hot but still snapping.' },
        { t: 'Pour in the soy sauce, oyster sauce and sugar, then the cornstarch slurry, and toss until it glazes.', ic: 'whisk', min: 1, look: 'A glossy sauce coating everything, nothing pooling.' },
        { t: 'Fold in the tokwa, kinchay and spring onion off the heat and serve immediately.', ic: 'plate', look: 'Crisp tofu sitting on glossy sprouts, greens just wilted.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 32 --------------------------------------------------------------- */
{
  id: 'tokwa-balls',
  name: 'Tokwa Balls with Sweet & Sour Sauce',
  aka: 'Bola-bolang Tokwa',
  cat: 'snack',
  region: 'Nationwide',
  icon: 'tofu',
  serves: 10,
  blurb: 'Mung bean, liver and tofu rolled into balls and fried, with a sweet-sour sauce. The highest-iron thing in the whole book.',
  nutr: { cal: 325, pro: 12.55, iron: 6.82 },
  keys: ['monggo', 'mung beans', 'tokwa', 'tofu', 'pork liver', 'saluyot', 'egg', 'flour', 'vinegar', 'soy sauce'],
  ing: [
    { q: 0.66, u: 'cup', n: 'green monggo', note: 'raw, 160 g' },
    { q: 2, u: 'cups', n: 'water', note: 'for boiling the monggo' },
    { q: 0.33, u: 'cup', n: 'saluyot leaves', note: 'finely chopped, 80 g' },
    { q: 1, u: 'cup', n: 'pork liver', note: 'boiled and finely chopped, 240 g', an: 'meat', sub: { vg: 'finely chopped shiitake, plus 1 tsp miso', lite: 'pork liver (use 1/2 cup)' } },
    { q: 0.66, u: 'cup', n: 'tokwa', note: 'finely chopped, 160 g', al: ['soy'], sub: { soy: 'crumbled paneer' } },
    { q: 1, u: '', n: 'egg', note: 'beaten', al: ['egg'], an: 'egg', sub: { egg: '3 tbsp cornstarch slurry', vg: '3 tbsp cornstarch slurry' } },
    { q: 0.25, u: 'cup', n: 'onion', note: 'finely chopped' },
    { q: 0.33, u: 'cup', n: 'all-purpose flour', note: '80 g', al: ['gluten'], sub: { gluten: 'rice flour' } },
    { q: 1, u: 'tsp', n: 'iodized salt' },
    { q: 0.75, u: 'cup', n: 'coconut oil', note: 'for frying', sub: { lite: 'oil (use 3 tbsp, or bake at 400°F)' } },
    { q: 3, u: 'tbsp', n: 'vinegar', note: 'for the sauce' },
    { q: 1, u: 'tbsp', n: 'soy sauce', note: 'for the sauce', al: ['gluten', 'soy'], sub: { gluten: 'tamari', soy: 'coconut aminos' } },
    { q: 0.5, u: 'tsp', n: 'garlic', note: 'minced, for the sauce' },
    { q: 1, u: 'tbsp', n: 'white sugar', note: 'for the sauce', sub: { lite: 'sugar (use 1 tsp)' } },
    { q: 1, u: 'tbsp', n: 'cornstarch', note: 'for the sauce' },
    { q: 1, u: 'cup', n: 'water', note: 'for the sauce' }
  ],
  tiers: {
    easy: {
      time: '45 min',
      about: 'No liver and bought sweet chili sauce instead of making one. It costs you about half the iron, but it is the version a reluctant eater will actually try.',
      drop: ['pork liver', 'vinegar', 'soy sauce', 'garlic', 'white sugar', 'cornstarch', 'water'],
      steps: [
        { t: 'Boil the monggo in the 2 cups water until soft, about 35 minutes, then drain well.', ic: 'pot', min: 35, look: 'Beans split and soft; no free liquid left.' },
        { t: 'Mash the monggo roughly and mix with the saluyot, tokwa, onion, egg, flour and salt.', ic: 'mix', look: 'A thick mixture that holds a ball when squeezed.' },
        { t: 'Scoop 1 tbsp at a time and roll into balls.', ic: 'knife', min: 10, look: 'Even, smooth-surfaced balls about the size of a walnut.' },
        { t: 'Deep-fry over low heat until golden brown — low, or they brown before the middle cooks.', ic: 'pan', min: 6, look: 'Even gold all round, firm when pressed.' },
        { t: 'Drain on a rack and serve with sweet chili sauce.', ic: 'plate', look: 'Crisp shell, dense green-brown centre.' }
      ]
    },
    core: {
      time: '1 hr',
      about: 'The published recipe. The sauce is cooked separately and stirred the whole time — cornstarch sauces catch on the bottom the moment you look away.',
      steps: [
        { t: 'Boil the monggo in 2 cups of water until cooked.', ic: 'pot', min: 35, look: 'Beans soft enough to crush between your fingers.' },
        { t: 'Combine all the ball ingredients except the oil. Mix well.', ic: 'mix', look: 'A uniform mixture, thick enough to shape.' },
        { t: 'Scoop 1 tbsp of the mixture and form into a ball.', ic: 'knife', min: 12, look: 'Smooth, even balls with no cracks.' },
        { t: 'Deep-fry over low fire until golden brown.', ic: 'pan', min: 7, look: 'Deep gold, cooked through to the centre.' },
        { t: 'For the sauce, combine all the sauce ingredients in a casserole.', ic: 'bowl', look: 'A cloudy liquid with the cornstarch suspended.' },
        { t: 'Cook while continuously mixing until the sauce thickens.', ic: 'whisk', min: 5, look: 'Glossy and translucent, coating the back of a spoon.' },
        { t: 'Pour over the balls or serve alongside.', ic: 'plate', look: 'Shiny amber sauce over crisp brown balls.' }
      ]
    },
    complex: {
      time: '1 hr 45 min',
      about: 'The liver soaked in milk to take the metallic edge off, the mixture chilled so it fries cleanly, and the sauce built from a real pineapple and vinegar reduction.',
      add: [
        { q: 0.5, u: 'cup', n: 'milk', note: 'for soaking the liver', al: ['dairy'], an: 'dairy', sub: { dairy: 'water with 1 tbsp vinegar', vg: 'omit — the liver is replaced anyway' } },
        { q: 0.5, u: 'cup', n: 'pineapple juice', note: 'for the sauce' },
        { q: 2, u: 'tbsp', n: 'banana ketchup', note: 'for the sauce', al: ['gluten'], sub: { gluten: 'gluten-free ketchup' } },
        { q: 1, u: 'thumb', n: 'ginger', note: 'minced' },
        { q: 2, u: 'tbsp', n: 'spring onion', note: 'finely sliced' }
      ],
      steps: [
        { t: 'Soak the liver in the milk 30 minutes, then rinse and pat dry before boiling. This is the standard fix for the metallic taste that puts people off liver.', ic: 'chill', min: 30, look: 'Milk tinged pink; liver paler and milder-smelling.' },
        { t: 'Boil the liver 12 minutes, cool, then chop it as finely as you can — almost to a paste.', ic: 'pot', min: 12, look: 'Fine, even mince with no visible lumps.' },
        { t: 'Boil and drain the monggo, then mash half of it and leave the rest whole, for texture.', ic: 'pot', min: 35, look: 'Half purée, half intact beans.' },
        { t: 'Mix everything with the ginger and spring onion, working it 1 minute until it turns slightly tacky and binds.', ic: 'mix', min: 1, look: 'The mixture clings to itself and pulls from the bowl.' },
        { t: 'Chill 30 minutes, then roll into even balls. Cold mixture holds a round shape in the oil.', ic: 'chill', min: 30, look: 'Firm enough to roll without sticking to your palms.' },
        { t: 'Fry at 325°F / 165°C for 5–6 minutes, turning, until deep gold and cooked through.', ic: 'flame', min: 6, look: 'Even colour, floating high, bubbling slowed.' },
        { t: 'Make the sauce: simmer the pineapple juice, vinegar, soy, ketchup, sugar and garlic 8 minutes, then thicken with the slaked cornstarch.', ic: 'simmer', min: 8, look: 'A clear, glossy, deep amber sauce.' },
        { t: 'Toss the balls in the sauce just before serving so they stay crisp.', ic: 'plate', look: 'A thin lacquer of sauce, not a puddle.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 33 --------------------------------------------------------------- */
{
  id: 'tortang-gulay',
  name: 'Tortang Gulay',
  aka: 'Vegetable and Mung Bean Patties',
  cat: 'veg',
  region: 'Nationwide',
  icon: 'veg',
  serves: 10,
  blurb: 'Thin fried patties of mung bean, malunggay, banana heart and tofu. A whole vegetable garden held together by two eggs.',
  nutr: { cal: 325, pro: 12.55, iron: 6.82 },
  nutrNote: 'The booklet prints an identical nutrient panel for Tortang Gulay and Tokwa Balls despite different serving sizes, which looks like a duplication in the original layout. The figures are reproduced as published — treat them as approximate.',
  keys: ['monggo', 'mung beans', 'malunggay', 'tokwa', 'tofu', 'egg', 'flour', 'kinchay', 'puso ng saging', 'banana blossom'],
  ing: [
    { q: 1.75, u: 'cups', n: 'green monggo', note: 'raw, 420 g' },
    { q: 1.5, u: 'cups', n: 'water', note: 'for boiling' },
    { q: 0.25, u: 'cup', n: 'malunggay leaves', note: '60 g' },
    { q: 0.5, u: 'tbsp', n: 'iodized salt', sub: { lite: 'salt (use 1 tsp)' } },
    { q: 2, u: '', n: 'eggs', note: 'beaten', al: ['egg'], an: 'egg', sub: { egg: '6 tbsp chickpea flour whisked with 6 tbsp water', vg: '6 tbsp chickpea flour whisked with 6 tbsp water' } },
    { q: 0.5, u: 'tsp', n: 'garlic', note: 'minced' },
    { q: null, u: '', n: 'ground black pepper', note: 'a pinch' },
    { q: 0.75, u: 'cup', n: 'all-purpose flour', note: '180 g', al: ['gluten'], sub: { gluten: 'rice flour' } },
    { q: 0.25, u: 'cup', n: 'onion', note: 'finely chopped' },
    { q: 0.25, u: 'cup', n: 'tokwa', note: 'finely chopped, 60 g', al: ['soy'], sub: { soy: 'crumbled paneer' } },
    { q: 0.25, u: 'cup', n: 'kinchay leaves', note: 'finely chopped, 60 g' },
    { q: 0.25, u: 'cup', n: 'puso ng saging', note: 'chopped, 60 g' },
    { q: 0.33, u: 'cup', n: 'coconut oil', note: 'for frying', sub: { lite: 'oil (use 2 tbsp in a non-stick pan)' } }
  ],
  tiers: {
    easy: {
      time: '50 min',
      about: 'Monggo, malunggay and egg only. Fewer things to chop, and the patties hold together more reliably with less wet vegetable in them.',
      drop: ['puso ng saging', 'kinchay leaves', 'tokwa'],
      steps: [
        { t: 'Boil the monggo until soft, about 35 minutes, then drain thoroughly and mash.', ic: 'pot', min: 35, look: 'Thick, dry mash with no standing water.' },
        { t: 'Mix in the malunggay, onion, garlic, beaten egg, flour, salt and pepper.', ic: 'mix', look: 'A thick green-brown batter that mounds on a spoon.' },
        { t: 'Heat a thin film of oil and drop in spoonfuls, flattening each into a thin patty.', ic: 'pan', look: 'Patties about 1 cm thick, spreading only slightly.' },
        { t: 'Fry 3 minutes a side until golden and set.', ic: 'flame', min: 6, look: 'Crisp brown edges, firm centre.' },
        { t: 'Drain and serve with rice and vinegar.', ic: 'plate', look: 'Thin, lacy-edged green patties.' }
      ]
    },
    core: {
      time: '1 hr',
      about: 'The published recipe. "Thin patties" is the instruction that matters — thick ones stay raw in the middle because the mixture is mostly vegetable.',
      steps: [
        { t: 'Put the monggo seeds on to boil until soft. Drain well and set aside.', ic: 'pot', min: 35, look: 'Soft beans, drained dry.' },
        { t: 'Combine all the ingredients except the oil and mix well.', ic: 'mix', look: 'An even mixture with the greens distributed throughout.' },
        { t: 'From the mixture, create thin patties.', ic: 'knife', min: 10, look: 'Flat discs, no thicker than a finger.' },
        { t: 'Heat the oil until a scrap of mixture sizzles on contact.', ic: 'flame', look: 'Oil shimmering, not smoking.' },
        { t: 'Deep-fry until golden brown, turning once.', ic: 'pan', min: 7, look: 'Deep gold on both faces, set all the way through.' },
        { t: 'Drain on a rack and serve hot.', ic: 'plate', look: 'Crisp outside, moist green inside.' }
      ]
    },
    complex: {
      time: '1 hr 30 min',
      about: 'The vegetables salted and wrung out first, the batter rested, and the patties shallow-fried in a ring so they come out even and thin rather than domed.',
      add: [
        { q: 1, u: 'tbsp', n: 'salt', note: 'for drawing water from the vegetables' },
        { q: 2, u: 'tbsp', n: 'toasted ground rice', note: 'binder' },
        { q: 1, u: 'thumb', n: 'ginger', note: 'finely grated' },
        { q: 1, u: 'tbsp', n: 'calamansi juice' }
      ],
      steps: [
        { t: 'Toss the chopped banana heart and kinchay with the extra salt and leave 15 minutes, then wring them out in a cloth. This is where tortang gulay usually fails — the vegetables leak into the batter in the pan.', ic: 'bowl', min: 15, look: 'A surprising amount of green liquid wrung out.' },
        { t: 'Boil and drain the monggo, then dry it further in the hot pan for a minute.', ic: 'pot', min: 35, look: 'Matte, dry beans with no steam coming off.' },
        { t: 'Toast the ground rice in a dry pan 3 minutes until it smells like popcorn.', ic: 'pan', min: 3, look: 'Pale tan powder, nutty-smelling.' },
        { t: 'Whisk the eggs with the flour, toasted rice, ginger, salt and pepper, and rest 15 minutes.', ic: 'timer', min: 15, look: 'Smooth, slightly thickened batter.' },
        { t: 'Fold in the monggo, wrung-out vegetables, malunggay, tokwa and onion.', ic: 'mix', look: 'Thick enough that a spoon leaves a trench.' },
        { t: 'Set a greased ring in the pan, fill with a scoop, press flat, and lift the ring after 2 minutes.', ic: 'pan', min: 2, look: 'A clean-edged disc, top still matte.' },
        { t: 'Fry 3 minutes a side until deeply golden.', ic: 'flame', min: 6, look: 'Even brown, crisp lacy edge.' },
        { t: 'Finish with calamansi squeezed over and serve.', ic: 'citrus', look: 'Neat rounds, bright-smelling.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 34 --------------------------------------------------------------- */
{
  id: 'rebosadong-gulay',
  name: 'Rebosadong Gulay',
  aka: 'Battered Vegetable Fritters',
  cat: 'snack',
  region: 'Nationwide',
  icon: 'leaf',
  serves: 10,
  blurb: 'Malunggay, squash, kamote and sprouts bound in a sesame batter and fried. Merienda that happens to carry 5 mg of iron a serving.',
  nutr: { cal: 485, pro: 8.61, iron: 5.02 },
  keys: ['malunggay', 'squash', 'kamote', 'sweet potato', 'togue', 'bean sprouts', 'tokwa', 'sesame seeds', 'flour', 'egg'],
  ing: [
    { q: 1, u: 'cup', n: 'all-purpose flour', note: '120 g', al: ['gluten'], sub: { gluten: 'rice flour plus 1 tsp cornstarch' } },
    { q: 2, u: '', n: 'eggs', note: 'beaten', al: ['egg'], an: 'egg', sub: { egg: '6 tbsp aquafaba', vg: '6 tbsp aquafaba' } },
    { q: 1, u: 'tsp', n: 'iodized salt' },
    { q: 0.5, u: 'tbsp', n: 'baking powder' },
    { q: 1.125, u: 'cups', n: 'tokwa', note: 'mashed, 150 g', al: ['soy'], sub: { soy: 'mashed white beans' } },
    { q: 0.33, u: 'cup', n: 'water' },
    { q: 0.5, u: 'tbsp', n: 'sesame seeds', note: 'ground', al: ['sesame'], sub: { sesame: 'ground sunflower seeds' } },
    { q: 1.33, u: 'cups', n: 'malunggay leaves', note: '400 g' },
    { q: 0.75, u: 'cup', n: 'squash', note: 'sliced thinly, 180 g' },
    { q: 0.5, u: 'cup', n: 'kinchay', note: 'sliced thinly, 120 g' },
    { q: 0.75, u: 'cup', n: 'yellow kamote', note: 'sliced thinly, 180 g' },
    { q: 0.5, u: 'cup', n: 'togue', note: '120 g' },
    { q: 1.5, u: 'cups', n: 'coconut oil', note: 'for frying', sub: { lite: 'oil (use 4 tbsp and shallow-fry)' } }
  ],
  tiers: {
    easy: {
      time: '30 min',
      about: 'Three vegetables instead of five, and shallow-fried in a pan. The batter is the same; there is just less to slice.',
      drop: ['kinchay', 'togue', 'sesame seeds'],
      steps: [
        { t: 'Whisk the flour, eggs, salt, baking powder, mashed tokwa and water into a thick batter.', ic: 'whisk', look: 'Thick enough to coat a spoon heavily.' },
        { t: 'Slice the squash and kamote as thinly as you can — thick slices stay raw inside the batter.', ic: 'knife', min: 8, look: 'Almost translucent slices.' },
        { t: 'Fold in the malunggay, squash and kamote until everything is coated.', ic: 'mix', look: 'Vegetables held together by batter, not swimming.' },
        { t: 'Shallow-fry spoonfuls over medium heat, 3 minutes a side.', ic: 'pan', min: 6, look: 'Golden, crisp at the ragged edges.' },
        { t: 'Drain on a rack and serve with spiced vinegar.', ic: 'plate', look: 'Craggy gold fritters with green showing through.' }
      ]
    },
    core: {
      time: '45 min',
      about: 'The published recipe, with sesame in the batter and all five vegetables. The batter goes together first and the vegetables fold in after — that order keeps it from going lumpy.',
      steps: [
        { t: 'Combine the flour, egg, salt, baking powder, mashed tokwa and water. Mix well.', ic: 'whisk', look: 'A smooth, thick batter with the tofu fully worked in.' },
        { t: 'Add the ground sesame seeds, malunggay, squash, kinchay, kamote and togue. Mix well.', ic: 'mix', look: 'A dense vegetable mixture barely held by batter.' },
        { t: 'Form into frying shapes — flattened mounds roughly 30 g each.', ic: 'knife', min: 10, look: 'Even, loosely packed shapes.' },
        { t: 'Heat the oil to a medium flame.', ic: 'flame', look: 'A drop of batter sizzles and rises straight away.' },
        { t: 'Fry under a medium flame until golden brown, turning once.', ic: 'pan', min: 7, look: 'Deep gold, crisp, no raw batter at the centre.' },
        { t: 'Drain and serve hot with vinegar dip.', ic: 'plate', look: 'Crunchy outside, soft vegetable inside.' }
      ]
    },
    complex: {
      time: '1 hr 15 min',
      about: 'An ice-cold, barely-mixed batter with cornstarch and soda water — the tempura principle — so the shell is light and brittle instead of bready.',
      add: [
        { q: 0.5, u: 'cup', n: 'cornstarch', note: 'in place of some flour' },
        { q: 0.75, u: 'cup', n: 'soda water', note: 'ice cold, in place of the water' },
        { q: 1, u: 'tsp', n: 'toasted sesame oil', al: ['sesame'], sub: { sesame: 'omit' } },
        { q: 6, u: '', n: 'ice cubes', note: 'to keep the batter cold', fixed: true }
      ],
      steps: [
        { t: 'Slice every vegetable to an even 2 mm and spread them on a cloth to dry 15 minutes. Wet vegetables steam inside the batter and make it soggy from within.', ic: 'knife', min: 15, look: 'Uniform slices, surfaces dry to the touch.' },
        { t: 'Sift the flour, cornstarch, salt and baking powder together twice.', ic: 'bowl', look: 'A light, aerated dry mix.' },
        { t: 'Whisk the eggs into the ice-cold soda water, then tip in the dry mix and stir about eight strokes only. Lumps are correct — overmixing develops gluten and gives you a bready shell.', ic: 'whisk', look: 'A thin, lumpy batter you can still see dry flour in.' },
        { t: 'Sit the bowl in a larger bowl of ice to keep the batter cold while you work.', ic: 'chill', look: 'Batter cold to the touch, staying thin.' },
        { t: 'Fold in the mashed tokwa, sesame and the dried vegetables with a few strokes.', ic: 'mix', look: 'Vegetables coated in a thin, uneven film.' },
        { t: 'Fry at 350°F / 175°C in small batches, 3 minutes, never crowding the pan.', ic: 'flame', min: 3, look: 'Pale gold, blistered, visibly lacy.' },
        { t: 'Drain upright on a rack and finish with a few drops of sesame oil.', ic: 'plate', look: 'Shatteringly crisp; the fritter clicks against the rack.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 35 --------------------------------------------------------------- */
{
  id: 'beans-tok-lumpia',
  name: 'Beans-Tok Lumpia',
  aka: 'White Bean and Tofu Spring Rolls',
  cat: 'snack',
  region: 'Nationwide',
  icon: 'skewer',
  serves: 10,
  blurb: 'White beans, squash, tofu and liver wrapped and fried. A lumpia with no ground pork in it at all, and more iron for it.',
  nutr: { cal: 371, pro: 10.86, iron: 4.38 },
  keys: ['kidney beans', 'white beans', 'tokwa', 'tofu', 'squash', 'pork liver', 'lumpia wrapper', 'puso ng saging', 'garlic', 'onion'],
  ing: [
    { q: 2, u: 'tbsp', n: 'coconut oil', note: 'for frying the tokwa' },
    { q: 0.5, u: 'cup', n: 'tokwa', note: 'sliced, 120 g', al: ['soy'], sub: { soy: 'paneer' } },
    { q: 2, u: 'cups', n: 'water', note: 'for boiling beans and squash' },
    { q: 1.125, u: 'cups', n: 'white kidney beans', note: '270 g' },
    { q: 0.66, u: 'cup', n: 'squash', note: 'sliced, 160 g' },
    { q: 1.5, u: 'cups', n: 'water', note: 'for boiling the liver' },
    { q: 0.5, u: 'cup', n: 'pork liver', note: '120 g', an: 'meat', sub: { vg: 'finely chopped shiitake with 1 tsp miso', lite: 'pork liver (use 1/4 cup)' } },
    { q: 1, u: 'tbsp', n: 'fortified margarine', al: ['dairy'], sub: { dairy: 'coconut oil', vg: 'coconut oil' } },
    { q: 0.33, u: 'cup', n: 'garlic', note: 'minced, 80 g' },
    { q: 3, u: 'tbsp', n: 'onion', note: 'chopped' },
    { q: 0.33, u: 'cup', n: 'puso ng saging', note: 'banana heart, 80 g' },
    { q: 1, u: '', n: 'egg white', al: ['egg'], an: 'egg', sub: { egg: 'a flour-water paste to seal', vg: 'a flour-water paste to seal' } },
    { q: 1, u: 'tsp', n: 'iodized salt' },
    { q: null, u: '', n: 'ground black pepper', note: 'a pinch' },
    { q: 10, u: '', n: 'lumpia wrappers', al: ['gluten'], sub: { gluten: 'rice paper — fry cooler and faster' } },
    { q: 0.75, u: 'cup', n: 'coconut oil', note: 'for frying', sub: { lite: 'oil (use 3 tbsp and shallow-fry)' } }
  ],
  tiers: {
    easy: {
      time: '50 min',
      about: 'Canned beans and no liver, so the filling comes together in about ten minutes. Everything else is just rolling.',
      drop: ['pork liver', 'puso ng saging'],
      add: [{ q: 1.125, u: 'cups', n: 'canned white beans', note: 'drained and rinsed' }],
      steps: [
        { t: 'Fry the sliced tokwa over low heat until golden, then chop it small.', ic: 'pan', min: 8, look: 'Gold on both faces, firm enough to dice.' },
        { t: 'Boil the squash until tender, about 8 minutes, and drain very well.', ic: 'pot', min: 8, look: 'Soft but still holding shape, no water clinging.' },
        { t: 'Mash the beans roughly and mix with the squash, tokwa, garlic, onion, salt and pepper.', ic: 'mix', look: 'A thick, scoopable filling that is not wet.' },
        { t: 'Cool completely, then wrap about 2 tbsp per wrapper and seal the edge.', ic: 'knife', min: 12, look: 'Tight rolls, seam-side down, no filling escaping.' },
        { t: 'Fry until golden brown and drain on a rack.', ic: 'pan', min: 5, look: 'Blistered gold wrappers.' }
      ]
    },
    core: {
      time: '1 hr 20 min',
      about: 'The published recipe. The filling must be completely cool before wrapping — warm filling steams the wrapper and tears it.',
      steps: [
        { t: 'In a casserole, fry the sliced tokwa over a low flame. Set aside.', ic: 'pan', min: 8, look: 'Golden, firm slices.' },
        { t: 'In a separate casserole, boil the beans 30 minutes. Add the squash and boil until tender. Set aside.', ic: 'pot', min: 40, look: 'Beans soft, squash yielding to a fork.' },
        { t: 'Boil the pork liver in its own water until cooked, then chop it finely.', ic: 'pot', min: 12, look: 'Firm, no pink at the centre.' },
        { t: 'In another pan, sauté the garlic and onion in the margarine.', ic: 'garlic', min: 4, look: 'Softened and fragrant.' },
        { t: 'Add the puso ng saging, cook 5 minutes, and cover.', ic: 'veg', min: 5, look: 'Banana heart softened and dulled in colour.' },
        { t: 'Add the tokwa, beans, liver, squash and egg white. Season with salt and pepper to taste.', ic: 'mix', look: 'A cohesive filling that holds together on a spoon.' },
        { t: 'Let it cool, then wrap it in the lumpia wrappers.', ic: 'knife', min: 15, look: 'Firm, evenly filled rolls, sealed shut.' },
        { t: 'Heat the oil and fry the lumpia until golden brown.', ic: 'flame', min: 6, look: 'Even deep gold, bubbling slowed.' }
      ]
    },
    complex: {
      time: '2 hr',
      about: 'Beans soaked overnight and cooked with aromatics, liver soaked in milk, the filling chilled firm, and the rolls fried twice so the shell stays crisp long enough to reach the table.',
      add: [
        { q: 0.5, u: 'cup', n: 'milk', note: 'for soaking the liver', al: ['dairy'], an: 'dairy', sub: { dairy: 'water with 1 tbsp vinegar', vg: 'omit' } },
        { q: 2, u: '', n: 'bay leaves', note: 'for the beans' },
        { q: 1, u: 'thumb', n: 'ginger', note: 'for the beans' },
        { q: 2, u: 'tbsp', n: 'cane vinegar', note: 'for the dip' },
        { q: 1, u: 'tsp', n: 'cornstarch', note: 'to bind the filling' }
      ],
      steps: [
        { t: 'Soak the beans overnight, then simmer them with the bay leaves and ginger 50 minutes until creamy. Dried beans cooked with aromatics taste like an ingredient; canned ones taste like a shortcut.', ic: 'simmer', min: 50, look: 'Beans tender through with the skins still intact.' },
        { t: 'Soak the liver in milk 30 minutes, rinse, boil 12 minutes, and chop finely.', ic: 'chill', min: 30, look: 'Pale, mild-smelling liver; fine even mince.' },
        { t: 'Fry the tokwa until crisp, then dice it small.', ic: 'pan', min: 8, look: 'Crunchy gold cubes.' },
        { t: 'Steam the squash rather than boiling it, 10 minutes, so it does not take on water.', ic: 'steam', min: 10, look: 'Tender, dry-surfaced cubes.' },
        { t: 'Build the filling: sauté garlic, onion and banana heart in margarine, then fold in everything with the cornstarch to bind.', ic: 'mix', min: 8, look: 'Thick, glossy, holding together in a mass.' },
        { t: 'Chill the filling 30 minutes. Cold filling rolls tight and does not blow the wrapper open.', ic: 'chill', min: 30, look: 'Firm enough to scoop into neat portions.' },
        { t: 'Roll tightly, sealing with egg white, and keep under a damp cloth as you work.', ic: 'knife', min: 15, look: 'Compact, even rolls with no air pockets.' },
        { t: 'First fry at 300°F / 150°C for 3 minutes, rest 15 minutes, then fry at 375°F / 190°C for 90 seconds.', ic: 'flame', min: 5, look: 'Pale after the first fry; deep blistered gold after the second.' },
        { t: 'Serve with cane vinegar sharpened with garlic and chili.', ic: 'plate', look: 'Shell cracking audibly when cut.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 36 --------------------------------------------------------------- */
{
  id: 'pork-veggie-soup',
  name: 'Pork Veggie Soup',
  aka: 'Sabaw na Baboy at Gulay',
  cat: 'soup',
  region: 'Nationwide',
  icon: 'bowl',
  serves: 10,
  blurb: 'Pork and liver with corn, squash and carrot in a light broth, finished with malunggay. A school-feeding soup that carries 4.4 mg of iron a bowl.',
  nutr: { cal: 145, pro: 7.64, iron: 4.37 },
  keys: ['pork', 'pork liver', 'corn', 'squash', 'carrot', 'kinchay', 'malunggay', 'soy sauce', 'onion', 'garlic'],
  ing: [
    { q: 2, u: 'cups', n: 'water', note: 'for boiling the liver' },
    { q: 1.5, u: 'tbsp', n: 'coconut oil', note: 'for sautéing' },
    { q: 1, u: 'cup', n: 'pork liver', note: 'sliced, 240 g', an: 'meat', sub: { vg: 'shiitake mushrooms, sliced', lite: 'pork liver (use 1/2 cup)' } },
    { q: 1, u: 'tbsp', n: 'garlic', note: 'minced' },
    { q: 0.75, u: 'cup', n: 'onion', note: 'sliced, 180 g' },
    { q: 1, u: 'tbsp', n: 'iodized salt', sub: { lite: 'salt (use 1 1/2 tsp)' } },
    { q: 2.5, u: 'cups', n: 'water' },
    { q: 1, u: 'cup', n: 'pork kasim', note: 'sliced, 240 g', an: 'meat', sub: { vg: 'king oyster mushrooms', lite: 'lean pork loin' } },
    { q: 1, u: 'cup', n: 'white corn kernels', note: '240 g' },
    { q: 1, u: 'cup', n: 'squash', note: 'cubed, 240 g' },
    { q: 1.5, u: 'cups', n: 'carrot', note: 'cubed, 360 g' },
    { q: 0.5, u: 'cup', n: 'kinchay leaves', note: '120 g' },
    { q: 0.5, u: 'cup', n: 'malunggay leaves', note: '120 g' },
    { q: 4, u: 'tbsp', n: 'soy sauce', al: ['gluten', 'soy'], sub: { gluten: 'tamari', soy: 'coconut aminos', lite: 'low-sodium soy sauce' } },
    { q: 0.5, u: 'tbsp', n: 'white sugar', sub: { lite: 'omit' } }
  ],
  tiers: {
    easy: {
      time: '45 min',
      about: 'No liver, which halves the iron but also halves the number of pans. Everything cooks in one pot in order of hardness.',
      drop: ['pork liver', 'water'],
      steps: [
        { t: 'Heat the oil and sauté the garlic and onion 3 minutes.', ic: 'pan', min: 3, look: 'Onion translucent.' },
        { t: 'Add the pork and cook 10 minutes until it is tender and lightly browned.', ic: 'pork', min: 10, look: 'No pink left, edges caught gold.' },
        { t: 'Add the water, soy sauce and salt and bring to a boil, then add the corn and cook 8 minutes.', ic: 'pot', min: 10, look: 'Corn plump and bright.' },
        { t: 'Add the squash and carrot and simmer 10 minutes until tender.', ic: 'veg', min: 10, look: 'Squash soft at the edges, carrot yielding.' },
        { t: 'Stir in the kinchay and malunggay, add the sugar, and serve.', ic: 'leaf', min: 2, look: 'Greens just wilted into a golden broth.' }
      ]
    },
    core: {
      time: '1 hr',
      about: 'The published recipe. The liver is boiled separately and added near the end — boiled too long it goes grainy, and it clouds the broth if cooked in it.',
      steps: [
        { t: 'In a separate casserole, boil the liver until cooked. Set it aside and slice.', ic: 'pot', min: 12, look: 'Firm throughout, no pink at the centre.' },
        { t: 'Heat the oil. Sauté the garlic and onion, then add the salt and water.', ic: 'pan', min: 4, look: 'Aromatics soft; a shallow seasoned broth.' },
        { t: 'Add the pork and cook until tender.', ic: 'pork', min: 20, look: 'Meat soft enough to cut with a spoon.' },
        { t: 'Add the corn and let it boil until cooked.', ic: 'pot', min: 8, look: 'Kernels plump; broth turned faintly sweet.' },
        { t: 'Add the squash and carrots. Cook until tender.', ic: 'veg', min: 10, look: 'Both soft but still holding their cubes.' },
        { t: 'Add the liver, kinchay and malunggay leaves.', ic: 'leaf', min: 3, look: 'Greens wilted, liver just heated through.' },
        { t: 'Season with the soy sauce and sugar, and serve hot.', ic: 'plate', look: 'A clear golden broth with everything visible in it.' }
      ]
    },
    complex: {
      time: '2 hr',
      about: 'Built on a real pork-bone broth, with the liver soaked and flash-cooked at the very end so it stays tender, and the corn cobs simmered in the stock for sweetness.',
      add: [
        { q: 1.5, u: 'lbs', n: 'pork bones', note: 'for the broth', an: 'meat', sub: { vg: 'dried shiitake and kombu' } },
        { q: 8, u: 'cups', n: 'water', note: 'for the broth' },
        { q: 2, u: '', n: 'corn cobs', note: 'stripped, simmered in the stock' },
        { q: 0.5, u: 'cup', n: 'milk', note: 'for soaking the liver', al: ['dairy'], an: 'dairy', sub: { dairy: 'water with vinegar', vg: 'omit' } },
        { q: 2, u: 'thumbs', n: 'ginger', note: 'smashed' }
      ],
      steps: [
        { t: 'Blanch the pork bones 5 minutes, rinse, then simmer in the 8 cups water with the ginger and the stripped corn cobs for 90 minutes. The cobs give the broth a sweetness the kernels alone cannot.', ic: 'simmer', min: 90, look: 'Clear golden broth, faintly sweet-smelling.' },
        { t: 'Soak the liver in milk 30 minutes, then rinse and pat dry.', ic: 'chill', min: 30, look: 'Milk tinged pink; liver mild-smelling.' },
        { t: 'Strain the broth and skim the fat, reserving 2 tbsp of it.', ic: 'water', look: 'Clean broth with a thin gold slick removed.' },
        { t: 'Sauté the garlic and onion in the reserved pork fat 5 minutes.', ic: 'pan', min: 5, look: 'Soft, fragrant, lightly gold.' },
        { t: 'Add the pork and the strained broth and simmer 25 minutes until tender.', ic: 'simmer', min: 25, look: 'Meat yielding, broth still clear.' },
        { t: 'Stage the vegetables: corn 6 minutes, squash and carrot 8 minutes.', ic: 'veg', min: 14, look: 'Each one tender but still distinct.' },
        { t: 'Slice the liver thin and slip it in for the last 90 seconds only. Liver is done the moment it loses its pink.', ic: 'timer', min: 2, look: 'Just-set slices, still soft, not grainy.' },
        { t: 'Off the heat, add the kinchay and malunggay, season with soy sauce and sugar, and serve.', ic: 'plate', look: 'Bright greens suspended in a clear sweet broth.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 37 --------------------------------------------------------------- */
{
  id: 'bean-squash-patties',
  name: 'Bean-Squash Patties',
  aka: 'Patties na Kalabasa at Beans',
  cat: 'snack',
  region: 'Nationwide',
  icon: 'veg',
  serves: 10,
  blurb: 'Grated squash and tofu bound with cornstarch, fried into patties and served with a sweet-sour sauce. Cheap, filling and bright orange.',
  nutr: { cal: 290, pro: 5.59, iron: 1.56 },
  keys: ['squash', 'kalabasa', 'tokwa', 'tofu', 'kidney beans', 'cornstarch', 'malunggay', 'banana catsup', 'vinegar'],
  ing: [
    { q: 0.75, u: 'cup', n: 'coconut oil', note: 'for frying', sub: { lite: 'oil (use 3 tbsp)' } },
    { q: 1.25, u: 'cups', n: 'tokwa', note: 'cubed, 300 g', al: ['soy'], sub: { soy: 'paneer' } },
    { q: 1.33, u: 'cups', n: 'squash', note: 'grated, 320 g' },
    { q: 1, u: '', n: 'egg', note: 'beaten', al: ['egg'], an: 'egg', sub: { egg: '3 tbsp cornstarch slurry', vg: '3 tbsp cornstarch slurry' } },
    { q: 5, u: 'tbsp', n: 'cornstarch', note: '80 g' },
    { q: 3, u: 'tbsp', n: 'kidney beans', note: '45 g' },
    { q: 3, u: 'tbsp', n: 'white onion', note: 'finely chopped' },
    { q: 3, u: 'tbsp', n: 'malunggay leaves', note: '45 g' },
    { q: null, u: '', n: 'ground black pepper', note: 'a pinch' },
    { q: 1, u: 'tsp', n: 'iodized salt' },
    { q: 1, u: 'cup', n: 'water', note: 'for the sauce' },
    { q: 0.25, u: 'cup', n: 'vinegar', note: 'for the sauce' },
    { q: 0.25, u: 'cup', n: 'banana catsup', note: 'for the sauce', al: ['gluten'], sub: { gluten: 'gluten-free ketchup' } },
    { q: 0.75, u: 'tsp', n: 'iodized salt', note: 'for the sauce' },
    { q: 2, u: 'tbsp', n: 'white sugar', note: 'for the sauce', sub: { lite: 'sugar (use 2 tsp)' } },
    { q: 1, u: 'tsp', n: 'cornstarch', note: 'for the sauce' }
  ],
  tiers: {
    easy: {
      time: '30 min',
      about: 'Skip the sauce and eat them with banana ketchup from the bottle. The patties themselves are unchanged.',
      drop: ['water', 'vinegar', 'banana catsup', 'white sugar', 'cornstarch'],
      steps: [
        { t: 'Heat the oil and fry the cubed tokwa until golden. Lift it out and keep the oil.', ic: 'pan', min: 8, look: 'Gold, firm cubes.' },
        { t: 'Squeeze the grated squash hard in a cloth — this is the whole trick, or the patties will not hold.', ic: 'bowl', look: 'A surprising amount of orange liquid wrung out.' },
        { t: 'Mash the beans and mix everything together with the egg, cornstarch, onion, malunggay, salt and pepper.', ic: 'mix', look: 'A thick mixture that holds a shape when pressed.' },
        { t: 'Form into patties and deep-fry in the tokwa oil until golden, 3 minutes a side.', ic: 'flame', min: 6, look: 'Crisp orange-gold discs, set through.' },
        { t: 'Drain and serve with banana ketchup.', ic: 'plate', look: 'Bright patties with green flecks.' }
      ]
    },
    core: {
      time: '45 min',
      about: 'The published recipe, with the sweet-sour sauce cooked separately. Frying the patties in the oil the tofu came out of carries that flavour straight through.',
      steps: [
        { t: 'Heat the oil. Fry the tokwa until golden brown and set aside, keeping the oil in the pan.', ic: 'pan', min: 8, look: 'Golden cubes; oil faintly nutty-smelling.' },
        { t: 'Combine all the patty ingredients. Mix well.', ic: 'mix', look: 'Thick and cohesive, holding together when squeezed.' },
        { t: 'Form into patties and deep-fry in the oil used for the tokwa. Cook until golden brown.', ic: 'flame', min: 7, look: 'Even deep gold, firm to the touch.' },
        { t: 'For the sauce, combine all the sauce ingredients and mix well.', ic: 'bowl', look: 'A cloudy red-orange liquid.' },
        { t: 'Cook the sauce over a low flame, stirring, until it thickens.', ic: 'whisk', min: 5, look: 'Glossy and thick enough to coat a spoon.' },
        { t: 'Combine the fried tokwa with the sweet-and-sour sauce and serve alongside the patties.', ic: 'plate', look: 'Glazed tofu cubes next to crisp orange patties.' }
      ]
    },
    complex: {
      time: '1 hr 30 min',
      about: 'Squash roasted rather than grated raw so its sugars concentrate, the mixture rested so the cornstarch hydrates, and the patties shallow-fried in a ring for clean edges.',
      add: [
        { q: 2, u: 'cloves', n: 'garlic', note: 'minced' },
        { q: 1, u: 'tsp', n: 'ground cumin' },
        { q: 2, u: 'tbsp', n: 'toasted ground rice', note: 'extra binder' },
        { q: 1, u: 'thumb', n: 'ginger', note: 'grated, for the sauce' },
        { q: 2, u: 'tbsp', n: 'pineapple juice', note: 'for the sauce' }
      ],
      steps: [
        { t: 'Roast the squash in chunks at 425°F / 220°C for 30 minutes until the edges caramelise, then mash. Roasting drives off water and concentrates the sugar — grated raw squash does neither.', ic: 'oven', min: 30, look: 'Browned edges, dry dense flesh.' },
        { t: 'Toast the ground rice in a dry pan 3 minutes until nutty.', ic: 'pan', min: 3, look: 'Pale tan, smelling like popcorn.' },
        { t: 'Fry the tokwa until crisp, then chop half of it fine for the mixture and keep half whole for the sauce.', ic: 'pan', min: 8, look: 'Crunchy cubes, half of them diced small.' },
        { t: 'Mix the squash, chopped tokwa, beans, onion, garlic, cumin, malunggay, egg, cornstarch and toasted rice. Rest 20 minutes.', ic: 'timer', min: 20, look: 'Noticeably stiffer; holds a clean ridge.' },
        { t: 'Shape in a greased ring in the pan, 3 minutes before lifting the ring.', ic: 'pan', min: 3, look: 'A clean disc with a set edge.' },
        { t: 'Fry 3 minutes a side until deep gold.', ic: 'flame', min: 6, look: 'Crisp, evenly browned, no raw centre.' },
        { t: 'Make the sauce: simmer the vinegar, ketchup, pineapple juice, sugar, ginger and salt 8 minutes, then thicken with the slaked cornstarch.', ic: 'simmer', min: 8, look: 'Glossy, deep red-orange, coating a spoon.' },
        { t: 'Toss the reserved tokwa in the sauce and serve it over the patties.', ic: 'plate', look: 'Lacquered tofu on crisp orange discs.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
}

);

window.RECIPES.push(

/* 38 --------------------------------------------------------------- */
{
  id: 'ginulayang-monggo',
  name: 'Ginulayang Monggo',
  aka: 'Mung Beans with Kamote Tops and Ampalaya Leaves',
  cat: 'veg',
  region: 'Nationwide',
  icon: 'sprout',
  serves: 10,
  blurb: 'Mung beans with fresh dilis, sweet potato and two kinds of leaf. The leaves go in last and the bean water goes in — never thrown out.',
  nutr: { cal: 242, pro: 11.02, iron: 3.34 },
  keys: ['monggo', 'mung beans', 'dilis', 'anchovies', 'kamote', 'sweet potato', 'talbos', 'ampalaya leaves', 'patis', 'fish sauce'],
  ing: [
    { q: 0.75, u: 'cup', n: 'coconut oil', note: 'for frying', sub: { lite: 'oil (use 2 tbsp)' } },
    { q: 1, u: 'cup', n: 'green monggo', note: '240 g' },
    { q: 3, u: 'tbsp', n: 'coconut oil', note: 'for sautéing' },
    { q: 1, u: 'tbsp', n: 'garlic', note: 'minced' },
    { q: 0.25, u: 'cup', n: 'onion', note: 'chopped' },
    { q: 0.66, u: 'cup', n: 'fresh dilis', note: 'heads removed, 160 g', al: ['fish'], an: 'fish', sub: { fish: 'omit, and add 1 tbsp white miso', vg: 'omit, and add 1 tbsp white miso' } },
    { q: 2.25, u: 'cups', n: 'yellow kamote', note: 'cubed, 540 g' },
    { q: 0.5, u: 'tbsp', n: 'iodized salt', sub: { lite: 'salt (use 1 tsp)' } },
    { q: 1.5, u: 'tbsp', n: 'patis (fish sauce)', al: ['fish'], an: 'fish', sub: { fish: 'light soy sauce', vg: 'light soy sauce', lite: 'patis (use 1 tbsp)' } },
    { q: 0.5, u: 'cup', n: 'kamote talbos', note: 'sweet potato tops, 120 g' },
    { q: 1.75, u: 'cups', n: 'ampalaya leaves', note: '100 g' }
  ],
  tiers: {
    easy: {
      time: '1 hr',
      about: 'Spinach instead of the two bitter leaves, and no dilis to clean. The bean water still goes back in — that is where the body of the dish comes from.',
      drop: ['fresh dilis', 'ampalaya leaves', 'kamote talbos'],
      add: [{ q: 2, u: 'cups', n: 'spinach' }],
      steps: [
        { t: 'Boil the monggo over medium heat until soft, about 40 minutes. Keep the cooking water.', ic: 'pot', min: 40, look: 'Beans splitting, water gone cloudy and thick.' },
        { t: 'Heat the oil and sauté the garlic and onion 3 minutes.', ic: 'pan', min: 3, look: 'Soft and fragrant.' },
        { t: 'Add the kamote and season with the salt and patis. Cook 3 minutes.', ic: 'veg', min: 3, look: 'Cubes glossy and coated.' },
        { t: 'Pour in the monggo with its water and simmer 12 minutes until the kamote is tender.', ic: 'simmer', min: 12, look: 'A thick golden stew; kamote soft.' },
        { t: 'Stir in the spinach, cook 2 minutes, and serve.', ic: 'leaf', min: 2, look: 'Greens collapsed into the stew.' }
      ]
    },
    core: {
      time: '1 hr 15 min',
      about: 'The published recipe. Ampalaya leaves are bitter and go in at the very end — cook them long and the bitterness takes over the pot.',
      steps: [
        { t: 'Boil the monggo until cooked over medium fire. Set aside, keeping the water.', ic: 'pot', min: 45, look: 'Soft beans in thick, starchy liquid.' },
        { t: 'Heat the oil and sauté the garlic and onion.', ic: 'pan', min: 4, look: 'Translucent onion, fragrant garlic.' },
        { t: 'Add the dilis and kamote. Season with the salt and patis.', ic: 'fish', min: 4, look: 'Anchovies breaking down; kamote coated.' },
        { t: 'Add the water used in cooking the monggo. Let it simmer 10 minutes.', ic: 'simmer', min: 10, look: 'Kamote tender; broth thickened by the bean starch.' },
        { t: 'Add the monggo, talbos ng kamote and ampalaya leaves. Continue cooking 5 minutes.', ic: 'leaf', min: 5, look: 'Leaves just wilted, still green rather than olive.' },
        { t: 'Taste for salt and serve with rice.', ic: 'plate', look: 'A thick stew with whole leaves visible through it.' }
      ]
    },
    complex: {
      time: '1 hr 45 min',
      about: 'The dilis fried crisp and kept back as a topping instead of dissolving into the pot, the monggo cooked with aromatics from the start, and the bitter leaves blanched to control how much bitterness lands.',
      add: [
        { q: 2, u: 'thumbs', n: 'ginger', note: 'smashed, for the beans' },
        { q: 2, u: '', n: 'tomatoes', note: 'chopped' },
        { q: 1, u: 'tbsp', n: 'calamansi juice', note: 'to finish' },
        { q: 1, u: 'head', n: 'garlic', note: 'sliced, for crisping' }
      ],
      steps: [
        { t: 'Simmer the monggo with the smashed ginger 45 minutes. Aromatics in the bean water season the dish from the inside out.', ic: 'simmer', min: 45, look: 'Creamy beans; broth smelling of ginger.' },
        { t: 'Fry the dilis in the oil until crisp, 4 minutes, and lift them out onto paper. Keep them for the top — they go soft if simmered.', ic: 'pan', min: 4, look: 'Rigid, deep gold little fish.' },
        { t: 'Fry the sliced garlic in the same oil until gold, 5 minutes. Strain and reserve the chips.', ic: 'garlic', min: 5, look: 'Even gold chips; fragrant oil.' },
        { t: 'Blanch the ampalaya leaves 30 seconds in boiling salted water and drain. This takes the hard edge off without losing the character.', ic: 'pot', min: 1, look: 'Bright green, limp, smelling grassy rather than harsh.' },
        { t: 'Sweat the onion and tomato in 2 tbsp of the garlic oil 8 minutes until jammy.', ic: 'tomato', min: 8, look: 'Thick, dark red base with no raw tomato edge.' },
        { t: 'Add the kamote and the bean water and simmer 12 minutes until tender.', ic: 'simmer', min: 12, look: 'Kamote soft; liquid thickened.' },
        { t: 'Fold in the monggo, kamote tops and blanched ampalaya leaves and cook 4 minutes. Season with patis.', ic: 'leaf', min: 4, look: 'A thick stew, leaves distinct.' },
        { t: 'Finish with calamansi off the heat and serve topped with the crisp dilis and garlic chips.', ic: 'plate', look: 'Crunchy fish and gold garlic on a thick green-gold stew.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 39 --------------------------------------------------------------- */
{
  id: 'veggie-tokwa',
  name: 'Veggie-Tokwa',
  aka: 'Sardines and Tofu with Greens',
  cat: 'veg',
  region: 'Nationwide',
  icon: 'tofu',
  serves: 10,
  blurb: 'Canned sardines mashed into margarine-fried aromatics with petchay, carrot and malunggay, topped with crisp tofu. Store-cupboard cooking at its most efficient.',
  nutr: { cal: 281, pro: 7, iron: 4.89 },
  keys: ['tokwa', 'tofu', 'sardines', 'petchay', 'carrot', 'malunggay', 'kinchay', 'margarine', 'garlic', 'onion'],
  ing: [
    { q: 0.75, u: 'cup', n: 'coconut oil', note: 'for frying', sub: { lite: 'oil (use 2 tbsp)' } },
    { q: 0.66, u: 'cup', n: 'tokwa', note: 'cubed, 160 g', al: ['soy'], sub: { soy: 'paneer' } },
    { q: 3, u: 'tbsp', n: 'fortified margarine', al: ['dairy'], sub: { dairy: 'coconut oil', vg: 'coconut oil' } },
    { q: 1.5, u: 'tbsp', n: 'garlic', note: 'minced' },
    { q: 0.5, u: 'cup', n: 'onion', note: 'minced thinly, 120 g' },
    { q: 0.5, u: 'cup', n: 'canned sardines in oil', note: 'mashed, 120 g', al: ['fish'], an: 'fish', sub: { fish: 'mashed white beans with 1 tsp miso', vg: 'mashed white beans with 1 tsp miso' } },
    { q: 1.66, u: 'cups', n: 'petchay', note: 'chopped, 400 g' },
    { q: 1.125, u: 'cups', n: 'carrot', note: 'sliced, 270 g' },
    { q: 0.5, u: 'cup', n: 'malunggay leaves', note: '120 g' },
    { q: 0.5, u: 'cup', n: 'kinchay', note: 'finely chopped, 120 g' },
    { q: 1, u: 'tsp', n: 'iodized salt', sub: { lite: 'salt (use 1/2 tsp)' } },
    { q: 0.33, u: 'cup', n: 'water' }
  ],
  tiers: {
    easy: {
      time: '25 min',
      about: 'Petchay and carrot only, and the tofu stirred straight in rather than fried separately. Twenty-five minutes from cupboard to table.',
      drop: ['malunggay leaves', 'kinchay'],
      steps: [
        { t: 'Fry the cubed tokwa in the oil until gold, then set aside.', ic: 'pan', min: 7, look: 'Crisp gold cubes.' },
        { t: 'Melt the margarine and sauté the garlic and onion 3 minutes.', ic: 'pan', min: 3, look: 'Soft, fragrant, lightly gold.' },
        { t: 'Add the mashed sardines and cook 2 minutes, breaking them up.', ic: 'fish', min: 2, look: 'Sardines dissolved into the aromatics.' },
        { t: 'Add the carrot and cook 3 minutes, then the petchay and water, and boil until just tender.', ic: 'veg', min: 5, look: 'Petchay stems translucent, leaves still green.' },
        { t: 'Season with salt, scatter the fried tokwa over, and serve.', ic: 'plate', look: 'Crisp tofu sitting on top, not stirred in.' }
      ]
    },
    core: {
      time: '35 min',
      about: 'The published recipe. The margarine is not interchangeable with oil here — it is carrying most of the flavour in a dish this plain.',
      steps: [
        { t: 'In a pan, heat the oil. Fry the tokwa until golden brown. Set aside.', ic: 'pan', min: 8, look: 'Firm gold cubes with a crust.' },
        { t: 'In another pan, sauté the garlic and onion in the margarine.', ic: 'pan', min: 4, look: 'Softened and smelling buttery.' },
        { t: 'Add the mashed sardines and let them cook a few minutes.', ic: 'fish', min: 3, look: 'Broken down and fragrant.' },
        { t: 'Add the carrots. Let them cook a few minutes.', ic: 'veg', min: 4, look: 'Carrots glossy and slightly softened.' },
        { t: 'Add the petchay, water, malunggay and kinchay. Boil until cooked.', ic: 'leaf', min: 5, look: 'Greens wilted, stems tender.' },
        { t: 'Season with salt and add the fried tokwa last so it keeps its crust.', ic: 'plate', look: 'Crisp cubes on soft greens.' }
      ]
    },
    complex: {
      time: '1 hr',
      about: 'Tofu pressed and twice-fried, the sardine bones mashed in deliberately for the calcium, and the greens cooked in stages so the stems and leaves both land right.',
      add: [
        { q: 2, u: 'thumbs', n: 'ginger', note: 'julienned' },
        { q: 2, u: '', n: 'tomatoes', note: 'chopped' },
        { q: 1, u: 'tbsp', n: 'calamansi juice' },
        { q: 1, u: 'tsp', n: 'chili flakes' }
      ],
      steps: [
        { t: 'Press the tokwa 20 minutes under a weight, then cube it.', ic: 'chill', min: 20, look: 'Firmer, with whey drawn off.' },
        { t: 'Fry the tofu at 325°F / 165°C for 4 minutes, rest, then again at 375°F / 190°C for 1 minute.', ic: 'flame', min: 6, look: 'Puffed, crisp, deep gold.' },
        { t: 'Mash the sardines bones and all — the soft bones are where most of the calcium is, and they disappear completely once mashed.', ic: 'mix', look: 'A smooth paste with no visible bone.' },
        { t: 'Sweat the ginger, garlic and onion in the margarine 5 minutes, then add the tomato and cook 6 minutes until jammy.', ic: 'tomato', min: 11, look: 'A thick, dark base.' },
        { t: 'Add the sardines and chili flakes and fry 3 minutes until the mixture darkens.', ic: 'fish', min: 3, look: 'Deepened in colour, smelling savoury rather than fishy.' },
        { t: 'Add the carrot and the petchay stems with the water and cook 4 minutes.', ic: 'veg', min: 4, look: 'Stems translucent, carrots tender-crisp.' },
        { t: 'Add the petchay leaves, malunggay and kinchay off the heat and cover 2 minutes — residual heat is enough.', ic: 'leaf', min: 2, look: 'Leaves just collapsed, still vivid.' },
        { t: 'Finish with calamansi and top with the twice-fried tofu at the table.', ic: 'plate', look: 'Bright greens under audibly crisp tofu.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 40 --------------------------------------------------------------- */
{
  id: 'corny-malunggay',
  name: 'Corny Malunggay',
  aka: 'Corn and Malunggay with Liver and Quail Eggs',
  cat: 'soup',
  region: 'Nationwide',
  icon: 'bowl',
  serves: 10,
  blurb: 'White corn with liver, singkamas and malunggay, scented with lemongrass and finished with quail eggs. Sweet, savoury and faintly herbal.',
  nutr: { cal: 157, pro: 4.09, iron: 1.7 },
  keys: ['corn', 'malunggay', 'pork liver', 'singkamas', 'carrot', 'lemongrass', 'quail eggs', 'garlic', 'onion'],
  ing: [
    { q: 2, u: 'cups', n: 'water', note: 'for boiling the liver' },
    { q: 1, u: 'cup', n: 'pork liver', note: '240 g', an: 'meat', sub: { vg: 'shiitake mushrooms', lite: 'pork liver (use 1/2 cup)' } },
    { q: 0.25, u: 'cup', n: 'coconut oil', note: 'for sautéing', sub: { lite: 'oil (use 1 tbsp)' } },
    { q: 3, u: 'tbsp', n: 'garlic', note: 'minced' },
    { q: 0.33, u: 'cup', n: 'onion', note: 'sliced' },
    { q: 1, u: 'cup', n: 'white corn kernels', note: '240 g' },
    { q: 1, u: 'cup', n: 'water' },
    { q: 0.5, u: 'cup', n: 'carrot', note: 'cubed, 120 g' },
    { q: 0.66, u: 'cup', n: 'singkamas', note: 'cubed, 160 g' },
    { q: 0.25, u: 'cup', n: 'malunggay fruit', note: 'pods, 60 g' },
    { q: 1, u: 'tsp', n: 'iodized salt' },
    { q: 1.5, u: 'tbsp', n: 'white sugar', sub: { lite: 'sugar (use 1 tsp)' } },
    { q: 1, u: 'pack', n: 'lemongrass leaves', note: '30 g' },
    { q: 10, u: '', n: 'quail eggs', note: 'boiled', al: ['egg'], an: 'egg', sub: { egg: 'omit', vg: 'omit' } },
    { q: 0.5, u: 'cup', n: 'malunggay leaves', note: '120 g' }
  ],
  tiers: {
    easy: {
      time: '30 min',
      about: 'No liver and no malunggay pods, which are hard to find. Corn, carrot and leaves — still sweet, still green, ready in half an hour.',
      drop: ['pork liver', 'malunggay fruit', 'quail eggs', 'water'],
      steps: [
        { t: 'Heat the oil and sauté the garlic and onion 3 minutes.', ic: 'pan', min: 3, look: 'Soft and fragrant.' },
        { t: 'Add the corn and water and cook 5 minutes.', ic: 'pot', min: 5, look: 'Kernels plump, water turning faintly sweet.' },
        { t: 'Add the carrot and singkamas and simmer 8 minutes.', ic: 'veg', min: 8, look: 'Carrot tender, singkamas still crisp at the centre.' },
        { t: 'Season with salt and sugar, add the lemongrass, and bring to a boil.', ic: 'leaf', min: 3, look: 'Broth smelling citrusy and sweet.' },
        { t: 'Stir in the malunggay leaves and serve.', ic: 'plate', look: 'Green leaves suspended in a sweet pale broth.' }
      ]
    },
    core: {
      time: '45 min',
      about: 'The published recipe. The lemongrass goes in whole and comes out before serving — it is there for perfume, not to be eaten.',
      steps: [
        { t: 'Put the liver on to boil until cooked. Set aside and slice.', ic: 'pot', min: 12, look: 'Firm, no pink at the centre.' },
        { t: 'Heat the oil, sauté the garlic and onion. Add the liver, corn kernels and water. Cook 2–3 minutes.', ic: 'pan', min: 4, look: 'Everything coated; liquid just beginning to simmer.' },
        { t: 'Add the carrots, singkamas and malunggay fruit.', ic: 'veg', min: 8, look: 'Vegetables tender but holding their cubes.' },
        { t: 'Season with the salt and sugar and add the lemongrass. Let it boil.', ic: 'leaf', min: 5, look: 'Broth fragrant with lemongrass.' },
        { t: 'Garnish with the boiled quail eggs and malunggay leaves.', ic: 'egg', look: 'Whole eggs sitting in a green-flecked broth.' },
        { t: 'Lift out the lemongrass and serve hot.', ic: 'plate', look: 'Clear sweet broth, eggs and greens on top.' }
      ]
    },
    complex: {
      time: '1 hr 30 min',
      about: 'A corn stock made from the stripped cobs, the liver soaked and flash-cooked, and the lemongrass bruised and steeped rather than boiled so it perfumes without turning soapy.',
      add: [
        { q: 3, u: '', n: 'corn cobs', note: 'stripped, for the stock' },
        { q: 6, u: 'cups', n: 'water', note: 'for the stock' },
        { q: 0.5, u: 'cup', n: 'milk', note: 'for soaking the liver', al: ['dairy'], an: 'dairy', sub: { dairy: 'water with vinegar', vg: 'omit' } },
        { q: 2, u: 'thumbs', n: 'ginger', note: 'sliced' },
        { q: 1, u: 'tbsp', n: 'calamansi juice' }
      ],
      steps: [
        { t: 'Strip the kernels and simmer the bare cobs in the 6 cups water with the ginger for 45 minutes. The cob holds more corn flavour than the kernels do.', ic: 'simmer', min: 45, look: 'Cloudy sweet stock, reduced by about a third.' },
        { t: 'Soak the liver in milk 30 minutes, rinse and pat dry.', ic: 'chill', min: 30, look: 'Pale, mild liver.' },
        { t: 'Bruise the lemongrass along its length with the back of a knife and tie it in a knot.', ic: 'knife', look: 'Frayed, intensely fragrant stalks.' },
        { t: 'Sauté the garlic and onion in the oil 5 minutes, then add the kernels and cook 3 minutes.', ic: 'pan', min: 8, look: 'Corn glossy, aromatics soft.' },
        { t: 'Strain in the corn stock, add the lemongrass, and simmer 10 minutes.', ic: 'pot', min: 10, look: 'Sweet, fragrant, lightly cloudy broth.' },
        { t: 'Add the carrot, singkamas and malunggay pods and simmer 8 minutes.', ic: 'veg', min: 8, look: 'Vegetables tender, pods softened.' },
        { t: 'Slice the liver thin and poach it in the broth for 90 seconds only.', ic: 'timer', min: 2, look: 'Just-set, still tender slices.' },
        { t: 'Remove the lemongrass, add the malunggay leaves and calamansi off the heat, and serve with the quail eggs.', ic: 'plate', look: 'Clear sweet broth, bright greens, whole eggs.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 41 --------------------------------------------------------------- */
{
  id: 'fried-veggie-tuna',
  name: 'Fried Veggie Tuna',
  aka: 'Okoy-style Tuna and Vegetable Patties',
  cat: 'snack',
  region: 'Nationwide',
  icon: 'fish',
  serves: 10,
  blurb: 'Kangkong, squash, alugbati and tuna in a thick batter, fried into big patties and dipped in garlic vinegar. The most substantial thing in the booklet.',
  nutr: { cal: 474, pro: 14.74, iron: 3.94 },
  keys: ['tuna', 'kangkong', 'squash', 'alugbati', 'patani', 'lima beans', 'tokwa', 'tofu', 'flour', 'egg', 'vinegar'],
  ing: [
    { q: 1.25, u: 'cups', n: 'coconut oil', note: 'for frying', sub: { lite: 'oil (use 4 tbsp and shallow-fry)' } },
    { q: 0.75, u: 'cup', n: 'tokwa', note: 'sliced thinly, 180 g', al: ['soy'], sub: { soy: 'paneer' } },
    { q: 2, u: '', n: 'eggs', note: 'beaten', al: ['egg'], an: 'egg', sub: { egg: '6 tbsp aquafaba', vg: '6 tbsp aquafaba' } },
    { q: 0.75, u: 'cup', n: 'all-purpose flour', note: '180 g', al: ['gluten'], sub: { gluten: 'rice flour with 1 tsp cornstarch' } },
    { q: 1, u: 'cup', n: 'water' },
    { q: 1, u: 'tsp', n: 'iodized salt' },
    { q: 1, u: 'cup', n: 'kangkong leaves', note: 'finely chopped, 240 g' },
    { q: 1, u: 'cup', n: 'squash', note: 'sliced thinly, 240 g' },
    { q: 0.33, u: 'cup', n: 'carrot', note: 'sliced thinly' },
    { q: 3, u: 'tbsp', n: 'kinchay leaves', note: 'finely chopped' },
    { q: 0.33, u: 'cup', n: 'alugbati leaves', note: '80 g' },
    { q: 3, u: 'tbsp', n: 'onion', note: 'sliced' },
    { q: 1.25, u: 'cups', n: 'canned tuna chunks in oil', note: 'drained, 300 g', al: ['fish'], an: 'fish', sub: { fish: 'mashed chickpeas', vg: 'mashed chickpeas' } },
    { q: 0.5, u: 'cup', n: 'patani', note: 'lima beans, fried, 120 g' },
    { q: 0.75, u: 'cup', n: 'vinegar', note: 'for the dip' },
    { q: 1, u: 'tbsp', n: 'garlic', note: 'minced, for the dip' }
  ],
  tiers: {
    easy: {
      time: '35 min',
      about: 'Kangkong, squash and tuna only — three things to slice instead of seven. Smaller patties too, which are far easier to turn.',
      drop: ['alugbati leaves', 'patani', 'kinchay leaves', 'carrot'],
      steps: [
        { t: 'Fry the sliced tokwa until golden, then chop it and set aside.', ic: 'pan', min: 7, look: 'Crisp gold slices.' },
        { t: 'Whisk the eggs, flour, water and salt into a thick batter.', ic: 'whisk', look: 'Coats a spoon heavily and drops slowly.' },
        { t: 'Fold in the kangkong, squash, onion, tuna and the chopped tokwa.', ic: 'mix', look: 'Vegetables held together, batter barely visible.' },
        { t: 'Shallow-fry heaped spoonfuls, flattened, 3 minutes a side.', ic: 'pan', min: 6, look: 'Crisp ragged edges, set centre.' },
        { t: 'Drain and serve with the vinegar and garlic dip.', ic: 'plate', look: 'Golden patties with green showing through.' }
      ]
    },
    core: {
      time: '50 min',
      about: 'The published recipe. The batter is made first and the solids go in after — the opposite order gives you pockets of dry flour.',
      steps: [
        { t: 'Fry the tokwa until golden brown and set aside.', ic: 'pan', min: 8, look: 'Firm gold slices.' },
        { t: 'Make a batter by combining the beaten egg, flour and water. Season with salt and set aside.', ic: 'whisk', look: 'A smooth, thick, lump-free batter.' },
        { t: 'Combine all the vegetables, the tokwa, the tuna and the patani.', ic: 'mix', look: 'A loose vegetable mixture.' },
        { t: 'Add them to the batter and mix well.', ic: 'bowl', look: 'Everything coated in a thin film of batter.' },
        { t: 'Form into a patty and deep-fry until golden brown, about 4 minutes a side.', ic: 'flame', min: 8, look: 'Deep gold, crisp, set all the way through.' },
        { t: 'For the sauce, combine the vinegar and garlic and cook over a low flame.', ic: 'bottle', min: 4, look: 'Gently bubbling; the raw garlic edge softening.' },
        { t: 'Drain the patties on a rack and serve with the sauce.', ic: 'plate', look: 'Crisp outside, moist vegetable inside.' }
      ]
    },
    complex: {
      time: '1 hr 20 min',
      about: 'Vegetables salted and wrung out, an ice-cold cornstarch batter, and a two-stage fry so the inside cooks before the outside browns. Big patties are the point here, and big patties need the time.',
      add: [
        { q: 0.5, u: 'cup', n: 'cornstarch', note: 'in place of some flour' },
        { q: 1, u: 'tbsp', n: 'salt', note: 'for drawing water from the vegetables' },
        { q: 2, u: '', n: 'siling labuyo', note: 'chopped, for the dip' },
        { q: 1, u: 'tsp', n: 'sugar', note: 'for the dip' },
        { q: 1, u: 'tsp', n: 'ground black pepper' }
      ],
      steps: [
        { t: 'Toss the sliced squash, carrot and kangkong with the extra salt and leave 15 minutes, then wring them out hard in a cloth.', ic: 'bowl', min: 15, look: 'A cup of green liquid wrung out; vegetables limp.' },
        { t: 'Fry the tokwa until crisp, chop, and set aside.', ic: 'pan', min: 8, look: 'Crunchy gold pieces.' },
        { t: 'Whisk the flour, cornstarch, eggs, salt and pepper with ice-cold water, mixing as little as possible.', ic: 'whisk', look: 'A thin, slightly lumpy, very cold batter.' },
        { t: 'Fold in the wrung-out vegetables, alugbati, kinchay, onion, tuna, patani and tokwa.', ic: 'mix', look: 'A dense mixture, barely wet.' },
        { t: 'First fry at 325°F / 165°C for 4 minutes to cook the inside through.', ic: 'pan', min: 4, look: 'Pale gold, set but not crisp.' },
        { t: 'Rest on a rack 10 minutes.', ic: 'timer', min: 10, look: 'Surfaces dry, steam stopped.' },
        { t: 'Second fry at 375°F / 190°C for 90 seconds until deep gold and crisp.', ic: 'flame', min: 2, look: 'Dark gold, visibly blistered, loud sizzle.' },
        { t: 'Make the dip: simmer the vinegar, garlic, chili and sugar 5 minutes.', ic: 'bottle', min: 5, look: 'Sharp, clear, flecked red.' },
        { t: 'Drain upright and serve immediately with the dip.', ic: 'plate', look: 'The patty cracks when pressed; the inside steams.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 42 --------------------------------------------------------------- */
{
  id: 'beef-zesty-sauce',
  name: 'Beef in Zesty Sauce',
  aka: 'Beef and Liver with Dalandan',
  cat: 'main',
  region: 'Nationwide',
  icon: 'beef',
  serves: 10,
  blurb: 'Beef dredged in cornstarch and marinated in soy, stir-fried with liver and vegetables and finished with dalandan juice. Filipino cooking borrowing a wok.',
  nutr: { cal: 156, pro: 11.11, iron: 4.69 },
  keys: ['beef', 'pork liver', 'dalandan', 'orange', 'carrot', 'kidney beans', 'togue', 'bean sprouts', 'soy sauce', 'cornstarch'],
  ing: [
    { q: 2, u: 'cups', n: 'water', note: 'for boiling the liver' },
    { q: 0.66, u: 'cup', n: 'pork liver', note: '160 g', an: 'meat', sub: { vg: 'shiitake mushrooms', lite: 'pork liver (use 1/3 cup)' } },
    { q: 0.75, u: 'cup', n: 'lean beef', note: 'sliced, 180 g', an: 'meat', sub: { vg: 'king oyster mushrooms, sliced', lite: 'beef sirloin, trimmed' } },
    { q: 1.5, u: 'tbsp', n: 'cornstarch' },
    { q: 2, u: 'tbsp', n: 'soy sauce', al: ['gluten', 'soy'], sub: { gluten: 'tamari', soy: 'coconut aminos', lite: 'low-sodium soy sauce' } },
    { q: null, u: '', n: 'ground black pepper', note: 'a pinch' },
    { q: 1.5, u: 'tbsp', n: 'coconut oil' },
    { q: 1, u: 'tbsp', n: 'garlic', note: 'minced' },
    { q: 0.33, u: 'cup', n: 'onion', note: 'sliced' },
    { q: 0.25, u: 'cup', n: 'carrot', note: 'sliced thinly' },
    { q: 0.33, u: 'cup', n: 'white kidney beans', note: 'boiled, 180 g' },
    { q: 0.125, u: 'cup', n: 'togue', note: 'bean sprouts, 30 g' },
    { q: null, u: '', n: 'iodized salt', note: 'a pinch' },
    { q: 0.75, u: 'cup', n: 'dalandan juice', note: 'freshly squeezed, 180 ml', sub: { gluten: 'dalandan, or orange juice sharpened with calamansi' } }
  ],
  tiers: {
    easy: {
      time: '40 min',
      about: 'No liver and canned beans. The dalandan at the end is the thing that makes this dish — keep that and you can cut almost anything else.',
      drop: ['pork liver', 'water'],
      steps: [
        { t: 'Toss the sliced beef in the cornstarch, then in the soy sauce and pepper. Leave 20 minutes.', ic: 'timer', min: 20, look: 'Beef darkened and slightly slippery.' },
        { t: 'Heat the oil and sauté the garlic and onion 2 minutes.', ic: 'pan', min: 2, look: 'Fragrant, just softening.' },
        { t: 'Stir-fry the carrot, beans and togue over medium heat 4 minutes, then lift them out.', ic: 'veg', min: 4, look: 'Vegetables hot and glossy, still crisp.' },
        { t: 'In the same pan, stir-fry the beef and simmer 8 minutes until tender.', ic: 'beef', min: 8, look: 'Sauce thickened by the cornstarch coating.' },
        { t: 'Add the dalandan juice, simmer 2 minutes, return the vegetables, and serve.', ic: 'citrus', min: 2, look: 'A glossy sauce smelling strongly of citrus.' }
      ]
    },
    core: {
      time: '1 hr',
      about: 'The published recipe. Dredging the beef in cornstarch before the marinade is what thickens the sauce later — there is no separate slurry.',
      steps: [
        { t: 'Put the liver on to boil until cooked. Set aside and slice.', ic: 'pot', min: 12, look: 'Firm through, no pink.' },
        { t: 'In a mixing bowl, dredge the beef in the cornstarch.', ic: 'bowl', look: 'Every slice lightly powdered.' },
        { t: 'Marinate the beef in a mixture of the soy sauce and pepper. Let it stand 30 minutes.', ic: 'timer', min: 30, look: 'A thick, dark, slightly gluey coating.' },
        { t: 'In a casserole, heat the oil. Sauté the garlic and onion.', ic: 'pan', min: 3, look: 'Soft and fragrant.' },
        { t: 'Stir-fry the carrots, kidney beans, togue and liver over medium fire.', ic: 'veg', min: 5, look: 'Everything hot, vegetables still with bite.' },
        { t: 'Season with salt, then transfer to a separate container.', ic: 'bowl', look: 'Pan empty and ready for the beef.' },
        { t: 'In the same casserole, stir-fry the marinated beef and let it simmer 10 minutes until tender.', ic: 'beef', min: 10, look: 'A thick glossy sauce forming on its own.' },
        { t: 'Add the dalandan juice and simmer 2 minutes.', ic: 'citrus', min: 2, look: 'Sauce loosened and smelling bright.' },
        { t: 'Blend in the sautéed vegetables and serve.', ic: 'plate', look: 'Everything coated in a glossy citrus sauce.' }
      ]
    },
    complex: {
      time: '1 hr 30 min',
      about: 'The beef velveted with baking soda, the liver soaked in milk, the vegetables blanched and shocked, and the sauce built as a proper pan sauce with dalandan zest as well as juice.',
      add: [
        { q: 1, u: 'tsp', n: 'baking soda', note: 'for velveting the beef' },
        { q: 0.5, u: 'cup', n: 'milk', note: 'for soaking the liver', al: ['dairy'], an: 'dairy', sub: { dairy: 'water with vinegar', vg: 'omit' } },
        { q: 1, u: 'tbsp', n: 'dalandan zest' },
        { q: 1, u: 'tbsp', n: 'oyster sauce', al: ['shellfish', 'gluten', 'soy'], an: 'seafood', sub: { shellfish: 'mushroom stir-fry sauce', vg: 'mushroom stir-fry sauce' } },
        { q: 1, u: 'thumb', n: 'ginger', note: 'julienned' }
      ],
      steps: [
        { t: 'Toss the beef with the baking soda, leave 20 minutes, then rinse thoroughly and pat bone dry. This is why restaurant beef is tender in slices this thin.', ic: 'timer', min: 20, look: 'Slippery before rinsing, matte and dry after.' },
        { t: 'Soak the liver in milk 30 minutes, rinse, then slice it thin and leave it raw for now.', ic: 'chill', min: 30, look: 'Pale, mild-smelling slices.' },
        { t: 'Dredge the beef in cornstarch and marinate in the soy sauce, oyster sauce and pepper 20 minutes.', ic: 'bowl', min: 20, look: 'A thick dark coating clinging to each slice.' },
        { t: 'Blanch the carrot 90 seconds and the togue 15 seconds, then shock both in ice water. Shocking is what keeps the colour.', ic: 'pot', min: 3, look: 'Vivid orange and white, cold and crisp.' },
        { t: 'Sear the beef in small batches over very high heat, 45 seconds a side. Crowding the pan steams it.', ic: 'flame', min: 6, look: 'A real brown crust; the pan smoking lightly.' },
        { t: 'Stir-fry the ginger, garlic and onion 2 minutes, then flash the liver through for 60 seconds and lift it out.', ic: 'ginger', min: 3, look: 'Liver just losing its pink, still soft.' },
        { t: 'Deglaze with the dalandan juice and the remaining marinade, scraping the pan, and reduce 4 minutes.', ic: 'citrus', min: 4, look: 'A glossy sauce that coats a spoon.' },
        { t: 'Return everything, add the beans and the zest, and toss 1 minute off the heat.', ic: 'mix', min: 1, look: 'Everything lacquered, vegetables still bright.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 43 --------------------------------------------------------------- */
{
  id: 'ginataang-tuna',
  name: 'Ginataang Tuna',
  aka: 'Tuna and Dilis in Coconut Milk',
  cat: 'main',
  region: 'Nationwide',
  icon: 'fish',
  serves: 10,
  blurb: 'Canned tuna and dried anchovies simmered in coconut milk with squash and banana heart. Two kinds of fish doing two different jobs.',
  nutr: { cal: 361, pro: 18.26, iron: 2.68 },
  keys: ['tuna', 'dilis', 'dried anchovies', 'coconut milk', 'squash', 'puso ng saging', 'banana blossom', 'malunggay', 'ginger'],
  ing: [
    { q: 3, u: 'tbsp', n: 'coconut oil', note: 'for frying' },
    { q: 0.5, u: 'cup', n: 'dried dilis', note: '120 g', al: ['fish'], an: 'fish', sub: { fish: 'omit, and add 1 tbsp white miso', vg: 'omit, and add 1 tbsp white miso' } },
    { q: 1.5, u: 'tbsp', n: 'coconut oil', note: 'for sautéing' },
    { q: 0.25, u: 'cup', n: 'garlic', note: 'minced' },
    { q: 0.33, u: 'cup', n: 'onion', note: 'sliced, 80 g' },
    { q: 3, u: 'tbsp', n: 'ginger', note: 'chopped' },
    { q: 1.25, u: 'cups', n: 'canned tuna chunks in brine', note: 'drained, 300 g', al: ['fish'], an: 'fish', sub: { fish: 'chickpeas', vg: 'chickpeas' } },
    { q: 0.25, u: 'cup', n: 'squash', note: 'cubed, 60 g' },
    { q: 2.5, u: 'cups', n: 'coconut milk', note: 'undiluted', sub: { lite: 'light coconut milk' } },
    { q: 1, u: 'cup', n: 'water' },
    { q: 0.33, u: 'cup', n: 'puso ng saging', note: 'banana heart, 80 g' },
    { q: 0.33, u: 'cup', n: 'malunggay leaves', note: '80 g' },
    { q: 1, u: 'tsp', n: 'iodized salt', sub: { lite: 'salt (use 1/2 tsp)' } }
  ],
  tiers: {
    easy: {
      time: '30 min',
      about: 'Tuna only, no dilis to fry and no banana heart to clean. Canned coconut milk, one pan, half an hour.',
      drop: ['dried dilis', 'puso ng saging', 'coconut oil'],
      steps: [
        { t: 'Heat the oil and sauté the garlic, onion and ginger 4 minutes.', ic: 'ginger', min: 4, look: 'Soft and strongly fragrant.' },
        { t: 'Add the drained tuna and squash and stir 2 minutes.', ic: 'fish', min: 2, look: 'Tuna coated, squash glossy.' },
        { t: 'Pour in the coconut milk and water and bring to a boil.', ic: 'coconut', min: 5, look: 'Milk simmering, squash softening.' },
        { t: 'Simmer 12 minutes until the squash is tender and the sauce has thickened.', ic: 'simmer', min: 12, look: 'Sauce clinging; coconut oil just beginning to show.' },
        { t: 'Stir in the malunggay leaves, season with salt, and serve.', ic: 'leaf', min: 2, look: 'Bright green leaves in a thick white sauce.' }
      ]
    },
    core: {
      time: '45 min',
      about: 'The published recipe. The dilis are fried first and go in whole — they soften into the sauce and carry most of the savouriness.',
      steps: [
        { t: 'Heat the frying oil. Fry the dilis until crisp and set aside.', ic: 'pan', min: 4, look: 'Rigid, deep gold little fish.' },
        { t: 'In another pan, sauté the garlic, onion and ginger.', ic: 'ginger', min: 4, look: 'Aromatics soft, kitchen smelling of ginger.' },
        { t: 'Add the tuna, squash, dilis, coconut milk and water. Let it boil.', ic: 'coconut', min: 6, look: 'A full pan of simmering white liquid.' },
        { t: 'Add the puso ng saging and cook 5 minutes.', ic: 'veg', min: 5, look: 'Banana heart softened and dulled.' },
        { t: 'Add the malunggay leaves.', ic: 'leaf', min: 2, look: 'Leaves wilted, still green.' },
        { t: 'Season with salt and serve with rice.', ic: 'plate', look: 'Thick coconut sauce with fish and greens through it.' }
      ]
    },
    complex: {
      time: '1 hr 30 min',
      about: 'Fresh-pressed coconut milk in two strengths, the dilis kept crisp as a topping, and the banana heart salted properly. The first extract goes in last so it never splits.',
      drop: ['coconut milk'],
      add: [
        { q: 2, u: '', n: 'mature coconuts', note: 'grated, for fresh gata' },
        { q: 3, u: 'cups', n: 'warm water', note: 'for pressing' },
        { q: 3, u: '', n: 'siling haba', note: 'long green chilies' },
        { q: 1, u: 'tbsp', n: 'cane vinegar', note: 'to finish' },
        { q: 1, u: 'tbsp', n: 'salt', note: 'for rubbing the banana heart' }
      ],
      steps: [
        { t: 'Press the coconut: knead 1 cup warm water into the grated flesh for the thick first extract, then twice more for the thin.', ic: 'coconut', min: 15, look: 'One bowl thick and opaque, one thin and bluish.' },
        { t: 'Slice the banana heart, rub with the extra salt, leave 10 minutes, then squeeze and rinse.', ic: 'bowl', min: 10, look: 'Dark sap gone; strands pale.' },
        { t: 'Fry the dilis crisp and reserve them for the top rather than simmering them away.', ic: 'pan', min: 4, look: 'Crunchy and golden.' },
        { t: 'Sweat the ginger, garlic and onion in the oil 6 minutes without browning.', ic: 'ginger', min: 6, look: 'Translucent, fragrant, no colour.' },
        { t: 'Add the squash, banana heart and thin coconut milk and simmer 20 minutes.', ic: 'simmer', min: 20, look: 'Squash tender, liquid reduced by a third.' },
        { t: 'Fold in the tuna and simmer 5 minutes.', ic: 'fish', min: 5, look: 'Tuna heated through, still in chunks.' },
        { t: 'Add the first extract and the chilies and simmer very gently 10 minutes until the oil separates. A hard boil here curdles fresh gata.', ic: 'coconut', min: 10, look: 'Clear oil pooling at the edge of a thick sauce.' },
        { t: 'Off the heat add the malunggay and the cane vinegar, then top with the crisp dilis at the table.', ic: 'plate', look: 'Crunchy fish on a rich sauce, greens still bright.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 44 --------------------------------------------------------------- */
{
  id: 'picadillo-malunggay',
  name: 'Picadillo Malunggay',
  aka: 'Ground Beef with Sweet Potato and Malunggay',
  cat: 'main',
  region: 'Nationwide',
  icon: 'beef',
  serves: 10,
  blurb: 'Ground beef cooked down with a lot of tomato, then sweet potato, tofu and a great quantity of malunggay. The best protein-to-iron ratio in the book.',
  nutr: { cal: 285, pro: 18.46, iron: 4.78 },
  keys: ['ground beef', 'tomato', 'sweet potato', 'kamote', 'tokwa', 'tofu', 'malunggay', 'soy sauce', 'garlic', 'onion'],
  ing: [
    { q: 0.33, u: 'cup', n: 'coconut oil', note: 'for sautéing', sub: { lite: 'oil (use 1 tbsp)' } },
    { q: 2, u: 'tbsp', n: 'garlic', note: 'minced' },
    { q: 0.25, u: 'cup', n: 'onion', note: 'sliced' },
    { q: 3.125, u: 'cups', n: 'tomatoes', note: 'chopped, 750 g' },
    { q: 2.25, u: 'cups', n: 'lean ground beef', note: '540 g', an: 'meat', sub: { vg: 'crumbled tempeh or finely chopped mushrooms', lite: 'extra-lean ground beef' } },
    { q: 1, u: 'cup', n: 'water' },
    { q: 1.66, u: 'cups', n: 'sweet potato', note: 'cubed, 400 g' },
    { q: 0.66, u: 'cup', n: 'tokwa', note: 'cubed, 160 g', al: ['soy'], sub: { soy: 'paneer' } },
    { q: 1, u: 'tsp', n: 'iodized salt', sub: { lite: 'salt (use 1/2 tsp)' } },
    { q: null, u: '', n: 'ground black pepper', note: 'a pinch' },
    { q: 1.66, u: 'cups', n: 'malunggay leaves', note: '400 g' },
    { q: 1, u: 'tbsp', n: 'soy sauce', al: ['gluten', 'soy'], sub: { gluten: 'tamari', soy: 'coconut aminos' } }
  ],
  tiers: {
    easy: {
      time: '35 min',
      about: 'No tofu, and spinach if malunggay is hard to find. Everything in one pan in order of how long it needs.',
      drop: ['tokwa'],
      steps: [
        { t: 'Heat the oil and sauté the garlic and onion 3 minutes, then add the tomatoes.', ic: 'tomato', min: 3, look: 'Onion soft, tomatoes beginning to release juice.' },
        { t: 'Cook 8 minutes until the tomatoes collapse into a sauce.', ic: 'simmer', min: 8, look: 'A rough red sauce, no whole pieces left.' },
        { t: 'Add the ground beef and water and boil until cooked, breaking up the lumps.', ic: 'beef', min: 10, look: 'Beef browned and separated, no pink.' },
        { t: 'Add the sweet potato, salt and pepper and cook 10 minutes until tender.', ic: 'veg', min: 10, look: 'Cubes soft but holding shape; sauce thickened.' },
        { t: 'Stir in the malunggay and soy sauce, cook 3 minutes, and serve.', ic: 'leaf', min: 3, look: 'Deep green leaves through a red-brown stew.' }
      ]
    },
    core: {
      time: '50 min',
      about: 'The published recipe. Three cups of tomato is not a mistake — it cooks down to almost nothing and becomes the sauce.',
      steps: [
        { t: 'In a pan, heat the oil and sauté the garlic and onion, then add the tomatoes.', ic: 'tomato', min: 5, look: 'Tomatoes softening and giving up liquid.' },
        { t: 'Add the ground beef and water. Bring to a boil until cooked.', ic: 'beef', min: 12, look: 'Beef fully browned, sauce reduced slightly.' },
        { t: 'Add the sweet potatoes, salt and pepper and cook 5 to 10 minutes, or until the sweet potato is cooked.', ic: 'veg', min: 10, look: 'A knife slides into the cubes with no resistance.' },
        { t: 'Add the tokwa and cook another 5 to 10 minutes.', ic: 'tofu', min: 8, look: 'Tofu heated through and taking on the colour of the sauce.' },
        { t: 'Add the malunggay leaves and soy sauce and cook again for another 5 minutes.', ic: 'leaf', min: 5, look: 'Leaves wilted into the stew, still clearly green.' },
        { t: 'Taste and serve with rice.', ic: 'plate', look: 'A thick red-brown stew flecked dark green.' }
      ]
    },
    complex: {
      time: '1 hr 30 min',
      about: 'The beef browned hard in batches before any liquid goes in, the tomatoes roasted first, and the tofu fried separately so it holds up instead of dissolving.',
      add: [
        { q: 2, u: 'tbsp', n: 'tomato paste' },
        { q: 2, u: '', n: 'bay leaves' },
        { q: 1, u: 'tsp', n: 'smoked paprika' },
        { q: 0.5, u: 'cup', n: 'beef stock', an: 'meat', sub: { vg: 'mushroom stock' } },
        { q: 1, u: 'tbsp', n: 'calamansi juice', note: 'to finish' }
      ],
      steps: [
        { t: 'Roast the tomatoes cut-side up at 425°F / 220°C for 30 minutes until collapsed and caught at the edges, then chop them roughly.', ic: 'oven', min: 30, look: 'Shrunken, darkened, juices caramelised in the tray.' },
        { t: 'Fry the tofu cubes until crisp and set aside. Added at the end, they stay distinct instead of going to mush.', ic: 'pan', min: 8, look: 'Crisp gold cubes.' },
        { t: 'Brown the ground beef hard in two batches over high heat, 5 minutes each, without stirring much. Crowding it is the difference between browned beef and grey beef.', ic: 'flame', min: 10, look: 'Real dark crust on the meat, browned fond on the pan.' },
        { t: 'Sauté the onion and garlic in the rendered fat 6 minutes, then add the tomato paste, paprika and bay and cook 2 minutes.', ic: 'onion', min: 8, look: 'Paste darkened from bright red to brick.' },
        { t: 'Return the beef with the roasted tomatoes and the stock and simmer 20 minutes.', ic: 'simmer', min: 20, look: 'A thick, glossy, deep red sauce.' },
        { t: 'Add the sweet potato and simmer 12 minutes until tender.', ic: 'veg', min: 12, look: 'Cubes tender, sauce reduced around them.' },
        { t: 'Fold in the malunggay, soy sauce and calamansi off the heat.', ic: 'leaf', min: 2, look: 'Leaves just collapsed, colour still vivid.' },
        { t: 'Scatter the fried tofu over at the table so it stays crisp.', ic: 'plate', look: 'Crisp cubes on a dark, glossy stew.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
},

/* 45 --------------------------------------------------------------- */
{
  id: 'white-bean-stew',
  name: 'White Bean Stew',
  aka: 'Nilagang Puting Beans at Kalabasa',
  cat: 'main',
  region: 'Nationwide',
  icon: 'pot',
  serves: 10,
  blurb: 'White kidney beans and squash in a milk-thickened broth with tuna and tofu. Closer to a chowder than anything else in Filipino home cooking.',
  nutr: { cal: 368, pro: 11.08, iron: 3.84 },
  keys: ['kidney beans', 'white beans', 'squash', 'tokwa', 'tofu', 'evaporated milk', 'tuna', 'kinchay', 'bell pepper', 'cornstarch'],
  ing: [
    { q: 2, u: 'cups', n: 'water', note: 'for boiling the beans' },
    { q: 1, u: 'cup', n: 'white kidney beans', note: '240 g' },
    { q: 0.75, u: 'cup', n: 'coconut oil', note: 'for frying', sub: { lite: 'oil (use 2 tbsp)' } },
    { q: 0.75, u: 'cup', n: 'tokwa', note: 'cubed and fried, 180 g', al: ['soy'], sub: { soy: 'paneer' } },
    { q: 2, u: 'tbsp', n: 'coconut oil', note: 'for sautéing' },
    { q: 0.25, u: 'cup', n: 'garlic', note: 'minced' },
    { q: 0.25, u: 'cup', n: 'onion', note: 'minced' },
    { q: 1.75, u: 'cups', n: 'squash', note: 'cubed, 420 g' },
    { q: 1, u: 'cup', n: 'water' },
    { q: 0.5, u: 'cup', n: 'kinchay', note: 'leaves and stem, 120 g' },
    { q: 0.33, u: 'cup', n: 'red bell pepper', note: 'sliced, 80 g' },
    { q: 0.75, u: 'cup', n: 'evaporated milk', al: ['dairy'], an: 'dairy', sub: { dairy: 'coconut milk', vg: 'coconut milk', lite: 'low-fat evaporated milk' } },
    { q: 0.33, u: 'cup', n: 'canned tuna chunks in brine', note: 'drained, 80 g', al: ['fish'], an: 'fish', sub: { fish: 'extra beans', vg: 'extra beans' } },
    { q: 1.25, u: 'tbsp', n: 'cornstarch', note: 'dissolved in water' },
    { q: 1, u: 'cup', n: 'water', note: 'for the slurry' },
    { q: 0.5, u: 'tsp', n: 'coarse salt' },
    { q: null, u: '', n: 'ground black pepper', note: 'a pinch' }
  ],
  tiers: {
    easy: {
      time: '45 min',
      about: 'Canned beans, no tofu to fry, and the milk doing the thickening on its own. The squash breaks down and bodies the stew by itself.',
      drop: ['tokwa', 'cornstarch', 'white kidney beans', 'coconut oil'],
      add: [{ q: 2, u: 'cups', n: 'canned white beans', note: 'drained and rinsed' }],
      steps: [
        { t: 'Sauté the garlic and onion in the oil 3 minutes.', ic: 'pan', min: 3, look: 'Soft, fragrant, no colour.' },
        { t: 'Add the squash and water and simmer 12 minutes until the squash is very soft.', ic: 'simmer', min: 12, look: 'Squash collapsing at the edges, liquid turning orange.' },
        { t: 'Crush about a third of the squash against the side of the pot to thicken the broth.', ic: 'spoon', look: 'A visibly thicker, opaque broth.' },
        { t: 'Add the beans, bell pepper, milk and tuna and simmer 6 minutes.', ic: 'can', min: 6, look: 'Creamy orange stew, beans heated through.' },
        { t: 'Stir in the kinchay, season, and serve.', ic: 'leaf', min: 2, look: 'Green flecks through a thick pale-orange stew.' }
      ]
    },
    core: {
      time: '1 hr 15 min',
      about: 'The published recipe. Dried beans boiled first, tofu fried separately, and a cornstarch slurry at the end — the milk alone will not hold it together.',
      steps: [
        { t: 'In a casserole, boil the beans until cooked. Set aside.', ic: 'pot', min: 45, look: 'Tender beans with their skins intact.' },
        { t: 'Heat the frying oil, fry the tokwa until golden brown, and set aside.', ic: 'pan', min: 8, look: 'Firm gold cubes.' },
        { t: 'In another pan, heat the sautéing oil. Sauté the garlic, onion, fried tokwa and squash. Add the water and let it boil until cooked.', ic: 'simmer', min: 12, look: 'Squash tender, tofu coloured by the broth.' },
        { t: 'Add the kinchay, beans, red bell pepper, milk and tuna.', ic: 'can', min: 5, look: 'Broth gone opaque and cream-coloured.' },
        { t: 'Add the dissolved corn starch. Mix until the sauce thickens.', ic: 'whisk', min: 3, look: 'Glossy and thick enough to coat a spoon.' },
        { t: 'Season with salt and pepper. Mix well and serve.', ic: 'plate', look: 'A thick, pale orange stew with everything suspended in it.' }
      ]
    },
    complex: {
      time: '2 hr + overnight soak',
      about: 'Beans soaked overnight and cooked with aromatics into their own broth, which then becomes the base — so nothing is thickened with cornstarch at all.',
      drop: ['cornstarch', 'water'],
      add: [
        { q: 2, u: '', n: 'bay leaves', note: 'for the beans' },
        { q: 1, u: 'thumb', n: 'ginger', note: 'for the beans' },
        { q: 2, u: '', n: 'tomatoes', note: 'chopped' },
        { q: 1, u: 'tsp', n: 'smoked paprika' },
        { q: 1, u: 'tbsp', n: 'calamansi juice', note: 'to finish' }
      ],
      steps: [
        { t: 'Soak the beans overnight in plenty of cold water.', ic: 'water', look: 'Beans doubled in size, skins smooth.' },
        { t: 'Simmer them with the bay and ginger in fresh water 55 minutes until creamy. Keep every drop of the cooking liquid — that is the stew base.', ic: 'simmer', min: 55, look: 'Beans soft through; liquid cloudy and slightly thick.' },
        { t: 'Fry the tokwa until crisp and set aside.', ic: 'pan', min: 8, look: 'Crunchy gold cubes.' },
        { t: 'Sauté the garlic, onion and tomato in the oil 10 minutes until jammy, then add the paprika.', ic: 'tomato', min: 10, look: 'A thick, dark, sweet-smelling base.' },
        { t: 'Add the squash and two cups of the bean liquid and simmer 15 minutes.', ic: 'simmer', min: 15, look: 'Squash collapsing, broth turning orange.' },
        { t: 'Blend about a third of the squash and beans smooth and stir it back in. This is what thickens it — no starch needed.', ic: 'mix', min: 5, look: 'Visibly creamy; the spoon leaves a trail.' },
        { t: 'Add the remaining beans, tuna, bell pepper and milk and warm through 6 minutes without boiling.', ic: 'can', min: 6, look: 'Thick and creamy; no sign of the milk splitting.' },
        { t: 'Off the heat, add the kinchay and calamansi, season, and top with the crisp tofu.', ic: 'plate', look: 'Crisp cubes on a thick pale-orange stew.' }
      ]
    }
  },
  src: { site: 'FNRI-DOST / IIRR / DepEd, Iron Rich Recipes', url: 'https://schoolnutritionphils.wordpress.com/wp-content/uploads/2020/01/iron-rich-recipe-booklet_oct2017.pdf' }
}

);
