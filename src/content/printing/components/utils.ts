//@ts-ignore
import * as jscad from "@jscad/openjscad";
import { JSCadMain } from "./Editor";

export const generateSTL = async (
  main: JSCadMain,
  params: object
): Promise<Blob> => {
  return jscad.generateOutput("stla", main(params));
};
