const container = document.querySelector(".AllNotes");
let notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];

function AddNote() {
  const note = document.createElement("div");
  note.classList.add("note");

  const textArea = document.createElement("textarea");
  textArea.placeholder = "Digite sua nota aqui :)";
  textArea.maxLength = 750;
  textArea.addEventListener("input", function() {
    if (this.value.length >= 749) {
      alert("O texto está muito grande, recomendo que crie outra nota");
    }
  });

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Salvar";
  saveBtn.classList.add("btnSave");

  const delBtn = document.createElement("button");
  delBtn.innerText = "Deletar";
  delBtn.classList.add("delContainer");

  note.appendChild(textArea);
  note.appendChild(saveBtn);
  note.appendChild(delBtn);
  container.appendChild(note);

  saveBtn.addEventListener("click", function() {
    const text = textArea.value.trim();
    if (text) {
      notes.push({ text });
      localStorage.setItem("notes", JSON.stringify(notes));
      loadNotes(); // Refresh notes without reloading page
    }
  });

  delBtn.addEventListener("click", function() {
    if (confirm("Tem certeza que deseja deletar esta nota?")) {
      const noteIndex = Array.from(container.children).indexOf(note);
      notes.splice(noteIndex, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      container.removeChild(note);
    }
  });
}

function deleteAllNotes() {
  if (notes.length === 0) {
    alert("Nenhuma nota para deletar!");
    return;
  }
  if (confirm("Tem certeza que deseja deletar todas as notas?")) {
    notes = [];
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  }
}

function loadNotes() {
  container.innerHTML = "";
  notes.forEach((note, index) => {
    const noteEl = document.createElement("div");
    noteEl.classList.add("note");

    const textArea = document.createElement("textarea");
    textArea.value = note.text;
    textArea.placeholder = "Digite sua nota aqui :)";
    textArea.maxLength = 750;

    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Salvar";
    saveBtn.classList.add("btnSave");

    const delBtn = document.createElement("button");
    delBtn.innerText = "Deletar";
    delBtn.classList.add("delContainer");

    noteEl.appendChild(textArea);
    noteEl.appendChild(saveBtn);
    noteEl.appendChild(delBtn);
    container.appendChild(noteEl);

    saveBtn.addEventListener("click", function() {
      const text = textArea.value.trim();
      if (text) {
        notes[index].text = text;
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
      }
    });

    delBtn.addEventListener("click", function() {
      if (confirm("Tem certeza que deseja deletar esta nota?")) {
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  loadNotes();
});
