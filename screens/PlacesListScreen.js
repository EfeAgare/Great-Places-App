import React from 'react';
import { StyleSheet, Platform, FlatList } from 'react-native';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          places={itemData.item}
          onSelect={() => {
            props.navigation.navigate('PlaceDetails', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    headerLeft: () => {
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title={'Add Place'}
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => navData.navigation.navigate('NewPlace')}
        />
      </HeaderButtons>;
    },
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
