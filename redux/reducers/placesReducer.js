import { ADD_PLACE, GET_ALL_PLACES } from '../constant/actionIdentifier';
import Place from '../../model/Place';

const initialState = {
  places: [],
};

export const placesReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.imageUri,
        action.placeData.address,
        action.placeData.cord.lat,
        action.placeData.cord.log
      );
      return {
        ...state,
        places: state.places.concat(newPlace),
      };

    case GET_ALL_PLACES:
      return {
        places: action.places.map(
          (pl) =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.log
            )
        ),
      };
    default:
      return state;
  }
};
