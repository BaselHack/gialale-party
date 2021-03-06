import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, WebView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class StartScreen extends React.Component {
  goButtonHandler() {
    fetch('http://192.168.43.140:3001/getRoomCode')
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.goButtonHandler(responseJson.roomString);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 300, height: 100, top: 70}}
            source={require('../assets/logo.png')} />
        </View>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.goButton} onPress={()=>{this.goButtonHandler()}}>
            <Text style={styles.textStyle}> 🎉</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', bottom: -405}}>
          <Text style={{fontSize: 20}}>
            Let's gialale!
          </Text>
        </View>

        <TouchableOpacity style={styles.settingsButton} onPress={()=>{alert("settings")}}>
          <FontAwesome name="wrench" size={45} color="#FD175B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bluetoothButton} onPress={()=>{alert("bluetooth")}}>
          <FontAwesome name="bluetooth" size={45} color="#FD175B" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goButton: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: "#FD175B",

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 70,

  },
  settingsButton: {
    position: 'absolute',
    bottom: 60,
    right: 40,
  },
  bluetoothButton: {
    position: 'absolute',
    bottom: 60,
    left: 40,
  },

});

export default StartScreen;
