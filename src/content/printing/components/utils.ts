//@ts-ignore
import * as jscad from "@jscad/openjscad";

export const generateSTL = async (
  script: string,
  params: object
): Promise<Blob> => {
  const compiled = await jscad.compile(script, params);
  return jscad.generateOutput("stla", compiled);
};
