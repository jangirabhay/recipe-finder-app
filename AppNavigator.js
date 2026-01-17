import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screen/Login';
import Sigin from './Screen/Sigin';
import HomePage from './Screen/HomePage';
import MealInfo from './Component/MealInfo';
import Favorite from './Screen/Favorite';
import FirstScreen from './Screen/FirstScreen';
import UpdateProfile from './Screen/Profile/UpdateProfile';
import { useSelector } from 'react-redux';
const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  const userauth = useSelector(state => state.auth.userLogin);
  console.log(userauth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userauth ? (
          <>
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="MealInfo" component={MealInfo} />
            <Stack.Screen name="Favorite" component={Favorite} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          </>
        ) : (
          <>
            <Stack.Screen name="FirstScreen" component={FirstScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sigin" component={Sigin} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
