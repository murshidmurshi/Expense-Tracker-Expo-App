import { SafeAreaView, StyleSheet, Text, View, StatusBar, Dimensions, TextInput, TouchableOpacity } from 'react-native'
const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Search({ navigation }) {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar backgroundColor='grey' />
            <View style={styles.SearchTitle}>
                <Ionicons style={{ paddingRight: 50 }} name='chevron-back-outline' size={27} onPress={() => navigation.goBack()} />
                <Text style={{ fontSize: 20, }}>Search</Text>
            </View>
            <View style={styles.searchDiv}>

                <View style={styles.input}>
                    <TextInput placeholder='Search...' />
                    <View style={{ flex: 1 }} />
                    <Ionicons style={{ marginHorizontal: -25 }} name='search-outline' size={27} />
                </View>
                <View style={styles.searchDataDiv}>
                    <View style={styles.searchData}>
                        <TouchableOpacity activeOpacity={0.7}>

                            <View style={styles.row}>
                                <View style={[styles.rowIcon, { backgroundColor: 'white' }]}>
                                    <Ionicons name='home-sharp' color='#000' size={18} />
                                </View>

                                <Text style={styles.rowLabel}>Homelooo</Text>
                                <View style={{ flex: 1 }} />
                                <Text style={styles.ExpenseAmout}>-₹449865465</Text>

                            </View>
                        </TouchableOpacity>



                    </View>
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
    SearchTitle: {
        backgroundColor: 'orange',
        height: 130,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    searchDiv: {
        backgroundColor: 'white',
        height: windowheight,
        padding: 20,
        elevation: 20,
        position: 'relative',
        bottom: 60,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    input: {
        backgroundColor: '#f2f2f2',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 2,
        flexDirection: 'row',
        paddingRight: 40,
    },
    searchDataDiv: {
        paddingVertical: 20,
        marginTop: 20
    },
    searchData: {
    },
    row: {

        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 8,
        marginBottom: 12,
    },
    rowIcon: {
        padding: 5,
        borderRadius: 9999,
        marginRight: 10,
    },
})
