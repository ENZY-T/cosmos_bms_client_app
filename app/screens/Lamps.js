import {StyleSheet, ScrollView, Dimensions, AppState} from 'react-native';
import React, {useEffect} from 'react';

import Floor1Sensors from '../components/floormaps/Floor1Sensors';
import GroundFloorLamps from '../components/floormaps/GroundFloorLamps';
import {getLampState} from '../services/SignalR';

const {width} = Dimensions.get('window');

const Lamps = () => {
  const UpdateLampUI = () => {};

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      currentAppState => {
        if (currentAppState === 'active') {
          try {
            getLampState();
          } catch {}
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <>
      <ScrollView
        alwaysBounceVertical
        horizontal
        decelerationRate="fast"
        snapToInterval={width} //your element width
      >
        <GroundFloorLamps style={styles.floor} />
        <Floor1Sensors style={styles.floor} />
        {/* {floorImages.map(source => (
          <Image
            key={source}
            style={styles.image}
            source={source}
            resizeMethod="scale"
            resizeMode="contain"
          />
        ))} */}
      </ScrollView>
    </>
  );
};

export default Lamps;

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
