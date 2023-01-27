/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  AppState,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomePage from './app/screens/WelcomePage';
import HomeSection from './app/screens/HomeSection';
import {AppContext} from './app/services/AppContext';
import {
  NotificationFunctions,
  storageFunctions,
  appFunctions,
} from './app/services/Functions';

const Stack = createNativeStackNavigator();

// Register background handler for sensorState
messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (remoteMessage?.data.title === 'sensorState') {
    appFunctions.setStorageSensorState(remoteMessage?.data.body);
  }
});

const App = () => {
  const {setSensorState, setLampState, refreshSensors, lampState} =
    useContext(AppContext);

  //#region Event Listener for App state changes
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      currentAppState => {
        if (currentAppState === 'active') {
          refreshSensors();
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);
  //#endregion

  //#region Push Notifications Configuration
  const setStorageSensorStateFromMessage = remoteMessage => {
    if (remoteMessage) {
      const msgBody = remoteMessage?.data.body;
      setSensorState(msgBody);
      appFunctions.setStorageSensorState(msgBody);
    }
  };

  useEffect(() => {
    storageFunctions.notificationsSettings.load().then(result => {
      if (result?.isPushEnabled) {
        NotificationFunctions.activatePushNotifications();
      } else {
        NotificationFunctions.deactivatePushNotifications();
      }
    });

    // Background App opened from pushed Notification
    messaging().onNotificationOpenedApp(remoteMessage => {
      setStorageSensorStateFromMessage(remoteMessage);
    });

    // Closed App opened from pushed Notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        setStorageSensorStateFromMessage(remoteMessage);
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage?.data?.title === 'sensorState') {
        setStorageSensorStateFromMessage(remoteMessage);
      } else if (remoteMessage?.data?.title === 'lampState') {
        console.log('Received lampState: ' + remoteMessage.data.body);
        setLampState(remoteMessage.data.body);
      }
    });

    return unsubscribe;
  }, []);

  //#endregion

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.sectionContainer}>
        <StatusBar />
        <View style={styles.content} contentInsetAdjustmentBehavior="automatic">
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomePage} />
            <Stack.Screen name="HomeSection" component={HomeSection} />
          </Stack.Navigator>
        </View>
      </SafeAreaView>
    </NavigationContainer>
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
