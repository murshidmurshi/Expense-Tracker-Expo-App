import React from 'react'
import { View, Text, Dimensions, SafeAreaView, StyleSheet } from 'react-native'
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import {
  PieChart,
} from "react-native-chart-kit";
export default function PieChart2() {
  // each value represents a goal ring in Progress chart
  const data = [

    {
      name: "TotalExpenses",
      money: 5000000,
      color: "red",
      legendFontColor: "red",
      legendFontSize: 12
    },
    // {
    //   name: "Investment",
    //   money: 200000,
    //   color: "blue",
    //   legendFontColor: "blue",
    //   legendFontSize: 12
    // },
    {
      name: "Budget",
      money: 10000000,
      color: "green",

      legendFontColor: "green",
      legendFontSize: 12
    },

  ];
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional,


  };
  return (
    <SafeAreaView style={{ flex: 1, width: screenWidth, height: screenHeight }}>
      {/* pieChart */}
      <PieChart
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
        accessor={"money"}
        backgroundColor={"transparent"}
        paddingLeft={"20"}
        center={[20, 20]}
      />

      {/* total */}
      <View >

        <View style={styles.Card}>
          <Text style={{color:'red'}}>Note:</Text>
          <Text style={{marginLeft:10,marginTop:10,width:250,lineHeight:25}}>This is the PieChart of All Project's <Text style={styles.markText}>Budget</Text> and <Text style={styles.markText}>Expenses</Text></Text>
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Card: {
    borderWidth: 1,
    margin: 20,
    borderRadius: 20,
    padding: 10,
    minHeight: 200,
    backgroundColor:'white',
    elevation:10
  },
  markText:{
  backgroundColor:'#e6ffe6',
  color:'green',
  

  }
})