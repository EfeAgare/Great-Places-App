import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MapScreen = () => {
  return (
    <View>
      <Text>MapScreen</Text>
    </View>
  );
};

MapScreen.navigationOptions = () => {
  return {
    headerTitle: 'Map View'
  }
}

export default MapScreen;


const styles = StyleSheet.create({});
