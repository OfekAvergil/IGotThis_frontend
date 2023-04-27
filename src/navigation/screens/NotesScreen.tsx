import * as React from "react";
import { observer } from "mobx-react";
import AddNoteDialog from "../../dialogs/AddNoteDialog";
import NotesList from '../../components/NotesList';
import ShowNoteDialog from '../../dialogs/ShowNoteDialog';


export default function NotesScreen() {
const ObservedNotesList = observer(NotesList)
const ObservedDialog = observer(AddNoteDialog)
const ObservedNote = observer(ShowNoteDialog)
  return (
    <>
      <ObservedNotesList/>
      <ObservedDialog/>
      <ObservedNote/>
    </>
  );
}
