import React from "react";

import { EditorPage } from "../components/EditorPage";

import { params, main } from "../objects/powerStripBracket";

export const PowerStripBracketPage: React.FC = () => (
  <EditorPage title="Power Strip Bracket" params={params} main={main} />
);
