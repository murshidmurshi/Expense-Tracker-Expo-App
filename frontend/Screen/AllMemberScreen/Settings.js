import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import { Dimensions } from 'react-native';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;


export default function Settings({ navigation }) {
  let { Logout,membertheme,setMemberTheme,MemberStyles } = useContext(AuthContext)
  let checktheme=membertheme=='dark'?true:false
  const [isEnabled, setIsEnabled] = useState(checktheme);
  const toggleSwitch = async () => {
    try {
      if (isEnabled) {
        console.log('Enalbrs');
        // Set theme to "light" and save in AsyncStorage
        AsyncStorage.setItem('memberTheme', 'light');
        setMemberTheme('light');
      } else {
        // Set theme to "dark" and save in AsyncStorage
        AsyncStorage.setItem('memberTheme', 'dark');
        setMemberTheme('dark');
      }

      setIsEnabled((previousState) => !previousState);
    } catch (error) {
      console.error('Error toggling switch and saving theme:', error);
    }
  };


  const SECTIONS = [
    {
      header: 'General',
      icon: 'setting',
      items: [
        { icons: 'globe', color: 'orange', label: 'Currency', },
        { icons: 'bell', color: 'grey', label: 'Reminder', },

      ]
    },
    {
      header: 'preferences',
      icon: 'setting',
      items: [
        { icons: 'globe', color: 'orange', label: 'Language', },
        { icons: 'bell', color: 'grey', label: 'Notifications' },
        { id: 'darkmode', icons: 'moon', color: 'blue', label: 'Dark Mode', type: 'toggle' },

      ]
    },

    {
      header: 'Export Data',
      items: [
        { icons: 'database', color: 'grey', label: 'Export to Excel', },
      ]
    },
    // {
    //     header: 'Backup data',
    //     icon: 'help-circle',
    //     items: [
    //         { icons: 'database', color: 'grey', label: 'Local Back Up',  },
    //     ]
    // },
    {
      header: 'other',
      icon: 'help-circle',
      items: [
        { icons: 'log-out', color: 'grey', label: 'Logout', FUNCTION: Logout },
      ]
    },
  ]

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor:MemberStyles.backgroundColor,
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
      color: MemberStyles.color,
      // backgroundColor:'yellow',
    },
    mainDiv: {
      paddingHorizontal: 10,
      marginTop: 5,
      // backgroundColor:'yellow'
    },
    // search 
    SearchDiv: {
      alignSelf: 'center',
      flexDirection: 'row',
      backgroundColor: 'white',
      height: 43,
      margin: 8,
      // marginBottom: 10,
      borderRadius: 10,
      padding: 10,
      elevation: 1,
      width: windowwidth - 20,
    },
    SearchIcon: {
      // backgroundColor:'red',
      // color,
      paddingHorizontal: 5
    },

    // Setting map
    sections: {
      paddingHorizontal: 5,
  },
  sectionsHeader: {
      fontSize: 13,
      paddingVertical: 12,
      textTransform: 'uppercase',
      letterSpacing: 1.1,
      fontWeight: 'bold',
      color:MemberStyles.GreyWhite
  },
  row: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: (membertheme=='dark'?'rgba(88, 87, 87, 0.907)':'rgb(242, 242, 242)'),
      marginBottom: 12,
      paddingHorizontal: 10,
      borderRadius:12


  },
  rowIcon: {
      width: 32,
      height: 32,
      borderRadius: 999,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
  },
  rowLabel: {
      fontSize: 15,
      color: MemberStyles.GreyWhite
  },
  })
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        {/* main Header */}
        <View style={styles.MainHeader}>
          <Ionicons color={MemberStyles.color} onPress={() => navigation.goBack()} name='chevron-back-outline' size={22} />
          <Text style={styles.headerText}>Settings</Text>
        </View>

        <View style={styles.mainDiv}>

          {/* <View style={styles.SearchDiv}>
            <Ionicons style={styles.SearchIcon} name='search-outline' size={20} />
            <TextInput placeholder='Search ' onChangeText={handleSearch} />
          </View> */}

          {/* map the setting */}
          {SECTIONS.map(({ header, items,index }) => {
            return (
              <>
                <View key={index} style={styles.sections}>
                  <Text style={styles.sectionsHeader}>{header}</Text>

                  {items.map(({ id, label, type, icons, FUNCTION }) => (
                    <TouchableOpacity activeOpacity={0.7} onPress={FUNCTION}>

                      <View style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: 'rgba(157, 157, 157, 0.365)' }]}>
                          <Feather color={MemberStyles.color} name={icons} size={19} />
                        </View>

                        <Text style={styles.rowLabel}>{label}</Text>
                        <View style={{ flex: 1 }} />

                        {type === 'toggle' && (
                          <Switch

                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? 'grey' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                          />
                        )}
                        {type === 'link' && (
                          <Feather name='chevron-right' color={'#0c0c0c'} size={18} />
                        )}

                      </View>
                    </TouchableOpacity>
                  ))}

                </View>

              </>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

