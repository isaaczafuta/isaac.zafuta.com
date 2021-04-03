import { ModelParameter, JSCadMain } from "../components/Editor";

import { phoneTray } from "./library/phoneTray";
import { barClamp } from "./library/barClamp";

export const params: ModelParameter[] = [];

export const main: JSCadMain = (params: any) => {
  const barRadius = 31.8 / 2;
  const backplateThickness = 14;
  const flangeLength = 70;

  const tray = phoneTray({
    backplateThickness,
  });

  const clampMaterialThickness = 3;
  const clampWidth = 10;

  // punch out holes for both clamps, leaving some slop
  const clampHoleMaterialThickness = clampMaterialThickness + 2;
  const clampHoleWidth = clampWidth + 2;
  const clampHole = barClamp({
    barRadius,
    materialThickness: clampHoleMaterialThickness,
    width: clampHoleWidth,
    gap: 3,
    flangeLength,
  });

  const leftClampHole = clampHole
    .rotateZ(90)
    .rotateX(-90)
    .translate([-40, -70, backplateThickness / 2]);

  const rightClampHole = clampHole
    .rotateZ(90)
    .rotateX(-90)
    .translate([40, -70, backplateThickness / 2]);

  const trayWithHoles = tray.subtract(leftClampHole).subtract(rightClampHole);

  const clamp = barClamp({
    barRadius,
    materialThickness: clampMaterialThickness,
    width: clampWidth,
    gap: 3,
    flangeLength,
  });

  const leftClamp = clamp.rotateX(-90).translate([-100, 0, clampWidth / 2]);
  const rightClamp = clamp.rotateX(-90).translate([100, 0, clampWidth / 2]);

  return [trayWithHoles, leftClamp, rightClamp];
};
