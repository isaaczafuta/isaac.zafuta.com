// @ts-ignore
import * as scadApi from "@jscad/scad-api";

const { CAG } = scadApi.csg;

interface PhoneTrayOptions {
  backplateThickness: number;
}

const phoneTray = (options: PhoneTrayOptions) => {
  const { backplateThickness } = options;

  const width = 149;
  const height = 73;
  const rimThickness = 2.5;
  const rimDepth = 3;
  const cameraKnockoutDepth = 3;
  const cameraCutoutRim = 3;
  const cameraCutoutWidth = 33;
  const cameraCutoutHeight = 30;

  const totalHeight = backplateThickness + rimDepth;

  const center = [0, 0];

  const roundRadius = 10;
  const outerRadius = [width / 2 + rimThickness, height / 2 + rimThickness];
  const phoneOuter = CAG.roundedRectangle({
    center,
    radius: outerRadius,
    roundradius: roundRadius + rimThickness,
  }).extrude({ offset: [0, 0, totalHeight] });

  const innerRadius = [width / 2, height / 2];
  const phoneKnockout = CAG.roundedRectangle({
    center,
    radius: innerRadius,
    roundradius: roundRadius,
  })
    .extrude({ offset: [0, 0, rimDepth] })
    .translate([0, 0, backplateThickness]);

  const knockoutRadius = [cameraCutoutWidth / 2, cameraCutoutHeight / 2];
  const cameraKnockout = CAG.roundedRectangle({
    center: [
      -width / 2 + cameraCutoutWidth / 2 + cameraCutoutRim,
      height / 2 - cameraCutoutHeight / 2 - cameraCutoutRim,
    ],
    radius: knockoutRadius,
    roundradius: roundRadius - cameraCutoutRim,
  })
    .extrude({ offset: [0, 0, cameraKnockoutDepth] })
    .translate([0, 0, backplateThickness - cameraKnockoutDepth]);
  return phoneOuter.subtract(phoneKnockout).subtract(cameraKnockout);
};

export { phoneTray };
