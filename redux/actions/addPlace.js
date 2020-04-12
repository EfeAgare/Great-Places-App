import { ADD_PLACE } from '../constant/actionIdentifier';
import * as FileSystem from 'expo-file-system';
import { insertPlace } from '../../helpers/db';

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
