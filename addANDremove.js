const container = document.querySelector(".AllNotes");
let notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];

function AddNote() {
    const note = document.createElement("div");
    note.classList.add("note");

    const textArea = document.createElement("textarea");
    textArea.placeholder = "Digite sua nota aqui :)";
    textArea.classList.add("textArea");
    textArea.maxLength = "750";
    textArea.addEventListener("input", function() {
        if (this.value.length >= 749) {
            alert("O texto está muito grande, recomendo que crie outra nota");
        }
    });
    const delBtn = document.createElement("button");
    delBtn.classList.add("delContainer")
    delBtn.innerText="Deletar";

    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Salvar";
    saveBtn.classList.add("btnSave");

    note.appendChild(textArea);
    note.appendChild(saveBtn);
    note.appendChild(delBtn);
    container.appendChild(note);

    saveBtn.addEventListener("click", function() {
        const text = textArea.value;
        notes.push({ text });
        localStorage.setItem("notes", JSON.stringify(notes));
        document.location.reload(true);


    });


}


function loadNotes() {
    container.innerHTML = "";
    notes.forEach(note => {
        const noteEl = document.createElement("div");
        noteEl.classList.add("note");

        const textArea = document.createElement("textarea");
        textArea.value = note.text;
        textArea.classList.add("textArea");
        textArea.maxLength = "750";

        const delBtn = document.createElement("button");
        delBtn.classList.add("delContainer")
        delBtn.innerText="Deletar";

        const saveBtn = document.createElement("button");
        saveBtn.classList.add("btnSave");
        saveBtn.innerText = "Salvar";
        noteEl.appendChild(textArea);
        noteEl.appendChild(saveBtn);
        noteEl.appendChild(delBtn);
        container.appendChild(noteEl);

        saveBtn.addEventListener("click", function() {
            note.text = textArea.value;
            localStorage.setItem("notes", JSON.stringify(notes));
            document.location.reload(true);
        });
    });
    
     function delNote(e) {
    if(e.target.classList.contains("delContainer")){
        const noteEl = e.target.parentNode;
        const noteIndex = Array.from(container.children).indexOf(noteEl);
        notes.splice(noteIndex, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        container.removeChild(noteEl);

    }
};

    document.addEventListener("DOMContentLoaded", function() {
     container.addEventListener("click", delNote);
     loadNotes();
    });

}

loadNotes();
