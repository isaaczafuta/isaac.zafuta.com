import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { Viewer } from "./Viewer";
import { ModelParameter } from "./Editor";

interface Props {
  name: string;
  description: string;
  link: string;
  script: string;
  modelParameters: ModelParameter[];
}

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    height: 200,
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export const ModelCard: React.FC<Props> = ({
  name,
  description,
  link,
  script,
  modelParameters,
}) => {
  const classes = useStyles();

  const params = Object.fromEntries(
    modelParameters.map((param) => [param.name, param.default])
  );

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia}>
        <Viewer script={script} params={params} />
      </CardMedia>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography>{description} </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={link} size="small" color="primary">
          {Object.keys(params).length > 0 ? `Customize and Print` : `Print`}
        </Button>
      </CardActions>
    </Card>
  );
};
