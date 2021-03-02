import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ModalCard from "../modal-card/modal-card.components";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

export default function NoteCard({ title, noteText }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Card className={classes.root} variant="outlined" onClick={handleOpen}>
      <CardContent>
        <Typography variant={"h6"} gutterBottom>
          <b>{title}</b>
        </Typography>
        <Typography variant="h6" component={"span"}>
          {noteText}
        </Typography>
      </CardContent>
      <div>
        <ModalCard openStatus={open} noteTitle={title} noteText={noteText} />
      </div>
    </Card>
  );
}
