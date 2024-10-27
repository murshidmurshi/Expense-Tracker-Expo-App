import React, { useContext } from 'react'
import { View, Text, Image, Dimensions, SafeAreaView, StatusBar, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { Basepath } from '../Global';

const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;
export default function Register({ navigation }) {
  const { register, setRegister, registerspinner, setRegisterSpinner, registererror, setRegisterError } = useContext(AuthContext)

  const RegisterFunc = async () => {
    setRegisterSpinner(true)
    console.log(register);
    await axios.post(`${Basepath}/admin/register`, register)
      .then(async (res) => {
        console.log(res.data);
        if (res.data.success) {

          navigation.navigate('login')
          setRegisterSpinner(false)
          setRegister({})
        }
        if (res.data.error) {
          setRegisterSpinner(false)
          setRegisterError(res.data.error)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }


  const handleChange = (type, value) => {
    setRegisterError('')
    setRegisterSpinner(false)
    setRegister({ ...register, [type]: value })

  }
  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'white', height: windowheight }}>
        {/* <StatusBar backgroundColor={'black'} animated={true} /> */}


        {/* <View>

          <Image source={{ uri: 'https://img.freepik.com/free-vector/business-people-writing-agreement-shaking-hands-tiny-man-with-magnifying-glass-researching-checklist-document-clipboard-paper-flat-vector-illustration-survey-paperwork-management-concept_74855-21676.jpg?size=626&ext=jpg&ga=GA1.1.1237794424.1697694001&semt=sph' }} height={windowheight - 520} width={windowwidth} />

        </View> */}

        <View style={styles.backIcon}>
          <Ionicons name='chevron-back-outline' size={25} onPress={() => navigation.goBack()} />
        </View>


        {/* Sign in */}
        <View style={styles.registerHeader}>
          <Text style={styles.headerLabel}>Set up your account</Text>
        </View>

        <View style={styles.detailDiv}>
          <Text style={styles.detailText}>Complete your account setup by providing your proper biography info</Text>
        </View>


        {/* input  */}
        <View style={{ padding: 10, width: windowwidth, alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            {registererror && (
              <Text style={{ color: 'red' }}>{registererror}</Text>
            )}
          </View>

          <View>
            <Text style={styles.inputLabel}>Name</Text>

            <View style={styles.inputDiv}>
              <Ionicons color={'grey'} name='person-circle-outline' size={20} />
              <TextInput style={styles.input} onChangeText={(name) => handleChange('name', name)} placeholder='Enter name' />
            </View>

          </View>

          <View  >
            <Text style={styles.inputLabel}>Phone</Text>

            <View style={styles.inputDiv}>
              <Ionicons color={'grey'} name='call-outline' size={20} />
              <TextInput keyboardType='numeric' style={styles.input} onChangeText={(phone) => handleChange('phone', phone)} placeholder='Enter phone number' />
            </View>

          </View>


          <View  >
            <Text style={styles.inputLabel}>Address</Text>

            <View style={styles.inputDiv}>
              <Ionicons color={'grey'} name='location-outline' size={20} />
              <TextInput style={styles.input} onChangeText={(address) => handleChange('address', address)} placeholder='Enter address' />
            </View>
          </View>


          <View >
            <Text style={styles.inputLabel}>Email</Text>

            <View style={styles.inputDiv}>
              <Ionicons color={'grey'} name='mail-outline' size={20} />
              <TextInput style={styles.input} onChangeText={(email) => handleChange('email', email)} placeholder='Enter valid email' />
            </View>

          </View>


          <View >
            <Text style={styles.inputLabel}>Password</Text>

            <View style={styles.inputDiv}>

              <Ionicons color={'grey'} name='lock-closed-outline' size={20} />
              <TextInput secureTextEntry style={styles.input} onChangeText={(password) => handleChange('password', password)} placeholder='Enter valid password' />
            </View>

          </View>


          <TouchableOpacity activeOpacity={0.8} onPress={RegisterFunc}
            style={styles.RegisterBtn}>
            {registerspinner ? (
              <View>
                <ActivityIndicator color={'black'} size={18} />
              </View>
            ) : (
              <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', }}>Continue</Text>
            )}
          </TouchableOpacity>


          {/* <View style={{ marginTop: 15 }}>
            <Text style={{ color: 'white' }}>Or Signin Using</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ backgroundColor: '#3b5998', borderRadius: 100, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
              <Ionicons color={'white'} name='logo-facebook' size={25} />
            </View>
            <View style={{ backgroundColor: '#ff6666', borderRadius: 100, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons color={'white'} name='logo-google' size={25} />
            </View>

          </View> */}


        </View>
        <View style={{ marginTop: 15, alignItems: 'center' }}>

          <Text >
            Already have an account?
            <Text onPress={() => navigation.navigate('login')} style={{ textDecorationLine: 'underline', color: 'grey' }}> Login</Text>
          </Text>

        </View>
      </SafeAreaView>
    </>

  )
}
const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    height: 50,
    paddingLeft: 12,
    flex: 1,



  },
  backIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 9999
  },
  registerHeader: {
    marginTop: 55,
    paddingHorizontal: 20,
  },
  headerLabel: {
    fontSize: 25,
    fontWeight: '400',

  },
  inputLabel: {
    color: 'grey',
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontWeight: '400',

  },
  detailDiv: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  detailText: {
    color: 'grey'
  },
  RegisterBtn: {
    backgroundColor: '#b5b5eb',
    // backgroundColor: '#9999ff',
    width: windowwidth - 33,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
    height: 50,
    elevation: 2,
    justifyContent: 'center',

    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  inputDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowwidth - 43,
    borderRadius: 15,
    marginBottom: 10,
    // backgroundColor: "#ebebf7",
    backgroundColor: "#f6f6ff",
    height: 50,
    paddingLeft: 12,
    elevation:1,

    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  }
})