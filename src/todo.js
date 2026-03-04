export class Project {
  static nextId = 1;

  constructor(title = "No title", dueDate = Date.now()) {
    this.id = Project.nextId++;
    this.title = title;
    this.dueDate = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(dueDate);
    this.isActive = false;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  getItemById(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (id == this.items[i].id) return this.items[i];
    }
  }
}

export class Item {
  static nextId = 1;

  constructor(title = "No title", description = "Nothing to see here...", dueDate = Date.now()) {
    this.id = Item.nextId++;
    this.title = title;
    this.description = description;
    this.dueDate = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(dueDate);
    this.notes = [];
  }

  addNote(note) {
    this.notes.push(note);
  }

  getNoteById(id) {
    for (let i = 0; i < this.notes.length; i++) {
      if (id == this.notes[i].id) return this.notes[i];
    }
  }
}

export class Note {
  static nextId = 1;

  constructor(content, insertionDate = Date.now()) {
    this.id = Note.nextId++;
    this.content = content;
    this.insertionDate = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(insertionDate);
  }
}
