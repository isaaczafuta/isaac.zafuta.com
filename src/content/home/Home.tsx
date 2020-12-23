import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Typography, useTheme } from "@material-ui/core";

import { Navigation, Page } from "../../layout";

const useItemStyles = makeStyles((theme) => ({
  item: { display: "flex", flexDirection: "row", margin: theme.spacing(1) },
  indicator: { width: theme.spacing(0.5), marginRight: theme.spacing(1) },
}));

interface ItemProps {
  label: string;
  color: string;
  link: string;
  linkType: "internal" | "external";
}

const Item: React.FC<ItemProps> = ({ label, color, link, linkType }) => {
  const classes = useItemStyles();

  return (
    <div className={classes.item}>
      <div className={classes.indicator} style={{ backgroundColor: color }} />
      {linkType === "internal" ? (
        <Typography component={Link} to={link} variant="body1">
          {label}
        </Typography>
      ) : (
        <Typography variant="body1">
          <a href={link}>{label}</a>
        </Typography>
      )}
    </div>
  );
};

const useStyles = makeStyles(() => ({
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
  items: {
    display: "flex",
    flexDirection: "column",
  },
}));

export const Home: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Page title="">
      <div className={classes.wrapper}>
        <div className={classes.navigationWrapper}>
          <Navigation title="Isaac Zafuta" />
        </div>
        <div className={classes.body}>
          <div className={classes.items}>
            <Item
              label="Isaac Zafuta"
              color={theme.palette.frostbite.main}
              link="/"
              linkType="internal"
            />
            <Item
              label="3D Printing"
              color={theme.palette.blueJeans.main}
              link="/printing"
              linkType="internal"
            />
            <Item
              label="Tux"
              color={theme.palette.amber.main}
              link="http://tux.cat?text=hi"
              linkType="external"
            />
          </div>
        </div>
      </div>
    </Page>
  );
};
