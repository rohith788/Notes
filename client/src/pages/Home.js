import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import NoteCard from "../components/card/card.component";
import Header from "../components/menubar/menubar.component";

import { AuthContext } from "../context/auth";
import { FETCH_NOTES_QUERY } from "../utils/graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_NOTES_QUERY);

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return loading ? (
    <h1> Notes loading</h1>
  ) : (
    <div className={classes.root}>
      <Grid container justify="center" alignitems="center">
        <Header />
      </Grid>
      <Grid container spacing={1}>
        {user &&
          data.getNotes &&
          data.getNotes.map((note) => {
            if (note.username === user.username) {
              return (
                <Grid item xs={4} key={note.id}>
                  <Paper className={classes.paper}>
                    <NoteCard
                      title={note.title}
                      noteText={note.body}
                      modelView={open}
                      noteId={note.id}
                    />
                  </Paper>
                </Grid>
              );
            }
          })}
      </Grid>
    </div>
  );
};

export default Home;
