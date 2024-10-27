import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, StatusBar, Dimensions, ScrollView, FlatList, RefreshControl, TouchableOpacity, Image, LogBox, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { projects } from '../AllData/projects'
import axios from 'axios';
import { Basepath, backgroundColor } from '../Global';
import { DarkTheme, DrawerActions, useFocusEffect } from '@react-navigation/native';
import ProgressBar from 'react-native-animated-progress';
import { LineChart } from 'react-native-chart-kit';
import { AuthContext } from '../AuthContext';


// import { members } from '../AllData/members'

const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

// let theme;
export default function Home({ navigation }) {
    const { admin_details, refresh, RefreshPage, theme, AdminStyles, GetAdminDetail } = useContext(AuthContext)
    const [allProject, setAllProject] = useState([])
    const [ongoingProject, setOngoingProject] = useState([])
    const [completedProjects, setCompletedProject] = useState([])

    const [selectedfilter, setSelectedFilter] = useState(0)

    // const [refresh, setRefresh] = useState(false)


    useFocusEffect(
        useCallback(() => {
            const GetData = async () => {
                await axios.get(`${Basepath}/project/view-project`)
                    .then((res) => {
                        // console.log(res.data.project[0].completedProjects[0].projects);
                        let ONGOING = res.data.project[0].ongoingProjects.length > 0 ? res.data.project[0].ongoingProjects[0].projects : []
                        let COMPLETE = res.data.project[0].completedProjects.length > 0 ? res.data.project[0].completedProjects[0].projects : []

                        setOngoingProject(ONGOING)
                        setCompletedProject(COMPLETE)
                        // setProjectClient(res.data.Projectmember)

                        // let ONGOING = res.data.project[0].ongoingProjects;
                        // let COMPLETE = res.data.project[0].completedProjects;
                        // let filterComplete = COMPLETE.filter((e) => e !== null)
                        // let filterOngoing = ONGOING.filter((e) => e !== null)

                        // setAllProject(res.data.project)
                        // setProjectMember(res.data.Projectmember)
                        // console.log(filterOngoing, 'totalExpeprojectprojectprojectprojectnses')

                        // setTotalExpense(res.data.Projectmember)
                    })
                    .catch((err) => {
                        console.log(err);
                    })



            }
            GetData()
            GetAdminDetail()
        }, [refresh])
    )
    // console.log(memberavtar);
    const handleSingleView = (item, index) => {
        let client = item?.clientDetails[0];
        console.log(client, 'ClientDetail......');
        navigation.navigate('SingleProject', { item, client, admin_details })
    }

    const data = {
        labels: ['Jan', 'Febr', 'March', 'Apl', 'May', 'June',],
        datasets: [
            {
                data: [100, 400, 100, 600, 800, 200,],
                color: (opacity = 1) => `${AdminStyles.statisticsColor}`, // color of the line
                strokeWidth: 0.5, // optional
            },
        ],
    };
    const chartConfig = {
        backgroundGradientFrom: 'white',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: 'white',
        // backgroundColor:'red',
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `${AdminStyles.statisticsColor}`,
        strokeWidth: 5, // optional, default 3
    };

    let filterData = [
        { id: 1, type: 'All Project' },
        { id: 2, type: 'Ongoing ' },
        { id: 3, type: 'Completed ' },
    ]
    const CheckFilter = (index) => {
        console.log(index);
        setSelectedFilter(index)
    }

    //    Styles
    const styles = StyleSheet.create({
        mainContainer: {
            height: windowheight,
            width: windowwidth,
            backgroundColor: AdminStyles.backgroundColor
        },

        // headerItem
        HeaderItem: {
            // backgroundColor: 'red',
            paddingVertical: 15,
            paddingHorizontal: 8,
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center'
        },
        adminImageName: {
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
        },

        adminImage: {
            height: 36,
            width: 36,
            borderRadius: 999,
        },
        adminNameDiv: {
            paddingHorizontal: 10,
        },
        adminName: {
            fontSize: 15,
            textTransform: 'capitalize',
            marginTop: 4,
            fontWeight: '500',
            color: AdminStyles.color

        },
        greeting: {
            color: AdminStyles.color
        },
        TopIcons: {
            flexDirection: 'row',
            paddingHorizontal: 6
        },
        topicons: {
            paddingHorizontal: 15
        },

        // statistics
        MainStatistics: {
            // backgroundColor: 'yellow',
            padding: 5,
            height: 380
        },
        TimeDiv: {
            // backgroundColor: 'red',
            paddingHorizontal: 10,
            paddingVertical: 5,


        },
        TimeDivInside: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 50


        },
        EashTime: {
            height: 35,
            width: 65,
            marginHorizontal: 5,
            // paddingHorizontal:15,
            backgroundColor: 'rgba(198, 195, 195, 0.43)',
            // backgroundColor: 'rgb(64, 115, 64)',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',

        },
        EashTmeText: {
            color: AdminStyles.GreyWhite,
            // color:'white',
        },
        calendarDiv: {
            // backgroundColor:'pink',
            padding: 5,
            flexDirection: 'row'

        },
        CalendarIcon: {
            paddingHorizontal: 10,
            color: AdminStyles.color

        },
        CalendarText: {
            //    paddingHorizontal:2
            color: AdminStyles.color,
            fontWeight: '500'

        },


        MainGraphsDiv: {
            // backgroundColor: 'red',
            // padding: 5,
            // height: 280,
            // marginHorizontal: 10
        },
        statisticsProjectNameDiv: {
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        statisticsProjectNameText: {
            color: 'grey',
            fontWeight: '400',
            fontSize: 15,
        },
        statisticsProjectIcons: {
            position: 'relative',
            left: 50
        },


        // Filter
        FilterDiv: {
            // backgroundColor: 'yellow',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 15,
            marginTop: 10
        },
        SingleFilter: {
            marginHorizontal: 13,
            marginVertical: 5,
            backgroundColor: theme == 'dark' ? AdminStyles.cardBackGround : 'rgb(230, 230, 230)',
            paddingHorizontal: 8,
            padding: 6,
            borderRadius: 15,
        },
        selectedfilterStyles: {
            backgroundColor: 'rgb(48, 112, 48)',
            color: 'white',
            marginHorizontal: 13,
            marginVertical: 5,
            paddingHorizontal: 8,
            padding: 6,
            borderRadius: 15
        },
        // my projects
        AllProjectDiv:{
            paddingBottom:100,
            paddingTop:10
        },
        MyProjectDiv: {
            // backgroundColor: 'pink',
            marginBottom: 8,
            padding: 8,
            // minHeight: windowheight+400,
            // flex:1,
        },
        MyProjectHeaderText: {
            fontWeight: '500',
            paddingHorizontal: 5,
            // backgroundColor:'red',
            fontSize: 18,
            color: 'grey'
        },
        SingleProjectDiv: {
            // backgroundColor: 'red',
            padding: 2,
            marginTop: 4,
            // marginBottom: 100,

        },
        SingleProject: {
            // backgroundColor: 'yellow',
            backgroundColor: AdminStyles.cardBackGround,
            padding: 10,
            height: 180,
            borderRadius: 10,
            marginVertical: 8,
            elevation: 2,
            justifyContent: 'center',

            //shadow for ios
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
        },
        memberandprogressDiv: {
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        ProjectNameDiv: {
            // backgroundColor: 'red',
            height: 40
        },
        ProjectNameText: {
            fontWeight: '500',
            fontSize: 18,
            color: AdminStyles.color
        },
        projectMembersDiv: {
            // backgroundColor: 'pink',
            padding: 10

        },
        projectMembers: {
            // backgroundColor: 'grey',
            flexDirection: 'row'


        },
        projectmemberImage: {
            height: 40,
            width: 40,
            borderRadius: 100,
            marginLeft: -5,
            borderWidth: 1,
            // borderColor:'green',
            borderColor: 'rgb(202, 200, 200)'

        },
        overlayContainer: {
            height: 40,
            width: 40,
            borderRadius: 100,
            marginLeft: -5,
            backgroundColor: 'black',
            justifyContent: "center",
            alignItems: 'center'
        },
        overlayText: {
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',

        },
        // progressbar
        progressbarDiv: {
            // backgroundColor: 'grey',
            marginTop: 2
        },
        progress: {
            padding: 5,
            width: 180,
        },
        progressTextDiv: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-between",
            // backgroundColor: 'red',
            marginBottom: 5,
        },
        progressText: {
            color: 'grey'
        },
        progressPercentage: {
            color: '#3f94fc'
        },

        // deadLine and Budget
        deadLineAndBudget: {
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        // deadLine date
        deadLineDateDiv: {
            margin: 2,
        },
        deadLineHeader: {
            color: theme == 'dark' ? 'rgba(255, 255, 255, 0.732)' : 'grey'
        },
        deadLinedate: {
            color: theme == 'dark' ? 'rgba(255, 255, 255, 0.732)' : 'grey'
        },
        BudgetDiv: {
            // backgroundColor:'grey',
            flexDirection: 'row',
            alignItems: 'center'
        },
        BudgetRupees: {
            fontSize: 15,
            color: theme == 'dark' ? 'rgba(255, 255, 255, 0.732)' : 'black'
        },
        BudgetAmountText: {
            fontSize: 26,
            fontWeight: '500',
            color: theme == 'dark' ? 'rgba(255, 255, 255, 0.732)' : 'black'
        },
        totalExpenseDiv: {
            alignSelf: "flex-end",
            // justifyContent:'center',
            flexDirection: 'row'
        },
        ExpenseRupees: {
            fontSize: 12,
            alignSelf: "center",
            color: 'rgb(231, 147, 147)',
            fontWeight: '400',



        },
        totalExpenseText: {
            color: 'rgb(231, 147, 147)',
            fontWeight: '400',
            fontSize: 15,

        },
        // Completed Project
        MyCompletedProjectDiv: {
            marginBottom: 150,
            padding: 8
        },
        MyCompletedHeaderText: {
            fontWeight: '500',
            paddingHorizontal: 5,
            // backgroundColor:'red',
            fontSize: 18,
            color: 'grey'

        },

    })

    return (
        <>

            <SafeAreaView style={[styles.mainContainer]}>
                <StatusBar backgroundColor={'grey'} />
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={() => RefreshPage()} />
                }>
                    <View style={styles.HeaderItem}>
                        <View style={styles.adminImageName} >

                            {/* image */}
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                <Image style={styles.adminImage} source={{ uri: admin_details.avtar }} />
                            </TouchableOpacity>


                            <View style={styles.adminNameDiv}>
                                <Text style={styles.greeting}>Welcome back</Text>
                                <Text style={[styles.adminName]}>{admin_details?.name}</Text>

                            </View>


                        </View>
                        <View style={styles.TopIcons}>
                            <Ionicons style={[styles.topicons, { color: AdminStyles.color }]} name='notifications-sharp' size={20} />
                            <Ionicons style={{ color: AdminStyles.color }} name='search-outline' size={20} />

                        </View>
                    </View>

                    {/* statistics*/}

                    <View style={styles.MainStatistics}>
                        {/* time wise container*/}
                        <View style={styles.TimeDiv}>

                            <View style={styles.TimeDivInside}>
                                <TouchableOpacity activeOpacity={0.8} style={styles.EashTime}>
                                    <Text style={styles.EashTmeText}>Date</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.EashTime}>
                                    <Text style={styles.EashTmeText}>Week</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.EashTime}>
                                    <Text style={styles.EashTmeText}>Month</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.EashTime}>
                                    <Text style={styles.EashTmeText}>Year</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        {/* calendar */}
                        <View style={styles.calendarDiv}>
                            <Ionicons style={styles.CalendarIcon} name='calendar-outline' size={20} />
                            <Text style={styles.CalendarText}>12 Sep,2023 - 18 Sep,23</Text>
                        </View>

                        {/* graphs */}
                        <View style={styles.MainGraphsDiv}>
                            <LineChart
                                data={data}
                                width={Dimensions.get('window').width - 20} // from react-native
                                height={220}
                                bezier
                                // horizontalLabelRotation={2}
                                // onDataPointClick={handleData}
                                chartConfig={chartConfig}
                                // withHorizontalLines={false}
                                withVerticalLines={false}
                                style={{ marginVertical: 8, borderRadius: 16, }}
                            />
                            <View style={styles.statisticsProjectNameDiv}>
                                <Text style={styles.statisticsProjectNameText}>Luxury estates</Text>
                                <Ionicons style={styles.statisticsProjectIcons} name='chevron-forward-outline' size={20} />



                            </View>



                        </View>

                    </View>


                    {/* FilterRow */}
                    <View style={styles.FilterDiv}>
                        <Ionicons color={AdminStyles.color} name='filter' size={20} />
                        {filterData.map((item, index) => (
                            <View key={index} style={[styles.SingleFilter, selectedfilter === index && styles.selectedfilterStyles]}>
                                <TouchableOpacity onPress={() => CheckFilter(index)}>
                                    <Text style={selectedfilter === index ? { color: 'white' } : { color: AdminStyles.color }}>{item.type}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    {/* myProjects */}

<View style={styles.AllProjectDiv}>

                    {selectedfilter === 0 || selectedfilter == 1 ? (
                        <View style={styles.MyProjectDiv}>
                            <Text style={styles.MyProjectHeaderText}>Ongoing project</Text>

                            <View style={styles.SingleProjectDiv}>
                                {ongoingProject == 0 ? (
                                    <View style={{ marginVertical: 15, paddingHorizontal: 8 }}>
                                        <Text style={{ color: 'grey' }}>No ongoing project ..</Text>
                                    </View>
                                ) :
                                    ongoingProject?.map((item, index) => {
                                        return (
                                            <>
                                                <TouchableOpacity key={index} onPress={() => handleSingleView(item, index)} activeOpacity={0.8} style={styles.SingleProject}>
                                                    <View style={styles.ProjectNameDiv}>
                                                        <Text style={styles.ProjectNameText}>{item?.name}</Text>
                                                    </View>
                                                    <View style={styles.memberandprogressDiv}>
                                                        <View style={styles.projectMembersDiv}>
                                                            <View style={styles.projectMembers}>
                                                                {item?.member_avtar?.length == 0 ? (
                                                                    <Text style={{ color: 'grey' }}>No member</Text>
                                                                ) : ''}
                                                                {item?.member_avtar?.slice(0, 2).map((item, Index) => (
                                                                    <>
                                                                        <Image key={Index} style={styles.projectmemberImage} source={{
                                                                            uri:
                                                                                item
                                                                        }} />
                                                                    </>
                                                                ))}
                                                                {item?.member_avtar?.length > 2 && (
                                                                    <View style={styles.overlayContainer}>
                                                                        <Text style={styles.overlayText}>+{item?.member_avtar?.length - 2}</Text>
                                                                    </View>
                                                                )}
                                                            </View>
                                                        </View>

                                                        <View style={styles.progressbarDiv}>
                                                            <View style={styles.progress}>
                                                                <View style={styles.progressTextDiv}>
                                                                    <Text style={styles.progressText}>Progress</Text>
                                                                    <Text style={styles.progressPercentage}>{`${50}%`}</Text>

                                                                </View>

                                                                <ProgressBar
                                                                    progress={50}
                                                                    height={6}
                                                                    backgroundColor={"#3f94fc"}
                                                                />

                                                            </View>

                                                        </View>

                                                    </View>
                                                    <View style={styles.deadLineAndBudget}>
                                                        {/* dead line date */}
                                                        <View style={styles.deadLineDateDiv}>
                                                            <Text style={styles.deadLineHeader}>Deadline</Text>
                                                            <Text style={styles.deadLinedate}>{item?.end_date}</Text>
                                                        </View>
                                                        {/* budget */}
                                                        <View style={styles.BudgetDiv}>
                                                            <Text style={styles.BudgetRupees}>₹ </Text>
                                                            <Text style={styles.BudgetAmountText}>{(item?.budget)?.toLocaleString('en-In')}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={styles.totalExpenseDiv}>
                                                        {/* <Text>{item.name} </Text> */}
                                                        <Text style={styles.ExpenseRupees}>
                                                            {(item?.totalExpense) ? ('- ₹ ') : ''}
                                                        </Text>
                                                        <Text style={styles.totalExpenseText}>
                                                            {(item?.totalExpense) ? (item?.totalExpense)?.toLocaleString('en-In') :
                                                                (<Text style={{ color: 'grey', fontSize: 13 }}>No exp</Text>)

                                                            }
                                                        </Text>
                                                    </View>


                                                </TouchableOpacity>
                                            </>
                                        )
                                    })}
                            </View>
                        </View>)
                        : ''}

                    {/* Completed proejct */}
                    {selectedfilter === 0 || selectedfilter === 2 ? (
                    <View style={styles.MyCompletedProjectDiv}>
                        <Text style={styles.MyProjectHeaderText}>Completed project</Text>

                        <View style={styles.SingleProjectDiv}>
                            {completedProjects.length == 0 ? (
                                <View style={{ marginVertical: 15, paddingHorizontal: 8 }}>
                                    <Text style={{ color: 'grey' }}>No completed project ..</Text>
                                </View>
                            ) :
                                completedProjects?.map((item, index) => {
                                    return (
                                        <>
                                            <TouchableOpacity key={index} onPress={() => handleSingleView(item, index)} activeOpacity={0.8} style={styles.SingleProject}>
                                                <View style={styles.ProjectNameDiv}>
                                                    <Text style={styles.ProjectNameText}>{item?.name}</Text>
                                                </View>
                                                <View style={styles.memberandprogressDiv}>
                                                    <View style={styles.projectMembersDiv}>
                                                        <View style={styles.projectMembers}>
                                                            {item?.member_avtar?.length == 0 ? (
                                                                <Text style={{ color: 'grey' }}>No member</Text>
                                                            ) : ''}
                                                            {item?.member_avtar?.slice(0, 2).map((item, Index) => (
                                                                <>
                                                                    <Image key={Index} style={styles.projectmemberImage} source={{
                                                                        uri: item
                                                                    }} />
                                                                </>
                                                            ))}
                                                            {item?.member_avtar?.length > 2 && (
                                                                <View style={styles.overlayContainer}>
                                                                    <Text style={styles.overlayText}>+{item?.member_avtar?.length - 2}</Text>
                                                                </View>
                                                            )}
                                                        </View>
                                                    </View>

                                                    <View style={styles.progressbarDiv}>
                                                        <View style={styles.progress}>
                                                            <View style={styles.progressTextDiv}>
                                                                <Text style={styles.progressText}>Progress</Text>
                                                                <Text style={styles.progressPercentage}>{`${50}%`}</Text>

                                                            </View>

                                                            <ProgressBar
                                                                progress={50}
                                                                height={6}
                                                                backgroundColor={"#3f94fc"}
                                                            />

                                                        </View>

                                                    </View>

                                                </View>
                                                <View style={styles.deadLineAndBudget}>
                                                    {/* dead line date */}
                                                    <View style={styles.deadLineDateDiv}>
                                                        <Text style={styles.deadLineHeader}>Deadline</Text>
                                                        <Text style={styles.deadLinedate}>{item?.end_date}</Text>
                                                    </View>
                                                    {/* budget */}
                                                    <View style={styles.BudgetDiv}>
                                                        <Text style={styles.BudgetRupees}>₹ </Text>
                                                        <Text style={styles.BudgetAmountText}>{(item?.budget)?.toLocaleString('en-In')}</Text>
                                                    </View>
                                                </View>

                                                <View style={styles.totalExpenseDiv}>
                                                    <Text style={styles.ExpenseRupees}>{item.totalExpense ? ('- ₹ ') : ''}</Text>
                                                    <Text style={styles.totalExpenseText}>{(item?.totalExpense) ? (item?.totalExpense)?.toLocaleString('en-In') :
                                                        (<Text style={{ color: 'grey', fontSize: 13 }}>No exp</Text>)
                                                    }</Text>
                                                </View>


                                            </TouchableOpacity>
                                        </>
                                    )
                                })}
                        </View>

                    </View>
                    ):''}

</View>

                </ScrollView>
            </SafeAreaView>

        </>
    )
}



