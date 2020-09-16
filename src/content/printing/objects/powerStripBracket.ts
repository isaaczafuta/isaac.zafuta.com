import { ModelParameter } from "../components/Editor";

export const params: ModelParameter[] = [
  {
    name: "objectWidth",
    description: "Object Width (mm)",
    type: "number",
    default: 100,
    min: 0,
    max: 200,
  },
  {
    name: "objectHeight",
    description: "Object Height (mm)",
    type: "number",
    default: 37,
    min: 0,
    max: 200,
  },
  {
    name: "bracketWidth",
    description: "Material Width (mm)",
    type: "number",
    default: 10,
    min: 0,
    max: 200,
  },
  {
    name: "bracketThickness",
    description: "Material Height (mm)",
    type: "number",
    default: 4,
    min: 0,
    max: 20,
  },
  {
    name: "legLength",
    description: "Leg Length (mm)",
    type: "number",
    default: 20,
    min: 0,
    max: 50,
  },
  {
    name: "screwDiameter",
    description: "Screw Diameter (mm)",
    type: "number",
    default: 5,
    min: 1,
    max: 10,
  },
];

export const script = `
  function main(params) {
    const {
      objectWidth,
      objectHeight,
      screwDiameter,
      bracketWidth,
      bracketThickness,
      legLength,
    } = params;

    const totalWidth = objectWidth + 2 * bracketThickness + 2 * legLength;
    const screwOffset =
      objectWidth / 2 + bracketThickness + legLength / 2;

    function topProfile() {
      return difference(
        CAG.roundedRectangle({
          radius: [totalWidth / 2, bracketWidth / 2],
          roundradius: 2,
        }),
        CAG.circle({ center: [screwOffset, 0], radius: screwDiameter / 2 }),
        CAG.circle({ center: [-screwOffset, 0], radius: screwDiameter / 2 })
      );
    }

    function sideProfile() {
      return union(
        CAG.roundedRectangle({
          center: [0, objectHeight + bracketThickness / 2],
          radius: [objectWidth / 2 + bracketThickness, bracketThickness / 2],
          roundradius: 2,
        }),
        CAG.roundedRectangle({
          center: [
            objectWidth / 2 + bracketThickness / 2,
            (objectHeight + bracketThickness) / 2,
          ],
          radius: [bracketThickness / 2, objectHeight / 2 + bracketThickness / 2],
          roundradius: 2,
        }),
        CAG.roundedRectangle({
          center: [
            -objectWidth / 2 - bracketThickness / 2,
            (objectHeight + bracketThickness) / 2,
          ],
          radius: [bracketThickness / 2, objectHeight / 2 + bracketThickness / 2],
          roundradius: 2,
        }),
        CAG.roundedRectangle({
          center: [
            objectWidth / 2 + legLength / 2 + bracketThickness / 2,
            bracketThickness / 2,
          ],
          radius: [legLength / 2 + bracketThickness / 2, bracketThickness / 2],
          roundradius: 2,
        }),
        CAG.roundedRectangle({
          center: [
            -(objectWidth / 2 + legLength / 2 + bracketThickness / 2),
            bracketThickness / 2,
          ],
          radius: [legLength / 2 + bracketThickness / 2, bracketThickness / 2],
          roundradius: 2,
        })
      );
    }

    const verticalExtrusion = linear_extrude(
      { height: bracketThickness + objectHeight },
      topProfile()
    );
    const horizontalExtrusion = linear_extrude(
      { height: bracketWidth },
      sideProfile().expand(2, 50).contract(2, 50)
    )
      .rotateX(90)
      .translate([0, bracketWidth / 2, 0]);

    return intersection(verticalExtrusion, horizontalExtrusion);
  }
`;
