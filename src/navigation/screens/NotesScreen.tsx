import * as React from 'react';
import { observer } from "mobx-react";
import AddNoteDialog from "../../dialogs/AddNoteDialog";
import NotesList from '../../components/NotesList';


export default function NotesScreen() {
const ObservedNotesList = observer(NotesList)
const ObservedDialog = observer(AddNoteDialog)
  return (
    <>
      <ObservedNotesList/>
      <ObservedDialog/>
    </>
  );
}
;
