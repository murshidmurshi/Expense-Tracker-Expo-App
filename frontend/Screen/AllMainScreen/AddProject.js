import React, { useCallback, useContext, useRef, useState } from 'react'
import { View, Text, SafeAreaView, Image, Dimensions, ScrollView, StyleSheet, StatusBar, TextInput, Modal, TouchableOpacity, Pressable, Animated } from 'react-native'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

import axios from 'axios';
import { Basepath } from '../Global';
import { Dropdown } from 'react-native-element-dropdown';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';


const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;


export default function AddExpenses({ navigation }) {
  let { AdminStyles } = useContext(AuthContext);
  const animatedValue = new Animated.Value(0);

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      // You can add more transforms here as needed
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
  };
  Animated.timing(animatedValue, {
    toValue: 1, // Final value
    duration: 1000, // Duration in milliseconds
    useNativeDriver: true, // For better performance (if possible)
  }).start();


  const [project, setProject] = useState({})
  const [allclient, setAllClient] = useState([])
  const [clientDetail, setClientDetail] = useState({})

  const handleChange = (type, value) => {
    setProject({ ...project, [type]: value })

  }
  const ModelInputChange = (type, value) => {
    setClientDetail({ ...clientDetail, [type]: value })

  }

  const scrollViewRef = useRef(null)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isModalVisible3, setModalVisible3] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedclient, setSelectedClient] = useState(null);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  const StartonChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    console.log(currentDate);
    setShowStartDatePicker(false)
    setStartDate(currentDate);
  };
  const EndonChange = (event, selectedDate) => {
    console.log(event);
    const currentDate = selectedDate || endDate;
    console.log(currentDate);
    setShowEndDatePicker(false)
    setEndDate(currentDate);
  };


  // const scrollToTop = () => {
  //   if (scrollViewRef.current) {
  //     scrollViewRef.current.scrollTo({ y: 0, animated: true })
  //   }
  // };


  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
  };


  const AddClient = async () => {
    console.log(clientDetail, 'ClentDetail.........');
    let defaultAvtar = 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais'
    let value = { ...clientDetail, avtar: defaultAvtar }

    await axios.post(`${Basepath}/client/add`, value)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setCount(count + 1)
          setModalVisible3(false)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const renderItem = item => {
    return (
      <View style={styles.DropdownItems}>
        <Image style={styles.ClientImage} source={{ uri: item.avtar }} />
        <Text style={styles.ClientNameText}>{item.name}</Text>
      </View>
    );
  };
  const SubmitProject = () => {
    console.log('SubmitProject.........');
    console.log(project, 'Project');
    let START = startDate.toISOString().split('T')[0]
    let END = endDate.toISOString().split('T')[0]


    let value = ({ ...project, start_date: START, estimated_end_date: END, client_id: selectedclient._id })
    setProject(value)
    console.log(value, 555555);

    axios.post(`${Basepath}/project/add-project`, value)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          navigation.navigate('Home')
          setEndDate(new Date())
          setStartDate(new Date())
          setProject({})
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  useFocusEffect(
    useCallback(() => {
      const GetAllCient = async () => {
        await axios.post(`${Basepath}/client/view`)
          .then((res) => {
            // console.log(res.data);
            setAllClient(res.data.clients)
          })
          .catch((err) => {
            console.log(err);
          })
      }
      GetAllCient()
    }, [count])
  )


  // Styles
  const styles = StyleSheet.create({

    mainContainer: {

      backgroundColor: AdminStyles.backgroundColor,
      flex: 1
    },
    // main Header
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
      color: AdminStyles.color
      // backgroundColor:'yellow',
    },

    // input
    mainInputContainer: {
      // backgroundColor: "yellow",

      flex: 1,
      margin: 8,
      padding: 10,
      alignItems: "center"
    },
    inputLabel: {
      color: AdminStyles.GreyWhite,
      paddingHorizontal: 8,
      paddingVertical: 8,
      fontWeight: "500",

    },
    input: {
      width: windowwidth - 20,
      borderRadius: 15,
      marginBottom: 5,
      backgroundColor: AdminStyles.ModalInput,
      height: 50,
      paddingHorizontal: 15,
      color: AdminStyles.color
      // elevation: 1,

      // shadowColor: 'black',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.5,
      // shadowRadius: 1,
    },
    // date
    StartandEndDiv: {
      flexDirection: 'row',
      width: windowwidth - 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 8,
      // backgroundColor:'red'
    },
    DateDiv: {
      // backgroundColor: 'red',
      backgroundColor: AdminStyles.ModalInput,
      borderRadius: 10,
      height: 45,
      alignItems: "center",
      justifyContent: 'center'

    },
    DateText: {

      textAlign: 'center',
      color: AdminStyles.color,
    },
    // Button

    loginBtn: {
      backgroundColor: AdminStyles.GreyWhite,
      width: windowwidth - 33,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 25,
      height: 50,
      elevation: 3,
      justifyContent: 'center',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },

    buttonText: {
      color: AdminStyles.backgroundColor,
      fontSize: 19,
      textAlign: 'center'
    },
    // model
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background

    },
    calendar: {
      width: 300, // Set your desired width
      backgroundColor: 'white',
      elevation: 20,

    },
    CalendarHeader: {
      backgroundColor: 'black',
      padding: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: windowwidth - 60,
    },
    // dropDown
    // container: {
    //   backgroundColor: 'white',
    //   padding: 16,
    //   height:200,
    // },
    DropdownContainerDiv: {
      // backgroundColor: 'red',
      flexDirection: 'row',
      alignItems: 'center'
      // minHeight:200
    },
    dropdown: {
      width: windowwidth - 20,
      borderRadius: 15,
      marginBottom: 5,
      backgroundColor: AdminStyles.ModalInput,
      height: 50,
      paddingHorizontal: 15,
    },
    AddClientIconDiv: {
      paddingHorizontal: 5,
      position: 'absolute',
      right: 8,
      // backgroundColor: "#f6f6ff",
    },

    selectedTextStyle: {
      fontSize: 16,
      color: AdminStyles.color
    },
    placeholderStyle: {
      color: AdminStyles.color
    },
    iconStyle: {
      width: 20,
      height: 20,
      
    
    },
    inputSearchStyle: {
      height: 45,
      fontSize: 16,
      borderRadius: 15,
      // backgroundColor:'white',
      // backgroundColor:AdminStyles.ModalBackGround,
      color: AdminStyles.color,
      // borderWidth:1
    },
    DropdownItems: {
      margin: 2,
      height: 55,
      borderRadius: 15,
      paddingHorizontal: 15,
      // justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: AdminStyles.ModalBackGround,
    },
    ClientImage: {
      height: 45,
      width: 45,
      borderRadius: 15,

    },
    ClientNameText: {
      paddingHorizontal: 15,
      //  backgroundColor:'green',
      fontWeight: '500',
      fontSize: 14,
      color: AdminStyles.color
    },

    selectedClientImage: {
      height: 30,
      width: 30,
      borderRadius: 100,
    },

    AddClientDiv: {
      backgroundColor: AdminStyles.ModalBackGround,
      width: windowwidth - 51,
      padding: 5,
      height: windowheight * 0.5,
      borderRadius: 19
    },

    modalViewInside: {
      // backgroundColor:'red',
      flex: 1,
      padding: 5
    },
    ClientDetailHeaderDiv: {
      alignItems: 'center',
      paddingBottom: 12
    },

    ClientDetailHeaderText: {
      color: AdminStyles.ModalHeader,
      fontWeight: '500',
      fontSize: 18,
      paddingHorizontal: 5

    },
    ModelInputLabelText: {
      color: AdminStyles.GreyWhite,
      fontWeight: '500',
      fontSize: 15,
      paddingHorizontal: 5
    },
    modelInput: {
      borderRadius: 15,
      marginVertical: 5,
      backgroundColor: AdminStyles.ModalInput,
      height: 50,
      paddingHorizontal: 15,
      fontSize: 15,
      color: AdminStyles.color

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
      color: AdminStyles.Modalbutton,
      width: 85,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
  })

  return (
    <>


      <SafeAreaView style={styles.mainContainer}>

        <ScrollView>
          {/* main Header */}
          <View style={styles.MainHeader}>
            <Ionicons color={AdminStyles.color} onPress={() => navigation.goBack()} name='chevron-back-outline' size={22} />
            <Text style={styles.headerText}>Create a new Project</Text>
          </View>

          {/* main InputContainer */}
          <Animated.View style={[styles.mainInputContainer]}>


            {/* project Client */}
            <View>
              <Text style={styles.inputLabel}>Select client</Text>
              <View style={styles.DropdownContainerDiv}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  
                
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  
                  data={allclient}
                  search
                  maxHeight={300}
                  labelField="name"
                  valueField="name"
                  placeholder="Select client"
                  searchPlaceholder="Search..."
                  value={selectedclient}
                  onChange={(item) => {
                    setSelectedClient(item);
                  }}
                  renderLeftIcon={() => (
                    <View style={{ paddingHorizontal: 5 }}>
                      {selectedclient ? (
                        // <Ionicons style={styles.icon} color="black" name="home-outline" size={20} />
                        <Image style={styles.selectedClientImage} source={{ uri: selectedclient?.avtar }} />

                      ) : (
                        <Ionicons style={styles.icon} color="black" name="person-outline" size={20} />

                      )}
                    </View>
                  )}
                  renderItem={renderItem}
                />

                <TouchableOpacity activeOpacity={1} onPress={toggleModal3} style={styles.AddClientIconDiv}>
                  <Ionicons name='add-circle' size={25} color={AdminStyles.color} />
                </TouchableOpacity>



              </View>

            </View>


            {/* project Title */}
            <View  >
              <Text style={styles.inputLabel}>Project Title</Text>
              <View style={styles.inputDiv}>
                <TextInput value={project.name} placeholderTextColor={AdminStyles.color} style={styles.input} onChangeText={(name) => handleChange('name', name)} placeholder='Add the project title' />
              </View>
            </View>

            {/* project desc */}
            <View >
              <Text style={styles.inputLabel}>Description</Text>
              <View style={styles.inputDiv}>
                <TextInput numberOfLines={3} multiline value={project.description} onChangeText={(description) => handleChange('description', description)} style={[styles.input, { height: 80 }]} placeholderTextColor={AdminStyles.color} placeholder='Add description ' />
              </View>
            </View>

            {/* project Address */}
            <View >
              <Text style={styles.inputLabel}>Location</Text>
              <View style={styles.inputDiv}>
                <TextInput value={project.address} placeholderTextColor={AdminStyles.color} style={styles.input} onChangeText={(address) => handleChange('address', address)} placeholder='Add location ' />
              </View>
            </View>

            {/* project Budget */}
            <View >
              <Text style={styles.inputLabel}>Budget</Text>
              <View style={styles.inputDiv}>
                <TextInput keyboardType='numeric' placeholderTextColor={AdminStyles.color} value={project.budget} onChangeText={(budget) => handleChange('budget', budget)} style={styles.input} placeholder='Add total budget ' />
              </View>
            </View>





            <View style={styles.StartandEndDiv}>
              {/* project startDate */}
              <View style={{ width: windowwidth * 0.5 - 20 }}>
                <Text style={styles.inputLabel}>Start</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.DateDiv} onPress={() => setShowStartDatePicker(true)}>
                  <Text style={styles.DateText} >
                    {startDate ? startDate?.toISOString().split('T')[0] : ("dd / mm / yy")}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* project EndDate */}
              <View style={{ width: windowwidth * 0.5 - 20 }}>
                <Text style={styles.inputLabel}>End</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.DateDiv} onPress={() => setShowEndDatePicker(true)}>
                  <Text style={styles.DateText} >
                    {endDate ? endDate.toISOString().split('T')[0] : ("dd / mm / yy")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Create Project */}
            <TouchableOpacity activeOpacity={1} onPress={SubmitProject}>
              <View style={styles.loginBtn}>
                <View>
                  <Text style={styles.buttonText}>Create Project</Text>
                </View>
              </View>
            </TouchableOpacity>



            {/* Calendar for Start Date Select */}
            {showStartDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={startDate}
                mode="date"
                is24Hour={true}
                // display="default"

                onChange={StartonChange}
                minimumDate={minDate}
              />
            )}

            {/* Calendar for End Date Select */}
            {showEndDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={endDate}
                mode="date"
                is24Hour={true}
                display="default"
                minimumDate={minDate}
                onChange={EndonChange}
              />
            )}


            <View>

              {/* models */}
              {/* Calendar1 */}
              {/* <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={toggleModal}
            >

              <View style={styles.modalContainer}>
                <TouchableOpacity activeOpacity={10} style={styles.CalendarHeader}   >
                  <Text style={{ color: 'white' }} >Select Start Date</Text>
                  <Ionicons name='close-outline' color={'white'} size={30} style={{ position: 'absolute', right: 1, padding: 10, }} onPress={toggleModal} />

                </TouchableOpacity>
                <Calendar
                  style={styles.calendar}
                  markedDates={{
                    [startDate]: {
                      selected: true,
                      selectedColor: 'blue', // Set your desired background color
                    },
                  }}
                  onDayPress={handleDateSelect}
                />
              </View>
            </Modal> */}
            </View>

            {/* Model for adding Client */}
            <View style={{ alignItems: 'center' }}>

              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible3}
                onRequestClose={toggleModal3}
              >

                <View style={styles.modalContainer}>
                  <View style={styles.AddClientDiv}>
                    <View style={styles.modalViewInside}>
                      <View style={styles.ClientDetailHeaderDiv}>
                        <Text style={styles.ClientDetailHeaderText}>Client Details</Text>
                      </View>

                      <View>
                        <Text style={styles.ModelInputLabelText}>Name</Text>
                        <TextInput onChangeText={(value) => ModelInputChange('name', value)} style={styles.modelInput} placeholder='Enter client name' />

                      </View>
                      <View>
                        <Text style={styles.ModelInputLabelText}>Place</Text>
                        <TextInput onChangeText={(value) => ModelInputChange('place', value)} style={styles.modelInput} placeholder='Enter client address' />

                      </View>
                      <View>
                        <Text style={styles.ModelInputLabelText}>Phone</Text>
                        <TextInput keyboardType='numeric' onChangeText={(value) => ModelInputChange('phone', value)} style={styles.modelInput} placeholder='Enter client phone number' />

                      </View>


                      <View style={styles.ModelButtonsDiv}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible3(false)}>
                          {/* <Image style={styles.ModelCancelBtn} source={{ uri: 'https://img.freepik.com/free-vector/red-prohibited-sign-no-icon-warning-stop-symbol-safety-danger-isolated-vector-illustration_56104-912.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' }} /> */}
                          <Text style={[styles.ModelBtn,]}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={AddClient} activeOpacity={0.8} >
                          <Text style={[styles.ModelBtn]}>Ok</Text>

                        </TouchableOpacity>


                      </View>



                    </View>

                  </View>

                </View>
              </Modal>
            </View>

          </Animated.View>

        </ScrollView>

      </SafeAreaView >

    </>
  )
}

