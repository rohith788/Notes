import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import ModalCard from "../modal-card/modal-card.components";
import { FETCH_NOTES_QUERY } from "../../utils/graphql";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 0,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  closeButton: {
    position: "absolute",
  },
});

export default function NoteCard({ title, noteText, noteId }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const stopPropagation = (e) => {
    e.stopPropagation();
    deleteNote();
  };

  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION, {
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_NOTES_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_NOTES_QUERY,
        data: { getNotes: data.getNotes.filter((note) => note.id !== noteId) },
      });
    },
    variables: {
      noteId,
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card
        className={classes.root}
        variant="outlined"
        onClick={handleClickOpen}
      >
        <CardContent>
          <Typography variant={"h6"} gutterBottom>
            <b>{title}</b>
          </Typography>
          <Typography variant="h6" component={"span"}>
            {noteText}
          </Typography>
          <DeleteIcon className={classes.icon} onClick={stopPropagation} />
        </CardContent>
        <div>
          <ModalCard openStatus={open} noteTitle={title} noteText={noteText} />
        </div>
      </Card>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={"sm"}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{noteText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
          <DeleteIcon className={classes.icon} onClick={handleClose} />
        </DialogActions>
      </Dialog>
    </div>
  );
}

const DELETE_NOTE_MUTATION = gql`
  mutation deleteNote($noteId: ID!) {
    deleteNote(noteId: $noteId)
  }
`;
