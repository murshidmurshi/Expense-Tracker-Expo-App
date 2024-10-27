import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import axios from 'axios';
import { Basepath } from '../Global';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from 'react-native-animated-progress';
import { AuthContext } from '../AuthContext';


const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

export default function AllPayment({ route, navigation }) {
    let { theme, AdminStyles } = useContext(AuthContext)
    let { project_id, projectBudget, client } = route.params;
    const [project_payment, setProjectPayment] = useState([])
    const [total_paid, setTotalPaid] = useState(null)
    const [showdesc, setShowDesc] = useState(null)

    const handleToggleDesc = (index) => {
        console.log(showdesc);
        setShowDesc((prevIndex) => (prevIndex === index) ? null : index)
    }




    let totalPaidPPerc = (total_paid / projectBudget * 100);

    // console.log(totalPaidPPerc, 'totalPaidPPerctotalPaidPPerc');


    useFocusEffect(
        useCallback(() => {
            const GetProjectPayment = async () => {
                await axios.get(`${Basepath}/payment/view/${project_id}`)
                    .then((res) => {
                        setTotalPaid(res.data.totalPaid)
                        setProjectPayment(res.data.payment.reverse())

                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            GetProjectPayment()
        }, [])
    )



    // Styles
    const styles = StyleSheet.create({
        mainContainer: {
            width: windowwidth,
            flex: 1,
            backgroundColor:AdminStyles.backgroundColor,

        },
        MainHeader: {
            padding: 10,
            paddingHorizontal: 15,
            flexDirection: 'row',

            // justifyContent: 'space-evenly'
        },
        headerText: {
            fontSize: 18,
            fontWeight: '500',
            paddingHorizontal: 20,
            color:AdminStyles.color
        },
        MainDetailDiv: {
            // backgroundColor: "red",
            // padding:3,
            paddingHorizontal: 2,
            margin: 9,
            flex: 1
            // marginHorizontal:10
        },
        // Client Details
        MainClientDiv: {
            // backgroundColor: 'yellow',
            padding: 2
        },
        ClientHeaderText: {
            // color: 'grey',
            color:AdminStyles.color,
            fontWeight: '500',
            fontSize: 16

        },
        ClientDetailDiv: {
            // backgroundColor: 'red',
            marginVertical: 15,
            flexDirection: 'row',
            alignItems: 'center'

        },
        ClientImage: {
            height: 75,
            width: 75,
            borderRadius: 12
        },
        ClientNameandOtherDetails: {
            // backgroundColor: 'yellow',
            paddingHorizontal: 15,
            // flexDirection: 'row',
        },
        ClientNameText: {
            fontSize: 16,
            paddingVertical: 5,
            fontWeight: '500',
            color:AdminStyles.GreyWhite
        },
        ClientTextDiv: {
            flexDirection: 'row',
            paddingVertical: 3
        },
        ClientText: {
            fontSize: 14,
            color: 'grey',
            paddingHorizontal: 5

        },
        HoriZonalLine: {
            backgroundColor: 'rgba(197, 197, 197, 0.975)',
            height: 1 * 0.3,
        },

        // All Payment Css
        AllPaymentDiv: {
            // backgroundColor:'red'
        },
        PaymentHeaderDiv: {
            paddingVertical: 8
        },
        PaymentHeaderText: {
            fontSize: 16,
            fontWeight: '500',
            color:AdminStyles.color
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
            color: 'grey',
            fontSize: 13,
            padding: 3,
        },
        AmountDiv: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        paymentRupeesText: {
            fontSize: 15,
            paddingHorizontal: 2,
            color:AdminStyles.GreyWhite
            // color: 'grey'

        },
        AmountText: {
            fontWeight: '400',
            fontSize: 20,
            color:AdminStyles.color,
            paddingHorizontal: 2

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
        // progressbar
        progressbarDiv: {
            // backgroundColor: 'grey',
            marginTop: 12,
            marginBottom: 3,
        },
        progress: {
            padding: 5,
            width: windowwidth - 15,
            alignSelf: 'center'
        },
        progressTextDiv: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-between",
            // backgroundColor: 'red',
            marginBottom: 5,
        },
        progressText: {
            color:AdminStyles.GreyWhite
        },



        // All Progress Detail CSs
        // Chart Detail

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
            color:AdminStyles.GreyWhite
        },
        DetailHeaderText: {
            color:AdminStyles.GreyWhite,
            fontWeight: '500'
        }



    })
    return (
        <>
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView>
                    <View style={styles.MainHeader}>
                        <Ionicons color={AdminStyles.color} onPress={() => navigation.goBack()} name='chevron-back-outline' size={22} />
                        <Text style={styles.headerText}>Project payment </Text>
                    </View>
                    <View style={styles.MainDetailDiv}>
                        {/* Client Details */}
                        <View style={styles.MainClientDiv}>
                            <Text style={styles.ClientHeaderText}>Client </Text>
                            <View style={styles.ClientDetailDiv}>
                                <Image style={styles.ClientImage} source={{ uri: client?.avtar }} />

                                <View style={styles.ClientNameandOtherDetails}>

                                    <Text style={styles.ClientNameText}>{client?.name}</Text>
                                    <View style={styles.ClientTextDiv}>
                                        <Ionicons color={AdminStyles.PurpleColor} name='call-outline' size={18} />
                                        <Text style={styles.ClientText}>{client?.phone}</Text>
                                    </View>
                                    <View style={styles.ClientTextDiv}>
                                        <Ionicons color={AdminStyles.GreenColor} name='location-outline' size={18} />
                                        <Text style={styles.ClientText}>{client?.place}</Text>
                                        {/* <View>
                                        <Ionicons name='chatbubble-ellipses-outline' size={22} />

                                            </View> */}
                                    </View>
                                </View>


                            </View>
                            {/* <Text style={styles.HoriZonalLine}></Text> */}
                        </View>

                        {/* Payment Progress */}
                        <View style={styles.progressbarDiv}>
                            <View style={styles.progress}>
                                <View style={styles.progressTextDiv}>
                                    <Text style={styles.progressText}>Recieved</Text>
                                    <Text style={{ color: totalPaidPPerc <= '30' ? AdminStyles.RedColor : totalPaidPPerc < "50" ? "rgb(126, 126, 203)" :AdminStyles.GreenColor, fontWeight: '500' }}>
                                        {Math.floor(totalPaidPPerc) >= 100 ? "Completed" : Math.floor(totalPaidPPerc)}
                                        {Math.floor(totalPaidPPerc) < 100 ? '%' : ''}
                                    </Text>
                                </View>

                                <ProgressBar
                                    progress={totalPaidPPerc}
                                    height={6}

                                    backgroundColor={totalPaidPPerc <= '30' ?AdminStyles.RedColor : totalPaidPPerc < "50" ? "rgb(126, 126, 203)" : AdminStyles.GreenColor}
                                />

                            </View>

                        </View>


                        {/* Progress Detail */}
                        <TouchableOpacity activeOpacity={2} style={styles.chartDetailDiv}>
                            <View style={styles.RecievedDiv}>
                                <Text style={styles.DetailHeaderText}>Budget</Text>
                                <View style={styles.AmountDiv}>
                                    <Text style={styles.paymentRupeesText}>₹</Text>
                                    <Text style={styles.ChartAmountText}>{projectBudget?.toLocaleString('en-IN')}</Text>
                                </View>
                            </View>
                            <View style={styles.RecievedDiv}>
                                <Text style={styles.DetailHeaderText}>Paid</Text>
                                <View style={styles.AmountDiv}>
                                    <Text style={[styles.paymentRupeesText]}>₹</Text>
                                    <Text style={[styles.ChartAmountText]}>{total_paid?.toLocaleString('en-IN')}</Text>
                                </View>
                            </View>

                            <Text style={{ height: 0.5, backgroundColor: 'grey', marginVertical: 8 }}></Text>
                            <View style={styles.RecievedDiv}>
                                <Text style={[styles.DetailHeaderText, { fontWeight: '500' }]}>{(total_paid) > projectBudget ? 'Extra paid' : 'Remaining'}</Text>
                                <View style={styles.AmountDiv}>
                                    <Text style={[styles.paymentRupeesText, { color: total_paid >= projectBudget ? AdminStyles.GreenColor : AdminStyles.color }]}>{total_paid > projectBudget ? '+' : ''} ₹</Text>
                                    <Text style={[styles.ChartAmountText, { fontWeight: '500', fontSize: 17, color: total_paid >= projectBudget ? AdminStyles.GreenColor : AdminStyles.color }]}>
                                        {(total_paid) > projectBudget ? (total_paid - projectBudget)?.toLocaleString('en-IN') : (projectBudget - total_paid)?.toLocaleString('en-IN')}

                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Text style={[styles.HoriZonalLine, { height: 1, marginBottom: 10 }]}></Text>


                        {/* All payment */}
                        <View style={styles.AllPaymentDiv}>
                            <View style={styles.PaymentHeaderDiv}>
                                <Text style={styles.PaymentHeaderText}>Payments</Text>
                            </View>

                            {project_payment.map((item, index) => {
                                { console.log(item, 'Paymen/////') }
                                return (
                                    <>
                                        <View key={index} style={styles.SinglePayment}>
                                            <View>
                                                <View style={styles.CashandIcon}>
                                                    <MaterialIcons style={styles.CashIcons} size={20} name={item.avtar} />

                                                    <Text style={styles.CashText}>{item.payment_type}</Text>
                                                </View>
                                                <Text style={styles.PaymentDateText}>{item?.payment_date}</Text>

                                            </View>
                                            <View style={styles.AmountDiv}>
                                                <Text style={styles.paymentRupeesText}>₹</Text>
                                                <Text style={styles.AmountText}>{(item.amount)?.toLocaleString('en-IN')}</Text>
                                            {/* PaymentDesc Icons */}
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => handleToggleDesc(index)} >
                                                <Ionicons style={{ paddingHorizontal: 5 }} name={showdesc === index ? 'chevron-up-outline' : 'chevron-down-outline'} size={17} color={'grey'} />
                                            </TouchableOpacity>
                                        </View>
                                            </View>
                                        {/* Show Desc */}
                                        {showdesc === index && (
                                            <View style={styles.PaymentDescDiv}>
                                                <Text style={styles.PaymentDescText}>fnkdhsk</Text>
                                            </View>
                                        )}
                                    </>
                                )
                            })}


                        </View>


                    </View>

                </ScrollView>
            </SafeAreaView>
        </>
    )
}

