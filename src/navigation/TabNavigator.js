import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Borrowed from '../components/borrowed/Borrowed';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BorrowedStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Borrowed Screen'
      component={Borrowed}
      options={{
        headerTitle: 'Borrowed Books',
        headerStyle: {
          backgroundColor: '#5C6BC0',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  </Stack.Navigator>
);

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Borrowed') {
            iconName = 'folder-open';
          }
          return (
            <FontAwesome
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name='Borrowed'
        component={BorrowedStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
