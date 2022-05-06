import {Text, ScrollView, StyleSheet, View, Image, Button} from 'react-native';
import React, {useState} from 'react';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode';

export default function SensorMapFloorGround() {
  const [areaNo, setAreaNo] = useState(0);
  const alertImageArr = [
    require('../img/floorGroundSensorMap/floorGroundSensorMap-0.jpg'),
    require('../img/floorGroundSensorMap/floorGroundSensorMap-1.jpg'),
    require('../img/floorGroundSensorMap/floorGroundSensorMap-2.jpg'),
    require('../img/floorGroundSensorMap/floorGroundSensorMap-3.jpg'),
    require('../img/floorGroundSensorMap/floorGroundSensorMap-4.jpg'),
    require('../img/floorGroundSensorMap/floorGroundSensorMap-5.jpg'),
    require('../img/floorGroundSensorMap/floorGroundSensorMap-6.jpg'),
    require('../img/floorGroundSensorMap/floorGroundSensorMap-7.jpg'),
    require('../img/floorGroundSensorMap/floorGroundSensorMap-8.jpg'),
    require('../img/floorGroundSensorMap/floorGroundSensorMap-9.jpg'),
    require('../img/floorGroundSensorMap/floorGroundSensorMap-10.jpg'),
  ];
  return (
    <View style={styles.container}>
      {/* <Text>SensorMapFloorGround</Text> */}
      <Image
        style={styles.floorMapImage}
        source={alertImageArr[areaNo]}
        resizeMethod={'scale'}
        resizeMode={'contain'}
        fadeDuration={0}
      />
      <Button
        onPress={() => {
          setAreaNo(prev => (prev + 1 > 10 ? prev - 1 : prev + 1));
        }}
        title="Change"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  floorMapImage: {height: '85%', width: '85%'},
  container: {
    height: '100%',
    width: '100%',
  },
});
