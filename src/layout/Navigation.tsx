import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

interface Props {
  title: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Navigation: React.FC<Props> = ({ title }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
