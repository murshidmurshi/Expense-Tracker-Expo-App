import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext';

export default function Message() {
  let { AdminStyles } = useContext(AuthContext);


  const styles = StyleSheet.create({
    mainContainer:{
      backgroundColor:AdminStyles.backgroundColor,
      flex:1
    }
  })
  return (
    <SafeAreaView style={styles.mainContainer}>
<ScrollView>
  <Text style={{color:AdminStyles.color}}>Message</Text>
</ScrollView>
    </SafeAreaView>
  )
}

