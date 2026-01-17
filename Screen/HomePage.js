import {Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile/Profile';
import SearchItem from './SearchItem';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const HomePage = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, 
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#1E1E1E', 
          borderTopWidth: 0,
          elevation: 10,
          height: 40,
          marginHorizontal: 30,
          borderRadius: 25,
          bottom: Platform.OS === 'ios' ? 30 : 20, 
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 15,
          borderWidth: 1,
          borderColor: '#333', 
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }

          // Add a little extra size if focused for a fun "pop" effect
          return <Icon name={iconName} size={focused ? size + 4 : size} color={color} />;
        },
        tabBarActiveTintColor: '#F39C12', // Your Burnt Amber theme color
        tabBarInactiveTintColor: '#666',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchItem} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default HomePage;