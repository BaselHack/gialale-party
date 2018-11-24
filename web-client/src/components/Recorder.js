
import React, { Component } from 'react'
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import PlayIcon from '@material-ui/icons/PlayArrow';
import InputLabel from '@material-ui/core/InputLabel';

export default class Recorder extends Component {
  constructor(props){
    super(props)

    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.state = {
      isPlaying: false
    }
  }

 stop(){
   const {audio} = this.props;
   audio.pause();
   audio.currentTime = 0;
   this.setState({
     isPlaying:false
   })
 }

 play(){
    const {audio} = this.props;
    this.setState({ isPlaying:true })
    audio.play();
    audio.addEventListener("ended", () =>{
      audio.currentTime = 0;
      this.setState({ isPlaying:false })
   });
  }

  render() {
    const {isRecording, stopRecorder, startRecorder, audio} = this.props;
    return (
      <div className="row">
      {isRecording ?
        <div>
          <InputLabel>recording...</InputLabel>
          <StopIcon onClick={stopRecorder}></StopIcon>
        </div> :
        !audio ? 
         <div>
         <InputLabel>Record your memo</InputLabel>
         <MicIcon className="clickable" onClick={startRecorder}/>
         </div>
         :
         <div>
         <InputLabel>File attached</InputLabel>
         {this.state.isPlaying ? <StopIcon onClick={this.stop} /> : <PlayIcon className="clickable" onClick={this.play} />}
         </div>
        }
      </div>
    )
  }
}
