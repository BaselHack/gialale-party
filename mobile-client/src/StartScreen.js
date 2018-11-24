import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class StartScreen extends React.Component {
  goButtonHandler() {
    fetch('http://localhost:3001/getRoomCode')
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
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.goButton} onPress={()=>{this.goButtonHandler()}}>
            <Text style={styles.textStyle}>GO</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.settingsButton} onPress={()=>{alert("settings")}}>
          <FontAwesome name="wrench" size={45} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bluetoothButton} onPress={()=>{alert("bluetooth")}}>
          <FontAwesome name="bluetooth" size={45} color="black" />
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
    backgroundColor: "lightblue",

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 70
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
