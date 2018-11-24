
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import PauseIcon from '@material-ui/icons/Pause';
import InputLabel from '@material-ui/core/InputLabel';

export default class Recorder extends Component {

  constructor(props){
    super(props)

    this.state = {
      isRecording: false,
      isPlaying: false,
      mediaRecorder: null,
      stream: null,
      audioChunks: [],
      audio: null
    }
    this.startRecorder = this.startRecorder.bind(this);
    this.stopRecorder = this.stopRecorder.bind(this);
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



  render() {
    return (
      <div>
      {this.state.isRecording ?
        <div>
          <InputLabel>recording...</InputLabel>
          <PauseIcon onClick={this.stopRecorder}></PauseIcon>
        </div> :
         <div>
         <InputLabel>Record your memo</InputLabel>
         <MicIcon className="clickable" onClick={this.startRecorder}/>
         </div>
        }
      
      </div>
    )
  }
}
