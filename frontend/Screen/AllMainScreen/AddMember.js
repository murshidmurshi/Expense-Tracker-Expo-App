import axios from 'axios';
import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, SafeAreaView, Dimensions, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import { Basepath } from '../Global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../AuthContext';

const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

export default function AddMember({ navigation }) {
    let {AdminStyles} = useContext(AuthContext);

    const [memberValue, setMemberValue] = useState({})
    const handleChange = (type, value) => {
        setMemberValue({ ...memberValue, [type]: value })

    }
    const Submit = async () => {
        console.log('AddMember');
        console.log(memberValue);

        if (!memberValue.name || !memberValue.email || !memberValue.phone || !memberValue.password ) {
            alert('Input Cannot be Empty')
        } else {
            let defaulAvtar='https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais'
            let result = { ...memberValue, avtar:defaulAvtar}
            console.log(result, 'AfterSperead');
            await axios.post(`${Basepath}/member/register`, result)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        console.log(res.data.savedMember._id);
                        navigation.goBack()
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }

    // Sytles

    
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: AdminStyles.backgroundColor,
        width: windowwidth,
        height: windowheight
    },
    MainHeader: {
        // backgroundColor: 'red',
        padding: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '500',
        paddingHorizontal: 20,
        color:AdminStyles.color
    },
    MainMemberFormDiv: {
        // backgroundColor: 'yellow',
        flex: 1,
        margin: 5,
        alignItems: "center",

    },
    inputLabel: {
        color:AdminStyles.GreyWhite,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontWeight: "500",
    },

    input: {
        width: windowwidth - 20,
        borderRadius: 15,
        marginBottom: 7,
        backgroundColor:AdminStyles.ModalInput,
        height: 50,
        paddingHorizontal: 15,
        color:AdminStyles.color,
        // elevation: 1,

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    ContinueBtn: {
        width: windowwidth - 20,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: "rgb(61, 129, 61)",
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
        <>
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.MainHeader}>
                    <Ionicons color={AdminStyles.color} onPress={() => navigation.goBack()} name='chevron-back-outline' size={22} />
                    <Text style={styles.headerText}>Add member</Text>

                </View>
                {/* memberDetail */}
                <View style={styles.MainMemberFormDiv}>

                    <View >
                        <Text style={styles.inputLabel}>Name</Text>
                        <View style={styles.inputDiv}>
                            <TextInput value={memberValue.name} placeholderTextColor={AdminStyles.GreyWhite} onChangeText={(name) => handleChange('name', name)} style={styles.input} placeholder='Enter member name' />
                        </View>
                    </View>

                    
                    <View >
                        <Text style={styles.inputLabel}>Phone</Text>
                        <View style={styles.inputDiv}>
                            <TextInput placeholderTextColor={AdminStyles.GreyWhite} keyboardType='numeric' value={memberValue.phone} onChangeText={(phone) => handleChange('phone', phone)} style={styles.input} placeholder='Enter member phone number' />
                        </View>
                    </View>
                    <View >
                        <Text style={styles.inputLabel}>Email</Text>
                        <View style={styles.inputDiv}>
                            <TextInput placeholderTextColor={AdminStyles.GreyWhite} value={memberValue.email} onChangeText={(email) => handleChange('email', email)} style={styles.input} placeholder='Enter member email' />
                        </View>
                    </View>
                    <View >
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={styles.inputDiv}>
                            <TextInput placeholderTextColor={AdminStyles.GreyWhite} value={memberValue.password} onChangeText={(password) => handleChange('password', password)} style={styles.input} placeholder='Enter secure password' />
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity onPress={Submit} style={styles.ContinueBtn}>
                        <Text style={styles.BtnText}>Continue</Text>
                    </TouchableOpacity>

                </View>


            </SafeAreaView>

        </>
    )
}
