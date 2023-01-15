import { addNote, displayNote } from "./functions.js";

// Add new notes with button 
document.querySelector('#noteForm')
        .addEventListener('submit', addNote);

document.querySelectorAll('.note-item')
        .forEach(displayNote);