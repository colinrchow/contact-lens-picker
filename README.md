# Cat's Contacts

A personal contact lens picker tool that recommends contact lenses based on your vibe and outfit aesthetic.


## What it does

Select your desired vibe (soft, bold, natural) and outfit style (neutral, warm tone, cool tone, earth tone, pinks, metallic), optionally filter for prescription-only options, and get a ranked list of matching contact lenses sorted by best match.


## How it works

- **Vibe & Outfit filters** — check one or more options to narrow results
- **Prescripted filter** — toggle to show only lenses available with prescription
- **Scoring** — results are ranked by how many selected criteria each lens matches
- **Gallery view** — browse matching lenses one at a time with left/right navigation


## Files

File | Description
- `index.html` | Page structure and form layout
- `index.css` | Styles
- `index.js` | Filter, scoring, and rendering logic
- `data.js` | Contact lens data (name, vibe, outfit, prescription availability)


## Adding lenses

Add entries to the `contactOptions` array in [data.js](data.js):

```js
{
    name: 'Lens Name',
    link: '',           // optional purchase link
    image: './images/lens.png',
    vibe: ['soft'],     // soft | bold | natural
    outfit: ['neutral', 'pinks'], // neutral | warm tone | cool tone | earth tone | pinks | metallic
    isPrescripted: true,
    isAvailable: true,
}
```
