import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextareaAutosize } from "@mui/material";
import notesStore from "../stores/notesStore";
import { observer } from "mobx-react";

function AddNoteDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
  <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            add note
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Header"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextareaAutosize
            autoFocus
            id="content"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=> {
            notesStore.addNote("hey");
            handleClose();
          }}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default AddNoteDialog;