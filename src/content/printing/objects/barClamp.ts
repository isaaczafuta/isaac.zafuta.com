import { barClamp } from "./library/barClamp";

import { ModelParameter, JSCadMain } from "../components/Editor";

export const params: ModelParameter[] = [
  {
    name: "barRadius",
    description: "Bar Radius (mm)",
    type: "number",
    default: 31.8 / 2,
    min: 10,
    max: 100,
  },
  {
    name: "materialThickness",
    description: "Clamp Material Thickness (mm)",
    type: "number",
    default: 3,
    min: 2,
    max: 10,
  },
  {
    name: "width",
    description: "Clamp Width (mm)",
    type: "number",
    default: 12,
    min: 12,
    max: 100,
  },
  {
    name: "gap",
    description: "Clamp Gap (mm)",
    type: "number",
    default: 3,
    min: 2,
    max: 6,
  },
  {
    name: "flangeLength",
    description: "Connector Flange Length (mm)",
    type: "number",
    default: 0,
    min: 0,
    max: 100,
  },
];

export const main: JSCadMain = (params: any) => {
  return barClamp(params);
};
