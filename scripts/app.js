// Create/Modify a note 
class UI {
	
	#notes = [];
	#modal;
	#targetNote;
	
	hideBtns () {
		const modifyBtn = document.getElementById("modifyBtn");
		const deleteBtn = document.getElementById("deleteBtn");
		
		modifyBtn.classList.add("d-none");
		deleteBtn.classList.add("d-none");
		
		const form = document.getElementById("noteUI");
		form.reset();
	}
	
	createNoteItem() {
		
		const noteData = new FormData(document.getElementById("noteUI"));
		const noteItem = new NoteItem();
		
		// Programming add
		let { id , title, body, edited } = noteItem;
		id = `note-${Date.now()}`;
		title = noteData.get("note_title");
		body = noteData.get("note_body");
		
		
		
		// UI add
		const noteUIItem = document.createElement("div");
		noteUIItem.classList.add("col-lg-3", "col-md-6", "col-sm-12", "mb-3", "card-container");
		noteUIItem.innerHTML = `
					<div class="card border-0 shadow-sm w-75 mx-auto" id=${id}>
						<div class="card-body">
							<h5 class="card-title">${title}</h5>
							<p class="card-text">${body}</p>
							<button type="button" class="btn btn-primary stretched-link bg-transparent border-0" data-bs-toggle="modal" data-bs-target="#modalNote"><i class="bi bi-pencil text-secondary"></i></button>
						</div>
					</div>
		
	`;
		noteUIItem.addEventListener("click", (e) => this.fetchExistingData({id, title, body, edited: true}));
		this.#modal = noteUIItem;
		document.getElementById("noteInterfaceBody").prepend(noteUIItem);
		document.getElementById("noteUI").reset();
		this.setNotes = {id, title, body, edited:true};
		alert("New note created!");
	}
	
	fetchExistingData(note) {
		const {title, body} = note;
		
		this.setTargetNote = note;
		
		const modal = document.getElementById("modalNote");
		
		modal.querySelector("#noteTitle").value = title;
		modal.querySelector("#noteBody").value = body;
		
		const modifyBtn = document.getElementById("modifyBtn");
		const deleteBtn = document.getElementById("deleteBtn");
		
		// deleteBtn.addEventListener("click", (e) => this.deleteNote(note));
		
		// Allow modify/delete options
		modifyBtn.classList.remove("d-none");
		deleteBtn.classList.remove("d-none");
		
		modifyBtn.addEventListener("click", () => this.modify(note))
		
		
		modal.querySelector(".modal-footer").appendChild(modifyBtn);
	}
	
	set setNotes(note) {
		this.#notes.push(note);
	}
	
	set setModal(content) {
		this.#modal.innerHTML = content;
	}
	
	get getNotes() {
		return this.#notes;
	}
	
	get getModal() {
		return this.#modal;
	}
	
	modify(note) {
		const correspondingCard = document.getElementById(note.id);
		note.title = new FormData(document.getElementById("noteUI")).get("note_title");
		note.body = new FormData(document.getElementById("noteUI")).get("note_body");
		
		correspondingCard.querySelector(".card-title").innerText = note.title;
		correspondingCard.querySelector(".card-text").innerText = note.body;
		
		alert("Note modified with success!");
		
	}
	
	deleteNote() {
		
		// To fixs
		const notes = this.getNotes;
		console.log(notes);
		const targetId = this.getTargetNote.id;
		
		const newNotes = notes.filter(note => note.id !== targetId);
		
		this.setNotes = newNotes;
		
		const elementToDelete = document.getElementById(targetId);
		elementToDelete.remove();
		
		// before delete any notes,
		// confirm user decision
		console.log(notes);
		alert("Delete with success!");
	}
	
	get getTargetNote() {
		return this.#targetNote;
	}
	
	set setTargetNote(note) {
		this.#targetNote = note;
	}
}

class NoteItem {
	constructor(id, title, body, edited) {
		this.id = id;
		this.title = title;
		this.body = body;
		this.edited = edited;
	}
}

const ui = new UI();
document.getElementById("editBtn").addEventListener("click", (e) => ui.createNoteItem());
document.getElementById("createNewNote").addEventListener("click", (e) => ui.hideBtns());
document.getElementById("deleteBtn").addEventListener("click", (e) => ui.deleteNote());