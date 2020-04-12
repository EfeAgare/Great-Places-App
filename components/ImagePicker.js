import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImagePickerComponent = (props) => {
  const [pickedImage, setPickedImage] = useState('');
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status != 'granted') {
      Alert.alert(
        'Sorry',
        'we need your camera permissions to make this work',
        [
          {
            text: 'Okay',
          },
        ]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    try {
      let hasPermissions = await verifyPermissions();
      if (!hasPermissions) {
        return;
      }
      let result = await ImagePicker.launchCameraAsync({
        quality: 1,
        aspect: [4, 3],
        allowsEditing: true,
      });
      setPickedImage(result.uri);
      props.onImageTaken(result.uri);
    } catch (error) {}
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No Image picked yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title='Take Image'
        onPress={takeImageHandler}
        color={Colors.primary}
      />
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
