import { deleteNote, fetchNote } from "../functions.js";

/**
 * Create note item using layout from template
 * 
 * @param {string} noteTitle
 * @param {string} noteBody 
 * @returns {HTMLElement} Note Item
 */
export function createNoteItem(noteTitle='', noteBody='') {
    let noteId = Date.now(); // To obtain a different ID name than other items
    const noteItem = document
                        .getElementById('noteTemplate')
                        .content
                        .cloneNode(true)
                        .firstElementChild;

    // Give a unique ID
    noteItem.id = `noteItem-${noteId}`;

    // Complete with form data
    noteItem.querySelector('.note-title').innerText = noteTitle;
    noteItem.querySelector('.note-body').innerText = noteBody;

    // Allow note deletion
    noteItem.querySelector('.delete-note').addEventListener('click', deleteNote, true);

    // Add a click event
    noteItem.addEventListener('click', fetchNote);

    return noteItem;
}