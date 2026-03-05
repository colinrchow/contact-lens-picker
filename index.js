import { contactOptions } from "./data.js";

const vibeEl = document.getElementById('vibe')
const outfitEl = document.getElementById('outfit')

vibeEl.addEventListener('change', highlightOption)
outfitEl.addEventListener('change', highlightOption)


renderOptions(contactOptions)

function highlightOption(e) {
    const checkboxes = document.getElementsByClassName('checkbox')
    for (const checkbox of checkboxes) {
        const isChecked = checkbox.querySelector('input[type="checkbox"]').checked
        if (isChecked) {
            checkbox.classList.add('highlight')
        } else {
            checkbox.classList.remove('highlight')
        }
    }
}

function renderOptions(contacts) {
    for (const vibe of getVibeOptions(contacts)) {
        vibeEl.innerHTML += `
            <label for='${vibe}' class='checkbox'>
                <span>${vibe}</span>
                <input 
                    type='checkbox'
                    value='${vibe}'
                    name='vibe'
                    id='${vibe}'>
            </label>
        `
    }
    for (const outfit of getOutfitOptions(contacts)) {
        outfitEl.innerHTML += `
            <label for='${outfit}' class='checkbox'>
                <span>${outfit}</span>
                <input 
                    type='checkbox'
                    value='${outfit}'
                    name='outfit'
                    id='${outfit}'>
            </label>
        `
    }
}

function getVibeOptions(contacts) {
    let vibeOptions = []
    for (const contact of contacts) {
        for (const vibe of contact.vibe) {
            if (!vibeOptions.includes(vibe)) {
                vibeOptions.push(vibe)
            }
        }
    }
    return vibeOptions
}

function getOutfitOptions(contacts) {
    let outfitOptions = []
    for (const contact of contacts) {
        for (const outfit of contact.outfit) {
            if (!outfitOptions.includes(outfit)) {
                outfitOptions.push(outfit)
            }
        }
    }
    return outfitOptions
}

