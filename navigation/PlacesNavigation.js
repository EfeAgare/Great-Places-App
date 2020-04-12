import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';
import PlacesListScreen from '../screens/PlacesListScreen';
import MapScreen from '../screens/MapScreen';
import NewPLaceScreen from '../screens/NewPlaceScreen';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';

const PlacesNavigator = createStackNavigator(
  {
    PlacesList: PlacesListScreen,
    PlaceDetails: PlaceDetailsScreen,
    NewPlace: NewPLaceScreen,
    Map: MapScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    },
  }
);

export default createAppContainer(PlacesNavigator);
