import React, { useContext } from 'react'
import { View,Text } from 'react-native';
import { AuthContext } from './AuthContext';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './AllAuthScreen/Login';
import Register from './AllAuthScreen/Register';
import Onbording from './AllAuthScreen/Onbording';

const Stack=createNativeStackNavigator()

export default function AuthStack() {

    return (
    <>
    <Stack.Navigator>
        <Stack.Screen  name='demo'  component={Onbording} options={{headerShown:false}}/>
        <Stack.Screen  name='login'  component={Login} options={{headerShown:false}}/>
        <Stack.Screen  name='register'  component={Register} options={{headerShown:false}}/>
    </Stack.Navigator>
    

    </>
  )
}
