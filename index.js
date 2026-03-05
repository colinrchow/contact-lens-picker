import { contactOptions } from "./data.js";

const vibeEl = document.getElementById('vibe')
const outfitEl = document.getElementById('outfit')
const formEl = document.getElementById('form')

vibeEl.addEventListener('change', highlightOption)
outfitEl.addEventListener('change', highlightOption)
formEl.addEventListener('submit', function(e) {
    e.preventDefault()
    renderContacts()
})


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

function renderContacts() {
    console.log(getSortedMatchingContacts())
}


function getSortedMatchingContacts() {
    const checkedVibes = [...document.querySelectorAll('#vibe input[type="checkbox"]:checked')].map(checkbox => checkbox.value)
    const checkedOutfits = [...document.querySelectorAll('#outfit input[type="checkbox"]:checked')].map(checkbox => checkbox.value)
    const isPrescripted = document.getElementById('is-prescripted').checked
    const matchingContactsArr = contactOptions.filter(function(contact) {

            // if prescripted checkbox is checked, filter out all unprescripted contacts
            if (isPrescripted && !contact.isPrescripted) {
                return false

            // if at least one vibe and one outfit option are checked, filter out all contacts that don't have at least one checked vibe and one checked outfit
            } else if (document.querySelector('#vibe input[type="checkbox"]:checked') && document.querySelector('#outfit input[type="checkbox"]:checked')) {
                const vibeMatch = checkedVibes.some(function(v) {
                    return contact.vibe.includes(v)
                })
                const outfitMatch = checkedOutfits.some(function(o) {
                    return contact.outfit.includes(o)
                })
                return vibeMatch && outfitMatch

            // if only vibe option or only outfit option are checked, add contacts that have those options
            } else {
                return score(contact) > 0
            }
        })
    
    // .sort(a, b) passes through first and second item of arr and compares them
    // need custom function (e.g., score(b) - score(a)) bc default behavior of .sort() is weird for numbers
    // results:
        // negative -> a comes first
        // positive -> b comes first
        // zero -> same order

    return matchingContactsArr.sort(function(a, b) {
        return score(b) - score(a)
    })
}

function score(contact) {
    const checkedVibes = [...document.querySelectorAll('#vibe input[type="checkbox"]:checked')].map(checkbox => checkbox.value)
    const checkedOutfits = [...document.querySelectorAll('#outfit input[type="checkbox"]:checked')].map(checkbox => checkbox.value)
    const checkedVibesArr = checkedVibes.filter(function(v) {
        return contact.vibe.includes(v)
    })
    const checkedOutfitsArr = checkedOutfits.filter(function(o) {
        return contact.outfit.includes(o)
    })
    const score = checkedVibesArr.length + checkedOutfitsArr.length
    return score
}


