import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './AllMainScreen/Home'
import Setting from './AllMainScreen/Setting'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

import { Dimensions, View } from 'react-native'
import AddProject from './AllMainScreen/AddProject'
import PieChart from './AllMainScreen/PieChart'
import SingleProject from './AllMainScreen/SingleProject'
import AddMember from './AllMainScreen/AddMember'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './AllMainScreen/CustomDrawer'
// import AllMember from './AllMainScreen/SearchMember'
import Message from './AllMainScreen/Message'
import SearchMember from './AllMainScreen/SearchMember'
import SingleWorkAdmin from './AllMainScreen/SingleWorkAdmin'
import AllPayment from './AllMainScreen/AllPayment'
import AllWork from './AllMainScreen/AllWork'
import { AuthContext } from './AuthContext'


const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

const Drawer = createDrawerNavigator();

const BottomTab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()



const MyIcons = (route, focused) => {
  let {AdminStyles}=useContext(AuthContext);
  let icons;
  if (route.name === 'Home') {
    icons = focused ? (
      <Feather name='home' color={AdminStyles.tabBarIcon}  size={30} />
    ) : (
      <Feather name='home' color={AdminStyles.tabBarIcon} size={25} />
    )
  }
  else if (route.name === 'Addproject') {
    icons = focused ? (
      <Ionicons name='add-circle-sharp' color={AdminStyles.tabBarIcon} size={30} />
    ) : (
      <Ionicons name='add-circle-outline' color={AdminStyles.tabBarIcon} size={25} />
    )
  }
  else if (route.name === 'Message') {
    icons = focused ? (
      <Feather name='message-square'color={AdminStyles.tabBarIcon} size={30} />
    ) : (
      <Feather name='message-square' color={AdminStyles.tabBarIcon} size={25} />
    )
  }
  else if (route.name === 'Setting') {
    icons = focused ? (
      <Feather name='settings' color={AdminStyles.tabBarIcon} size={30} />
    ) : (
      <Feather name='settings'  color={AdminStyles.tabBarIcon} size={25} />
    )
  }
  return (
    <View>
      {icons}
    </View>
  )
}


const StackNav = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='AllstackScreen' component={MyTab} />
    <Stack.Screen name='PieChart' component={PieChart} options={{ headerShown: true }} />
    <Stack.Screen name='SingleProject' component={SingleProject} />
    <Stack.Screen name='AddMember' component={AddMember} />
    <Stack.Screen name='SearchMember' component={SearchMember} />
    <Stack.Screen name='SingleWorkAdmin' component={SingleWorkAdmin} />
    <Stack.Screen name='AllProjectPayment' component={AllPayment} />
    <Stack.Screen name='AllWork' component={AllWork} />

  </Stack.Navigator>
)
const MyTab = () => {
  const {theme}=useContext(AuthContext)
  return (
    <>
      <BottomTab.Navigator
      
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => MyIcons(route, focused),
          headerShown: false,
          tabBarHideOnKeyboard:true,
          tabBarActiveBackgroundColor:theme=='dark'?'rgb(38, 38, 38)':'rgba(235, 232, 232, 0.649)',
        //  tabBarInactiveBackgroundColor:theme=='dark'?'black':'white',
         tabBarVisibilityAnimationConfig:true,
        
         tabBarStyle:{
          height:57,
          backgroundColor:theme=='dark'?'black':'white',
        
         },
         tabBarLabelStyle:{
          display:'none'
         }
        })}
      >
        <BottomTab.Screen name='Home' component={Home}  />
        <BottomTab.Screen name='Addproject' component={AddProject} options={{tabBarLabel:'Project'}} />
        <BottomTab.Screen name='Message' component={Message} />
        <BottomTab.Screen name='Setting' component={Setting} />
      </BottomTab.Navigator>

    </>
  )
}
export default function AppStack() {
  const {AdminStyles}=useContext(AuthContext)

  return (
    <>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer  {...props} />}
        screenOptions={{
          headerShown: false,
          // drawerActiveBackgroundColor: 'red',
          // drawerActiveTintColor: 'red',
          drawerActiveBackgroundColor:AdminStyles.backgroundColor,
          

        }}

      >
        <Drawer.Screen  name="Home"  component={StackNav} options={{
          drawerIcon: ({  size }) => (
            <Ionicons name="home" size={size} color={AdminStyles.color} />
          ),
          drawerLabelStyle:{
            color:AdminStyles.color
          }
          
        }} />
        <Drawer.Screen  name="Settings" component={Setting} options={{
          drawerIcon: ({  size }) => (
            <Ionicons name="settings" size={size} color={AdminStyles.color} />
          ),
          drawerLabelStyle:{
            color:AdminStyles.color
          }
        }} />
      </Drawer.Navigator>



    </>
  )
}
