import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import testImg from "../../assets/Triangeln.jpg";
import Uppsala from "../../assets/Uppsala.jpg";

import DeleteAccessGroupButton from "../AccessGroup/DeleteAccessGroupButton"
import EditAccessGroupButton from "../AccessGroup/EditAccessGroupButton"

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

const AccessGroupCard = ({ accessGroups = [] }) => {
  console.log(accessGroups)
  console.log(accessGroups.sort())
  var counter = 1;
  var image = "";
  const classes = useStyles();

  const getImage = (name) => {
    name = name.toLowerCase()
    if (name.includes("triangeln") || name.includes("s:t") || name.includes("sankt") || name.includes("karls")){
      image = testImg;
    }
    else {
      image = Uppsala;
    }
    return(image)
  }

  const checked = React.useState(true);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {accessGroups.map(accessgroup => (
        <Grid item xs={12} sm={4}>
          <Fade in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Number" className={classes.avatar}>
                  {counter++}
                </Avatar>
              }
              title={accessgroup.name}
              subheader={accessgroup.id}
            />
            <CardMedia
              className={classes.media}
              image={getImage(accessgroup.name)}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt aliquid maiores molestiae dignissimos pariatur minus quia recusandae dolorum id asperiores ratione voluptatibus explicabo dolores, quam officiis! Quisquam hic pariatur iure!
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <EditAccessGroupButton id={accessgroup.id} />
              <DeleteAccessGroupButton id={accessgroup.id} />
            </CardActions>
          </Card>
          </Fade>
        </Grid>
        ))}
        </Grid>
    </div>
  );
}
export default AccessGroupCard