import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feed from '../screens/Feed';
import Buscador from '../screens/Buscador';
import Perfil from '../screens/Perfil';
import { FontAwesome } from '@expo/vector-icons'

const Tab= createBottomTabNavigator();
export default function BottomTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
          name='Feed' 
          component={Feed}
          options={{
            tabBarIcon: () => <FontAwesome name='home' size={24} color={'red'} />
          }}
          />
        <Tab.Screen name='Buscador' component={Buscador} />
        <Tab.Screen name='Perfil' component={Perfil} />
    </Tab.Navigator>
  )
}