import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Perfil from "../screens/Perfil";
import BottomTabs from './BottomTabs'
import Register from "../screens/Register";
const Stack = createNativeStackNavigator();

function StackNavigation() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Register" 
                component={Register} 
                options={{headerShown: false}} 
            />

            <Stack.Screen 
                name="Login" 
                component={Register} 
                options={{headerShown: false}} 
            />

            <Stack.Screen 
                name='Home' 
                component={Home}
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name='Perfil' 
                component={Perfil}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name='Tab'
                component={BottomTabs}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigation