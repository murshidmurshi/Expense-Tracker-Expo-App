import React, { useContext } from 'react'
import { View, Text, Image, Dimensions, SafeAreaView, TextInput, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native'
// import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../AuthContext';

const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;
export default function Login({ navigation }) {

  const { LoginFunc, loginvalue, setLoginValue, loginSpinner, loginerror, setLoginError } = useContext(AuthContext)

  const handleChange = (name, value) => {
    setLoginError('')
    setLoginValue({ ...loginvalue, [name]: value })

  }

  return (
    <>
      <SafeAreaView style={{ height: windowheight, backgroundColor: 'white', }}>

        <StatusBar backgroundColor={'#ceced6'} animated />

        <View style={styles.backIcon}>
          <Ionicons name='chevron-back-outline' size={25} onPress={() => navigation.goBack()} />
        </View>

        <View >

          <Image source={{ uri: 'https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' }} style={styles.loginimage} />
          {/* <Image source={{ uri: 'https://img.freepik.com/premium-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg?size=626&ext=jpg&ga=GA1.1.131079287.1698470392&semt=sph' }} style={styles.loginimage} /> */}


        </View>




        <View style={styles.headerDiv}>
          <Text style={styles.header}>Welcome back</Text>
        </View>




        {/* input  */}

        <View style={styles.mainInputDiv}>

          <View style={{ alignItems: 'center' }} >
            {loginerror && (
              <Text style={{ color: 'rgb(231, 147, 147)', marginBottom: 5, }}>{loginerror}</Text>
            )}

            <View>
              <Text style={styles.inputLabel}>E-mail address</Text>

              <View style={styles.inputDiv}>
                <Ionicons color={'grey'} name='mail-outline' size={20} />
                <TextInput style={styles.input} placeholder='Enter valid email' onChangeText={(email) => handleChange('email', email)} />
              </View>


            </View>


          </View>


          <View >

            <Text style={styles.inputLabel}>Password</Text>

            <View style={styles.inputDiv}>

              <Ionicons color={'grey'} name='lock-closed-outline' size={20} />
              <TextInput secureTextEntry style={styles.input} placeholder='Enter valid password' onChangeText={(password) => handleChange('password', password)} />

            </View>



            <Text style={styles.forgotText}>Forgot the password ?</Text>


          </View>


          <TouchableOpacity activeOpacity={1} onPress={LoginFunc}>
            <View style={styles.loginBtn}>
              {loginSpinner ? (
                <View>
                  <ActivityIndicator color={'black'} size={22} />
                </View>
              ) : (
                <View>
                  <Text style={{ color: 'white', fontSize: 19, width: 100, textAlign: 'center' }}>Continue</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>



          <View style={{ marginTop: 15 }}>
            <Text style={{ color: 'grey' }}>Or continue with</Text>
          </View>

          {/* logos */}
          <View style={{ flexDirection: 'row', marginTop: 10 }}>

            <View style={styles.logoDiv}>
              <Ionicons name='logo-facebook' color={'grey'} size={25} />
            </View>

            <View style={styles.logoDiv}>
              <Ionicons name='logo-google' color={'grey'} size={25} />
            </View>

          </View>


        </View>



        <View style={{ marginTop: 18, alignItems: 'center' }}>
          <Text style={{color:'grey'}}>You don't have an account? <Text onPress={() => navigation.navigate('register')} style={{ textDecorationLine: 'underline', color: 'black' }}>Sign Up</Text></Text>
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
  header: {
    // textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
    color: 'grey',
    

  },
  headerDiv: {
    marginVertical: 20,
    // backgroundColor:'red',
    paddingHorizontal:20
  },
  inputLabel: {
    color: 'grey',
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontWeight: '400',


  }
  ,
  forgotText: {
    // color: '#4d4dff',
    color:'#7d7dfa',
    paddingHorizontal: 5,
    paddingVertical: 2,
  }
  ,
  loginimage: {
    height: windowheight * 0.3,
    width: windowwidth,
    
  },
  mainInputDiv: {
    // backgroundColor:'red',
    alignItems: 'center'
  },
  loginBtn: {
    backgroundColor: '#b5b5eb',
    width: windowwidth - 33,
    borderRadius: 13,
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
  logoDiv: {
    backgroundColor: '#dadaf2',
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  backIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 9999
  },
  inputDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowwidth - 43,
    borderRadius: 13,
    marginBottom: 10,
    backgroundColor: "#f6f6ff",
    height: 50,
    paddingLeft: 12,
    marginVertical:3,
    elevation:1,


    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  }
})