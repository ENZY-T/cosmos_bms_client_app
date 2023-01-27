/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ToggleButton} from 'react-native-paper';
import {lampFunctions} from '../services/Functions';
import {signalRBroadcast} from '../services/SignalR';
import messaging from '@react-native-firebase/messaging';
import {GlobalData} from '../GlobalData';
import {AppContext} from '../services/AppContext';
import XText from './XText';

const LampSwitch = ({style, name}) => {
  const appContext = useContext(AppContext);
  const toggleSwitchCombinedStyle = [style, styles.toggleSwitch];
  const [state, setState] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const currentOpCodeRef = useRef(null);
  const sentOpCodeRef = useRef(null);

  var unsubscribe = () => {};

  useEffect(() => {
    return unsubscribe;
  }, []);

  useEffect(() => {
    setState(
      lampFunctions.processLampState(appContext.lampState)[name] === 'ON'
        ? true
        : false,
    );
  }, [appContext.lampState]);

  const onToggle = () => {
    currentOpCodeRef.current = `${name}-${state ? 'ON' : 'OFF'}`;
    sentOpCodeRef.current = `${name}-${state ? 'OFF' : 'ON'}`;

    (async () =>
      await signalRBroadcast({
        lampState: sentOpCodeRef.current,
      }))();
    waitForConfirmation();
  };

  const startWaiting = () => {
    const topic = GlobalData.communicationSettings.confirmationTopic;
    messaging()
      .subscribeToTopic(topic)
      .then(() => console.log(`Subscribed to topic: ${topic}`));
  };

  const stopWaiting = (res, unsub) => {
    unsub && unsub(); // To unsubscribe FCM listener to avoid multiple calling of callback
    const topic = GlobalData.communicationSettings.confirmationTopic;
    messaging()
      .unsubscribeFromTopic(topic)
      .then(() => console.log(`Unsubscribed from topic: ${topic}`));

    const resData = res?.data?.body;
    if (resData === sentOpCodeRef.current) {
      //Operation confirmed
      setIsWaiting(false);
      console.log('operation confirmed');
      setState(String(sentOpCodeRef.current).includes('ON'));
    } else {
      //Operation failed
      setIsWaiting(false);
      console.log('operation failed');
      setState(String(currentOpCodeRef.current).includes('ON'));
    }
  };

  const waitForConfirmation = () => {
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

  return (
    <ToggleButton
      style={toggleSwitchCombinedStyle}
      icon={
        isWaiting
          ? 'account-child-circle'
          : state === true
          ? 'lightbulb'
          : 'lightbulb-off-outline'
      }
      status={state}
      onPress={onToggle}
      color={state ? (isWaiting ? 'grey' : '#F46036') : 'grey'}
      size={50}
      disabled={isWaiting}
    />
  );
};

export default LampSwitch;

const styles = StyleSheet.create({
  toggleSwitch: {
    width: 'auto',
    height: 'auto',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#EBEBEBD0',
    borderRadius: 8,
    position: 'absolute',
    transform: [{translateX: -50}, {translateY: -50}],
  },
});
