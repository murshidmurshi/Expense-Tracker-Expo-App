import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, TextInput, Dimensions, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'
import { expenses } from './expenses'
import Carousel from 'react-native-snap-carousel';
import MainCard from './MainCard'
import { DrawerActions, useFocusEffect } from '@react-navigation/native'
import ProgressBar from 'react-native-animated-progress';
import axios from 'axios'
import { Basepath } from '../Global'
import { AuthContext } from '../AuthContext'



const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

export default function MemberHome({ navigation }) {
    let {  RefreshPage, refresh, MemberStyles,membertheme,admin_details,MemberSingleProjectData,ongoingProjects,completedProjects,memberdetail } = useContext(AuthContext)
    
    const [selectedfilter, setSelectedFilter] = useState(0)
  
    let filterData = [
        { id: 1, type: 'All Project' },
        { id: 2, type: 'Ongoing ' },
        { id: 3, type: 'Completed ' },
    ]

    const CheckFilter = (index) => {
        console.log(index);
        setSelectedFilter(index)
    }
    const handleSingleView = (item, index) => {
        navigation.navigate('MemberSingleProject', { projectId:item._id })
    }


    // console.log(memberToken, '55000');
    useFocusEffect(
        useCallback(() => {
            
                MemberSingleProjectData()
        }, [refresh])

    )

    // Styles
    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: MemberStyles.backgroundColor,
            flex: 1,

        },
        MainDiv: {
            padding: 2,
            // backgroundColor:'red'
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
        memberImageDiv: {
            alignItems: 'center',
            flexDirection: 'row'
        },
        memberImage: {
            height: 36,
            width: 36,
            borderRadius: 999,
        },
        memberNameDiv: {
            paddingHorizontal: 10,
            // alignSelf:'flex-start'
        },
        memberName: {
            fontSize: 15,
            textTransform: 'capitalize',
            marginTop: 4,
            fontWeight: '500',
            color:MemberStyles.color
        },
        HeaderIcons: {
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor:'yellow'
        },
        topicons: {
            // paddingLeft: 15,
            color:MemberStyles.color
        },


        // Search Div
        SearchDiv: {
            alignSelf: 'center',
            flexDirection: 'row',
            backgroundColor: MemberStyles.cardBackGround,
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
            color: 'grey',
            paddingHorizontal: 5
        },
        // Filter
        FilterDiv: {
            // backgroundColor: 'yellow',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 15
        },
        SingleFilter: {
            marginHorizontal: 13,
            marginVertical: 5,
            backgroundColor:membertheme=='dark'? MemberStyles.cardBackGround:'rgb(230, 230, 230)',
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
        // My Project
        MyProjectDiv: {
            // backgroundColor: 'pink',
            marginBottom: 8,
            marginTop: 18,
            paddingHorizontal: 6,
            // minHeight: windowheight+400,
            // flex:1,
        },
        MyProjectHeaderText: {
            fontWeight: '500',
            paddingHorizontal: 2,
            // backgroundColor:'red',
            fontSize: 18,
            color:MemberStyles.GreyWhite
        },
        SingleProjectDiv: {
            // backgroundColor: 'red',
            padding: 2,
            marginTop: 2,
            // marginBottom: 100,

        },
        SingleProject: {
            backgroundColor: MemberStyles.cardBackGround,
            // backgroundColor:'red',
            padding: 10,
            height: 170,
            borderRadius: 12,
            marginVertical: 5,
            elevation: 1,
            justifyContent: 'space-between',
            //shadow for ios
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
        },
        CategoryText: {
            backgroundColor: MemberStyles.GreyWhite,
            alignSelf: "flex-start",
            color: MemberStyles.backgroundColor,
            textTransform: "capitalize",
            borderRadius: 20,
            paddingHorizontal: 9,
            padding: 5,
            fontWeight: '500'
        },
        ProjectNameDiv: {
            // backgroundColor: 'red'
        },
        ProjectNameText: {
            fontWeight: '500',
            fontSize: 17,
            width: '90%',
            color:MemberStyles.color

        },
        ProjectDescDiv: {

        },
        ProjectDescText: {
            color:MemberStyles.GreyWhite
        },

        // About Due Date


        DateandTeammatesDiv: {
            // backgroundColor: 'red',
            marginBottom: -10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        DateHeaderText: {
            paddingVertical: 7,
            color:MemberStyles.color
        },

        TeamDivandDateDiv: {
            // backgroundColor:'yellow',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',



        },
        DateDiv: {
            // backgroundColor: 'red',

            // paddingVertical:5

        },
        IconandDateDiv: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        calendarIcon: {
            fontSize: 16,
            color: MemberStyles.GreyWhite


        },
        dateValueText: {
            // color:'grey'
            paddingHorizontal: 6,
            color: MemberStyles.GreyWhite

        },

        // Team Mates
        TeamMatesDiv: {
            backgroundColor: 'yellow'

        },
        Teamtext: {
            color: MemberStyles.color
        },
        TeamMemberDiv: {
            flexDirection: 'row',
        },
        TeammemberImage: {
            height: 32,
            width: 32,
            borderRadius: 100,
            marginLeft: -5
        },

        // overlayContainer and Text
        overlayContainer: {
            height: 32,
            width: 32,
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
    })

    return (
        <>
            <SafeAreaView style={styles.mainContainer}>
                <StatusBar backgroundColor={'grey'} />
                <ScrollView style={styles.MainDiv}
                  refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={() => RefreshPage()} />
                  }
                >
                    <View>

                        {/* Header Items */}
                        <View style={styles.HeaderItem}>
                            <View style={styles.memberImageDiv} >
                                <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Profile')}>
                                    <Image style={styles.memberImage} source={{ uri: memberdetail?.avtar }} />
                                </TouchableOpacity>

                                <View style={styles.memberNameDiv}>
                                    <Text style={[styles.memberName]}>{memberdetail?.name}</Text>
                                </View>

                            </View>

                            <View style={styles.HeaderIcons}>
                                {/* <Ionicons name='search-outline' size={20} /> */}
                                <Ionicons style={[styles.topicons,]} name='notifications-sharp' size={20} />
                            </View>

                        </View>
                        {/* Search Div */}
                        <View style={styles.SearchDiv}>
                            <Ionicons style={styles.SearchIcon}  name='search-outline' size={20} />
                            <TextInput placeholderTextColor={MemberStyles.color}  style={{color:MemberStyles.color}} placeholder='Search ' />
                        </View>
                        {/* FilterRow */}
                        <View style={styles.FilterDiv}>
                            <Ionicons color={MemberStyles.color} name='filter' size={20} />
                            {filterData.map((item, index) => (
                                <View key={index} style={[styles.SingleFilter, selectedfilter === index && styles.selectedfilterStyles]}>
                                    <TouchableOpacity onPress={() => CheckFilter(index)}>
                                        <Text style={selectedfilter === index ? { color: 'white' }:{color:MemberStyles.color}}>{item.type}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                        {/* Ongoing */}
                        {selectedfilter === 0 || selectedfilter == 1 ? (
                            <View style={styles.MyProjectDiv}>
                                <Text style={styles.MyProjectHeaderText}>In progress</Text>
                                <View style={styles.SingleProjectDiv}>
                                    {ongoingProjects == 0 ? (
                                        <View style={{ marginVertical: 15, paddingHorizontal: 8 }}>
                                            <Text style={{ color: 'grey' }}>No ongoing project ..</Text>
                                        </View>
                                    ) :

                                        ongoingProjects.map((item, index) => (
                                            <>
                                                <TouchableOpacity key={index} activeOpacity={0.8} style={styles.SingleProject} onPress={() => handleSingleView(item, index)}>
                                                    <Text style={styles.CategoryText}>Building</Text>
                                                    <View style={styles.ProjectNameDiv}>
                                                        <Text numberOfLines={1} style={styles.ProjectNameText}>{item.name}</Text>
                                                    </View>
                                                    <View style={styles.ProjectDescDiv}>
                                                        <Text style={styles.ProjectDescText}>{item.description}</Text>
                                                    </View>

                                                    {/* DateandTeammatesDiv for Header */}
                                                    <View style={styles.DateandTeammatesDiv}>
                                                        <Text style={styles.DateHeaderText}>Dead line</Text>
                                                        <Text style={styles.Teamtext}>Teammates</Text>

                                                    </View>
                                                    {/* DateandTeammatesDiv */}
                                                    <View style={styles.TeamDivandDateDiv}>
                                                        <View style={styles.DateDiv}>
                                                            <View style={styles.IconandDateDiv}>
                                                                <Ionicons style={styles.calendarIcon} name='calendar-outline' />
                                                                <Text style={styles.dateValueText}>{item.end_date}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.TeamMemberDiv}>

                                                            {item?.member_avtar?.slice(0, 2).map((item, index) => (
                                                                <View key={index}>
                                                                    <Image style={styles.TeammemberImage} source={{ uri: item }} />
                                                                </View>
                                                            ))}
                                                            {item?.member_avtar?.length > 2 && (
                                                                <View style={styles.overlayContainer}>
                                                                    <Text style={styles.overlayText}>+{item?.member_avtar?.length - 2}</Text>
                                                                </View>
                                                            )}


                                                        </View>
                                                    </View>

                                                </TouchableOpacity>
                                            </>
                                        ))}


                                </View>

                            </View>
                        ) : ''}

                        {/* Completed */}
                        {selectedfilter === 0 || selectedfilter === 2 ? (
                            <View style={styles.MyProjectDiv}>
                                <Text style={styles.MyProjectHeaderText}>Completed</Text>
                                <View style={styles.SingleProjectDiv}>
                                    {completedProjects.length == 0 ? (
                                        <View style={{ marginVertical: 15, paddingHorizontal: 8 }}>
                                            <Text style={{ color: 'grey' }}>No completed project ..</Text>
                                        </View>
                                    ) :
                                        completedProjects?.map((item, index) => (
                                            <>
                                                <TouchableOpacity key={index} activeOpacity={0.8} style={styles.SingleProject} onPress={() => handleSingleView(item, index)}>
                                                    <Text style={styles.CategoryText}>Building</Text>
                                                    <View style={styles.ProjectNameDiv}>
                                                        <Text numberOfLines={1} style={styles.ProjectNameText}>{item.name}</Text>
                                                    </View>
                                                    <View style={styles.ProjectDescDiv}>
                                                        <Text style={styles.ProjectDescText}>{item.description}</Text>
                                                    </View>
                                                    {/* DateandTeammatesDiv for Header */}
                                                    <View style={styles.DateandTeammatesDiv}>
                                                        <Text style={styles.DateHeaderText}>Dead line</Text>
                                                        <Text style={styles.Teamtext}>Teammates</Text>
                                                    </View>
                                                    {/* DateandTeammatesDiv */}
                                                    <View style={styles.TeamDivandDateDiv}>
                                                        <View style={styles.DateDiv}>
                                                            <View style={styles.IconandDateDiv}>
                                                                <Ionicons style={styles.calendarIcon} name='calendar-outline' />
                                                                <Text style={styles.dateValueText}>{item.end_date}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.TeamMemberDiv}>

                                                            {item?.member_avtar?.slice(0, 2).map((item, index) => (
                                                                <View key={index}>
                                                                    <Image style={styles.TeammemberImage} source={{ uri: item }} />
                                                                </View>
                                                            ))}
                                                            {item?.member_avtar?.length > 2 && (
                                                                <View style={styles.overlayContainer}>
                                                                    <Text style={styles.overlayText}>+{item?.member_avtar?.length - 2}</Text>
                                                                </View>
                                                            )}


                                                        </View>
                                                    </View>

                                                </TouchableOpacity>
                                            </>
                                        ))}


                                </View>

                            </View>
                        ) : ''}




                    </View>

                </ScrollView>

            </SafeAreaView>


        



















            <View>

                {/* <SafeAreaView style={styles.mainContainer}>
                <StatusBar />
                <ScrollView>
                    <View style={styles.TopActionDiv}>
                        <View style={styles.TopAction}>

                            <View style={tw`flex-row items-center`}>
                                <TouchableOpacity activeOpacity={0.8} >
                                    <Image style={{ height: 50, width: 50, borderRadius: 100 }} source={{ uri: memberdetail?.avtar }} />
                                </TouchableOpacity>
                                <View>
                                    <Text style={styles.memberName}>Good Evening,</Text>
                                    <Text style={styles.memberName}>{memberdetail?.name}</Text>
                                </View>
                            </View>

                            <View style={tw`flex-row items-center`}>
                                <Ionicons style={tw`px-5`} name='search-outline' size={25} onPress={() => navigation.navigate('search')} />
                                <Ionicons name='ellipsis-vertical-outline' size={25} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.cardDiv}>

                        <Carousel
                            containerCustomStyle={{ overflow: 'visible' }}
                            data={Card}
                            renderItem={({ item }) => <MainCard item={item} />}
                            firstItem={1}
                            inactiveSlideOpacity={0.75}
                            inactiveSlideScale={0.77}
                            itemWidth={260}
                            sliderWidth={350}
                            // loop={true}
                            slideStyle={{ display: 'flex', alignItems: 'center' }}


                        />
                    </View>

                    {/* All Expenses
                    <View style={styles.AllExpenses}>
                        <View style={styles.ExpenseDiv}>
                            <Text style={{ padding: 10 }}>Today</Text>
                            {expenses.map((item, index) => (
                                <TouchableOpacity activeOpacity={0.7}>

                                    <View style={styles.row}>
                                        <View style={[styles.rowIcon, { backgroundColor: 'white' }]}>
                                            <Ionicons name={item.icons} color='#000' size={18} />
                                        </View>

                                        <Text style={styles.rowLabel}>{item.label}</Text>
                                        <View style={{ flex: 1 }} />
                                        <Text style={styles.ExpenseAmout}>-₹{item.amount}</Text>



                                    </View>
                                </TouchableOpacity>
                            ))}

                        </View>



                    <View style={styles.projectDiv}>
                        {project?.map((item, index) => (
                            <TouchableOpacity activeOpacity={0.9} style={styles.project} onPress={() => navigation.navigate('membersingleproject', { projectId: item._id, memberId: memberdetail._id })}>
                                <Text style={styles.projectLabel}>{item?.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name='location-outline' size={15} />
                                    <Text style={styles.location}>{item.address}</Text>
                                </View>
                                {/* Status 
                                <View style={styles.statusDiv}>
                                    <Text>{item.name}</Text>
                                    <ProgressBar
                                        progress={55}
                                        height={20}
                                        backgroundColor="green"
                                    />
                                </View>

                                <View style={{ flex: 1 }} />

                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text>Work </Text>
                                        <Text >20 Days</Text>
                                    </View>
                                    <View style={styles.line}></View>
                                    <View>
                                        <Text>Left </Text>
                                        <Text >50 Days</Text>
                                    </View>

                                </View>

                                <View style={styles.ExpenseAmout}>
                                    <Text style={{ fontSize: 30, marginLeft: 20, }}>
                                        <Text style={{ fontSize: 20 }}>₹</Text>{item.budget}
                                    </Text>
                                </View>

                            </TouchableOpacity>
                        ))}





                    </View>


                </ScrollView>
            </SafeAreaView> */}
            </View>

        </>
    )
}

// const styles = StyleSheet.create({





















//     // mainContainer: {
//     //     flex: 1,
//     //     backgroundColor: 'white'
//     // },
//     // TopActionDiv: {
//     //     paddingHorizontal: 8,
//     //     backgroundColor:'red'

//     // },
//     // TopAction: {
//     //     flexDirection: 'row',
//     //     justifyContent: 'space-between',
//     //     alignItems: 'center'
//     // },
//     // memberName: {
//     //     fontSize: 20,
//     //     marginLeft: 10
//     // },
//     // cardDiv: {
//     //     paddingVertical: 20,
//     // },
//     // Card: {
//     //     padding: 10,
//     //     height: 170,
//     //     borderRadius: 15,
//     //     elevation: 7,
//     //     flexDirection: 'row',

//     // },
//     // AllExpenses: {
//     //     paddingVertical: 15,
//     //     paddingHorizontal: 5,
//     // },
//     // ExpenseDiv: {
//     // },
//     // row: {

//     //     flexDirection: 'row',
//     //     height: 50,
//     //     alignItems: 'center',
//     //     justifyContent: 'flex-start',
//     //     borderRadius: 8,
//     //     marginBottom: 12,
//     //     paddingHorizontal: 10,
//     // },
//     // rowIcon: {
//     //     padding: 5,
//     //     borderRadius: 9999,
//     //     marginRight: 10
//     // },
//     // ExpenseAmout: {
//     //     color: 'red'
//     // },
//     // projectDiv: {
//     //     // backgroundColor: 'red',
//     //     padding: 10,
//     //     paddingHorizontal: 20,
//     //     flexDirection: 'column',

//     // },
//     // project: {
//     //     padding: 15,
//     //     height: 200,
//     //     borderRadius: 18,
//     //     marginBottom: 18,
//     //     backgroundColor: '#f6f7f5',
//     //     elevation: 2

//     // },
//     // projectLabel: {
//     //     fontSize: 20,
//     //     paddingVertical: 7

//     // },
//     // location: {
//     //     paddingHorizontal: 7

//     // },
//     // statusDiv: {
//     //     padding: 15,
//     //     // marginTop: 20,
//     //     justifyContent: 'center'

//     // },
//     // line: {
//     //     height: 40, // Adjust the height as needed
//     //     width: 1,     // Adjust the width as needed
//     //     backgroundColor: 'black',
//     //     marginHorizontal: 10
//     // },
//     // ExpenseAmout: {

//     //     marginHorizontal: 10,
//     //     position: 'absolute',
//     //     bottom: 10,
//     //     right: 10
//     // },
// })