// @ts-ignore
import * as scadApi from "@jscad/scad-api";

const { CSG } = scadApi.csg;

const connectorPoint = [0, 0, 0];
const connectorPointWithGap = [-1, 0, 0];
const connectorAxis = [-1, 0, 0];
const connectorNormal = [0, 1, 0];

const ridges = (angles: number, outerRadius: number, ridgeRadius: number) => {
  return Array.from(Array(angles).keys()).map((angle) =>
    CSG.cylinder({
      start: [0, 0, 0],
      end: [0, 0, outerRadius * 0.8],
      radius: ridgeRadius,
      resolution: 8,
    }).rotateX((360 * angle) / angles)
  );
};

const male = (
  innerRadius: number,
  thickness: number,
  length: number,
  angles = 8,
  resolution = 72
) => {
  const outerRadius = innerRadius + thickness;
  const ridgeRadius = outerRadius / angles / 2;

  const outerCylinder = CSG.cylinder({
    start: [0, 0, 0],
    end: [length, 0, 0],
    radius: outerRadius,
    resolution,
  });

  let cylinderWithRidges = outerCylinder;
  ridges(angles, outerRadius, ridgeRadius).forEach((ridge) => {
    cylinderWithRidges = cylinderWithRidges.union(ridge);
  });

  const innerCylinder = CSG.cylinder({
    start: [-ridgeRadius, 0, 0],
    end: [length, 0, 0],
    radius: innerRadius,
    resolution,
  });

  const result = cylinderWithRidges.subtract(innerCylinder);

  result.properties.connector = new CSG.Connector(
    connectorPoint,
    connectorAxis,
    connectorNormal
  );

  return result;
};

const female = (
  innerRadius: number,
  thickness: number,
  length: number,
  leaveGap: boolean,
  angles = 8,
  resolution = 72
) => {
  const outerRadius = innerRadius + thickness;
  const ridgeRadius = outerRadius / angles / 2;

  const outerCylinder = CSG.cylinder({
    start: [0, 0, 0],
    end: [length, 0, 0],
    radius: outerRadius,
    resolution,
  });

  let cylinderWithRidges = outerCylinder;
  ridges(angles, outerRadius, ridgeRadius).forEach((ridge) => {
    cylinderWithRidges = cylinderWithRidges.subtract(ridge);
  });

  const innerCylinder = CSG.cylinder({
    start: [-ridgeRadius, 0, 0],
    end: [length, 0, 0],
    radius: innerRadius,
    resolution,
  });

  const result = cylinderWithRidges.subtract(innerCylinder);

  result.properties.connector = new CSG.Connector(
    leaveGap ? connectorPointWithGap : connectorPoint,
    connectorAxis,
    connectorNormal
  );

  return result;
};

export { male, female };
