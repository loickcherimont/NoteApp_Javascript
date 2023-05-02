// Main script file

//////////////////////////// CLASSES ////////////////////////
//import NoteUI from "./UI.js";

/*
		NOTE ITEM MODEL
		<div class="col-lg-3 col-md-6 col-sm-12 mb-3">
					<div class="card border-0 shadow-sm w-75 mx-auto">
						<div class="card-body">
							<h5 class="card-title">Note Title</h5>
							<p class="card-text">Lorem ipsum dolor ...</p>
							<button type="button" class="btn btn-primary stretched-link bg-transparent border-0" data-bs-toggle="modal" data-bs-target="#modalNote"><i class="bi bi-pencil text-secondary"></i></button>
						</div>
					</div>
				</div>
		
		
		*/

// Classes representing all note from the noteinterface
class NoteInterface {
	
	// #notes = [];
	
	// By default NoteInterface hasn't got any notes
	constructor(notes) {
		this.notes = notes;
	}
	
	
	displayAllNotes() {
		
		this.notes.forEach(note => {
			const {id, title, body} = note;
			
			const uiNote = document.createElement("div");
			uiNote.classList.add("col-lg-3", "col-md-6", "col-sm-12", "mb-3");
			uiNote.innerHTML = `
				<div class="card border-0 shadow-sm w-75 mx-auto">
						<div class="card-body">
							<h5 class="card-title">${title}</h5>
							<p class="card-text">${body}</p>
							<button type="button" class="btn btn-primary stretched-link bg-transparent border-0" data-bs-toggle="modal" data-bs-target="#modalNote"><i class="bi bi-pencil text-secondary"></i></button>
						</div>
					</div>
			`;
			document.getElementById("noteInterfaceBody").appendChild(uiNote);
		});
	}
	
	createNote() {
		const noteItem = new NoteItem();
		noteItem.edit();
	}
	
	// Prefer to use this methid in NoteItem class
	// editNote() {
		// const note = new NoteItem();
		
		// const noteData = new FormData(document.getElementById("noteUI"));
		
		// note.id = Date.now();
		// note.title = noteData.get("note_title");
		// note.body = noteData.get("note_body");
				
		// note.add(this.notes);
		
		// document.getElementById("noteUI").reset();
		
		// /** @todo Replace this line by UI helper **/
				// console.log("Note edited");
		
		//this.displayAllNotes();
	// }
}

/** Class representing a note **/
/** Parameters: id, title, body (number, string, string)**/
class NoteItem {
	constructor(id, title, body) {
		this.id = id;
		this.title = title;
		this.body = body;
	}
	
	del(notes) {
		const targetId = this.id;
		notes.map(note => targetId !== note.id);
	}
	
	add(notes) {
		// console.log(notes);
		notes.push(this);
		console.log(notes);
	}
	
	// Write a new note item or modify an existing one
	edit(notes) {
		
		const noteData = new FormData(document.getElementById("noteUI"));
		this.id = Date.now();
		this.title = noteData.get("note_title");
		this.body = noteData.get("note_body");
		
		
		const item = document.createElement("div");
		item.classList.add("col-lg-3", "col-md-6", "col-sm-12", "mb-3");
		item.innerHTML = `
				<div class="card border-0 shadow-sm w-75 mx-auto">
						<div class="card-body">
							<h5 class="card-title">${title}</h5>
							<p class="card-text">${body}</p>
							<button type="button" class="btn btn-primary stretched-link bg-transparent border-0" data-bs-toggle="modal" data-bs-target="modalNote-${id}"><i class="bi bi-pencil text-secondary"></i></button>
						</div>
					</div>
			`;
		
		// Create the modal associated to the button
		const modal = `
		<div class="modal fade" id="modalNote-${id}" tabindex="-1" aria-labelledby="modalNoteLabel-${id}" aria-hidden="true" data-bs-backdrop="static">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="modalNoteLabel-${id}">Start typing!</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">	  
        
		<form id="noteUI" name="note_ui" method="get">
          <div class="mb-3">
            <label for="noteTitle" class="col-form-label">Title</label>
            <input type="text" class="form-control" id="noteTitle" name="note_title" value="">
          </div>
          <div class="mb-3">
            <label for="noteBody" class="col-form-label">Your note</label>
            <textarea class="form-control" id="noteBody" name="note_body" value=""></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
		<div class="form-check">
			<label class="form-check-label" for="addToArchives">Move to Archives</label>
			<input class="form-check-input ps-3" type="checkbox" value="" id="addToArchives">
		</div>
		
        <button ="modal"></button>
        <button type="button" class="btn btn-danger" title="Delete the note" id="deleteBtn"><i class="bi bi-trash"></i></button>
      </div>
    </div>
  </div>
</div>`;
		const editBtn = document.createElement("button");
		editBtn.setAttribute("class", "btn btn-primary");
		editBtn.setAttribute("type", "submit");
		editBtn.setAttribute("title", "Edit the note");
		editBtn.setAttribute("id", "editBtn");
		editBtn.setAttribute("type", "submit");
		editBtn.setAttribute("title", "Edit the note");
		editBtn.setAttribute("data-bs-dismiss", "modal");
		editBtn.innerHTML = `<i class="bi bi-pencil"></i>`;
		editBtn.addEventListener("click", 
		
		
		// document.getElementById("editBtn").addEventListener("click", );
		document.querySelector(".modal-footer").appendChild(editBtn);

		notes.push(item);
		notes.displayAllNotes();
		
		}
		
	
	// edit, delete, archive
}

//////////////////////////// MAIN ////////////////////////
// import { NoteItem } from "./components/NoteItem.js";


const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const noteInterface = new NoteInterface([]);


// editBtn.addEventListener("click", noteInterface.editNote.bind(noteInterface));
// deleteBtn.addEventListener("click", noteInterface.deleteNote.bind(noteInterface));



// const noteItem = new NoteItem(Date.now(), "title", "body");

// noteItem.edit();





