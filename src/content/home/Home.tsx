import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";

import { Navigation, Page } from "../../layout";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  navigationWrapper: {},
  body: {
    marginTop: 0,
    flex: 1,
    display: "flex",
    overflow: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {},
  item: { display: "flex", flexDirection: "row", margin: theme.spacing(1) },
  primaryIndicator: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },

  label: {},
}));

export const Home: React.FC = () => {
  const classes = useStyles();
  return (
    <Page title="Isaac Zafuta">
      <div className={classes.wrapper}>
        <div className={classes.navigationWrapper}>
          <Navigation title="Isaac Zafuta" />
        </div>
        <div className={classes.body}>
          <div className={classes.info}>
            <div className={classes.item}>
              <div className={classes.primaryIndicator}></div>
              <Typography
                color="inherit"
                component={Link}
                to="/printing"
                variant="body1"
                className={classes.label}
              >
                3D Printing
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
