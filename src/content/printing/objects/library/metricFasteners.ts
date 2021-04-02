// @ts-ignore
import * as scadApi from "@jscad/scad-api";
const { CAG, CSG } = scadApi.csg;

type MetricFastenerSize = "M4" | "M5" | "M6";

const hexNut = (size: MetricFastenerSize) => {
  const hexNutCornerRadii = {
    M4: 4,
    M5: 4.5,
    M6: 5.625,
  };
  const hexNutThicknesses = {
    M4: 3,
    M5: 4.55,
    M6: 5.05,
  };

  const hexagon = (outerRadius: number) => {
    return CAG.fromPoints(
      Array.from(Array(6).keys()).map((i) => [
        outerRadius * Math.sin((Math.PI / 180) * 60 * i),
        outerRadius * Math.cos((Math.PI / 180) * 60 * i),
      ])
    );
  };

  const thickness = hexNutThicknesses[size];

  return hexagon(hexNutCornerRadii[size])
    .extrude({ offset: [0, 0, thickness] })
    .translate([0, 0, -thickness / 2]);
};

const screwCylinder = (size: MetricFastenerSize, length: number) => {
  const screwCylinderRadii = {
    M4: 2,
    M5: 2.5,
    M6: 3,
  };
  return CSG.cylinder({
    start: [0, 0, 0],
    end: [0, length, 0],
    radius: screwCylinderRadii[size],
  });
};

export { hexNut, screwCylinder };
