import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { IAnimal } from "../../../../models/IAnimal";
import "./AnimalCard.scss";

export default class AnimalCard extends React.Component {
  render() {
    const data = this.props as IAnimal;
    return (
      <Card component="article">
        <CardActionArea>
          <CardMedia
            className="animals-list-card-image"
            image={data.image}
            title={data.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3">
              {data.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}
