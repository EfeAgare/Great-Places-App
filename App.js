import React from 'react';
import PlacesNavigation from './navigation/PlacesNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigation />
    </Provider>
  );
}
