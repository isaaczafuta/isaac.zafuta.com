import React from "react";
import { makeStyles } from "@material-ui/core";

import { Navigation, Page } from "../../../layout";
import { Editor, JSCadMain, ModelParameter } from "./Editor";

interface Props {
  title: string;
  main: JSCadMain;
  params: ModelParameter[];
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  navigationWrapper: { zIndex: 1 },
  body: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
  },
}));

export const EditorPage: React.FC<Props> = ({ title, main, params }) => {
  const classes = useStyles();
  return (
    <Page title={title}>
      <div className={classes.wrapper}>
        <div className={classes.navigationWrapper}>
          <Navigation title={title} />
        </div>
        <div className={classes.body}>
          <Editor main={main} modelParameters={params} />
        </div>
      </div>
    </Page>
  );
};
