import { createNoteItem } from "./components/note.js";

/**
 * @function addNewNote
 * 
 * Fetch user data and add them to notes
 * 
 * @param {SubmitEvent}
 */
export function addNote(e) {

    e.preventDefault();

    // Fetch data from form
    const [noteTitle, noteBody] = getNoteData();

    // Check if entries are empty
    const isEmpty = noteIsEmpty(noteTitle, noteBody);

    if(isEmpty) {
        return;
    }

    // With user data
    const noteItem = createNoteItem(noteTitle, noteBody);

    // Allow user consult his/her notes
    document.querySelector('#notes').appendChild(noteItem);

    // Reset form after data submit
    this.reset();
}

/**
 * Fetch title and body texts from a note
 * Display them in the form
 * @param {HTMLElement} noteItem 
 */
export function fetchNote(e) {
    const selectedNote = e.currentTarget;

    // Display selected note from the list
    UiDisplay(selectedNote);

    let selectedTitle = selectedNote.querySelector('.note-title').innerText;
    let selectedBody = selectedNote.querySelector('.note-body').innerText;
    
    const noteForm = document.getElementById('noteForm')
    noteForm.querySelector('#noteTitle').value = selectedTitle;
    noteForm.querySelector('#noteBody').value = selectedBody;

    // Allow user modify
    unlockModifyOption();
}

/**@todo Prevent form keep data if user want to delete it */
export function deleteNote(e) {
    const noteForm = document.getElementById('noteForm')

    // noteForm.querySelector('#noteTitle').value = "DELETE_TITLE";
    // noteForm.querySelector('#noteBody').value = "DELETE_BODY";

    const noteItem = e.currentTarget.parentNode.parentNode;
    noteItem.remove();
}


/**
 * @function noteIsEmpty
 * 
 * Check if user sent an empty note
 * Returns true if note is empty and a message 
 * 
 * @param {string} noteTitle 
 * @param {string} noteBody 
 * @returns {boolean}  
 */
function noteIsEmpty(noteTitle, noteBody) {
    const emptyAlert = document.getElementById('emptyAlert');
    if(!noteTitle && !noteBody) {
        emptyAlert.classList.remove('d-none');
        return true;
    } else {
        emptyAlert.classList.add('d-none');
        return false;
    }
}

// MODIFY OPTION

/**
 * @function unlockModifyOption
 * 
 * Display modify button when user selects an available note
 */
function unlockModifyOption() {
    document.querySelector('#modifyButton').classList.remove('d-none');
}

export function modifyNote() {

    let titleContent = document.querySelector('#noteTitle').value;
    let bodyContent = document.querySelector('#noteBody').value;

    // Fetch the selected note
    const selectedNote = document.querySelector('.note-item.is-selected');

    selectedNote.querySelector('.note-title').innerText = titleContent;
    selectedNote.querySelector('.note-body').innerText = bodyContent;

    document.forms[0].reset();

    // Lock modify option
    disableModify();
}

/**
 * @function disableModify
 * 
 * Lock modify option 
 * 
 */
function disableModify() {
    document.querySelector('#modifyButton').classList.add('d-none');
}

/**
 * Fetch data from form
 * @returns {string} Title and Body
 */
function getNoteData() {
    const noteForm = new FormData(document.getElementById('noteForm'));
    let noteTitle = noteForm.get('note_title');
    let noteBody = noteForm.get('note_body');
    return [noteTitle, noteBody];
}

/**
 * Display selected note 
 * In an different style from the other
 * @param {HTMLElement} selectedNote 
 */
function UiDisplay(selectedNote) {
    const notes = document
                    .querySelectorAll('.note-item');

    notes.forEach(note => {
        note.classList.remove('is-selected');
    })
    
    selectedNote.classList.add('is-selected');
}