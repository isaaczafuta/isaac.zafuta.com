import React from "react";

import { EditorPage } from "../components/EditorPage";

import { params, script } from "../objects/vespaLicensePlateHolder";

export const VespaLicensePlateHolderPage: React.FC = () => (
  <EditorPage
    title="Vespa License Plate Holder"
    params={params}
    script={script}
  />
);
