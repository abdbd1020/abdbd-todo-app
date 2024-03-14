import './App.css';
import { NoteTable } from './Note/NoteTable'; 
import { uid } from 'uid';
import { NoteForm } from './Note/NoteForm'; 
import { CButton } from '@coreui/react';
import React, { useState } from 'react';
const mockNotes = [
  {
    id: uid(),
    title: "Note 1",
    desc: "Note 1 description",
    priority: 5,
    status: "Pending",
    createdAt: "2024-03-12T05:19:29.533Z",
    updatedAt: "2024-03-12T05:19:29.533Z",
  },
  {
    id: uid(),
    title: "Note 1",
    desc: "Note 1 description",
    priority: 5,
    status: "Pending",
    createdAt: "2024-03-12T05:19:29.533Z",
    updatedAt: "2024-03-12T05:19:29.533Z",
  },
  {
    id: uid(),
    title: "Note 2",
    desc: "Note 2 description",
    priority: 3,
    status: "Pending",
    createdAt: "2024-03-12T05:19:29.533Z",
    updatedAt: "2024-03-12T05:19:29.533Z",
  },
  {
    id: uid(),
    title: "Note 3",
    desc: "Note 3 description",
    priority: 1,
    status: "Pending",
    createdAt: "2024-03-12T05:19:29.533Z",
    updatedAt: "2024-03-12T05:19:29.533Z",
  },
]

function App() {
  const [notes, setNotes] = useState(mockNotes);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', desc: '' });

const addNote = (note) => {
  setNotes([...notes, note]);
};

  const updateNote = (id) => {
    // TODO
    console.log(`Update note with id: ${id}`);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleAddNote = () => {
    // Logic to add a new note
    // For example, set a unique id for the note, then add it to the notes array
    const noteToAdd = { ...newNote, id: Date.now() }; // Simplified example
    setNotes([...notes, noteToAdd]);
    setIsModalVisible(false); // Close the modal
  };
  return (
    <div className="App">
      <NoteTable notes={notes} updateNote={updateNote} deleteNote={deleteNote} />
      <CButton color="primary" onClick={() => setIsModalVisible(true)}>Add Note</CButton>

    <NoteForm
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={addNote}
      />
    </div>
  );
}

export default App;
