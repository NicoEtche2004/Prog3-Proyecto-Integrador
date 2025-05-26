import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Perfil from "../screens/Perfil";
import Pagina2 from "../screens/Pagina2";
import Pagina3 from "../screens/Pagina3";
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
                name='Home' 
                component={Home}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name='Pagina2'
                component={Pagina2}
                options={{headerShown:false}}
            />
            
            <Stack.Screen
                name='Pagina3'
                component={Pagina3}
                options={{
                    headerShown:false
                }}
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