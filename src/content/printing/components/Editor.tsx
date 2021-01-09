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

export interface JSCadMain {
  (params: any): any;
}

interface Props {
  main: JSCadMain;
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

const downloadModel = async (main: JSCadMain, params: object) => {
  const stlBlob = await generateSTL(main, params);
  saveAs(stlBlob, "thing.stl");
};

export const Editor: React.FC<Props> = ({ main, modelParameters }) => {
  const classes = useStyles();

  const [params, setParams] = useState(() =>
    Object.fromEntries(
      modelParameters.map((param) => [param.name, param.default])
    )
  );

  return (
    <div className={classes.expand}>
      <Viewer main={main} params={params} />
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
          onClick={() => downloadModel(main, params)}
        >
          Export STL File
        </Button>
      </div>
    </div>
  );
};
