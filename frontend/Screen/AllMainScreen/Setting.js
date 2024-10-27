import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useContext, useState } from 'react'
import { View, Text, SafeAreaView, StatusBar, ScrollView, StyleSheet, TouchableOpacity, Image, Switch, RefreshControl, Appearance } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import * as ImagePicker from 'expo-image-picker';

import { Basepath } from '../Global'
import axios from 'axios'
import { useRef } from 'react';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Setting({ navigation }) {
    const { Logout,refresh, RefreshPage, admin_details, theme, setTheme,AdminStyles } = useContext(AuthContext)
    console.log(theme);
    Appearance.addChangeListener((schema) => {
        console.log(schema, 'schemaschemaschema');
        setTheme(schema.colorScheme)

    })
    let checktheme=theme=='dark'?true:false
    const [isEnabled, setIsEnabled] = useState(checktheme);

    const toggleSwitch = async () => {
        try {
            if (isEnabled) {
                console.log('Enalbrs');
                // Set theme to "light" and save in AsyncStorage
                 AsyncStorage.setItem('adminTheme', 'light');
                setTheme('light');
            } else {
                // Set theme to "dark" and save in AsyncStorage
                 AsyncStorage.setItem('adminTheme', 'dark');
                setTheme('dark');
            }

            setIsEnabled((previousState) => !previousState);
        } catch (error) {
            console.error('Error toggling switch and saving theme:', error);
        }
    };



    // const containerStyle = isEnabled
    // ? {backgroundColor:'black'}
    // : {backgroundColor:'white'}

    // const [admin_details, setAdminDetail] = useState({})
    const bottomSheetModalRef = useRef(null);
    const [image, setImage] = useState(null);

    const openBottomSheet = () => {
        bottomSheetModalRef.current.present()
    }

    const PermissionandLibrary = async () => {
        GetPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        })


        if (!result.canceled) {
            const uriValue = result.assets[0].uri
            setImage(uriValue);
            let newfile = {
                uri: uriValue,
                type: `test/${uriValue.split('.')[1]}`,
                name: `test/${uriValue.split('.')[1]}`
            }
            const data = new FormData()
            data.append('file', newfile)
            data.append('upload_preset', 'TrackerAdmin')
            data.append('cloud_name', 'dnk7llops')

            try {
                const response = await fetch('https://api.cloudinary.com/v1_1/dnk7llops/image/upload', {
                    method: 'POST',
                    body: data,
                });
                const result = await response.json();
                let newPublicId = result.public_id
                console.log(result.secure_url);
                let newAvtar = (result.secure_url)

                await axios.post(`${Basepath}/admin/update/${admin_details._id}`, { newImage: newAvtar, newPublicId })
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })


            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

    }

    const GetPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!status == 'granted') {
            console.log('Permission Denied');
        }
    }

    console.log(image);
    useFocusEffect(
        useCallback(() => {
            GetPermission()

            setImage(null)
        }, [refresh])
    )


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
                { icons: 'log-out', color: 'grey', label: 'Logout', FUNCTION:Logout},
            ]
        },
    ]


    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: AdminStyles.backgroundColor,
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
        },
        headerText: {
            fontSize: 18,
            fontWeight: '500',
            paddingHorizontal: 20,
            color:AdminStyles.color
            // backgroundColor:'yellow',
        },
        profile: {
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center'

        },
        profileName: {
            marginTop: 20,
            fontWeight: 'bold',
            fontSize: 19,
            textAlign: 'center',
            color: AdminStyles.color
        },
        profileAddress: {
            marginTop: 5,
            fontSize: 16,
            textAlign: 'center',
            color: AdminStyles.color,
        },
        profileAvtar: {
            height: 72,
            width: 72,
            borderRadius: 9999
        },
        profileImageWrapper: {
            position: 'relative'

        },
        profileAction: {
            backgroundColor: 'grey',
            width: 28,
            height: 28,
            borderRadius: 9999,
            alignItems: 'center',
            justifyContent: 'center',
            position: "absolute",
            bottom: -12,
            right: -4
        },
        sections: {
            paddingHorizontal: 20
        },
        sectionsHeader: {
            fontSize: 13,
            paddingVertical: 12,
            textTransform: 'uppercase',
            letterSpacing: 1.1,
            fontWeight: 'bold',
            color:AdminStyles.GreyWhite
        },
        row: {
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: (theme=='dark'?'rgba(88, 87, 87, 0.907)':'rgb(242, 242, 242)'),
            borderRadius: 8,
            marginBottom: 12,
            paddingHorizontal: 10,

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
            color: AdminStyles.GreyWhite
        },

        // Bottom Model
        bottomModelDiv: {
            flex: 1,
            padding: 9,
        },
        AdminDetailDiv: {
            // backgroundColor:'red',
            padding: 5,
            flex: 1
        }
    })
    return (
        <>
            <SafeAreaView style={[styles.mainContainer]}>
                <TouchableOpacity activeOpacity={5} >
                    <ScrollView contentContainerStyle={styles.container}
                        refreshControl={
                            <RefreshControl refreshing={refresh} onRefresh={() => RefreshPage()} />
                        }
                    >
                        {/* main Header */}
                        <View style={styles.MainHeader}>
                            <Ionicons style={{ color: AdminStyles.color }} onPress={() => navigation.goBack()} name='chevron-back-outline' size={22} />
                            <Text style={styles.headerText}>Settings</Text>
                        </View>

                        <View style={styles.profile}>
                            <TouchableOpacity activeOpacity={0.7} onPress={PermissionandLibrary} >
                                <View style={styles.profileImageWrapper}>
                                    <Image style={styles.profileAvtar} source={{ uri: image || admin_details?.avtar }} />
                                    <View style={styles.profileAction}>
                                        <Feather name='edit-3' size={20} color={'white'} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.profileName}>{admin_details?.name}</Text>
                            <Text style={styles.profileAddress}>{admin_details?.address}</Text>
                        </View>

                        {/* map the setting */}
                        {SECTIONS.map(({ header, items,index }) => {
                            return (
                                <>

                                    <View key={index} style={styles.sections}>
                                        <Text style={styles.sectionsHeader}>{header}</Text>

                                        {items.map(({ label, type, icons,FUNCTION },index) => (
                                            <TouchableOpacity key={index} activeOpacity={0.7} onPress={FUNCTION}>

                                                <View style={styles.row}>
                                                    <View style={[styles.rowIcon, { backgroundColor: 'rgba(157, 157, 157, 0.365)' }]}>
                                                        <Feather name={icons} color={AdminStyles.color} size={19} />
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
                    </ScrollView>
                </TouchableOpacity>

            </SafeAreaView>


            {/* Bottom Model */}
            <BottomSheetModalProvider >
                <BottomSheetModal
                    containerStyle={{ backgroundColor: 'rgba(128, 128, 128, 0.236)' }}
                    ref={bottomSheetModalRef}

                    snapPoints={['65%', '40%', '75%', '90%',]}
                >
                    <View style={styles.bottomModelDiv}>
                        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.AdminDetailDiv}>


                            </View>



                        </BottomSheetScrollView>
                    </View>

                </BottomSheetModal>
            </BottomSheetModalProvider>

        </>
    )
}

