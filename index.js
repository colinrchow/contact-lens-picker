import { contactOptions } from "./data.js";


// var declaration

const vibeEl = document.getElementById('vibe')
const outfitEl = document.getElementById('outfit')
const formEl = document.getElementById('form')
const modalEl = document.getElementById('modal')
const gallery = document.getElementById('gallery')
const closeModalBtn = document.getElementById('close-modal-btn')
const leftArrowBtn = document.getElementById('left-arrow-btn')
const rightArrowBtn = document.getElementById('right-arrow-btn')
const contactName = document.getElementById('contact-name')
const contactDetails = document.getElementById('contact-details')
let arrIndex = 0


// event listeners

vibeEl.addEventListener('change', highlightOption)
outfitEl.addEventListener('change', highlightOption)
formEl.addEventListener('submit', function(e) {
    e.preventDefault()
    renderContacts()
})
closeModalBtn.addEventListener('click', closeModal)
leftArrowBtn.addEventListener('click', leftArrow)
rightArrowBtn.addEventListener('click', rightArrow)


renderOptions(contactOptions)


// interaction

function highlightOption() {
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

function closeModal() {
    modalEl.style.display = 'none'
    arrIndex = 0
    leftArrowBtn.disabled = true
    rightArrowBtn.disabled = false
}

function leftArrow() {
    rightArrowBtn.disabled = false
    if (arrIndex === 1) {
        arrIndex -= 1
        leftArrowBtn.disabled = true
    } else {
        arrIndex -= 1
    }
    renderContacts()
}

function rightArrow() {
    leftArrowBtn.disabled = false
    if (arrIndex === getSortedMatchingContacts().length - 2) {
        arrIndex += 1
        rightArrowBtn.disabled = true
    } else {
        arrIndex += 1
    }
    renderContacts()
}


// render contacts onto modal + show modal

function renderContacts() {
    const sortedContactsArr = getSortedMatchingContacts()
    let vibeDetails = `<span>vibe</span>: `
    let outfitDetails = `<span>outfit(s)</span>: `
    let prescriptionDetails = `<span>prescripted</span>: `
    leftArrowBtn.style.display = 'block'
    rightArrowBtn.style.display = 'block'
    if (sortedContactsArr.length < 1) {
        gallery.style.justifyContent = `center`
        contactName.textContent = ``
        contactDetails.innerHTML = `<p class="no-results">There are no results that match your search!</p>`
        leftArrowBtn.style.display = 'none'
        rightArrowBtn.style.display = 'none'
    } else {
        for (let i = 0; i < sortedContactsArr[arrIndex].vibe.length; i++) {
            if (i < sortedContactsArr[arrIndex].vibe.length - 1) {
                vibeDetails += `${sortedContactsArr[arrIndex].vibe[i]}, `
            } else {
                vibeDetails += sortedContactsArr[arrIndex].vibe[i]
            }
        }
        for (let i = 0; i < sortedContactsArr[arrIndex].outfit.length; i++) {
            if (i < sortedContactsArr[arrIndex].outfit.length - 1) {
                outfitDetails += `${sortedContactsArr[arrIndex].outfit[i]}, `
            } else {
                outfitDetails += sortedContactsArr[arrIndex].outfit[i]
            }
        }
        if (sortedContactsArr[arrIndex].isPrescripted) {
            prescriptionDetails += `yes`
        } else {
            prescriptionDetails += `no`
        }
        contactName.textContent = sortedContactsArr[arrIndex].name
        contactDetails.innerHTML = `
            <p class="contact-item">${vibeDetails}</p>
            <p class="contact-item">${outfitDetails}</p>
            <p class="contact-item">${prescriptionDetails}</p>
        `
        gallery.style.justifyContent = `space-between`
    }
    modalEl.style.display = 'block'
}

function getSortedMatchingContacts() {
    const checkedVibes = [...document.querySelectorAll('#vibe input[type="checkbox"]:checked')].map(checkbox => checkbox.value)
    const checkedOutfits = [...document.querySelectorAll('#outfit input[type="checkbox"]:checked')].map(checkbox => checkbox.value)
    const isPrescripted = document.getElementById('is-prescripted').checked
    const matchingContactsArr = contactOptions.filter(function(contact) {

            // if prescripted checkbox is checked, filter out all nonprescripted contacts
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
            } else if (document.querySelector('#vibe input[type="checkbox"]:checked') || document.querySelector('#outfit input[type="checkbox"]:checked')){
                return score(contact) > 0
            } else {
                return isPrescripted && contact.isPrescripted
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


// render checkboxes onto page

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
    return vibeOptions.sort()
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
    return outfitOptions.sort()
}