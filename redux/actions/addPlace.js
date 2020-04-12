import { ADD_PLACE, GET_ALL_PLACES } from '../constant/actionIdentifier';
import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';
import { MAPBOX_ACCESS_TOKEN } from 'react-native-dotenv';

export const addPlace = (title, imageUri, location) => {
  return async (dispatch) => {

    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.log},${location.lat}.json?types=poi&access_token=${MAPBOX_ACCESS_TOKEN}`)
    const fileName = imageUri.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    if (response.message) {
      throw new Error("Something went wrong")
    }

    const resData = await response.json()
    const address = resData.features[0].place_name

    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        imageUri,
        address,
        location.lat,
        location.log
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          imageUri: newPath,
          address: address,
          cord: {
            lat: location.lat,
            log: location.log
          }
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const allPlaces = await fetchPlaces();
      dispatch({ type: GET_ALL_PLACES, places: allPlaces.rows._array });
    } catch (error) {
      throw error;
    }
  };
};
