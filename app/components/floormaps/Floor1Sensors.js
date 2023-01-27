import {StyleSheet, View} from 'react-native';
import React from 'react';
import XText from '../XText';

function Floor1Sensors(props) {
  return (
    <>
      {/* <Image
        style={props.style}
        // source={GlobalData.groundFloorSensors[0]}
        resizeMethod={'scale'}
        resizeMode={'contain'}
        fadeDuration={0}
      /> */}
      <View style={[props.style, styles.container]}>
        <XText style={styles.text}>Not implemented yet</XText>
      </View>
    </>
  );
}

export default Floor1Sensors;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
});
