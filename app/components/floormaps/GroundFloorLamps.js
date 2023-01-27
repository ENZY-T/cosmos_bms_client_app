/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Image,
  Button,
  View,
  Dimensions,
  AppState,
} from 'react-native';
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import {GlobalData} from '../../GlobalData';
import LampSwitch from '../LampSwitch';
import messaging from '@react-native-firebase/messaging';
import XText from '../XText';
import {AppContext} from '../../services/AppContext';
import {getLampState} from '../../services/SignalR';

const {width} = Dimensions.get('screen');

const GroundFloorLamps = props => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const appContext = useContext(AppContext);
  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadLampState();
    });

    return unsubscribe;
  }, [navigation]);

  var unsubscribe = () => {};

  const loadLampState = () => {
    setIsWaiting(true);

    startWaiting();

    const waitHandler = setTimeout(() => {
      stopWaiting(null, unsubscribe);
    }, 3000);

    unsubscribe = messaging().onMessage(async remoteMessage => {
      clearTimeout(waitHandler);
      stopWaiting(remoteMessage, unsubscribe);
    });
  };

  const startWaiting = () => {
    const topic = GlobalData.communicationSettings.lampStateTopic;
    messaging()
      .subscribeToTopic(topic)
      .then(() => console.log(`Subscribed to topic: ${topic}`));

    getLampState();
  };

  const stopWaiting = (res, unsub) => {
    unsub && unsub(); // To unsubscribe FCM listener to avoid multiple calling of callback
    const topic = GlobalData.communicationSettings.lampStateTopic;
    messaging()
      .unsubscribeFromTopic(topic)
      .then(() => console.log(`Unsubscribed from topic: ${topic}`));

    const resData = res?.data;
    if (resData?.title === 'lampState') {
      // State received
      console.log('State received: ' + resData?.body);
      appContext.setLampState(resData?.body);
      setIsFailed(false);
    } else {
      // Failed
      console.log('Failed');
      setIsFailed(true);
    }
    setIsWaiting(false);
  };

  const handleReload = () => {
    loadLampState();
  };

  if (isFailed) {
    return (
      <View style={styles.container}>
        <View style={styles.centeredItem}>
          <Button title="Reload" disabled={isWaiting} onPress={handleReload} />
        </View>
      </View>
    );
  } else {
    return (
      <>
        {isWaiting ? (
          <View style={styles.container}>
            <XText style={styles.centeredItem}>Loading...</XText>
          </View>
        ) : (
          <>
            <Image
              source={GlobalData.groundFloorLamps}
              style={props.style}
              resizeMethod={'scale'}
              resizeMode={'contain'}
              fadeDuration={0}
            />
            <LampSwitch style={styles.LampSwitch1} name="l1" />
            <LampSwitch style={styles.LampSwitch2} name="l2" />
            <LampSwitch style={styles.LampSwitch3} name="l3" />
            <LampSwitch style={styles.LampSwitch4} name="l4" />
            <LampSwitch style={styles.LampSwitch5} name="l5" />
          </>
        )}
      </>
    );
  }
};

export default GroundFloorLamps;

const styles = StyleSheet.create({
  LampSwitch1: {
    left: '27.5%',
    top: '61%',
  },
  LampSwitch2: {
    left: '48.5%',
    top: '61%',
  },
  LampSwitch3: {
    left: '27.5%',
    top: '48%',
  },
  LampSwitch4: {
    left: '13%',
    top: '61%',
  },
  LampSwitch5: {
    left: '7%',
    top: '43.5%',
  },
  centeredItem: {
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    display: 'flex',
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
