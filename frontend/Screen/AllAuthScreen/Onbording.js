
import { SafeAreaView, StatusBar, StyleSheet, Dimensions, View, Text } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;





import Lottie from 'lottie-react-native';

export default function Onbording({ navigation }) {
  const handleDone = () => {
    navigation.navigate('login')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#ceced6'} />

      <View style={styles.container}>
        <Onboarding



          onDone={handleDone}
          onSkip={handleDone}
          containerStyles={{ paddingHorizontal: 5, }}
          pages={[
            {
              backgroundColor: '#c9f8e2',
              image: (
                <View>
                  <Lottie style={styles.lottie}
                    source={require('../../asserts/animation/Animation.json')}
                    autoPlay
                    loop
                    onError={(error) => console.error('Lottie Error:', error)} />
                </View>
              ),
              title: (
                'Welcome to Project Tracker'
              ),
              subtitle: "Track and manage your projects with ease.Never miss a deadline again.",
            },
            {
              backgroundColor: '#fef3c7',
              image: (
                <View>

                  <Lottie style={styles.lottie}
                    source={require('../../asserts/animation/boost.json')}
                    autoPlay
                    loop
                  />
                </View>
              ),
              title: ' Key Features ',
              subtitle: "Create and manage projects effortlessly.  Assign tasks to team members and set deadlines. Visualize project progress with charts and reports."
              ,
            },
            {

              backgroundColor: '#b37bd1',
              image: (
                <View>
                  <Lottie style={styles.lottie}
                    source={require('../../asserts/animation/work.json')}
                    autoPlay
                    loop

                  />

                </View>
              ),
              title: 'Get Started',
              subtitle: 'Sign in to start managing your projects.  Start boosting your productivity today!',
            },
          ]} />
      </View>
    </SafeAreaView>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottie: {
    width: windowwidth * 0.9,
    height: windowwidth,
  },

})