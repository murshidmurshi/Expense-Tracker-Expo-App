import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext'

export default function Inbox() {
  let {  RefreshPage, refresh, MemberStyles,membertheme } = useContext(AuthContext)

  return (
    <View style={{backgroundColor:MemberStyles.backgroundColor,flex:1}}>
      <Text style={{color:MemberStyles.color}}>Inbox</Text>
    </View>
  )
}

const styles = StyleSheet.create({})