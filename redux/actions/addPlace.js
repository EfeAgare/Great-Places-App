import { ADD_PLACE, GET_ALL_PLACES } from '../constant/actionIdentifier';
import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';

export const addPlace = (title, imageUri) => {
  return async (dispatch) => {
    const fileName = imageUri.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        imageUri,
        'Dummy Address',
        15.6,
        12.3
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          imageUri: newPath,
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
