import { ModelParameter, JSCadMain } from "../components/Editor";

// @ts-ignore
import * as scadApi from "@jscad/scad-api";
const { difference, union } = scadApi.booleanOps;
const { linear_extrude } = scadApi.extrusions;
const { CAG } = scadApi.csg;

const { square } = scadApi.primitives2d;
const { rotate, translate } = scadApi.transformations;

export const params: ModelParameter[] = [];

export const main: JSCadMain = () => {
  const hingeSize = 15;
  const holeDiameter = 5;
  const backplateWidth = 19.5;
  const backplateDepth = 33;

  const bodyPiece = (() => {
    const backplateHeight = 3.5;

    const slotWidth = 10;
    const slotDepth = 19;
    const slotHeight = 3.5;
    const slotDepthDelta = 2.5;

    const backplate = (() => {
      return linear_extrude(
        { height: backplateHeight },
        square({ size: [backplateWidth, backplateDepth] })
      );
    })();

    const slot = (() => {
      return linear_extrude(
        { height: slotHeight },
        square({ size: [slotWidth, slotDepth] })
      );
    })();

    const hingeBox = (() => {
      return linear_extrude(
        { height: hingeSize },
        square({ size: [backplateWidth, hingeSize] })
      );
    })();

    const hole = (() => {
      const center = [0, 0];
      const radius = holeDiameter / 2;
      return linear_extrude(
        { height: backplateWidth + 1 },
        CAG.circle({ center, radius })
      );
    })();

    const translatedSlot = translate(
      [(backplateWidth - slotWidth) / 2, slotDepthDelta, backplateHeight],
      slot
    );
    const translatedHingeBox = translate([0, backplateDepth, 0], hingeBox);
    const transformedHole = translate(
      [-0.5, backplateDepth + hingeSize / 2, hingeSize / 2],
      rotate([0, 90, 0], hole)
    );

    return difference(
      union(backplate, translatedSlot, translatedHingeBox),
      transformedHole
    );
  })();

  const lipHeight = 39;
  const hingeHeight = (lipHeight - backplateWidth) / 2 - 0.25;

  const lidPiece = (() => {
    const innerLipDepth = 19;
    const outerLipDepth = 24;

    const lipThickness = 2;
    const lidThickness = 3.25;

    const hingeProjection = (hingeSize / 2) * (Math.sqrt(2) - 1);

    const bottom = square({
      size: [lidThickness + 2 * lipThickness, lipThickness],
    });
    const outerLip = square({
      size: [lipThickness, lipThickness + outerLipDepth],
    });
    const innerLip = square({
      size: [lipThickness, lipThickness + innerLipDepth],
    }).translate([lipThickness + lidThickness, 0]);

    const lips = linear_extrude(
      { height: lipHeight },
      union(bottom, outerLip, innerLip)
    );

    const hinge = linear_extrude(
      { height: hingeHeight },
      square({ size: [hingeSize + hingeProjection, hingeSize] })
    );

    const hinge1 = hinge.translate([-hingeSize - hingeProjection, 0, 0]);
    const hinge2 = hinge.translate([
      -hingeSize - hingeProjection,
      0,
      lipHeight - hingeHeight,
    ]);

    const hole = translate(
      [-hingeSize / 2 - hingeProjection, hingeSize / 2, -0.5],
      linear_extrude(
        { height: lipHeight + 1 },
        CAG.circle({ radius: holeDiameter / 2 })
      )
    );

    return difference(union(lips, hinge1, hinge2), hole);
  })();

  const pin = (() => {
    const slop = 0.5;
    const headHeight = 3;
    const headExtraDiameter = 3;
    const pinholeDiameter = 2;
    const protrusion = 3 * pinholeDiameter;

    return difference(
      union(
        linear_extrude(
          { height: headHeight },
          CAG.circle({ radius: (holeDiameter + headExtraDiameter) / 2 })
        ),
        linear_extrude(
          { height: lipHeight + headHeight + protrusion },
          CAG.circle({ radius: holeDiameter / 2 - slop })
        )
      ),
      translate(
        [0, holeDiameter / 2, headHeight + lipHeight + 1.5 * pinholeDiameter],
        rotate(
          [90, 0, 0],
          linear_extrude(
            { height: holeDiameter },
            CAG.circle({ radius: pinholeDiameter / 2 })
          )
        )
      )
    );
  })();

  const arrangedLidPiece = translate(
    [-hingeHeight, 70, 0],
    rotate([90, 0, 90], lidPiece)
  );
  const arrangedPin = translate(
    [backplateWidth / 2, backplateDepth + 1.5 * hingeSize, 0],
    pin
  );

  const completeHinge1 = translate(
    [30, -50, 0],
    union(bodyPiece, arrangedLidPiece, arrangedPin)
  );
  const completeHinge2 = translate(
    [-30, -50, 0],
    union(bodyPiece, arrangedLidPiece, arrangedPin)
  );

  return union(completeHinge1, completeHinge2);
};
