import { ADD_PLACE } from '../constant/actionIdentifier';

export const addPlace = (title) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PLACE,
      placeData: {
        title: title,
      },
    });
  };
};
