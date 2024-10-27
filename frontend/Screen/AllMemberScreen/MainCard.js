
import React from 'react'
import { Text, View, Image, Button, StyleSheet, Dimensions, } from 'react-native'
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons'

const windowheight = Dimensions.get('window').height;
const screenHEight = Dimensions.get('screen').height

const windowwidth = Dimensions.get('window').width;

export default function RecipeCard({ navigation, item }) {
    const PressCard = async (item) => {
        navigation.navigate('SingleViewRecipe', { id: item._id })
        // navigation.navigate('not')
    }

    return (
        <>
            <View style={{ borderRadius: 18, height: 200,elevation:2, width: windowwidth - 100, shadowColor: '#000', overflow: 'hidden', shadowOpacity: 0.8, shadowRadius: 20, marginBottom: 20, shadowOffset: { width: 0, height: 50 } }}
            >
                <View style={[styles.cardDiv,{flex:1}]}>

                    <Text>NEW Building</Text>
                    {/* <View style={styles.CardInside}>
                        <Ionicons name='wallet-sharp' color='#000' size={18} style={{ paddingHorizontal: 10, }} />
                        <Text >Total</Text>

                    </View> */}
                    <View style={{flex:1}}/>
                    <Text>Balance</Text>
                    <Text style={styles.Balance}>554654464646</Text>
                </View>
            </View>


        </>
    )
}
const styles = StyleSheet.create({
    CardInside: {
        flexDirection: 'row'
    },
    Balance: {
        fontSize:20,
        fontFamily: 'System',
    },
    cardDiv:{
        padding: 18,
        backgroundColor:'#e1eef2',
        

    }
})