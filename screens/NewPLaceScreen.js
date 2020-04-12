import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Button,
  Text,
} from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { addPlace } from '../redux/actions/addPlace';
import ImagePickerComponent from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPLaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const [imageSelected, setImageSelected] = useState('');

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(titleValue, imageSelected));
    props.navigation.goBack();
  };

  const imageTakenHandler = (imagePath) => {
    setImageSelected(imagePath);
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePickerComponent onImageTaken={imageTakenHandler} />
        <LocationPicker navigation={props.navigation} />
        <Button
          title='Save Place'
          color={Colors.primaryColor}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPLaceScreen.navigationOptions = () => {
  return {
    headerTitle: 'Add a new place',
  };
};

export default NewPLaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
});
