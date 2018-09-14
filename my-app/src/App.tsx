import {AppBar, Toolbar, Typography} from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import { withStyles } from '@material-ui/core/styles';
// import * as PropTypes from 'prop-types';
import * as React from 'react';
import NewsBinding from './components/NewsBinding';



interface ISearch {
    
    country: any,
    results: any,
    newsData : [],
    url : any,
    open : any
  }

export default class App extends React.Component<{}, ISearch> {

    constructor(props: any) {
        super(props)
        this.state = {
          country : "nz",
            results: "start",
            newsData : [],
            url : "",
            open: false          
        }
        this.upload = this.upload.bind(this);
        
      }

      
    
  public upload() {
        this.setState({results: "upload"})
    const sUrl =  "https://newsapi.org/v2/top-headlines?country="
    +this.state.country + "&apiKey=a2881f0210ef4f0e9ede8cecf8e8ee4f";
    this.setState({url: sUrl})
    fetch(sUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    .then((response : any) => {
      if (!response.ok) {
        // alert(response.statusText);
        this.setState({results: response.statusText})
      }
      else {
        response.json().then((jsonData:any) => this.setState({newsData: jsonData.articles
        }))
        this.setState({results: "end"})
      }
      return response
    })
  }



  public handleChange = (event:any) => {
    
    this.setState({country:event.target.value});
  };

  public handleClose = () => {
    this.setState({ open: false });
  };

  public handleOpen = () => {
    this.setState({ open: true });
  };

  public render() {
    return (
     

      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
            <FormControl className="" style={{margin:10, padding:4, minWidth: 200, maxWidth: 300}}>
          <InputLabel htmlFor="my-app-country">Country</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.country}
            onChange={this.handleChange}
            inputProps={{
              name: 'Country',
              id: 'my-app-country',
            }}
          >
            <MenuItem value="nz">
              <em>New Zealand</em>
            </MenuItem>
            <MenuItem value="au">Australia</MenuItem>
            <MenuItem value="us">United States</MenuItem>
            <MenuItem value="kr">Korea</MenuItem>
          </Select>
        </FormControl>
        
        <Button variant="contained" onClick={this.upload}>
        View
        </Button>
            </Typography>
          </Toolbar>
        </AppBar>
        
        <div className="centreText">
        {
        this.state.results === "upload" ?
        <CircularProgress thickness={7} /> : ""
        }
        </div>
        <div>
        {
          this.state.newsData.map((newsD: any) => (
            <NewsBinding
            sTitle={newsD.title}
            desc={newsD.description}
            contents={newsD.content}
            imageUrl={newsD.urlToImage}
            publishDate={newsD.publishedAt}
            newsSource={newsD.source.name}
            />
          ))}
        
        
        </div>
      </div>
      

      
    );
  }

        
}

