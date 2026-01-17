import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/store';
import React, { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import AppNavigator from './AppNavigator';

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => Orientation.unlockAllOrientations();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
