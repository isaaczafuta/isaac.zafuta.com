import { Slider, Typography } from "@material-ui/core";
import React from "react";

import { ModelParameter } from "./Editor";

type CurrentValues = { [key: string]: any };

interface Props {
  modelParameters: ModelParameter[];
  currentValues: CurrentValues;
  onValuesChanged: (values: CurrentValues) => void;
}

const renderModelParameter = (
  modelParameter: ModelParameter,
  currentValues: CurrentValues,
  onValuesChanged: (values: CurrentValues) => void
): React.ReactNode => {
  switch (modelParameter.type) {
    case "number":
      return (
        <NumberControl
          key={modelParameter.name}
          description={modelParameter.description}
          min={modelParameter.min}
          max={modelParameter.max}
          value={currentValues[modelParameter.name]}
          onChange={(value) =>
            onValuesChanged({
              ...currentValues,
              [modelParameter.name]: value,
            })
          }
        />
      );
  }
};

export const Controls: React.FC<Props> = ({
  modelParameters,
  currentValues,
  onValuesChanged,
}) => {
  return (
    <div>
      {modelParameters.map((modelParameter) =>
        renderModelParameter(modelParameter, currentValues, onValuesChanged)
      )}
    </div>
  );
};

interface NumberControlProps {
  description: string;
  min: number;
  max: number;
  value: number;
  onChange(value: number): void;
}

const NumberControl: React.FC<NumberControlProps> = ({
  description,
  min,
  max,
  value,
  onChange,
}) => (
  <>
    <Typography gutterBottom>{`${description}: ${value.toFixed(
      1
    )}`}</Typography>
    <Slider
      value={value}
      min={min}
      max={max}
      onChange={(e, value) => onChange(value as number)}
    />
  </>
);
