import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import axios from 'axios'
import { Basepath } from '../Global'
import { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressBar from 'react-native-animated-progress';
import { AuthContext } from '../AuthContext'


const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

export default function AllWork({ route, navigation }) {
    let { theme,backgroundColor,color,GreyWhite,cardBackGround} = useContext(AuthContext)
    let { id, selectedStatus, project_name, totalBudget } = route.params;
    const [work, setWorks] = useState([])
    const [expense, setExpense] = useState([])
    const [workadminavtar, setWorkAdminAvtar] = useState('')




    useFocusEffect(
        useCallback(() => {
            const GetAllWork = async () => {
                await axios.get(`${Basepath}/work/view-project-work/${id}`)
                    .then((res) => {
                        // console.log(res.data.work, 44444);
                        setWorkAdminAvtar(res?.data?.adminavtar)
                        setWorks(res.data.work)
                        setExpense(res.data.expense)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }

            GetAllWork()
        }, [])
    )


    // Styles
    const styles = StyleSheet.create({
        mainContainer: {
            width: windowwidth,
            flex: 1,
            backgroundColor: backgroundColor
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
            color
        },
    
        maintWorkContainer: {
            paddingHorizontal: 2,
            margin: 9,
        },
        // project & ProjectName 
        ProjectHeaderDiv: {
            // backgroundColor: 'red'
        },
        ProjectHeaderText: {
            color: color,
            fontWeight: '500',
            fontSize: 17
    
        },
        ProjectNameDiv: {
            // backgroundColor: 'red',
            paddingVertical: 5,
            flexDirection: 'row',
            marginVertical: 8,
            // justifyContent: 'center',
            // width: windowwidth - 89
        },
        ProjectNameText: {
            fontWeight: '500',
            fontSize: 16,
            color: GreyWhite
        },
    
        // Progress
        // progress
        progressbarDiv: {
            // backgroundColor:'red',   
            // marginVertical: 3,
            marginBottom: 20,
        },
        progressTextDiv: {
            // backgroundColor:'grey',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // paddingHorizontal:3,
            paddingVertical: 10
        },
        
        
    
    
        // Works
        WorkDiv: {
            // backgroundColor: 'red',
            paddingVertical: 5
        },
        workHeaderText: {
            fontWeight: '500',
            fontSize: 17,
            color
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
            backgroundColor:cardBackGround,
            padding: 8,
            height: 85,
            borderRadius: 12,
            marginVertical: 6,
            elevation: 1
        },
        WorkText: {
            fontWeight: '500',
            fontSize: 16,
            color
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
            color: GreyWhite,
            paddingHorizontal: 5,
            flexDirection: 'row',
            fontSize:16,
            // justifyContent:'flex-end',
            
        },
        WorkExpenseRupeesText: {
            fontSize: 22,
            color: GreyWhite,
    
        },
        overlayTextWork: {
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
    
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
       
    
    
    
    })
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.MainHeader}>
                    <Ionicons color={color} onPress={() => navigation.goBack()} name='chevron-back-outline' size={22} />
                    <Text style={styles.headerText}>Works</Text>
                </View>

                <View style={styles.maintWorkContainer}>

                    {/* ProjectName inside All Works */}
                    <View>
                        <Text style={styles.ProjectHeaderText}>Project</Text>
                    </View>
                    <View style={styles.ProjectNameDiv}>
                        <Text numberOfLines={2} style={styles.ProjectNameText}>{project_name}</Text>
                    </View>

                    {/* progress */}
                    {/* <View style={styles.progressbarDiv}>
                        <View style={styles.progressTextDiv}>
                            <Text style={styles.progressText}>Progress</Text>
                            <Text style={styles.progressPercentage}>{`${50}%`}</Text>
                        </View>
                        <ProgressBar
                            progress={50}
                            height={10}
                            backgroundColor={"#3f94fc"}
                        />
                    </View> */}

                    {/* works */}
                    <View style={styles.WorkDiv}>

                        <View style={styles.WorkAndAddWork}>
                            <Text style={styles.workHeaderText}>Works</Text>
                        </View>

                        {/* SingleWork */}
                        <View style={styles.SingleWorkDiv}>

                            {/* SingleWork */}
                            {work?.length == 0 ? (
                                <View>
                                    <Text style={{ color: 'grey', paddingHorizontal: 10 }}>No work added..</Text>

                                </View>
                            ) : ''}

                            {work?.map((item, index) => {
                                const totalAmount = expense.find(e => e.work_id === item._id)?.totalAmount;
                                const admintotalAmount = workadminavtar.find(e => e.work_id === item._id)?.totalAmount;
                                const workExpenses = expense.filter(e => e.work_id === item._id);
                                const AdminAvtar = workadminavtar.filter(e => e.work_id === item._id);
                                return (
                                    <>
                                        <TouchableOpacity onPress={() => navigation.navigate('SingleWorkAdmin', { projectId: id, item, workExpenses, selectedStatus, totalBudget })} key={index} activeOpacity={0.8} style={styles.SingleWork}>
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
                                                        {totalAmount || admintotalAmount?.toLocaleString('en-IN')}
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
        </SafeAreaView>
    )
}

