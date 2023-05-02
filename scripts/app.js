// Create/Modify a note 
class UI {
	
	#notes = [];
	#modal;
	
	createNoteItem() {
		console.log("test");
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
	}
	
	fetchExistingData(note) {
		const {title, body} = note;
		
		const modal = document.getElementById("modalNote");
		
		modal.querySelector("#noteTitle").value = title;
		modal.querySelector("#noteBody").value = body;
		
		const modifyBtn = document.createElement("button");
		modifyBtn.setAttribute("type", "button");
		modifyBtn.setAttribute("class", "btn btn-success");
		modifyBtn.setAttribute("title", "Modify the note");
		modifyBtn.setAttribute("data-bs-dismiss", "modal");
		modifyBtn.innerHTML = `<i class="bi bi-pencil"></i>`;
		
		
		// Use this template to add the new modify button
		// Or toggle between CSS classes
		`
		<div class="modal-footer">
		<div class="form-check">
			<label class="form-check-label" for="addToArchives">Move to Archives</label>
			<input class="form-check-input ps-3" type="checkbox" value="" id="addToArchives">
		</div>
        <button type="submit" class="btn btn-primary" title="Edit the note" id="editBtn" data-bs-dismiss="modal"><i class="bi bi-pencil"></i></button>
        <button type="button" class="btn btn-danger" title="Delete the note" id="deleteBtn"><i class="bi bi-trash"></i></button>
      </div>
		`
		
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
		console.log(note.id);
		const correspondingCard = document.getElementById(note.id);
		note.title = new FormData(document.getElementById("noteUI")).get("note_title");
		note.body = new FormData(document.getElementById("noteUI")).get("note_body");
		
		correspondingCard.querySelector(".card-title").innerText = note.title;
		correspondingCard.querySelector(".card-text").innerText = note.body;
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