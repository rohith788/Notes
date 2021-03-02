import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import NoteInputCard from "../note-input-card/note-input-card.component";
import { AuthContext } from "../../context/auth";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const { sections, title } = props;
  const { user, logout } = useContext(AuthContext);

  const LoginClick = () => {
    console.log(props.history);
    history.push("/login");
  };
  const RegisterClick = () => {
    history.push("/register");
  };
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Grid justify="space-between" container spacing={10}>
          <Grid item>
            <Typography
              component={"span"}
              //   component="h2"
              //   variant="h5"
              //   color="inherit"
              //   align="center"
              //   noWrap
              //   className={classes.toolbarTitle}
            >
              <NoteInputCard />
            </Typography>
          </Grid>

          {user ? (
            <Grid item>
              <Button variant="outlined" onClick={logout}>
                Logout
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Button variant="outlined" onClick={LoginClick}>
                Login
              </Button>
              <Button variant="outlined" onClick={RegisterClick}>
                Sign up
              </Button>
            </Grid>
          )}
        </Grid>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {/* {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))} */}
      </Toolbar>
    </React.Fragment>
  );
}
