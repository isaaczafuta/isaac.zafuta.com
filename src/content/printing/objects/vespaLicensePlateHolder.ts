import { ModelParameter } from "../components/Editor";

export const params: ModelParameter[] = [];

export const script = `
  function main() {
    const plateHoleDistanceX = 146;
    const plateHoleDistanceY = 70;

    const bodyHoleXOffset = 25;
    const bodyHoleYOffset = 33;

    const plateHoleDiameter = 7;
    const bodyMainHoleDiameter = 6;
    const bodyOffsetHoleDiameter = 5;

    const backingPlateThickness = 3;
    const postThickness = 3
    const postWallThickness = 4;

    // Backing Plate
    const backingPlate = (() => {
      const totalX =
        plateHoleDistanceX + plateHoleDiameter + 2 * postWallThickness;
      const totalY =
        plateHoleDistanceY + plateHoleDiameter + 2 * postWallThickness;
      const center = [0, 0];
      const radius = [totalX / 2, totalY / 2];
      const roundradius = plateHoleDiameter / 2 + postWallThickness;

      const profile = CAG.roundedRectangle({
        center,
        radius,
        roundradius,
      });
      return linear_extrude({ height: backingPlateThickness }, profile);
    })();

    // Posts
    const posts = (() => {
      return [
        [1, 1],
        [1, -1],
        [-1, -1],
        [-1, 1],
      ].map(([xFactor, yFactor]) => {
        const xCenter = xFactor * (plateHoleDistanceX / 2);
        const yCenter = yFactor * (plateHoleDistanceY / 2);
        const center = [xCenter, yCenter];
        const radius = plateHoleDiameter / 2 + postWallThickness;
        const height = backingPlateThickness + postThickness;
        return linear_extrude({ height }, CAG.circle({ center, radius }));
      });
    })();

    // Post Holes
    const postHoles = (() => {
      return [
        [1, 1],
        [1, -1],
        [-1, -1],
        [-1, 1],
      ].map(([xFactor, yFactor]) => {
        const xCenter = xFactor * (plateHoleDistanceX / 2);
        const yCenter = yFactor * (plateHoleDistanceY / 2);
        const center = [xCenter, yCenter];
        const radius = plateHoleDiameter / 2;
        const height = backingPlateThickness + postThickness;
        return linear_extrude({ height }, CAG.circle({ center, radius }));
      });
    })();

    // Main Body Hole
    const mainBodyHole = (() => {
      const height = backingPlateThickness;
      const center = [0, plateHoleDistanceY / 2];
      const radius = bodyMainHoleDiameter / 2;
      return linear_extrude({ height }, CAG.circle({ center, radius }));
    })();

    // Offset Holes;
    const offsetHoles = (() => {
      return [
        [-1, 0],
        [1, 0],
        [0, -1],
      ].map(([xFactor, yFactor]) => {
        const xCenter = xFactor * bodyHoleXOffset;
        const yCenter = plateHoleDistanceY / 2 + yFactor * bodyHoleYOffset;
        const center = [xCenter, yCenter];
        const radius = bodyOffsetHoleDiameter / 2;
        const height = backingPlateThickness;
        return linear_extrude({ height }, CAG.circle({ center, radius }));
      });
    })();

    return difference(
      union(backingPlate, ...posts),
      ...postHoles,
      mainBodyHole,
      ...offsetHoles
    );
  }
`;
