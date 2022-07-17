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
    }, 10000);

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
          <Button title="Reload" onPress={handleReload} />
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
              source={GlobalData.firstFloorLamps}
              style={props.style}
              resizeMethod={'scale'}
              resizeMode={'contain'}
              fadeDuration={0}
            />
            <LampSwitch style={styles.LampSwitch6} name="l6" />
            <LampSwitch style={styles.LampSwitch7} name="l7" />
            <LampSwitch style={styles.LampSwitch8} name="l8" />
            <LampSwitch style={styles.LampSwitch9} name="l9" />
            <LampSwitch style={styles.LampSwitch10} name="l10" />
            <LampSwitch style={styles.LampSwitch11} name="l11" />
            <LampSwitch style={styles.LampSwitch12} name="l12" />
          </>
        )}
      </>
    );
  }
};

export default GroundFloorLamps;

const styles = StyleSheet.create({
  LampSwitch6: {
    left: '85%',
    top: '46%',
  },
  LampSwitch7: {
    left: '96%',
    top: '40%',
  },
  LampSwitch8: {
    left: '61%',
    top: '41%',
  },
  LampSwitch9: {
    left: '82%',
    top: '35%',
  },
  LampSwitch10: {
    left: '89%',
    top: '55%',
  },
  LampSwitch11: {
    left: '86%',
    top: '75%',
  },
  LampSwitch12: {
    left: '58%',
    top: '60%',
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
