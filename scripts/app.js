/********************************** CLASSES **********************************/
/** Represents the main class */
class App {

	#notes = [];
	#targetNote;

	/** @method hideBtns - Prevent user to modify/delete */
	hideBtns() {
		const modifyBtn = document.getElementById("modifyBtn");
		const deleteBtn = document.getElementById("deleteBtn");

		modifyBtn.classList.add("d-none");
		deleteBtn.classList.add("d-none");

		document.getElementById("noteEditor").reset();
	}

	showBtns() {
		const modifyBtn = document.getElementById("modifyBtn");
		const deleteBtn = document.getElementById("deleteBtn");

		modifyBtn.classList.remove("d-none");
		deleteBtn.classList.remove("d-none");

		// document.getElementById("noteEditor").reset();
	}

	/** @method createNoteItem - Add a new note on the board using data from #noteEditor */
	createNoteItem() {

		const noteData = new FormData(document.getElementById("noteEditor"));
		const noteItem = new NoteItem();
		let { id, title, body } = noteItem; // Better use simple object ?
		const noteContainer = document.createElement("div");
		noteContainer.classList.add("col", "note", "card-container");


		id = `note-${Date.now()}`;
		title = noteData.get("note_title");
		body = noteData.get("note_body");

		const UINote = new UiNote({ id, title, body });

		// UINote.id = id;
		// UINote.querySelector(".card-title").innerText = title;
		// UINote.querySelector(".card-text").innerText = body;
		// UINote.addEventListener("click", (e) => this.fetchExistingData({ id, title, body }));
		noteContainer.appendChild(UINote.html);



		document.getElementById("noteInterfaceBody").prepend(noteContainer);
		// document.getElementById("noteEditor").reset();
		this.setNotes = { id, title, body };

		this.showBtns();

		alert("New note created!");
	}

	/** @todo Nothing for this moment */
	// fetchExistingData(note) {
	// 	const { title, body } = note;
	// 	this.setTargetNote = note;
	// 	const modifyBtn = document.getElementById("modifyBtn");
	// 	const deleteBtn = document.getElementById("deleteBtn");

	// 	const modal = document.getElementById("modalNote");

	// 	modal.querySelector("#noteTitle").value = title;
	// 	modal.querySelector("#noteBody").value = body;

	// 	// Allow modify/delete options
	// 	// When user wants to an existing note
	// 	modifyBtn.classList.remove("d-none");
	// 	deleteBtn.classList.remove("d-none");
	// }

	/** @method modify - Modify a note using the #noteEditor */
	/** @todo Nothing for this moment */
	modify(note) {
		console.log("MODIFY");
		fetchExistingData()
		const noteEditorData = new FormData(document.getElementById("noteEditor"));
		const correspondingCard = document.getElementById(note.id);
		note.title = noteEditorData.get("note_title");
		note.body = noteEditorData.get("note_body");

		correspondingCard.querySelector(".card-title").innerText = note.title;
		correspondingCard.querySelector(".card-text").innerText = note.body;

		/** Update noteEditor data ? */
		// noteEditorData.append("note_title", note.title);
		// console.log(noteEditorData.get("note_title"));
		// noteEditorData.append("note_body", note.body);
		// console.log(noteEditorData.get("note_body"));

		alert("Note modified with success!");
	}

	deleteNote() {
		let notes = this.getNotes;
		const targetId = this.getTargetNote.id;
		const elementToDelete = document.getElementById(targetId);

		notes = notes.filter(note => note.id !== targetId);

		// Confirm user choice on deletion
		if (confirm("Are you sure to delete this note?")) {
			elementToDelete.remove();

			// Feature - Fix: Display the alert asynchronously 
			alert("Delete with success!");
		} else {
			alert("Deletion Cancelled!");
		}

	}

	get getTargetNote() {
		return this.#targetNote;
	}

	set setTargetNote(note) {
		this.#targetNote = note;
	}

	set setNotes(note) {
		this.#notes.push(note);
	}

	get getNotes() {
		return this.#notes;
	}
}

// Useful?
class NoteItem {
	constructor(id, title, body, edited) {
		this.id = id;
		this.title = title;
		this.body = body;
		this.edited = edited;
	}
}

/**
 * @class ModalFooter
 * 
 * Make the buttons from modal footer functional
 */
class ModalFooter {

	constructor(app) {

		document.getElementById("editBtn").addEventListener("click", (e) => app.createNoteItem());
		/** @todo to fix */
		document.getElementById("createNewNote").addEventListener("click", (e) => app.hideBtns());

		document.getElementById("modifyBtn").addEventListener("click", () => app.modify(app.getTargetNote))
		document.getElementById("deleteBtn").addEventListener("click", (e) => app.deleteNote());
	}
}



/**
 * @class FilterBar
 * 
 * Find one or more note(s)
 */
class FilterBar {

	constructor() {
		this.input = document.querySelector(".filterbar-input")
		this.filterBtn = document.getElementById("filterBtn");
		this.filterBtn.addEventListener("click", (e) => this.filter());
	}

	filter() {
		let title = this.input.value;
		const notes = document.querySelectorAll(".card");

		if (!title) {
			this.reinit();
			return;
		}

		// Upgrade: More adapted doesn't exist?
		notes.forEach(note => {
			const noteTitle = note.querySelector(".card-title").innerText;
			if (noteTitle.toLowerCase() === title.toLowerCase()) {
				note.classList.remove("d-none", "border-0");
				note.classList.add("border", "border-primary", "border-2");
			} else {
				note.classList.add("d-none");
			}
		});

		this.input.value = null;
	}

	reinit() {
		const notes = document.querySelectorAll(".card");
		notes.forEach(note => {
			note.classList.remove("d-none", "border", "border-primary", "border-2")
			note.classList.add("border-0");
		});
		this.input.value = null;
	}
}

/**
 * @class NoteUi
 * 
 * Represents a note on the UI
 */
class UiNote {

	/**
	 * @constructor
	 * @param {Object} data - {id: String, title: String, body: String}
	 */
	constructor(data) {
		this.data = data;
		this.html = document.getElementById("cardLayout").content.cloneNode(true).querySelector(".card");

		const { id, title, body } = this.data;

		this.html.id = id;
		this.html.querySelector(".card-title").innerText = title;
		this.html.querySelector(".card-text").innerText = body;

		// console.log(this.html);


		// this.html.addEventListener("click", this.fetchExistingData({ id, title, body }));
	}

	// fetchExistingData(note) {

	// 	// console.log("FETCH NOTE", note);

	// 	/** #noteEditor better than #modal? */
	// 	const { title, body } = note;
	// 	// this.setTargetNote = note; Useful?
	// 	const modifyBtn = document.getElementById("modifyBtn");
	// 	const deleteBtn = document.getElementById("deleteBtn");

	// 	const modal = document.getElementById("modalNote");

	// 	modal.querySelector("#noteTitle").value = title;
	// 	modal.querySelector("#noteBody").value = body;

	// 	// Allow modify/delete options
	// 	// When user wants to an existing note
	// 	modifyBtn.classList.remove("d-none");
	// 	deleteBtn.classList.remove("d-none");
	// }



	/* UINote.id = id;
		UINote.querySelector(".card-title").innerText = title;
		UINote.querySelector(".card-text").innerText = body;
		UINote.addEventListener("click", (e) => this.fetchExistingData({ id, title, body })); */
}


/********************************** MAIN **********************************/
const app = new App();
const modalButtons = new ModalFooter(app);
const filterBar = new FilterBar();
// const uiNotes = document.getElementById("noteInterfaceBody").querySelectorAll(".ui-note");

/** @todo Use a class instead! */
/**************************** FUNCTION ***************************/
// uiNotes.forEach(uiNote => uiNote.addEventListener("click", fetchExistingData));


function fetchExistingData() {

	console.log("FETCHING DATA");

	const { title, body } = note;
	const modifyBtn = document.getElementById("modifyBtn");
	const deleteBtn = document.getElementById("deleteBtn");

	const noteEditor = document.getElementById("noteEditor");

	noteEditor.querySelector("#noteTitle").value = title;
	noteEditor.querySelector("#noteBody").value = body;

	// Allow modify/delete options
	// When user wants to an existing note
	modifyBtn.classList.remove("d-none");
	deleteBtn.classList.remove("d-none");
}