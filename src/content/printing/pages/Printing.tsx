import React from "react";
import { Route } from "react-router-dom";
import { Container, Grid, Typography } from "@material-ui/core";

import { Navigation, Page } from "../../../layout";
import { ModelCard } from "../components/ModelCard";

import * as powerStripBracket from "../objects/powerStripBracket";
import * as vespaLicensePlateHolder from "../objects/vespaLicensePlateHolder";
import * as monitorDeviceMount from "../objects/monitorDeviceMount";
import * as turntableLidHinge from "../objects/turntableLidHinge";
import * as roborockMopHanger from "../objects/roborockMopHanger";
import * as bikePhoneTray from "../objects/bikePhoneTray";
import * as barClamp from "../objects/barClamp";

import { EditorPage } from "../components/EditorPage";

const objectMetas = [
  {
    id: "bracket",
    name: "Bracket",
    description: "Some bracket",
    ...powerStripBracket,
  },
  {
    id: "vespa-plate-holder",
    name: "Vespa Plate Holder",
    description: "License Plate Mounting Bracket for 1978 Vespa P200",
    ...vespaLicensePlateHolder,
  },
  {
    id: "monitor-device-mount",
    name: "Monitor Device Mount",
    description: "Device Mount for Dell U3419W",
    ...monitorDeviceMount,
  },
  {
    id: "turntable-lid-hinge",
    name: "Turntable Lid Hinge",
    description: "Turntable Lid Hinge for Sony PS-LX300H",
    ...turntableLidHinge,
  },
  {
    id: "roborock-mop-hanger",
    name: "Roborock S6 Mop Hanger",
    description: "Wall-mounted hanger for the Roborock S6 Mop Unit",
    ...roborockMopHanger,
  },
  {
    id: "bike-phone-tray",
    name: "Bike Phone Tray",
    description: "A simple phone mount for attaching my phone to my bike",
    ...bikePhoneTray,
  },
  {
    id: "bar-clamp",
    name: "Bike Handlebar Clamp",
    description: "Attach something to a rod",
    ...barClamp,
  },
];

export const Printing: React.FC = () => (
  <Page title="Printing">
    <Navigation title="Printing" />
    <Container maxWidth="md">
      <br />
      <Typography component="h1" variant="h4" gutterBottom>
        3D Printable Parts
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        I've found these parts useful. Maybe you will too.
      </Typography>
      <br />
      <Grid container spacing={4}>
        {objectMetas.map((objectMeta) => (
          <Grid item key={objectMeta.id} xs={12} sm={6} md={4}>
            <ModelCard
              name={objectMeta.name}
              description={objectMeta.description}
              link={`/printing/${objectMeta.id}`}
              main={objectMeta.main}
              modelParameters={objectMeta.params}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Page>
);

export const printingObjectPages = objectMetas.map((objectMeta) => (
  <Route
    exact
    key={objectMeta.id}
    path={`/printing/${objectMeta.id}`}
    component={() => (
      <EditorPage
        title={objectMeta.name}
        main={objectMeta.main}
        params={objectMeta.params}
      />
    )}
  />
));
