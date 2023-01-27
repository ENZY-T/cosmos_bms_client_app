// if (__DEV__) {
//   import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
// }
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {AppContextProvider} from './app/services/AppContext';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Log, NotificationFunctions} from './app/services/Functions';
import {GlobalData} from './app/GlobalData';

PushNotification.createChannel(
  {
    channelId: 'cosmos-bms-1', // (required)
    channelName: 'Cosmos BMS notification channel', // (required)
    channelDescription: 'A channel to categorize cosmos notifications', // (optional) default: undefined.
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`Channel ${created ? 'created' : 'Exists'}`), // (optional) callback returns whether the channel was created, false means it already existed.
);

NotificationFunctions.subscribeToTopic(
  GlobalData.communicationSettings.dataTopic,
)
  .then(() =>
    console.log(
      'Subscribed to topic: ' + GlobalData.communicationSettings.dataTopic,
    ),
  )
  .catch(err => {
    console.log(err.message);
    return err;
  });

const Main = () => {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
