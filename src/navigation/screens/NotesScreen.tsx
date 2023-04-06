import * as React from 'react';
import { Button } from 'react-native';
import { Text } from 'react-native-paper';
import notesStore from "../../stores/notesStore";
import { observer } from "mobx-react";
import AddNoteDialog from "../../dialogs/AddNoteDialog";
import NotesItems from '../../components/NotesList';

export default function NotesScreen() {

const ObservedNotesList = observer(NotesItems)
const ObservedDialog = observer(AddNoteDialog)
  return (
    <>
      <Text>Notes List</Text>
      <ObservedNotesList/>
      <ObservedDialog/>
      <Button title="Open form dialog " onPress={() => notesStore.setVisible(true)}/>
    </>
  );
}
;
