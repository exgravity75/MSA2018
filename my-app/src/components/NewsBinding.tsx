

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import classnames from "classnames";
import * as React from "react";

import red from "@material-ui/core/colors/red";
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Collapse from "@material-ui/core/Collapse";
import ShareIcon from '@material-ui/icons/Share';
import * as Moment from 'moment';




const styles1 =(theme : any ) =>  ({
    card: {
        maxWidth: 400,
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2
      },
      media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
      },
      actions: {
        display: "flex"
      },
      expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest
        }),
        marginLeft: "auto",
        [theme.breakpoints.up("sm")]: {
          marginRight: -8
        }
      },
      expandOpen: {
        transform: "rotate(180deg)"
      },
      avatar: {
        backgroundColor: red[500]
      }
});



interface INewsProps {
    sTitle: any;
    desc: any;
    contents : any;
    imageUrl: any;
    publishDate : any;
    newsSource : any;
  }

class NewsBinding extends React.Component<INewsProps&any> {
    
    public state = { expanded: false };

    public handleExpandClick = () => {
        this.setState(state => ({ expanded: !this.state.expanded }));
    };
    
    public render() {
        
        const {classes } = this.props;
        return (
            
            <Card className={classes.card}>
            <CardHeader
            avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                R
                </Avatar>
            }
            action={
                <IconButton>
                <MoreVertIcon />
                </IconButton>
            }
            title={this.props.sTitle}
            subheader={this.ChangeDateformat(this.props.publishDate) + " (" + this.props.newsSource +")" } 
            
            />
            <CardMedia
            className={classes.media}
            image={this.props.imageUrl}
            title={this.props.sTitle}
            />
            <CardContent>
            <Typography component="p">
            {this.props.desc }
            </Typography>
            </CardContent>
            <CardActions  disableActionSpacing={true}>
            <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
                <ShareIcon />
            </IconButton>
            <IconButton
                className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
            >
                <ExpandMoreIcon />
            </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit={true}>
          <CardContent>
            <Typography paragraph={true} variant="body2">
                {this.props.contents}
            </Typography>
            
          </CardContent>
        </Collapse>
        </Card>
            
        );
    }

    public ChangeDateformat(input:any)
    {
        Moment.locale('en');
        
        return(Moment(input).format('ddd DD MMM, YYYY hh:mm a'));

    }
    
}

// NewsBinding.prototype = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles (styles1)(NewsBinding);



