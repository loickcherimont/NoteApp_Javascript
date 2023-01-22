import { addNote, modifyNote } from "./functions.js";

document.querySelector('#noteForm')
        .addEventListener('submit', addNote);

// document.querySelectorAll('.note-item')
//         .forEach(displayNote);


document.querySelector('#modifyButton')
        .addEventListener('click', modifyNote)