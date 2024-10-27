import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react'
import { View, Text, ImageBackground, Image, StatusBar, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MemberCustomDrawer(props) {
    const { Logout } = useContext(AuthContext)
   
    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#d8e5f3' }}>

                <DrawerContentScrollView
                    {...props}
                >
                    <ImageBackground source={{ uri: 'https://img.freepik.com/free-photo/purple-wallpapers-that-are-purple-iphone_1340-39188.jpg' }} style={{ padding: 20, marginTop: -10, height: 140 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Image
                                source={{ uri: 'https://img.freepik.com/premium-photo/cartoon-character-with-blue-shirt-glasses_561641-2084.jpg?size=626&ext=jpg&ga=GA1.1.1237794424.1697694001&semt=ais' }}
                                height={50}
                                width={50}
                                style={{ borderRadius: 999 }}
                            />

                            <Text style={{ color: 'white', fontSize: 16 }}>Murshid</Text>
                        </View>

                    </ImageBackground>

                    <View style={{ paddingTop: 10 }}>

                        <DrawerItemList {...props} />
                    </View>

                </DrawerContentScrollView>
                <View style={{ padding: 20, borderTopWidth: 0.5, borderTopColor: 'grey' }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={Logout}>

                        <Ionicons name='log-out-outline' size={25} />
                        <Text style={{ marginLeft: 15, marginTop: 4 }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </>
    )
}
