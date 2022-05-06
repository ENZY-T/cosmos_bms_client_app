import React from 'react';

import {SafeAreaView, View, StatusBar, StyleSheet, Text} from 'react-native';
import SensorMapFloorGround from './app/screens/SensorMapFloorGround';

const App = () => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar />
      <View style={styles.content} contentInsetAdjustmentBehavior="automatic">
        <SensorMapFloorGround />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    width: '100%',
  },
  content: {
    height: '100%',
    width: '100%',
  },
});

export default App;
