// @ts-ignore
import * as scadApi from "@jscad/scad-api";
import { hexNut, screwCylinder } from "./metricFasteners";

const { CSG } = scadApi.csg;

interface BarClampOptions {
  barRadius: number;
  materialThickness: number;
  width: number;
  gap: number;
  flangeLength: number;
}

const barClamp = (options: BarClampOptions) => {
  const { barRadius, materialThickness, width, gap, flangeLength } = options;

  const outerRadius = barRadius + materialThickness;

  const clampOuter = CSG.cylinder({
    start: [0, -width / 2, 0],
    end: [0, width / 2, 0],
    radius: outerRadius,
  });

  const clampInner = CSG.cylinder({
    start: [0, -width / 2, 0],
    end: [0, width / 2, 0],
    radius: barRadius,
  });

  const screwFlangeRadius = 6;

  const holeZ = -outerRadius - screwFlangeRadius;
  const screwFlangeWidth = 2 * materialThickness + gap;
  const screwFlange = CSG.cylinder({
    start: [-screwFlangeWidth / 2, 0, holeZ],
    end: [screwFlangeWidth / 2, 0, holeZ],
    radius: screwFlangeRadius,
  });

  const screwHole = screwCylinder("M4", screwFlangeWidth)
    .rotateZ(90)
    .translate([screwFlangeWidth / 2, 0, holeZ]);

  const screwFlangeJoiner = CSG.cube({
    center: [
      0,
      0,
      -screwFlangeRadius / 2 - outerRadius + materialThickness / 2,
    ],
    radius: [
      screwFlangeWidth / 2,
      screwFlangeRadius,
      screwFlangeRadius / 2 + materialThickness / 2,
    ],
  });

  const dividerHeight = outerRadius / 2 + screwFlangeRadius;

  const divider = CSG.cube({
    center: [0, 0, -dividerHeight],
    radius: [gap / 2, width / 2, dividerHeight],
  });

  const nut = hexNut("M4")
    .rotateY(90)
    .translate([-gap - 2, 0, holeZ]);

  let result = clampOuter
    .union(screwFlange)
    .union(screwFlangeJoiner)
    .subtract(screwHole)
    .subtract(clampInner)
    .subtract(divider)
    .subtract(nut);

  if (flangeLength > 0) {
    const connectorFlange = CSG.cube({
      center: [0, 0, barRadius + materialThickness / 2 + flangeLength / 2],
      radius: [
        materialThickness / 2,
        width / 2,
        flangeLength / 2 + materialThickness / 2,
      ],
    });
    result = result.union(connectorFlange);
  }

  result.properties.connector = new CSG.Connector(
    [0, 0, outerRadius + flangeLength],
    [1, 0, 0],
    [0, 0, 1]
  );

  return result;
};

export { barClamp };
