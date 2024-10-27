import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Basepath } from '../Global';
import { View, Text, Button, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, Modal, Dimensions, TextInput, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from 'react-native-animated-progress';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useRef } from 'react';
// import PieChart from 'react-native-pie-chart'
import { Dropdown } from 'react-native-element-dropdown';
import { VictoryPie } from 'victory-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../AuthContext';






const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;
export default function SingleProject({ route, navigation }) {

    let { theme, AdminStyles } = useContext(AuthContext);

    let { item, client, admin_details } = route.params;

    // console.log(item, 80000);
    let id = item._id;
    let totalBudget = item.budget;
    const [totalExpense, setTotalExpense] = useState(null)
    const [single, setSingle] = useState({})
    const [member, setMember] = useState([])
    const bottomSheetModalRef = useRef(null);
    const bottomSheetClientModalRef = useRef(null);
    // const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [paymentmodalVisible, setPaymentModalVisible] = useState(false);
    const [workmodalVisible, setworkModalVisible] = useState(false);
    const [work, setWorks] = useState([])
    const [expense, setExpense] = useState([])
    const [workadminavtar, setWorkAdminAvtar] = useState('')
    const [addpayment, setAddPayment] = useState({})  //for new payment
    const [newworkdata, setNewWorkData] = useState({})  //for new adding work
    const [count, setCount] = useState(0);

    const [project_payment, setProjectPayment] = useState([])
    const [total_paid, setTotalPaid] = useState(null)

    const [date, setDate] = useState(new Date());
    const [showdatemodal, setshowDateModal] = useState(false);

    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    const DateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setshowDateModal(false)
        setDate(currentDate)
    }

    const status = [
        { label: 'Ongoing', value: 'Ongoing', },
        { label: 'Completed', value: 'Completed', },
    ]

    let defaultStatus = (item?.status) == 'Ongoing' ? status[0] : status[1]
    const [selectedStatus, setSelectedStatus] = useState(defaultStatus);
    // console.log(selectedStatus, 'SelectedStatus');
    const [selectedCategory, setSelectedCategory] = useState('')
    const [showdesc, setShowDesc] = useState(null)

    const handleToggleDesc = (index) => {
        console.log(showdesc);
        setShowDesc((prevIndex) => (prevIndex === index) ? null : index)
    }




    const handleStatusChange = async (status) => {
        console.log(status, 'status');
        setSelectedStatus(status)
        let updateStatus = status.value;
        await axios.post(`${Basepath}/project/update/${id}`, { status: status.value })
            .then((res) => {
                console.log(res?.data, 99999999999);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    const handlePress = (entry) => {
        setSelectedCategory(entry.x)
    };
    const handlePieClick = (event, entry) => {
        setSelectedCategory(entry.x)
    };


    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
        // setIsBottomSheetVisible(true)
    };
    const OpenClientModel = () => {
        bottomSheetClientModalRef.current?.present();
        // setIsBottomSheetVisible(true)
    };

    let ExpensePercentage = Math.ceil(totalExpense / totalBudget * 100);
    let budgetPercentage = 100 - ExpensePercentage;

    const data3 = [
        { x: 'Budget ', y: budgetPercentage, color: 'rgb(164, 201, 164)' },
        { x: 'Expense ', y: ExpensePercentage, color: 'rgb(242, 205, 205)' },
    ];
    const colorScale = ['rgb(164, 201, 164)', 'rgb(242, 205, 205)']
    let totalPaidPPerc = Math.ceil(total_paid / totalBudget * 100);


    useFocusEffect(
        useCallback(() => {
            const GetData = async () => {
                await axios.get(`${Basepath}/project/view-project/${id}`)
                    .then((res) => {
                        console.log(res.data.memberdetail, 6666666666666);
                        setTotalExpense(res?.data?.totalExpense[0]?.totalExpense || 0)
                        setMember(res.data.memberdetail)
                        setSingle(res.data.project)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                await axios.get(`${Basepath}/work/view-project-work/${id}`)
                    .then((res) => {
                        // console.log(res?.data.expense[0].totalAmount, 44444);

                        setWorkAdminAvtar(res?.data?.adminavtar)
                        setWorks(res.data.work)
                        setExpense(res.data.expense)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                await axios.get(`${Basepath}/payment/view/${id}`)
                    .then((res) => {
                        setTotalPaid(res.data.totalPaid)
                        setProjectPayment(res.data.payment.reverse())

                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            GetData()
        }, [count])
    )



    const [value, setValue] = useState(null);
    const renderItem = item => {
        return (
            <View style={styles.item}>
                <MaterialIcons name={item.icon} size={18} />
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };
    const ModelInputChange = (name, value) => {
        setAddPayment({ ...addpayment, [name]: value })
    }
    const ModelWorkInputChange = (name, value) => {
        setNewWorkData({ ...newworkdata, [name]: value })
    }
    const SubmitPayment = async () => {
        let payment_date = date.toISOString().split('T')[0]
        let Newdata = { ...addpayment, payment_date, payment_type: value.value, avtar: value.icon, project_id: id, client_id: client._id }
        console.log(Newdata);
        await axios.post(`${Basepath}/payment/add`, Newdata)
            .then((res) => {
                // console.log(res.data);
                if (res.data.success) {
                    setCount(count + 1)
                    setPaymentModalVisible(false)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const SubmitWork = async () => {
        let Newdata = { ...newworkdata, project_id: id, admin_id: admin_details._id }
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

    const data = [
        { label: 'Cash ', value: 'Cash ', icon: 'attach-money' },
        { label: 'Bank', value: 'Bank ', icon: "account-balance" },
        { label: 'Check', value: 'Check ', icon: 'receipt' },
        { label: 'UPI', value: 'UPI ', icon: 'credit-card' },
    ];

    // console.log(value);
    const CloseBottomSheet = () => {
        bottomSheetModalRef.current.close()
        bottomSheetClientModalRef.current.close()
    }





    // Styles
    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: AdminStyles.backgroundColor,
            flex: 1,
            width: windowwidth
        },
        MainHeader: {
            padding: 10,
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        headerText: {
            fontSize: 18,
            fontWeight: '500',
            // paddingLeft: 100,
            color:AdminStyles.color,
            width: windowwidth - 200,
        },
        CurrentstatusText: {

        },
        StatusDiv: {
            paddingHorizontal: 8,
            borderRadius: 15,
            backgroundColor: theme == 'dark' ? 'red' : 'white'
        },
        statuschangeIcon: {
            paddingLeft: 5,
            color: 'rgb(126, 125, 125)'
        },

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
            color:AdminStyles.color
        },
        ClientDiv: {
            // backgroundColor: 'yellow',
            paddingHorizontal: 2,
            flexDirection: 'row'


        },
        clientText: {
            fontWeight: '500',
            color:AdminStyles.color,
            fontSize: 14,
            paddingHorizontal: 5,
            height: 20,
            // backgroundColor: 'yellow',

        },
        clientIcon: {
            color:AdminStyles.color
        },
        EndDateDiv: {
            flexDirection: 'row'
        },
        EndDateText: {
            paddingHorizontal: 8,
            color:AdminStyles.color
        },
        CalendarIcon: {
            paddingHorizontal: 2,
            color:AdminStyles.color

        },

        //All members
        MemberandAddMember: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        MemberDiv: {
            // backgroundColor: 'red',
            padding: 5,
            paddingHorizontal: 15,
            flexDirection: 'row',
            marginVertical: 15,
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
            backgroundColor: AdminStyles.color,
            justifyContent: "center",
            alignItems: 'center'
        },
        overlayContainerWork: {
            height: 30,
            width: 30,
            borderRadius: 100,
            marginLeft: -5,
            backgroundColor:AdminStyles.color,
            justifyContent: "center",
            alignItems: 'center'
        },
        overlayText: {
            color:AdminStyles.backgroundColor,
            fontSize: 18,
            fontWeight: 'bold',

        },
        overlayTextWork: {
            color:AdminStyles.backgroundColor,
            fontSize: 14,
            fontWeight: 'bold',

        },

        // Bottom Model
        bottomModelDiv: {
            flex: 1,
            backgroundColor:AdminStyles.ModalBackGround,
            padding: 9,


        },
        MemberHeader: {
            paddingBottom: 15,
            color:AdminStyles.GreyWhite,
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
            color:AdminStyles.color,
            fontWeight: '500',
            fontSize: 17
        },
        MemberRoleText: {
            color:AdminStyles.GreyWhite,
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
            color:AdminStyles.GreyWhite,
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
            color:AdminStyles.GreyWhite

        },
        HoriZonalLine: {
            // backgroundColor: 'rgba(197, 197, 197, 0.975)',
            // height: 1 * 0.3,
            marginVertical: 8
        },














        AddmemberText: {
            paddingHorizontal: 5,
            color: 'grey',
        },

        // Description
        DescriptionDiv: {
            // backgroundColor:'red'
        },
        DescriptionHeader: {
            fontWeight: '500',
            fontSize: 16,
            color:AdminStyles.color

        },
        DescriptionText: {
            color:AdminStyles.color,
            paddingVertical: 5,
            paddingHorizontal: 5
        },

        CircleText: {
            bottom: -95,
            textAlign: 'center',
            fontSize: 18,
            color: theme == 'dark' ? 'white' : 'grey',
            fontWeight: '500'
        },
        // progress
        progressbarDiv: {
            // backgroundColor:'red',   
            // marginBottom: 6,
            paddingVertical: 7,
        },
        progress: {
            width: windowwidth - 25,
            alignSelf: 'center'
        },
        progressTextDiv: {
            // backgroundColor:'grey',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // paddingHorizontal:3,
            paddingVertical: 10
        },
        progressText: {
            fontWeight: '400',
            fontSize: 15,
            color:AdminStyles.GreyWhite

        },
        progressPercentage: {
            paddingHorizontal: 8,
            fontWeight: '500',

        },

        // works
        WorkDiv: {
            // backgroundColor: 'red',
            paddingVertical: 5
        },
        workHeaderText: {
            fontWeight: '500',
            fontSize: 15,
            color:AdminStyles.color
        },
        WorkAndAddWork: {
            // backgroundColor:'pink',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 5,
            paddingBottom: 12,
        },

        // SingleWork
        SingleWorkDiv: {
            // backgroundColor:"pink",
            paddingBottom: 3


        },
        SingleWork: {
            backgroundColor:AdminStyles.cardBackGround,
            padding: 8,
            height: 85,
            borderRadius: 12,
            marginVertical: 6,
            elevation: 1
        },
        WorkText: {
            // fontWeight: '500',
            fontSize: 15,
            color:AdminStyles.color
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
            color:AdminStyles.color,
            paddingHorizontal: 5,
            flexDirection: 'row',
            // height:30,
            // justifyContent:'flex-end',

        },
        WorkExpenseRupeesText: {
            fontSize: 22,
            color:AdminStyles.color
        },

        // ClientModel
        ClientModelDiv: {
            padding: 5,
            flex: 1,
        },
        InsideClientDiv: {
            // backgroundColor: 'red',
            flexDirection: 'row',
        },

        ClientImage: {
            height: 90,
            width: 90,
            borderRadius: 15,
            marginTop: 5
        },
        ClientModelDetail: {
            // backgroundColor: 'yellow',
            paddingLeft: 25
        },
        ClientNameText: {
            fontWeight: '500',
            fontSize: 17,
            paddingVertical: 10,
            color:AdminStyles.color
        },
        ClientPhoneDiv: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5
        },
        ClientPhoneText: {
            paddingHorizontal: 8,
            color:AdminStyles.GreyWhite
        },
        ClientLocationDiv: {
            flexDirection: 'row',
            alignItems: 'center'

        },
        ClientLocationText: {
            paddingHorizontal: 8,
            color:AdminStyles.GreyWhite

        },

        // Payment
        PaymentDiv: {
            // backgroundColor: 'red',
            marginVertical: 15,
            marginBottom: 30
        },
        PaymentAndAddpayment: {
            // backgroundColor: 'yellow',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between'
        },
        PaymentHeaderText: {
            fontWeight: '500',
            fontSize: 16,
            color:AdminStyles.color
        },
        PaymentAddText: {
            paddingHorizontal: 5,
            color: 'grey',

        },
        WorkAddText: {
            paddingHorizontal: 5,
            color: 'grey',

        },
        SinglePaymentDiv: {
            // padding: 8,
            marginBottom: 20,

        },
        SinglePayment: {
            backgroundColor:AdminStyles.cardBackGround,
            padding: 8,
            height: 65,
            borderRadius: 12,
            marginVertical: 6,
            // elevation: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
        },
        CashandIcon: {
            flexDirection: 'row',
            alignItems: 'center',
            color:AdminStyles.color
        },
        CashText: {
            paddingHorizontal: 5,
            paddingVertical: 3,
            fontSize: 15,
            color:AdminStyles.color
        },
        CashIcons: {
            color:AdminStyles.GreyWhite
        },
        PaymentDateText: {
            color:AdminStyles.GreyWhite,
            fontSize: 12,
            padding: 2,
        },
        AmountDiv: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        paymentRupeesText: {
            fontSize: 15,
            color:AdminStyles.GreyWhite,
            paddingHorizontal: 3
        },

        AmountText: {
            fontWeight: '500',
            fontSize: 19,
            paddingHorizontal: 2,
            color:AdminStyles.color

        },
        // Payment Desc
        PaymentDescDiv: {
            paddingHorizontal: 10,
            backgroundColor:AdminStyles.DescriptionBackGround,
            borderRadius: 5,
            paddingVertical: 4

        },
        PaymentDescText: {
            color:AdminStyles.color

        },

        // See more Text
        SeeMoreText: {
            textAlign: 'right',
            paddingVertical: 2,
            right: 2,
            color: 'grey',
            fontSize: 13,
            fontWeight: '500',
            // backgroundColor: cardBackGround,
            paddingRight: 4,
            borderRightWidth: 2,


        },


        // Add PaymentModel
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background

        },
        AddPaymentDiv: {
            backgroundColor:AdminStyles.ModalBackGround,
            width: windowwidth - 51,
            padding: 5,
            height: windowheight * 0.6,
            borderRadius: 19
        },
        AddWorkDiv: {
            backgroundColor:AdminStyles.ModalBackGround,
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
            color:AdminStyles.ModalHeader,
            fontWeight: '500',
            fontSize: 18,
            paddingHorizontal: 5

        },
        ModelInputLabelText: {
            color:AdminStyles.GreyWhite,
            fontWeight: '500',
            fontSize: 15,
            paddingHorizontal: 5
        },
        modelInput: {
            borderRadius: 15,
            marginVertical: 5,
            backgroundColor:AdminStyles.ModalInput,
            height: 50,
            paddingHorizontal: 15,
            fontSize: 15,
            color:AdminStyles.color
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

        // Date Picker
        DateDiv: {
            // backgroundColor: 'red',
            backgroundColor:AdminStyles.ModalInput,
            borderRadius: 10,
            height: 45,
            alignItems: "center",
            justifyContent: 'center'

        },
        DateText:{
            color:AdminStyles.GreyWhite
        },


        // DropDown
        inputLabel: {
            color:AdminStyles.GreyWhite,
            paddingHorizontal: 8,
            paddingVertical: 8,
            fontWeight: "500",
        },
        dropdown: {
            marginVertical: 5,
            height: 50,
            width: '100%',
            backgroundColor:AdminStyles.ModalInput,
            borderRadius: 12,
            padding: 12,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            // elevation: 2,
        },
        icon: {
            marginRight: 5,
        },
        item: {
            padding: 17,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        textItem: {
            flex: 1,
            fontSize: 16,
            paddingHorizontal: 8
        },
        placeholderStyle: {
            fontSize: 16,
        },
        selectedTextStyle: {
            fontSize: 16,
            color:AdminStyles.color
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        },


        // Pie Chart
        PieChartCategoryText: {
            padding: 10,
            backgroundColor: theme == 'dark' ? 'grey' : "rgba(236, 241, 246, 0.849)",
            color:AdminStyles.color,
            borderRadius: 100,
            marginLeft: 5
        },
        // Chart Detail

        chartDetailDiv: {
            // backgroundColor: 'red',
            paddingHorizontal: 12,
            paddingVertical: 5,
            marginVertical: 5
        },
        RecievedDiv: {
            flexDirection: 'row',
            marginVertical: 5,
            justifyContent: 'space-between'
        },
        ChartAmountText: {
            fontSize: 15,
            paddingHorizontal: 5,
            color:AdminStyles.GreyWhite
        },
        DetailHeaderText: {
            color: 'grey',
            fontWeight: '500'
        }

    })
    return (
        <>
            <SafeAreaView style={[styles.mainContainer,]}>
                <TouchableOpacity activeOpacity={5} onPress={CloseBottomSheet}>

                    <ScrollView >
                        {/* main Header */}
                        <View style={styles.MainHeader}>
                            <Ionicons onPress={() => navigation.goBack()} name='chevron-back-outline' color={AdminStyles.color} size={22} />
                            <Text numberOfLines={1} style={styles.headerText}>Project Details</Text>

                            <TouchableOpacity activeOpacity={0.8} style={[styles.StatusDiv, { backgroundColor: selectedStatus.label == 'Completed' ? theme == 'dark' ? 'rgba(201, 245, 201, 0.586)' : 'rgb(237, 250, 237)' : 'rgba(233, 243, 255, 0.849)' }]}>
                                <Dropdown
                                    style={{ width: 110 }}
                                    data={status}
                                    labelField="label"
                                    valueField="value"
                                    value={selectedStatus}
                                    onChange={(item) => handleStatusChange(item)}
                                    renderItem={(item) => {
                                        return (
                                            <Text style={{ padding: 8, fontSize: 15, }}>{item.label}</Text>
                                        )
                                    }}
                                />

                            </TouchableOpacity>
                        </View>


                        {/* All Detail */}
                        <View style={styles.MainDetailDiv}>
                            {/* projectName */}
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.ProjectNameDiv}>
                                    <Text style={styles.ProjectNameText}>{single.name}</Text>
                                    {/* Client Div */}

                                </View>

                                <TouchableOpacity onPress={OpenClientModel} activeOpacity={0.6} style={styles.ClientDiv}>
                                    <Ionicons size={18} style={styles.clientIcon} name='eye-outline' />
                                    <Text style={styles.clientText}>Client</Text>

                                </TouchableOpacity>
                            </View>

                            {/* end date */}
                            <View style={styles.EndDateDiv}>
                                <Ionicons style={styles.CalendarIcon} name='calendar-outline' size={20} />

                                <Text style={styles.EndDateText}>{single.estimated_end_date}</Text>
                            </View>

                            {/* allmember */}
                            <View style={styles.MemberandAddMember}>
                                {member?.length == 0 ? (
                                    <View>
                                        <Text style={{ color: 'grey', paddingHorizontal: 10 }}>No member added..</Text>

                                    </View>
                                ) : ''}
                                <TouchableOpacity activeOpacity={0.8} onPress={openBottomSheet} style={styles.MemberDiv}>

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
                                {selectedStatus.label == 'Ongoing' ? (
                                    <Text onPress={() => navigation.navigate('SearchMember', { id: id, project_name: item?.name })} style={styles.AddmemberText}>+ Add</Text>
                                ) : ''}
                            </View>

                            {/* description */}
                            <View style={styles.DescriptionDiv}>
                                <Text style={styles.DescriptionHeader}>Description</Text>
                                <Text style={styles.DescriptionText}>{single.description}</Text>
                            </View>

                            {/* Own Chart */}
                            <Text style={styles.CircleText}>
                                {selectedCategory}
                            </Text>

                            <View style={{ alignItems: 'center', marginTop: -20 }}>

                                <VictoryPie
                                    padAngle={1}
                                    labelRadius={90}
                                    radius={({ datum }) => (selectedCategory && datum.xName === selectedCategory ? 74 : 67)}
                                    // startAngle={10}
                                    data={data3}
                                    height={205}    
                                    colorScale={colorScale}
                                    innerRadius={49}
                                    labels={({ datum }) => ` ${datum.y}%`}
                                    cornerRadius={5}
                                    events={[
                                        {
                                            target: 'data',
                                            eventHandlers: {
                                                onPressIn: (event, props) => handlePieClick(event, props.datum),
                                            },
                                        },
                                    ]}
                                />

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    {data3.map((entry, index) => (
                                        <>
                                            <View key={index} style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ backgroundColor: `${entry.color}`, borderRadius: 100, height: 20, width: 20 }}>
                                                </Text>
                                                <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress(entry)} >
                                                    <Text style={styles.PieChartCategoryText}>{`${entry.x}: ${entry.y}%`}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    ))}
                                </View>
                            </View>

                            <TouchableOpacity activeOpacity={2} style={styles.chartDetailDiv}>
                                <View style={styles.RecievedDiv}>
                                    <Text style={styles.DetailHeaderText}>Budget</Text>
                                    <View style={styles.AmountDiv}>
                                        <Text style={styles.paymentRupeesText}>₹</Text>
                                        <Text style={styles.ChartAmountText}>{(totalBudget)?.toLocaleString('en-In')}</Text>
                                    </View>
                                </View>
                                <View style={styles.RecievedDiv}>
                                    <Text style={styles.DetailHeaderText}>Expense</Text>
                                    <View style={styles.AmountDiv}>
                                        <Text style={[styles.paymentRupeesText, { color: AdminStyles.RedColor }]}>- ₹</Text>
                                        <Text style={[styles.ChartAmountText, { color: AdminStyles.RedColor }]}>{(totalExpense)?.toLocaleString('en-In')}</Text>
                                    </View>
                                </View>
                                <Text style={{ height: 0.5, backgroundColor: 'grey', marginVertical: 8 }}></Text>
                                <View style={styles.RecievedDiv}>
                                    <Text style={styles.DetailHeaderText}>Balance</Text>
                                    <View style={styles.AmountDiv}>
                                        <Text style={styles.paymentRupeesText}>₹</Text>
                                        <Text style={styles.ChartAmountText}>{(totalBudget - totalExpense)?.toLocaleString('en-In')}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* works */}
                            <View style={styles.WorkDiv}>

                                <View style={styles.WorkAndAddWork}>
                                    <Text style={styles.workHeaderText}>Works</Text>
                                    {selectedStatus.label == 'Ongoing' ? (
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => setworkModalVisible(true)}>
                                            <Text style={styles.WorkAddText}> + Add </Text>
                                        </TouchableOpacity>
                                    ) : ''}
                                </View>

                                {/* SingleWork */}
                                <View style={styles.SingleWorkDiv}>

                                    {/* SingleWork */}
                                    {work?.length == 0 ? (
                                        <View>
                                            <Text style={{ color: 'grey', paddingHorizontal: 10 }}>No work added..</Text>

                                        </View>
                                    ) : ''}

                                    {work?.slice(0, 2).map((item, index) => {
                                        const totalAmount = expense.find(e => e.work_id === item._id)?.totalAmount;
                                        const admintotalAmount = workadminavtar.find(e => e.work_id === item._id)?.totalAmount;
                                        const workExpenses = expense.filter(e => e.work_id === item._id);
                                        const AdminAvtar = workadminavtar.filter(e => e.work_id === item._id);
                                        // console.log(AdminAvtar);
                                        return (
                                            <>
                                                <TouchableOpacity onPress={() => navigation.navigate('SingleWorkAdmin', { projectId: id, item, workExpenses, totalBudget, selectedStatus, })} key={index} activeOpacity={0.8} style={styles.SingleWork}>
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

                                {/* See more for Work Detail,work */}
                                {work.length > 2 ? (
                                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('AllWork', { id: id, totalBudget, project_name: item.name, selectedStatus })}>
                                        <View>
                                            <Text style={[styles.SeeMoreText, { borderColor: 'red', }]}>See more  </Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : ''}
                            </View>

                            {/* Recieved payment */}
                            {/* Payment */}
                            <TouchableOpacity activeOpacity={5} style={styles.PaymentDiv}>
                                <View style={styles.PaymentAndAddpayment}>
                                    <Text style={styles.PaymentHeaderText}>Payments </Text>
                                    {selectedStatus.label == 'Ongoing' ? (
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => setPaymentModalVisible(true)}>
                                            <Text style={styles.PaymentAddText}> + Add </Text>
                                        </TouchableOpacity>
                                    ) : ''}
                                </View>
                                <View style={styles.SinglePaymentDiv}>
                                    {project_payment?.length == 0 ? (
                                        <View>
                                            <Text style={{ color: AdminStyles.color, paddingVertical: 10, paddingHorizontal: 10 }}>No payment </Text>
                                        </View>
                                    ) : ''}

                                    {/* Payment Progress */}
                                    {project_payment.length !== 0 && (
                                        <View style={styles.progressbarDiv}>
                                            <View style={styles.progress}>
                                                <View style={styles.progressTextDiv}>
                                                    <Text style={styles.progressText}>Recieved</Text>
                                                    <Text style={{ color: totalPaidPPerc <= '30' ? AdminStyles.RedColor : totalPaidPPerc < "50" ? "rgb(149, 149, 218)" : AdminStyles.GreenColor, fontWeight: '500' }}>
                                                        {Math.floor(totalPaidPPerc) >= 100 ? "Completed" : Math.floor(totalPaidPPerc)}
                                                        {Math.floor(totalPaidPPerc) < 100 ? '%' : ''}
                                                    </Text>
                                                </View>

                                                <ProgressBar
                                                    progress={totalPaidPPerc}
                                                    height={6}

                                                    backgroundColor={totalPaidPPerc <= '30' ? AdminStyles.RedColor : totalPaidPPerc < "50" ? "rgb(149, 149, 218)" : AdminStyles.GreenColor}
                                                />

                                            </View>

                                        </View>
                                    )}

                                    {project_payment?.slice(0, 2).map((item, index) => {
                                        return (
                                            <>
                                                <View key={index} style={styles.SinglePayment}>
                                                    <View>
                                                        <View style={styles.CashandIcon}>
                                                            <MaterialIcons size={20} style={styles.CashIcons} name={item.avtar} />
                                                            <Text style={styles.CashText}>{item.payment_type}</Text>
                                                        </View>
                                                        <Text style={styles.PaymentDateText}>{item.payment_date}</Text>

                                                    </View>
                                                    <View style={styles.AmountDiv}>
                                                        <Text style={styles.paymentRupeesText}>₹</Text>
                                                        <Text style={styles.AmountText}>{(item.amount)?.toLocaleString('en-IN')}</Text>

                                                        {/* PaymentDesc Icons */}
                                                        <TouchableOpacity activeOpacity={0.8} onPress={() => handleToggleDesc(index)} >
                                                            <Ionicons style={{ paddingLeft: 5 }} name={showdesc === index ? 'chevron-up-outline' : 'chevron-down-outline'} size={17} color={'grey'} />
                                                        </TouchableOpacity>


                                                    </View>
                                                </View>
                                                {/* Show Desc */}
                                                {showdesc === index && (
                                                    <View style={styles.PaymentDescDiv}>
                                                        <Text style={styles.PaymentDescText}>{item?.description}</Text>
                                                    </View>
                                                )}
                                            </>
                                        )
                                    })}
                                    {project_payment.length > 2 ? (
                                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('AllProjectPayment', { project_id: id, projectBudget: item.budget, client, selectedStatus })}>
                                            <View style={{ marginVertical: 3 }}>

                                                <Text style={[styles.SeeMoreText, { borderColor: 'green', }]}>See more  </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) : ''}

                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableOpacity>


                {/* Bottom Model */}

                <BottomSheetModalProvider >
                    <BottomSheetModal


                        containerStyle={{ backgroundColor: 'rgba(128, 128, 128, 0.236)' }}
                        ref={bottomSheetModalRef}

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
                                                                    <Text key={index} style={styles.MemberRoleText}>{role}</Text>
                                                                    {index !== item.roles.length - 1 && <Text> & </Text>}
                                                                </>
                                                            ))}
                                                        </Text>


                                                        <View style={styles.PhoneIconandNumber}>
                                                            <Ionicons style={styles.PhoneIcon} name='call-outline' color={AdminStyles.PurpleColor} size={15} />
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


                {/* Bottom Model22 for Client */}
                <BottomSheetModalProvider>
                    <BottomSheetModal
                        containerStyle={{ backgroundColor: 'rgba(128, 128, 128, 0.236)' }}
                        ref={bottomSheetClientModalRef}
                        // index={0}
                        snapPoints={['28%', '30%', '38%',]}
                    // onChange={BottomModelChange}

                    >
                        {/* Content of your bottom sheet goes here */}
                        <View style={styles.bottomModelDiv}>
                            <Text style={styles.MemberHeader}>Client</Text>
                            <View style={styles.ClientModelDiv}>
                                <View style={styles.InsideClientDiv}>
                                    <View>
                                        <Image style={styles.ClientImage} source={{ uri: client?.avtar }} />
                                    </View>
                                    <View style={styles.ClientModelDetail}>
                                        <Text style={styles.ClientNameText}>{client?.name}</Text>
                                        <View style={styles.ClientPhoneDiv}>
                                            <Ionicons name='call-outline' color={AdminStyles.PurpleColor} />
                                            <Text style={styles.ClientPhoneText}>{client?.phone}</Text>
                                        </View>
                                        <View style={styles.ClientLocationDiv}>
                                            <Ionicons name='location-outline' color={AdminStyles.GreenColor} />
                                            <Text style={styles.ClientLocationText}>{client?.place}</Text>
                                        </View>


                                    </View>
                                </View>

                            </View>
                        </View>
                    </BottomSheetModal>
                </BottomSheetModalProvider>

                {/* AddPaymentModal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={paymentmodalVisible}
                //   onRequestClose={toggleModal3}
                >

                    <View style={styles.modalContainer}>
                        <View style={styles.AddPaymentDiv}>
                            <View style={styles.modalViewInside}>
                                <View style={styles.ModalDetailHeaderDiv}>
                                    <Text style={styles.ModalDetailHeaderText}>Add payment</Text>
                                </View>

                                <View>
                                    <Text style={styles.ModelInputLabelText}>Amount</Text>
                                    <TextInput keyboardType='numeric' onChangeText={(value) => ModelInputChange('amount', value)} style={styles.modelInput} placeholderTextColor={AdminStyles.GreyWhite} placeholder='Enter payment amount' />

                                </View>
                                <View>
                                    <Text style={styles.ModelInputLabelText}>Description</Text>
                                    <TextInput numberOfLines={2} multiline placeholderTextColor={AdminStyles.GreyWhite} onChangeText={(value) => ModelInputChange('description', value)} style={[styles.modelInput, { height: 55 }]} placeholder='Enter payment description' />

                                </View>
                                <View>
                                    <Text style={styles.inputLabel}>Payment type</Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={data}
                                        // search
                                        maxHeight={150}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Select type"
                                        searchPlaceholder="Search..."
                                        value={value}
                                        onChange={item => {
                                            setValue(item);
                                            // console.log(value);
                                        }}
                                        renderLeftIcon={() => (
                                            <View style={{ paddingHorizontal: 5 }}>
                                                {value ? (
                                                    <MaterialIcons style={styles.icon} color="grey" name={value?.icon} size={20} />
                                                ) : (
                                                    ""

                                                )}
                                            </View>
                                        )}

                                        renderItem={renderItem}
                                    />

                                </View>
                                <View>
                                    <Text style={styles.ModelInputLabelText}>Date</Text>

                                    <TouchableOpacity activeOpacity={0.8} style={styles.DateDiv} onPress={() => setshowDateModal(true)}>
                                        <Text style={styles.DateText} >
                                            {date ? date.toISOString().split('T')[0] : ("dd / mm / yy")}
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={styles.ModelButtonsDiv}>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => setPaymentModalVisible(false)}>
                                        {/* <Image style={styles.ModelCancelBtn} source={{ uri: 'https://img.freepik.com/free-vector/red-prohibited-sign-no-icon-warning-stop-symbol-safety-danger-isolated-vector-illustration_56104-912.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' }} /> */}
                                        <Text style={[styles.ModelBtn,]}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={SubmitPayment} activeOpacity={0.8} >
                                        <Text style={[styles.ModelBtn]}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                {showdatemodal && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        maximumDate={maxDate}
                        onChange={DateChange}
                    />
                )}

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
                                    <TextInput placeholderTextColor={AdminStyles.GreyWhite} onChangeText={(value) => ModelWorkInputChange('name', value)} style={styles.modelInput} placeholder='eg:Pillar,Cement,etc' />
                                </View>
                                <View>
                                    <Text style={styles.ModelInputLabelText}>Description</Text>
                                    <TextInput placeholderTextColor={AdminStyles.GreyWhite} onChangeText={(value) => ModelWorkInputChange('description', value)} style={styles.modelInput} placeholder='Enter work description' />
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
