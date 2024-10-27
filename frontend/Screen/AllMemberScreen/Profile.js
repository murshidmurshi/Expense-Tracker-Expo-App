import { Image, ImageBackground, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { AuthContext } from '../AuthContext'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import { useFocusEffect } from '@react-navigation/native';

export default function Profile({ navigation }) {
  let { RefreshPage, refresh, MemberStyles, membertheme, memberdetail, MemberSingleProjectData } = useContext(AuthContext)

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: MemberStyles.backgroundColor,
      flex: 1
    },
    container: {
      flex: 1
    },

    // main Header
    MainHeader: {
      padding: 10,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: 'red'
    },
    headerText: {
      fontSize: 18,
      fontWeight: '500',
      paddingHorizontal: 20,
      color: MemberStyles.color
      // backgroundColor:'yellow',
    },
    // Profile
    profile: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'

    },
    profileName: {
      marginTop: 10,
      fontWeight: 'bold',
      fontSize: 19,
      textAlign: 'center',
      color: MemberStyles.color
    },
    profileAddress: {
      marginTop: 5,
      fontSize: 16,
      textAlign: 'center',
      color: MemberStyles.color,
    },
    profileAvtar: {
      height: 72,
      width: 72,
      borderRadius: 9999
    },
    profileImageWrapper: {
      position: 'relative'
    },

    mainDetailDiv: {
      paddingHorizontal: 10,
      marginTop: 18,
      // backgroundColor: 'yellow',
    },
    AboutDiv: {
      // backgroundColor: 'red'
    },
    AboutHeaderText: {
      fontWeight: '500',
      fontSize: 17,
      color: MemberStyles.color
    },
    aboutDescText: {
      fontSize: 14,
      padding: 5,
      color: MemberStyles.GreyWhite
    },
    // Personal Details
    PersonalDetailDiv: {
      // backgroundColor:'red',
      marginVertical: 15
    },
    PersonalHeaderText: {
      fontWeight: '500',
      fontSize: 17,
      marginBottom: 10,
      color:MemberStyles.color
    },
    memberPhoneEmailDiv: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8
    },
    memberPersonalIcon: {
      fontSize: 20,
      color: MemberStyles.GreenColor,
      paddingHorizontal: 5,
    },
    memberPersonalValue: {
      paddingHorizontal: 6,
      color: 'grey',
      fontSize: 15
    },

  })

  useFocusEffect(
    useCallback(() => {
      MemberSingleProjectData()
    }, [])
  )
  return (
    <SafeAreaView style={[styles.mainContainer]}>
      <TouchableOpacity activeOpacity={5} >
        <ScrollView contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={() => RefreshPage()} />
          }
        >
          <ImageBackground style={{ borderRadius: 100 }} source={{ uri: membertheme == 'dark' ? 'https://img.freepik.com/free-vector/seamless-gold-rhombus-grid-pattern-black-background_53876-97589.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' : 'https://img.freepik.com/free-vector/blue-curve-frame-template-vector_53876-162343.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' }}>

            {/* main Header */}
            <View style={styles.MainHeader}>
              <Ionicons color={MemberStyles.color} onPress={() => navigation.goBack()} name='chevron-back-outline' size={22} />
              <Text style={styles.headerText}>Profile</Text>
              <View style={{ flex: 1 }} />
              <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                <Feather color={MemberStyles.color} name='edit-2' size={22} />
              </TouchableOpacity>
            </View>

            {/* Profile Image Div */}
            <View style={styles.profile}>
              <TouchableOpacity activeOpacity={0.7}  >
                <View style={styles.profileImageWrapper}>
                  <Image style={styles.profileAvtar} source={{ uri: memberdetail?.avtar }} />

                </View>
              </TouchableOpacity>
              <Text style={styles.profileName}>{memberdetail?.name}</Text>
              <Text style={styles.profileAddress}>{memberdetail?.address || 'no place'}</Text>
            </View>
          </ImageBackground>

          <View style={styles.mainDetailDiv}>

            {/* About  */}
            <View style={styles.AboutDiv}>
              <Text style={styles.AboutHeaderText}>About </Text>
              <Text style={styles.aboutDescText}>{memberdetail.description ? memberdetail.description : 'no description'}</Text>
            </View>

            {/* other Personal details about member */}
            <View style={styles.PersonalDetailDiv}>
              <Text style={styles.PersonalHeaderText}>Personal Details</Text>
              <View style={styles.memberPhoneEmailDiv}>
                <Ionicons style={styles.memberPersonalIcon} name='call' />
                <Text style={styles.memberPersonalValue}>{memberdetail.phone}</Text>
              </View>
              <View style={styles.memberPhoneEmailDiv}>
                <Ionicons style={[styles.memberPersonalIcon, { color: 'grey' }]} name='mail' />
                <Text style={styles.memberPersonalValue}>{memberdetail.email}</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </TouchableOpacity></SafeAreaView>

  )
}
