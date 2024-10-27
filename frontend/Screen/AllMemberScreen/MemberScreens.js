import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AuthContext } from '../AuthContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MemberHome from './MemberHome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createDrawerNavigator } from '@react-navigation/drawer'
import Profile from './Profile'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'


// import MemberCustomDrawer from './MemberCustomDrawer'
import Search from './Search'
import MemberSingleProject from './MemberSingleProject'
import SingleWork from './SingleWork'
import AddWork from './AddWork'
import Inbox from './Inbox'
import Settings from './Settings'
import EditProfile from './EditProfile'


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
// const Drawer = createDrawerNavigator()



const MyIcon = (route, focused) => {
  let {MemberStyles}=useContext(AuthContext);


  let Icons;
  if (route.name === 'MemberHome') {
    Icons = focused ? (
      <Feather name='home' color={MemberStyles.tabBarIcon} size={30} />
    ) : (
      <Feather name='home' color={MemberStyles.tabBarIcon} size={25} />
    )
  }

  else if (route.name === 'Inbox') {
    Icons = focused ? (
      <Feather name='message-square' color={MemberStyles.tabBarIcon} size={30} />
    ) : (
      <Feather name='message-square' color={MemberStyles.tabBarIcon} size={25} />
    )
  }
  else if (route.name === 'Profile') {
    Icons = focused ? (
      <Feather name='user' color={MemberStyles.tabBarIcon} size={30} />

    ) : <Feather name='user' color={MemberStyles.tabBarIcon} size={25} />

  }
  else if (route.name === 'Settings') {
    Icons = focused ? (
      <Feather name='settings' color={MemberStyles.tabBarIcon} size={30} />

    ) : <Feather name='settings' color={MemberStyles.tabBarIcon} size={25} />

  }
  return (
    <View>
      {Icons}
    </View>
  )
}

const MyTab = () => {
  const {membertheme}=useContext(AuthContext)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => MyIcon(route, focused),
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard:true,
        tabBarActiveBackgroundColor:membertheme=='dark'?'rgb(38, 38, 38)':'rgba(235, 232, 232, 0.649)',
      //  tabBarInactiveBackgroundColor:theme=='dark'?'black':'white',
       tabBarVisibilityAnimationConfig:true,
      
       tabBarStyle:{
        height:57,
        backgroundColor:membertheme=='dark'?'black':'white',
      
       },
       tabBarLabelStyle:{
        display:'none'
       }
      })}
    >
      <Tab.Screen name='MemberHome' component={MemberHome} />
      <Tab.Screen name='Inbox' component={Inbox} />
      <Tab.Screen name='Profile' component={Profile} />
      <Tab.Screen name='Settings' component={Settings} />

    </Tab.Navigator >
  )
}

export default function MemberScreens() {
  const { Logout } = useContext(AuthContext)

  return (
    <>
      {/* 
      <Drawer.Navigator
        drawerContent={props => <MemberCustomDrawer  {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: '#f2f2f2',
          drawerActiveTintColor: 'black',
          drawerActiveBackgroundColor: '#b3b3b3',

        }}

      >
        <Drawer.Screen name='home' component={MemberStacks} />

      </Drawer.Navigator> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='AllStack' component={MyTab} />
        <Stack.Screen name='search' component={Search} />
        <Stack.Screen name='MemberSingleProject' component={MemberSingleProject} />
        <Stack.Screen name='addwork' component={AddWork} />
        <Stack.Screen name='SingleWork' component={SingleWork} />
        <Stack.Screen name='EditProfile' component={EditProfile} />

      </Stack.Navigator>

    </>
  )
}
