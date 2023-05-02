//import NoteUI from "./UI.js";

/** Class representing a note **/
/** Parameters: id, title, body (number, string, string)**/

class NoteItem {
	constructor(id, title, body) {
		this.id = id;
		this.title;
		this.body = body;
	}
	
	// Fill the note (or modify it)
	edit() {
		// Fetch data from the modal
		// and send them to the current note
		const noteData = new FormData(document.getElementById("noteUI"));
		console.log(noteData);
	}
	
	del() {
		
	}
}

export class NoteItem;