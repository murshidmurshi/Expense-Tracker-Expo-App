import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image, TouchableOpacity, Modal, TextInput, } from 'react-native'
import React, { useRef, useState, useEffect, useCallback, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { Basepath } from '../Global';
import { Dropdown } from 'react-native-element-dropdown';
import { AuthContext } from '../AuthContext';
import ProgressBar from 'react-native-animated-progress';
import DateTimePicker from '@react-native-community/datetimepicker';




const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

export default function SingleWorkAdmin({ route, navigation }) {
    let { item, projectId, selectedStatus, totalBudget, } = route.params;
    // console.log(totalAmount,admintotalAmount ,'totalAmount,admintotalAmount ');
    console.log(projectId,55);
    let { adminToken,theme,AdminStyles } = useContext(AuthContext)
    let id = item._id;

    const [workAdmin, setWorkAdmin] = useState({})
    const [workadminrole, setWorkAdminRole] = useState([])
    const [workmemberrole, setWorkMemberRole] = useState([])
    const [workmember, setWorkMember] = useState([])
    const [adminWorkExp, setMainAdminWorkExp] = useState([])
    const [singlebottomdata, setSingleBottomData] = useState([])

    const [addexpenseModal, setAddExpenseModal] = useState(false)
    const [newWorkexpense, setNewWorkExpense] = useState({})
    const [totalworkExpense, setTotalWorkExpenses] = useState('')
    const [value, setValue] = useState(null);
    const [count, setCount] = useState(0);

    const [date, setDate] = useState(new Date());
    const [showdatemodal, setshowDateModal] = useState(false);
    const [showdesc, setShowDesc] = useState(null);

    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    const DateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setshowDateModal(false)
        setDate(currentDate)
    }

    const PaymentType = [
        { label: 'Cash ', value: 'Cash ', icon: 'attach-money' },
        { label: 'Bank', value: 'Bank ', icon: "account-balance" },
        { label: 'Check', value: 'Check ', icon: 'receipt' },
        { label: 'UPI', value: 'UPI ', icon: 'credit-card' },

    ];
    const renderItem = item => {
        return (
            <View style={styles.item}>
                <MaterialIcons name={item.icon} size={18} />
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    const handleToggleDesc = (index) => {
        console.log(showdesc);
        setShowDesc((prevIndex) => (prevIndex === index) ? null : index)
    }

    useFocusEffect(
        useCallback(() => {
            const SingleWork = async () => {

                console.log('SingleProject');
                await axios.post(`${Basepath}/work/view-work/${id}`,{projectId})
                    .then((res) => {
                        console.log(res?.data?.MemberRoles,55555);
                        setTotalWorkExpenses(res?.data?.totalWorkExpense)
                        setWorkAdmin(res.data.WorkAdmin)
                        setMainAdminWorkExp(res.data.adminExpense)
                        setWorkAdminRole(res.data.role)
                        setWorkMemberRole(res.data.MemberRoles)
                        setWorkMember(res.data.workmember)
                    })
                    



                    .catch((err) => {
                        console.log(err);
                    })
            }
            SingleWork()
        }, [count])
    )

    const data = {
        labels: ["Jan", "Feb", "March", "Apl ", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: 'white',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: 'white',
        // backgroundColor:'red',
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 5, // optional, default 3
    };
    const bottomSheetModalRef = useRef(null);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const handleBotomSheet = (item, index) => {
        console.log(index);
        // console.log(item, 'Itemmmmmm');
        setSingleBottomData({ item, index })
        bottomSheetModalRef.current?.present();
        setIsBottomSheetVisible(true)
    };

    const CloseBottomSheet = () => {
        bottomSheetModalRef.current.close()
    }
    const ModelInputChange = (name, value) => {
        setNewWorkExpense({ ...newWorkexpense, [name]: value })
    }
    const SubmitExpense = async () => {
        let payment_date = date.toISOString().split('T')[0]
        let Newdata = { ...newWorkexpense, payment_date, payment_type: value.value, avtar: value.icon, project_id: projectId, work_id: id, }
        console.log(Newdata);
        await axios.post(`${Basepath}/expense/add-expense`, Newdata, { headers: { 'auth-token': adminToken } })
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    setCount(count + 1)
                    setAddExpenseModal(false)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    let SingletotalExpense = totalworkExpense;
    let projectBudget = totalBudget;
    let totalWorkExpense = (SingletotalExpense / projectBudget * 100);
    
    


    // Styles
    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: AdminStyles.backgroundColor,
            minHeight: windowheight,
            // width: windowwidth
        },
        MainHeader: {
            // backgroundColor: 'red',
            padding: 10,
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center'
        },
        headerText: {
            fontSize: 18,
            fontWeight: '500',
            paddingLeft: 20,
            color:AdminStyles.color,
            width: windowwidth - 150,
    
        },
        AddExpenseText: {
            color: 'grey',
            fontWeight: '500'
        },
        MainGraphsDiv: {
            // backgroundColor:'red',
            // height:200
        },
    
        SingleWorkMainDiv: {
            // backgroundColor: 'yellow',
            // height: windowheight,
            padding: 10
        },
    
        //AddedMember
        AddedWordMemberDiv: {
            // backgroundColor: 'red',
            padding: 1
        },
        AddedWordMemberDivHeader: {
            color:AdminStyles.color,
            fontWeight: '500',
            fontSize: 16
    
        },
        singleMemberDiv: {
            // backgroundColor: 'red',
            padding: 2,
            // flex: 1,
            marginVertical: 8,
            marginTop: 12,
    
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
            color: AdminStyles.GreyWhite,
            fontSize: 13,
            marginTop: -12
    
        },
        PhoneIconandNumber: {
            flexDirection: 'row',
            alignItems: 'center',
            // marginTop: -12
    
        },
        PhoneIcon: {
            color:AdminStyles.GreenColor,
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
            backgroundColor: 'rgba(197, 197, 197, 0.975)',
            height: 1 * 0.3,
            marginVertical: 10
        },
        HoriZonalLine2: {
            backgroundColor: 'rgba(197, 197, 197, 0.975)',
            height: 2 * 0.3,
            marginVertical: 10
        },
    
        //InvolveMember
        InvolveWordMemberDiv: {
            // backgroundColor: 'red',
            padding: 1
        },
        InvolveWordMemberDivHeader: {
            // backgroundColor: 'yellow',
            fontWeight: '500',
            fontSize: 16,
            color:AdminStyles.color
        },
        InvolveMemberDetailDiv: {
            // backgroundColor: 'red',
            // padding: 2,
            marginVertical: 15
        },
        SingleInvolveMemberDiv: {
            backgroundColor:AdminStyles.cardBackGround,
            padding: 8,
            height: 90,
            borderRadius: 12,
            marginVertical: 3,
            elevation: 1
        },

        RoleText: {
            fontWeight: '500',
            fontSize: 16,
            color:AdminStyles.color
        },
        MemberandExpenseDiv: {
            // backgroundColor: 'red',
            flexDirection: 'row',
            // alignItems:'center',
            // justifyContent:'space-between'
        },
    
        WorkMemberImageDiv: {
            padding: 5,
            paddingHorizontal: 10,
            flexDirection: 'row',
            marginVertical: 2
    
        },
        WorkMemberImage: {
            height: 50,
            width: 50,
            borderRadius: 10,
            marginLeft: -7,
            borderWidth: 1,
            borderColor: 'rgb(202, 200, 200)'
        },
        NameDiv: {
            paddingHorizontal: 15
        },
        NameDivText: {
            color:AdminStyles.GreyWhite,
            fontSize: 15
        },
        WorkExpenseDiv: {
            // backgroundColor:'red',
            flexDirection: "row",
            alignItems: "center"
        },
        WorkExpenseRupees: {
            color:AdminStyles.RedColor,
            paddingHorizontal: 5,
            flexDirection: 'row',
            // height:30,
            // justifyContent:'flex-end',
    
        },
        WorkExpenseRupeesText: {
            fontSize: 22,
            color:AdminStyles.RedColor,
            paddingRight: 4
    
        },
        ExpenseDescDiv: {
            paddingHorizontal: 10,
            backgroundColor:AdminStyles.DescriptionBackGround,
            borderRadius:7,
            paddingVertical:4
    
        },
        ExpenseDescText: {
            color:AdminStyles.color
    
        },
    
    
    
        // WorkDescDiv:{marginVertical:10,marginBottom:20},
        WorkDescHeaderDiv: {
            // backgroundColor:'red',
            // paddingHorizontal: 2,
            paddingBottom: 5,
        },
        WorkTotalExpenseHeaderDiv: {
            // backgroundColor:'red',
            // paddingHorizontal: 2,
            paddingBottom: 5,
        },
        DescHeaderText: {
            fontSize: 16,
            fontWeight: '500',
            color:AdminStyles.color
        },
        DescText: {
            color:AdminStyles.GreyWhite,
            paddingVertical: 10,
    
        },
    
        bottomModelDiv: {
           
            flex: 1,
            minHeight:windowheight,
            padding: 9,
            backgroundColor:AdminStyles.ModalBackGround
        },
        BottommemberSingleImage: {
            height: 65,
            width: 65,
            borderRadius: 15,
            alignSelf: 'center'
        },
        DetailExpenseDivHeader: {
            backgroundColor: theme=='dark'?'grey':'rgba(212, 209, 209, 0.132)',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderRadius: 8,
            padding: 12,
            marginTop: 15,
    
        },
        DetailExpenseDivHeaderText: {
            fontWeight: '500',
            color: AdminStyles.GreyWhite,
    
        },
        DetailExpenseDiv: {
            // backgroundColor: 'yellow',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 8,
    
        },
        DetailExpenseAmount: {
            // backgroundColor:'red'
        },
        DetailExpenseDate: {
            // backgroundColor:'red'
            color:AdminStyles.color
        },
    
        // Total Div
        TotalDiv: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 8,
    
        },
        TotalDivHeaderText: {
            color:AdminStyles.color,
            fontWeight: '500',
            fontSize: 15
        },
        TotalDivValueText: {
            fontWeight: '500',
            fontSize: 18,
            color:AdminStyles.color
        },
    
        // AddExpese Modal
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
    
        },
        AddExpenseDiv: {
            backgroundColor:AdminStyles.ModalBackGround,
            width: windowwidth - 51,
            padding: 5,
            height: windowheight * 0.6,
            borderRadius: 19
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
            fontSize: 15
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
    
        // Modal Dropdown
        inputLabel:{
            color:AdminStyles.GreyWhite
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
            color:AdminStyles.color
        },
        selectedTextStyle: {
            fontSize: 16,
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        },
    
        // Single work Progress Expense
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
        AmountDiv: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        paymentRupeesText: {
            fontSize: 15,
            paddingHorizontal: 2,
            color:AdminStyles.color
    
        },
        chartDetailDiv: {
            // backgroundColor: 'red',
            paddingHorizontal: 3,
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
            paddingHorizontal: 4,
            color:AdminStyles.color
        },
        DetailHeaderText: {
            color:'grey',
            fontWeight: '500'
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
            color:AdminStyles.color
        },
    
    
    })

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView >
                <TouchableOpacity activeOpacity={5} onPress={CloseBottomSheet}>
                    {/* main Header */}

                    <View style={[styles.MainHeader, { justifyContent: selectedStatus?.label == "Ongoing" ? "space-around" : '', }]}>
                        <Ionicons color={AdminStyles.color} onPress={() => navigation.goBack()} name='chevron-back-outline' size={22} />
                        <Text numberOfLines={1} style={[styles.headerText, { paddingLeft: selectedStatus?.label == "Completed" ? 15 : '', }]}>{item?.name}</Text>
                        {selectedStatus?.label == 'Ongoing' ? (
                            <TouchableOpacity onPress={() => setAddExpenseModal(true)}>
                                <Text style={styles.AddExpenseText}>+ Expense</Text>
                            </TouchableOpacity>
                        ) : ""}

                    </View>

                    {/* graphs */}
                    {/* <View style={styles.MainGraphsDiv}>
                    <LineChart
                        data={data}
                        width={Dimensions.get('window').width - 20} // from react-native
                        height={220}
                        bezier
                        // horizontalLabelRotation={2}
                        // onDataPointClick={handleData}
                        chartConfig={chartConfig}
                        // withHorizontalLines={false}
                        withOuterLines={false}
                        withInnerLines={false}
                        style={{ marginVertical: 8, borderRadius: 16, }}
                    />
                </View> */}

                    <View style={styles.SingleWorkMainDiv}>
                        {/* added by */}
                        <View style={styles.AddedWordMemberDiv}>
                            <Text style={styles.AddedWordMemberDivHeader}>Added by</Text>
                            <View style={styles.singleMemberDiv}>

                                <View style={styles.SingleMember}>
                                    <Image style={styles.memberSingleImage} source={{ uri: workAdmin.avtar }} />
                                    <View style={styles.MemberDetailDiv}>
                                        <Text style={styles.MemberNameText}>{workAdmin.name}</Text>
                                        <Text numberOfLines={1} style={styles.MemberRoleText}>
                                            {workadminrole.map((role, index) => (
                                                <>
                                                    <Text >{role}</Text>
                                                    {index !== workadminrole.length - 1 && <Text> & </Text>}

                                                </>
                                            ))}
                                            {workadminrole.length == 0 && (
                                                <Text>Admin</Text>
                                            )}

                                        </Text>

                                        <View style={styles.PhoneIconandNumber}>
                                            <Ionicons style={styles.PhoneIcon} name='call-outline' color={'rgb(158, 158, 244)'} size={15} />
                                            <Text style={styles.MemberPhoneText}>{workAdmin.phone}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.MemberLocationandMessage}>
                                        <View style={styles.MemberLocationDiv}>
                                            <Ionicons name='location-outline' color={AdminStyles.GreenColor} size={14} />
                                            {workAdmin.address ? (
                                                <Text numberOfLines={2} style={styles.MemberLocationText}>{workAdmin?.address}</Text>
                                            ) : (
                                                <Text numberOfLines={2} style={styles.MemberLocationText}>not added</Text>
                                            )}

                                        </View>
                                        <Ionicons name='chatbubble-ellipses-outline' color={'rgb(158, 158, 244)'} size={22} />
                                    </View>
                                </View>
                                <Text style={styles.HoriZonalLine}></Text>

                            </View>
                        </View>

                        {/* work desc */}
                        <View style={styles.WorkDescDiv}>
                            <View style={styles.WorkDescHeaderDiv}>
                                <Text style={styles.DescHeaderText}>Description</Text>
                            </View>
                            <Text style={styles.DescText}>
                                {item.description}
                            </Text>
                            <Text style={styles.HoriZonalLine2}></Text>
                        </View>

                        {/* work Total Expenses.. */}
                        <View style={styles.WorkTotalExpenseDiv}>
                            <View style={styles.WorkTotalExpenseHeaderDiv}>
                                <Text style={styles.DescHeaderText}>Work expense</Text>
                            </View>

                            {/* Total Expense for Single Work */}
                            <View style={styles.progressbarDiv}>
                                <View style={styles.progress}>
                                    <View style={styles.progressTextDiv}>
                                        <Text style={styles.progressText}>Expense</Text>
                                        <Text style={{ color: totalWorkExpense <= '30' ?'rgb(136, 215, 136)': totalWorkExpense < "50" ? "rgb(126, 126, 203)" :  "rgb(231, 147, 147)" , fontWeight: '500' }}>
                                            {Math.ceil(totalWorkExpense) >= 100 ? "Over" : Math.ceil(totalWorkExpense)}
                                            {Math.ceil(totalWorkExpense) < 100 ? '%' : ''}
                                        </Text>
                                    </View>

                                    <ProgressBar
                                        progress={totalWorkExpense}
                                        height={6}

                                        backgroundColor={totalWorkExpense <= '30' ? 'rgb(136, 215, 136)' : totalWorkExpense < "50" ? "rgb(126, 126, 203)" : 'rgb(231, 147, 147)'}
                                    />

                                </View>

                            </View>

                            <View style={styles.ExpenseDetailDiv}>
                                <TouchableOpacity activeOpacity={2} style={styles.chartDetailDiv}>
                                    <View style={styles.RecievedDiv}>
                                        <Text style={styles.DetailHeaderText}>Budget</Text>
                                        <View style={styles.AmountDiv}>
                                            <Text style={styles.paymentRupeesText}>₹</Text>
                                            <Text style={styles.ChartAmountText}>{projectBudget?.toLocaleString('en-IN')}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.RecievedDiv}>
                                        <Text style={styles.DetailHeaderText}>Work expense</Text>
                                        <View style={styles.AmountDiv}>
                                            <Text style={[styles.paymentRupeesText, { color:'rgb(231, 147, 147)' }]}> - ₹</Text>
                                            <Text style={[styles.ChartAmountText, { color:'rgb(231, 147, 147)' }]}>{SingletotalExpense?.toLocaleString('en-IN')}</Text>
                                        </View>
                                    </View>

                                    <Text style={{ height: 0.5, backgroundColor: 'grey', marginVertical: 8 }}></Text>
                                    <View style={styles.RecievedDiv}>
                                        <Text style={[styles.DetailHeaderText, { fontWeight: '500' }]}>Remaining Budget</Text>
                                        <View style={styles.AmountDiv}>
                                            <Text style={[styles.paymentRupeesText,]}> ₹</Text>
                                            <Text style={[styles.ChartAmountText, { fontWeight: '500', fontSize: 18, }]}>
                                                {(SingletotalExpense) > projectBudget ? "0"?.toLocaleString('en-IN') : (projectBudget - SingletotalExpense)?.toLocaleString('en-IN')}

                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>


                            <Text style={styles.HoriZonalLine2}></Text>
                        </View>


                        {/* involve */}
                        <View style={styles.InvolveWordMemberDiv}>
                            <Text style={styles.InvolveWordMemberDivHeader}>Involve </Text>
                            <View style={styles.InvolveMemberDetailDiv}>
                                {workmember && adminWorkExp?.length == 0 ? (
                                    <View>
                                        <Text style={{ color: 'grey' }}>No member involve</Text>
                                    </View>
                                ) : ''}

                                {workmember?.map((item, index) => {
                                    return (
                                        <>
                                            <TouchableOpacity /* key={index} */ onPress={() => handleBotomSheet(item, index)} activeOpacity={0.8} style={styles.SingleInvolveMemberDiv}>
                                                <Text style={styles.RoleText}>
                                                    {workmemberrole[index]?.roles}
                                                    {/* {index !== workmemberrole?.length - 1 && <Text> & </Text>} */}
                                                </Text>



                                                <View style={styles.MemberandExpenseDiv}>
                                                    <View style={styles.WorkMemberImageDiv}>
                                                        {/* {workExpenses.map((expenseItem, expenseIndex) => ( */}
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Image

                                                                style={styles.WorkMemberImage}
                                                                source={{ uri: item?.memberDetails?.avtar }}
                                                            />
                                                            <View style={styles.NameDiv}>
                                                                <Text style={styles.NameDivText}>{item?.memberDetails?.name}</Text>
                                                            </View>

                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 1 }} />

                                                    <View style={styles.WorkExpenseDiv}>
                                                        <Text style={styles.WorkExpenseRupees}>- ₹</Text>
                                                        <Text style={styles.WorkExpenseRupeesText}>
                                                            {/* {totalAmount} */}
                                                            {item?.totalExpense?.toLocaleString('en-In')}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                        </>
                                    )



                                })}



                                {adminWorkExp?.map((item, index) => (

                                    <TouchableOpacity key={index} onPress={() => handleBotomSheet(item, index)} activeOpacity={0.8} style={styles.SingleInvolveMemberDiv}>
                                        <Text style={styles.RoleText}>Admin</Text>

                                        <View style={styles.MemberandExpenseDiv}>
                                            <View style={styles.WorkMemberImageDiv}>
                                                {/* {workExpenses.map((expenseItem, expenseIndex) => ( */}
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image

                                                        style={styles.WorkMemberImage}
                                                        source={{ uri: item?.adminDetails?.avtar }}
                                                    />
                                                    <View style={styles.NameDiv}>
                                                        <Text style={styles.NameDivText}>{item?.adminDetails?.name}</Text>
                                                    </View>

                                                </View>
                                            </View>
                                            <View style={{ flex: 1 }} />

                                            <View style={styles.WorkExpenseDiv}>
                                                <Text style={styles.WorkExpenseRupees}>- ₹</Text>
                                                <Text style={styles.WorkExpenseRupeesText}>
                                                    {/* {totalAmount} */}
                                                    {item?.totalExpense?.toLocaleString('en-In')}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}



                            </View>
                        </View>
                    </View>


                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Model */}
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    containerStyle={{ backgroundColor: 'rgba(128, 128, 128, 0.236)' }}
                    snapPoints={['65%', '40%', '75%', '95%',]}

                >

                    {/* Content of your bottom sheet goes here */}
                    <BottomSheetScrollView>

                        <View style={styles.bottomModelDiv}>

                            {/* <Text style={styles.MemberHeader}>Members</Text> */}

                            <View style={styles.singleMemberDiv}>

                                <View style={styles.SingleMember}>
                                    <Image style={styles.BottommemberSingleImage} source={{ uri: singlebottomdata?.item?.memberDetails?.avtar || singlebottomdata?.item?.adminDetails?.avtar }} />
                                    <View style={styles.MemberDetailDiv}>
                                        <Text style={styles.MemberNameText}>{singlebottomdata?.item?.memberDetails?.name || singlebottomdata?.item?.adminDetails?.name}</Text>
                                        <Text style={styles.MemberRoleText}>
                                            {/* {role[index]?.type} */}
                                            {singlebottomdata?.item?.adminDetails?.name ? 'Admin' :
                                                workmemberrole[singlebottomdata?.index]?.roles}

                                            {/* {singlebottomdata?.item?.memberDetails?.name==''?'Admin':''} */}


                                        </Text>

                                        <View style={styles.PhoneIconandNumber}>
                                            <Ionicons style={styles.PhoneIcon} name='call-outline' color={'rgb(158, 158, 244)'} size={15} />
                                            <Text style={styles.MemberPhoneText}>{singlebottomdata?.item?.memberDetails?.phone || singlebottomdata?.item?.adminDetails?.phone}</Text>
                                        </View>

                                    </View>

                                    <View style={styles.MemberLocationandMessage}>
                                        <View style={styles.MemberLocationDiv}>
                                            <Ionicons name='location-outline' color={AdminStyles.GreenColor} size={14} />
                                            {singlebottomdata?.item?.memberDetails?.address || singlebottomdata?.item?.adminDetails?.address ? (
                                                <Text numberOfLines={2} style={styles.MemberLocationText}>{singlebottomdata?.item?.memberDetails?.address || singlebottomdata?.item?.adminDetails?.address}</Text>
                                            ) : (
                                                <Text numberOfLines={2} style={styles.MemberLocationText}>not added</Text>
                                            )}

                                        </View>
                                        <Ionicons name='chatbubble-ellipses-outline' color={AdminStyles.PurpleColor} size={22} />
                                    </View>
                                </View>
                                <View style={styles.DetailExpenseDivHeader}>
                                    <Text style={styles.DetailExpenseDivHeaderText}>Date</Text>
                                    <Text style={styles.DetailExpenseDivHeaderText}>Amount</Text>


                                </View>

                                {singlebottomdata?.item?.expenses?.map((item, index) => (
                                    <>
                                        <View key={index} style={styles.DetailExpenseDiv}>

                                            <Text style={styles.DetailExpenseDate}>{item?.payment_date}</Text>
                                            <View style={styles.WorkExpenseDiv}>
                                                <Text style={styles.WorkExpenseRupees}> ₹</Text>
                                                <Text style={[styles.WorkExpenseRupeesText, { fontSize: 15 }]}>
                                                    {/* {totalAmount} */}
                                                    {item?.amount?.toLocaleString('en-In')}
                                                </Text>
                                                <TouchableOpacity activeOpacity={0.8} onPress={() => handleToggleDesc(index)} >
                                                    <Ionicons name={showdesc === index ? 'chevron-up-outline' : 'chevron-down-outline'} size={17} color={AdminStyles.GreyWhite} />
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                        {/* Show Desc */}
                                        {showdesc === index && (
                                            <View style={styles.ExpenseDescDiv}>
                                                <Text style={styles.ExpenseDescText}>{item?.description}</Text>
                                            </View>
                                        )}
                                    </>

                                ))}

                            </View>


                            <Text style={styles.HoriZonalLine2}></Text>
                            <View style={styles.TotalDiv}>
                                <Text style={styles.TotalDivHeaderText}>Total</Text>
                                <View style={styles.WorkExpenseDiv}>
                                    <Text style={styles.TotalDivValueText}> ₹ </Text>
                                    <Text style={[styles.TotalDivValueText]}>
                                        {/* {totalAmount} */}
                                        {singlebottomdata?.item?.totalExpense?.toLocaleString('en-In')}
                                    </Text>
                                </View>

                            </View>


                        </View>
                    </BottomSheetScrollView>


                </BottomSheetModal>
            </BottomSheetModalProvider>




            {/* Add Expese Modal */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={addexpenseModal}
            //   onRequestClose={toggleModal3}
            >

                <View style={styles.modalContainer}>
                    <View style={styles.AddExpenseDiv}>
                        <View style={styles.modalViewInside}>
                            <View style={styles.ModalDetailHeaderDiv}>
                                <Text style={styles.ModalDetailHeaderText}>Add Expense</Text>
                            </View>

                            <View>
                                <Text style={styles.ModelInputLabelText}>Amount</Text>
                                <TextInput keyboardType='numeric' onChangeText={(value) => ModelInputChange('amount', value)} style={styles.modelInput} placeholder='Enter payment amount' />

                            </View>
                            <View>
                                <Text style={styles.ModelInputLabelText}>Date</Text>
                                <TouchableOpacity activeOpacity={0.8} style={styles.DateDiv} onPress={() => setshowDateModal(true)}>
                                    <Text style={styles.DateText} >
                                        {date ? date.toISOString().split('T')[0] : ("dd / mm / yy")}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View>
                                <Text style={styles.inputLabel}>Payment type</Text>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={PaymentType}
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
                                                <MaterialIcons style={styles.icon} color="black" name={value?.icon} size={20} />
                                            ) : (
                                                ""

                                            )}
                                        </View>
                                    )}

                                    renderItem={renderItem}
                                />

                            </View>
                            <View>
                                <Text style={styles.ModelInputLabelText}>Description</Text>
                                <TextInput numberOfLines={3} multiline onChangeText={(value) => ModelInputChange('description', value)} style={[styles.modelInput,{height:55}]} placeholder='Enter payment description' />

                            </View>


                            <View style={styles.ModelButtonsDiv}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => setAddExpenseModal(false)}>
                                    <Text style={[styles.ModelBtn,]}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={SubmitExpense} activeOpacity={0.8} >
                                    <Text style={[styles.ModelBtn]}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Date Picker  */}
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

        </SafeAreaView>
    )
}

