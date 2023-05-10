import * as React from "react";
import { observer } from "mobx-react";
import AddNoteDialog from "../../dialogs/AddNoteDialog";
import NotesList from '../../components/NotesList';
import ShowNoteDialog from '../../dialogs/ShowNoteDialog';
import EditNoteDialog from '../../dialogs/EditNoteDialog';


export default function NotesScreen() {
const ObservedNotesList = observer(NotesList)
const ObservedDialog = observer(AddNoteDialog)
const ObservedNote = observer(ShowNoteDialog)
const ObservedEditDialog = observer(EditNoteDialog)
  return (
    <>
      <ObservedNotesList/>
      <ObservedDialog/>
      <ObservedNote/>
      <ObservedEditDialog/>
    </>
  );
}
