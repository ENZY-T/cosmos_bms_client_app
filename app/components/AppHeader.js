import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalData} from '../GlobalData';

const AppHeader = () => {
  return (
    <View style={[styles.background]}>
      <Text>AppHeader</Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  background: [{height: 40}],
});
