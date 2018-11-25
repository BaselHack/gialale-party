import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import io from 'socket.io-client';
import { Video, FileSystem } from 'expo';

import NextSong from './components/NextSong';

class PlayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      playlist: [],
      currentSong: null,
      firstSong: true,
    }
  }

  componentDidMount() {
    let socket = io('http://192.168.43.140:3002');
    socket.emit('joinRoom', this.props.roomCode);
    console.log('joining room: ' + this.props.roomCode);

    socket.on('newSong', () => {
      console.log("newSong received");
      let tempPlaylist = this.state.playlist;
      let song;
      if (this.state.firstSong) {
        song = {
          title: "ТРИ ПОЛОСКИ / KOLM TRIIPU / THREE STRIPES",
          image: "https://img.youtube.com/vi/QiFBgtgUtfw/0.jpg"
        }
        this.setState({firstSong: false});
        this.triPoloskiRef.playAsync();
      } else {
        song = {
          title: "Darude - Sandstorm",
          image: "https://img.youtube.com/vi/y6120QOlsfU/0.jpg"
        }
      }
      tempPlaylist.push(song);
      song.index = tempPlaylist.length -1;
      this.setState({playlist: tempPlaylist});

      if (!this.state.currentSong) {
        this.playNextSong();
      }
    });
  }

  playNextSong() {
    console.log("Playing next song...");
    let nextSong;
    if (!this.state.currentSong) {
      nextSong = this.state.playlist[0];
    } else if (this.state.playlist.length > this.state.currentSong.index) {
      nextSong = this.state.playlist[this.state.currentSong.index+1];
    }

    this.setState({currentSong: nextSong});
    this.triPoloskiRef.pauseAsync();
    this.sandstormRef.playAsync();
  }

  pausePlaySong() {
    if (this.state.playing) {
      this.triPoloskiRef.pauseAsync()
    } else {
      this.triPoloskiRef.playAsync();
    }

    this.setState({playing: !this.state.playing});
  }

  render() {
    let currentSong = this.state.currentSong;
    let currentIndex = 0;
    let imageUrl = 'http://';
    if (currentSong) {
      currentIndex = currentSong.index;
      imageUrl = currentSong.image;
    }

    return (
      <View>
        <Video
          source={{uri: 'http://192.168.43.140:3001/music/QiFBgtgUtfw'}}
          ref={ref => this.triPoloskiRef = ref}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: 0, height: 0 }}
        />
        <Video
          source={{uri: 'http://192.168.43.140:3001/music/y6120QOlsfU'}}
          ref={ref => this.sandstormRef = ref}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          isLooping
          style={{ width: 0, height: 0 }}
        />

        <View style={styles.topPanel}>
          <TouchableOpacity style={styles.topButton} onPress={()=>{this.props.backButtonHandler()}}>
            <FontAwesome name="arrow-left" size={45} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton} onPress={()=>{Linking.openURL(`whatsapp://send?text=http://192.168.43.140:3000/${this.props.roomCode}`);}}>
            <FontAwesome name="share-alt" size={45} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView style={{height:'76%'}}>
          {this.state.playlist.length > 0 ? (
            <View>
              <View style={styles.currentPlay}>
                <Image style={styles.currentImage} source={{uri: imageUrl}}/>
                <Text style={styles.title}>
                  {this.state.playlist[currentIndex].title}
                </Text>
              </View>

              <View style={styles.nextSongs}>
                {this.state.playlist
                  .filter((song, i) => i > currentIndex)
                  .map((song, i) => <NextSong key={i} song={song} />)}
              </View>
            </View>
          ) : (
            <Text style={{marginLeft: 20, marginRight: 20}}>
              Share your Gialale-Party to start the party!
            </Text>
          )}

        </ScrollView>

        <View style={styles.controlPanel}>
          <TouchableOpacity style={styles.controlButton} onPress={()=>{alert("last")}}>
            <FontAwesome name="step-backward" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={()=> this.pausePlaySong() }>
            {this.state.playing ?
              <FontAwesome name="pause" size={40} color="white" /> :
              <FontAwesome name="play" size={40} color="white" /> }
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={()=>{this.playNextSong()}}>
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
    //backgroundColor: "lightblue",
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
