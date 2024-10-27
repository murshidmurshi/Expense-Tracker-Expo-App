import React, { useCallback, useContext, useEffect } from 'react'
import AppStack from './AppStack'
import AuthStack from './AuthStack'
import MemberScreens from './AllMemberScreen/MemberScreens'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native'
import { AuthContext } from './AuthContext'
import { ActivityIndicator, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function MainNav() {
  const { memberToken, adminToken, isloading } = useContext(AuthContext)
  useEffect(()=>{
    console.log('memberToken:', memberToken);
    console.log('adminToken:', adminToken);
  },[])
 
  return (
    <>
      {isloading ? (
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator color={'grey'} size={40} />
        </View>
      ) : (
        <NavigationContainer>
          {adminToken !== null ?
            <AppStack />
            : memberToken !== null ?
              <MemberScreens />
              : <AuthStack />}
        </NavigationContainer>
      )}



    </>
  )
}
