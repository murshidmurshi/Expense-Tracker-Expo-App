import { SafeAreaView, StyleSheet, Text, View, StatusBar, Dimensions, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;
import React, { useCallback, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { Basepath } from '../Global';
import { useFocusEffect } from '@react-navigation/native';

export default function AddWork({ route, navigation }) {
  const [work, setWork] = useState({})
  // const [workerror, setWorkError] = useState('')

  const [workspinner, setWorkSpinner] = useState(false)
  const { projectId, memberId } = route.params;

  console.log(projectId, 'projectId in AddCategory ');
  console.log(memberId, 'MemberId  in AddCategory  ');


  const handleChange = (type, value) => {
    setWorkSpinner(false)
    setWork({ ...work, [type]: value })
  }

  const SaveWork = async () => {
    // setWorkSpinner(true)
    console.log('Save Category.......');
    let value = { ...work, project_id: projectId, member_id: memberId }
    console.log('Full Category is:', value);
    await axios.post(`${Basepath}/work/add-work`, value)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setWorkSpinner(false)
          navigation.goBack()
        }
      })
      .catch((err) => {
        console.log(err);
      })

  }

  useFocusEffect(
    useCallback(() => {

    }, [])
  )


  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor='grey' />
      <View style={styles.headerTitle}>
        <Ionicons style={{ paddingRight: 50 }} name='chevron-back-outline' size={27} onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 20, }}>Add Work</Text>
      </View>
      <View style={styles.mainDiv}>
        <View style={styles.category}>
          {/* <Text style={styles.sectionsHeader}>Category</Text> */}

          <View>

            <TextInput onChangeText={(name) => handleChange('name', name)} placeholder='Name of the Work' style={styles.input} />
            <TextInput onChangeText={(description) => handleChange('description', description)} placeholder='Description of the Work' style={styles.input} />
            <TextInput keyboardType='numeric' onChangeText={(budget) => handleChange('budget', budget)} placeholder='Budget of the Work' style={styles.input} />


          </View>
          <TouchableOpacity style={styles.savecategory}>
            {workspinner ? (
              <ActivityIndicator color={'black'} size={25} />
            ) : (

              <Text style={styles.savecategoryLabel} onPress={SaveWork}>Save Work</Text>
            )}
          </TouchableOpacity>


        </View>


      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerTitle: {
    backgroundColor: '#ffcc66',
    height: 130,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  mainDiv: {
    backgroundColor: 'white',
    height: windowheight,
    paddingHorizontal: 10,
    paddingVertical: 25,
    elevation: 20,
    position: 'relative',
    bottom: 60,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  category: {
    // backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 5,

  },


  sectionsHeader: {
    fontSize: 12,
    paddingVertical: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    fontWeight: 'bold',
    color: '#9e9e9e'
  },
  addCategory: {
    backgroundColor: '#f2f2f2',
    width: 35,
    elevation: 2,
    alignItems: 'center',
    padding: 5,
    borderRadius: 999,
    marginLeft: 5
  },
  input: {
    height: 50,
    margin: 8,
    borderRadius: 9999,
    paddingHorizontal: 15,
    borderWidth: 1
  },
  savecategory: {
    height: 50,
    margin: 8,
    borderRadius: 12,
    elevation: 2,
    paddingHorizontal: 15,
    backgroundColor: '#7bab21',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    marginTop: 50
  },
  savecategoryLabel: {
    fontSize: 15,
    paddingVertical: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    fontWeight: 'bold',
    color: 'white'
  }
})
