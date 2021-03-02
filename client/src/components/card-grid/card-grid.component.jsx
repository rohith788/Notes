import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import NoteCard from "../card/card.component";
import NoteInputCard from "../note-input-card/note-input-card.component";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function CardGrid() {
  const [title, setTitle] = useState([]);
  const [note, setNote] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClose, true);
    return () => {
      document.removeEventListener("click", handleClose, true);
    };
  }); //adding listner on mount for clicks

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let noteObj = {};
    let titles = [];

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignitems="center">
        <NoteInputCard />
      </Grid>
      <Grid container spacing={1}>
        {title.map((t) => {
          return (
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <NoteCard title={t} noteText={note[t]} modelView={open} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
