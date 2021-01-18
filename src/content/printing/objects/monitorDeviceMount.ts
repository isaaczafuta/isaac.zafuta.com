import { ModelParameter, JSCadMain } from "../components/Editor";

// @ts-ignore
import * as scadApi from "@jscad/scad-api";
const { difference, union } = scadApi.booleanOps;
const { linear_extrude } = scadApi.extrusions;

const { polygon } = scadApi.primitives2d;
const { cube, cylinder } = scadApi.primitives3d;
const { rotate, translate } = scadApi.transformations;

export const params: ModelParameter[] = [];

const backOutline = (
  materialThickness: number,
  bottomDepth: number,
  slotOverhang: number
) => {
  const backInnerHeight = 13;

  return polygon([
    [0, 0],
    [0, 2 * materialThickness + backInnerHeight],
    [slotOverhang + materialThickness, 2 * materialThickness + backInnerHeight],
    [slotOverhang + materialThickness, materialThickness + backInnerHeight],
    [materialThickness, materialThickness + backInnerHeight],
    [materialThickness, materialThickness],
    [materialThickness + bottomDepth, materialThickness],
    [materialThickness + bottomDepth, 0],
  ]);
};

const back = (
  frontHeight: number,
  frontMaterialThickness: number,
  slotOverhang: number,
  slotExtraMaterial: number
) => {
  const bottomDepth = 10;

  const outlineHeight = frontHeight + slotExtraMaterial;
  const backMaterialThickness = frontMaterialThickness + slotExtraMaterial;

  const body = linear_extrude(
    { height: outlineHeight },
    backOutline(backMaterialThickness, bottomDepth, slotOverhang)
  );
  const slot = cube([
    bottomDepth,
    frontMaterialThickness,
    frontHeight,
  ]).translate([
    backMaterialThickness,
    slotExtraMaterial / 2,
    slotExtraMaterial / 2,
  ]);
  const screwHole = cylinder({
    start: [0, backMaterialThickness / 2, outlineHeight / 2],
    end: [
      backMaterialThickness + bottomDepth,
      backMaterialThickness / 2,
      outlineHeight / 2,
    ],
    r: 2,
  });
  return difference(body, screwHole, slot);
};

const frontOutline = (
  frontMaterialThickness: number,
  sliderDepth: number,
  frontDrop: number,
  frontDepth: number
) => {
  const frontHeight = 21;
  const gripperHeight = 1.5;
  const gripperDepth = 3;
  const gripperThickness = 1.5;

  return polygon([
    [0, 0],
    [0, frontMaterialThickness],
    [sliderDepth, frontMaterialThickness],
    [sliderDepth, frontMaterialThickness + frontHeight],
    [
      sliderDepth - gripperDepth,
      frontMaterialThickness + frontHeight + gripperHeight,
    ],
    [
      sliderDepth - gripperDepth,
      frontMaterialThickness + frontHeight + gripperHeight + gripperThickness,
    ],
    [
      sliderDepth + frontMaterialThickness,
      frontMaterialThickness + frontHeight + gripperHeight + gripperThickness,
    ],
    [
      sliderDepth + frontMaterialThickness,
      frontMaterialThickness + frontHeight + gripperHeight,
    ],
    [sliderDepth + frontMaterialThickness, -frontDrop],
    [sliderDepth + frontMaterialThickness + frontDepth, -frontDrop],
    [
      sliderDepth + frontMaterialThickness + frontDepth,
      -frontDrop - frontMaterialThickness,
    ],
    [sliderDepth, -frontDrop - frontMaterialThickness],
    [sliderDepth, 0],
  ]);
};

const front = (
  frontHeight: number,
  frontMaterialThickness: number,
  frontSlotExtraMaterial: number
) => {
  const sliderDepth = 45;

  const slotDepth = 4;

  const frontDrop = 45;
  const frontDepth = 8;

  const body = linear_extrude(
    { height: frontHeight },
    frontOutline(frontMaterialThickness, sliderDepth, frontDrop, frontDepth)
  );
  const screwHole = cylinder({
    start: [0, frontMaterialThickness / 2, frontHeight / 2],
    end: [sliderDepth, frontMaterialThickness / 2, frontHeight / 2],
    r: 2,
  });
  const frontScrewHole = cylinder({
    start: [
      sliderDepth,
      -frontDrop - frontMaterialThickness / 2,
      frontHeight / 2,
    ],
    end: [
      sliderDepth + frontMaterialThickness + slotDepth,
      -frontDrop - frontMaterialThickness / 2,
      frontHeight / 2,
    ],
    r: 2,
  });
  const frontSlot = cube([
    frontHeight,
    frontMaterialThickness - 2 * frontSlotExtraMaterial,
    frontHeight - 2 * frontSlotExtraMaterial,
  ]).translate([
    sliderDepth + frontMaterialThickness,
    -frontDrop - frontMaterialThickness + frontSlotExtraMaterial,
    frontSlotExtraMaterial,
  ]);
  return difference(body, screwHole, frontSlot, frontScrewHole);
};

const tray = (
  frontHeight: number,
  frontMaterialThickness: number,
  slotExtraMaterial: number
) => {
  const trayWidth = 90;
  const trayDepth = 20;

  const standHeight = 20;
  const standWidth = 20;

  const frontDepth = 20;

  const trayBottom = cube({
    size: [trayWidth, trayDepth, frontMaterialThickness],
  });

  const stand = (standAngle = 30) => {
    return rotate(
      [-standAngle, 0, 0],
      cube([standWidth, frontMaterialThickness, standHeight])
    );
  };

  const leftStand = translate([0, 0, frontMaterialThickness], stand());
  const rightStand = translate(
    [trayWidth - standWidth, 0, frontMaterialThickness],
    stand()
  );

  const tongue = cube([
    frontHeight - 2.5 * slotExtraMaterial,
    frontDepth,
    frontMaterialThickness - 2 * slotExtraMaterial,
  ]).translate([
    trayWidth / 2 - frontHeight / 2 + slotExtraMaterial,
    trayDepth,
    0,
  ]);

  const screwHole = cylinder({
    start: [
      trayWidth / 2,
      trayDepth,
      frontMaterialThickness / 2 - slotExtraMaterial,
    ],
    end: [
      trayWidth / 2,
      trayDepth + frontDepth,
      frontMaterialThickness / 2 - slotExtraMaterial,
    ],
    r: 2,
  });

  return difference(
    union(trayBottom, leftStand, rightStand, tongue),
    screwHole
  );
};

export const main: JSCadMain = () => {
  const frontHeight = 40;
  const frontMaterialThickness = 7;

  const slotOverhang = 8;
  const slotExtraMaterial = 1;

  const backPiece = back(
    frontHeight,
    frontMaterialThickness,
    slotOverhang,
    slotExtraMaterial
  ).translate([-20, 0, 0]);
  const frontPiece = front(
    frontHeight,
    frontMaterialThickness,
    slotExtraMaterial
  );
  const trayPiece = tray(
    frontHeight,
    frontMaterialThickness,
    slotExtraMaterial
  ).translate([-50, -50, 0]);

  return [trayPiece, frontPiece, backPiece];
};
