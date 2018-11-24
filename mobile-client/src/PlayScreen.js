import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import io from 'socket.io-client';
/*import YouTube from 'simple-youtube-api';
import { apiKey } from './settings';*/

import NextSong from './components/NextSong';

class PlayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      playlist: [
        {
          title: "Rönnl",
        },
      ],
    }
  }

  componentDidMount() {
    let socket = io('http://192.168.43.147:3002');
    socket.emit('joinRoom', this.props.roomCode);

    /*socket.on('newSong', song => {
      const youtube = new YouTube(apiKey);
      youtube.videoById('https://www.youtube.com/watch?v=3odIdmuFfEY')
          .then(video => {
              console.log(`The video's title is ${video[0].title}`);
          })
          .catch(console.log);*/

      //this.setState({playlist: ...this.state.playlist, song});
    });
  }

  render() {
    return (
      <View>
        <View style={styles.topPanel}>
          <TouchableOpacity style={styles.topButton} onPress={()=>{this.props.backButtonHandler()}}>
            <FontAwesome name="arrow-left" size={45} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton} onPress={()=>{alert("share")}}>
            <FontAwesome name="share-alt" size={45} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView style={{height:'76%'}}>
          <View style={styles.currentPlay}>
            <Image style={styles.currentImage} source={require("../assets/splash.png")}/>
            <Text style={styles.title}>
              Ronny der Kranführer
            </Text>
          </View>

          <View style={styles.nextSongs}>
            {this.state.playlist.map((song, i) => <NextSong key={i} title={song.title} />)}
          </View>
        </ScrollView>

        <View style={styles.controlPanel}>
          <TouchableOpacity style={styles.controlButton} onPress={()=>{alert("last")}}>
            <FontAwesome name="step-backward" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={()=>{this.setState({playing: !this.state.playing})}}>
            {this.state.playing ?
              <FontAwesome name="pause" size={40} color="white" /> :
              <FontAwesome name="play" size={40} color="white" /> }
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={()=>{alert("next")}}>
            <FontAwesome name="step-forward" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currentPlay: {
    marginLeft: 20,
    marginRight: 20,
    height: 200,
    backgroundColor: "lightblue",
  },
  nextSongs:{
    marginBottom: 20,
  },
  currentImage: {
    height: 170,
    width: 'auto',
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
  },
  controlPanel: {
    height: '11%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: "black",
  },
  controlButton: {

  },
  topPanel: {
    height: '13%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  topButton: {
    marginTop: 20,
  }
});

export default PlayScreen;
