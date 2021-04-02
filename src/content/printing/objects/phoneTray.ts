// @ts-ignore
import * as scadApi from "@jscad/scad-api";

import { ModelParameter, JSCadMain } from "../components/Editor";

const { CAG } = scadApi.csg;

const cameraCutoutRim = 3.5;

export const params: ModelParameter[] = [
  {
    name: "phoneWidth",
    description: "Phone Width (mm)",
    type: "number",
    default: 149,
    min: 30,
    max: 200,
  },
  {
    name: "phoneHeight",
    description: "Phone Height (mm)",
    type: "number",
    default: 73,
    min: 30,
    max: 200,
  },
  {
    name: "materialThickness",
    description: "Material Thickness (mm)",
    type: "number",
    default: 2.5,
    min: 1,
    max: 6,
  },
  {
    name: "rimDepth",
    description: "Rim Depth (mm)",
    type: "number",
    default: 2.5,
    min: 1,
    max: 10,
  },
];

const phoneTray = (
  width: number,
  height: number,
  materialThickness: number,
  rimDepth: number
) => {
  const totalHeight = materialThickness + rimDepth;

  const center = [0, 0];

  const roundRadius = 10;
  const outerRadius = [
    width / 2 + materialThickness,
    height / 2 + materialThickness,
  ];
  const phoneOuter = CAG.roundedRectangle({
    center,
    radius: outerRadius,
    roundradius: roundRadius + materialThickness,
  }).extrude({ offset: [0, 0, totalHeight] });

  const innerRadius = [width / 2, height / 2];
  const phoneKnockout = CAG.roundedRectangle({
    center,
    radius: innerRadius,
    roundradius: roundRadius,
  })
    .extrude({ offset: [0, 0, rimDepth] })
    .translate([0, 0, materialThickness]);

  const knockoutRadius = [
    width / 4 - cameraCutoutRim / 2,
    height / 4 - cameraCutoutRim / 2,
  ];
  const cameraKnockout = CAG.roundedRectangle({
    center: [
      -width / 4 + cameraCutoutRim / 2,
      height / 4 - cameraCutoutRim / 2,
    ],
    radius: knockoutRadius,
    roundradius: roundRadius - cameraCutoutRim,
  })
    .extrude({ offset: [0, 0, rimDepth] })
    .translate([0, 0, 0]);
  return phoneOuter.subtract(phoneKnockout).subtract(cameraKnockout);
};

export const main: JSCadMain = (params: any) => {
  const { phoneWidth, phoneHeight, materialThickness, rimDepth } = params;
  return phoneTray(phoneWidth, phoneHeight, materialThickness, rimDepth);
};
