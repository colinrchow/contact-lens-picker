# Cat's Contacts

A vanilla JavaScript web app for browsing and filtering a personal contact lens collection by aesthetic vibe and outfit style.

**Live demo:** [colinrchow.github.io/contact-lens-picker](https://colinrchow.github.io/contact-lens-picker)


## Features

- Filter lenses by vibe (soft, bold, natural) and outfit style (neutral, warm tone, cool tone, earth tone, pinks, metallic)
- Toggle to show only prescription-available lenses
- Relevance scoring ranks results by number of matching criteria
- Modal gallery with arrow navigation to browse results


## Tech

Built with plain HTML, CSS, and JavaScript — no frameworks or build tools.


## Project structure

| File | Description |
|------|-------------|
| `index.html` | Page structure |
| `index.css` | Styles |
| `index.js` | Filter, scoring, and rendering logic |
| `data.js` | Lens data |


## Adding lenses

Add an entry to the `contactOptions` array in [data.js](data.js):

```js
{
    name: 'Lens Name',
    link: '',                      // optional purchase link
    image: './images/lens.png',
    vibe: ['soft'],                // soft | bold | natural
    outfit: ['neutral', 'pinks'],  // neutral | warm tone | cool tone | earth tone | pinks | metallic
    isPrescripted: true,
    isAvailable: true,
}
```
