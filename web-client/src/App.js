import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Recorder from './components/Recorder';
import Grid from '@material-ui/core/Grid';


class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="App container-fluid">
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Gialale Party
          </Typography>
        </Toolbar>
      </AppBar>
      <Input placeholder="Enter your Link or Song" />
      <Recorder />
      <Button variant="fab" color="primary" aria-label="Add">
        <AddIcon />
      </Button>
      </div>
    );
  }
}

export default App;
