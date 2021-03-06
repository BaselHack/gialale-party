import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Recorder from './components/Recorder';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.startRecorder = this.startRecorder.bind(this);
    this.stopRecorder = this.stopRecorder.bind(this);

    this.state ={
      searchTerm: '',
      mediaRecorder: null,
      stream: null,
      audioChunks: [],
      audio: null,
      isRecording: false,
      room: ''
    }
  }


  async sendData(){
    const roomPath = window.location.pathname.split('/');
    const room = roomPath[1];
    this.setState({room: room});
    let formData = new FormData();
    formData.append('title', this.state.searchTerm);
    formData.append('room', this.state.room);
    formData.append('memo', new Blob(this.state.audioChunks),'memo');

    for(let pair of formData.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
   }

    const config = { headers: {'Content-Type': 'multipart/form-data' }}
    axios.post('http://192.168.43.140:3001/sound', formData, config);
  }

  async startRecorder(){
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });
    mediaRecorder.addEventListener("stop", event => {
      const audioBlob = new Blob(this.state.audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      this.setState({audio: audio})
      this.setState({isRecording:false})
    });

    mediaRecorder.start();
    this.setState({
      isRecording: true,
      stream: stream,
      mediaRecorder: mediaRecorder,
      audioChunks: audioChunks
    })

  }


  stopRecorder(){
    const mediaRecorder = this.state.mediaRecorder;
    mediaRecorder.stop();
    this.setState({
      mediaRecorder: mediaRecorder
    })
  }

  onChange(e){
    this.setState({
      searchTerm: e.target.value
    });
  }

  render() {
    return (
      <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  style={{ minHeight: '100vh' }}
>
      <div className="App container">
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" color="inherit" className="center">
            Gialale Party 🎉
          </Typography>
        </Toolbar>
      </AppBar>
      <Input placeholder="Enter your song" onChange={this.onChange} value={this.state.searchTerm} />
      <Recorder startRecorder={this.startRecorder} stopRecorder={this.stopRecorder} isRecording={this.state.isRecording} audio={this.state.audio}/>
      <Button variant="fab" color="secondary" aria-label="Add">
        <AddIcon onClick={this.sendData}/>
      </Button>
      </div>
      </Grid>
    );
  }
}

export default App;
