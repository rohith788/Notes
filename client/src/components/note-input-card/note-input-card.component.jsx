import React, { useState, useEffect, useRef } from "react";
import gql from "graphql-tag";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../utils/hooks";
import { FETCH_NOTES_QUERY } from "../../utils/graphql";

const useStyles = makeStyles({
  root: {
    // "& .MuiTextField-root": {
    //   width: "45ch",
    // },
    // "& .MuiInputBase-root": {
    //   width: "45ch",
    // },
    minWidth: 275,
    paddingBottom: 1,
    boxShadow: "none",
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
    marginBottom: 2,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
  },
});

export default function NoteInputCard() {
  const { values, onChange, onSubmit } = useForm(createNoteCallback, {
    title: "",
    body: "",
  });
  const [expanded, setExpanded] = useState(false); //expansion state of the card
  const ref = useRef(null); // reference to tag to expand and compress
  const classes = useStyles();

  const [createNote, { error }] = useMutation(CREATE_NOTE_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_NOTES_QUERY,
      });
      if (data) {
        data.getNotes = [result.data.createNote, ...data.getNotes];
      }
      proxy.writeQuery({ query: FETCH_NOTES_QUERY, data });
      console.log(proxy);
      values.body = "";
      values.title = "";
    },
  });

  function createNoteCallback() {
    createNote();
  } //save the card data

  useEffect(() => {
    document.addEventListener("click", compressCard, true);
    return () => {
      document.removeEventListener("click", compressCard, true);
    };
  }); //adding listner on mount for clicks

  const compressCard = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (expanded === true) {
        setExpanded(false);
      }
    }
  }; //compress Input card on outside click

  const expandCard = () => {
    setExpanded(true);
  }; // Express input card on click

  return (
    <Card className={classes.root} alignitems="center">
      <CardActions disableSpacing>
        <div
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={expandCard}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <TextField
            id="Title"
            label="Title"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="title"
            value={values.title}
            error={error ? true : false}
            onChange={onChange}
            autoFocus
          />
        </div>
      </CardActions>
      <div className="note_text" ref={ref}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {/* <center> */}
          <TextField
            multilinef="true"
            label="input note here"
            variant="outlined"
            rows={4}
            required
            fullWidth
            name="body"
            value={values.body}
            error={error ? true : false}
            onChange={onChange}
          />
          {/* </center> */}
          <Button onClick={onSubmit}>Add</Button>
        </Collapse>
      </div>
    </Card>
  );
}

const CREATE_NOTE_MUTATION = gql`
  mutation createNote($title: String!, $body: String!) {
    createNote(title: $title, body: $body) {
      id
      title
      body
      createdAt
      username
    }
  }
`;
