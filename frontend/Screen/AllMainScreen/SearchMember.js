
import { View, Text, Button, Modal, StyleSheet, TextInput, Dimensions, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { Basepath } from '../Global'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRef } from 'react'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { AuthContext } from '../AuthContext'


const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

export default function SearchMember({ route, navigation }) {
    let {AdminStyles} = useContext(AuthContext);
    const { id, project_name } = route.params;
    const [allmember, setAllMember] = useState([])
    const [singleMember, setSingleMember] = useState({})
    const [memberRole, setMemberRole] = useState([])
    const bottomSheetModalRef = useRef(null);


    const [type, setType] = useState('')
    const [typeerror, setTypeError] = useState(false);
    const [filterData, setFilteredata] = useState(allmember)
    const [modalVisible, setModalVisible] = useState(false);

    const [selectedmembername, setSelectedMemberName] = useState('')
    const [selectedmemberid, setSelectedMemberId] = useState('')

    useFocusEffect(
        useCallback(() => {
            const allmember = async () => {
                await axios.get(`${Basepath}/member/view`)
                    .then((res) => {
                        // console.log(res.data);
                        let role = res.data.role
                        let members = res.data.member
                        setAllMember(members)
                        setFilteredata(members)
                        setMemberRole(role)

                    })
                    .catch((err) => {
                        console.log(err, 55555);
                    })
            }
            allmember()
            console.log(memberRole, 'MemberRole');
        }, [])
    )
    const handleSearch = (value) => {
        console.log(value);
        let vallue2 = allmember.filter((item) => (item.name).toLowerCase().includes(value.toLowerCase()))
        setFilteredata(vallue2)
    }
    const handleChangetype = (value) => {
        setTypeError(false)
        setType(value)
    }
    const AddMemberIconBtn = (member) => {
        console.log(member, 'AddIconBtn');
        setSelectedMemberName(member.name)
        setSelectedMemberId(member._id)
        setModalVisible(true)

    }

    const AddToProject = async () => {
        if (!type) {
            setTypeError(true)
        }
        else {
            console.log(id, type);
            let member = [{ id: selectedmemberid, type }] ///This is Project From Schema--defined
            await axios.put(`${Basepath}/project/update-project-member/${id}`, member)
                .then((res) => {
                    if (res.data.success) {
                        setModalVisible(false)
                        // navigation.navigate('SingleProject', { id: id })
                        navigation.goBack()
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }

    const handlebottomModel = (member) => {
        bottomSheetModalRef.current?.present();
        setSingleMember(member)
    }



    // Styles

    const styles = StyleSheet.create({
        //mainContainer
        mainContainer: {
            backgroundColor: AdminStyles.backgroundColor,
            flex: 1
        },
        BackIcon: {
            // backgroundColor:'red',
            paddingHorizontal: 7,
            color:AdminStyles.color
        },
        // searchDiv
        MainHeader: {
            // backgroundColor: 'yellow',
            // alignItems: 'center',
            // justifyContent: 'center',
            // flexDirection: 'row',
    
            padding: 10,
            paddingHorizontal: 15,
            flexDirection: 'row',
            // justifyContent: 'space-between'
    
        },
        BorderBottomText: {
            borderBottomWidth: 1,
            borderColor: '#f2f1f0',
        },
        headerText: {
            fontSize: 18,
            fontWeight: '500',
            paddingLeft: 15,
            color:AdminStyles.color,
            // backgroundColor:'red',
            width: windowwidth - 100,
        },
        SearchDiv: {
            alignSelf: 'center',
            flexDirection: 'row',
            backgroundColor: AdminStyles.cardBackGround,
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
            color:AdminStyles.color,
            paddingHorizontal: 5
        },
        AddmemberDiv: {
            paddingHorizontal: 20,
            paddingVertical: 5,
    
        },
        AddmemberText: {
            color: 'grey',
            fontWeight: '500'
    
    
        },
        ScrollViewDiv: {
            // backgroundColor: 'red',
            marginTop: 10,
            marginBottom: 62,
            marginHorizontal: 5
        },
        // memberDiv
        MemberDiv: {
            // backgroundColor: 'red',
            padding: 2
        },
        memberItem: {
            flexDirection: 'row',
            height: 55,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: AdminStyles.cardBackGround,
            borderRadius: 8,
            marginBottom: 2,
            paddingHorizontal: 10,
            // backgroundColor: 'yellow',
    
            // elevation: 5
    
        },
        memberImage: {
            height: 40,
            width: 40,
            borderRadius: 100
        },
        memberNameandCurrentWork: {
            // backgroundColor: 'red',
            paddingHorizontal: 5,
            width: "75%",
            overflow: 'hidden',
    
    
        },
        projectName: {
            // backgroundColor: 'green',
            flexDirection: 'row',
            overflow: 'hidden',
            paddingHorizontal: 10
        },
        MemberWorkingAreaText: {
            color: 'grey',
            // backgroundColor: 'red',
            fontSize: 12,
            paddingHorizontal: 2,
            flexDirection: 'row',
    
        },
        MemberLabel: {
            paddingHorizontal: 15,
            fontWeight: '500',
            fontSize: 15,
            color:AdminStyles.color
        },
        // Modal
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(136, 133, 133, 0.055)',
    
            // marginTop: 22,
        },
        modalView: {
            // margin: 20,
            backgroundColor: AdminStyles.ModalBackGround,
            borderRadius: 20,
            padding: 10,
            alignItems: 'center',
            width: windowwidth - 50,
            height: windowheight * 0.4,
            elevation: 2,
    
            // for ios
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
        },
        ModalDetailHeaderDiv: {
            alignItems: 'center',
            paddingBottom: 12
        },
        ModalDetailHeaderText: {
            color: AdminStyles.ModalHeader,
            fontWeight: '500',
            fontSize: 18,
            paddingHorizontal: 5
    
        },
        modalViewInside: {
            // backgroundColor: 'red',
            padding: 2,
            flex: 1,
            width: "100%",
            justifyContent: 'center'
        },
        ModelMemberNameInput: {
            backgroundColor:AdminStyles.ModalInput,
            padding: 2,
            borderRadius: 10,
            paddingHorizontal: 10,
            height: 45,
            marginBottom: 10,
            justifyContent: 'center'
        },
        ModelMemberTypeInput: {
            backgroundColor:AdminStyles.ModalInput,
            padding: 2,
            borderRadius: 10,
            paddingHorizontal: 10,
            height: 45,
            color:AdminStyles.color
            // elevation: 1
        },
        memberNameLabelText: {
            color:AdminStyles.GreyWhite,
            marginVertical: 5,
            paddingHorizontal: 5
        },
        memberNameValueText: {
            fontWeight: 'bold',
            fontSize: 17,
            color:AdminStyles.color
        },
        memberTypeLabelText: {
            color:AdminStyles.GreyWhite,
            marginVertical: 5,
            paddingHorizontal: 5
    
        },
        TypeErrorText: {
            color:AdminStyles.RedColor,
            textAlign: "center",
            fontSize: 12,
            paddingVertical: 2
        },
        ModelButtonsDiv: {
            // backgroundColor: 'grey',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginVertical: 15,
        },
        ModelBtn: {
            padding: 10,
            borderRadius: 15,
            color:AdminStyles.Modalbutton,
            width: 85,
            textAlign: 'center',
            textTransform: 'uppercase',
        },
    
    
        // Bottom Model
        bottomModelDiv: {
            flex: 1,
            padding: 9,
            backgroundColor:AdminStyles.ModalBackGround
        },
        singleMemberDiv: {
            // backgroundColor: 'green',
            padding: 5,
            flex: 1
        },
        imageandLocationDiv: {
            // backgroundColor: 'red',
            padding: 5,
            flexDirection: 'row'
    
        },
        ImageDiv: {
            // backgroundColor: 'yellow',
            padding: 5
    
        },
        ProfileImage: {
            height: 100,
            width: 100,
            borderRadius: 15,
    
        },
        locationandOtherDetail: {
            // backgroundColor: 'green',
            padding: 5,
            width: '60%',
            marginLeft: 10
        },
        NameText: {
            fontSize: 17,
            fontWeight: '500',
            color:AdminStyles.GreyWhite
    
        },
        IconandLocation: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        locationIcon: {
            color:AdminStyles.GreenColor,
            paddingVertical: 8
        },
        locationText: {
            color:AdminStyles.GreyWhite,
            paddingHorizontal: 3
        },
        PhoneandMessage: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 8
        },
        PhoneIconandNumber: {
            // backgroundColor: 'red',
            flexDirection: 'row',
            alignItems: 'center'
        },
        PhoneText: {
            color:AdminStyles.GreyWhite,
            paddingHorizontal: 5
        },
        HoriZonalLine: {
            backgroundColor: 'rgba(197, 197, 197, 0.975)',
            height: 1 * 0.3,
            marginVertical: 10
        },
        AboutDiv: {
            // backgroundColor: 'red'
        },
        AboutHeaderText: {
            fontWeight: '500',
            fontSize: 16,
            paddingHorizontal: 3,
            color:AdminStyles.color
    
        },
        AboutText: {
            paddingVertical: 8,
            paddingHorizontal: 4,
            color:AdminStyles.GreyWhite,
            fontSize: 14
    
        },
    
    
    
    
    
    })
    return (
        <>
            <SafeAreaView style={styles.mainContainer}>
                <View>
                    <View style={styles.MainHeader}>
                        <Ionicons onPress={() => navigation.goBack()} style={styles.BackIcon} name='chevron-back-outline' size={22} />
                        <Text numberOfLines={1} style={styles.headerText}>{project_name}</Text>
                    </View>
                    <View style={styles.SearchDiv}>
                        <Ionicons style={styles.SearchIcon} name='search-outline' size={20} />
                        <TextInput style={{color:AdminStyles.color}} placeholderTextColor={AdminStyles.color} placeholder='Search member' onChangeText={handleSearch} />
                    </View>
                    <View style={styles.AddmemberDiv}>
                        <Text onPress={() => navigation.navigate('AddMember')} style={styles.AddmemberText}>+ Add member</Text>
                    </View>
                    {/* <Text style={styles.BorderBottomText}></Text> */}

                    <ScrollView style={styles.ScrollViewDiv}>
                        {filterData.length == 0 ? (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'grey' }}>No member availabel</Text>
                            </View>
                        ) : ''}

                        {filterData.map((member, index) => (
                            <TouchableOpacity onPress={() => handlebottomModel(member)} activeOpacity={0.8} key={index} style={styles.MemberDiv}>
                                <View style={styles.memberItem}>
                                    <Image style={styles.memberImage} source={{ uri: member?.avtar }} />
                                    <View style={styles.memberNameandCurrentWork}>
                                        <Text style={styles.MemberLabel}>{member.name}</Text>
                                        <View style={styles.projectName}>

                                            {/* {memberRole[index]?.memberProjectName.map((projectName, index) => (
                                            <Text numberOfLines={1} key={index} style={styles.MemberWorkingAreaText}>{projectName} @ Abcd,</Text>
                                        ))} */}
                                            {/* 
                                        {memberRole[index]?.memberProjectName.map((projectName, index) => (
                                            <Text numberOfLines={1} ellipsizeMode='tail' key={index} style={styles.MemberWorkingAreaText}>
                                                {memberRole[index] == [] ? 'hello' : projectName} @ {memberRole[index]?.memberType[index]},
                                            </Text>
                                        ))} */}
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                    <TouchableOpacity activeOpacity={0.8} style={{ paddingHorizontal: 5 }}>
                                        <Ionicons name='person-add-outline' color={AdminStyles.GreyWhite} size={17} onPress={() => AddMemberIconBtn(member)} />
                                    </TouchableOpacity>
                                </View>


                            </TouchableOpacity>
                        ))}
                    </ScrollView>


                </View>
            </SafeAreaView>


            {/* Bottom Model */}
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    // index={0}
                    snapPoints={['65%', '40%', '75%', '95%',]}
                // onChange={BottomModelChange}
                >
                    {/* Content of your bottom sheet goes here */}
                    <View style={styles.bottomModelDiv}>
                        <View style={styles.singleMemberDiv}>
                            <View style={styles.imageandLocationDiv}>
                                <View style={styles.ImageDiv}>
                                    <Image style={styles.ProfileImage} source={{ uri: singleMember?.avtar }} />
                                </View>

                                <View style={styles.locationandOtherDetail}>
                                    <Text style={styles.NameText}>{singleMember?.name}</Text>

                                    <View style={styles.IconandLocation}>
                                        <Ionicons style={styles.locationIcon} name='location-outline' size={20} />
                                        {singleMember?.address ? (
                                            <Text style={styles.locationText}>{singleMember?.address}</Text>
                                        ) : (
                                            <Text style={styles.locationText}>not added</Text>
                                        )}
                                    </View>

                                    <View style={styles.PhoneandMessage}>

                                        <View style={styles.PhoneIconandNumber}>
                                            <Ionicons name='call-outline' color={'rgb(158, 158, 244)'} size={25} />
                                            <Text style={styles.PhoneText}>{singleMember?.phone}</Text>
                                        </View>

                                        <Ionicons name='chatbubble-ellipses-outline' color={'rgb(158, 158, 244)'} size={25} />
                                    </View>


                                </View>

                            </View>

                            <Text style={styles.HoriZonalLine}></Text>

                            {/* About member */}
                            <View style={styles.AboutDiv}>
                                <Text style={styles.AboutHeaderText}>About</Text>
                                {singleMember?.description ? (
                                    <Text style={styles.AboutText}>{singleMember?.description}</Text>

                                ) : (
                                    <Text style={styles.AboutText}>No description added</Text>

                                )}
                            </View>

                        </View>


                    </View>

                </BottomSheetModal>
            </BottomSheetModalProvider>


            {/* ModelView for Add Member to the Project */}
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
            >
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <View style={styles.modalViewInside}>
                            <View style={styles.ModalDetailHeaderDiv}>
                                <Text style={styles.ModalDetailHeaderText}>Add Project Member</Text>
                            </View>

                            <View>
                                <Text style={styles.memberNameLabelText}>Member name</Text>

                                <View style={styles.ModelMemberNameInput} >
                                    <Text style={styles.memberNameValueText}>{selectedmembername}</Text>
                                </View>

                            </View>
                            <View>
                                <Text style={styles.memberTypeLabelText}>Member type</Text>

                                <TextInput onChangeText={(value) => handleChangetype(value)} style={styles.ModelMemberTypeInput} placeholder='Member role in this project' />
                                {typeerror && (
                                    <Text style={styles.TypeErrorText}>Member type cannot be empty</Text>
                                )}


                            </View>
                            <View style={styles.ModelButtonsDiv}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(false)}>
                                    {/* <Image style={styles.ModelCancelBtn} source={{ uri: 'https://img.freepik.com/free-vector/red-prohibited-sign-no-icon-warning-stop-symbol-safety-danger-isolated-vector-illustration_56104-912.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' }} /> */}
                                    <Text style={[styles.ModelBtn,]}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={0.8} onPress={AddToProject}>
                                    <Text style={[styles.ModelBtn]}>Ok</Text>

                                </TouchableOpacity>


                            </View>



                        </View>

                    </View>
                </View>
            </Modal>

        </>

    )
}


