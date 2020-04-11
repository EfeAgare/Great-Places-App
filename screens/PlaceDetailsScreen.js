import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PlaceDetailsScreen = () => {
  return (
    <View>
      <Text>Places Details</Text>
    </View>
  );
};

PlaceDetailsScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam('placeTitle');
  return {
    headerTitle: title,
  };
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({});
