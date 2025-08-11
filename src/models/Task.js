import { parseDate, formatDate } from "../utils/dateUtils";

export default class Task {
  constructor({id=`task-${crypto.randomUUID()}`, title, due=null, notes=[], done=false, priority='normal'}) {
    if (!title) {
      throw new Error('Title is required');
    }
    this.id = id;
    this.title = title;
    this.due = (typeof due === 'string' && due.trim())
      ? parseDate(due)
      : null;
    this.notes = Array.isArray(notes) ? notes : [];
    this.done = Boolean(done);
    this.priority = priority;
  }

  formatTask() {
    return {
      id: this.id,
      title: this.title,
      due: formatDate(this.due),
      notes: this.notes,
      done: this.done,
      priority: this.priority
    };
  }

  toggleDone() {
    this.done = !this.done;
  }

  addNote(note) {
    this.notes.push(note);
  }

  removeNote(note) {
    this.notes = this.notes.filter(n => n !== note);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      due: this.due instanceof Date && !isNaN(this.due.getTime())
        ? this.due.toISOString().slice(0, 10)
        : null,
      notes: this.notes,
      done: this.done,
      priority: this.priority
    };
  }
}