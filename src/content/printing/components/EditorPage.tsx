import React from "react";
import { makeStyles } from "@material-ui/core";

import { Navigation, Page } from "../../../layout";
import { Editor, ModelParameter } from "./Editor";

interface Props {
  title: string;
  script: string;
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

export const EditorPage: React.FC<Props> = ({ title, script, params }) => {
  const classes = useStyles();
  return (
    <Page title={title}>
      <div className={classes.wrapper}>
        <div className={classes.navigationWrapper}>
          <Navigation title={title} />
        </div>
        <div className={classes.body}>
          <Editor script={script} modelParameters={params} />
        </div>
      </div>
    </Page>
  );
};
