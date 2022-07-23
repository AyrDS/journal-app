import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
      isSaving: false,
      msgSaved: '',
      notes: [],
      activeNote: null
   },
   reducers: {
      addNewEmptyNote: (state, action) => {
         state.notes.push(action.payload);
         state.isSaving = false;
      },

      setActiveNote: (state, action) => {
         state.activeNote = action.payload;
         state.msgSaved = '';
      },

      setNotes: (state, action) => {
         state.notes = action.payload;
      },

      setSaving: (state) => {
         state.isSaving = true;
         state.msgSaved = '';
      },

      updateNotes: (state, action) => {
         state.isSaving = false;
         state.notes = state.notes.map(note => {
            if (note.id === action.payload.id) {
               return action.payload;
            }

            return note;
         });

         state.msgSaved = `Nota actualizada correctamente`;

      },

      setPhotosToActiveNote: (state, action) => {
         state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
         state.isSaving = false;
      },

      deleteNoteById: (state, action) => {
         state.activeNote = null;
         state.notes = state.notes.filter(note => note.id !== action.payload);
      },

      savingNewNote: (state) => {
         state.isSaving = true;
      },

      clearNotesLogout: (state) => {
         state.isSaving = false;
         state.msgSaved = '';
         state.notes = [];
         state.activeNote = null;
      }
   },

});

export const {
   addNewEmptyNote,
   clearNotesLogout,
   deleteNoteById,
   savingNewNote,
   setActiveNote,
   setNotes,
   setPhotosToActiveNote,
   setSaving,
   updateNotes,
} = journalSlice.actions;