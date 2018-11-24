import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';

import StartScreen from './src/StartScreen';
import PlayScreen from './src/PlayScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      roomCode: null,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.playing ?
          <PlayScreen
            backButtonHandler={()=>this.setState({playing: false})}
            roomCode={this.state.roomCode} /> :
          <StartScreen
            goButtonHandler={roomCode=>this.setState(
              {
                playing: true,
                roomCode: roomCode,
              }
            )}/> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
