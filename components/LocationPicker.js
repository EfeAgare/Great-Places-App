import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Colors from '../constants/Colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const LocationPicker = () => {
  const [picketLocation, setPicketLocation] = useState('');
  const [isFetchingState, setIsFetching] = useState(false);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status != 'granted') {
      Alert.alert(
        'Sorry',
        'we need your location permissions to make this work',
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

  const getLocationHandler = async () => {
    let hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 10000,
      });
      setPicketLocation({
        lat: location.coords.latitude,
        log: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        'Could not fetch location',
        'Please try again later or pick a position in the map',
        [
          {
            text: 'Okay',
          },
        ]
      );
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size='large' color={Colors.primaryColor} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </View>

      <Button
        title='Get User Location'
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center  ',
  },
});
