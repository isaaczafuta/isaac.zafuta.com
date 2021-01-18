import { ModelParameter, JSCadMain } from "../components/Editor";

// @ts-ignore
import * as scadApi from "@jscad/scad-api";
const { union } = scadApi.booleanOps;
const { cube } = scadApi.primitives3d;

export const params: ModelParameter[] = [];

const makeBacking = (
  postSpacing: number,
  postWidth: number,
  postDepth: number,
  postYInset: number,
  postXInset: number,
  materialThickness: number
) => {
  const totalBackingWidth =
    2 * materialThickness + postSpacing + 2 * postWidth + 2 * postXInset;
  const totalBackingHeight = postDepth + postYInset;

  const backing = cube([
    totalBackingWidth,
    totalBackingHeight,
    materialThickness,
  ]);

  return {
    totalBackingWidth,
    totalBackingHeight,
    backing,
  };
};

const makePost = (postWidth: number, postDepth: number, postHeight: number) => {
  return cube([postWidth, postDepth, postHeight]);
};

const makeSideWall = (
  materialThickness: number,
  postDepth: number,
  postHeight: number,
  postYInset: number,
  overhangHeight: number
) => {
  const totalWallDepth = postDepth + postYInset;
  const totalWallHeight = materialThickness + postHeight + overhangHeight;
  return cube([materialThickness, totalWallDepth, totalWallHeight]);
};

const makeClip = (
  clipWidth: number,
  materialThickness: number,
  postHeight: number,
  overhangHeight: number,
  clipOverhangLength: number
) => {
  const totalClipWallHeight = materialThickness + postHeight + overhangHeight;

  const clipWall = cube([clipWidth, materialThickness, totalClipWallHeight]);
  const clipAngle = 45;

  const clipOverhang = cube([clipWidth, materialThickness, clipOverhangLength])
    .rotateX(clipAngle)
    .translate([
      0,
      materialThickness -
        materialThickness * Math.sin((clipAngle * Math.PI) / 180),
      totalClipWallHeight -
        materialThickness * Math.cos(clipAngle * (Math.PI / 180)),
    ]);
  return union(clipWall, clipOverhang);
};

export const main: JSCadMain = () => {
  const postHeight = 10;
  const postWidth = 9;
  const postDepth = 4.5;

  const postSpacing = 252;
  const postXInset = 25;
  const postYInset = 15;

  const materialThickness = 2;
  const overhangHeight = 10;

  const clipWidth = 50;
  const clipOverhangLength = 10;

  const { totalBackingWidth, totalBackingHeight, backing } = makeBacking(
    postSpacing,
    postWidth,
    postDepth,
    postYInset,
    postXInset,
    materialThickness
  );

  const leftPost = makePost(postWidth, postDepth, postHeight).translate([
    materialThickness + postXInset,
    0,
    materialThickness,
  ]);

  const rightPost = makePost(postWidth, postDepth, postHeight).translate([
    materialThickness + postXInset + postWidth + postSpacing,
    0,
    materialThickness,
  ]);

  const leftWall = makeSideWall(
    materialThickness,
    postDepth,
    postHeight,
    postYInset,
    overhangHeight
  );

  const rightWall = makeSideWall(
    materialThickness,
    postDepth,
    postHeight,
    postYInset,
    overhangHeight
  ).translate([
    materialThickness + postSpacing + 2 * postWidth + 2 * postXInset,
    0,
    0,
  ]);

  const clip = makeClip(
    clipWidth,
    materialThickness,
    postHeight,
    overhangHeight,
    clipOverhangLength
  ).translate([
    (totalBackingWidth - clipWidth) / 2,
    postDepth + postYInset - materialThickness,
    0,
  ]);

  return union(backing, leftPost, rightPost, leftWall, rightWall, clip)
    .translate([-totalBackingWidth / 2, -totalBackingHeight / 2, 0])
    .rotateZ(-45);
};
