import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react'
import { View, Text, ImageBackground, Image, StatusBar, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Basepath } from '../Global';

export default function CustomDrawer(props) {
    const { Logout,admin_details,GetAdminDetail,refresh, AdminStyles } = useContext(AuthContext)
    // const [admin_details, setAdminDetail] = useState({})
    useFocusEffect(
        useCallback(() => {
            GetAdminDetail()
        }, [refresh])
    )

    return (
        <>
            <View style={{ flex: 1, backgroundColor: AdminStyles.cardBackGround }}>

                <DrawerContentScrollView
                    {...props}
                >
                    <View style={{margin:10,flexDirection:'row'}}>

                        <Image
                            source={{ uri: admin_details?.avtar }}
                            height={50}
                            width={50}
                            style={{ borderRadius: 100 }}
                        />
                        <Text style={{ color: AdminStyles.color, fontSize: 16,fontWeight:'500',paddingVertical:5,paddingHorizontal:10,alignSelf:'center' }}>{admin_details.name}</Text>
                    </View>
                    <View  style={{backgroundColor:AdminStyles.color,height:0.5,marginTop:15}}/>



                    <View style={{ paddingTop: 10 }}>
                        <DrawerItemList {...props} />
                    </View>

                </DrawerContentScrollView>
                <View style={{ padding: 20, }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={Logout}>

                        <Ionicons color={AdminStyles.color} name='log-out-outline' size={25} />
                        <Text style={{ marginLeft: 15, marginTop: 4,color:AdminStyles.color }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </>
    )
}
