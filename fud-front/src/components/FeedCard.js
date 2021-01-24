import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import {Typography, Icon} from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShareIcon from '@material-ui/icons/Share';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';

const useStyles = makeStyles((theme) => ({
  recipeCard: {
    marginBottom: '30px'
  },
  media: {
      height: '0',
      paddingTop: '60%',
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
  redressed: {
    fontFamily: 'Redressed, cursive'
  },
}));

export default function FeedCard({
  title="Pork and Leak Dumplings", 
  user="viv.s.li", 
  image="/images/dumplings.jpg", 
  description="",
  loves="1.4k",
  time="15min",
  cost="5"
}) {
  const classes = useStyles();
  
  return (
    <Card variant="outlined" className={classes.recipeCard}>
      <CardHeader
        avatar={<Typography className={classes.redressed}>{user}</Typography>
        }
        action={
          <IconButton aria-label="add to cart">
            <ShoppingCartOutlinedIcon />
          </IconButton>
        }
        title={<Typography className={classes.redressed}>{title}</Typography>}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={`${title}-image`}
      />
      <CardContent>
          <Icon>

          </Icon>
        <Typography className={classes.redressed} variant="body2" color="textSecondary" component="p">
            {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="loves">
          <FavoriteBorderOutlinedIcon />
          <Typography className={classes.redressed}>{loves}</Typography>          
        </IconButton>
        <IconButton aria-label="prep time">
          <ScheduleOutlinedIcon />
          <Typography className={classes.redressed}>{time}</Typography>
        </IconButton>
        <IconButton aria-label="price">
          <AttachMoneyOutlinedIcon />
          <Typography className={classes.redressed}>{cost}</Typography>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}