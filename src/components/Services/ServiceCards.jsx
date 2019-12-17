import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

import laundry from "./laundry.jpg";
import sauna from "./sauna.png";
import pool from "./pool.jpeg";

import DeleteServiceButton from "../Service/DeleteServiceButton";
import EditServiceButton from "../Service/EditServiceButton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  
}));

const ServiceCard = ({ services = [] }) => {
  console.log(services)
  console.log(services.sort())
  var counter = 1;
  var image = "";
  const classes = useStyles();

  const getImage = (name) => {
    name = name.toLowerCase()
    console.log(name)
    if (name.includes("laundry") || name.includes("wash")){
      image = laundry;
    }
    else if (name.includes("sauna") || name.includes("bastu")) {
      image = sauna;
    }
    else if (name.includes("pool") || name.includes("biljard")){
      image = pool;
    }
    else{
      image = ""
    }
    return(image)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {services.map(services => (
        <Grid item xs={12} sm={4}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Number" className={classes.avatar}>
                  {counter++}
                </Avatar>
              }
              title={services.name}
              subheader={services.id}
            />
            <CardMedia
              className={classes.media}
              image={getImage(services.name)}
            />
            <CardContent>
            <CardActions disableSpacing>
                <Grid item xs={12} sm={4}>
                  <EditServiceButton id={services.id} />
                </Grid>
                <Grid item xs={1} sm={4}>
                  <DeleteServiceButton id={services.id} />
                </Grid>
            </CardActions>
            </CardContent>
          </Card>
        </Grid>
        ))}
        </Grid>
    </div>
  );
}
export default ServiceCard