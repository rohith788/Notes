import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalCard({ openStatus, noteTitle, noteText }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    document.addEventListener("click", handleClose, true);
    return () => {
      document.removeEventListener("click", handleClose, true);
    };
  }); //adding listner on mount for clicks

  const handleClose = () => {
    openStatus = false;
  };

  const saveNote = () => {}; //save the card data to firestore

  return (
    <div style={modalStyle}>
      <Modal
        open={openStatus}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Card className={classes.root}>
          <div>
            <center>
              <TextField
                id="Title"
                label="Title"
                variant="outlined"
                value={noteTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
            </center>
          </div>
          <center>
            <div className="note_text">
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                label="input note here"
                variant="outlined"
                value={noteText}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={saveNote}>Update</Button>
            </div>
          </center>
        </Card>
      </Modal>
    </div>
  );
}
