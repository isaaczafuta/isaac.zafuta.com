import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { saveAs } from "file-saver";

import { Controls } from "./Controls";

import { Viewer } from "./Viewer";
import { generateSTL } from "./utils";

interface NumericModelParameter {
  name: string;
  description: string;
  type: "number";
  min: number;
  max: number;
  default: number;
}

export type ModelParameter = NumericModelParameter;

interface Props {
  script: string;
  modelParameters: ModelParameter[];
}

const useStyles = makeStyles((theme) => ({
  expand: {
    display: "flex",
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },

  controls: {
    position: "absolute",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    left: theme.spacing(1),
    bottom: theme.spacing(1),
  },
}));

const downloadModel = async (script: string, params: object) => {
  const stlBlob = await generateSTL(script, params);
  saveAs(stlBlob, "thing.stl");
};

export const Editor: React.FC<Props> = ({ script, modelParameters }) => {
  const classes = useStyles();

  const [params, setParams] = useState(() =>
    Object.fromEntries(
      modelParameters.map((param) => [param.name, param.default])
    )
  );

  return (
    <div className={classes.expand}>
      <Viewer script={script} params={params} />
      <div className={classes.controls}>
        <Controls
          modelParameters={modelParameters}
          currentValues={params}
          onValuesChanged={setParams}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => downloadModel(script, params)}
        >
          Export STL File
        </Button>
      </div>
    </div>
  );
};
