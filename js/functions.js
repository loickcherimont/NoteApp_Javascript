/**
 * @function addNewNote
 * 
 * Fetch user data and add them to notes
 * 
 * @param {SubmitEvent}
 */
export function addNote(e) {

    e.preventDefault();

    const noteForm = new FormData(this);

    const [noteTitle, noteBody] = noteForm.values();

    const isEmpty = noteIsEmpty(noteTitle, noteBody);

    if(isEmpty) {
        return;
    }

    // Get note item from a template
    const noteItem = document
                        .getElementById('noteTemplate')
                        .content
                        .cloneNode(true)
                        .querySelector('.note-item');

    // console.dir(noteItem.innerHTML);


    // Complete the item with the data
    noteItem.querySelector('.note-title').innerText = noteTitle;
    noteItem.querySelector('.note-body').innerText = noteBody;
    noteItem.querySelector('.delete-note').addEventListener('click', deleteNote);

    // Allow user consult his/her notes
    // Or delete created note
    displayNote(noteItem);

    document.querySelector('.notes').appendChild(noteItem);

    // Reset form after data submit
    this.reset();
}

export function displayNote(noteItem) {
    // console.log(noteItem);
    noteItem
        // .querySelector('.note-link')
        .addEventListener('click', e => {

            showSelectedNote(e.currentTarget);

        // Fetch data from list and display them in form
        let titleContentList = e.currentTarget.querySelector('.note-title').innerText;
        let bodyContentList = e.currentTarget.querySelector('.note-body').innerText;

        document.forms[0].querySelector('#noteTitle').value = titleContentList;
        document.forms[0].querySelector('#noteBody').value = bodyContentList;

        unlockModifyOption();


    });
}

export function deleteNote(e) {
    const noteItem = e.currentTarget.parentNode.parentNode;
    noteItem.remove();
}



/**
 * Display to user the selected note with in different style
 * of the other
 */
function showSelectedNote(noteItemFromList) {
    document
        .querySelectorAll('.note-item')
        .forEach(noteItem => {
            noteItem.classList.remove('is-selected');
        })
    console.log(noteItemFromList);
    noteItemFromList.classList.add('is-selected');
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