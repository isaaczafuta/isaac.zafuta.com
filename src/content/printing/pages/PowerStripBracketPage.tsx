import React from "react";

import { EditorPage } from "../components/EditorPage";

import { params, script } from "../objects/powerStripBracket";

export const PowerStripBracketPage: React.FC = () => (
  <EditorPage title="Power Strip Bracket" params={params} script={script} />
);
