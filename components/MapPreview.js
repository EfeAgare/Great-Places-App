import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { MAPBOX_ACCESS_TOKEN } from 'react-native-dotenv';

const MapPreview = (props) => {
  let imagePreviewUrl;
  if (props.location) {
    imagePreviewUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${props.location.log},${props.location.lat},4.92,0/300x200?access_token=${MAPBOX_ACCESS_TOKEN}`;
  }

  return (
    <TouchableOpacity
      style={{ ...styles.mapPreview, ...props.style }}
      onPress={props.onPress}
    >
      <View style={{ ...styles.mapPreview, ...props.style }}>
        {props.location ? (
          <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
        ) : (
          props.children
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});
