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
    noteItem.querySelector('.delete-note').addEventListener('click', deleteNote)

    // Allow user consult his/her notes
    // Or delete created note
    displayNote(noteItem);

    document.querySelector('.notes').appendChild(noteItem);

    // Reset form after data submit
    this.reset();
}

export function displayNote(noteItem) {
    noteItem
        .querySelector('.note-link')
        .addEventListener('click', e => {
        // Fetch data from list and display them in form
        let titleContentList = e.currentTarget.querySelector('.note-title').innerText;
        let bodyContentList = e.currentTarget.querySelector('.note-body').innerText;

        document.forms[0].querySelector('#noteTitle').value = titleContentList;
        document.forms[0].querySelector('#noteBody').value = bodyContentList;
    });
}

export function deleteNote(e) {
    e.currentTarget.parentNode.remove();
}