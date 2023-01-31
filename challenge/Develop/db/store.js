//methods in 
const util = require('util');
const fs = require('fs');
const uuid= require('uuid/v1');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


class Store{
    read(){
        return readFile('db/db.json', 'utf-8')
    }

    write(note){
        return writeFile('db/db.json', JSON.stringify(note))
    }

    getNotes(){
        return this.read().then((note)) => {
            let parsedNotes;

            try{
                parsedNotes = [].concat(JSON.parse(notes))
            } catch (err){
                parsedNotes = [];
            }
            return parsedNotes;

        }
    }

    addNote(note){
        const{ title , text } =note;
        if(!title || !text) {
            throw new Error('Title and Text can not be blank');
        }

        const newNote = { title, text, id: uuid()};
        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updateNotes) => this.write(updateNotes))
        .then(()=> newNote);

    }

    removeNote(id){
        return this.getNotes()
        .then() => notes.filter((note=> note.id !=id ))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}
module.exports = new Store();