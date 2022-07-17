/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, ScrollView, Dimensions, Image} from 'react-native';
import React, {useEffect, useContext} from 'react';

import Floor1Sensors from '../components/floormaps/Floor1Sensors';
import {appFunctions, Log} from '../services/Functions';
import {AppContext} from '../services/AppContext';
import {extractSensorState} from '../services/Decoder';
import {GlobalData} from '../GlobalData';

const {width} = Dimensions.get('window');

const Cams = () => {
  const appContext = useContext(AppContext);

  useEffect(() => {
    appFunctions
      .getStorageSensorState()
      .then(result => {
        appContext.setSensorState(result);
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
    <>
      <ScrollView
        alwaysBounceVertical
        horizontal
        decelerationRate="fast"
        snapToInterval={width} //your element width
      >
        <Image
          style={styles.floor}
          source={GlobalData.groundFloorSensors[appContext.alertArea]}
          resizeMethod={'scale'}
          resizeMode={'contain'}
          fadeDuration={0}
        />
        <Floor1Sensors style={styles.floor} />
      </ScrollView>
    </>
  );
};

export default Cams;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    height: 'auto',
    width: width,
  },

  image: {
    width: width,
    height: 'auto',
  },
  floor: {width: width, height: 'auto'},
});
