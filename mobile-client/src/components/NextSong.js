import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

class NextSong extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.props.song.video.snippet.thumbnails.high.url}}/>
        <Text style={styles.title}>
          {this.props.song.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 70,
    //backgroundColor: "lightblue",
  },
  image: {
    height: 45,
    width: 'auto',
  },
  title: {
    fontSize: 17,
    paddingLeft: 10,
  },
});

export default NextSong;
