import { ActivityIndicator, Dimensions, Image, ImageBackground, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../AuthContext'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Basepath } from '../Global';


const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

export default function EditProfile({ navigation }) {
    let { RefreshPage, refresh, MemberStyles, membertheme, memberdetail } = useContext(AuthContext)
    const [image, setImage] = useState(null);
    const [memberdetailData, setMemberDetail] = useState(memberdetail);
    const [spinner, setSpinner] = useState(false);
    const [successImage, setSuccessImage] = useState(null);

    const handleChange = (name, value) => {
        setSpinner(false)
        setMemberDetail({ ...memberdetailData, [name]: value })
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
        }

    }

    const GetPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!status == 'granted') {
            console.log('Permission Denied');
        }
    }

    useFocusEffect(
        useCallback(() => {
            GetPermission()
            setImage(null)
        }, [])
    )

    const SubmitUpdate = async () => {
        setSpinner(true)
        if(image){
            let newfile = {
                uri: image,
                type: `test/${image.split('.')[1]}`,
                name: `test/${image.split('.')[1]}`
            }
            const data = new FormData()
            data.append('file', newfile)
            data.append('upload_preset', 'TrackerMembers')
            data.append('cloud_name', 'dnk7llops')
    
            try {
                const response = await fetch('https://api.cloudinary.com/v1_1/dnk7llops/image/upload', {
                    method: 'POST',
                    body: data,
                });
                const result = await response.json();
                
                setSuccessImage(result)
               
    
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        let newPublicId = successImage?.public_id
        console.log(successImage?.secure_url);
        let newAvtar = (successImage?.secure_url)
        let value = { ...memberdetailData, newImage: newAvtar, newPublicId }
        console.log(value);
        await axios.post(`${Basepath}/member/update/${memberdetail._id}`, value)
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    navigation.goBack()
                    setSpinner(false)
                }
            })
            .catch((err) => {
                console.log(err);
            })






        console.log('Submit Update.........');
        console.log(memberdetailData);

    }

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
            marginTop: 20,
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

        mainDetailDiv: {
            paddingHorizontal: 10,
            marginTop: 18,
            // backgroundColor: 'yellow',
        },
        AboutDiv: {
            marginBottom: 20
        },
        AboutHeaderText: {
            fontWeight: '500',
            fontSize: 17,
            color: MemberStyles.color,
            marginBottom: 10,
        },
        aboutDescText: {
            fontSize: 14,
            padding: 5,
            color: MemberStyles.GreyWhite,
            alignItems:'center'
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
            marginVertical: 8,

            // backgroundColor:'red',
            width: windowwidth - 20
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

        //  Edit Input
        input: {
            width: '90%',
            borderRadius: 15,
            marginBottom: 5,
            backgroundColor: MemberStyles.ModalInput,
            height: 50,
            paddingHorizontal: 15,
            color: MemberStyles.color,

            // elevation: 1,

            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 1,
        },
        // Submit Button
        ContinueBtn: {
            width: windowwidth - 20,
            borderRadius: 15,
            marginBottom: 10,
            backgroundColor: "rgb(76, 104, 136)",
            height: 50,
            paddingHorizontal: 15,
            elevation: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
        },
        BtnText: {
            fontSize: 18,
            color: 'white',
            fontWeight: '500',
            letterSpacing: 1
        }

    })

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
                            <Text style={styles.headerText}>Edit Profile</Text>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                {/* <Ionicons color={MemberStyles.color} name='checkmark-outline' size={25} onPress={SubmitUpdate} /> */}
                            </TouchableOpacity>
                        </View>

                        {/* Profile Image Div */}
                        <View style={styles.profile}>
                            <TouchableOpacity activeOpacity={0.7} onPress={PermissionandLibrary}>
                                <View style={styles.profileImageWrapper}>
                                    <Image style={styles.profileAvtar} source={{ uri: image || memberdetailData?.avtar }} />
                                    <View style={styles.profileAction}>
                                        <Feather name='edit-3' size={20} color={'white'} />
                                    </View>
                                </View>

                            </TouchableOpacity>
                            <Text style={styles.profileName}>{memberdetailData?.name}</Text>
                            <TextInput placeholderTextColor={MemberStyles.color} style={styles.profileAddress} value={memberdetailData?.address} onChangeText={(value) => handleChange('address', value)} placeholder='No place added' />
                        </View>
                    </ImageBackground>
                    <View style={styles.mainDetailDiv}>
                        {/* About  */}
                        <View style={styles.AboutDiv}>
                            <Text style={styles.AboutHeaderText}>About </Text>
                            <TextInput numberOfLines={2} multiline placeholderTextColor={MemberStyles.GreyWhite} placeholder='No description added' style={[styles.input, { minHeight: 80, width: '100%' }]} value={memberdetailData.description} onChangeText={(value) => handleChange('description', value)} />
                        </View>
                        {/* other Personal details about member */}
                        <View style={styles.PersonalDetailDiv}>
                            <Text style={styles.PersonalHeaderText}>Personal Details</Text>
                            <View style={styles.memberPhoneEmailDiv}>  
                                <Ionicons style={styles.memberPersonalIcon} name='call' />
                                <TextInput placeholderTextColor={MemberStyles.GreyWhite} placeholder='No phone number added' keyboardType='numeric' style={styles.input} onChangeText={(value) => handleChange('phone', value)} value={memberdetailData?.phone} />

                            </View>
                            <View style={styles.memberPhoneEmailDiv}>
                                <Ionicons style={[styles.memberPersonalIcon, { color: 'grey' }]} name='mail' />
                                <TextInput placeholderTextColor={MemberStyles.GreyWhite}  placeholder='No email  added' style={styles.input} value={memberdetailData.email} onChangeText={(value) => handleChange('email', value)} />
                            </View>

                            {/* <View style={styles.memberPhoneEmailDiv}>
                                <Ionicons style={[styles.memberPersonalIcon, { color: 'grey' }]} name='lock-closed' />
                                <TextInput placeholder='No password ' style={styles.input} value={memberdetailData.password} onChangeText={(value) => handleChange('password', value)} />
                            </View> */}
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity activeOpacity={0.8} onPress={SubmitUpdate} style={styles.ContinueBtn}>
                            {spinner ? (
                                <ActivityIndicator color={'black'} size={25}/>
                            ) :
                                <Text style={styles.BtnText}>Submit</Text>
                            }
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </TouchableOpacity></SafeAreaView>

    )
}
