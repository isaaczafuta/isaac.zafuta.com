import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";

import { Navigation, Page } from "../../../layout";
import { ModelCard } from "../components/ModelCard";

import * as powerStripBracket from "../objects/powerStripBracket";
import * as vespaLicensePlateHolder from "../objects/vespaLicensePlateHolder";

const cards = [
  {
    id: "bracket",
    name: "Bracket",
    description: "Some bracket",
    link: "/printing/bracket",
    ...powerStripBracket,
  },
  {
    id: "vespa-plate-holder",
    name: "Vespa Plate Holder",
    description: "License Plate Mounting Bracket for 1978 Vespa P200",
    link: "/printing/vespa-plate-holder",
    ...vespaLicensePlateHolder,
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
        {cards.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <ModelCard
              name={card.name}
              description={card.description}
              link={card.link}
              main={card.main}
              modelParameters={card.params}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Page>
);
