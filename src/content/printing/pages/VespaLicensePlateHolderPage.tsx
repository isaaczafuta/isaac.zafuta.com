import React from "react";

import { EditorPage } from "../components/EditorPage";

import { params, main } from "../objects/vespaLicensePlateHolder";

export const VespaLicensePlateHolderPage: React.FC = () => (
  <EditorPage title="Vespa License Plate Holder" params={params} main={main} />
);
