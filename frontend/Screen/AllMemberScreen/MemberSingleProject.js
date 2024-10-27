import { SafeAreaView, StyleSheet, Text, View, StatusBar, Dimensions, Image, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native'
const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;
import React, { useCallback, useContext, useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import axios, { all } from 'axios';
import { Basepath } from '../Global';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'


export default function MemberSingleProject({ route, navigation }) {
    let {  MemberStyles, memberdetail,admin_details,GetAdminDetail } = useContext(AuthContext)
    const { projectId } = route.params;
    
    const { SingleProject, projectwork } = useContext(AuthContext)
    const [single, setSingle] = useState({})
    const [member, setMember] = useState([])
    const [workmodalVisible, setworkModalVisible] = useState(false);
    const [newworkdata, setNewWorkData] = useState({})  //for new adding work
    const bottomSheetAdminModal = useRef(null);
    const bottomSheetTeamModal= useRef(null);


    const [allwork, setAllWork] = useState([])
    const [expense, setExpense] = useState([])
    const [count, setCount] = useState(0);

    const [workadminavtar, setWorkAdminAvtar] = useState([])

    const ModelWorkInputChange = (name, value) => {
        setNewWorkData({ ...newworkdata, [name]: value })
    }


    const OpenAdminModal = () => {
        bottomSheetAdminModal.current?.present();
        // setIsBottomSheetVisible(true)
    };
    const OpenTeamModal = () => {
        bottomSheetTeamModal.current?.present();
        // setIsBottomSheetVisible(true)
    };

    useFocusEffect(
        useCallback(() => {
            // SingleProject(projectId)
            const GetData = async () => {
                await axios.get(`${Basepath}/project/view-project/${projectId}`)
                    .then((res) => {
                        // console.log(res.data.project, 99999999999);
                        // setTotalExpense(res?.data?.totalExpense[0]?.totalExpense || 0)
                        setMember(res.data.memberdetail)
                        setSingle(res.data.project)
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                await axios.get(`${Basepath}/work/view-project-work/${projectId}`)
                    .then((res) => {
                        // console.log(res?.data, 100000000000);
                        setAllWork(res.data.work)
                        setExpense(res.data.expense)
                        setWorkAdminAvtar(res.data.adminavtar)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            GetData()
            GetAdminDetail()
        }, [count])
    )

    const SubmitWork = async () => {
        let Newdata = { ...newworkdata, project_id: projectId, member_id: memberdetail?._id }
        console.log(Newdata);
        await axios.post(`${Basepath}/work/add-work`, Newdata)
            .then((res) => {
                // console.log(res.data);
                if (res.data.success) {
                    setCount(count + 1)
                    setworkModalVisible(false)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: MemberStyles.backgroundColor,
            flex: 1
        },

        MainHeader: {
            padding: 10,
            paddingHorizontal: 15,
            flexDirection: 'row',
            // backgroundColor: 'red'
            // justifyContent: 'space-between'
        },
        headerText: {
            fontSize: 18,
            fontWeight: '500',
            paddingLeft: 20,
            color: MemberStyles.color,
            // width: windowwidth - 200,
        },
        // Single Project

        MainDetailDiv: {
            // backgroundColor: "yellow",
            paddingHorizontal: 2,
            margin: 9,
            // marginHorizontal:10
        },

        ProjectNameDiv: {
            // backgroundColor: 'red',
            paddingVertical: 5,
            flexDirection: 'row',
            marginBottom: 8,
            width: windowwidth - 89
        },
        ProjectNameText: {
            fontWeight: '500',
            fontSize: 18,
            color: MemberStyles.color
        },
        AdminDiv: {
            // backgroundColor: 'yellow',
            paddingHorizontal: 2,
            flexDirection: 'row'
        },
        adminText: {
            fontWeight: '500',
            // color,
            fontSize: 14,
            paddingHorizontal: 5,
            height: 20,
            color: MemberStyles.color
            // backgroundColor: 'yellow',

        },
        adminIcon: {
            // color
        },

        // End Date
        EndDateDiv: {
            flexDirection: 'row',
            justifyContent: 'space-between',

        },
        EndDateValueText: {
            // paddingHorizontal: 8,
            // color
            color: MemberStyles.GreyWhite
        },
        DateMiddalText: {
            borderLeftWidth: 1,
            borderColor: 'grey'
        },
        LabelDate: {
            // paddingHorizontal: 8,
            // color
            color: 'grey',
            fontWeight: '500'
        },
        CalendarIcon: {
            paddingHorizontal: 2,
            // color
        },
        // Team Mates
        MemberandAddMember: {
            // flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor:'red',
            marginVertical: 2
        },
        TeammatesText: {
            color: MemberStyles.GreyWhite
        },
        MemberDiv: {
            // backgroundColor: 'red',
            padding: 5,
            paddingHorizontal: 15,
            flexDirection: 'row',
            marginVertical: 2,
            // backgroundColor:'red',
            alignItems: 'center'
        },

        MemberImage: {
            height: 48,
            width: 48,
            borderRadius: 100,
            marginLeft: -10,
            borderWidth: 1,
            borderColor: 'rgb(202, 200, 200)'
        },
        overlayContainer: {
            height: 48,
            width: 48,
            borderRadius: 100,
            marginLeft: -5,
            backgroundColor: MemberStyles.backgroundColor,
            justifyContent: "center",
            alignItems: 'center'
        },
        overlayText: {
            color: MemberStyles.color,
            fontSize: 18,
            fontWeight: 'bold',

        },

        // works
        WorkDiv: {
            // backgroundColor: 'red',
            paddingVertical: 5, marginTop: 15
        },
        workHeaderText: {
            fontWeight: '500',
            fontSize: 15,
            color: MemberStyles.color
            // color
        },
        WorkAndAddWork: {
            // backgroundColor:'pink',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 5,
            paddingBottom: 12,
        },
        WorkAddText: {
            color: MemberStyles.GreyWhite
        },

        // SingleWork
        SingleWorkDiv: {
            // backgroundColor:"pink",
            paddingBottom: 3
        },
        SingleWork: {
            backgroundColor: MemberStyles.cardBackGround,
            padding: 8,
            height: 85,
            borderRadius: 12,
            marginVertical: 6,
            elevation: 1
        },
        WorkText: {
            // fontWeight: '500',
            fontSize: 15,
            color: MemberStyles.color
        },
        MemberandExpenseDiv: {
            // backgroundColor: 'red',
            flexDirection: 'row'
        },

        WorkMemberImageDiv: {
            padding: 5,
            paddingHorizontal: 10,
            flexDirection: 'row',
            marginVertical: 9

        },
        WorkMemberImage: {
            height: 30,
            width: 30,
            borderRadius: 100,
            marginLeft: -7,
            borderWidth: 1,
            borderColor: 'rgb(202, 200, 200)'
        },
        WorkExpenseDiv: {
            // backgroundColor:'red',
            flexDirection: "row",
            alignItems: "center"
        },
        WorkExpenseRupees: {
            color: MemberStyles.color,
            paddingHorizontal: 5,
            flexDirection: 'row',
            // height:30,
            // justifyContent:'flex-end',

        },
        WorkExpenseRupeesText: {
            fontSize: 22,
            color: MemberStyles.color,
            // color
        },
        overlayContainerWork: {
            height: 30,
            width: 30,
            borderRadius: 100,
            marginLeft: -5,
            backgroundColor: 'black',
            justifyContent: "center",
            alignItems: 'center'
        },
        overlayTextWork: {
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
        },


        // Bottom Model
        bottomModelDiv: {
            flex: 1,
            backgroundColor: MemberStyles.ModalBackGround,
            padding: 9,


        },
        MemberHeader: {
            paddingBottom: 15,
            color: MemberStyles.GreyWhite,
            fontWeight: '500',
            fontSize: 17,
            textAlign: 'center'
        },


        // Admin styles
        AdminModalDiv: {
            padding: 5,
            flex: 1,
        },
        InsideAdminDiv: {
            // backgroundColor: 'red',
            flexDirection: 'row',
        },

        AdminImage: {
            height: 90,
            width: 90,
            borderRadius: 15,
            marginTop: 5
        },
      AdminModalDetail: {
            // backgroundColor: 'yellow',
            paddingLeft: 25
        },
        AdminNameText: {
            fontWeight: '500',
            fontSize: 17,
            paddingVertical: 10,
            color: MemberStyles.color
        },
        AdminPhoneDiv: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5
        },
        AdminPhoneText: {
            paddingHorizontal: 8,
            color:  MemberStyles.GreyWhite
        },
        AdminLocationDiv: {
            flexDirection: 'row',
            alignItems: 'center'

        },
        AdminLocationText: {
            paddingHorizontal: 8,
            color:MemberStyles.GreyWhite
        },

         // Add worktModal
         modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background

        },
        
        AddWorkDiv: {
            backgroundColor:MemberStyles.ModalBackGround,
            width: windowwidth - 51,
            padding: 5,
            height: windowheight * 0.4,
            borderRadius: 19,

        },
        modalViewInside: {
            // backgroundColor:'red',
            flex: 1, padding: 5
        },
        ModalDetailHeaderDiv: {
            alignItems: 'center',
            paddingBottom: 12
        },
        ModalDetailHeaderText: {
            color:MemberStyles.ModalHeader,
            fontWeight: '500',
            fontSize: 18,
            paddingHorizontal: 5

        },
        ModelInputLabelText: {
            color:MemberStyles.GreyWhite,
            fontWeight: '500',
            fontSize: 15,
            paddingHorizontal: 5
        },
        modelInput: {
            borderRadius: 15,
            marginVertical: 5,
            backgroundColor:MemberStyles.ModalInput,
            height: 50,
            paddingHorizontal: 15,
            fontSize: 15,
            color:MemberStyles.color
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
            color:MemberStyles.Modalbutton,
            width: 85,
            textAlign: 'center',
            textTransform: 'uppercase',
        },

        // Bottom Team Modal
         bottomModelDiv: {
            flex: 1,
            backgroundColor:MemberStyles.ModalBackGround,
            padding: 9,
        },
        
        MemberHeader: {
            paddingBottom: 15,
            color:MemberStyles.GreyWhite,
            fontWeight: '500',
            fontSize: 17,
            textAlign: 'center'
        },
        singleMemberDiv: {
            // backgroundColor: 'yellow',
            padding: 2,
            marginVertical: 8,
            marginTop: 12,
            flex: 1,

        },
        SingleMember: {
            padding: 2,

            // marginVertical:5,
            // backgroundColor: 'green',
            height: 70,
            flexDirection: 'row',
            justifyContent: "space-between",
        },
        memberSingleImage: {
            height: '90%',
            width: 60,
            borderRadius: 18,
            alignSelf: 'center'

        },
        MemberDetailDiv: {
            // backgroundColor: 'red',
            width: windowwidth * 0.5,
            justifyContent: "space-between",
            paddingHorizontal: 5,
            paddingLeft: -15

        },
        MemberNameText: {
            color:MemberStyles.color,
            fontWeight: '500',
            fontSize: 17
        },
        MemberRoleText: {
            color:MemberStyles.GreyWhite,
            fontSize: 13,
            marginTop: -12

        },
        PhoneIconandNumber: {
            flexDirection: 'row',
            alignItems: 'center',
            // marginTop: -12

        },
        PhoneIcon: {
            color: 'green',
            fontSize: 15,
            marginTop: -5,

        },
        MemberPhoneText: {
            color:MemberStyles.GreyWhite,
            fontSize: 11,
            marginTop: -5,
            paddingHorizontal: 5


        },
        MemberLocationandMessage: {
            // backgroundColor:'grey',
            justifyContent: 'space-between',
            alignItems: "flex-end"
        },
        MemberLocationDiv: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        MemberLocationText: {
            paddingLeft: 3,
            fontSize: 11,
            maxWidth: 70,
            color:MemberStyles.GreyWhite

        },
        HoriZonalLine: {
            // backgroundColor: 'rgba(197, 197, 197, 0.975)',
            // height: 1 * 0.3,
            marginVertical: 8
        },


    })
    return (
        <>
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView>

                    {/* Project Header */}
                    <View style={styles.MainHeader}>
                        <Ionicons color={MemberStyles.color} onPress={() => navigation.goBack()} name='chevron-back-outline' size={22} />
                        <Text numberOfLines={1} style={styles.headerText}>Project Details</Text>
                    </View>
                    {/* Project Name Div */}
                    <View style={styles.MainDetailDiv}>

                        {/* Project Name */}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.ProjectNameDiv}>
                                <Text style={styles.ProjectNameText}>{single.name}</Text>
                                {/* Client Div */}

                            </View>

                            <TouchableOpacity onPress={OpenAdminModal} activeOpacity={0.6} style={styles.AdminDiv}>
                                <Ionicons color={MemberStyles.GreyWhite} size={18} style={styles.adminIcon} name='eye-outline' />
                                <Text style={styles.adminText}>Admin</Text>

                            </TouchableOpacity>
                        </View>


                        {/* All Member */}
                        <View style={styles.MemberandAddMember}>
                            <Text style={styles.TeammatesText}>Project team</Text>

                            <TouchableOpacity activeOpacity={0.8} style={styles.MemberDiv} onPress={OpenTeamModal}>
                                {member?.slice(0, 3)?.map((item, index) => {
                                    return (
                                        <Image key={index} style={styles.MemberImage} source={{ uri: item?.member?.avtar }} />
                                    )
                                })}

                                {member?.length > 3 && (
                                    <View style={styles.overlayContainer}>
                                        <Text style={styles.overlayText}>+{member.length - 3}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                        </View>


                        {/* end date and Start */}
                        <View style={styles.EndDateDiv}>
                            {/* <Ionicons style={styles.CalendarIcon} name='calendar-outline' size={20} /> */}

                            <View>
                                <Text style={styles.LabelDate}>Start </Text>
                                <Text style={styles.EndDateValueText}>{single?.start_date}</Text>
                            </View>
                            <Text style={styles.DateMiddalText}></Text>

                            <View>
                                <Text style={styles.LabelDate}>End </Text>
                                <Text style={styles.EndDateValueText}>{single?.estimated_end_date}</Text>
                            </View>
                        </View>

                        {/* works */}
                        <View style={styles.WorkDiv}>

                            <View style={styles.WorkAndAddWork}>
                                <Text style={styles.workHeaderText}>Works</Text>
                                {single.status === 'Ongoing' ? (
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => setworkModalVisible(true)}>
                                        <Text style={styles.WorkAddText}> + Add </Text>
                                    </TouchableOpacity>
                                ) : ''}
                            </View>

                            {/* SingleWork */}
                            <View style={styles.SingleWorkDiv}>

                                {/* SingleWork */}
                                {allwork?.length == 0 ? (
                                    <View>
                                        <Text style={{ color: 'grey', paddingHorizontal: 10 }}>No work added..</Text>
                                    </View>
                                ) : ''}

                                {allwork?.map((item, index) => {

                                    const totalAmount = expense.find(e => e.work_id === item._id)?.totalAmount;
                                    const admintotalAmount = workadminavtar?.find(e => e.work_id === item._id)?.totalAmount;
                                    const workExpenses = expense.filter(e => e.work_id === item._id);
                                    const AdminAvtar = workadminavtar.filter(e => e.work_id === item._id) ;
                                    // console.log(AdminAvtar);
                                    return (
                                        <>
                                            <TouchableOpacity onPress={() => navigation.navigate('SingleWork', { projectId, item, workExpenses, })} key={index + 1} activeOpacity={0.8} style={styles.SingleWork}>
                                                <Text style={styles.WorkText}>{item.name}</Text>

                                                <View style={styles.MemberandExpenseDiv}>
                                                    <View style={styles.WorkMemberImageDiv}>
                                                        {/* {workExpenses.map((expenseItem, expenseIndex) => ( */}
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                            {AdminAvtar?.map((adminAvtar, Index) => (
                                                                <Image
                                                                    key={Index}
                                                                    style={styles.WorkMemberImage}
                                                                    source={{ uri: (adminAvtar[Index]?.avtar !== undefined) ? "" : adminAvtar?.admins[0]?.avtar }}
                                                                />
                                                            ))}

                                                            {workExpenses.slice(0, 2)?.map((expenseItem, expenseIndex) => (
                                                                <>
                                                                    <Image
                                                                        key={expenseIndex}
                                                                        style={styles.WorkMemberImage}
                                                                        source={{ uri: expenseItem?.members[0]?.avtar }}
                                                                    />
                                                                </>
                                                            ))}


                                                            {workExpenses.length > 3 && (
                                                                <View style={styles.overlayContainerWork}>
                                                                    <Text style={styles.overlayTextWork}>+{workExpenses.length - 2}</Text>
                                                                </View>
                                                            )}

                                                            {workExpenses.length == 0 && AdminAvtar.length == 0 ? (
                                                                <View >
                                                                    <Text style={{ color: 'grey' }}>No expenses</Text>
                                                                </View>
                                                            ) : ''}
                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 1 }} />
                                                    <View style={styles.WorkExpenseDiv}>
                                                        <Text style={styles.WorkExpenseRupees}>{totalAmount || admintotalAmount ? '₹' : ''}</Text>
                                                        <Text style={styles.WorkExpenseRupeesText}>
                                                            {(totalAmount || admintotalAmount)?.toLocaleString('en-IN')}
                                                        </Text>
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                        </>
                                    )
                                })}
                            </View>
                        </View>

                    </View>


                </ScrollView>



 {/* Bottom Modal for Team */}

 <BottomSheetModalProvider >
                    <BottomSheetModal


                        containerStyle={{ backgroundColor: 'rgba(128, 128, 128, 0.236)' }}
                        ref={bottomSheetTeamModal}

                        snapPoints={['65%', '40%', '75%', '90%',]}
                    >
                        <View style={styles.bottomModelDiv}>
                            <Text style={styles.MemberHeader}>Members</Text>
                            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.singleMemberDiv}>
                                    {member?.map((item, index) => {
                                        return (
                                            <>

                                                <View key={index} style={styles.SingleMember}>
                                                    <Image style={styles.memberSingleImage} source={{ uri: item.member?.avtar }} />
                                                    <View style={styles.MemberDetailDiv}>
                                                        <Text style={styles.MemberNameText}>{item?.member?.name}</Text>
                                                        <Text numberOfLines={1}>
                                                            {item?.roles?.map((role, index) => (
                                                                <>
                                                                    <Text style={styles.MemberRoleText}>{role}</Text>
                                                                    {index !== item.roles.length - 1 && <Text> & </Text>}
                                                                </>
                                                            ))}
                                                        </Text>


                                                        <View style={styles.PhoneIconandNumber}>
                                                            <Ionicons style={styles.PhoneIcon} name='call-outline' color={MemberStyles.PurpleColor} size={15} />
                                                            <Text style={styles.MemberPhoneText}>{item?.member?.phone}</Text>
                                                        </View>

                                                    </View>
                                                    <View style={styles.MemberLocationandMessage}>
                                                        <View style={styles.MemberLocationDiv}>
                                                            <Ionicons name='location-outline' color={'green'} size={14} />
                                                            {item?.member?.address ? (
                                                                <Text numberOfLines={2} style={styles.MemberLocationText}>{item.member.address}</Text>
                                                            ) : (
                                                                <Text numberOfLines={2} style={styles.MemberLocationText}>not added</Text>
                                                            )}

                                                        </View>
                                                        <Ionicons name='chatbubble-ellipses-outline' color={'rgb(158, 158, 244)'} size={22} />
                                                    </View>
                                                </View>
                                                <Text style={styles.HoriZonalLine}></Text>

                                            </>
                                        )
                                    })}
                                </View>


                            </BottomSheetScrollView>
                        </View>

                    </BottomSheetModal>
                </BottomSheetModalProvider>
                {/* Bottom Model2 for Admin */}
                <BottomSheetModalProvider>
                    <BottomSheetModal
                        containerStyle={{ backgroundColor: 'rgba(128, 128, 128, 0.236)' }}
                        ref={bottomSheetAdminModal}
                        index={0}
                        snapPoints={['28%', '30%', '38%',]}
                    // onChange={BottomModelChange}

                    >
                        {/* Content of your bottom sheet goes here */}
                        <View style={styles.bottomModelDiv}>
                            <Text style={styles.MemberHeader}>Admin</Text>
                            <View style={styles.AdminModalDiv}>
                                <View style={styles.InsideAdminDiv}>
                                    <View>
                                        <Image style={styles.AdminImage} source={{ uri: admin_details?.avtar }} />
                                    </View>
                                    <View style={styles.AdminModalDetail}>
                                        <Text style={styles.AdminNameText}>{admin_details?.name}</Text>
                                        <View style={styles.AdminPhoneDiv}>
                                            <Ionicons name='call-outline' color={MemberStyles.PurpleColor} />
                                            <Text style={styles.AdminPhoneText}>{admin_details?.phone}</Text>
                                        </View>
                                        <View style={styles.AdminLocationDiv}>
                                            <Ionicons name='location-outline' color={MemberStyles.GreenColor} />
                                            <Text style={styles.AdminLocationText}>{admin_details?.address}</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </BottomSheetModal>
                </BottomSheetModalProvider>

                 {/* AddWorkModal */}
                 <Modal
                    animationType="slide"
                    transparent={true}
                    visible={workmodalVisible}
                //   onRequestClose={toggleModal3}
                >

                    <View style={styles.modalContainer}>
                        <View style={styles.AddWorkDiv}>
                            <View style={styles.modalViewInside}>
                                <View style={styles.ModalDetailHeaderDiv}>
                                    <Text style={styles.ModalDetailHeaderText}>Add Work</Text>
                                </View>
                                <View>
                                    <Text style={styles.ModelInputLabelText}>Name</Text>
                                    <TextInput placeholderTextColor={MemberStyles.GreyWhite} onChangeText={(value) => ModelWorkInputChange('name', value)} style={styles.modelInput} placeholder='eg:Pillar,Cement,etc' />
                                </View>
                                <View>
                                    <Text style={styles.ModelInputLabelText}>Description</Text>
                                    <TextInput placeholderTextColor={MemberStyles.GreyWhite} onChangeText={(value) => ModelWorkInputChange('description', value)} style={styles.modelInput} placeholder='Enter work description' />
                                </View>
                                <View style={styles.ModelButtonsDiv}>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => setworkModalVisible(false)}>
                                        {/* <Image style={styles.ModelCancelBtn} source={{ uri: 'https://img.freepik.com/free-vector/red-prohibited-sign-no-icon-warning-stop-symbol-safety-danger-isolated-vector-illustration_56104-912.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' }} /> */}
                                        <Text style={[styles.ModelBtn,]}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={SubmitWork} activeOpacity={0.8} >
                                        <Text style={[styles.ModelBtn]}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>

        </>


    )
}


